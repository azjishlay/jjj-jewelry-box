// Helper functions to initialize Materialize CSS

$(document).ready(function() {

    // Changes the collapsible behavior to expandable instead of the default accordion style
    $('.collapsible').collapsible({
        accordion : false

    });

    // Turn on select
    $('select').material_select();

});