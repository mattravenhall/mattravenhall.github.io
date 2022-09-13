---
layout: post
title: "Game: Decoding mysterious puzzles in Signals"
date: 2022-09-13
---

[<img style="float: right; border: 1px solid black" alt="Signals Screenshot." hspace="20" src="/assets/posts/signals/cover_image.png" width="350px">](/assets/posts/signals/cover_image.png)

I'm a big fan of game jams as, like hackathons, they force you to complete a project in a short time frame.

Having recently discovered the awesome [Godot game engine](https://godotengine.org/) - it's light-weight, open source, and object-orientated - I decided to try it out for the [Brackeys Game Jam 2022.2](https://itch.io/jam/brackeys-8).

This is a walkthrough and behind-the-scenes look at our game, [*Signals*](https://mattravenhall.itch.io/signals).

## The Plan
This time's theme was 'You're Not Alone' and our initial brainstorming session led to several ideas (ranging from wholesome to spooky).

Eventually, we settled on a puzzle game in which you decode mysterious signals on board a submarine in order to identify what lurks outside.

Our plan also allowed for a flexible number of puzzles that could be developed in isolation and plugged in once finished. This allowed us to balance scope creep and limit merge conflict headaches.

In total, we completed three puzzles:

## Image Decoder
[<img style="float: right; border: 1px solid black" alt="Audio Decoder Screenshot." hspace="20" src="/assets/posts/signals/image_decoder.png" width="400px">](/assets/posts/signals/image_decoder.png)

This puzzle is essentially "Lights Out!" with a hidden image rather than lights. Your goal is to "decode" (i.e. flip to the side without noise) all the tiles within the time limit.

This was one of the first puzzles we developed, and also became the one that I like the least. Initially the grid was 4x4, but it turned out that there were very few solutions for that size board. The noisy tiles were also initially randomised, only for me to discover that not all initial states are solvable. Therefore, our final puzzle includes one specific solveable pattern, which at least makes the walkthrough easier.

Mechanically, the tiles populate a [GridContainer](https://docs.godotengine.org/en/stable/classes/class_gridcontainer.html) with each specific tile being an instance of a tile.tscn scene. We essentially spawn in tiles like you might spawn in a set of enemies.

A support script was also created to chop up and name each tile texture to facilitate automation. Behind the scenes, the code is also super flexible for a range of board sizes and shapes.

Solving "Lights Out!" puzzles such as these is best approached with the "chasing the lights" strategy, as explained on [StackOverflow](https://gaming.stackexchange.com/questions/11123/strategy-for-solving-lights-out-puzzle). Click below if you want the specific solution:

<details>
        <summary><i>Click for Solution</i></summary>
        Press the tiles with green crosses as shown below:
        <a href="/assets/posts/signals/image_solution.png"><img style="border: 1px solid black" alt="Image Decoder Solution." hspace="20" src="/assets/posts/signals/image_solution.png" width="450px"></a>
</details>

## Oscilloscope
[<img style="float: right; border: 1px solid black" alt="Oscilloscope Screenshot." hspace="20" src="/assets/posts/signals/oscilloscope.png" width="400px">](/assets/posts/signals/oscilloscope.png)

Here we're attempting to line up a changeable green wave with a fixed red wave through the three control dials. Under the hood, each dial controls one of the three component waves that combine to make the green wave.

This puzzle was primary built by [robopossum](https://github.com/robopossum), whom I previously teamed up with for a couple of Ludum Dares.

Trial and error is really the best approach here, but watch out as some combinations looks very similar to the correct solution!

When less than 500 seconds remain an initial hint will be provided, specifically the closest five correct values will be coloured yellow. This will be updated when less than 300 seconds remain, with the closest three values being coloured yellow.

<details>
        <summary><i>Click for Solution</i></summary>
        <pre>40 10 80</pre>
</details>

## Sonar Scanner
[<img style="float: right; border: 1px solid black" alt="Sonar Scanner Screenshot." hspace="20" src="/assets/posts/signals/sonar_scanner.png" width="400px">](/assets/posts/signals/sonar_scanner.png)

This is probably the more straight forward puzzle, and is really a reaction game. 'Blips' will spawn randomly at the edge of the circle and can be tagged by pressing `space` within 0.5 seconds of them appearing under the rotating line. It's possible to tag multiple blips at once, and you only lose by pressing `space` after the 0.5s window has expired (or before). Note that the blips present no threat, so don't worry about failing to tag a blip immediately.

There's no specific solution to this puzzle, just take your time.

## Endings
*Signals* has four possible endings: one for failure, the other three are yours to discover.

You can play *Signals* now on [itch.io](https://mattravenhall.itch.io/signals).
