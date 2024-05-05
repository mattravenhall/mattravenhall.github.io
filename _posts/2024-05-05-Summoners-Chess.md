---
layout: post
title: "Game: Summoners Chess"
date: 2024-05-05
---

[<img style="float: right; border: 1px solid black" alt="WBTD Screenshot." hspace="20" src="/assets/posts/summoners_chess/cover.png" width="350px">](/assets/posts/summoners_chess/cover.png)

Another Ludum Dare entry, this one being my first proper compo attempt (shorter deadline, more restrictions, one-person only).

## The Idea
The theme this time was "Summoning", which wasn't exactly what I'd hope for. In fact, I almost skipped the jam because of it.

Ultimately I wanted to avoid any of the obvious uses of the themes (e.g. demon or creature summoning), and ended up with a strange combination of chess + checkers + summoning new pieces onto the board.

## How It Went
### Day 1
Most of the first day was really spent re-implementing draughts/checkers in Godot. This meant the basic board generation, unit selection and movement, and some of the quirks of the rules (e.g. pieces in checkers can attack multiple times in a row, men upgrade to kings which they reach the end of the board). At the end of day one, I had created a basic game - but it was just checkers. That said, the framework was perfectly built for the rapid integration of multiple pieces with different movements and attacks, there was just no actual summoning yet.

### Day 2
The second day was essentially a case of "ok, now do everything else". This meant:

- Allowing progression between boards
- Adding actual summoning of pieces, including summoning indicators and the "Summon Shop"
        - Having the Summon Shop also meant rapidly producing images of each piece, for which I built a custom "studio" scene
- Creating proper 3D models for all the chess pieces
        - This was actually smoother than expected, as I've only just started using Blender (or doing any 3D modelling). Just don't look too closely at the Knight
- Creating all 10 board layouts, brainstorming opponent names and descriptions (for some reason I found myself referencing Tots TV for the tutorial opponents)
- Adding all the sound effects, partially sped up as I'd been generating some for a larger solo project I'm working on
- Adding some last minute music (and the ability to mute it, as I'm not a musician!), creating a range of screenshots, cover images, etc. for the submission page, and wrestling with the classic Ludum Dare embeddings issues (at least it works on [itch.io](https://mattravenhall.itch.io/summoners-chess))

## Thoughts On Submission
Right now Summoner's Chess probably has the right level of twist on the basic game. I just wish I'd had the time to allow teams to be customised and carried over between levels (to make the game feel more like a roguelike campaign than a mobile or Flash game).

Game balance is also something that is super hard to get right on a game jam, as this really comes out of play-testing. I based piece buy/summon prices off the weightings used in various chess engines, then made their sell/kill points about a fifth of the buy price. I also added a 250 point bonus for completing each level, as the first few levels have very few enemies. That said, adding checkers pieces into the mix will definitely change the value of different pieces and the checker piece costs were just made up.

I also have no idea if the rounds ramp up in difficulty too quickly or slowly. In the end, I created three basic tutorial levels, to allow players to build up points, then had a mid game of piece-focused round (e.g. a bunch of rooks/bishops etc.), and default checkers for level 8 and nothing vs. full chess for the final level. Jumping into something like level 9 without earning points for a few rounds makes those levels pretty tricky but a motivated player should be able to progress through all the levels in one go.

## The Things That Didn't Quite Make The Jam Version
- Preserving your team between rounds, allowing players to upgrade and modify their team across the campaign
- Upgradable pawns
        - Typically, in chess, when a pawn reaches the opposite side of the board it will turn into another chess piece.
        - This is actually implemented, but commented out, for enemies as there wasn't enough time to create the player prompts needed for the player upgrades to work.
- A nicer in-game environment
        - I really like how the cloud backgrounds work for the main and end screens, but wasn't able to implement something similar in the 3D scenes
- Crazier pieces
        - I was hoping to be able to add some weirder custom pieces eventually, for example arming a pawn with a gun for ranged attacks. This idea was definitely last on the list though, perhaps it'll be something to add if I develop this idea further.
- Smarter AI
        - Naturally there's no chance I could re-implement Stockfish in a weekend, so the opponent AI had to be very rudimentary. Mostly it involves random piece selection, and prioritising attacks over movement. Plus some artificial "thinking" delays to make the responses seem more considered. Opponents will also very occasionally resign when they shouldn't, but I wasn't able to properly pin that bug down.

## The Post-Jam Update
Fortunately I was able to pack most of these into the post-jam version, including:
- ✨ Updated Visuals
[<img style="border: 1px solid black" alt="Updated Visuals" hspace="20" src="/assets/posts/summoners_chess/updated_visuals.png" height="200px">](/assets/posts/summoners_chess/updated_visuals.png)
- ♟️ Upgradable Pawns
[<img style="border: 1px solid black" alt="Upgradable Pawns" hspace="20" src="/assets/posts/summoners_chess/upgradable_pawns.png" height="200px">](/assets/posts/summoners_chess/upgradable_pawns.png)
- 🎥 New Camera Views
[<img style="border: 1px solid black" alt="Camera Views" hspace="20" src="/assets/posts/summoners_chess/camera_views.png" height="200px">](/assets/posts/summoners_chess/camera_views.png)
- 🛠️ Custom Matches
[<img style="border: 1px solid black" alt="Custom Matches" hspace="20" src="/assets/posts/summoners_chess/custom_match.png" height="200px">](/assets/posts/summoners_chess/custom_match.png)
- 🤖 Enhanced AI

## Results
 After about three weeks of voting, we ended up with the following rankings:

| Category | Rank | Score (out of 5) |
| :------: | :--: | :--------------: |
| Overall | 105 | 3.72 |
| Fun | 79 | 3.74 |
| Innovation | 39 | 4.04 |
| Theme | 205 | 3.48 |
| Graphics | 261 | 2.98 |
| Audio | 249 | 2.66 |
| Humor | 156 | 2.99 |
| Mood | 224 | 3.13 |

Breaking the top 100 for Fun and Innovation is awesome, as is almost breaking the top 100 overall. It's also great to see that my rankings are gradually improving over time.

You can play *Summoner's Chess* now on [itch.io](https://mattravenhall.itch.io/summoners-chess).
