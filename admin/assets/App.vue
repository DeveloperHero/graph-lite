<template>
    <div id="app">
        <div class="dropdown">
            <button class="dropbtn">{{currentRoute}}</button>
            <div class="dropdown-content">
                <a href="javascript:void(0)" @click="loadBarGraphTemplate">Bar</a>
                <a href="javascript:void(0)" @click="loadLineGraphTemplate">Line</a>
                <a href="javascript:void(0)" @click="loadPieGraphTemplate">Pie</a>
            </div>
        </div>
        <router-view></router-view>
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
  import areaChart from './components/AreaChartTemplate';
  import scatterChart from './components/ScatterChartTemplate';


  import Vue from 'vue';
  import VueRouter from 'vue-router';

  Vue.use(VueRouter);

  const routes = [
    { path: '/barChart', name: 'barChart', component: barChart, props: true },
    { path: '/lineChart', name: 'lineChart', component: lineChart, props: true },
    { path: '/pieChart', name: 'pieChart', component: pieChart, props: true },
    { path: '/doughnutChart', name: 'doughnutChart', component: doughnutChart, props: true },
    { path: '/radarChart', name: 'radarChart', component: radarChart, props: true },
    { path: '/polarAreaChart', name: 'polarAreaChart', component: polarAreaChart, props: true},
    { path: '/bubbleChart', name: 'bubbleChart', component: bubbleChart, props: true},
    { path: '/areaChart', name: 'areaChart', component: areaChart, props: true},
    { path: '/scatterChart', name: 'scatterChart', component: scatterChart, props: true},
  ];

  const router = new VueRouter({
    routes
  });
  window.router = router;

  export default {
    name: 'app',
    router,
    data () {
      return {
        currentRoute: 'bar'
      }
    },
    methods: {
        loadBarGraphTemplate() {
            router.push({ name: 'barChart' });
        },
        loadLineGraphTemplate() {
            router.push({ name: 'lineChart' });
        },
        loadPieGraphTemplate() {
            router.push({ name: 'pieChart' });
        }
    },
    mounted() {
        router.push({ name: 'pieChart' });
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
