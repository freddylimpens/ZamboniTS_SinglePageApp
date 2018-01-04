$(function () {

    $('.step_marker').click(function () {
        // collect step id from clicked element
        // change location hash using step id
        window.location.hash = '#step/' + stepid
    });

    // NB: Here it's a bit tricky as the google map has to be created before we inject the steps markers in it, so maybe the nesting of callbacks is different from the following
    initMap();
    $.getJSON("path/to/list/of/step/objects", function( data ) {
        // Get data about our products from the listing of all steps
        // Call a function that will turn that data into HTML.
        generateStepsMarkers(data);
        injectStepMarkersInMap(); //TBD
        renderMapPage();
    });

    function generateStepsMarkers(data){
        // Uses Handlebars to create all steps markers using the provided data.
        // This function is called only once on page load.
    }

    $(window).on('hashchange', function(){
        // On every hash change the render function is called with the new hash.
        // This is how the navigation of our app happens.
        render(decodeURI(window.location.hash));
    });

    function render(url) {
        // This function decides what type of page to show 
        // depending on the current url hash value.
        // Get the keyword from the url.
        var temp = url.split('/')[0];
        // Hide whatever page is currently shown.
        $('.main-content .page').removeClass('visible');
        var routes = {
            // The Homepage.
            '': function() {
                renderMapPage();
            },

            // Step panorama page.
            '#step': function() {
                // Get the index of which step we want to show and call the appropriate function.
                var stepid = url.split('#step/')[1].trim();
                renderStepPanoramaPage(stepid);
            }
        };
        // Execute the needed function depending on the url keyword (stored in temp).
        if(map[temp]){
            map[temp]();
        }
        // If the keyword isn't listed in the above - render the error page.
        else {
            renderErrorPage();
        }    
    }
    
    function renderMapPage() {
        // shows the main map page 
        // OPTIONAL : take list of visited steps in input and alter the corresponding marker (color, shape, etc.)
    }
    
    function renderStepPanoramaPage(stepid){
        // Shows the step panorama Page with appropriate id.
        // grab data from backend
    }

    function renderErrorPage(){
        // Shows the error page.
    }
});