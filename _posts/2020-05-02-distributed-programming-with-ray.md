---
layout: post
title:  "Distributed Programming with Ray"
date:   2020-05-02
tags:   machine-learning technology
---

## Context

Ray is a distributed computing platform (1) to scale Python applications (2) with minimal effort (3).

Let's break this mission statement down into its 3 major components:

(1) Distributed computing platform: Ray is a highly-performant runtime written in C++ that scales extremely well to large, heterogeneous compute clusters. 

{% include image.html url='/assets/2020-05-02-distributed-programming-with-ray/scalability.png' %} 

(2) Python applications: Currently, the focus of Ray is allowing Python developers to target their applications to Ray. This is because of the impressive growth the Python community has experienced in the recent past, and also the native Python runtime's lack of support for parallelization. However, Ray can theoretically support many other languages, and when the right use cases show up, the support for those language bindings will certainly be added (support for Java language bindings is already a WIP).

(3) Minimal effort: Ray allows users to use very simple abstractions to define their intent and is extremely easy to integrate into already existing applications. Once a Ray program is written, the same exact code can be used to run on a local laptop, as a large cluster.

Ray is similar to libraries like AsyncIO, multiprocessing.Pool and joblib, while providing a more general API, much better support for stateful computations and scalability characteristics.

While there are many libraries being built on top of Ray, which are expected to attract a lot of developers, the focus of this post is on Ray's core API, which can be used to scale out python programs.
 
## API

The Ray API is extremely simple as it builds on simple, core abstractions found in most programming languages: classes and methods.

A class is modeled as an `Actor` and a method is modeled as a `Task`, with Ray providing basic facilities to orchestrate various actions on these abstractions. Let's go over the basics.

All Ray programs start with a call to `ray.init()` which initializes the Ray context.


Any Python function or class that wants to be executed in Ray's runtime needs to be simply decorated with a `@ray.remote` decorator.

```python
@ray.remote
def add(x, y):
  return np.add(x, y)
```

When we want to execute and retrieve the result of this operation, we can simply do:

`future_id = add.remote(x, y)` to schedule the execution of `add` which returns a future and

`ray.get(future_id)` to retrieve the result of the operation. The first call is of course asynchronous, whereby Ray promises to not forget to execute the function, and the second is synchronous, which blocks until Ray has executed the function, returning the result.

Similarly, we can decorate a class if we need our computation to be stateful.

```python
@ray.remote
class Counter(object):
 
  def __init__(self, cap):
     self.cap = cap
     self.val = 0
  
  def increment(self, inc=1):
     self.val = (self.val + inc) % self.cap
     return self.val
```

To use this class, we use the same remote API to both initialize the instance as well as execute various methods:

```python
counter = Counter.remote(15)
results = [counter.increment.remote(i) for i in range(10)]
print(ray.get(results))
```

If there are resources that we want to do explicit accounting of, we can tell Ray what our function needs to run:
`@ray.remote(num_gpus=1)`

Of course, this requires us to initialize Ray to do the accounting, using a set number of resources:
`ray.init(num_gpus=4)`

Or if we have other types of resources, we can define a custom resource, and tell Ray what quantity of it each call requires:

`ray.init(resources={'CustomResource': 2})` to initialize Ray context with custom resources and their capacities.

`@ray.remote(resouces={'CustomeResource]: 1})` to declare what resources a Task needs.


Another interesting part of the Ray API is the `wait` facility, which allows us to wait until one or more items from a list of futures have returned. This function returns two lists, first containing the items that have been executed and ready (up to `num_returns` items) and the second containing the items that are either not finished executing, or finished executing but weren't selected as the set of `num_returns` items returned.

```python
counter = Counter.remote(15)
results = [counter.increment.remote(i) for i in range(9)]

to_process = results
while to_process != []:
  processed, to_process = ray.wait(to_process, num_returns=1, timeout=1)
  print(ray.get(processed))
```

TODO: cover RLlib, RayServe and go through benchmarking application
