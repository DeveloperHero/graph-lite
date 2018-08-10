<template>
    <div id="app">
        <div class="gl_chart_dropdown_area">
            <p class="gl_chart_template_title">Select a chart</p>
            <div class="dropdown gl_chart_dropdown">
                <button class="dropbtn">{{ activeChart }}</button>
                <div class="dropdown-content">
                    <a href="javascript:void(0)"
                       v-for="(chartTab, index) in chartTabs"
                       v-bind:key="chartTab.tabFileName"
                       @click="changeTabChart(index)">{{ chartTab.tabName }}</a>
                </div>
            </div>
        </div>

        <component v-bind:is="currentChartTabComponent"></component>
    </div>
</template>

<script>
  import barChart from './components/BarChartTemplate';
  import lineChart from './components/LineChartTemplate';
  import pieChart from './components/PieChartTemplate';
  import doughnutChart from './components/DoughnutChartTemplate';
  import radarChart from './components/RadarChartTemplate';
  import polarAreaChart from './components/PolarAreaChartTemplate';
  import bubbleChart from './components/BubbleChartTemplate';
  import scatterChart from './components/ScatterChartTemplate';

  export default {
    name: 'app',
    data () {
        return {
            activeChart: 'Pie Chart',
            currentChartTab: 'pieChart',
            chartTabs: [
                { tabFileName: 'pieChart', tabName: 'Pie Chart' },
                { tabFileName: 'doughnutChart', tabName: 'Doughnut Chart' },
                { tabFileName: 'polarAreaChart', tabName: 'Polar Area Chart' },
                { tabFileName: 'barChart', tabName: 'Bar Chart' },
                { tabFileName: 'lineChart', tabName: 'Line Chart' },
                { tabFileName: 'radarChart', tabName: 'Radar Chart' },
                { tabFileName: 'bubbleChart', tabName: 'Bubble Chart' },
                { tabFileName: 'scatterChart', tabName: 'Scatter Chart' }
            ]
        }
    },
    components: {
        pieChart, doughnutChart, polarAreaChart, barChart, lineChart, radarChart, bubbleChart, scatterChart
    },
    computed: {
        currentChartTabComponent: function () {
            return this.currentChartTab;
        }
    },
    methods: {
        changeTabChart(index) {
            this.activeChart = this.chartTabs[index].tabName;
            this.currentChartTab = this.chartTabs[index].tabFileName;
        }
    }
  }
</script>

<style>
    html,body,#app {
        min-height: 100% !important;
        height: 100%;
    }
    .dropbtn {
        background-color: #3473aa;
        color: white;
        padding: 10px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        min-width: 130px;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }
    .dropdown-content a:hover {
        background-color: #f1f1f1
    }
    .dropdown:hover .dropdown-content {
        display: block;
    }
    .dropdown:hover .dropbtn {
        background-color: #3e8e41;
    }
</style>
