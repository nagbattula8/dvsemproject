function form() {
    let form = document.getElementById('form')
    form.innerHTML += "<option style='text-align:center' disabled selected value> -- select an option -- </option>"
    for (let i = 2009; i < 2019; i++) {
        console.log(form.innerHTML)
        form.innerHTML += "<option style='text-align:center' value="+i.toString()+">"+i.toString()+"</option>"
    }
}
//recorder => count =>
var chart; 
function displayChart(value) {      
    fetch('./researchCountPerYear.json').then(response => {
        return response.json();
      }).then(allData => {  
        am4core.ready(function() {
            try {
                chart.dispose();
            } finally {
                // chart code
                am4core.useTheme(am4themes_animated);

                //chart.responsive.enabled = true;
                
                chart = am4core.create("chartdiv", am4charts.XYChart);

                chart.svgContainer.htmlElement.style.height = 300 + "px";
                chart.svgContainer.htmlElement.style.width = 600 + "px";
                chart.svgContainer.htmlElement.style.margin = 30 + "px";

                //chart.svgContainer.htmlElement.style.paddingLeft = 40 + "px";

                chart.hiddenState.properties.opacity = 0; // this creates initial fade-in


                
                chart.paddingRight = 40;
                for (let i = 0; i < allData[value].length; i++)
                    //allData[value][i].href="sphere.png"
                chart.data = allData[value];

                console.log(chart.data);
                
                var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
                categoryAxis.dataFields.category = "recorder";
                categoryAxis.renderer.grid.template.strokeOpacity = 0;
                categoryAxis.renderer.minGridDistance = 10;
                categoryAxis.renderer.labels.template.dx = -20;
                categoryAxis.renderer.minWidth = 120;
                categoryAxis.renderer.tooltip.dx = -40;
                
                var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
                valueAxis.renderer.inside = true;
                valueAxis.renderer.labels.template.fillOpacity = 0.3;
                //valueAxis.renderer.labels.template.fontSize = 100;
                valueAxis.renderer.grid.template.strokeOpacity = 0;
                valueAxis.min = 0;
                valueAxis.cursorTooltipEnabled = false;
                valueAxis.renderer.baseGrid.strokeOpacity = 0;
                valueAxis.renderer.labels.template.dy = 25;
                
                var series = chart.series.push(new am4charts.ColumnSeries);
                series.dataFields.valueX = "count";
                series.dataFields.categoryY = "recorder";
                console.log(series.dataFields.categoryY);
                series.tooltipText = "{valueX.value}";
                series.tooltip.pointerOrientation = "vertical";
                series.tooltip.dy = - 30;
                series.columnsContainer.zIndex = 100;
                
                var columnTemplate = series.columns.template;
                columnTemplate.height = am4core.percent(50);
                columnTemplate.maxHeight = 50;
                columnTemplate.column.cornerRadius(60, 10, 60, 10);
                columnTemplate.strokeOpacity = 0;
                
                series.heatRules.push({ target: columnTemplate, property: "fill", dataField: "valueX", min: am4core.color("#e5dc36"), max: am4core.color("#5faa46") });
                series.mainContainer.mask = undefined;
                
                var cursor = new am4charts.XYCursor();
                chart.cursor = cursor;
                cursor.lineX.disabled = true;
                cursor.lineY.disabled = true;
                cursor.behavior = "none";
                
                var bullet = columnTemplate.createChild(am4charts.CircleBullet);
                bullet.circle.radius = 30;
                bullet.valign = "middle";
                bullet.align = "left";
                bullet.isMeasured = true;
                bullet.interactionsEnabled = false;
                bullet.horizontalCenter = "right";
                bullet.interactionsEnabled = false;
                
                var hoverState = bullet.states.create("hover");
                var outlineCircle = bullet.createChild(am4core.Circle);

                
                var image = bullet.createChild(am4core.Image);
                image.width = 60;
                image.height = 60;
                image.horizontalCenter = "middle";
                image.verticalCenter = "middle";
                image.propertyFields.href = "href";
                
                image.adapter.add("mask", function (mask, target) {
                    var circleBullet = target.parent;
                    return circleBullet.circle;
                })
                
                var previousBullet;
                chart.cursor.events.on("cursorpositionchanged", function (event) {
                    var dataItem = series.tooltipDataItem;
                
                    if (dataItem.column) {
                        var bullet = dataItem.column.children.getIndex(1);
                
                        if (previousBullet && previousBullet != bullet) {
                            previousBullet.isHover = false;
                        }
                
                        if (previousBullet != bullet) {
                
                            var hs = bullet.states.getKey("hover");
                            hs.properties.dx = dataItem.column.pixelWidth;
                            bullet.isHover = true;
                
                            previousBullet = bullet;
                        }
                    }
                })
              }
            });
        })
}



