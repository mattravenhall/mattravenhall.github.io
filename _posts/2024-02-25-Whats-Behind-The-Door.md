---
layout: post
title: "What's Behind The Door?"
tag: games
date: 2024-03-05
---

[<img style="float: right; border: 1px solid black" alt="WBTD Screenshot." hspace="20" src="/assets/posts/whatsbehindthedoor/menu.png" width="350px">](/assets/posts/whatsbehindthedoor/menu.png)

It's been a moment since I took last part in a game jam, so I figured I'd start the year by entering the <a href="https://itch.io/jam/brackeys-11">Brackeys Game Jam 2024.1</a> as part of a small team.

This time the theme was "What's Behind The Door?", so we developed a sinister gameshow ingeniously called <a href="https://mattravenhall.itch.io/whats-behind-the-door">"What's Behind The Door?"</a>, which eventually placed 119th (and 19th for audio) out of 792 entries.

## Overview
The player sits behind three buttons looking at a stage on which our AI host, N.O.A.H, ceremoniously invites the player to guess which of three doors has a specific object behind it.

The primary game loop is therefore pretty simple:
1. Receive a prompt
2. Hear three sounds
3. Select the correct one and get 100 points

<img style="display: block; margin: 0 auto; border: 1px solid black" alt="Example door selection." hspace="20" src="/assets/posts/whatsbehindthedoor/doors.png" width="450px">

But in true 'Whose Line' style, the points mean nothing and, in reality, your choices direct you towards one of three hidden paths.

## Walkthrough
Under the hood, the game has two parts: a core path of eight rounds followed by three pathway-specific sections depending on player choices.

By default, players will end up on the red path unless they pick both green/blue options and enter the corresponding green/blue sequence on round 7.

### Core Path

| Round | Door 1 | Door 2 | Door 3 | Alternative |
| :---: | :----: | :----: | :----: | :---: |
| 0 | 0 | 0 | <span style="color:red;font-weight:bold;">+100</span> | |
| 1 | 0 | <span style="color:red;font-weight:bold;">+100</span> | 0 | |
| 2 | <span style="color:red;font-weight:bold;">+100</span> | 0 | <span style="color:blue;font-weight:bold;">0</span> | |
| 3 | <span style="color:green;font-weight:bold;">0</span> | <span style="color:red;font-weight:bold;">+100</span> | 0 | |
| 4 | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | |
| 5 | 0 | <span style="color:blue;font-weight:bold;">0</span> | 0 | |
| 6 | <span style="color:red;font-weight:bold;">+100</span> | 0 | <span style="color:green;font-weight:bold;">0</span> |
| 7 | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:green;font-weight:bold;">Sequence: 32113</span><br><span style="color:blue;font-weight:bold;">Sequence: 22132</span> |

### Red Path (Bad Ending)

| Round | Door 1 | Door 2 | Door 3 |
| :---: | :----: | :----: | :----: |
| 8 | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> |
| 9 | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> |
| 10 | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> |

Playing the gameshow as a gameshow, will result in the red/bad ending in which it is ultimately revealed that:

<details>
        <summary><i>Click to View Ending Spoilers</i></summary>
        You are trapped and eventually end up behind one of the doors.
</details>

### Green Path (Good Ending)

| Round | Door 1 | Door 2 | Door 3 | Alternative |
| :---: | :----: | :----: | :----: | :---: |
| 8 | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:green;font-weight:bold;">Do Nothing</span> |
| 9 | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:red;font-weight:bold;">+100</span> | <span style="color:green;font-weight:bold;">0</span> | |

Saving the two trapped contestants (by selecting their doors) will unlock the green path. Failures on the green path lead to the red/bad ending.

This is the most dialogue heavy path and essentially involves:
<details>
        <summary><i>Click to View Ending Spoilers</i></summary>
        Disabling N.O.A.H and re-taking control of the ship.
</details>

### Blue Path (Secret Ending)
Accessing the secret ending essentially requires insider knowledge and is essentially an inside joke for the developers.

<details>
        <summary><i>Click to View Ending Spoilers</i></summary>
        The spirit of TV detective Columbo overpowers N.O.A.H and takes control of the ship.
</details>

## Results
After two weeks of voting, we ended up with the following rankings:

| Criteria | Rank | Score |
| :------: | :--: | :---: |
| Theme | #18 | 4.250 |
| Audio | #19 | 3.964 |
| Overall | #119 | 3.485 |
| Fun | #166 | 3.339 |
| Innovation | #177 | 3.179 |
| Game Design | #232 | 3.196 |
| Graphics | #345 | 2.982 |

Coming 19th out of 792 entries for audio is awesome and is definitely due to some great voice acting by Sam & Alex's, who respectively voiced N.O.A.H and the saved guy.
