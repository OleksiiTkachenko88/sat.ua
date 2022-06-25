BX.namespace("SAT.Indicators");
BX.SAT.Indicators.Chart = (function () {
    let ChartObj = function (count, chartItem, chartValItem, curNumber) {
    let canvas = this.getCanvas(chartItem.ID + '_' + curNumber);
		if(canvas!== null){
			canvas.setAttribute("height", document.getElementById('charts-list').offsetHeight / count);
		}
        let options = this.getLabelsAndColours(chartItem, chartValItem);
        let chartVisual = this.makeChart(canvas, options);
    }
    ChartObj.prototype.getCanvas = function (sectionId) {
        return BX(sectionId);
    };
    ChartObj.prototype.getLabelsAndColours = function (chartItem, chartValItem) {
        let chartData = {
            name: chartItem.NAME,
            x: [],
            y: [],
            lineColour: ['#FFCF37'],
            backgroundColor: ['rgba(75, 139, 249, 0.2)'],
            pointBorderColor: [],
            minValue: parseFloat(chartItem.UF_CHART_MIN_VAL),
            maxValue: parseFloat(chartItem.UF_CHART_MAX_VAL),
        };
		if(chartValItem !== "") {
        chartValItem.forEach(function (element) {
            chartData.y.unshift(parseFloat(element.PROPERTY_INDICATOR_VAL_VALUE));
            chartData.x.unshift(element.X_LABEL);
            chartData.pointBorderColor.unshift('#4B8BF9');
        });
		};
        return chartData;

    };

    ChartObj.prototype.makeChart = function (canvas, options) {

        new Chart(canvas, {
            type: 'line',
            data: {
                labels: options.x,
                datasets: [{
                    label: options.name,
                    data: options.y,
                    backgroundColor: options.backgroundColor,
                    borderColor: [
                        options.lineColour,
                    ],

                    pointBorderColor: options.pointBorderColor,
                    borderWidth: 2,
                }]
            },
            options: {

                events: false,
                tooltips: {
                    enabled: false
                },
                legend: {
                    display: false,
                    labels:{
                        fontColor: 'black'
                    }
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                        }
                    }],
                    yAxes: [{
                        display: false,
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            min: options.minValue,
                            max: options.maxValue
                        }
                    }],
                },
                animation:{

                    onComplete: function (x) {
                        var chartInstance = this.chart,
                        ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize-2, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.fillStyle = '#58595b';
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                }
            },
        });
    };
    return ChartObj;
})
();
