---
layout: post
title:  "Unified Intelligence v2"
date:   2019-04-04
tags: machine-learning technology
---

## Background

In my undergraduate thesis, Unified Intelligence, I spent a great deal of time revieweing literature that talked about intelligence and what constitutes an intelligent agent. 
I then developed a framework for assessing an agent's intelligence using only its information processing capabilities. After half a decade of more research, study and thought, I believe I have come up with a much simpler, much less presumptuous framework that still allows us to effectively reason about the intelligence of an agent.

## Problem Statement

We define intelligence as a function of an agent and a set of tasks in an environment. Each task is defined as a partial delta on an equivilance class of states of the environment (the init states), and may be considered accomplished when that partial delta is realized in the environment. The intelligence of the agent may be measured via the effectiveness and efficiency with which it accomplishes the task in repeated trials, starting in various instances of the init states. This means to arrive at a notion of "general intelligence," we must generalize over all possible tasks in all possible environments.

## Formulation

Unlike in my previous formulation, where I spent a great deal of effort carefully crafting requirements for the ways in which the agent must be able to process information, here I intend to stay at a much higher level, only concerning myself with 'capabilities' it must possess. 

I roughly break down intelligence to three high-level capabilities: perception, reasoning and manipulation.

### Perception

An agent must be able to perceive and interpret the world around it in a useful way. Note, this is a much stronger requirement than sensation. 
While perception requires some sensory mechanism(s) to ingest information (visual, auditory, multispectral, locational, etc.) about the environment of the agent, perception goes further to require that the agent be able to post-process and interpret the information in a useful way.
Note that as far as the act of perception is concerned, there is no universal definition of 'useful.' Two intelligent agents may have vastly different representation formats and semantics for their sensory input post-processing.

### Reasoning

The agent must be able to autonomously carry out inference, given a set of priors. This means, using information about the state and history of itself and those of the environment, it must be able to effectively and robustly come up with and answer a relevant and related set of questions. 
Note that relevant here is not universal for either agents or situation. Two intelligent agents can use the same personal and environmental state and context, but differently answer a different series of questions leading them to different posteriors given identical priors.

### Manipulation

An agent must possess vehicles via which to interact with the world, and it must be able to control these vehicles to attempt to drive its observed state of itself and its environment to a desired state, arrived at through active reasoning.
Note that this vehicle can be as simple as a single character stream, or as complex as a physical form factor with arms, legs and sound generation devices. 
Also note that how it arrives at a "desired state" of the world and itself is an implementation detail of the agent's reasoning mechanics.


## Omission

Absent from this formulation is any mention of "goals." This is due to my fundamental belief that goals, objectives, incentives, rewards, etc. are tools that the agent creates for itself as heuristics that allow it to build mechanisms of reasoning.
It is plausible that human intelligence can be thought of as having evolved due of set of innate goals (ex. will to live); but this is a characterization of the the evolution of human intelligence; it says nothing about the possible characteristics of intelligence birthed from non-evolutionary methods.
Goals and rewards are features of learning, not intelligence and learning s a consequence of the existence of intelligence in an agent, not the other way around. An intelligent system has the ability to create goals from information learned of its environment, interpret them from its immutable makeup, or create them dynamically with no prior motivation and/or meta-goals.

## Evolution and The Far Future

For most perceptual tasks (speech recognition, image classification, etc.), machine-learned neural network models exhibit near- or super-human abilities. For those that they don't, we have pretty clear view of the route that will take us there (a combination of more data, more compute and a few architectural innovations).

For reasoning, we have barely scratched the surface. Most ML methods produce models that lack the ability to generalize and/or form useful abstractions. The path forward is to a large extent unclear. 
While a few of the large players have diverted their attention to producing cross-tasks, cross-modality learning (ex. "one model to learn them all" by Kaiser et al) it is unclear if the hypothesis spaces granted by our current model architectures even allow (let alone encourage) networks to make use of abstractions and conceptual meta-graphs.
Whether we have to come up with better network architectures, learning mechanisms (is backprop truly conducive to learning to do high-level reasoning or do neurons need a better grammar for communication with one other), task size and complexity, and many more are open questions waiting for a bright mind to tackle.

Manipulation is where the true value and danger of the other two capabilities can be observed by humans and thus can be thought of as an intelligent agent's presentation layer. So far, this presentation layer has been constrained to characters in a terminal, pixels on a screen and sounds generated by a speaker; but soon, we'll have many more human-esque media through which to observe non-human intelligence. As we gradually move towards this world, we will undoubtedly see more fear and uncertainty. 
It is almost inevitable that we will turn back to our primitive instincts and reject the unfamiliar, new breed of agents sharing our physical resources. Just as we have done with those of different religions, sexes, tribes, preferences, race, etc. This will require us to re-formulate (or perhaps formally formulate for the first time) how we as a species relate to other beings that occupy the same space.

## Today and The Near future

But years before this reality, before we have generalized intelligence, before we have to decide how to discriminate between the rights of natural humans and a man-made agents, we will be inundated with agents that hold a proper subset of these three capabilities. They will look nothing like us; they will have no physical embodiment or voice to scare us with. They will interact with humans indirectly and directly through sub-second API calls that shape the content we see, the people we're exposed to and sometimes even the lens through which we see the world.
This process has already started and is happening millions of times per second around the planet. While currently, they indirectly affect us by simply affecting how and what content we interact with, soon they will have sophisticated enough reasoning and maniuplation capabilities to interact with us directly.


It does not take a whole lot of imagination to conjure up a vision for the online world where future generations of language models such as GPT-2 (or GPT-10) are freely available to people around the world.
In this world, we will start to see the portion of non-humane created prose online increase exponentially. Following in the footsteps of text will be images, then audio and then video.
In this world, we will have to accept that communicating with narrowly intelligent agents online is just part of life on the internet. The concept of authenticity will have to evolve to support this dramatic shift in the content landscape.

While this may be a scary, grim outlook, I believe it is a pragmatic one. Using my framework, we are on the path of mastering the generalized manipulation of intelligence, which is profound in that it allows us to leave the plane we've been operating on (perception, reasoning, manipulation) and control it as we do with all other technologies.
This is an incredibly valuable achievement and will affect us in pronounced ways. If our goal truly was to continue life and our intelligence a tool to achieve this (and other derivative) goals, we would all cease researching this field as it has a non-trivial chance of destroying many or all of us in some given time-frame.
But (according to me (: ) that's not how intelligence works. We will continue exploring these routes until there are problems to be solved, threads to be reasoned about and questions to be asked. Therefore, a rough version of the future I've outlined is more-or-less inevitble. The question is how do we as a species help shape our path forward.

My hope is that we use the next few years to prioritize coming to a consensus about what our collective values are and what objective(s) we will use our physical and virtual resource to try to satisfy.
