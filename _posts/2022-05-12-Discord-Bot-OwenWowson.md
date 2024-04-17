---
layout: post
title: "Blog: Building a Discord Bot"
date: 2022-11-30
---

[<img style="float: right; border: 1px solid black" alt="Bot logo" hspace="20" src="/assets/posts/owenwowson/owenwowson.png" width="250px">](/assets/posts/owenwowson/owenwowson.png)

Whilst browsing HackerNews I spotted a [quirky API](https://owen-wilson-wow-api.onrender.com/) by [Avi Mamenko](https://twitter.com/AviMamenko). This API serves one simple but crucial function, to deliver random clips of Owen Wilson saying 'wow' directly into your hands.

So why not stick a Discord bot in front of that API to ensure proper supply of random 'wows'? OwenWowson is that bot.

## Anatomy of a bot
OwenWowson has some fairly simple requirements, he must:

- Convert wow request commands to API calls
- Respond to move commands to move into voice chats
- Play random voice clips via voice chat
- Post informative messages about those voice clips

To power this, we lean heavily into [Cogs](https://discordpy.readthedocs.io/en/stable/ext/commands/cogs.html). These are modular sets of functions that can be used across multiple bots.

In this case, ours cogs are:
- `CogErrHandler`: Elegantly handle unknown commands
- `CogHealth`: Debug-ready bot status checks
- `CogWow`: Core functions unique to OwenWowson

These arm OwenWowson with the following commands:
- `!healthcheck`: Send a simple healthcheck reply to confirm up status
- `!join <voice channel>`: Send OwenWowson to a specific voice channel
- `!joinme`: Bring OwenWowson into the same voice channel as the user
- `!wow`: Grab a random 'wow', add a message to chat, and play the voice line if in a voice channel

## Anatomy of a wow

[<img style="border: 1px solid black" alt="Example !wow" hspace="20" src="/assets/posts/owenwowson/example_wow.png" width="350px">](/assets/posts/owenwowson/example_wow.png)

When the `!wow` command is called, a number of things will happen:

1. OwenWowson requests a random wow via the API
2. A text response is built containing all crucial metadata
3. That voice clip is played in the relevant voice channels

You can find OwenWowson's source code on [GitHub](https://github.com/mattravenhall/OwenWowson).
