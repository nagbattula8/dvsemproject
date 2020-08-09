/*!
 * Start Bootstrap - SB Admin 2 v4.0.7 (https://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2019 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin-2/blob/master/LICENSE)
 */

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

counties_dict = {'apache': {'Sidalcea neomexicana': 12, 'Opuntia polyacantha var.': 8, 'Erigeron formosissimus': 7, 'Parryella filifolia': 6, 'Mertensia franciscana': 6},
 'cochise': {'Agave palmeri': 51, 'Heliopsis parvifolia': 18, 'Eriogonum abertianum': 16, 'Agave parryi var. huachucensis': 15, 'Monarda citriodora subsp. austromontana': 14},
 'coconino': {'Opuntia phaeacantha': 122, 'Yucca elata': 91, 'Nolina microcarpa': 79, 'Yucca utahensis': 79, 'Opuntia basilaris var.': 79},
 'gila': {'Agave chrysantha': 154, 'Agave delamateri': 109, 'Agave palmeri': 58, 'Yucca baccata': 27, 'Agave': 21},
 'graham': {'Agave palmeri': 33, 'Grusonia emoryi': 8, 'Opuntia macrocentra': 7, 'Ferocactus wislizeni': 6, 'Penstemon superbus': 5},
 'greenlee': {'Agave palmeri': 24, 'Penstemon superbus': 4, 'Opuntia engelmannii var. engelmannii': 4, 'Layia glandulosa': 4, 'Allium bigelovii': 3},
 'la paz': {'Cylindropuntia echinocarpa': 18, 'Hesperocallis undulata': 12, 'Cryptantha': 12, 'Malacothrix glabrata': 12, 'Cirsium': 12},
 'maricopa': {'Ferocactus cylindraceus': 83, 'Cylindropuntia acanthocarpa': 80, 'Cryptantha barbigera': 56, 'Larrea tridentata': 53, 'Phacelia distans': 53},
 'mohave': {'Yucca jaegeriana': 42, 'Ferocactus cylindraceus': 33, 'Opuntia basilaris var. basilaris': 28, 'Agave mckelveyana': 26, 'Salazaria mexicana': 26},
 'navajo': {'Yucca utahensis': 6, 'Lemna minor': 4, 'Cirsium arizonicum var.': 4, 'Eriogonum racemosum': 4, 'Opuntia polyacantha var. ': 4},
 'pima': {'Agave palmeri': 53, 'Agave x ajoensis': 35, 'Cylindropuntia versicolor': 28, 'Ferocactus wislizeni': 23, 'Agave chrysantha': 21},
 'pinal': {'Ferocactus wislizeni': 41, 'Cylindropuntia x kelvinensis': 29, 'Cryptantha barbigera': 27, 'Cylindropuntia acanthocarpa': 26, 'Plagiobothrys arizonicus': 24},
 'santa cruz': {'Agave palmeri': 33, 'Manihot angustiloba': 16, 'Amoreuxia palmatifida': 15, 'Evolvulus arizonicus': 15, 'Gomphrena sonorae': 14},
 'yavapai': {'Agave chrysantha': 231, 'Agave verdensis': 162, 'Agave phillipsiana': 93, 'Agave yavapaiensis': 88, 'Agave delamateri': 73},
 'yuma': {'Rhus kearneyi': 22, 'Cylindropuntia echinocarpa': 17, 'Geraea canescens': 13, 'Cylindropuntia acanthocarpa': 13, 'Hesperocallis undulata': 12}
};



counties_len = [13958,
 9576,
 6286,
 4343,
 3891,
 3593,
 2952,
 2564,
 1980,
 1006,
 986,
 963,
 612,
 470,
 334];

 counties_list = ['coconino',
 'maricopa',
 'yavapai',
 'mohave',
 'gila',
 'pima',
 'pinal',
 'cochise',
 'santa cruz',
 'apache',
 'yuma',
 'la paz',
 'graham',
 'navajo',
 'greenlee'];

  counties_list2 = ['coconino2',
 'maricopa2',
 'yavapai',
 'mohave',
 'gila',
 'pima',
 'pinal',
 'cochise',
 'santa cruz',
 'apache',
 'yuma',
 'la paz',
 'graham',
 'navajo',
 'greenlee'];

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var ctx2 = document.getElementById("myBarChart2");

var tablediv = document.getElementById("tablediv"); 

var tableheading = document.getElementById("tabletext");

var responsiveDiv = document.getElementById("responsiveDiv");

var tableMain = document.getElementById("tableMain");

var tbodyItem = document.getElementById("tbody");



var myBarChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: counties_list,
    datasets: [{
      label: "Revenue",
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: counties_len,
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'month'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 20
        },
        maxBarThickness: 25,
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 16000,
          maxTicksLimit: 10,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return  number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';

          var county_json = counties_dict[tooltipItem.xLabel];

          //console.log(county_json);

          var keys_county = Object.keys(county_json);

          var values_county = [];

          for ( var i = 0; i < keys_county.length; i++ ) {
            //console.log( keys_county[i]);
            values_county.push(county_json[keys_county[i]]);
            //console.log(county_json[keys_county[i]]);
          }

          var max_of_array = Math.max.apply(Math, values_county);

          max_of_array = Math.floor(max_of_array/10);

          max_of_array = max_of_array * 20; 

          console.log(max_of_array);

          console.log(tooltipItem.xLabel);

          tablediv.setAttribute("style","display: block;");

          document.getElementById("tabletext").innerHTML = "Top 5 plants in " + tooltipItem.xLabel;

          tbodyItem.innerHTML = "";

          for ( var x1 = 0; x1 < keys_county.length; x1++ ) {


          var trelement = document.createElement("tr");

          var tdelement = document.createElement("td");

          var textNode = document.createTextNode(keys_county[x1]);

          tdelement.appendChild(textNode);

          trelement.appendChild(tdelement);

          var textNode2 = document.createTextNode(values_county[x1]);

          var tdelement2 = document.createElement("td");

          tdelement2.appendChild(textNode2);

          trelement.appendChild(tdelement2);

          tbodyItem.appendChild(trelement);

          // var tableMain = document.createElement("table");

          // tableMain.setAttribute("class", "table table-bordered" );

          // tableMain.setAttribute("width", "100%" );

          // tableMain.setAttribute("cellspacing", "0")

          // tableMain.appendChild(tbodyItem);

          // responsiveDiv.appendChild(tableMain);

          }

          //tableMain.appendChild(tbodyItem);






          return "No of plants discovered" + ': ' + number_format(tooltipItem.yLabel);
        }
      }
    },
  }
});




