$(document).ready(function() {

    $('.view').click(function(){
        var clickedID = this.id;
        var showID = 'lineItems'+ clickedID;
        $('#'+showID).toggle('fast');
    });

});