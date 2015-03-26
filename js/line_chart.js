
  <script type="text/javascript">
  
  
    google.load('visualization', '1.1', {packages: ['line']});
    google.setOnLoadCallback(drawChart);

    function drawChart() {

      var data = new google.visualization.DataTable();
      data.addColumn('number', 'Day');
      data.addColumn('number', 'Guardians of the Galaxy');
 //     data.addColumn('number', 'The Avengers');
 //     data.addColumn('number', 'Transformers: Age of Extinction');

      data.addRows([
        [1,  37.8 ],
        [2,  30.9 ],
        [3,  25.4 ],
        [4,  11.7 ],
        [5,  11.9 ],
        [6,   8.8 ],
        [7,   7.6 ],
        [8,  12.3 ],
        [9,  16.9 ],
        [10, 12.8 ],

      ]);

      var options = {
        chart: {
          title: 'Box Office Earnings in First Two Weeks of Opening',
          subtitle: 'in millions of dollars (USD)'
        },
        width: 900,
        height: 500
      };

      var chart = new google.charts.Line(document.getElementById('linechart_material'));

      chart.draw(data, options);
    }
  </script>