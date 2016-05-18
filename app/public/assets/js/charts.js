var Sequelize = require("sequelize");
var sequelize = require("../../config/connection.js");
google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(drawChart);

console.log("CHARTSSS")

invoices.findAll({ where: {employee_id: id}}).then(function(result){

function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Products', 'Sales'],
        ['Assamese', result[0].subtotal], ['Bengali', result[0].subtotal], ['Bodo', result[0].subtotal],
        ['Dogri', result[0].subtotal]
    ]);

    var options = {
        title: 'Sales Performance',
        legend: 'none',
        pieSliceText: 'label',
        slices: {  4: {offset: 0.2},
            12: {offset: 0.3},
            14: {offset: 0.4},
            15: {offset: 0.5},
        },
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

});