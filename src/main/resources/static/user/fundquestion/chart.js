var settings = {
    'enableFadeIn': false,
    'fadeInSpeed': 'slow',
    'lastMonths': 2,
    'data': "",
    'chartData': {
        'Series': [],
        'Dates': [],
        'funds': [],
        'indexes': []
    }
};

$.jqplot.config.enablePlugins = true;

function getData(data, location, title, isNetValue) {
    var series = settings.chartData.Series;
    series[0] = new Array();
    if (isNetValue) {
        $(data).each(function() {
            series[0].push([0, this.NetValue, this.NetDate]);
        });
    } else {
        $(data).each(function () {
            series[0].push([0, this.AccNetValue, this.NetDate]);
        });
    }

    // 计算最大列长度
    var maxLenthSeries = new Array();
    $(series).each(function () {
        if (maxLenthSeries.length < this.length) {
            maxLenthSeries = this;
        }
    });
    // 日期线
    settings.chartData.Dates = new Array();
    $(maxLenthSeries).each(function () {
        settings.chartData.Dates.push(this[this.length - 1]);
    });

    $(series).each(function () {
        this.reverse();

        for (var i = this.length; i < maxLenthSeries.length; i++) {
            this.push([0, 0, 0]);
        }

        this.reverse();
        for (var i = 0; i < this.length; i++) {
            this[i][0] = i;
        }
    });
    drawChart(location, title);
}

var drawChart = function (location, title) {
    // 画图表
    var max = -1000000;
    var min = 1000000;

    $(settings.chartData.Series).each(
        function (i, m) {
            $(m).each(
                function (j, n) {
                    n[1] = Math.round(parseFloat(n[1])
                        * Math.pow(10, 4))
                        / Math.pow(10, 4);
                    n[2] = Math.round(parseFloat(n[2]) * 100
                        * Math.pow(10, 2))
                        / Math.pow(10, 2);
                    var p = n[1];
                    if (max < p)
                        max = p;
                    if (min > p)
                        min = p;
                });
        });

    // 基准0线
    var zeroLine = [[0, 0], [0, 0]];

    var ticksX = [];
    var xStep = 2;
    for (var i = 0; i < settings.chartData.Dates.length; i = i
        + settings.chartData.Dates.length / xStep) {
        //settings.chartData.Dates[Math.floor(i)]
        ticksX.push([i, '<div style="width:80px;">' + settings.chartData.Dates[Math.floor(i)] + '</div>']);
    }
    ticksX.length = ticksX.length - 1;
    //ticksX.push( [settings.chartData.Dates.length - 1,'<div style="width:70px;">' + settings.chartData.Dates[settings.chartData.Dates.length - 1] + '</div>' ]);
    ticksX.push([settings.chartData.Dates.length - 1, '<div style="width:80px;">' + settings.chartData.Dates[settings.chartData.Dates.length - 1] + '</div>']);

    var ticksY = [];

    ticksY = [];
    var temp = max - min;
    var s = temp / 3;

    for (var i = min - (2 * s) ; i <= max + (4 * s) ; i = i + s) {
        var color = 'gray';
        var num =( Math.round(i * Math.pow(10, 4)) / Math.pow(10, 4)).toFixed(2);
        ticksY.push([i, '<div style="width:30px;color:' + color + '">'+num+'</div>']);
    }

    // debugger;
    // 图标
    var tableLegend = null;
    var tableLegend1 = null;
    var tableLegend2 = null;
    var normalLineOpts = {
        neighborThreshold: 0,
        pointLabels: {
            show: false
        },
        breakOnNull: true
    };
    var zeroLineOpts = {
        lineWidth: 0.0,
        color: '#ccc',
        showMarker: false,
        shadow: false,
        breakOnNull: true,
        pointLabels: {
            show: false
        }
    };
    var seriesOpts = [];
    for (var i = 0; i < settings.chartData.Series.length; i++) {
        seriesOpts.push(normalLineOpts);
    }
    seriesOpts.push(zeroLineOpts);

    var opts = {
        title: {
            text: '',
            fontSize: '9pt',
            textAlign: 'center'
        },
        series: seriesOpts,
        seriesDefaults: {
            showMarker: false,
            lineWidth: 1
        },
        legend: {
            xoffset: 1,
            yoffset: 1,
            renderer: $.jqplot.EnhancedLegendRenderer,
            show: false,
            labels: '',
            location: 'nw',
            showSwatches: false,
            rendererOptions: {
                seriesToggle: 'fast'
            }
        },
        axes: {
            xaxis: {
                ticks: ticksX,
                tickOptions: {
                    showMark: true
                },
                pad:0
            },
            yaxis: {
                ticks: ticksY,
                tickOptions: {
                    showMark: false
                }
            }
        },
        cursor: {
            zoom: false,
            tooltipLocation: "se",
            followMouse: true,
            showCursorLegend: false,
            showTooltipDataPosition: true,
            showTooltipUnitPosition: false,
            showTooltipGridPosition: false,
            onDrawTooltip: function (data) {
                var index = data[0];
                if (settings.chartData.Series[0][index]) {
                    var data = settings.chartData.Series[0].length > 0 ? (settings.chartData.Series[0][index].length > 2 ? settings.chartData.Series[0][index][1] : "") : "";
                    return "["+settings.chartData.Dates[index] + "]  " + data;
                }
                return "";
            },
            showVerticalLine: true
        },
        highlighter: {
            show: false
        },
        grid: {
            shadow: true,
            shadowOffset: 2.0,
            shadowWidth: 1.0,
            shadowAlpha: 0.04,
            borderWidth: 0.1,
            borderColor: 'black',
            gridLineColor: '#eee'
        }
    };
    var s = [];
    for (var i = 0; i < settings.chartData.Series.length; i++) {
        s.push(settings.chartData.Series[i]);
    }
    s.push(zeroLine);

    opts.title.text = title;
    plot = $.jqplot(location, s, opts);

    tableLegend = $('#' + location).find('.jqplot-table-legend');
    tableLegend.find("tr:last").remove();

};


function showFundChart(location, title, data, isNetValue) {
    getData(data, location, title, isNetValue);
};




