import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';

//components
import App from './App.vue';
import allSavedCharts from './components/allSavedChartsTemplate.vue';

Vue.use(Vuex);

new Vue({
	el: '#app',
	store: new Vuex.Store(store),
	data: {
		currentTab: 'allSavedCharts',
	},
	components: {
		allSavedCharts
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
