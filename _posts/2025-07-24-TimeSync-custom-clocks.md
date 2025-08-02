---
layout: post
title: "TimeSync: Your Custom World Clock"
tag: tools
date: 2025-07-24
mermaid: true
---


I was recently unable to find a decent online world clock that would allow me to view multiple custom locations at a glance. With the release of [Gemini CLI](https://github.com/google-gemini/gemini-cli) and a [little](https://mattravenhall.github.io/2015/07/28/Platform-Programming.html) [experience](https://mattravenhall.github.io/2022/03/23/SimpleToDo.html) with Javascript, I decided to create my own. It's [free to use](https://mattravenhall.github.io/TimeSync) and [open source](https://github.com/mattravenhall/TimeSync), so let's explore.


[<img alt="TimeSync" src="https://raw.githubusercontent.com/mattravenhall/TimeSync/main/title.png">](https://mattravenhall.github.io/TimeSync/)

## Features
TimeSync provides a highly customizable and intuitive world clock map, whilst remaining as minimalistic as possible. Here are some of its key features:

| <center><b>Add Custom Locations</b></center> [<img alt="Add New Locations by Name" width="450px" src="/assets/posts/timesync/example_addlocations.gif">](/assets/posts/timesync/example_addlocations.gif) | <center><b>Customise Markers</b></center> [<img alt="Rename and recolour markers" width="450px" src="/assets/posts/timesync/example_rename.gif">](/assets/posts/timesync/example_rename.gif) |
| <center><b>Minimalist Icons</b></center> [<img alt="Marker Indicators" width="450px" src="/assets/posts/timesync/example_icons.gif">](/assets/posts/timesync/example_icons.gif) | <center><b>Marker Groups</b></center> [<img alt="Marker Groups" width="450px" src="/assets/posts/timesync/example_presetgroups.gif">](/assets/posts/timesync/example_presetgroups.gif) |


## Experience with Gemini CLI

| :-: | --- | --- |
| ✅ | <span style="font-size: 0.8em;">Reduced time to prototype</span> | <span style="font-size: 0.8em;">Building the initial map and marker system only took a few minutes and it worked well.</span> |
| ❌ | <span style="font-size: 0.8em;">Increased debugging time</span> | <span style="font-size: 0.8em;">Debugging took much longer, as I needed to familiarised myself with any LLM-generated code.</span> |
| ✅ | <span style="font-size: 0.8em;">Accelerated solution suggestions</span> | <span style="font-size: 0.8em;">Adding new features was also pretty speedy, as Gemini combines library/endpoint discovery with their implementation.</span> |
| ❌ | <span style="font-size: 0.8em;">No incidental findings</span> | <span style="font-size: 0.8em;">But this meant that I didn't need to read resource docs, reducing my initial understanding of them.</span> |
| ✅ | <span style="font-size: 0.8em;">Bonus debugging</span> | <span style="font-size: 0.8em;">On top of established debugging tools, it was useful to ask things like "how could we improve this function?"</span> |
| ❌ | <span style="font-size: 0.8em;">Technical issues</span> | <span style="font-size: 0.8em;">Often Gemini would produced confused output, delete something major, or randomly freeze up.</span> |
| ❌ | <span style="font-size: 0.8em;">Lack of architectural awareness</span> | <span style="font-size: 0.8em;">More broadly, Gemini tended to prioritise the current request and forsake the wider code base. Generated code was rarely built with future expansion in mind.</span> |

Overall, tools like Gemini CLI are great for rapid prototyping, akin to a [wireframe](https://en.wikipedia.org/wiki/Website_wireframe), but must be followed up by manual development and deep dives. It's a bit like asking a junior developer to build a prototype and then adopting (and refactoring) their implementation for productionisation.

## Links
- [TimeSync](https://mattravenhall.github.io/TimeSync)
- [Codebase](https://github.com/mattravenhall/TimeSync)
