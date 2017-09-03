---
layout: post
title: "Platform Programming"
date: 2015-07-28
---

<img style="float: right; border: 1px solid black" alt="Yakult Poster" hspace="20" src="/assets/yakultposter.png">

Almost a year ago, I was travelling on the London Underground when I spotted the following advertisement/competition on the wall. I quickly realised that this is exactly the sort of problem which can quickly be solved with a simple bit of code. Why? Because despite the solution itself being fairly simple (grab a list of the tube names and remove any which include letters found within the given word, then return the left over station/s), the actual task of eliminating stations is boring, repetitive and slow. Exactly what computers are designed for.

<h3>**Function Overview**</h3>
So let’s get stuck into the code, for this I’ve used Python but obviously it’ll work in any programming language.

The core of this code all exists within one function, called riddle(), which takes the word with all the letters the final tube station shouldn’t include. In the above case, that word is ‘MACKEREL’ so we would call this function within a Python interpreter with riddle(‘MACKEREL’). There are also two optional arguments, whose default values are False.

```python
def riddle(word, infile=False, displayFalse=False):
    ...
```

One is ‘displayedFalse‘ which, when set as True, will return a list of the stations that are not the correct solution alongside the correct answer/s. The second optional argument is ‘infile‘ which, if set to the location of a file, will convert a given file into a list. This list will then be used in place of the default tube stations.

<h3>**Setting The Table**</h3>
As standard, the first priority of the script is to assign the variables which will be used throughout the script. For this, we have two fairly self-explanatory lists:

```python
if os.path.exists(infile):
    print('TUBELIST set to given file')
    # if a file location is given, convert that file to TLIST
    TUBELIST = []
 
    # open file for reading
    f = open(infile, 'r')
 
    # loop over file, append each line (minus \n to list)
    for line in f:
        TUBELIST.append(line.rstrip('\n'))
 
    # clean up, close file
    f.close()
else:
    print('TUBELIST set to default')
    TUBELIST = ['Acton Town', 'Aldgate East', 'Aldgate', ... ]
falseList = []
```

TUBELIST, not shown here in full, is a complete list of all the stations on the London Underground and represented the most taxing stage of creating this script. In the end, I visited Wikipedia to rip and clean all the station names. This constant will contain a list of values within a given file, if one is given. The detection for this is to check (via os.path) if infile is a file that exists on the user’s computer. If it doesn’t, the list will be set as the default tube list. Despite this check, TUBELIST assignment can still fail if a non-standard file is given (ie. one which isn’t a text file with a list item per new line).

falseList represents all the tube stations which contain letters found within the given keyword. This is also the list that will return if ‘displayFalse‘ is set to True. Population of this list is core to this script.

<h3>**The Workhorse**</h3>
Here we can start talking about the method behind the solution. My approach was to iterate through each station in TUBELIST, then through each letter in the given keyword. For each letter, we check if it is also found within the station (note the converstion to lowercase as ‘A’ doesn’t equal ‘a’). If a letter from the keyword is found within the station name, that station name is added to the end of falseList.

```python
for station in TUBELIST: #for each station in TUBELIST
    for letter in word.lower(): #for each letter in keyword
        if letter in station.lower(): #if any of given letters are in name
            falseList.append(station) #append station to falseList
```

Once we have our list of stations which are not the solution, we can simply create a new list of stations which exist in TUBELIST but not in falseList. This is done by temporarily converting each list into a set.

Be warned that sets are unordered collections of unique variables, therefore this solution may produce odd results if duplicate stations exist or if the order of stations is important (in this case neither issue should occur). This can however be a problem if attempting to perform something similar with DNA sequences, where the abundance or position of a particularly sequence may be important.

```python
trueList = set(TUBELIST) - set(falseList)
trueList = list(trueList)
```

We then finish by returning trueList (and falseList if requested).

```python
if displayFalse.upper() == "Y":
    print("False: ")
    print(falseList)
print("True: ")
print(trueList)
```
