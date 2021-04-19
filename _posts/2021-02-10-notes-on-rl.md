---
layout: post
title: Notes on Reinforcement Learning
date: 2021-02-10
tags: machine-learning math
---

[Pieter Abbeel](https://people.eecs.berkeley.edu/~pabbeel/) is one of the world's leading RL researchers. He has recently made a lot of the material he teaches in classes at Berkley free on the internet. The below is an excerpt of my notes from his Deep RL Bootcamp.

### 1 - Motivation + Overview + Exact Solution Methods

[Video](https://www.youtube.com/watch?v=qaMdN6LS9rA) [Slides](https://drive.google.com/file/d/0BxXI_RttTZAhVXBlMUVkQ1BVVDQ/view)



*   RL Algorithms Landscape
    *   DP
        *   Value Iteration
            *   Q-Learning
        *   Policy Iteration
            *   Actor-Critic Methods
    *   Policy Optimization
        *   DFO/Evolution
        *   Policy Gradients
            *   Actor-Critic Methods
*   MDP - Agent observes the world, chooses an action, the environment changes, the agent may observe a reward and change state
    *   Set of states S
    *   Set of Actions A
    *   Transition function P(s’ \| s,a)
    *   Reward function R(s, a, s’)
    *   Start state S_0
    *   Discount factor g
    *   Horizon H
*   Optimal Control: Given an MDP (S,A,P,R,g,H) find the optimal policy pi*
*   Exact methods: Value iteration and policy iteration
*   Value functions
    *   V*(s) = sum of discounted rewards when starting from s acting optimally
    *   V*_i(s) = optimal value for state s when H = k
*   Value Iteration
    *   Algorithm (value update, or bellman update/backup)
        *   Start with V*_0(s) = 0 for all s
        *   for all k in 1...H: for all s in S:
            *   V*_k(s) = max{over a}(sum(P(s’(s\|a)(R(s,a,s’) + gV*_{k-1}(s’))))
            *   pi*_k(s) = argmax of same expression
    *   For a finite state space and &lt;1 discount factor, VI converges
        *   For infinite horizon, simply run VI until it converges, which gives you pi* - use that to determine optimal behavior (contractions)
        *   V*_H -> V* as H->infinity
    *   Note: optimal policy is stationary (optimal action at state s is always the same)
    *   Q*(s,a) - much like V* but says from s, take action a, and from then on act optimally
        *   Q*(s,a) = sum[over s’]P(S’\|s,a)*(R(s,a,s’) + g*max[over a’]Q*(s’,a’))
        *   Q*_{k+1}(s,a) = sum(P(s’\|s,a)*(R(s,a,s’) + g*max[over a’]Q*_k(s’,a’)))
*   Policy Methods
    *   Policy Evaluation: how to calculate goodness of V_pi
        *   We can use value iteration formulation, with fixed policy
    *   V*_k = max{a}(sum{s’}(P(s’\|s,a)*(R(s,a,s’) + g*V*_{k-1}(s’)))
    *   V^pi_k = sum{a}(P(s’\|s,pi(s))(R(s,pi(s),s’) + g*V^pi_{k-1}(s’))
    *   At convergence
        *   RHS and LHS policies are the same
*   Policy Iteration (repeat the following 2 steps until pi_{k+1} = pi_k)
    *   1. Policy evaluation for current policy pi_k (iterate until convergence)
        *   V^{pi_k}_{i+1}(s) &lt;- ...
    *   2. Policy improvement
        *   pi_{k+1}(s) &lt;- argmax[a] sum[s’] P(s’\|s,a)[R(s,a,s’) + g*V^{pi_k}(s’)]
    *   Computation methods
        *   Modify Bellman updates
        *   Because we dropped the max (over a) it’s a linear system of equations
            *   Variables: V^{pi}(s)
            *   Constants: P, R


### 2 - Sampling-based Approximations and Fitted Learning

[Video](https://www.youtube.com/watch?v=qO-HUo0LsO4) [Slides](https://drive.google.com/open?id=0BxXI_RttTZAhREJKRGhDT25OOTA)



*   Optimal control: Given MDP (S, A, P, R, g, H), find optimal policy pi* maximizing sum of expected rewards
    *   Exact methods (value and policy iteration) guaranteed to converge for finite state/action space and when we have perfect access to environment
    *   Assumptions of exact methods -> mitigations:
        *   Update equations require access to dynamics model -> Sampling-based approximations
        *   Iteration over / Storage for all states and actions -> Q/V function fitting
*   Q*(s,a) means at state s, taking action a, and from then on take optimal actions
*   Q-value iteration
    *   Q_{k+1}(s,a) &lt;- sum{s’}(P(s’\|s,a)(R(s,a,s’) + g*max{a’}(Q_k(s’,a’)))
*   Q-value iteration with sampling
    *   Q_{k+1}(s,a) &lt;- E{s’~P(s’\|s,a)}(R(s,a,s’) + g*max{a’}(Q_k(s’,a’)))
    *   For (s,a)
        *   receive s’ ~ P(s’\|s,a)
        *   consider target(s’) = R(s,a,s’) + g*max[a’]Q_k(s’,a’)
        *   Q_{k+1}(s,a) &lt;- (1-alpha)Q_k(s,a) + alpha(target(s’))
*   Tabular Q-Learning
    *   start with Q_0(s,a) = 0 for all s,a
    *   for k = 1… until convergence 
        *   sample a (via some method), get s’ ~ P(s’\|s,a)
        *   if s’ is terminal
            *   target = R(s,a,s’)
            *   sample new initial state s’
        *   else
            *   target = R(s,a,s’) + g*max[a’]Q_k(s’,a’)
        *   Q_{k+1}(s,a) &lt;- (1-alpha)Q_k(s,a) + alpha*target
        *   s &lt;- s’
*   How to sample actions
    *   e-greedy (epsilon-greedy) - choose random action with probability e, otherwise choose action greedily
*   Q-learning (an example of off-policy learning) converges to optimal policy  
    *   If you explore enough 
        *   All states and actions are visited infinitely often
    *   learning rate needs to decrease (but not too quickly)
        *   sum{t}(alpha_t(s,a) = infinity) & sum{t}(alpha^2_t(s,a) &lt; infinity)
*   Can sampling work for value iteration? No because of the max over a
*   Can Policy iteration work with sampling?
    *   Policy evaluation - yes - called Temporal Difference
        *   V^{pi_k}_i(s) &lt;- E{s’~P(s’\|s,pi_k(s))}(R(s,pi(s),s’) + gV^{pi_k}_i(s’))
    *   Policy improvement 
        *   Not easy - because of argmax over a
*   Can tabular methods scale - no, state space gets too big (10^10)
*   Problem
    *   We keep a table of all q-values
    *   We don’t need to because we usually don’t visit the same state twice
*   Solution - generalize - learn about small number of training states, generalize that experience to new, similar situations
*   Approximate Q-learning
    *   Instead of table, parametrized Q function Q_pi(s,a)
    *   Can be linear Q_theta(s,a) = theta_0*f_0(s,a) + … + theta_n*f_n(s,a)
*   Learning rule: 
    *   target(s’) = R(s,a,s’) + g*max{a’}(Q_th_k(s’,a’))
    *   th_{k+1} &lt;- theta_k - alpha*grad_th((Q_th - target(s’))^2) \| th=th_k
*   We can determine theta by hand engineering the features or DL


### 3 - Deep Q-Networks

[Video](https://www.youtube.com/watch?v=fevMOp5TDQs&index=3&list=PLAdk-EyP1ND8MqJEJnSvaoUShrAWYe51U) Slides



*   Q-Learning
    *   Agent collects experiences online
    *   target(s’) = R(s,a,s’) + g*max{a’}(Q_th_k(s’a’))
    *   update th_{k+1} &lt;- th_k - alpha*grad_th*E_{s’~P(s’\|s,a)}[(Q_th(s,a)-target(s’))^2]\|th=th_k
    *   For tabular function: Q_{k+1}(s,a) &lt;- (1-a)Q_k(s,a) + alpha*target(s’)
    *   Does it work with neural network Q functions? Yes but with some care
*   Problems
    *   (nonstationary target) NN generalize so when you do the update of Q(s,a) for one (s,a) the network will generalize that change and update the value of other (s,a)
    *   Updates to target are correlated within a trajectory (non-stationary distribution for grad descent)
*   DQN
    *   Make Q-learning look like supervised learning
    *   Experience replay - Take action, get reward, but instead of applying it right-away, commit it to an replay buffer - when it comes time to learn, sample a mini-batch
*   DQN Algorithm
    *   Init replay memory D 
    *   Init action-value function Q with random weights th
    *   Init target action-value function Q-hat with weights th-hat = th
    *   for episode = 1, M
        *   Init sequence s_1= {x_1} and preprocessed sequence phi_1=phi(s_1)
        *   For t=1,T
            *   epsilon greedy pick of a_t from random and argmax[a]Q(phi(s_t),a;th)
            *   Execute action a_t and observe reward r_t, image x_{t+1}
            *   Set s_{t+1} = s_t,a_t,x_{t+1} and preprocess phi_{t+1} = phi{s_{t+1}}
            *   Store transition (phi_t, a_t, r_t, phi_{t+1}) in D
            *   Sample random minibatch of transitions (phi_j,a_j,r_j,phi_{j+1})
            *   Set y_j 
                *   r_j if episode terminates at step j+1
                *   r_j + g*max[a’]Q-hat(phi_{j+1},a’;th-hat) otherwise
            *   Perform grad descent on (y_j - Q(phi_j,a_j;th))^2 w.r.t th
            *   Every C steps reset Q-hat = Q
*   DQN Details
    *   RMSProp instead of SGD (optimization RL really matters since it determines what data you see)
    *   Anneal the exploration rate - epsilon starts at 1 -> to 0.1 -> 0.05
    *   Value-based methods are more robust than policy gradient methods
    *   Double DQN - use on-line for selcting best action but the target estimator for evaluating the best action (separate argmax vs max)
    *   Prioritized experience replay - Replay transitions in proportion to absolute bellman error (visit and update the state/action pairs you got really wrong)
    *   Dueling DQN 
        *   Value-advantage decomposition of Q: Q^{pi}(s,a) = V^{pi}(s) + A^{pi}(s,a)
        *   Dueling DQN: Q(s,a) = V(s) + A(s,a) - 1/A*sum{a=1->\|A\|}(A(s,a))
    *   Noisy Nets - Beyond epsilon-greedy - Add noise to network parameters for better exploration


### 4a - Policy Gradients and Actor Critic

[Video](https://www.youtube.com/watch?v=S_gwYj1Q-44) [Slides](https://drive.google.com/file/d/0BxXI_RttTZAhY216RTMtanBpUnc/view)



*   Policy optimization: pi_th(u\|s)
    *   So far, we’ve been trying to find V or Q and from that derive pi - now more direct
    *   theta no longer parameterizes the Q-function but the NN for the policy
    *   Stochastic policy class to smooth out the optimization problem
    *   Is often simpler than V and Q since they don’t directly give you A
    *   PO is more compatible with rich architectures than DP but can’t do off-policy learning (collect data with a different policy) and is less sample-efficient
*   Likelihood Ratio Policy Gradient
    *   trajectory tau: s_0,u_0,..s_H,u_H
    *   Reward of trajectory: R(tau) = sum[t=0:H]R(st,ut)
    *   Utility of Policy-Param: U(th) = E{sum[t=0:H}(R(st,ut);pi_th)] 
        *   = Sum{tau}(P(tau;th)R(tau))
    *   Goal is to find theta: Max[th]U(th) = max[th]sum{tau}(P(tau;th)*R(tau)
*   grad-U(th) ~ (1/m)sum{i=1:m}(grad_th*log(P*r_i;th)*R(tau_i))
    *   Valid even when R is discontinuous and or unknown 
    *   Increase prob of paths with positive R and vice versa
    *   reduce noise: add baseline b: (R(tau_i) - b) - reduces variance but still unbiased
*   Likelihood Ratio and Temporal Structure
    *   (1/m)sum[i=1:m]sum{t=0:H-1}(grad_th*log*pi_th(u_t^i\|s_t^i))(sum{k=t:H-1}(R(s_k^i,u_k^i) - b(s_t^i)))
    *   b(s_t) = E(r_t + r_{t+1}) = V^pi(s_t)
*   Algorithm
*   initialize policy parameter th, baseline b
*   for iteration=1,2..
    *   Collect a set of trajectories by executing the current policy
    *   At each timestep in each trajectory compute
        *   the return R_t = sum{t’=t:T-1}(g^{t’-t}r_t’)
        *   advantage estimate A_t = R_t - b(s_t)
    *   Refit the baseline: minimize \|\|b(s_t)-R_t}}^2 summed over all trajectories and timestaps
    *   Update the policy using a policy gradient estimate g-hat, which is a sum of terms grad_th*log(pi(a_t\|s_t,th))A_t
*   Instead of using Reward we can use Q-value (to think about the reward at next steps as well)
*   Q^{pi,g}(s,u) = E[r_0 + g*r1 … \| s_0=s, u_0=u]
    *   = E[r_0 + g*V^pi(s1) \| s_0=s, u_0=u]
    *   Async Advantage Actor Critic (AC3) uses k=5 step lookahead
    *   Generalized Advantage Estimation (GAE) exponential weighted average for all k
    *   Similar to TD lambda
*   Actor Critic: Policy Gradient + Generalized Advantage Function(estimate value function for baseline)


### 4b - Policy Gradients Revisited

[Video](https://www.youtube.com/watch?v=tqrcjHuNdmQ) [Slides](https://drive.google.com/file/d/0BxXI_RttTZAhTUpqUFdEZ3BXNFE/view)



*   Supervised learning: maximize sum{i}(log(p(y_i\|x_i))
*   RL: 
    *   y_i ~ p(.\|x_i) 
    *   max{i}(A_i*log(p(y_i\|x_i))) 
        *   A_i should be discounted (somehow - exponential may not be the best idea)
*   [Code](https://gist.github.com/karpathy/a4166c7fe253700972fcbc77e4ea32c5)


### 5 - Natural Policy Gradients, TRPO, PPO

[Video](https://www.youtube.com/watch?v=xvRrgxcpaHY) [Slides](https://drive.google.com/file/d/0BxXI_RttTZAhMVhsNk5VSXU0U3c/view)



*   Vanilla Policy Gradient MEthods
    *   Getting policy gradient estimate, plugging it into SGD
    *   Lots of ways to get better advantage estimate
    *   But once you get it, how do you update the policy?
    *   Issues:
        *   Hard to choose stepsize
            *   input data in RL, observation and reward changes (non-stationary distribution)
            *   Bad step is more damaging since it affects visitation distribution
        *   Sample efficiency
            *   Only one gradient step per env sample
    *   Much of modern ML is reducing learning to numerical optimization problem
        *   Supervised learning: minimize training error
    *   Q-learning can include all transitions seen so far, but optimizing the wrong objective (bellman error, as opposed to the performance of policy)
    *   Policy gradients, yes optimize policy, but no optimization problem (not using old data)
    *   Instead of just following the gradient per observation, let’s solve an optimization problem
*   What Loss to optimize?
    *   Policy gradient
        *   g-hat = E-hat_t[grad_th*log(pi_th(a_t\|s_t)A-hat_t]
    *   Can differentiate the following loss
        *   L^{PG}(th) = E-hat_t[log*pi_th(a_t\|s_t)*A-hat_t]
        *   but don’t want to optimize it too far (advantage is noisy)
    *   Equivalently differentiate
        *   L^{IS}_th_old E-hat_t[pi_th(a_t\|s_t)/pi_th_old(a_t \| s_t) * A-hat_t]
        *   IS = Importance sampling - What would the expectation be under distribution A but when I collected samples from distribution B
        *   We want to choose a policy pi_th such that the expected advantage under that policy is high (but collecting samples from old policy)
            *   But this doesn’t solve the problem that steps need to be small and we don’t want to optimize the objective fully
    *   Trust Region Policy Optimization
        *   I have some function I want to optimize, I have a local approximation to this function (but really inaccurate if you get away from trust region) - I want to maximize this objective (local aprox.) subject to constraint that we’re not moving too far away (for ex. euclidean distance between starting point and new point - or in our case, KL-divergence between old and new policy probability distributions - we don’t care about the parameter space, we care about the distributions that they define)
        *   We could also do a penalized optimization (as opposed to constrained)
*   TRPO algorithm
    *   for iteration=1,2,..
        *   run policy for T timestpes or N trajectories using current policy 
        *   Estimate advantage function for all timesteps for all trajectories
            *   Maximize surrogate loss subject to constraint
            *   Maximize{th}(pi_th(a_n\|s_n)/pi_th_old(a_n\|s_n)*A-hat_n) subject to KL_pi_th_old(pi_th) &lt; delta
    *   We can solve this efficiently approximately using conjugate gradient
*   Solving KL penalized problem (non-linear optimization)
    *   Goal: Maximize[th] L_pi_th_old(pi_th) - b*KL_pi_th_old(pi_th)
    *   Repeatedly make an approximation to it and solve the subproblem
        *   Linear approx. to L and quadratic to KL
    *   This is called the natural policy gradient
    *   Cheap gradient principle - computing the gradient to a function is a small multiple of computing the function itself - but the Hessian (L) is expensive O(#params)
    *   Use conjugate gradients to do Hessian free optimization 
*   Summary
    *   Wanted to write down an optimization problem to get a more sample-efficient and robust policy update
        *   Suggested optimizing surrogate loss L^PG or L^IS - no good because doesn’t constrain the size of update
        *   Use KL divergence to constrain size of update - but constrained optimization problem
        *   Corresponds to natural gradient step F^-1*g under linear quadratic approximation
        *   can solve for this step approximately using conjugate gradient method
*   Proximal Policy Optimization: KL Penalty Version
    *   Useful if don’t want to do conjugate gradient method
    *   Use penalty instead of constraint
    *   max[th]sum{n=1:N}(pi_th(a_n\|s_n)/(pi_th_old(a_n\|s_n)*A-hat_n) - C*KL_pi_th_old(pi_th)
    *   Algo:
    *   For iteration=1,2,...
        *   Run policy for T timesteps or N trajectories
        *   Estimate advantage function at all timesteps
        *   Do SGD on above objective for some number of epochs
        *   If KL too high, increase b, if KL too low, decrease b
    *   Choose KL-divergence as hyperparameter - choose the right b to make the update tight
*   Connection between trust region problem and other things
    *   Linear-quadratic approximation + penalty -> natural gradient
    *   No constraint -> policy iteration
    *   euclidean penalty instead of KL -> vanilla policy gradient
*   Limitation of TRPO
    *   Hard to use if model has different outputs and empirically performs poor on depp CNNs and RNNs
    *   Conjugate gradients makes it more complicated
*   Alternate to TRPO
    *   KFAC - Kronecker-factored approximate Fisher  
        *   Do blockwise approximation to fisher information matrix
        *   Combined with A2C - gives very good results on atari
    *   Clipping objective
        *   form a lower bound via clipped importance ratios


### 6 - Nuts and bolts of Deep RL 

[Video](https://www.youtube.com/watch?v=8EcdaCk9KaQ&feature=youtu.be) [Slides](https://drive.google.com/file/d/0BxXI_RttTZAhc2ZsblNvUHhGZDA/view)



*   How to make the learning problem easier
    *   Use a smaller problem at first
    *   Feature engineering
    *   Shape the reward function
*   PMDP Design
    *   Visualize random policy - does it ever do the right thing?
    *   Baseline
        *   Cross-entropy method
        *   well-tuned policy gradient method
        *   well-tuned Q-learning + SARSA method
*   Ongoing development and tuning
    *   If too sensitive to each hyperparameter, it’s not robust enough
    *   health indicator
        *   value function fit quality
        *   policy entropy 
        *   Update size in output space and parameter space
        *   Standard diagnostics for deep networks
    *   always use multiple random seeds
*   General tuning strategies for RL
    *   Whitening / standardizing data
        *   Compute running estimate of mean and stdev (over all data you’ve seen)
        *   Rescale the rewards but don’t shift mean
    *   Important parameters
        *   Discount
        *   Action frequency
    *   Entropy as Diagnostic
        *   Premature drop in policy entropy -> no learning
        *   Alleviate by using entropy bonus or KL penalty
        *   Compute entropy analytically for discrete action spaces
        *   KL as diagnostic
            *   KL spike -> drastic loss of performance 
    *   explained variance = (1-Var(empirical return - predicted value))/Var(empirical return)
*   Policy initialization 
    *   Zero or tiny final layer, to maximize entropy
*   Q-learning
    *   Optimize memory usage to have a large replay buffer
    *   Learning rate schedules
    *   Exploration schedules
    *   DQN converges slowly

