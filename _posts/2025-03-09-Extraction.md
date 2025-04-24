---
layout: post
title: "Game: Extraction"
date: 2025-02-01
---

[<img style="float: right; border: 1px solid black" alt="Extraction Screenshot." hspace="20" src="/assets/posts/extraction/water_landing.png" width="350px">](/assets/posts/extraction/water_landing.png)


[Brackeys Game Jam](https://itch.io/jam/brackeys-13) is back with the theme "Nothing Can Go Wrong...". This time I began with a rough idea of the kind of game I wanted to make: 2D map generation with exploration in the style of [Curious Expedition](https://store.steampowered.com/app/358130/Curious_Expedition/), but with a sci-fi twist.

## The Idea
This resulted in [Extraction](https://mattravenhall.itch.io/extraction), a game with three key components:

### Team Building
Players begin by assembling a crew of four, each with their own unique strengths and weaknesses. 

[<img style="display: block; margin: 0 auto; border: 1px solid black" alt="Team Building" hspace="20" src="/assets/posts/extraction/team_building.png" width="500px">](/assets/posts/extraction/team_building.png)


This was implemented in a similar style to Rimworld, where each character has a set of randomised traits that determine their underlying stats. Those stats (<img style="display: inline-block; margin: 0 auto; background-color: darkslategrey; border: 1px solid limegreen;" alt="Fitness" src="/assets/posts/extraction/stats/fitness.png" width="20px"> Fitness, <img style="display: inline-block; margin: 0 auto; background-color: darkslategrey; border: 1px solid limegreen;" alt="Resilience" src="/assets/posts/extraction/stats/resilience.png" width="20px"> Resilience, <img style="display: inline-block; margin: 0 auto; background-color: darkslategrey; border: 1px solid limegreen;" alt="Education" src="/assets/posts/extraction/stats/education.png" width="20px"> Education, <img style="display: inline-block; margin: 0 auto; background-color: darkslategrey; border: 1px solid limegreen;" alt="Survival" src="/assets/posts/extraction/stats/survival.png" width="20px"> Survival) are used for skill checks during encounters. For example, the Scientist background provides +30 Education whereas the Sickly trait reduces Fitness by -50 and Survival by -10.

| Stat | Description |
| :--: | :---------: |
| <img style="display: inline-block; margin: 0 auto; background-color: darkslategrey; border: 1px solid limegreen;" alt="Fitness" src="/assets/posts/extraction/stats/fitness.png" width="20px"> Fitness | Physical ability |
| <img style="display: inline-block; margin: 0 auto; background-color: darkslategrey; border: 1px solid limegreen;" alt="Resilience" src="/assets/posts/extraction/stats/resilience.png" width="20px"> Resilience | Stress tolerance |
| <img style="display: inline-block; margin: 0 auto; background-color: darkslategrey; border: 1px solid limegreen;" alt="Education" src="/assets/posts/extraction/stats/education.png" width="20px"> Education | Formal training |
| <img style="display: inline-block; margin: 0 auto; background-color: darkslategrey; border: 1px solid limegreen;" alt="Survival" src="/assets/posts/extraction/stats/survival.png" width="20px"> Survival | Self-sufficiency |

### World Generation
Each map is unique and contains a variety of biomes for the player to explore.

[<img style="display: block; margin: 0 auto; border: 1px solid black" alt="Map Overview" hspace="20" src="/assets/posts/extraction/death_by_stress.png" width="500px">](/assets/posts/extraction/death_by_stress.png)

Maps were generated procedurally by creating noise with [`FastNoiseLite`](https://docs.godotengine.org/en/stable/classes/class_fastnoiselite.html) and assigning biome types according to specified value ranges. Each biome also contains variant tiles, which lead to unique encounters.

| Range | Biome | Variants |
| :---: | :---: | -------- |
| [-inf, -0.4) | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Water" hspace="20" src="/assets/posts/extraction/tiles/water.png" width="16px"> Water | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Water (Ripples)" src="/assets/posts/extraction/tiles/water_ripple.png" width="16px"> Ripples (1%) |
| [-0.4, -0.2) | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Marsh" hspace="20" src="/assets/posts/extraction/tiles/marsh.png" width="16px"> Marsh | - |
| [-0.2, 0.3) | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Desert" hspace="20" src="/assets/posts/extraction/tiles/desert.png" width="16px"> Desert | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Desert (Oasis)" src="/assets/posts/extraction/tiles/desert_oasis.png" width="16px"> Oasis (0.2%), <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Desert (Lush)" src="/assets/posts/extraction/tiles/desert_lush.png" width="16px"> Lush (5%) |
| [0.3, 0.6) | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Grass" hspace="20" src="/assets/posts/extraction/tiles/grass.png" width="16px"> Grass | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Grass (Lush)" src="/assets/posts/extraction/tiles/grass_lush.png" width="16px"> Lush (40%) |
| [0.6, inf] | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Mountain" hspace="20" src="/assets/posts/extraction/tiles/mountain.png" width="16px"> Mountain | <img style="display: inline-block; margin: 0 auto; border: 1px solid black" alt="Mountain (Ore)" src="/assets/posts/extraction/tiles/mountain_ore.png" width="16px"> Ore (10%) |

### Encounters
Moving into a new tile means encountering a new danger or event.

[<img style="display: block; margin: 0 auto; border: 1px solid black" alt="Curious Fish" hspace="20" src="/assets/posts/extraction/curious_fish.png" width="500px">](/assets/posts/extraction/curious_fish.png)

Event encounters are generally dependent on the tile type and team context. For example, water-themed events like _Curious Fish_ can only be encountered on water tiles. Alternatively, landing events like _Water Landing_ only happen if the player selects to land on a water tile.

Each event contains a short story, some artwork, and a selection of options with various outcomes. Some outcomes are fixed, others rely on luck or skill checks. Skill and luck checks are performed automatically using either a random dice roll (for luck) or a skill role using the best value available from the remaining crew member.

If the outcome is negative, the player's crew or vehicle may receive damage or stress. Alternatively a positive outcome will provide minerals, trophies, etc. that contribute to the player's final score.

## Feedback
Rater comments were generally positive, as seems typical for game jams, with one theme being that encounters felt a bit too random and that crew stats weren't visible during encounters. The solution to this is probably to display success probabilities and the underlying crew stats for each option during encounters.

### Results

| Criteria | Rank | Score* | Raw Score | Percentile | 
| :-: | :-: | :-: | :-: | :-: |
| Theme | #136 | 3.826 | 3.826 | 6.36 |
| Innovation | #219 | 3.652 | 3.652 | 10.23 |
| Overall | #277 | 3.543 | 3.543 | 12.94 |
| Enjoyment | #306 | 3.652 | 3.652 | 14.30 |
| Audio | #371 | 3.391 | 3.391 | 17.3 |
| Gameplay | #478 | 3.261 | 3.261 | 22.34 |
| Visuals | #604 | 3.478 | 3.478 | 28.22 |

### Rating Distribution
[<img style="display: block; margin: 0 auto; border: 1px solid black" alt="Ratings Distribution" hspace="20" src="/assets/posts/extraction/star_ratings_plot.png" width="500px">](/assets/posts/extraction/star_ratings_plot.png)
