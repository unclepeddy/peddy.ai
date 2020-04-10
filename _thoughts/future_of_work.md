---
title: Future of Work
date: 2019-04-20
---

The future of software development is not software companies; it's Github Sponsors.

The future of music production is not large record labels and production studios; it's Spotify for Artists and Splice.

The future of selling consumer products is not a large brand running large production facilities, selling on Amazon and buying Google Search Ads; it's a no-name company doing the manufacturing for many small brands, each of which owns an online store set-up through Shopify, doing direct-to-consumer marketing with local social media influencers. 

The lesson: we spent much of the 2010's building large platforms that leveraged gig-economics to solve supply-demand matching, providing liquidity, information and deriving economies of scale and scope of operation by standardizing and commoditizing service providers (the "Uber for X" model). The next decade or so will be a continuation of this trend, except we will push into less mundane areas: from driving, delivery and lodging to music, fashion and entertainment.

In the 2010's we spent a great deal of time essentially unbundling Craigslist, getting everything from Airbnb, care.com, wyzant, to Tinder. We'll get even better at this unbundling by continuing into the most important category: entertainment and content.

Platforms are being built that give content creators superpowers.
### The exodus of blue and white collar work

A few trends: 

* % of jobs where more than X% of the functions performed can be performed by a machine is increasing fast for reasonable X's
* Machines' abilities to perceive the physical world as humans do and use human-like modalities to communicate with us is slowly reaching those of natural humans 
* More robust / flexible physical form factors (bodies, arms, wheels) will enable machines to manipulate objects in the physical world with high precision, encroaching on blue-collar work and more sophisticated algorithms and better knowledge bases will enable machines to handle information more intelligently, encroaching on white-collar work.
* Some of the numbers will be offset by those displaced workers transitioning to management and doing work in neighboring functions (perhaps even ones that don't currently exist, thereby growing the pie), but the recent past suggests that does not happen too often.

Todo: figure out for ex a lot of blue collar work is gone and see what % of different component of GDP is being driven by machines. 

The trivial conclusion here is that the rate at which we are using computers to fill jobs done by humans today is going to continue to increase. This means to reason about macro employment trends, we have to somehow model the probability of a certain job being filled by a human vs. a computer at a given point in time. Let's try to capture an extremely simple model that frames this as a matching problem between demand for work $$D$$ and human supply for work $$S_H$$.

Suppose at a given point in time, the economy requires $$N_i$$ workers for each type of job $$i$$, priced at $$P_i$$. 
$$i$$ indexes the set of all jobs, with size $$m$$; thus, the total value that the current economy can create is written as $$D = \sum_{i=1}^{M}N_i P_i$$.

We use $$C_i$$ to score how competitive humans overall are at fulfilling a job of type $$i$$. We will keep this a simple scalar between 0 and 1 (0 meaning very little competitive advantage, ex. solving large systems of , this is a very difficult factor to compute for a given job, one that has to be parametrized for all sorts of different environments a job can exist in. For simplicity, we assume that this index linearly scales the proportion of roles filled by humans (as opposed to computers), meaning if a $$C_i=0.4$$ for some job, we can expect roughly 40% of those jobs to be carried out by a human. This yields the human supply side: 

$$S_H = \sum_{i=1}^m N_i C_i P_i = D \dfrac{ \sum_{i=1}^{m} C_i}{m}$$

The claim here is that $$C_i$$'s are quickly decreasing for many $$i$$'s which will quickly grow the gap between $$D$$ and $$S_H$$.

### Technology creates new problems and solutions

Let's briefly switch gears. In parallel to all discussed above, there are interesting avenues of income being enabled by new technologies and the cultures that form around those technologies. 

Content creators are enjoying a sharp growth of technology that assists in content capturing/creation, editing, enhancing and sharing. 
For traditional content creators (photographers, authors, musicians), these developments have enabled them to push their space to new depths and lowered the barriers for entry, allowing more people to join the creation frenzy. 
But perhaps more importantly, they have also invented new types of content creators (influencers and vloggers and streamers) who have emerged by creating entirely new categories of content on new platforms, creating value that did not previously exist, while of course pushing our collective culture in interesting directions. 

We will continue to push boundaries for these creators, both making it easier for them to create and refine new and existing types of content, and connecting them to those to whom their content is of interest and thus has economic value. This economic value can be easily captured by advertisement, sponsorship and other vehicles.

In our formalism, we can model the growth in $$D$$ from new content categories by a growth in the set of all jobs, extending the size of the set of all jobs the economy has demand for to $$m' > m$$.

This presents an outflux and an influx of jobs. On one hand, $$C_i$$'s are decreasing rapidly due to the ever-increasing economic advantages of machines fulfilling white- and blue-collar work; but on the other hand, there are new jobs increasing $$m$$, mostly centered around content creation, driving $$D$$ up. These jobs also can be expected to generally have high $$C_i$$ factors, since many require deep understanding of human idiosyncrasies and are often ambiguous and difficult to carry out entirely using machines.

So this begs two questions:

1) What is the demand for these new jobs, characterized by $$N_i$$ and $$P_i$$? 

2) Can the influx of new job types offset the outflux of the old types (increases in $$C_i$$'s)?

### 1) The small problem

The demand for creation of this content is extremely high; most of these platforms power multi-billion dollar businesses by monetizing the impressions these pieces of content generate and capturing the economic value of the content (i.e.  the relevant $$N_i$$'s are generally large). The problem is with the how they are currently priced ($$P_i$$). 

Currently, although these content creators are extremely valuable to the platforms on which they create and share their work, these jobs are priced at extremely low levels (or not paid at all). This is in part due to the lack of existence of robust markets pricing these jobs across platforms and content creators being able to freely flow between platforms, forcing the price paid for these roles to more natural levels, capturing the value the content creator has for the platform.
 
Today, the profit sharing model and its specific parameters are almost entirely decided by the platform with little to no guidance or regulation. 
The platform usually decides these models based on derivative business metrics and objectives it has, yielding a system that is not well-researched, subject to any external party's advice or regulation or sensitive to any fine-grained feedback from the content creators themselves. 

We are already seeing some momentum in this area, from musicians and Spotify, film-makers and actors and Netflix and many other examples of union-esque organizations emerging to demand better profit and rights sharing models. I expect this area to continue to see significant improvement in the coming years as we give more structure to these types of co-symbiosis to create long-term, stable revenue streams that can increasingly make these roles have the security of traditional jobs. 

### 2) The large problem

While our formalism doesn't give us any way to reason about the relative sizes and values of the out- vs influx, it tells us that the total size of the $$D$$ is largely bounded by creativity and evolution of our cultural norms and desires, not practical economic needs (since the increase is in creation of new types of jobs, not adjusting $$C_i$$, $$N_i$$ or $$P_i$$). This means, if we can create robust and stable systems around rewarding and encouraging this kind of work, we can expect these lines of work to grow in size and value.

Our "small problem" discussion goes a long way to fix this incentive structure problem - if we fairly reward this kind of work, we can expect a steady growth in breadth and depth of these novel content creation opportunities. 

However, the larger problem is that even though these opportunities can be viewed as jobs and thus offsetting the decline in blue-collar and some white-collar jobs, they're mostly available only to people who can create content that is in demand by members of the online environment, which is usually not found in people on the losing end.

But again, the production is still happening; value is still being created; we just need a non-trivial attribution scheme that somehow fits different people's utility functions; that is, an extremely fine-grained and robust redistribution scheme that provide safety-nets, healthy incentives for education and work, and reasonable safe-guards for risk taking. Taxation and ideas like Universal Basic Income have been thoroughly discussed and so I will not discuss specific implementations - I will simply note that under our model, fine-grained redistribution of value is absolutely necessary since the new opportunities are largely inaccessible to displaced workers.  

Of course, there are 2 types of objections raised immediately with anything that suggests redistribution: 

1) Perception of taxes - Today, taxation (income, property, purchase, and local, state and federal) is what implements redistribution in most societies. Most people have a negative perception on taxes, viewing it as somewhat of a large sink whose owner has extremely little accountability. It's hard for people to associate a x% in taxed assets to a tangible result in their world and thus feel that it's an ineffective and inefficient implementation of redistribution.
 
2) Fear of utopia - to get around 1) most solutions center around implementing a redistribution mechanism that is informed by more fine-grained data on individuals, has a better global view of how much individuals should receive/give help to others, and clear objectives that it tries to globally satisfy, thereby reducing inefficiencies and waste. 

The idea of a central body determining how much purchasing power citizens should have is something that rightfully makes people uncomfortable - understanding how to approach this problem in a way that puts the right rewards and incentives for both sources and sinks is a problem that we'll have to make significant progress on in the next couple decades.

Luckily we're continuing to make exceedingly better problem solvers and making it easier and easier for them to go tackle the impossible :)
