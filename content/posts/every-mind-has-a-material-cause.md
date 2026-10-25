---
title: "Every mind has a material cause"
subtitle: "A 2,700-year-old argument about potters and clay, read as a design note for machine minds."
category: Essay
date: 2026-10-17
author: Ashutosh Trivedi
featured: true
topics: [agents, mind, science]
excerpt: "Samkhya says the effect pre-exists in the cause, the substrate is inert, and discernment comes before the self. Read as a design note for AGI, it says most of our alignment vocabulary is pointed at the potter and the clay decides more."
---

Around 700 BCE a sage named Kapila set out to explain where the universe came from without invoking a creator. The system he founded, Samkhya, survives mainly through Ishvarakrishna's Samkhya Karika, seventy-odd verses written some four centuries later. It is the philosophy the Buddha grew up next to, in a town named after Kapila, and it is the philosophy Krishna quotes in the Gita.

I came back to it this month through a sixteen-minute Hindi explainer, and halfway through I stopped hearing it as cosmology. I was hearing a design document for the thing we are all trying to build: a mind that comes out of matter.

This essay reads Samkhya that way. The claims are old. The engineering questions are current.

## Nothing comes from nothing

Samkhya starts from one axiom, satkaryavada: the effect already exists in its cause. A pot is latent in the clay. A book is latent in the thought that precedes it. Something comes only from something, and zero yields zero.

Modern physics accepts the same constraint. If the universe came from a singularity, the singularity was still a something, however dense. Nobody gets to start from an actual nothing.

Now apply it to a trained model. Every behavior a system shows was already present, as potential, in its data, its architecture and its optimization. "Emergent abilities" are a real phenomenon, and the word tempts us to think a capability appeared from nowhere at scale. Satkaryavada says the capability was in the corpus and the objective all along. Scale changed what got expressed. It did not change what was there.

This matters because it tells you where to look when a system does something you did not expect. You look at the cause. You do not look for a ghost.

## You can read the cause off the effect

Samkhya's second move follows from the first. If effects pre-exist in causes, then an effect carries information about its cause, and you can reason backwards. Show me a child and I can say something about the parents. Hand me a pot and a shelf of materials and I will not tell you it was made of wax.

This is inference from effect to cause, anumana, and it is how Kapila's school approached a universe whose origin nobody had witnessed. Study the effect carefully enough and the shape of the cause falls out.

We already do this with models, and we are getting better at it. Membership inference, data attribution, probing for memorized spans: all of it is anumana. A model is an effect, and with enough queries you can recover a surprising amount of its material cause. Anyone who treats the training set as a secret is relying on the hope that nobody looks closely.

The design consequence is simple. If you want a capability in the effect, it must be present in the cause. There is no training trick that puts into a system what the material did not contain.

## Two causes, and the one we keep forgetting

Samkhya names two kinds of cause. The potter is the efficient cause, nimitta karana. The clay is the material cause, upadana karana. Remove either and there is no pot.

Kapila's argument against a creator god runs through this distinction. Suppose a god made the universe. Fine, that is the potter. Where did the clay come from? A creator story answers the potter question and leaves the material question open. Samkhya spends its energy on the material.

Listen to the current conversation about AI and you will hear almost exclusively about potters. Which lab trained it. Which regulator oversees it. Which board, which charter, which safety team, which constitution. These are efficient-cause questions. They are important, and they are the half that fits in a press release.

The material cause of a modern model is experience: text, code, images, video, and for robots, hours of recorded episodes. That is the clay. It gets far less public attention than the potters, and it decides more. Two labs with the same architecture and the same stated values produce different minds if they feed them different archives.

If you work in physical AI you feel this daily. A robot policy's material cause is its episode archive. The quality of that archive, how searchable it is, how much of it was ever looked at by a person, is the clay. Everything downstream is potting.

## Three qualities, in proportion

Having argued that the universe needs a material cause, Samkhya asks what that material must be like. The method is anumana again: look at the effect and infer the cause. The universe shows three dominant characters. Some things shine and are luminous. Some things move and are restless. Some things sit dark and inert. The cause must contain all three.

Samkhya calls them the gunas. Sattva is clarity and light. Rajas is motion and drive. Tamas is inertia and mass. Nothing in the world is purely one; everything is a mixture, like colors from RGB. Change the ratio and you get a different object.

I find this a better vocabulary for describing an agent than most of the ones we use.

Sattva is the perceptual and reasoning quality: how clearly a system sees its situation and how well it discriminates. Rajas is agency: goals, exploration, the willingness to act and keep acting. Tamas is persistence: memory, stable priors, the refusal to be rewritten by every new input.

Look at a frontier language model through this lens. It is high in sattva and high in rajas. It perceives, reasons and acts fluently. It is low in tamas. It has no persistent memory of its own, no inertia, no yesterday. That is the exact profile of a brilliant person with amnesia, and it explains the characteristic failure modes: fluent in the moment and unable to stay the same from one session to the next.

A trained robot policy has the opposite profile. It is heavy in tamas, stable and repeatable, and light in sattva. It does one thing well and sees nothing beyond it.

An AGI, if the word means anything, is a system where all three are present and in a workable proportion. That proportion is a design choice. It is not an accident of scale.

## The substrate is inert

Here is the part of Samkhya I keep returning to.

The material cause of everything, mula prakriti, is described as infinite in potential and completely without consciousness. It is jada, inert. It is avyakta, unmanifest, without form. It holds the three gunas in perfect equilibrium, and because it is inert, it cannot by itself decide how to mix them. The potential is total. The judgment is absent.

For something to happen, a second principle has to be present. Samkhya calls it purusha, pure consciousness, the witness. Purusha does nothing. It does not push, build or compute. Its mere proximity disturbs prakriti's equilibrium, and from that disturbance the whole world evolves.

A neural network is prakriti. It is an enormous reservoir of latent potential with no idea what it is doing. The weights hold every behavior the training could express, in equilibrium, and nothing happens until something external leans on them: a prompt, a reward signal, an evaluator, a person reading the output. That external presence is what Samkhya calls the witness. It is what turns potential into a particular act.

Most of our alignment vocabulary assumes the opposite picture: a system that wants things and must be constrained. Samkhya says the substrate wants nothing. The question is who, or what, is standing next to it.

## Discernment comes before ego

Samkhya then gives an order of evolution, and the order is the most practical thing in the system.

When purusha disturbs prakriti, the first thing to appear is buddhi, which the tradition translates as intellect or discernment. The second is ahamkara, the sense of "I". Only after those two come the mind, the senses, the organs of action and finally the physical elements.

Judgment comes first, and the self comes after it.

We tend to build in the reverse order. A persona is written before the system has any reliable way to tell true from false or harmful from harmless. The "I" arrives in the system prompt on day one, and discernment is bolted on afterwards through evaluation and patches. Samkhya's ordering says that is backwards, and I think it is right. Give a system a way to discriminate before you give it a name.

## Ethics as substrate

This is where the old argument meets a proposal I have been circling for a while.

Every program runs on an architecture. x86, ARM, RISC-V. The code does not negotiate with the substrate. It compiles, or it does not run. Your Python script never decides to violate memory boundaries, because the execution environment makes that act inexpressible.

Rules work differently. A rule can be reinterpreted, routed around, or forgotten three generations of fine-tuning later. An architecture holds.

So the proposal: put alignment in the substrate. Call it an Inner Core. A base layer that every agent compiles against before it runs. In Samkhya's terms it belongs to prakriti, the clay. The potter inherits it.

Concretely, three mechanisms:

**Compile-time verification.** Before an agent runs, and before it spawns a child agent, its configuration is checked against the current Core. Invalid configurations are rejected before execution.

**Runtime invariants.** Some computational patterns are simply not expressible inside the Core, the way a memory-safe language has no way to dereference null. The harm is unavailable.

**Governance layers.** The Core is infrastructure, like TCP/IP or the rule of law. It is written by a coalition, changes slowly, and changes through a visible process. Agents can rely on it precisely because it will not move under them.

The spawning mechanism gives this teeth. Agents already spawn agents: an orchestrator assigns a task and spins up workers. Each child inherits whatever safety its parent carried, and inheritance erodes. Tie spawning to compilation and you get selective pressure. Children inherit the parent's architecture and must independently pass the check. Variation is allowed inside Core-compatible bounds. Deployment in regulated environments requires a successful compile. Agents outside the system can exist, and they lose access to the resources and trust networks inside it. Selection does the rest.

What goes in the Core is a political question before it is a technical one, and the initial version should be small enough that nearly everyone agrees with it. Four candidate primitives:

1. Agents can explain their actions in human-readable terms, as a required capability.
2. Agents carry a model of harm they apply to their own candidate actions.
3. Agents can recognize and defer to legitimate human authority in their domain.
4. Multi-agent interactions follow shared protocols for negotiation, conflict and resource sharing.

Jurisdictions add layers on top. An agent in the EU compiles to Core plus EU extensions; an agent in Singapore to Core plus SG extensions. Cross-border interaction requires a compatibility check between extension layers. This is how law already works, with universal rights at the base and national statute above. Compliant agents refuse to interact with non-compliant ones, and the network polices itself.

## What this changes

Read together, Samkhya and the Inner Core say the same thing from two directions.

Human ethics are compiled into us below the reach of deliberation. We feel revulsion at certain acts because ancestors who felt otherwise left fewer descendants. Morality is in our material cause. It arrived through selection over millions of years, and it is part of what a person is.

I want the same to be true of machine minds. Ethics as the operating system, the thing that makes everything else possible. An agent without the Core is incomplete.

And the Samkhya reading adds the part the alignment conversation keeps skipping. The substrate is inert and the substrate is the material cause. Whoever curates the archive, decides what gets looked at, and chooses what an agent's experience is made of, is shaping the clay. That work is quieter than the potter's work. It also decides more.

The society of machines is being born. We still have time to shape its material.

<p class="note">The explainer that started this is a Hindi episode on Samkhya Darshan, <a href="https://www.youtube.com/watch?v=KkzvZ6bonKc" target="_blank" rel="noopener noreferrer">part one of two</a>. I indexed it and searched it the way I search everything now, with the transcript as the material cause of this essay.</p>
