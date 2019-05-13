---
layout: post
title:  "Backprop: The Bastard Child of Calculus"
date:   2019-05-12
categories: ml
---

_This thought is dedicated to M. Steuben who both introduced me to the writings of Richard Feynman and formally taught me to the basics of artifical intelligence my junior year in high school._ 

Calculus is possibly the most powerful tool humanity has invented, appearing in physical sciences, actuarial science, computer science, statistics, engineering, economics, business, medicine, demography, and many many more. 
Richard Feynman famously said "Calculus is the language God speaks." Regardless of what one thinks about religion, the sentiment is a compelling one: calculus has given us a language via which we can describe some of the most fundamental properties of nature. Whatever the language with which fundamental rules of nature were encoded may have been, it is hard to believe that its grammar did not implement the basic tenants of calculus _somehow_.

Many think of the value of Calculus in that it affords us the following capability: Given a problem that can be modeled mathematically (meaning we can come up with a description of the system using mathematical concepts and language), calculus allows us to find an optimal solution (for some definition of optimality).

While this is not incorrect (Calculus is often used for finding rates of change and thus locating optimality), it greatly undersubscribes to the power and beauty of this technqiue by framing it as a general-purpose optimization technique.

So how would I describe the value of Calculus? 

I think of Calculus as an approach to problems sovling; one that is built upon a single insight: continuity enables recursion ad infinitum.

This means that given a continous problem, we can break it up into small pieces, solve the small pieces, and combine the solutions together to solve the original problem. Calculus gives us a formal language to apply this approach (divide-and-conquer) to _any_ problem with a continuous mathemtical description.
This profound insight was first made by Euodoxus and Archimedes thousands of years ago, but was revolutionzied by Newton and Leibniz who were able to devise 1) A general set of primitives and 2) A rigorous set of mechanics via which to manipulate those primitives. We call these primitives and mechanics Calculus.

The Fundamental theorem of calculus states, given an arbitrary function $$F(x)$$ (not entirely arbitrary, a few restrictions apply..) , we can claim there exists a related function $$f(x)$$ such that for any region described by endpoints $$a$$ and $$b$$:
$$ \int_a^b f(x) dx = F(b) - F(a) $$

On the RHS, we have the difference of the original function being evaluated at two endpoints of a region, defined by $$a$$ and $$b$$. 
On the LHS, we make the unbelievable claim that there exists a function $$f(x)$$, somehow related to $$F(x)$$, such that if we evaluate it at _every_ point between $$a$$ and $$b$$ and sum up the results, we end up with the difference we obtained on the RHS when we evaluated $$F(x)$$ at the endpoints of the region.

This approach is useful because it allows us to relate the behavior of an object at its surface (endpoints of $$F(x)$$) to its internal mechanics (integrating our way from $$a$$ to $$b$$ through $$f(x)$$). 
As a language, Calculus allows us to reason about the total behavior of an object by breaking it into smaller, simpler objects, exploiting some property of those simpler objects, combining the transformed objects and zooming back out.

This approach works mainly because complexity of an object can be divided into two groups: those that contribute to its behavior (useful information) and noise. At a high level, with Calculus, we can peer into the complexities of an object, separate out only pieces of information that drive its macro behavior and discard the noise or randomness that ends up being annihilated by other noise or randomness. Let us look at a concrete example that realizes this powerful but abstract idea.

Those familiar with electrodynamics will recognize the following formulation dictating the way an electric field changes in space:

$$ {\nabla\cdot} E={\rho\over\epsilon_0} $$

This is the equation that James Maxwell wrote down over 200 years ago that marked the beginning of humanity's understanding and mastery of electric and magnetic fields.
This realization went on to fuel the creation of radios, televisions, computers, and many other critical inventions. 
To apply it, we use nothing but a generalization of the fundamental theorem of calculus, known as the divergence theorem:

$$  \int_D ({\nabla\cdot} F)dV=\int_{\partial V} F\cdot ndS  $$

This statement is a generalization of what we discussed seconds ago, relating the property of a field at the surface of an object ($$\partial D$$) to a related property of that field (its divergence) throughout the object ($$D$$). The key insight is that the LHS excludes all idiosyncratic factors of the field and thus, we can reason about a global property of the field over the object by only looking at the surface of the object.
Using these techniques, and a few other key formulations that Maxwell came up with, we can characterize all macro properties of electric and magnetic fields (these rules break down at the quantum level but that's not a problem since that wasn't their purpose anyways..).
As with many other inventions, Calculus was instrumental in our ability to take command of these invisible fields to propel our species into the next phase of human dominance over nature.

If radios, computers and the internet were some of the most important technological advancement for the past half a century, what will be the analog for the following 50 years? While different people will have different guesses and rationales for this, I claim that a common contender will be intelligence.

One of the most difficult challenges of our time is the learning problem, which can roughly be characterized as the following: Given an objective and _some amount of data_ about attempts to satisfy the objective, learn a decision function that _generally_ satisfies the objective.
This problem can be thought of as the holy grail of AI, as it allows an arbitrary agent to learn how to solve arbitrary problems (for which we can obtain data, either from past experiences, or by allowing the agent to generate data through simulation and/or practice). The two italicised items describe the two principal axes that we are pushing to improve our current approaches.
Namely, We are on the quest to find ways to make our current learning algorithms more data-efficient (learning from a few examples as opposed to a few millions) and more general (learning the distribution from which the data generated from, not the distribution that the data itself describe). 
Unraveling the layers of abstraction one more time, this is by in large a credit assignment problem: given a single data point, tweak the parameters of the decision function such that the correct or better answer is more likely; in other words, how do you assign credit or blame to the individual parameters of the function, given some notion of correctness of the overall behavior of the system.

As you may notice, this is a problem space where we expect calculus to pop up: given information at the boundary of an object (a function's input and output interface) we need to tweak the internal mechanics of the function such that some auxiliary conditions are optimized.  
Of course, to date, our best solution to this problem is rested heavily on technical insights of Calculus. In most learning domains, the most common implementation of credit assignment is built upon backpropogation, an algorithm that given deviations between expected results and those realized by a neural network, will determine how much and in which direction each parameter of the network should change.

To date, backprop has achieved incredible results in helping train artificial neural networks. In fact, just last Friday, I had the privilege of celebrating with Geoff Hinton his receiving of the Turing Award (along with Y. Bengio and Y. Lecun) for formulating this algorithm many years ago. However, as Geoff notes himself, there is a somewhat off putting fact about backprop: it isn't validated by nature (i.e. it's not how biological neural networks learn).
While we have strong evidence to believe that biological neural networks implement a learning algorithm that is vastly different than backprop, many researches believe it is here to stay as the bedrock of learning in the next few years or decade, and it is more likely than not that that is the case. Deep learning is only at the beginning of transforming almost everything that we do as humans, and backprop is an essential part of the story.

However, I would remiss to not notice a peculiar happening: ever since the birth of calculus, we have had tremendous success in applying it to uncover and understand deep mysteries of nature. 
However, biological neural networks are systems whose language seems to transcend that of calculus. While we cannot yet fully characterize this language, we know that biological neurons speak to one another through a morse code-like language, likely with a rich and complex grammar.
The way I look at this is that it is not the case that machine learning has progressed so far _because_ of backprop but rather _despite_ it.
Unfortunately, the incentives are not aligned to motivate too many people to do fundamental research on learning algorithms. While there are a few heads in our and other research groups thinking about fundamentally different bases for learning, the vast majority of talent is looking for the next incremental improvement of learning efficacy by applying momentum and inertia to the learning rate in the right way.

It is unclear if we can build generally intelligent systems while keeping backprop at the core of the learning algorithm. It is unclear whether whatever implementation of credit assignment biological neural networks do is necessary for general learning systems (or whether the computational complexity of its language imposes a lower bound on the information processing capabilities of a agent looking to mimic its behavior).

It may be the case that this time, we have tried applying this technique to a problem that nature herself could not solve using calculus.

