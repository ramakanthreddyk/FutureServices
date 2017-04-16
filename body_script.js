$(document).ready(function () {
    $("#header").load("header.html"); 
    $("#footer").load("footer.html");

    function timeLeft() {
        $.ajax({
            type: "POST",
            url: "https://www.futures-services.com/job_posting/time.php",
            data: { username: 'ramakanth', password: 'kowdampalli' },
            dataType : "json",
            success: function(data12) {
            $(".countdown_time").html(data12);
        }
    });
    };
    timeLeft();
    setInterval(timeLeft, 500);

    function getTable() {
        $.ajax({
            type: "POST",
            url: "https://www.futures-services.com/job_posting/newfsphp3.php",
            dataType : "json",
            Authorization: "Basic",     
           data: { username: 'ramakanth', password: 'kowdampalli' },
            success: function (data) {
            var tableappend = "";
            for (var k = 0; k<data.length; k++) {
                var time = (data[k].time);
                var nord = parseFloat(data[k].nord);
                var nordost = parseFloat(data[k].n_ost);
                var ost = parseFloat(data[k].ost);
                var ost2 = parseFloat(data[k].ost_2);
                var sost = parseFloat(data[k].s_ost);
                var mitte = parseFloat(data[k].mitte);
                var west = parseFloat(data[k].west);
                var rheinmain = parseFloat(data[k].r_main);
                var swest = parseFloat(data[k].s_west);
                var sud = parseFloat(data[k].sued);
                tableappend +="<tr><td>"+time+"</td><td>"+nord+"</td><td>"+nordost+"</td><td>"+ost+"</td><td>"+ost2+"</td><td>"+sost+"</td><td>"+mitte+"</td><td>"+west+"</td><td>"+rheinmain+"</td><td>"+swest+"</td><td>"+sud+"</td></tr>";
            }
            $('#itemList').append(tableappend);

            
        }
    });
    }

    getTable();
    setInterval(getTable, 300000);

    function getGraph() {
        $.ajax({
            type: "POST",
            url: "https://www.futures-services.com/job_posting/newfsphp5_60.php",
            data: { username: 'ramakanth', password: 'kowdampalli' },
            dataType : "json",
            Authorization: "Basic",      
            success:function(data) {
            var yaxis = [];
            var xaxis = [];
            for (var i = 0; i < data.length; i++) {
                yaxis.push(parseFloat(data[i].measured_value));
                var time12 = (data[i].time);
                xaxis.push(time12);
            }
            var graphdata = {
                x: xaxis,
                y: yaxis,
                type: 'scatter',
                mode:'lines'
            };
            var tickformat = {xaxis: {tickformat:"%H:%M"}}
            var graphid = document.getElementById("graph_fs");
            Plotly.newPlot(graphid, [graphdata],tickformat); 


        }

    });
    }
    getGraph();
    setInterval(getGraph,60000);

});


