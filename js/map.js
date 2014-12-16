// Enable the visual refresh
google.maps.visualRefresh = true;

var geocoder;
var infowindow = new google.maps.InfoWindow();
var map;
var markersArray = [];
var components = []


function initialiseMaps() {
    var mapOptions = {
        zoom: 1,
        center: new google.maps.LatLng(0, 131.044922),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // doGeolocation();

    google.maps.event.addListener(map, 'click', function(e) {
        placeMarker(e.latLng, map);
    });

}

function showCities(components) {
    var listBuilder = '', counter = 0;
    components.forEach(function(component) {
        $('#city-contents').append('<tr><td>Address</td><td><div id="city-' + counter + '">' + component + '</div></td></tr>')
        $('#city-' + counter).click(function(e) {
            var city = e.target.innerText;
            console.log(city)
            getCityData(city, function(err) {
                if (!err) {
                    infowindow.setContent(city);
                    infowindow.open(map, marker);
                    map.setCenter(pos);
                    map.panTo(position);
                }
                else {
                    alert(err);
                    noResults();
                }
            });
        })
        counter ++;
    });
}


function placeMarker(position, map) {
    $('#city-contents').html('<tr><td>Results</td><td>Loading...</td></tr>');
    $("#map-info").html("Loading...");

    var lat = position.lat();
    var lng = position.lng();
    var pos = new google.maps.LatLng(lat, lng);

    var latlng = new google.maps.LatLng(lat, lng);
    clearOverlays();
    geocoder.geocode({'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            console.log(results)
            if (results[2]) {
                // if (results[2].address_components[1]) {
                    var marker = new google.maps.Marker({
                        position: latlng,
                        map: map
                    });
                    markersArray.push(marker);
                    var components = _.chain(results).map(function(comp) { 
                        var pos = comp.address_components.length - 3;
                        if (pos < 0) 
                            return null;
                        return comp.address_components[pos].long_name; 
                    } ).compact().uniq().value();

                    //[ results[0].address_components[1].long_name, results[1].address_components[2].long_name, results[2].address_components[3].long_name ];
                    showCities(components)
                    /*
                    var localResults = _.map(results[2].address_components, function(component) { return component.long_name });
                    if (localResults.length >= 4) {
                        var city = localResults[localResults.length - 3];
                        getCityData(city, function(err) {
                            if (!err) {
                                infowindow.setContent(city);
                                infowindow.open(map, marker);
                                map.setCenter(pos);
                                map.panTo(position);
                            }
                            else {
                                alert(err);
                                noResults();
                            }
                        });
                    }
                    else {
                        console.log('No results found');
                        noResults();
                    }
                    */
                // }
            } else {
                console.log('No results found');
                noResults();
            }
        } else {
            console.log('Geocoder failed due to: ' + status);
            noResults();
        }
    });
}

function noResults() {
    $('#city-contents').html('<tr><td>Results</td><td>None</td></tr>');
    $("#map-info").html("No results");
}

var clearOverlays = function() {
    for (i in markersArray) {
        markersArray[i].setMap(null);
    }
    markersArray = [];
}



var getCityData = function(city, func) {
    $.get(sparqlQuery(city), function(result) { 
        processResults(result, func); 
    }).fail(function() {
        noResults();
    });
}

var sparqlQuery = function(city) {
    var query = "http://dbpedia.org/sparql?query=PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns/>PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema/>SELECT * WHERE { <http://dbpedia.org/resource/%city%> ?p ?o . }&format=json"
    query = query.replace("%city%", encodeURIComponent(encodeURIComponent(city)));
    // Needs to be doubly encoded
    return query;
}

var processResults = function(result, func) {
    var ignorePredicates = [
        "http://www.w3.org/2000/01/rdf-schema#label",
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
        "http://www.w3.org/2002/07/owl#sameAs",
        "http://purl.org/dc/terms/subject"
    ];
    var preferredLanguage = "en";
    var list = result.results.bindings;
    console.log(list);
    if (list && !_.isUndefined(list) && list.length > 0) {
        // Empty info
        $('#city-contents').empty();
        $("#map-info").empty();

        var data = {};
        _.forEach(list, function(predicate) {
            var o = predicate.o, p = predicate.p;
            var display = true;
            if (_.indexOf(ignorePredicates, p.value) > -1)
                display = false;
            if (o['xml:lang'] && o['xml:lang'] != preferredLanguage)
                display = false;
            if (display) {
                // Determine key & value
                var key = stripUrl(p.value);
                var value = o.value;
                if (o.value.indexOf('http') == 0)
                    value = '<a href="' + value + '" target="_blank">' + value + '</a>';

                // Show
                displayLine(key, value);
                data[key] = value;
            }
        });
        console.log("DATA");
        console.log(data);
        displayInfo(data);
    }
    else {
        noResults();
    }
}

var stripUrl = function(url) {
    var hash = url.lastIndexOf('#');
    var slash = url.lastIndexOf('/');
    var pos = (hash > slash ? hash : slash);
    if (pos > -1) {
        url = url.substring(pos + 1);
    }
    return url;
};

var displayLine = function(key, value) {
    $('#city-contents').append('<tr><td>' + key + '</td><td>'+ value + '</td></tr>');
};


var displayInfo = function(data) {
    var name = data["name"];
    if(name !== undefined) {
        addInfo("<h1>"+name+"</h1>");
    }

    var homepage = data["homepage"];
    if(homepage !== undefined) {
        addInfo("Website: " + homepage);
    }

    var nickname = data["nickname"];
    if(nickname !== undefined) {
        addInfo("<h4>\""+nickname+"\"</h4>");
    }

    var motto = data["motto"];
    if(motto !== undefined) {
        addInfo("<q>"+motto+"</q>");
    }

    var point = data["point"];
    if(point !== undefined) {
        addInfo("Lat/Long: " + point);
    }
    
    var population = data["populationTotal"];
    if(population !== undefined) {
        addInfo("Population: " + population);
    }

    var abstract = data["abstract"];
    if(abstract !== undefined) {
        addInfo("<span style='margin-top: 20px'>"+abstract+"</span>");
    }
    
}
    

var addInfo = function(text) {
    $("#map-info").append("<div class='block'>"+text+"</div>");
}

google.maps.event.addDomListener(window, 'load', initialiseMaps);

