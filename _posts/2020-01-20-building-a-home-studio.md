---
layout: post
title:  "Building a Home Studio"
date:   2020-01-20
image: /assets/2020-01-20-building-a-home-studio/setup_pic.jpg
tags: music 
---

In this post, I'm going to share the planning / design doc I wrote for myself before setting out to build a small home studio.

## But Why?

In the technology industry, developer productivity is something that most business people think of as "the % of our capacity we have to waste in order to keep developers happy." I am a firm believer that (given the right type of talent), developer productivity is perhaps the single most important competitive advantage a tech firm has. This is because there exist problems that simply are not discoverable (let alone be solvable) unless engineers can operate with a certain velocity. [Continuing my trend](../../../../2019/10/25/composability) of applying programming concepts to creative fields, I'd like to argue that the same is true for music creation. 
 
After a 10-year hiatus, I recently started to write music again; recently thereafter, I set out to build a small home studio to motivate myself to take it more seriously. Simply by allowing certain workflows (recording a riff on my piano, importing it into Ableton, applying some MIDI/sound effects, and playing on top of it) to happen more seamlessly (1-hour per iteration cycle to 5 minutes), I have started to not only write music more quickly, but also create pieces of a quality and nature that I did not think was even possible. 

This can easily be explained by the fact that most extraordinary creations are composed of many ordinary layers, configured in non-trivial ways; when you make it easy to create and compose many ordinary layers, you make it more likely that one of those non-trivial configurations happens, giving rise to an extraordinary creation. So, when people say "iteration time matters above all else" -- yeah, it's true!

In the rest of this piece, I'll jot down some of my thoughts and analyses as I went about finding the right pieces for a studio that suited me!

## Requirements 

Would I let myself live if I didn't start this endeavour with a list of requirements and CUJs, or Critical Peddy Journeys? ;)

1. I want to improvise for O(hour) without knowing a priori whether I'm going to want to keep any pieces of the improvisation (always-on, infinite-length recording buffer)
2. I want to record both MIDI and audio coming from Yamaha CVP 701
3. My Yamaha can output 3 MIDI channels; I want to be able to capture them independently
4. My Yamaha can route 3 MIDI channels to its amazing collection of VRM instruments; I want to capture each audio channel individually
5. I want to control my DAW with my MPK Mini
6. I want to route both MIDI coming from my Roli Block, as well as the sound from Roli Studio to my DAW
7. I want to record an electric guitar, a voice track and audio coming from my Yamaha simultaneously
8. I want to hear a flat profile whether I'm mixing with friends (over speaker monitors) or by myself (with headphones on)
9. I want to easily record video footage of me playing piano from over the top of my head
10. I want to smile and get a leetle happi every time I look at my set up :)

## Design Overview

To satisfy all these, I'm going to need the following pieces, some of which I already have:

1. Yamaha CVP 701 
2. MPK Mini 
3. Roli Block
4. External Drive
5. Macbook Pro
6. DAW
7. Speaker Monitors 
8. Headphones
9. Audio Interface
10. Microphone
11. A whole lot of MIDI, XLR and TRS cables

While most of the requirements are pretty simple, #3 and #4 are not super straight forward (at least for me). Most people use MIDI controllers to control VST instruments on their computer. In my case, the Yamaha CVP 701 has an absolutely amazing collection of instruments that come pre-installed (to which I estimate they ascribe half of the $5k price of the piano) that I wanted to bring directly into my mixes. However, I don't want to just bring the audio recording - I wanted to capture each "Part" (CVP's verbiage for a single layer being played, up to 3 allowed at any given time) separately and bring the MIDI into my DAW, and then muck around with the MIDI on my DAW and route the output to the correct receiver on the Yamaha to hear the audio as if I'm physically playing the part.

This required some subtle set-up with how I configured both receiver and return tracks in my DAW and transmitter and receiver channels on my Yamaha, as well as needing to use 2 separate MIDI ports on both my Yamaha, and the audio interface. Happy to explain it further for anyone looking to replicate this set-up :)

The other non-trivial part of this set-up is getting the Roli Block to work with my DAW (I ended up choosing Ableton -- discussion below). The winning card for Roli Blocks is that they capture and output MPE (Multi Polyphony Expression) MIDI, which can send up to 127 different control signals (pitch shift, sustain, etc.) concurrently; this is something that many DAWs (including Ableton) don't yet support. So you have to use multiple MIDI-in tracks in Ableton to capture a set number of concurrent channels (I have done 4) and overlay them on top of each other and then send to the Roli VST. Again, happy to share details (though this is somewhat well documented on the internet).

A basic schematic showing my plan of how to connect various pieces together can be found below:

## Implementation

Now let's get to the fun part: spending money! Let's figure out exactly what products we'll buy for each one of the pieces identified above.

### DAW Software
This is by far the easiest. In a previous life, I was a heavy FL Studio user; while I absolutely loved using it, I wanted to try something new this time around. Because I was more interested in music creation rather than mixing, Logic didn't seem like a good fit. Funny enough, I seriously considered Garageband because.. it is actually surprisingly good! But at the end I went with Ableton because 
* There are very few things you can do with any music software that you can't do with Ableton
* There is so much training material online
* Though the stock plug-ins aren't fantastic, there is a healthy collection of them to get you started
* It is extremely extensible - you can write plugins to build completely custom components, one of which I hope to at some point write myself

### Audio Interface

The next most important thing is Audio Interface - although they are extremely expensive, I think it's a good idea to spend a bit more to ensure you're getting a quality product. I've been to two separate small-venue concerts where the artist couldn't do their performance because of trouble with their audio interface. 

### Interface Connectors

The slowest connection is USB, seen on most cheaper home studio interfaces. Firewire, which is becoming less common, is sometimes seen on more expensive home studio interfaces. Thunderbolt is becoming more and more popular, offers a much faster data connection. Peripheral Component Interconnect Express (PICe) is the standard connection for professional interfaces as it offers extremely fast data transfer and additional processing power.

Unless you're doing some serious live recording, USB speed should be more than fast enough.

#### I/O Count and Channel Types

This comes down to the number of tracks you plan to record and monitor concurrently. Unless you're recording a full band, 2-4 I/O slots should do. The exception is if you're recording an electric drum set, which can take up to 8 inputs on its own.

You should also ensure that you have enough mic inputs, line inputs and optical inputs (if you plan to pass an instrument's output through a ADC before the audio interface). 


At the end I ended up going with Focusrite Scarlett 6i6 because I needed at least 2 XLR inputs, 1 MIDI input, 1 MIDI output and 1 pre-amp TRS jack with volume control. This was the most basic audio interface that afforded me all of these.

### Headphones

Headphones can be a bit weird to dish out $100 for.. after all, what's wrong with your air pods?

#### Frequency Response, Impedance & Sensitivity

The most important characteristic of a pair of headphones is its frequency response. If you're using it for mixing, it's important that the response is as flat as possible so that you're hearing your mix without distortion.

The impedance of the headphones refer to the amount of power required to make them sing. Headphones with higher impedance (>50 ohms) demand more power to deliver high audio levels and as a result are protected from overloading. High-impedance headphones are perfect for studio setups where you'll have many headphones plugged into the same sound source, delivering the signal at a high level. More than the nominal value of load (headphone) impedance mattering, what is of importance is how it matches with that of the source (audio generating device). So if you're not planning to use a dedicated amplifier, you don't want to get high-impedance headphones.

Sensitivity is often measured at a specific frequency (eg. 1 kHz) at 1 mW of power and expressed as a range (eg. 90-105 dB). What is importantly missing from this metric is 1) the dynamics of the music we're listening to and 2) how THD (total harmonic distortion) changes within that range. The dynamic range (largest to the smallest intensity of sound that can be reproduced by the headphones) can be as large as 20 dB (eg. orchestral classical music) which means the amp has to be able to produce a range of 1 to 100 mW of power with minimal distortion. 

#### Closed back vs. open back 

Aside from the  accuracy (shape of the frequency response curve that it can output) that you want from your headphones, the next most important decision to make is whether you want close vs. open back headphones.

Open back headphones allow sound to pass through the back of the ear cups while closed back headphones do not. Allowing sound to leave the ear cups lessens the pressure build-up and improves sound clarity, giving it a more natural feel. The drawback is of course that they leak a lot of sound, which means you don't want to use them near others. Closed-back headphones may sound a bit stuffy but provide isolation (both directions) which makes them a good choice for recording studios (where you don't want sound bleeding from the headphones into the mic).

Usually open-back headphones are used for mixing (where sound quality is most important) and closed-back headphones for recording (where isolation is most important). A compromise between open and closed headphones is semi-open headphones that offer more spacious sound without letting too much noise in or out.

At the end, I decided to go with $NAME because it was a relatively cheap closed back pair of headphones, with a decent frequency response that I couldn't find too many bad reviews of - also the fact that my audio interface routed pre-amp mic signal to the TRS jack meant I couldn't go with a high-impedance headphones if I wanted to hear myself when doing vocals.

### Microphone

There are two umbrella categories of mics: condenser mics and dynamic mics. Let's get slightly nerdy and talk about the technical differences between the two. The dynamic mic is composed of three main parts: the diaphragm, voice coil and a magnet. It works by converting sound waves that hit the diaphragm into electrical signals since the motion of the diaphragm moves the voice coil, whose oscillation around the charged magnet creates a changing magnetic field and thus an electrical current, via magnetic induction.

A condenser mic, however, is composed of a diaphragm case, a diaphragm and a backplate. When the capsule is charged, it creates an electric field, which changes as audio waves hit the diaphragm, causing it to move closer and farther away from the backplate. This change in electric field can be measured and the audio signal can be recovered from it. It's worth noting that some condenser mics (standard condenser mics) require phantom power to charge the capsule, while electric condenser mics have a permanently charged capsule, not requiring an external source of power.

There are many difference between the two categories, but the most important is frequency response. Condenser mics work better on higher frequency instruments (acoustic guitar, piano, cymbals) whereas dynamic mics are best on drums, electric guitars and other low-mid frequency instruments, and in general have a lower frequency response - however, they do handle extremely loud signals better. 

Aside from lower frequency response and higher volume ranges, dynamic mics are a bit more robust due to their simple construction, causing them to have a lower maintenance cost. However, they do have a worse off-axis performance, usually dropping off a lot of the sound that hits them from the sides.


#### Cables

Cables transmitting analog signal can be balanced or unbalanced. We transfer 3 levels of audio: mic level (balanced), instrument level (unbalanced), line level (balanced).
Line level signal is the standard signal strength used with all pro audio equipment. Instrument level signal comes out of electric bass/guitar, sent through standard guitar cable to a direct box to be boosted to line level. Mic level signal is usually sent through standard microphone cable, goes through mic pre-amp to be boosted to line level.

Balanced cables, composed of ground, signal (+) and signal (-), are relatively immune to noise and interference from things like radio waves and nearby electronic equipment. Balanced cables come with the following connection ends. You can see that the XLR male and female have 3 pins/holes and TRS the 3 surfaces (tip, ring, sleeve) for the three signals.

Unbalanced cables usually use a TS connector, which only has a tip and sleeve.

### Studio Monitors

#### Sound Amplification 

The signal coming out of mixing desks or audio interfaces are fairly weak so if you're looking to get a lot of sound from your monitors, you'll likely need sound amplification. Active monitors feature an on-board sound amplifier, which means less work for you, but if you go with a passive monitor, you'll have to amplify the signal using a separate amplifier.

Active monitors can be connected to your audio interface with jack, XLR, phono, digital or USB (with jack or XLR having minimal added noise) and feature level control (and sometimes EQ controls) on-board. 
#### Layout (Configuration)

The most classic layout is a two-way speaker, employing one woofer to produce low ranges and a tweeter for high-mids and high frequencies. The two signals are separated by an on-board crossover filter that splits the signal into low and high bands. The crossover point in two-way speakers, however, usually sits in a crucial midrange area, which hurts sound quality by introducing phase distortion when the audio, split at the crossover point, collides when radiated from separately located tweeter and woofer. This is why higher-end speakers will often have 3- or even 4-way layouts that aim to keep those mid-range frequencies free from any crossover noise or distortion. Also a coaxial design helps alleviate this to a certain extent in 2-way configurations.

#### Listening Distance

In addition to ensuring the size of the speakers is appropriate for your room (large speakers can easily overpower a small space), you should consider how far away from your ears the speakers will be placed. Nearfield monitors are designed to be placed fairly close to the listeners ears and are perfect for home studios. Midfields and giant, full-range "mains" are usually only used in professional studios with lots of space.

At the end I went with Yamaha HS8 because my good friend has the HS5 monitors and they are extremely sharp and critical of every nuance - there's a joke that if you can make your mix sound good with them, it will sound good on an


### Closing

I'll probably continue to add various instruments and gear to my studio as the need arises. I'll do my best to keep this up-to-date as a record of why and how I made each purchasing decision.
