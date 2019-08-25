---
title: Personality
---

Personality is an extremely hard topic to try to disect; there is a ton of literature on the topic (mostly in psych journals) which try to assemble an understanding of the topic in a top-down manner (by starting with our intuition about personality, and iteratively breaking it down to more concrete building blocks). 

My mental model of personality is heavily based on bayesian networks.

When an event takes place, we sense and perceive it. Our perceptual systems (sight, hearing, etc.) interpret the raw signals they receive from our sensory devices (eyes, ears, etc.) and transform them into a shape that can be understood by other networks in the cortex. It is at this point that the event has been understood, a ground truth about the state of the world has been established, and your brain has to figure out what to do next. 

This means we have to _interpret_ the event, which means, given that we now know the probability of an event, we need to know "what relevant questions do I need to ask and answer?" Concretely, suppose we could assign a probability to every event $$e_i$$ that could take place in our environment. 

_One's personality can be characterized by the iterative posteriors they calculate when given a prior._

For example, suppose you look out of the window and realize that it's raining. You now know something about the state of the world: probability of rain in the next few timesteps is high. My claim is that the mechanism that we call personality is the engine that determines what posteriors you (subconsiously) decide to calculate, reason about and believe about the state of your environment, given this new-found knowledge. 

Naturally, as soon as this fact is known (probability of rain is high), you will subconsiously explore a large number of associations, aiming to understand the implication and significance of this fact. Because of the large number of possible associations that _could_ be explored, each agent develops a different exploration strategy. A simple, context-free implementation of this strategy can be thought of as a function that takes a single fact (or to be more correct, a thought with a known probability), the prior, and outputs a probability distribution over all possible thoughts, allowing us to know which thoughts may be most relevant to our prior. Now, we can choose the top K probabilities, and explore their associations because we perceive them to be more relevant and high-impact than others. The strategy consists of the recursive application of these 2 steps (calculating the probabilities of all posteriors, and exploring only the top K) to the graph of thoughts, which allows us to arrive at a set of pertinent posteriors (conclusions), for a given prior. 

### Physical Implementation

It's fair to wonder whether such a model can be reasonably mapped to what we know about the machinery of the human brain. At the end, it will be partly speculative because at present, we don't know how the brain implements what we are referring to personality. But here are a few high-confidence claims about bits that we think must be true:

* In the first couple years after being conceived
* The process of myelination goes on for more than the first 2 decades of one's life
* When a human is critically thinking about something, we observe neural storms in specific areas of the cortex 

With these in mind and with a few leaps, we can come up with the following conjecture about how the brain could implement our model of personality.
The function that maps a thought to a probability distribution over all possible thoughts is not directly implemented; rather, for a given thought, the top K most pertinent associations are physically attached by forming direct connections. This means when we think about an idea, we are subconsiously triggering a number of related ideas to various degrees because of the physical connection between them. 

One bit that is unknown is on what basis we strenghten or weaken connection between neurons. We know that this process is happening during the day and while we sleep, but exactly how the neurons decide to prune or strenghten bonds with their neighbors is unknown. What we don know is that the more a pathway is used, the higher the likelihood of the connection being strenghtened. 

### Interpretation

Recall our strawman design for personality: a function that given a thought, will tell us which neighboring ideas should be explored. This can be modeled as a function $$ f(v_i) = V_i \subset V$$ where $$V$$ is the universe of all possible thoughts and $$V_i$$ represents the set of ideas that should be explored, whenever $$v_i$$ is thought about. $$\|V\|$$ is bounded by the size of the set of all possible ideas that can be thought about (Geoff Hinton calls each of these a 'thought vector') so intuitively reasoning about the relationship between example $$v_i$$ and $$V_i$$'s is likely futile. What is of slightly higher value is inspecting $$f()$$. 

First, we note our assumptions on the structure of this function. We assume it to be context insensitive, stateless, lacking any feedback mechanism or notion of temporality. Most of these are assumptions we have to break to develop a more accurate model, but we will hold them to ease our investigation.

Then, we realize that both the input and output spaces of this function are high-dimensional and abstract; so trying to directly inspect $$f()$$ may not be fruitful. When faced with a high-dimensional, partially (completely?) hidden function, we do as we are tought in elementary mathematics courses and project them onto low-dimensional, known spaces and see if we can learn something about the function by observing its projection onto the known space.

Let's project $$f()$$ onto a fairly simple, single-dimensional space: happiness. We can formally define a function $$h:V \rightarrow R^1$$ that tells us how happy thinking about a given idea makes us. $$f(v_i$$ tells us how happy an idea in isolation makes us and $$f(V_i)$$ tells us how happy we will be if we reason about $$v_i$$. This is a key metric of interest because it, in a way, tells us how optimistic we are: two people with vastly different $$h(V_i)$$'s for a given $$v_i$$ can take the same bit of information $$v_i$$ and come to conclusions that make one much happier and more content than the other, due to the particular way that their brain has been wired to make associations. 

TODO: In the first decades of your life, associations are programmable and plastic; what neural pathways you practice will determine the configuration of this wiring.
