import Vue from 'vue';
import App from './App.vue';
import allSavedCharts from './components/allSavedChartsTemplate.vue';

new Vue({
	el: '#app',
	data: {
		currentTab: 'App',
		tabs: ['App', 'allSavedCharts']
	},
	components: {
		App, allSavedCharts
	},
	computed: {
		currentTabComponent: function () {
			return this.currentTab;
		}
	}
})
