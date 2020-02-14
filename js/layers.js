var vectorLayer, vectorSource;

// get curent time
function getDate(param){
	// define a current time
	var currentTime = new Date()
	// returns the month (from 0 to 11)
	var month = currentTime.getMonth() + 1
	// returns the day of the month (from 1 to 31)
	var day = currentTime.getDate()
	// returns the year (four digits)
	var year = currentTime.getFullYear()

	if(param == 'month'){ // get month
		return month + '/' + year;
	} else if(param == 'day'){ // get day
		return day + '/' + year;
	} else if(param == 'year'){ //get year
		return year;
	} else if (param == 'full'){
		return day + '/' + month + '/' + year
	}
}

// Osm
var osm = new ol.layer.Tile({
	id: "osm",
	sld: "sldID_osm",
	sldDiv: "sld_div_osm",
	infoDiv: "info_div_osm",
	// metadata attributen
	meta_naam: "<a target='_blank' href='https://www.openstreetmap.org'>OSM</a> (OpenStreetMap)",
	meta_soort: "Achtergrond kaart",
	meta_org: "Vrijwilligers</a>",
	meta_bijgewerkt:getDate('full') + ' (Dagelijks)',
	// metadata attributen
	title: "OSM Open Street Map",
	visible:false,
	isBaseLayer: true,
	opacity: 0.9,
	source: new ol.source.OSM()
});

//add BRT PDOk Panden
var brt_pdok = new ol.layer.Tile({
	id: "brtpdok",
	sld: "sldID_brt",
	sldDiv: "sld_div_brt",
	infoDiv: "info_div_brt_pdok",
	// metadata attributen
	meta_naam: "BRT (Basisregistratie Topografie) - <a target='_blank' href='https://pdok.nl'>PDOK</a>",
	meta_soort: "Basisregistratie",
	meta_org: "<a href='https://data.overheid.nl/data/dataset/brt-achtergrondkaart' target='_blank'>Kadaster</a>",
	meta_bijgewerkt: '01/02/2018',
	// metadata attributen
	title: "BRT Topografie",
	visible: true,
	isBaseLayer: true,
	opacity: 0.9,
	source: new ol.source.TileWMS({
		url: "https://geodata.nationaalgeoregister.nl/wmsc?",
		params: {'layers': 'brtachtergrondkaartpastel'}
	})
});

//add BRK PDOk percelen
var brk_pdok = new ol.layer.Tile({
	id: "brkpdok",
	sld: "sldID_brk",
	sldDiv: "sld_div_brk",
	infoDiv: "info_div_brk_pdok",
	dataFilterId: "brkpdok_data_flt_kadaster",
	layerName: 'perceel',
	// metadata attributen
	meta_naam: "BRK (Basisregistratie Kadaster) - <a target='_blank' href='https://pdok.nl'>PDOK</a>",
	meta_soort: "Basisregistratie",
	meta_org: "<a href='https://data.overheid.nl/data/dataset/brt-achtergrondkaart' target='_blank'>Kadaster</a>",
	meta_bijgewerkt: getDate('full') +' (Dagelijks)',
	// metadata attributen
	title: "BRK Kadaster",
	visible: true,
	isBaseLayer: false,
	isPopup:true,
	opacity: 0.7,
	basisreg:true,
	source: new ol.source.TileWMS({
		url: " https://geodata.nationaalgeoregister.nl/kadastralekaartv3/wms?",
		params: {'layers': 'perceel'}
	})
});
//add PDOK BAG Panden
var bag_pdok = new ol.layer.Tile({
	id: "bagpdok",
	sldDiv: "sld_div_bag",
	infoDiv: "info_div_bag_pdok",
	sld: "pdok_sld_bag",
	lgnd: "pdok_lgn_bag",
	filterId: "pdook_flt_bag",
	dataFilterId: "pdok_data_flt_bag",
	layerName: 'bag:pand',
	// metadata attributen
	meta_naam: "BAG (Basisregistratie Adressen en Gebouwen) - <a target='_blank' href='https://pdok.nl'>PDOK</a>",
	meta_soort: "Basisregistratie",
	meta_org: "Lokaal per Gemeente en het <a href='https://www.geobasisregistraties.nl/basisregistraties/adressen-en-gebouwen' target='_blank'>Kadaster</a> voor landelijk",
	meta_bijgewerkt: getDate('full') +' (Dagelijks)',
	// metadata attributen
	title: "BAG Gebouwen",
	visible: true,
	isBaseLayer: false,
  isPopup:true,
	opacity: 0.7,
	basisreg:true,
	source: new ol.source.TileWMS({
		url: "https://geodata.nationaalgeoregister.nl/bag/wms",
		params: {
			layers: "pand,ligplaats",
			"SRS": "EPSG:28992"
		}
	})
});


//add PDOK Beschermde natuurmonumenten
var bnatmomu_pdok = new ol.layer.Tile({
	id: "bnatmomu_pdok",
	sldDiv: "sld_div_nat",
	infoDiv: "info_div_nat_pdok",
	sld: "pdok_sld_nat",
	lgnd: "pdok_lgn_mon",
	filterId: "pdook_flt_nat",
	dataFilterId: "pdok_data_flt_bnat",
	layerName: 'beschermdenatuurmonumenten',
	isPopup:true,
	isExternal:true,
	// metadata attributen
	meta_naam: "Beschermde natuurmonumenten  - <a target='_blank' href='https://pdok.nl'>PDOK</a>",
	meta_soort: "Thema kaart",
	meta_org: "<a href='https://www.geobasisregistraties.nl/basisregistraties/adressen-en-gebouwen' target='_blank'> natuurmonumenten </a> ",
	meta_bijgewerkt: getDate('full') +' (Dagelijks)',
	// metadata attributen
	title: "Natuur monumenten",
	visible: false,
	isBaseLayer: false,
	opacity: 0.7,
	basisreg:false,
	source: new ol.source.TileWMS({
		url: "https://geodata.nationaalgeoregister.nl/beschermdenatuurmonumenten/wms",
		params: {
			"layers": "beschermdenatuurmonumenten",
			"SRS": "EPSG:28992"
		},
		serverType: 'geoserver'
	})
});

//add PDOK NATURA 2000
var nat2k_pdok = new ol.layer.Tile({
	id: "nat2kpdok",
	sldDiv: "sld_div_nat",
	infoDiv: "info_div_nat_pdok",
	sld: "pdok_sld_nat",
	lgnd: "pdok_lgn_nat",
	filterId: "pdook_flt_nat",
	dataFilterId: "pdok_data_flt_nat",
	layerName: 'natura2000',
	isPopup:true,
	isExternal:true,
	// metadata attributen
	meta_naam: "Natura 2000  - <a target='_blank' href='https://pdok.nl'>PDOK</a>",
	meta_soort: "Thema kaart",
	meta_org: "<a href='https://www.pdok.nl/introductie/-/article/natura-2000' target='_blank'>beschermd natuurgebied 2000</a>",
	meta_bijgewerkt: getDate('full') +' (Dagelijks)',
	// metadata attributen
	title: "Natura 2000-gebieden",
	visible: false,
	isBaseLayer: false,
	opacity: 0.7,
	basisreg:false,
	source: new ol.source.TileWMS({
		url: "https://geodata.nationaalgeoregister.nl/natura2000/wms",
		params: {
			"layers": "natura2000",
			"SRS": "EPSG:28992"
		},
		serverType: 'geoserver'
	})
});


//add NGR Bomen 2017
var ngr_bomen = new ol.layer.Tile({
	id: "bomen",
	sldDiv: "sld_div_bom",
	infoDiv: "info_div_bom",
	sld: "ngr_sld_nat",
	lgnd: "ngr_lgn_nat",
	filterId: "ngr_flt_nat",
	dataFilterId: "ngr_data_flt_nat",
	layerName: 'rivm_084_20170314_gm_Bomenkaart',
	isPopup:true,
	isExternal:true,
	legend_url:'https://geodata.rivm.nl/geoserver/ows',
        // https://geodata.rivm.nl/geoserver/ows?service=WMS&request=GetLegendGraphic&format=image%2Fpng&width=20&height=20&layer=rivm_084_20170314_gm_Bomenkaart
	// metadata attributen
	meta_naam: "Bomen in Nederland  - <a target='_blank' href='https://nationaalgeoregister.nl'>NGR</a>",
	meta_soort: "Thema kaart",
	meta_org: "<a href='https://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/962ad4d1-f7c2-4efe-80bf-af56cbb675aa' target='_blank'>Bomen in Nederland, 2017</a>",
	meta_bijgewerkt: "14/03/2017",
	// metadata attributen
	title: "Bomen in Nederland",
	visible: false,
	isBaseLayer: false,
	opacity: 0.7,
	basisreg:false,
	source: new ol.source.TileWMS({
		url: "https://geodata.rivm.nl/geoserver/wms",
		params: {
			"layers": "rivm_084_20170314_gm_Bomenkaart",
			"SRS": "EPSG:28992"
		},
		serverType: 'geoserver'
	})
});


//add rvim_monumenten 2019
var rvim_monumenten = new ol.layer.Tile({
	id: "rvim_mon",
	sldDiv: "sld_div_rmon",
	infoDiv: "info_div_rmon",
	sld: "ngr_sld_rmon",
	lgnd: "ngr_lgn_rmon",
	filterId: "ngr_flt_rmon",
	dataFilterId: "ngr_data_flt_rmon",
	layerName: 'rce_rijksmonumenten_2019',
	isPopup:true,
	isExternal:true,
	legend_url:'https://geodata.rivm.nl/geoserver/ows',
	// metadata attributen
	meta_naam: "Rijksmonumenten  - <a target='_blank' href='https://nationaalgeoregister.nl'>NGR</a>",
	meta_soort: "Thema kaart",
	meta_org: "<a href='https://nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/6f84efeb-fc1d-4565-a721-80735ea57dbd' target='_blank'>Rijks monumenten - 2019</a>",
	//meta_bijgewerkt: getDate('full') +' (Dagelijks)',
	meta_bijgewerkt: "01/07/2019",
	// metadata attributen
	title: "RCE Rijksmonumenten",
	visible: false,
	isBaseLayer: false,
	opacity: 0.7,
	basisreg:false,
	source: new ol.source.TileWMS({
		url: "https://geodata.rivm.nl/geoserver/wms?",
		params: {
			"layers": "rce_rijksmonumenten_2019",
			"SRS": "EPSG:28992"
		},
		serverType: 'geoserver'
	})
});


///////////// NEW NL DATA

// // Lufo 2019 NL
var lufo2019NL = new ol.layer.Tile({
	id: "lufo2019NL",
	sld: "sliderlufo19NL",
	sldDiv: "sld_div_nl_lufo_19",
	infoDiv: "info_div_lufo_19",
	lgnd: "nl_lgn_lufo19",
	title: "Luchtfoto 2019 - NL",
	// metadata attributen
	meta_naam: "Luchtfoto 2019 25cm Netherlands",
	meta_soort: "Raster kaart",
	meta_org: "Geo Informatie <a href='https://www.pdok.nl/introductie/-/article/luchtfoto-pdok' target='_blank'>PDOK</a> ",
	meta_bijgewerkt:"2019",
	// metadata attributen
	isLufo: true,
	visible:false,
	isBaseLayer: false,
	opacity: 0.7,
	source: new ol.source.TileWMS({
		projection: 'EPSG:28992', //HERE IS THE DATA SOURCE PROJECTION
		url: 'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wms?',
		params: {'layers': 'Actueel_ortho25'},
		serverType: 'geoserver'
	})
});


var lufo2019NL_IR = new ol.layer.Tile({
	id: "lufo2019NL_IR",
	sld: "sliderlufo19_ir",
	sldDiv: "sld_div_nl_lufo_19_ir",
	infoDiv: "info_div_lufo_19_ir",
	lgnd: "nl_lgn_lufo19_ir",
	title: "Luchtfoto 2019 IR - NL",
	// metadata attributen
	meta_naam: "Luchtfoto 2019 Infrarood 25cm Netherlands",
	meta_soort: "Raster kaart",
	meta_org: "Geo Informatie <a href='https://www.pdok.nl/introductie/-/article/luchtfoto-pdok' target='_blank'>PDOK</a> ",
	meta_bijgewerkt:"2019",
	// metadata attributen
	isLufo: true,
	visible:false,
	isBaseLayer: false,
	opacity: 0.7,
	source: new ol.source.TileWMS({
		projection: 'EPSG:28992', //HERE IS THE DATA SOURCE PROJECTION
		url: 'https://geodata.nationaalgeoregister.nl/luchtfoto/infrarood/wms?',
		params: {'layers': 'Actueel_ortho25IR'},
		serverType: 'geoserver'
	})
});

var ahn3_dsm = new ol.layer.Tile({
	id: "ahn3_5m_dsm",
	sld: "sliderahn3_5m_dsm",
	sldDiv: "sld_div_ahn3_5m_dsm",
	infoDiv: "info_div_ahn3_5m_dsm",
	lgnd: "nl_lgn_ahn3_5m_dsm",
	title: "AHN3 05m DSM - NL",
	// metadata attributen
	meta_naam: "Actueel Hoogtebestand Nederland 3 50cm DSM",
	meta_soort: "Raster kaart",
	meta_org: "Geo Informatie <a href='https://www.pdok.nl/introductie/-/article/luchtfoto-pdok' target='_blank'>PDOK</a> ",
	meta_bijgewerkt:"2018",
	// metadata attributen
	isLufo: true,
	visible:false,
	isBaseLayer: false,
	opacity: 0.7,
	source: new ol.source.TileWMS({
		projection: 'EPSG:28992', //HERE IS THE DATA SOURCE PROJECTION
		url: 'https://geodata.nationaalgeoregister.nl/ahn3/wms?',
		params: {'layers': 'ahn3_05m_dsm', 'styles' : 'ahn3:ahn3_05m_detail' },
		serverType: 'geoserver'
	})
});

var ahn3_dtm = new ol.layer.Tile({
	id: "ahn3_5m_dtm",
	sld: "sliderahn3_5m_dtm",
	sldDiv: "sld_div_ahn3_5m_dtm",
	infoDiv: "info_div_ahn3_5m_dtm",
	lgnd: "nl_lgn_ahn3_5m_dtm",
	title: "AHN3 05m DTM  - NL",
	// metadata attributen
	meta_naam: "AHN3 Digital Terrain Model 05m ",
	meta_soort: "Raster kaart",
	meta_org: "Geo Informatie <a href='http://www.nationaalgeoregister.nl/geonetwork/srv/dut/catalog.search#/metadata/94e5b115-bece-4140-99ed-93b8f363948e' target='_blank'>PDOK</a> ",
	meta_bijgewerkt:"2018",
	// metadata attributen
	isLufo: true,
	visible:false,
	isBaseLayer: false,
	opacity: 0.7,
	source: new ol.source.TileWMS({
		projection: 'EPSG:28992', //HERE IS THE DATA SOURCE PROJECTION
		url: 'http://geodata.nationaalgeoregister.nl/ahn3/wms?',
		params: {
                          'layers': 'ahn3_05m_dtm',
                           'styles' : 'ahn3:ahn3_05m_detail'
                        },
		serverType: 'geoserver'
	})
});

// marker layers
vectorSource = new ol.source.Vector({});

vectorLayer = new ol.layer.Vector({
	title: "Marker Layer",
	source: vectorSource
});

// layer list
var layerList = [
	brt_pdok,
	osm,
	bag_pdok,
	brk_pdok,
	lufo2019NL,
  ahn3_dsm,
  ahn3_dtm,
	lufo2019NL_IR,
	//nat2k_pdok,
	bnatmomu_pdok,
  ngr_bomen,
  rvim_monumenten,
	vectorLayer
];
