<template>
  <div id="app">
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
    { path: '/pieChart', name: 'gatherinfo', component: pieChart, props: true },
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
      }
    }
  }
</script>

<style>
  html,body,#app {
    min-height: 100% !important;
    height: 100%;
  }
</style>
