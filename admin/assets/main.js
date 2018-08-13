import Vue from 'vue';
import Vuex from 'vuex';
import store from './store';

//components
import allSavedCharts from './components/allSavedChartsTemplate.vue';

Vue.use(Vuex);

new Vue({
	el: '#app',
	render: h => h(allSavedCharts),
	store: new Vuex.Store(store),
	created() {
		this.$store.dispatch('onLoad');
	}
})
