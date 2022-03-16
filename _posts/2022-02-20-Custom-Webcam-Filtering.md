---
layout: post
title: "Blog: Extendable Webcam Customisation with Python"
date: 2022-02-20
---

<img style="float: right; border: 1px solid black" alt="Example Pixel Filter." hspace="20" src="/assets/posts/customcam/example_pixel.png" width="350px">

Discord for Linux currently doesn't support background blurring, which is a good excuse for a side project.

So, after diving into a rabbit hole filled with [OpenCV](https://opencv.org/) and [virtual devices](https://github.com/letmaik/pyvirtualcam) I've emerged with a solution.

[CustomCam](https://github.com/mattravenhall/CustomCam) is a Python framework that makes it super easy to build and apply your own video effects to a live webcam.

Try it out now with [`pip install CustomCam`](https://pypi.org/project/CustomCam/).


## Filter-First Framework
Most [OpenCV](https://opencv.org/)-based blogs & tutorials talk a lot about webcam capture and image manipulation but don't concern themselves with outputting those modified frames elsewhere (i.e. to Discord or Zoom). `CustomCam` aims to fill this gap by implementing a framework that allows users to focus on building filters not infrastructure.

You can think of the CustomCam pipeline as the following three components:

<img alt="CustomCam Workflow." width="450px" src="/assets/posts/customcam/diagram.svg">

1. **Input:** Frames are received from your regular webcam
2. **Filter:** Video effects are applied to each frame
	- The active filter can be changed mid-stream from the command line
3. **Output:** Modified frames are passed to a virtual output device 
	- You can create these with [v4l2loopback](https://github.com/umlaeute/v4l2loopback) or [OBS](https://obsproject.com/)
	- More information can be found in the [pyvirtualcam docs](https://github.com/letmaik/pyvirtualcam/blob/main/README.md)

## Filter Buffet

| Filter | Effect | Notes |
| :----: | ------ | ----- |
| `NoFilter` |  Removes filter | |
| `Gray` | Super simple grayscale | |
| `Sepia` | Standard sepia effect | Based on a [gist by FilipeChagasDev](https://gist.github.com/FilipeChagasDev/bb63f46278ecb4ffe5429a84926ff812) |
| `Segment` | Silhouette-based background-blurring | Utilises [MediaPipe's Selfie Segmentation](https://google.github.io/mediapipe/solutions/selfie_segmentation.html). Definitely the best approach for background-blurring. |
| `Pixel` | Silhouette-based foreground-blurring | Utilises [MediaPipe's Selfie Segmentation](https://google.github.io/mediapipe/solutions/selfie_segmentation.html). Essentially an inversion of `Segment`. |
| `BlurSat` | Saturation-based background blurring | Based on [blog by PythonWithRune](https://www.learnpythonwithrune.org/opencv-python-a-simple-approach-to-blur-the-background-from-webcam/). I wasn't able to effectively optimise this for a diversity of frames. |
| `BlurBox` | Facial recognition-based background blurring | Based on [blog by data-stats](https://www.data-stats.com/blurring-background-and-foreground-in-images-using-opencv/). This works fairly well, but the facial detection is a bit rough. Rotating your head breaks it. |
| `Frame` | Facial recognition-based | Essentially a debug version of `BlurBox`. Adds a green box around faces. |

## Creating your own filters
`CustomCam` is built to be customisable, so it's super simple to add your own.

Simply create a new class in [`filters.py`](https://github.com/mattravenhall/CustomCam/blob/main/CustomCam/filters.py) that:
- Inherits from the `filters.Filter` class
- Implements a `__str__` method, which returns a string containing a short description of the filter.
- Implements an `apply` method, which applies your filter logic to each frame and returns a `np.array`.
- Doesn't share a name with any existing class or input command.

Filter class names are automatically detected on launch, the class name will become its run command.
