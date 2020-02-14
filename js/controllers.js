// view control
var view = new ol.View({
  projection: 'EPSG:28992',
  center: [132386.000, 480000.000],
  maxZoom: 20,
  zoom: 10
});
  //center: [112386.607, 513352.116],
  // zoom: 12

// schaal control
var scaleLineControl = new ol.control.ScaleLine({
  minWidth: 150
});

// mouse position
var mousePositionControl = new ol.control.MousePosition({
  coordinateFormat: ol.coordinate.createStringXY(4),
      projection: 'EPSG:28992',
      // comment the following two lines to have the mouse position
      // be placed within the map.
      className: 'custom-mouse-position',
  coordinateFormat: ol.coordinate.createStringXY(2),
      target: document.getElementById('mouse-position'),
      undefinedHTML: '&nbsp;'
  });

var zoomSlider = new ol.control.ZoomSlider({});
