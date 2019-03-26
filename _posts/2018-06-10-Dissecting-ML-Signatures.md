---
layout: post
title: "Blog: ML Petitioners Tend To Be US-based Students"
date: 2018-06-10
---

Nature recently announced the launch of [*Nature Machine Intelligence*](https://www.nature.com/natmachintell/), a new journal focusing on Machine Learning. Usually journal launches are fairly uneventful but this one caught the attention of open access advocates within the machine learning community, leading to the release of an open statement decrying Nature for not adopting a full zero cost open access approach (such as that deployed by the [Journal of Machine Learning Research](http://www.jmlr.org/)).

Politics of open access aside, despite being claimed as containing both 3000 ['researchers'](https://www.theguardian.com/science/blog/2018/may/29/why-thousands-of-ai-researchers-are-boycotting-the-new-nature-journal) and ['tech giants'](https://www.forbes.com/sites/samshead/2018/04/30/tech-giant-ai-researchers-boycott-nature-machine-intelligence-journal/#1ef58f015e01), I heard claims that the majority of signatories were students and therefore unlikely to impact the journal through a boycott. Having had a quick glance at the list itself, I realised this could be a good project for some web scraping.

**Scraping Websites With BeautifulSoup**<br>
Looking at the [website](https://openaccess.engineering.oregonstate.edu/signatures) where the statement is hosted, we can see that basic information for each signature is available but not neccessarily accessible. Therefore step one is to extract that information, and convert it into a more useable format. For this we're going to use [BeautifulSoup](https://www.crummy.com/software/BeautifulSoup/?), a classic Python package for converting a messy HTML and XML documents (ie. most websites) into more easily digestible objects.

For ease of replication we'll be using a fixed version of the web page, saved on the 4th June 2018 when 3,245 signatures were present. We then pass that file, in this case '*signatures.html*', to BeautifulSoup. It's also possible to combine a [requests.get](http://docs.python-requests.org/en/master/) call for a specific URL to BeautifulSoup, should we want to create an on-demand analysis pipeline, ie. to track changes over time or raise alerts when certain threshold numbers are reached.

```python
soup = BeautifulSoup(open('signatures.html'), 'html.parser')
```

Taking a look at the initially cleaned object, we can see that each signatory has an associated field for their professional position; with that information being displayed and stored inside a 'field-content' div within a 'views-field views-field-field-professional-position' div. Once found, we can collect these all up into a list, which we'll suitably name 'positions'.

```python
positions = soup.find_all("div", class_="views-field views-field-field-professional-position")
```

**A Quick Look At The Data**<br>
With all the job positions collected, it's time to start mining for some insights. One good place to start is by converting our list of positions into a pandas Series and calling the [value_counts](http://pandas.pydata.org/pandas-docs/version/0.22/generated/pandas.Series.value_counts.html) method, and viewing the top ten values.

```python
print(pd.Series([x.get_text() for x in positions]).value_counts().head(10))
```

This allows us to peek at the most common specific job titles in decending order of frequency, producing the following table:

| Position | Count |
|:-------:|:-------:|
| *Blank* | 423 |
| PhD Student | 152 |
| Student | 124 |
| PhD student | 114 |
| Research Scientist | 101 |
| Researcher | 92 |
| Data Scientist | 85 |
| Assistant Professor | 73 |
| Professor | 71 |
| Software Engineer | 55 |

Clearly, the top hits from this rough approach appear to support students, and particularly PhD students, as being a significant cohort within the total list. However, we can also see that this approach overlooks some basic overlaps. For example, 'PhD Student' and 'PhD student' are considered two categories simply due to capitalisation, and 'student' and 'PhD student' should probably both be classed as 'student'. Similar groupings should also be probably applied for 'Assistant Professor' with 'Professor', and 'Research Scientist' with 'Researcher'.

**Using Custom Categories**<br>
A better approach is to build custom groups where clear overlaps exist, though this approach is slower and requires sensible group definitions. In this case I've created eight primary groups: blank (no information is given), students (position contains 'phd', 'student', 'candidate', 'msc' or 'masters'), professors (contains 'professor' or 'lecturer'), postdoc (contains 'postdoc'), data scientists (contains 'data scientist'), engineers (contains 'engineer'), software (contains 'software'), developer (contains 'developer'), and researcher (contains 'researcher').

Each is counted using a variant of the following list comprehension, which effectively loops through all positions and considers if they contain a keyword of interest (when both are lowercase). We then count up how many signatures contain a match.

```python
professor = sum([('professor' in x.get_text().lower()) or ('lecturer' in x.get_text().lower()) for x in positions])
```

Running this for all custom categories produces the following table in which we can see that a notable chunk of the signatures fit under the 'students' category (840 of 3,245), but not a majority. Similarly, only 563 specifically self-declare as a researcher.

| Category | Count |
|:-------:|:-------:|
| Blank | 423 |
| Students | 840 |
| Professors | 396 |
| PostDocs | 110 |
| Data Scientists | 144 |
| Engineers | 294 |
| Software | 114 |
| Developers | 28 |
| Researchers | 563 |

**Identifying Keywords**<br>
One final approach is to chop up each job position, ie. 'phd student' would become 'phd' and 'student', then count up the instances of each keyword. In doing so we can gain a nice middleground between custom categories, and rigid job matches. For this we first need a quick clean-up step to remove any odd characters from the positions data. For this we can use the [sub](https://docs.python.org/3.2/library/re.html#re.sub) function from the re module to replace a regex statement matching special characters `r'[^\w\s]'` with `''`, ie. nothing.

To unpick that regex statement a little (because they're pretty terrifying to look at), `''` indicates a string, `r` prior to the initial `'` ensures that it's a raw string (backslashes aren't converted to special character, such as `\n` with a new line), `[]` indicates a set of characters, `\w` refers to all non-special unicodes characters, `\s` refers to all whitespace characters (space, tab etc.), and `^` within `[]` reverses the character set. The statement therefore matches all special characters (%@£$!% etc.) allowing us to remove them for a more effective analysis.

```python
import re
keywords = [i for j in [re.sub(r'[^\w\s]','', x.get_text().lower().strip(' ')).split(' ') for x in positions] for i in j if i != '']
print(pd.Series(keywords).value_counts().head(10))
```

Running that snippet gives us:

| Keyword | Count |
|:-------:|:-------:|
| student | 681 |
| phd | 510 |
| scientist | 359 |
| professor | 359 |
| research | 309 |
| researcher | 247 |
| engineer | 246 |
| data | 218 |
| learning | 192 |
| machine | 181 |

Naturally this approach is still imperfect, particularly when considering that we're not accounting for spelling mistakes, foreign languages, or synonyms. But it's clear that we don't need a full investigation to determine that a large proportion of the signatories are students, particularly PhD students, and that fewer are more senior researchers. Interestingly, a notable portion also appear to be engineers and software developers which is reflected in the associated institutions (more on this later). Ultimately it's unclear how much of an impact boycotting by these signatories will have on the new journal, you don't need to be a professor to decide where papers get published but it certainly helps and many of these individuals don't appear to be in that position.

**Alternative Lines of Investigation**<br>
Beyond positions and into more blue skies data mining, a similar approach can be applied to the 'country' and 'institution' fields to see if any of these are particularly elevated. For example, by country almost half of signatures are from the United States of America.

| Country | Count |
|:-------:|:-------:|
| United States of America (the) | 1168 |
| United Kingdom of Great Britain and Northern Ireland (the) | 292 |
| Canada | 239 |
| India | 193 |
| Germany | 161 |
| France | 158 |
| China | 74 |
| Netherlands (the) | 68 |
| Spain | 61 |
| Switzerland | 56 |

And by institutions, the most frequent counts suggest that the signatories are fairly well distributed, though a significant subset (115) come from Google, Google Brain or DeepMind. On the other hand, it's a little surprising to see that only 20 signatories are from Oregon State University, from which the statement originates.

| Institution | Count |
|:-------:|:-------:|
| *Blank* | 552
| Google | 47 |
| Google Brain | 41 |
| Carnegie Mellon University | 30 |
| DeepMind | 27 |
| UC Berkeley | 27 |
| University of Oxford | 26 |
| Stanford University | 23 |
| MIT | 22 |
| McGill University | 19 |

The full code used for this mini-project, and the saved version of the web page, are available on [github](https://github.com/mattravenhall/SignatoryStats).