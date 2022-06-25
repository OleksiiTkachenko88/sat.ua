<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/** @var CBitrixComponentTemplate $this */
?>
<div class="item chart full-chart b-shadow b-radius">
    <? if ($arResult["CHART"]): ?>
        <div class="header">
            <? if (strlen($arResult["CHART"]["PICTURE"])): ?>
                <div class="image-wrap ">
                    <img class="lazyload" data-src="<?= $arResult["CHART"]["PICTURE"] ?>"
                         alt="<?= $arResult["CHART"]["NAME"] ?>">
                </div>
            <? endif; ?>
            <div class="text-wrap">
                <h2><?= $arResult["CHART"]["NAME"] ?></h2>
                <h3><?= $arResult["CHART"]["PERIOD"] ?></h3>
            </div>
        </div>
        <div class="description">
            <span><?= $arResult["CHART"]["DESCRIPTION"] ?></span>

        </div>
        <div class="chart-wrap">
            <canvas id="<?= $arResult["CHART"]["CANVAS"] ?>" class="chart-div"></canvas>
        </div>
    <? endif; ?>
</div>

<script>
    BX.ready(function () {
        BX.message({
            arParams: <?=CUtil::PhpToJSObject($arResult["CHART"])?>,
        });

        let mainWidth = window.innerWidth;
        let ctx = document.getElementById(BX.message('arParams').CANVAS);
        ctx.height = ctx.parentElement.offsetHeight;
        ctx.width = ctx.parentElement.offsetWidth;
        let type = BX.message('arParams').PROP.TYPE;
        let min = parseFloat(BX.message('arParams').PROP.MIN);
        let max = parseFloat(BX.message('arParams').PROP.MAX)

        let displayArray = BX.message('arParams').DISPLAY;
        let elementsArray = BX.message('arParams').LABELS.X;
        let valuesArray = BX.message('arParams').LABELS.Y;
        let colorsArray = BX.message('arParams').COLOR;
        let cutCount = BX.message('arParams').EMPTY_BEFORE_AFTER;
        if (BX.message('arParams').IS_MAIN && cutCount && window.innerWidth < 1024) {
            for (let i = 0; i < cutCount; i++) {
                elementsArray.pop();
                elementsArray.shift();
                valuesArray.pop();
                valuesArray.shift();
                colorsArray.pop();
                colorsArray.shift();
                displayArray.pop();
                displayArray.shift();
            }
        }
        switch (type) {
            case 'bar':
                let barConfig = {
                    type: type,
                    responsive: true,
                    maintainAspectRatio: false,
                    data: {
                        labels: elementsArray,
                        datasets: [{
                            data: valuesArray,
                            backgroundColor: colorsArray,
                        }]
                    },
                    options: {
                        events: false,
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    display: false,
                                    min: min,
                                    max: max
                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    display: true,
                                    fontSize: 14,
                                    fontColor: '#35517B'
                                }
                            }]
                        },
                        tooltips: {
                            enabled: false
                        },
                        animation: {
                            onComplete: function (animation) {
                                let chartInstance = this.chart;
                                chartInstance.ctx.textAlign = 'center';
                                chartInstance.ctx.fillStyle = "rgba(30,62,108,0.7)";
                                chartInstance.ctx.textBaseline = 'bottom';
                                chartInstance.ctx.font = '14px "SFUIDisplay", Helvetica, Arial, sans-serif';
                                this.data.datasets.forEach(function (dataset, i) {
                                    let meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        let data = dataset.data[index];
                                        if (displayArray[index] === "Y") {
                                            chartInstance.ctx.fillText(data, bar._model.x, bar._model.y - 10);
                                        }
                                    });
                                })
                            }
                        }
                    }
                };
                let barChart = new Chart(ctx, barConfig);
                BX.bind(window, "resize", function () {
                    let resizeWidth = window.innerWidth;
                    if (resizeWidth !== mainWidth) {
                        mainWidth = window.innerWidth;
                        barChart.destroy();
                        ctx.height = ctx.parentElement.offsetHeight;
                        ctx.width = ctx.parentElement.offsetWidth;
                        barChart = new Chart(ctx, barConfig);
                    }
                });
                break;
            case 'pie':

                let pieConfig = {
                    type: BX.message('arParams').PROP.TYPE,
                    responsive: false,
                    maintainAspectRatio: false,
                    data: {
                        labels: elementsArray,
                        datasets: [{
                            data: BX.message('arParams').LABELS.Y,
                            backgroundColor: BX.message('arParams').COLOR,
                        }]
                    },
                    options: {
                        events: false,
                        legend: {
                            display: false,
                        },
                        scales: {
                            yAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    display: false,

                                }
                            }],
                            xAxes: [{
                                gridLines: {
                                    display: false,
                                },
                                ticks: {
                                    display: false,
                                }
                            }]
                        },
                        tooltips: {
                            enabled: false
                        },
                        cutoutPercentage: 65,
                        animation: {
                            onComplete: function (animation) {
                                let chartInstance = this.chart;
                                chartInstance.ctx.textAlign = 'center';
                                chartInstance.ctx.fillStyle = "#0085FF";
                                chartInstance.ctx.textBaseline = 'center';
                                chartInstance.ctx.font = '34px "SFUIDisplay", Helvetica, Arial, sans-serif';
                                this.data.datasets.forEach(function (dataset, i) {
                                    let meta = chartInstance.controller.getDatasetMeta(i);
                                    meta.data.forEach(function (bar, index) {
                                        let data = dataset.data[index];
                                        if (displayArray[index] === "Y") {
                                            chartInstance.ctx.fillText(data + '%', bar._model.x, bar._model.y + 15);
                                        }
                                    });
                                })
                            }
                        }
                    }
                };
                let pieChart = new Chart(ctx, pieConfig);
                BX.bind(window, "resize", function () {
                    let resizeWidthPie = window.innerWidth;
                    if (resizeWidthPie !== mainWidth) {
                        mainWidth = window.innerWidth;
                        pieChart.destroy();
                        ctx.height = ctx.parentElement.offsetHeight;
                        ctx.width = ctx.parentElement.offsetWidth;
                        pieChart = new Chart(ctx, pieConfig);
                    }
                });
                break;
        }

    });

</script>
