---
title: My Superpower
---

Recently during a Q&A, a high school student asked me one of the toughest questions I've had to answer in a while: "You are very successful! What is your superpower?"

It was extremely hard for me to answer this question, as it frames the world with a Disney-inspired perception that magical, out-of-character qualities lead people to success and happiness, which is fundamentally incompatible with how I view the world. But regardless of whether I agree or disagree with the framing of the question, I had to do my best to give a reasonable answer. Thus I decided to do what any computer scientist would do, which is to reduce the problem to a similar problem that they can solve, and then transform the solution of the alternate problem back into the original problem space.

The reduction of this problem to a space that is more formal and thus easier to answer reads: "What is a skill or ability that is somewhat unique to you, that you deem influential in your life and success?"

This is still a relatively difficult question to answer, because a good answer should be both general and timeless.

The best answer I've been able to come up with to this question is the following: "My superpower is the ability to become genuinely interested in anything that I deem beneficial to be interested in."

## tl;dr

It is significantly easier and more enjoyable to work on and improve on what you are interested in. If you're intentional enough about how you spend your time, you can cause yourself to become interested in anything you want to be interested in. This makes learning new things and building your skills pleasant, efficient and effective. Once you realize how effective you are at learning new skills, you will start spending more of your time and energy on _what_ to become interested in (since the rest is mechanical) and start developing configurations of interests and a body of knowledge and skills that is extremely unique and valuable.

To elaborate, I will carry out two discussions of this idea: one based on intuition, and the other based on a bit of mathematical formalism.

## The Intuition

It is not uncommon for people to think that they have a calling, or something that they are "meant to do." Those whose thoughts are more scientifically grounded will claim that there exist causes, problems or disciplines about which they are extremely _passionate_. Those who have even a more practical view of their internal mechanics will note that these areas of passion are both products of their experiences (as opposed to being innate to them in some form) and change with time. 

The way I think about this topic (what one is interested in) is even more extreme than this last group. Namely, I believe any individual can become interested in any topic, provided they have a particular set of experiences. Furthermore, if one is intentional enough about their everyday life, she can make it so that it is extremely likely that she is exposed to the ideas and experiences that make it likely to become genuinely interested in a given space.

The insight that this is built on is that what you are interested in is not entirely controlled by your conscious mind; it is a function of many non-obvious connections that are built at sub-consious levels and so if you want to make it more or less likely that you become interested in something, you cannot simply "talk your brain into it;" you must instead create the type of environment that will make it more likely for the subconsious parts of your brain to become obssessed with it, and thus you at the behavioral level, express more interest in it. Furthermore, the tactics you may use are fairly general and thus this whole process is easy to templatize to be repeatedly applied to anything you want to be more interested in.

While this might sound trivial to many, it was a fundamental shift in how I viewed my life that occured during my first year of university. Once I realized I could make myself become interested in anything I wanted to be interested in, I thought, "Wow.. cool.. now what? What do I want to spend my time enjoy doing or learning in the next month, year or decade?" 

This way of thinking transforms the challenge from being one about execution (how do I get better at $$x$$) to one about decision (which $$X$$ do I want to be better at) because it proposes that if we find the right $$x$$, then given enough time, we can become genuinely interested in it, thereby making the process of becoming better at it an enjoyable experience. 

Thinking about operationalizing this high-level idea, we have to answer two questions:
1. How do we choose these $$x$$'s?
2. For a few candidate $$x$$'s, how do we actually become more interested in them?

The second question is more tactical, so let's answer it first.

There are a couple key observations that may help in answering the question "How do I become interested in something?" Note that these observations are just that: personal observations; while I believe they generalize to others, YMMV.

1. As already noted, much of whether we are interested in something or not is driven by subconsious functions.
2. Your brain will have an easier time being interested in something that it's likely to remember.
3. There are multiple facets to a concept or space of ideas, with widely differing probability of generating interest in someone 


### 1. Exploration

The first problem is solved via exploration: we have to explore the set of possibilities to find a few candidate ideas that we may be interested in. These candidate ideas could arise naturally or strategically. Meaning, each candidate idea can come about by 

i) exploring around our current interests

ii) asking what we _should_ be interested in

The first approach aimlessly furthers our current interests while the second takes a more normative stance and asks what spaces are practical, beneficial and lucrative for us to know more about. Of course, there is no universal way to dictate what is "good" to know; this approach simply tries to take a more goal-oriented way to learning new skills where you may want to learn about a new space in order to be more productive, be able to contribute to certain discussions, better relate to those around you, or try a new line of work.

Both of these approaches involve some level of exploration wherein we expose ourselves to new ideas, people and situations. This can be done via a variety of techniques, ranging from ones as simple as watching Youtube videos and reading blogs on the topic, to reading reference textbooks and having somewhat-informed discussions with people who live and breathe in the space of interest. The key is to have an open mind, and be extremely curious about the topic during these periods of exploration.

You may think I have cheated - if one can be "extremely curious" and "keep an open mind" on demand, then isn't this a solved problem? Yes and no - I think reminding yourself to actively be curious and wonderous about something during a single conversation with an expert or a few nights' of Youtube binge-watching is much more manageable than doing it at all times on a daily basis. By doing this kind of exploration in a "sprint," we make it possible that we can force ourselves to act a certain way (more curious than normal) than we otherwise would, in the process, making it more likely to be inspired or spark an interest.

We first note that both of these are search problems
Exploration as a means of finding new spaces, exploitations (talking to people, reading books, building things) as a means of generating interest.

## Technical Formulation

More formally, we define the level of interest of an individual in a topic as the percentage of time that individual would be willing to spend in the next T timesteps, in the absence of all external forces (exposure to other ideas, people and experiences).  We can thus write the level of interest $$L$$ as a function of the person, $$p$$ and the idea $$i$$, parameterized by $$T$$: of $$L_T(p, i)$$

As formulated, this function will yield a number between 0 and 1 which characterizes the portion of $$T$$ that will be spent on $$i$$; this means that if I somehow compute this function for all $$i$$ that a $$p$$ can spend time on, I will end up with a density distribution with the property: $$\sum_{i \in I}L_T(p, i) = 1$$. What is of interest to me is how this distribution evolves (i.e. with change $$T$$) once we allow external forces to act on the system, i.e. expose $$p$$ to new ideas and experiences. 

My conjecture is that in fact, there exists a learnable function $$f$$ that maps the sequences of experiences $$E = \{E_0, E_1, ..\}$$ $$p$$ has to a probability distribution over the space of all $$L$$: $$f(p, E) = 
We first note that these are both search problems (read the technical discussion if wondering how the second can be formulated as a search problem); it may then not come as a surprise that I will propose solving both with one of the robust classes of search algorithms: exploration-exploitation.

Let us define a concept via a graph, characterized by a set of nodes and edges $$G = (E, G)$$. Of course, the definition is recursive, whereby each node in $$G$$ itself is a graph. To be technically more sound, we should replace $$G$$ with $$G'$$, a union of $$G$$ and a type of atomic vertex, which terminates the recursion of the vertices. In fact, the physical implementation of a graph _only_ consists of these atomic nodes; the composition of nodes is simply an abstraction that helps us reason about higher-level concepts represented by the graph.

In this formulation, edges are characterized only by a number between 0 and 1 denoting the strength of connections between two nodes.
