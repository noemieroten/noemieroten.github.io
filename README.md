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

As previously noted the pictures for each _location_ __loc__are located in the folder _data/pictures/**loc**_. They are nammed as __xx.jpg__ where _xx_ starts from 01 up to the number given by _nPictures_.


# How it works
