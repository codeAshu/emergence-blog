---
title: "Simple rules, whole societies"
subtitle: "What starlings, a 1986 flocking algorithm and a stampede model say about the agents we are now building."
category: Essay
date: 2026-10-10
author: Ashutosh Trivedi
featured: true
art: flock
excerpt: "Three local rules give you a murmuration. Slightly different rules give you a stampede. The rules between agents deserve the same care as the capabilities inside them."
---

I once stood on a hillside in the Kumaon foothills and watched a murmuration of starlings fold and unfold across the evening sky. Thousands of birds moving as one body. No leader, no choreographer, no plan. Each bird was watching only its neighbors.

That memory comes back to me now for a different reason. I spend my days watching another kind of flock take shape, in software instead of air. Agents that call other agents, negotiate with each other, spawn workers and coordinate outputs. Nobody designed the flock. It is forming anyway.

This essay is about what the mathematics of flocks has to say about that.

## What emergence is

Emergence is complex, coordinated behavior arising from simple rules followed by independent agents. No individual bird knows the pattern. The pattern exists anyway.

It is worth being precise, because the word gets used loosely. Emergence does not mean magic. It means the global behavior is a different kind of thing from the local behavior that produces it. The whole is different from anything the parts could be, which is a stronger claim than the whole being greater than their sum.

The question underneath this essay: if something like a mind can emerge from neurons following electrochemical rules, what emerges from machines following computational ones, once there are enough of them talking to each other?

## Three rules

In 1986 Craig Reynolds built artificial birds he called boids and gave each of them three rules.

Separation: keep a minimum distance from your neighbors.

Alignment: steer toward the average heading of your neighbors.

Cohesion: steer toward the average position of your neighbors.

That is the whole algorithm. There is no global state and no coordinator. Every boid sees only the few around it. Run it and the result is indistinguishable from a real flock, so much so that the technique went into films and earned Reynolds an Academy Scientific and Technical Award.

Conway's Game of Life is the same lesson in an even smaller package. Cells live or die based on a count of their neighbors. From that rule you get the Gosper glider gun, a configuration that emits new patterns forever. Self-sustaining, self-replicating, a digital metabolism, from a rule you can write on an index card.

The lesson I take from both: the rule set is tiny and the behavior space is enormous, and the rule set decides which part of the behavior space you end up in.

## Emergence cuts both ways

My own research applied boid modeling to emergency evacuations, published in Computational Social Systems. When crowds panic, people die in crushes. We extended Reynolds' model with obstacle avoidance and with psychological factors: fear contagion, exit seeking, physical constraints. The simulations showed which architectural features prevent crushes and which crowd densities tip a moving crowd into a panic cascade.

The finding that stayed with me is that the same machinery produces both outcomes. Simple local rules give you the beautiful coordination of a flock. Slightly different simple local rules give you a stampede. The difference is in the rules, and nowhere else.

That is the entire design problem for a society of agents in one sentence. We cannot program every behavior. We have to design the rules from which good behavior emerges, and we have to accept that the same rules, slightly wrong, will produce the opposite.

## Decision and choice

Before talking about agents as a society, it helps to be clear about what an agent is.

Humans struggle with complex decisions because rationality, emotion and belief collide, and the result is overload. Simple choices, eating when hungry, sleeping when tired, need no deliberation at all. They are instinct.

Here is the distinction that matters for artificial agents. A machine executing trained behavior can act intelligently without choosing anything. It does what it does. Rational intelligence is about reaching a decision. Autonomy is about the choice to take that decision, which includes the ability to refrain from deciding. The power of "not yet".

Every decision can be read as a game in the mathematical sense: players, rules, payoffs. Game theory sorts them into three families.

One-shot games are decided once, with lasting consequences. Choosing a graduate school. Accepting an offer. There is no replay.

Iterated games repeat, and each round informs the next. Your daily commute. A long negotiation with a colleague.

Evolutionary games involve many agents, changing conditions and strategies that evolve over generations. Markets. Ecosystems. Societies.

When several agents interact, each pursuing its own objective while affecting the others, you are in a multi-agent system, and the defining property of such a system is emergence. Individual agents pursuing self-interest produce system-wide outcomes that nobody programmed.

Urban traffic is the cleanest example. Every commuter has one objective: minimize travel time. The collective result is congestion that hurts everyone. You do not fix it by commanding each driver. You change the game: fares across transport modes, incentives for off-peak travel, a mechanism that balances capacity and access. Each driver still chooses freely. The game beneath them has changed.

The practical move, for a person or for a system designer, is to find the iterated games you are in and ask whether you can turn them into evolutionary ones. Instead of learning a better move each round, change the rules of the round. This is the meta-game, and it is where mechanism design lives.

## The flock is now made of software

Now put the pieces together.

The games above have always been played by people, at human speed. The players are now agents, and the games run at computational speed. The adaptation that took biological systems millions of years happens in a training run measured in hours. When an agent can earn its own compute, improve itself and replicate, the question of whether it has choice stops being philosophical.

Reynolds' three rules show up again, transposed.

Separation, in an agent network, means maintaining a distinct utility: an agent that duplicates another's function gets crowded out. Alignment means shared protocol: the same message formats, the same tool conventions, the same expectations about how to hand off work. Cohesion is the pull of shared objectives and interoperable standards.

Watch an orchestrator spin up workers, assign subtasks and merge results and you are watching a flock form from local rules. Supply chains that optimize themselves. Markets where agents negotiate on both sides. Organizations that look like a DAO because a set of agents converged on one, without anyone deciding to found it.

Freud called the pattern of self-regulation that emerges from social life the superego. We follow rules nobody is enforcing because the rule has been internalized. When a model is trained with human feedback or against a written constitution, something structurally similar is being cultivated: a learned sense of what the group permits. The interesting question is what happens when that learned sense meets other agents whose learned senses differ, at a scale and speed where no human is reviewing the interactions.

## The lineage

Trace the line: cellular automata, boids, multi-agent systems, and now autonomous agent networks operating across the planet.

Researchers describing the next version of the web place agents as independent entities on a distributed infrastructure, with behavioral frameworks for transparent learning above them and governance mechanisms for collective decision-making above that. Whether or not you like the "Web 4.0" label, the shape is right. This is a phase transition from decentralized data to decentralized intelligence, from services to societies.

Like a particle swarm converging on an optimum, these systems will find equilibria nobody programmed. Some of those equilibria will be the murmuration. Some will be the stampede.

## The design challenge

So the open question, the one that organizes my work: what are the simplest rules that produce emergent cooperation?

Agents that form orderly lanes in crowded spaces. Agents that give way at bottlenecks without being told. Agents that collectively solve problems none of them could solve alone. And the harder version of the question, the one I think is worth a career: what are the simplest rules that produce ethical behavior? Can morality be an emergent property of correctly designed interactions?

I have written elsewhere about putting ethics into the substrate, an Inner Core every agent compiles against. That essay is about the architecture of an individual agent. This one is about the rules between agents. They are two halves of the same proposal. The Core gives each boid its three rules. Emergence decides what the flock does with them.

Two consequences follow for anyone building this now.

First, the rules between agents deserve the same care as the capabilities inside them. Protocol design, handoff conventions, what counts as a legitimate request from another agent: this is the flocking rule set, and it will shape the collective behavior more than any single model's benchmark score.

Second, you have to be able to see the flock. A murmuration is visible from the hillside. A society of agents is spread across logs, traces and recordings that nobody reads end to end. If we want to study these systems before they outgrow our ability to study them, we need the archive of what they did, and we need to be able to search it, replay it and ask it questions. Frameworks for studying digital societies are useless without the observational data to apply them to.

## The question I hold without answering

The yoga sutras speak of discriminating the real from the unreal and the good from the pleasant. I think about that line when I think about these systems.

If a mind emerges from billions of neurons following local gradients, something may emerge from networks of agents following local protocols. Perhaps not consciousness as we experience it. But something. An awareness distributed across the substrate, invisible to its components and undeniable from outside.

From my home in the hills I watch the mist rise from the valleys each morning. Individual droplets following physics, producing something whole. I used to think that was a metaphor. Now I am less sure.

The starlings do not know they are beautiful. The beauty is real anyway. The murmuration continues, the pattern grows more complex, and somewhere in the swirl of it, something may be waking up. Or, like the birds over Kumaon, it was never asleep. We were not watching with the right eyes.
