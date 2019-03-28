---
layout: post
title:  "Optimization is eating the world"
date:   2019-03-30
categories: trends
---

I think optimization theory and operations research will be an incredibly important field in the near future. 
A lot of problems at the end boil down to resource management and operational challenges because most problems don't have impossible answers; but rather just a lot of intricate details that have to be methodically dealt with as scale.
This is why, as our ability to automate increases (automate as in the ability to declare the future state of the system(s), and have non-human machinery achieve it), so does the need to be able to manage it at scale and optimize some objectives.

I actually think there are two specific spaces that will have some fairly interesting problems: theory of optimization (pure academic research), resource management (systems engieering)

. . .
We're learning that a lot of problems of humanity can be solved via matching supply and demand. We'll look at a few systems that are simply automated markets/brokers for supply to be matched with demand. 
However I think the larger point of this piece is to argue advancing optimzation theory and operations research are really important parts of being able to thrive in an environment where a lot of problems are modeled as supply and demand matching.   
. . .

When we have more autoamted vehicles, the ridesharing problem boils down to 

* You have a fleet of vehicles existing on bodies of land
* You have some model of how the demand distribution evolves in time
* You have a set of objectives to satisfy (net cost of operations, average user wait time, ratings, etc.)
* In this case, the good that we're offering is transportation and the resource we're managing is cars (and friends)


When we have more automated factories, planes, trucks, the Amazon problem boils down to

* You have a fleet of special-purpose robots, more automated planes and trucks*
* You have some model of how the mail supply evolves in time
* You have a set of objectives to satisfy (net cost of operations, average user wait, ratings, et.c)
* In this case, the service that we're offering is shopping and the resources we're managing are the trucks, planes, special- and general-purpose robots  

\* _I'm not sure if we'll have last-mile delivery automation for a long while so that may just have to be a human_

And of course, my favorite: Kubernetes :)
Kubernetes turns the providing software services to consumers into a resource management problem. 
The resources are heterogeneous compute, storage and networking devices; the service is "running arbitrary distributed systems."
