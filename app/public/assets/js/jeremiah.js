$(document).ready(function() {

    $('.view').click(function(){
        var clickedID = this.id;
        var showID = 'lineItems'+ clickedID;
        $('#'+showID).toggle('fast');
    });

    $('.viewCustDetails').click(function(){
        var clickedID = this.id;
        var showID = 'custDetails'+ clickedID;
        $('#'+showID).toggle('fast');
    });

    $('.viewProdDetails').click(function(){
        var clickedID = this.id;
        var showID = 'prodDetails'+ clickedID;
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
                prodID = data[0].id;
                var prodName = data[0].name;
                var prodPrice = data[0].price;
                prodPrice = prodPrice.toFixed(2);
                var html =  '<div class="row" id="'+prodID+'">'+
                                '<div class="input-field col s4">'+
                                    '<input disabled name="name" value="'+prodName+'" id="productName" type="text" class="validate">'+
                                '</div>'+
                                '<div class="input-field col s2">'+
                                    '<input disabled name="price" value="'+prodPrice+'" id="productPrice" type="text" class="validate">'+
                                '</div>'+
                                '<div class="input-field col s1">'+
                                    '<input name="qty" value="1" id="productQty" type="text" class="validate" onblur="lineItemChange()" >'+
                                '</div>'+
                                '<div class="input-field col s2">'+
                                    '<input name="discount" value="0" id="productDisc" type="text" class="validate" onblur="lineItemChange()">'+
                                '</div>'+
                                '<div class="input-field col s2">'+
                                    '<input disabled name="total" value="'+prodPrice+'" id="productTotal" type="text" class="validate">'+
                                '</div>'+
                                '<div class="col s1">'+
                                    '<i class="material-icons removeItem">highlight_off</i>'+
                                '</div>'+
                            '</div>';
                $('#lineItemsList').append(html);
                var html2 = '<input disabled name="subtotal" value="$0.00" id="subtotal" type="text" class="validate">';
                var html3 = '<input disabled name="tax" value="$0.00" id="tax" type="text" class="validate">'
                var html4 = '<input disabled name="totalPrice" value="$0.00" id="totalPrice" type="text" class="validate">'
                $('#bottomSubtotalHeader').prepend(html2);
                $('#bottomTaxHeader').prepend(html3);
                $('#bottomTotalHeader').prepend(html4);
                $('#subtotal').val(prodPrice);
                var taxes = prodPrice * 0.07;
                taxes = taxes.toFixed(2);
                $('#tax').val(taxes);
                var total = prodPrice * 1.07;
                total = total.toFixed(2);
                $('#totalPrice').val(total);
                $('#productAdd').hide();
                $('#productSearch').hide();
                $('#product_sku_div').hide();
                
            });

    });

    $('#invoiceReset').click(function(){
        location.reload();
    });

    $('#invoiceSubmit').click(function(){
        var currentURL = window.location.origin;
        var userID = $('#userHeader').attr('data-userID');
        var newInvoice =
        {
            'userID': userID,
            'clientID': $("#client").val(),
            'productID': currentSearch,
            'productPrice': $("#productPrice").val(),
            'productQty': $("#productQty").val(),
            'productDisc': $("#productDisc").val(),
            'invoiceSub':$('#subtotal').val(),
            'invoiceTax':$('#tax').val(),
            'invoiceTot':$('#totalPrice').val()
        };
        console.log(newInvoice);
        $.post( currentURL + "/api/new/invoice", newInvoice)
            .done(function(data){
                console.log(data);
            });
        //window.location.href = '/invoices';
        return false;
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
            }
        });
    
    $.get(currentUrl + "/api/categories")
        .done(function(data){
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].name+' - '+data[i].id);
                var category = data[i].name;
                var categoryID = data[i].id;
                var option = '<option value="'+categoryID+'">'+category+'</option>';
                $("#product_category_id").append(option);
            }
        });

    $.get(currentUrl + "/api/products")
        .done(function(data){
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].name+' - '+data[i].id);
                var productName = data[i].name;
                var productID = data[i].id;
                var option = '<option value="'+productID+'">'+productName+'</option>';
                $("#product_category_id").append(option);
            }
        });
    
});