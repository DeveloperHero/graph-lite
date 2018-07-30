import Vue from 'vue';
import App from './App.vue';
import allSavedCharts from './components/allSavedChartsTemplate.vue';

Vue.prototype.$eventHub = new Vue(); // Global event bus

new Vue({
	el: '#app',
	data: {
		currentTab: 'allSavedCharts',
		tabs: [
			{ tabFileName: 'allSavedCharts', tabName: 'All Charts' },
			{ tabFileName: 'App', tabName: 'Add New Chart' }
		]
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
