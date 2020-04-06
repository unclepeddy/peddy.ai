---
title: On Personality
date: 2019-08-14
---

Personality is an extremely hard topic to try to dissect; there is a ton of literature on the topic (mostly in psych journals) attempting to assemble an understanding of the topic in a top-down manner (by starting with our intuition about personality, and iteratively breaking it down to more concrete building blocks). 

My mental model of personality is heavily based on Bayesian Networks, and of course, builds on my mental model of [intelligence](http://blog.peddy.ai/2019/04/04/unified-intelligence-v2/) (which I view as a prerequisite for the existence of personality).

When an event takes place, we sense and perceive it. Our perceptual systems (sight, hearing, etc.) interpret the raw signals they receive from our sensory devices (eyes, ears, etc.) and transform them into a shape that can be understood by other networks in the cortex. It is at this point that the event has been understood, a ground truth about the state of the world has been established, and your brain has to figure out what to do next. 

This means we have to _interpret_ the event, which means, given that we now know the probability of an event, we need to know "what relevant questions do I need to ask and answer?" Concretely, suppose we could assign a probability to every event $$e_i$$ that could take place in our environment. Over the course of this essay, I'd like to argue the following:

_One's personality can be characterized by the iterative posteriors they calculate when given a particular prior._

For example, suppose you look out of the window and realize that it's raining. You now know something about the state of the world: probability of rain in the next few timesteps is high. My claim is that the mechanism that we call personality is the engine that determines what posteriors you (subconsciously) decide to calculate, reason about and believe about the state of your environment, given this new-found knowledge. 

Naturally, as soon as this fact is known (probability of rain is high), you will subconsciously explore a large number of associations, aiming to understand the implication and significance of this fact. Because of the large number of possible associations that _could_ be explored, each agent (person) develops a different exploration strategy. A simple, context-free implementation of this strategy can be thought of as a function that takes a single fact (or to be more correct, a thought with a known probability), called the prior, and outputs a relevance score for all thoughts, allowing us to know which thoughts may be most relevant to our prior. Now, we can choose the top K relevant thoughts, and explore their associations because we believe exploring these k thoughts will allow us to interpret our new-found information (understand its effects on our model of the environment). The strategy consists of the recursive application of these 2 steps (calculating the relevance of all posteriors, and exploring only the top K) to the graph of thoughts, which allows us to arrive at a set of pertinent posteriors (conclusions), for a given prior (observation). 

### Physical Implementation

It's fair to wonder whether such a model can be reasonably mapped to what we know about the machinery of the human brain. At the end, it will be partly speculative because at present, we don't know how the brain implements what we are referring to as personality. But here are a few high-confidence claims about bits that we think are true:

* In the first couple years after being conceived
* The process of myelination goes on for more than the first 2 decades of one's life
* When a human is critically thinking about something, we observe neural storms in specific areas of the cortex 

With these in mind and with a few leaps, we can come up with the following conjecture about how the brain could implement our model of personality.
The function that maps a thought to a probability distribution over all possible thoughts is not directly implemented; rather, for a given thought, the top K most pertinent associations are physically attached by forming direct connections. This means when we think about an idea, we are subconsciously triggering a number of related ideas to various degrees because of the physical connection between them. 

One bit that is unknown is on what basis we strengthen or weaken connections between neurons. We know that this process is happening during the day and while we sleep, but exactly how neurons decide to prune or strengthen bonds with their neighbors is unknown. What we do know is that the more a pathway is used, the higher the likelihood of the connection being strengthened. 

### Interpretation

Recall our strawman design for personality: a function that given a thought, will tell us which neighboring ideas should be explored. This can be modeled as a function $$ f(v_i) = V_i \subset V$$ where $$V$$ is the universe of all possible thoughts and $$V_i$$ represents the closure of ideas that should be explored*, whenever $$v_i$$ is thought about. $$\|V\|$$ is bounded by the size of the set of all possible ideas that can be thought about (Geoff Hinton calls each of these a 'thought vector') so intuitively reasoning about the relationship between example $$v_i$$ and $$V_i$$'s is likely futile. What is of slightly higher value is inspecting $$f$$. 

First, we note our assumptions on the structure of this function. We assume it to be context insensitive, stateless, lacking any feedback mechanism or notion of temporality. Most of these are assumptions we have to break to develop a more accurate model, but we will hold them to ease our investigation.

Then, we realize that both the input and output spaces of this function are high-dimensional and abstract; so trying to directly inspect $$f$$ may not be fruitful. When faced with a high-dimensional, partially (completely?) hidden function, we do as we are tought in elementary mathematics courses and project them onto low-dimensional, known spaces and see if we can learn something about the function by observing its projection onto the known space.

Let's project $$f$$ onto a fairly simple, single-dimensional space: happiness. We can formally define a function $$h:V \rightarrow R^1$$ that tells us how happy thinking about a given idea makes us. $$f(v_i)$$ tells us how happy an idea in isolation makes us and $$f(V_i)$$ tells us how happy we will be if we reason about $$v_i$$. This is a key metric of interest because it, in a way, tells us how optimistic we are: two people with vastly different $$h(V_i)$$'s for a given $$v_i$$ can take the same bit of information $$v_i$$ and come to conclusions that make one much happier and more content than the other, due to the particular way that their brain has been wired to make associations. 

### Implication

If you believe the model that we have used thus far, it should naturally follow that your personality, at a given point in time, is implemented via hardcoded connections in your brain's hardware and thus not easy to mutate at a moment's notice. This means what you choose to think about and ultimately believe about the world, when given new information (i.e. your personality) does not change no matter how much you consciously want it to. You can affect your behavior at runtime by consciously intervening and choosing what actions you take and what paths you actively reason about, but as soon as the explicit attention is gone, associations will be calculated according to the current wiring of your brain. 

This means the only way to make non-ephemeral changes in your personality is to change the physical connections wired in your brain. As mentioned in the beginning of the essay, we don't presently know how exactly these connections get strengthened or weakened but we do know that the more a pathway is exercised, the more likely it is that the associated neurons will form connections with one another. 

This leads me to believe the only way to make lasting changes in your personality is to come up with a small set of [principles](principles), rules, ideals and philosophies that you can internalize, and use to validate each and every one of your actions and thoughts. Whenever you act or think in a way that is not in accordance to these ideals, you have to immediately work to correct the action or thought and nudge yourself in a direction more aligned with your principles. It is extremely important that this set of principles is simple and internally consistent, because every action and thought of yours should be checked against it.

TODO: In the first decades of your life, associations are programmable and plastic; what neural pathways you practice will determine the configuration of this wiring.

*If we're not careful, it may be possible that for many graphs, $$V_i = V$$ for every $$i$$. So a better definition of $$V_i$$ will include only nodes that are reachable from $$v_i$$ in at most k steps (or some other way of constraining the search). 



