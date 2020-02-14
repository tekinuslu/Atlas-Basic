var map, vectorLayer, vectorSource, panorama, iconFeature;
var svLat, svLon;
var is_street_view_actief = false; // street view inactief
var lat_val_glb = 0, lot_val_glb = 0; // glabal coordinaates

function init(){
	// Projection naar 28992 RD
	proj4.defs("EPSG:28992","+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs");

	var select = new ol.interaction.Select({
   wrapX: false
 });

 var modify = new ol.interaction.Modify({
   features: select.getFeatures()
 });

	var viewProjection = view.getProjection();
	var viewResolution = view.getResolution();

	// map class
	map = new ol.Map({
		interactions: ol.interaction.defaults().extend([select]),
		layers:layerList,
		target: 'map',
		controls: ol.control.defaults({attribution: false
		}).extend([mousePositionControl, zoomSlider]),
		view: view
	}); // END Map Class

	// show model
	//$('#myModal').modal('show');
	// create a dynamisch table
	var start_tabelregel = "<table class='table'  width='100%' cellspacing = '0'>";
	var header_regel = "<tbody>";
	var content_thema = " ";
	var content_basisreg = " ";
	var content_baselayer = " ";
	var content_luchtfotos = " ";
	var einde_tabelregel = "</tbody></table>";

	// legend mogel content_luchtfotos
	var content_legendlink = " ";
	// slider modal content
	var content_slidermodal = " ";
	// data filter div
	var content_filter_data = " ";

	// metadata information
	var content_infomodal = " ";

	// get dynamisch legend link
	function get_legend_link(lyr){
		var linkSrc = "";
		// check external link
		if (lyr.get('isExternal') && lyr.get('legend_url') ) {

			linkSrc = lyr.get('legend_url'); //+
			//"/wms?SERVICE=WMS&version=1.3.0&service=WMS&"+
			//"request=GetLegendGraphic&sld_version=1.1.0&LAYER="+lyr.get('layerName')+
			//"&format=image/png";
		} else if (lyr.get('isExternal')) {

			linkSrc = "https://geodata.nationaalgeoregister.nl/"+ lyr.get('layer_name')  +
			"/wms?SERVICE=WMS&version=1.3.0&service=WMS&"+
			"request=GetLegendGraphic&sld_version=1.1.0&LAYER="+ lyr.get('layer_name')  +
			"&format=image/png";

		} else if(!lyr.get('isExternal')){
				linkSrc = linkSrc;
		}
		return linkSrc;
	}

	// add layers to the html div
	layerList.forEach(function(layer, i) {


// debugger;

		var name = layer.get('title');
		var visiblity = layer.get('visible');
		var transparantie = layer.get('opacity');
		var lyrID = layer.get('layer_id') || layer.get('id');
		//var lyrID = layer.get('layer_id');
		var sldID = layer.get('sld');
		var lgndID = layer.get('legend') || layer.get('lgnd') ;
		//var lgndID = layer.get('legend') ;
		var basisregistratie = layer.get('basisreg');
		var luchtfotokaart = layer.get('isLufo');
		var filterID = layer.get('filterId');
		var sldDiv = layer.get('sldDiv');
		var infoDiv = layer.get('infoDiv');
		var dataFilterID = layer.get('filterdataid');



		// legend model popup slider
		content_slidermodal += "<div class='modal fade' id='"+sldDiv+"' role='dialog'>";
		content_slidermodal += "<div class='modal-dialog'>";
		content_slidermodal += "<div class='modal-content'>";
		content_slidermodal += "<div class='modal-header'>";
		content_slidermodal += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
		content_slidermodal += "<h5 class='modal-title'> Transparantie - "+ name +" </h5>";
		content_slidermodal += "</div>";
		content_slidermodal += "<div class='modal-body'>";
		content_slidermodal += "<div class='slidertabel' id='"+ sldID +"'>";
		content_slidermodal += "<div class='ui-slider-handle'></div>";
		content_slidermodal += "</div>"
		content_slidermodal += "</div>";
		content_slidermodal += "<div class='modal-footer'>";
		content_slidermodal += "</div>";
		content_slidermodal += "</div>";
		content_slidermodal += "</div>";
		content_slidermodal += "</div>";

		// Metadata info div - modal
		content_infomodal += "<div class='modal fade' id='"+infoDiv+"' role='dialog'>";
		content_infomodal += "<div class='modal-dialog'>";
		content_infomodal += "<div class='modal-content'>";
		// content_infomodal += "<div class='modal-header'>";
		// content_infomodal += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
		// content_infomodal += "<h5 class='modal-title'> Metadata informatie - "+ name +" </h5>";
		// content_infomodal += "</div>";
		content_infomodal += "<div class='modal-body'>";

		// metadata informatie content
		content_infomodal += "<table class='table'  width='100%' cellspacing = '0'>"
		content_infomodal += "<tbody>";

		content_infomodal += "<tr>";
		content_infomodal += "<td class='eerste_div'><b>Naam</b></td>";
		content_infomodal += "<td class='tweede_div'>";
		content_infomodal += layer.get('meta_name') || layer.get('meta_naam');
		content_infomodal += "</td>";
		content_infomodal += "</tr>";

		content_infomodal += "<tr>";
		content_infomodal += "<td class='eerste_div'><b>Soort</b></td>";
		content_infomodal += "<td class='tweede_div'>";
		content_infomodal += layer.get('meta_kind') || layer.get('meta_soort');
		content_infomodal += "</td>";
		content_infomodal += "</tr>";

		content_infomodal += "<tr>";
		content_infomodal += "<td class='eerste_div'><b>Organisatie beheerder</b></td>";
		content_infomodal += "<td class='tweede_div'>";
		content_infomodal += layer.get('meta_org');
		content_infomodal += "</td>";
		content_infomodal += "</tr>";

		content_infomodal += "<tr>";
		content_infomodal += "<td class='eerste_div'><b>Bijgewerkt per</b></td>";
		content_infomodal += "<td class='tweede_div'>";
		content_infomodal += layer.get('meta_updated') || layer.get('meta_bijgewerkt') ;
		content_infomodal += "</td>";
		content_infomodal += "</tr>";

		content_infomodal += "</tbody>";

		content_infomodal += "</table>";


		content_infomodal += "</div>";
		// content_infomodal += "<div class='modal-footer'>";
		// content_infomodal += "</div>";
		content_infomodal += "</div>";
		content_infomodal += "</div>";
		content_infomodal += "</div>";

		// check external layer
		var linkSrc = "";

		// get layer name for NOT baseLayer
		if(!layer.get('isBaseLayer') && name != "Marker Layer" && !layer.get('isgeojson') && !luchtfotokaart ){

			// legend model popup content
			content_legendlink += "<div class='modal fade' id='"+lgndID+"' role='dialog'>";
			content_legendlink += "<div class='modal-dialog'>";
			content_legendlink += "<div class='modal-content'>";
			content_legendlink += "<div class='modal-header'>";
			content_legendlink += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
			content_legendlink += "<h5 class='modal-title'> Legenda - "+ name +"</h5>";
			content_legendlink += "</div>";
			content_legendlink += "<div class='modal-body'>";
			content_legendlink += "<img src='"+ get_legend_link(layer) +"' />";
			content_legendlink += "</div>";
			content_legendlink += "<div class='modal-footer'>";
			content_legendlink += "</div>";
			content_legendlink += "</div>";
			content_legendlink += "</div>";
			content_legendlink += "</div>";



		}

		// check for baseLayer
		if(layer.get('isBaseLayer')){

			//var radioBtn = '<input type="radio" name="rbtnCount" />';
			content_baselayer += "<tr>";
			content_baselayer += "<td class='eerste'>";
			if(visiblity){ //check the visibility
				content_baselayer += "<input checked type='radio' id='"+ lyrID +"' name='achtergronden'> <label for='"+ lyrID +"'>"+ name +" </label>";
			}else{
				content_baselayer += "<input type='radio' id='"+ lyrID +"' name='achtergronden'> <label for='"+ lyrID +"'>"+ name +" </label>";
			}
			content_baselayer += "</td>";

			// metadata informatie
			content_baselayer += "<td class='tweede'>";
			content_baselayer += "<a data-tooltip='tooltip' title='Informatie'  data-toggle='modal' data-target='#"+infoDiv+"' >";
			// content_baselayer += "<img src='images/informatie.png' height='20' width='20'/>";
			//content_baselayer += "<img src={{ url_for('static', filename='images2/informatie.png')}} height='20' width='20'/>";
			content_baselayer += "<img src='images/informatie.png' height='20' width='20'/>";
			content_baselayer += "</a>";
			content_baselayer += "</td>";

			// transparantie
			content_baselayer += "<td class='tweede'>";
			content_baselayer += "<a data-tooltip='tooltip' title='Transparantie' data-toggle='modal' data-target='#"+sldDiv+"'>";
			//content_baselayer += "<img src='images/transparantie.png' height='20' width='20'/>";
			content_baselayer += "<img src='images/transparantie.png' height='20' width='20'/>";
			content_baselayer += "</a>";
			content_baselayer += "</td>";

			content_baselayer += "</tr>";

		}

		// Thema kaarten - check for NOT base layer and NOT marker layer and NOT PDOK layer
		if(!layer.get('isBaseLayer') && name != "Marker Layer" && !basisregistratie && !luchtfotokaart){
			// dynamisch legenda content
			content_thema += "<tr>";
			content_thema += "<td class='eerste'>";

			if(visiblity){ //check the visibility
				content_thema += "<span class='layer_name'>" + name + "</span>";
				content_thema += "<div class ='layer-switch pull-right'>";
				content_thema += "<input checked id='"+ lyrID +"' value='"+ lyrID +"' type='checkbox'/><label class='label-success' for='"+ lyrID +"'></label>";
				content_thema += "</div>";
			} else{
				content_thema += "<span class='layer_name'>" + name + "</span>";
				content_thema += "<div class ='layer-switch pull-right'>";
				content_thema += "<input id='"+ lyrID +"' value='"+ lyrID +"' type='checkbox'/><label class='label-success' for='"+ lyrID +"'></label>";
				content_thema += "</div>";
			}
			content_thema += "</td>";

			content_thema += "<td class='tweede'>";
			content_thema += "<a data-tooltip='tooltip' title='Legenda'  data-toggle='modal' data-target='#"+lgndID+"'>";
			//content_thema += "<img src='images/legendicon.png' height='20' width='20'/>";
			content_thema += "<img src='images/legendicon.png' height='20' width='20'/>";
			content_thema += "</a>";
			content_thema += "</td>";

			// metadata informatie
			content_thema += "<td class='tweede'>";
			content_thema += "<a data-tooltip='tooltip' title='Informatie'  data-toggle='modal' data-target='#"+infoDiv+"' >";
			//content_thema += "<img src='images/informatie.png' height='20' width='20'/>";
			content_thema += "<img src='images/informatie.png' height='20' width='20'/>";
			content_thema += "</a>";
			content_thema += "</td>";

			content_thema += "<td class='tweede'>";
			content_thema += "<a data-tooltip='tooltip' title='Transparantie'  data-toggle='modal' data-target='#"+sldDiv+"'>";
			//content_thema += "<img src='images/transparantie.png' height='20' width='20'/>";
			content_thema += "<img src='images/transparantie.png' height='20' width='20'/>";
			content_thema += "</a>";
			content_thema += "</td>";

			content_thema += "</tr>";
		}

		// check for basisregistratie layers
		if(basisregistratie){

			content_basisreg+= "<tr>";
			content_basisreg += "<td class='eerste'>";

			if(visiblity){ //check the visibility
				content_basisreg += "<span class='layer_name'>" + name + "</span>";
				content_basisreg += "<div class ='layer-switch pull-right'>";
				content_basisreg += "<input checked id='"+ lyrID +"' value='"+ lyrID +"' type='checkbox'/><label class='label-success' for='"+ lyrID +"'></label>";
				content_basisreg += "</div>";
			} else{
				content_basisreg += "<span class='layer_name'>" + name + "</span>";
				content_basisreg += "<div class ='layer-switch pull-right'>";
				content_basisreg += "<input id='"+ lyrID +"' value='"+ lyrID +"' type='checkbox'/><label class='label-success' for='"+ lyrID +"'></label>";
				content_basisreg += "</div>";
			}
			content_basisreg += "</td>";

			content_basisreg += "<td class='tweede'>";
			content_basisreg += "<a data-tooltip='tooltip' title='Legenda'  data-toggle='modal' data-target='#"+lgndID+"'>";
			//content_basisreg += "<img src='images/legendicon.png' height='20' width='20'/>";
			content_basisreg += "<img src='images/legendicon.png' height='20' width='20'/>";
			content_basisreg += "</a>";
			content_basisreg += "</td>";

			// no filter for basisregistratie
			// content_basisreg += "<td class='tweede'>";
			// content_basisreg += "<a data-tooltip='tooltip' title='Filter data' data-toggle='collapse' data-target='#"+filterID+"'>";
			// content_basisreg += "<img src='images/filter.png' height='20' width='20'/>";
			// content_basisreg += "</a>";
			// content_basisreg += "</td>";

			// metadata informatie
			content_basisreg += "<td class='tweede'>";
			content_basisreg += "<a data-tooltip='tooltip' title='Informatie'  data-toggle='modal' data-target='#"+infoDiv+"' >";
			//content_basisreg += "<img src='images/informatie.png' height='20' width='20'/>";
			content_basisreg += "<img src='images/informatie.png' height='20' width='20'/>";
			content_basisreg += "</a>";
			content_basisreg += "</td>";

			content_basisreg += "<td class='tweede'>";
			content_basisreg += "<a data-tooltip='tooltip' title='Transparantie'  data-toggle='modal' data-target='#"+sldDiv+"'>";
			//content_basisreg += "<img src='images/transparantie.png' height='20' width='20'/>";
			content_basisreg += "<img src='images/transparantie.png' height='20' width='20'/>";
			content_basisreg += "</a>";
			content_basisreg += "</td>";

			content_basisreg += "</tr>";
		}

		// check for the luchtfoto's
		if(luchtfotokaart){

			content_luchtfotos+= "<tr>";
			content_luchtfotos += "<td class='eerste'>";
			if(visiblity){ //check the visibility
				content_luchtfotos += "<span class='layer_name'>" + name + "</span>";
				content_luchtfotos += "<div class ='layer-switch pull-right'>";
				content_luchtfotos += "<input checked id='"+ lyrID +"' value='"+ lyrID +"' type='checkbox'/><label class='label-success' for='"+ lyrID +"'></label>";
				content_luchtfotos += "</div>";
			} else{
				content_luchtfotos += "<span class='layer_name'>" + name + "</span>";
				content_luchtfotos += "<div class ='layer-switch pull-right'>";
				content_luchtfotos += "<input id='"+ lyrID +"' value='"+ lyrID +"' type='checkbox'/><label class='label-success' for='"+ lyrID +"'></label>";
				content_luchtfotos += "</div>";
			}
			content_luchtfotos += "</td>";

                        // no legend for luchtfoto
			// content_luchtfotos += "<td class='tweede'>";
			// content_luchtfotos += "<a data-tooltip='tooltip' title='Legenda'  data-toggle='modal' data-target='#"+lgndID+"'>";
			// //content_luchtfotos += "<img src='images/legendicon.png' height='20' width='20'/>";
			// content_luchtfotos += "<img src='static/images/legendicon.png' height='20' width='20'/>";
			// content_luchtfotos += "</a>";
			// content_luchtfotos += "</td>";

			// metadata informatie
			content_luchtfotos += "<td class='tweede'>";
			content_luchtfotos += "<a data-tooltip='tooltip' title='Informatie'  data-toggle='modal' data-target='#"+infoDiv+"' >";
			//content_luchtfotos += "<img src='images/informatie.png' height='20' width='20'/>";
			content_luchtfotos += "<img src='images/informatie.png' height='20' width='20'/>";
			content_luchtfotos += "</a>";
			content_luchtfotos += "</td>";

			content_luchtfotos += "<td class='tweede'>";
			content_luchtfotos += "<a data-tooltip='tooltip' title='Transparantie'  data-toggle='modal' data-target='#"+sldDiv+"'>";
			//content_luchtfotos += "<img src='images/transparantie.png' height='20' width='20'/>";
			content_luchtfotos += "<img src='images/transparantie.png' height='20' width='20'/>";
			content_luchtfotos += "</a>";
			content_luchtfotos += "</td>";

			content_luchtfotos += "</tr>";
		}

	}); // END foreach LayerList

	// add thema layers
	$( "#themakaarten" ).append(start_tabelregel+header_regel+content_thema+einde_tabelregel);

	// add basisregistratie layers
	$( "#basiskaarten" ).append(start_tabelregel+header_regel+content_basisreg+einde_tabelregel);

	// add baselayer layers
	$( "#achtergronden" ).append("<table class='table' width='100%' cellspacing='0'><tbody>"+content_baselayer+"</tbody></table>");

	// add luchtfoto's layers
	$("#luchtfotos").append(start_tabelregel+header_regel+content_luchtfotos+einde_tabelregel);

	// add legend img popup
	$("#legengimgdiv").append(content_legendlink);

	// add metadata info popup
	$("#metadaInfoDiv").append(content_infomodal);

	// add slider layer div
	$("#sliderdiv").append(content_slidermodal);

	// slider tool tip
	$('[data-tooltip="tooltip"]').tooltip();

	// filter data div show() filterDataInput
	$(".openDataFilter").click(function(){

		$("#filterdiv").toggle();
	}); // END onclick

	// clear datafilkter div
	$('input[name="datafilterinput"]').click(function(){
			$("#filterDataResult").empty();
	});

	map.getLayers().forEach(function (lyr) {

		// Layer on-off if the layer is baselayer
		if(lyr.get('isBaseLayer')){
			// basemap OSM
			$( "input[name='achtergronden']" ).change(function() {
				if($('#'+ ( lyr.get('id')  || lyr.get('layer_id') )+'').is(":checked")) {
					lyr.setVisible(true);
				}
				else{
					lyr.setVisible(false);
				}
			});

		} // END if ! isBaseLayer

		// Layer on-off if the layer is NOT baselayer
		if(!lyr.get('isBaseLayer')){
			// layer change functie
			//$('#'+ ( lyr.get('id') )+'').change(function(){
			$('#'+ ( lyr.get('id') || lyr.get('layer_id'))+'').change(function(){
			//$('#'+ ( lyrID )+'').change(function(){
				if($(this).is(":checked")){
					lyr.setVisible(true);
				}
				else{
					lyr.setVisible(false);
				}
			}); // END change function
		} // END if NOT isBaseLayer

		// slider
		$('#'+ (lyr.get('sld'))+'').slider({
			range: "min",
			min: 0,
			max: 100,
			value: (lyr.get('opacity')*100),
			create: function(event, ui) {
				var value = $(this).slider("option","value");
				$(this).find(".ui-slider-handle").text(value);
			},
			slide: function( event, ui ) {
					$(this).find('.ui-slider-handle').text(ui.value);
					lyr.setOpacity(ui.value/100);
			}
		}); // END slider

  }); //END getLayers()

	// get streetviewCoordinates
	function streeViewCoordinates(x_coor, y_coor) {

		// var streetViewPlace = {lat:lat_value, lng:lng_value};
		var streetViewPlace = {lat:x_coor, lng:y_coor};
		panorama.setPosition(streetViewPlace);
	}


	// first leeter Capital
	function jsUcfirst(string)
	{
			return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var iconStyle = new ol.style.Style({
	 image: new ol.style.Icon(({
		 anchor: [0.5, 0],
		 scale:1,
		 anchorOrigin: 'bottom-left',
		 anchorXUnits: 'fraction',
		 anchorYUnits: 'pixels',
		 opacity: 0.75,
		 src: 'img/select_icoon.png'
	 }))
 	});


	// set feature icon params
	function set_vrector_feature_icon(coord_x, coord_y){

		// clear all other marker;
		vectorSource.clear();
		// create vector source for search marker
		vectorSource = new ol.source.Vector({});

		// set icon style
		iconFeature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform([parseInt(coord_x), parseInt(coord_y)], 'EPSG:28992', 'EPSG:28992'))
		});

	 // set style
		iconFeature.setStyle(iconStyle);

		// add marker
		//vectorSource.addFeature(iconFeature);

		vectorLayer = new ol.layer.Vector({
			source: vectorSource
		});

		return iconFeature;
	}
	// zoek op adres - autocomplete JSON from Locatieserver
	$("#straatnaam").autocomplete({

		source: function (request, response) {
				var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
				$.ajax({
				// url:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q=" + request.term + " and (gemeentecode:0439 or gemeentecode:0370)",
				url:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/suggest?q=" + request.term,
						dataType: "json",
						success: function (data) {
								response($.map(data.response.docs, function(v,i){
									var text = v.weergavenaam;
									if ( text && ( !request.term || matcher.test(text) ) ) {
										///alert(text);
											return {
											 label: v.weergavenaam,
											 value: v.weergavenaam,
											 geo: v.centroide_rd,
											 adrs_id: v.id
											};

										}
								}));
						}
				});
		},
		select: function( event , ui ) {
			// check the value at locatieserver
			$.ajax({
					url:"https://geodata.nationaalgeoregister.nl/locatieserver/v3/free?q=id:" + ui.item.adrs_id,
					dataType: "json",
					success: function (data) {
						// get RD geometry
						var geometrie_rd = data.response.docs[0].centroide_rd;
						//console.log(data.response.docs[0].centroide_rd);

						var coord_x = 0;
						var coord_y = 0;

						for(var i=0; i<geometrie_rd.length; i++){

								var spaceIndex = geometrie_rd.indexOf(" ");

								coord_x = geometrie_rd.substring(6, spaceIndex);
								coord_y = geometrie_rd.substring(spaceIndex, geometrie_rd.length);
						}

						// set center point
						var center = [parseInt(coord_x), parseInt(coord_y)];

						// set icon feature params
						set_vrector_feature_icon(coord_x, coord_y);

						// clear all selected objects
						vectorSource.clear();
						vectorSource.addFeature(iconFeature);

						map.getView().setCenter(ol.proj.transform([parseInt(coord_x), parseInt(coord_y)] , 'EPSG:28992', 'EPSG:28992'));
						map.getView().setZoom(19);

						map.addLayer(vectorLayer);

						// to convert coordinate from lat long to x-y RD
						var convrt = ol.proj.transform([parseInt(coord_x), parseInt(coord_y)], 'EPSG:28992','EPSG:4326');

						var lat_val_conv = convrt[0];
						var lot_val_conv = convrt[1];

						lat_val_glb = lat_val_conv;
						lot_val_glb = lot_val_conv;


						// set Streetview Positie
						streeViewCoordinates(lot_val_conv, lat_val_conv);

						// set street-view position
						//streeViewCoordinates(coord_x, coord_y);

					}
			});

		}

	}); // END autocomplete

	// set pin by select object
	function selected_object(evt){
		// clear all selected objects
		vectorSource.clear();

		var cor_x = evt.coordinate[0];
		var cor_y = evt.coordinate[1];

		var iconFeature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.transform([parseInt(cor_x), parseInt(cor_y)], 'EPSG:28992', 'EPSG:28992'))
		});

	 // set style
		iconFeature.setStyle(iconStyle);

		// add marker
		vectorSource.addFeature(iconFeature);
		// get vector layer
		vectorLayer = new ol.layer.Vector({
			source: vectorSource
		});
		// vector to map
		map.addLayer(vectorLayer);
	}

	// clear markers van zoek op adres
	$(".btn_zoek_adres_style").click(function(){
			vectorSource.clear();
	});

	// click on map function
	map.on('click', function(evt) {

		selected_object(evt);

		//var coordinaten = (ol.proj.transform([evt.coordinate], 'EPSG:28992','EPSG:4326'));
		var lng_value = evt.coordinate[0];
		var lat_value = evt.coordinate[1];

		// to convert coordinate from lat long to x-y RD
		var convrt = ol.proj.transform([lng_value, lat_value], 'EPSG:28992','EPSG:4326');

		lat_val_glb = convrt[0];
		lot_val_glb = convrt[1];

		// create popup content
		var content_popup = "";
		// check streetview actief
		if (is_street_view_actief) {
			// set Streetview Positie
			streeViewCoordinates(lot_val_glb, lat_val_glb);
		}

		// get layerList
		layerList.forEach(function(layer, i){
			// if layer visible and not Basigreg not MarkerLayer not and isPopup true
			if(layer.getVisible() &&
				layer.get('title') != "Marker Layer" && layer.get('isPopup')){
				// create url for getGetFeatureInfoUrl
				// wms layer get feature info
				var info_url_before = layer.getSource().getGetFeatureInfoUrl(
					evt.coordinate, map.getView().getResolution(), 'EPSG:28992',
					{'INFO_FORMAT': 'application/json'
					 // 'propertyName': ['']
				 	}
				);



			// create url for getGetFeatureInfoUrl
			var layer_url = info_url_before + "&QUERY_LAYERS=" + layer.get('layerName') ;

			// console.log('layer url',layer_url);

			  // alert(layer_url);

			 if (layer_url) {

				 var parser = new ol.format.GeoJSON();

				 $.ajax({
					 url: layer_url,
					 method:'get',
					 success:function(data){
						 // console.log('data', data);
						//alert("data: " + data);
	 					data.features.map(function (v,i) {

							content_popup += "<a class='accordion-toggle collapsed' data-toggle='collapse' href='#"+layer.get('dataFilterId')+"'>";
							content_popup += 	"<span class='text'>"+layer.get('title')+"</span>";
							content_popup +=  "<span class='icon-caret icon-caret-right'></span></a>";
							content_popup += "<br/>";
							content_popup += "<div style='margin-top:4px;' id='"+layer.get('dataFilterId')+"' class='collapse'>";
							content_popup += "<table class='table'>";


 							 $.each(v.properties, function(prop_name,prop_val){

								 // optie-1
								 //
 								 // create popup content if NOT empty
 								 // if(prop_val != "" && prop_val != null){
								 //
									//  // get attribute list
									//  if(layer.get('attribute_list').includes(prop_name)){
								 //
									// 	 	 content_popup += "<b>"+jsUcfirst(prop_name)+": </b>";
									// 		 // website url to link
									// 		if(jsUcfirst(prop_name)=="Website"){
									// 			content_popup += "<a href='http://"+prop_val+"' target='_blank'>"+prop_val+"</a>"
									// 		} else{
									// 		 content_popup += prop_val;
								 //
									// 		}
								 //
									// 		content_popup += "<br>";
								 //
									//  } // END attribute_list
								 //
 								 // } // END if value not empty

								 //optie-1

								 // get popup info
								 function get_popup(attr_nm, attr_val){
									 content_popup += "<tr>";
									 var result = "";
									 if (attr_nm == "website") {
										 content_popup += "<td><a target='_blank' href='"+prop_val+"'>Meer info</a></td>";
									 } else if (attr_nm == "foto"){
										 if (attr_val != null) {
											 content_popup += "<td><a target='_blank' href='../data/images/NAP/"+attr_val+"'><img style='margin-top:4px;' width=100% height=250px src='../data/images/NAP/"+attr_val+"'/></a></td>";
										 }
									 } else{
										 content_popup += "<td><b>"+jsUcfirst(attr_nm)+"</b></td>";
										 content_popup += "<td>" + attr_val + "</td>";
									 }
									 content_popup += "</tr>";
									 return content_popup;
								 }

								// create popup content if NOT empty
								 if(prop_val != "" && prop_val != null){
									 // call get popup info function
									 get_popup(prop_name, prop_val);
								 } // END if value not empty

 							 });


							 content_popup += "</table>";
 							 content_popup += "</div>";
	 					 });

	 					// add pop-up info content
	 					$("#dataResult").html(content_popup);
	 					$("#popupTitle").html("Geselecteerde objecten");
	 					$('#rel_popup_div').show('slow');

	 				} // END success
				 }); // END Ajax
			 } // END if(url)
		}
	}); // END layersList forEach

}); // END map.on.click

// Street-view API Actief
function set_street_view_on(){

	// check global coordinaates
	if (lat_val_glb != 0 || lot_val_glb != 0) {
		svLat = lot_val_glb;
		svLon = lat_val_glb;
	}

	// if de coordinates are undefined
	 if (svLat === undefined || svLon === undefined) {
	    svLat = 52.373154;
	    svLon = 4.893327;
		}

	 // google street view API
		panorama = new google.maps.StreetViewPanorama(
		document.getElementById('street-view'),
		{
			position: {lat:svLat, lng:svLon},
			pov: {heading: 165, pitch: 0},
			zoom: 1
		});

	// Initalize StreetSmartApi
	$('#street-view').show();
}

function set_street_view_off(){
	// Initalize StreetSmartApi
	$('#street-view').hide();
}

// Street-vie toggle button
$("#streetman").click(function(){
	$("#streetman").toggleClass("street_view_actief");
	if ($(this).hasClass('street_view_actief')){
		// check hide other menus
		if ($(".btn_layerlist").hasClass('layerlist_view_actief')){
			$(".btn_layerlist").toggleClass('layerlist_view_actief');
			$("#layer_list_menu").hide();
		}
		// set streetview actief
		set_street_view_on();
		is_street_view_actief = true;
	} else {
		// set Street-view Off
		set_street_view_off();
	}

});

// if click on close button
$("#close_btn").click(function(){
	$("#rel_popup_div").hide('slow');
});

// layerlst data
$(".btn_layerlist").click(function(){
	$(this).toggleClass('layerlist_view_actief');

	// check toggle
	if ($(this).hasClass('layerlist_view_actief')){
		// set Street-view Off
		set_street_view_off();
		if ($("#streetman").hasClass('street_view_actief')){
			$("#streetman").toggleClass("street_view_actief");
		};
		// layer list menu display
		$("#layer_list_menu").show();

	} else {
		//$('#street-view').show();
		$("#layer_list_menu").hide();
	}

}); // END click function


} // END Init()
