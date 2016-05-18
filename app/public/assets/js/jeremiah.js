$(document).ready(function() {

    $('.view').click(function(){
        var clickedID = this.id;
        var showID = 'lineItems'+ clickedID;
        $('#'+showID).toggle('fast');
    });
    
    // get current URL
    var currentUrl = window.location.origin;
    var currentSearch = '';

    // Upon submit
    $('#productSearch').click(function(){
        // grab the fields
        var skuSearch = $( "#product_sku" ).val().trim();
        $.get(currentUrl + "/api/skuSearch/"+skuSearch)
            .done(function(data){
                console.log(data);
                if(data[1]){
                    $("#product_sku").val('More than one match. Be more specific.');
                } else {
                    if(data[0]){
                        $("#product_sku").val(data[0].name+' - $'+data[0].price);
                        $("#product_sku").attr('data-productID', data[0].id);
                        currentSearch = data[0].id;
                    } else {
                        $("#product_sku").val('No matches, try again.');
                    }
                }
            });
    });

    $('#productAdd').click(function(){
        // grab the product ID from the data attribute
        $.get(currentUrl + "/api/products/"+currentSearch)
            .done(function(data){
                //console.log(data);
                prodID = data[0].id;
                var prodName = data[0].name;
                var prodPrice = data[0].price;
                console.log(prodID+' - '+prodName+' - '+prodPrice);
                var html =  '<div class="row" id="'+prodID+'">'+
                                '<div class="input-field col s4">'+
                                    '<input disabled name="name" value="'+prodName+'" class="productName" type="text" class="validate">'+
                                '</div>'+
                                '<div class="input-field col s2">'+
                                    '<input disabled name="price" value="'+prodPrice+'" class="productPrice" type="text" class="validate">'+
                                '</div>'+
                                '<div class="input-field col s1">'+
                                    '<input name="qty" value="1" class="productQty" type="text" class="validate">'+
                                '</div>'+
                                '<div class="input-field col s2">'+
                                    '<input name="discount" value="$0.00" class="productDisc" type="text" class="validate">'+
                                '</div>'+
                                '<div class="input-field col s2">'+
                                    '<input disabled name="total" value="'+prodPrice+'" class="productTotal" type="text" class="validate">'+
                                '</div>'+
                                '<div class="col s1">'+
                                    '<i class="material-icons removeItem">highlight_off</i>'+
                                '</div>'+
                            '</div>';
                $('#lineItemsList').append(html);
                var html2 = '<div class="input-field col s2">'+
                                    '<input disabled name="subtotal" value="$0.00" id="subtotal" type="text" class="validate">'+
                                    '<label for="subtotal">Subtotal</label>'+
                                '</div>'+
                                '<div class="input-field col s2">'+
                                    '<input disabled name="tax" value="$0.00" id="tax" type="text" class="validate">'+
                                    '<label for="tax">Tax</label>'+
                                '</div>'+
                                '<div class="input-field col s2">'+
                                    '<input disabled name="totalPrice" value="$0.00" id="totalPrice" type="text" class="validate">'+
                                    '<label for="totalPrice">Total Price</label>'+
                            '</div>';
            });

    });

    // get request to pull 
    $.get(currentUrl + "/api/users")
        .done(function(data){
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i].name);
                var userName = data[i].name;
                var userID = data[i].id
                var option = '<option value="'+userID+'">'+userName+'</option>';
                $('#employee').append(option);
            };
        });

    $.get(currentUrl + "/api/clients")
        .done(function(data){
            for (var i = 0; i < data.length; i++) {
                //console.log(data[i].first_name);
                var clientFirstName = data[i].first_name;
                var clientLastName = data[i].last_name;
                var clientID = data[i].id;
                var option = '<option value="'+clientID+'">'+clientFirstName+' '+clientLastName+'</option>';
                $('#client').append(option);
            };
        });

});