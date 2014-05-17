map_pictures
============

This is a simple project to show to your friends where you have been around the world!

# How to use it

All the settings are in the file *location.csv* in the data folder.

The csv has the following columns:

1. location: the city/country/area that will be displayed on the map. **Pictures will have to be saved in the folder _data/pictures/location_**. For example if the csv file has an entry *New York*, then the scripts expects a folder *data/pictures/New York* to be existent and containing the pictures one wants to display.
   
2. longitude/latitude: the usual coordinates of the location, ex: "-54.5, 139.25" for 54°30 South and 139°15 East.

3. bubbleSize: size of the circle on the map.

4. nPictures: the number of pictures for the area.

# Assumptions about the inputs

The pictures should be *.jpg* files in 4/3 format (with resolution for example _640x480_).

As previously noted the pictures for each _location_ __loc__ are located in the folder _data/pictures/**loc**_. They are nammed as __xx.jpg__ where _xx_ starts from 01 up to the number given by _nPictures_.

For example, to continue our example about New York, the folder __data/pictures/New York__ should contain the jpegs __01.jpg__, __02.jpg__, ..., up to nPictures.

# How it works

It is mainly backend by *topoJson*, *D3.js* and *flexslider*. The scripts first draws the maps, then the voronoi partition (such that the user's mouse do not to be perfectly on the city to be able to click), add the cities to the map, and then add the interaction with the dom.

# Idea on how to improve the project

1. One should definitively be able to remove the nPictures column from the location.csv. Using python would be a simply task, but my limitation of javascript are so I could not do it. The scripts should also be fine with any file name in the __data/pictures/location__ . It should also accept any kind of picture considered as valid by the _img_ html tag.

2. Any resolution of images should be accepted. I had some issue with the resizing of the flexslider.

3. Nowadays, most pictures contains *GPS* location information. Hence we could be able to use them to cluster the picture (using a simple hierarical tree) and then guessing the location from the inferred clusters (by taking the mean of the coordinates and trying to find the closest city). This would remove from the user the hurdle to type the location and to look for the coordinates of that location.

4. Design could definitievly improved, although this should according everyone's tastes.
