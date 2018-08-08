import Vue from 'vue';
import App from './App.vue';
import allSavedCharts from './components/allSavedChartsTemplate.vue';
import Vuex from 'vuex';
import store from './store';

Vue.use(Vuex);

new Vue({
	el: '#app',
	store: new Vuex.Store(store),
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
	},
	created() {
		this.$store.dispatch('onLoad');
	}
})
