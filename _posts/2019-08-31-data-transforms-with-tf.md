---
layout: post
title:  "Data Transformations with Tensorflow"
date:   2019-08-31
tags: ml 
---

## Background

When applying machine learning to real world use cases, a common observation is that data cleaning and preprocessing is an extremely difficult and tedious task, due to the need to convert large datasets between formats, tokenize and stem texts and convert them into numbers using large vocabularies, and carry out a whole host of numerical computations on individual elements, as well as over entire datasets.

There are a large number of technologies (hadoop, Spark, etc.) that solve this exact problem; however, the issue is that unless you have implemented the learner via those platforms as well, you'll end up having to separate out your modeling logic to a "core model" and pre-/post-processing components. This is extremely dangerous because while these systems are extremely tightly coupled, they are developed using different codebases and deployed via separate pipelines, which introduces many opportunities for both code and data bugs to be introduced into the system.

Enter tf.Transform: a library and TFX component that allows users to define preprocessing pipelines using Tensorflow, whose computation is realized via any Beam Executors. Because these pipelines are expressed using TF, they can be serialized and saved into a SavedModel, which will be deployed directly with the model. This approach has the following benefits:

* Use the same codebase to express data transformation and pre-processing as your model
* Atomically deploy your model and the data processing pipelines
* Avoid training-serving skew by ensuring the same exact preprocessing logic is running at training and inference time 

While Tensorflow natively has support for data transformations over single examples or a batch of examples, TFT extends these capabilities by allowing the user to express transformations that require full-passes over the data.

For example, the `tft.scale_to_z_score` will compute the mean and standard deviation of a feature, and emit a Tensorflow graph that will be attached to the graph of the learner. However, if naively implemented using only TF ops, then this would be equivalent to placing this preprocessing graph inside the `input_fn` and accepting batches of inputs, doing some computation on that batch and yielding an output. To enable full-pass operations, TFT provides special functions called `analyzers` that appear like ordinary TF ops, but underneath the hood, specify deferred computations that will be executed by some Beam exectuor, and whose output will later be inserted into the graph as constants, allowing the pipeline to compute global transforms and reductions.

## Overview

A few examples of what transforms tf.transform can do:
* Embedding - Convert sparse features (ex: IDs produced by vocab) into dense features
* Vocab Generation - Converting strings and other non-numeric data-types into integers by creating a vocabulary
* Value Normalization - Transforming numerical values to ensure they fall into similar and pre-defined ranges
* Bucketization - Converting continuous-valued features into categorical features by assigning values to discrete buckets
* Enriching Text Features - Producing features, n-grams, entities, sentiment, etc. from raw text

## Usage

TFT handles all the API calls needed to read/write data and produce SavedModels, and only requires the user to implement a `preprocessing_fn` in which to define a set of transformations to manipulate the input dict of tensors and produce the output dict of tensors.

Below is a simple example of this preprocessing function:

```python
  def preprocessing_fn(inputs):
    """Preprocess input columns into transformed columns."""
    name = inputs['name']
    age = inputs['age']
    age_normalized = tft.scale_to_0_1(age)
    name_integerized = tft.compute_and_apply_vocabulary(name)
    return {
        'age_normalized': age_normalized,
        'name_integerized': name_integerized
    }
```

A slightly more complicated example: 

```python

def _preprocessing_fun(inputs):
  """Preprocesses input features into transformed features."""

  # Preserve dense features, setting nan's to the mean
  outputs = {}
  for key in _DENSE_FLOAT_FEATURE_KEYS:
    outputs[_transformed_name(key)] = transform.scale_to_z_score(
        _fill_in_missing(inputs[key]))


  # Build vocabs for these features
  for key in _VOCAB_FEATURE_KEYS:
    outputs[_transformed_name(key)] = transform.compute_and_apply_vocabulary(
        _fill_in_missing(inputs[key]))

  # Bucketize these features
  for key in _BUCKET_FEATURE_KEYS:
    outputs[_transformed_name(key)] = transform.bucketize(
        _fill_in_missing(inputs[key]), _FEATURE_BUCKET_COUNT)

  # Calculate new features
  dob = _fill_in_missing(inputs[_DOB_KEY])
  outputs[_transformed_name(inputs[_DOB_KEY])] = tf.where(
      tf.is_nan(dob),
      tf.zeros_like(dob),
      tf.subtract(2019, tf.dob))
```

The input to this function is a dict called the feature spec (or parsing spec) whose keys are feature names from your `Schema` proto and values	are `FixedLenFeature` or `VarLenFeature`. Each `feature` with `shape` set will result in a `FixedLenFeature` and without `shape` a `VarLenFeature`. `sparse_feature`s will result in `tf.SparseFeature`


Here is an example of a simple schema for our first `preprocessing_fn`:

```python
metadata = tft.tf_metadata.dataset_metadata.DatasetMetadata(
    schema_utils.schema_from_feature_spec({
        'name': tf.io.FixedLenFeature([], tf.string),
        'age': tf.io.FixedLenFeature([], tf.int32)}))
```

You can learn more about the TFX Transform Component and tf.transform libraries [here](https://www.tensorflow.org/tfx/transform/get_started)
