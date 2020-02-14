# Atlas-Basic
Frontend Web Gis Viewer

## Description:

This app is the open-source version of GeocadTek Atlas.

Atlas is a map viewer based on OpenLayers with Javascript coding.

By default, the map extend shows the Netherlands. You can edit the map.js file to update the map-extend for your preference. You can find the map.js file in static/js directory.


## Features:
- Map viewer ready for Mobile devices (Mobile design and responsive).
- Supports many geo-data sources from Dutch kadaster and public agencies.
- Tested with Google Chrome, Firefox, and Microsoft IE browsers (under Citrix).
- Allows defining superuser and administrator accounts for maintaining users and map layers. [Atlas-Starter](https://github.com/geocadtek/Atlas-Starter)
- Users with an authentication key can access hidden layers on the map server, such as GeoServer. [Atlas-Starter](https://github.com/geocadtek/Atlas-Starter)
- Supports reverse proxy configuration on Apache and Nginx. [Atlas-Starter](https://github.com/geocadtek/Atlas-Starter)


## View on github hosting:

https://geocadtek.github.io/Atlas-Basic/


## Configuration:

There are two sample files for configuration. 

- Turn on the ‘Apache’ on your Xampp.
- Clone [Atlas-Basic](https://github.com/geocadtek/Atlas-Basic.git) 
    and save it in c:\xampp\htdocs
- Open your web browser.
- Type localhost\Atlas-Basic in your URL box.


## Google Street View Configuration:

- Add the API key to your request
- You must include an API key with every Maps JavaScript API request. 
In the following example, replace YOUR_API_KEY with your API key 
on the index.html page


```
<script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY"></script>

```


###
### License

GNU General Public License

### Credits

*Mijndatalab.nl development Team*

Geocadtek 2020
###
