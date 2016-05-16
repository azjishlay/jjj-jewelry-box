// Helper functions to initialize Materialize CSS

$(document).ready(function() {

    // Changes the collapsible behavior to expandable instead of the default accordion style
    $('.collapsible').collapsible({
        accordion : false
    });

    // Initialize dropdown select
    $('select').material_select();

    // Initialize char counter
    $('textarea#product_description,textarea#product_materials').characterCounter();

});