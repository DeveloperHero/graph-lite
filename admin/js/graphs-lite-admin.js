/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

new Vue({
	el: '#app',
	data: {
		chartType: 'bar',
		chartlabelsString: '',
		titleText: '',
		legendPosition: 'top',
		labels: [],
		showTitle: false,
		showLegend: true,
		datasets: [{
			label: '',
			chartDatasetDataString: '',
			chartDatasetBgColor: '',
			data: [],
			backgroundColor: ''
		}]
	},
	methods: {
		addDataset() {
			this.datasets.push({
				label: '',
				chartDatasetDataString: '',
				chartDatasetBgColor: '',
				data: [],
				backgroundColor: []
			});
			this.theChart.data.datasets.push({
				label: '',
				data: [],
				backgroundColor: []
			});
			this.theChart.update();
		},
		addLabels() {
			let separatingLabels = this.labels = this.chartlabelsString.split(',');
			this.theChart.data.labels = separatingLabels;
			this.theChart.update();
		},
		addDatasetLabel(index) {
			this.theChart.data.datasets[index].label = this.datasets[index].label;
			this.theChart.update();
		},
		addDatasetData(index) {
			let separatingDatasetData = this.datasets[index].data = this.datasets[index].chartDatasetDataString.split(',');
			this.theChart.data.datasets[index].data = separatingDatasetData;
			this.theChart.update();
		},
		addDatasetBgColor(index) {
			// let separatingDatasetColor = this.datasets[index].backgroundColor = this.datasets[index].chartDatasetBgColor.split(',');
			this.theChart.data.datasets[index].backgroundColor = this.datasets[index].chartDatasetBgColor;
			this.theChart.update();
		},
		showingGraphTitle() {
			this.theChart.options.title.display = this.showTitle;
			this.theChart.update();
		},
		addTitleText() {
			this.theChart.options.title.text = this.titleText;
			this.theChart.update();
		},
		showingGraphLegend() {
			this.theChart.options.legend.display = this.showLegend;
			this.theChart.update();
		},
		changeLegendPosition() {
			this.theChart.options.legend.position = this.legendPosition;
			this.theChart.update();
		},
		deleteDataset() {},
		onLoad() {
			var ctx = document.getElementById("barChart");
			this.theChart = new Chart(ctx, {
				type: this.chartType,
				data: {
					labels: [],
					datasets: [{
						label: '',
						data: [],
						backgroundColor: ''
					}]
				},
				options: {
					title: {
						display: false,
						text: ''
					},
					legend: {
						display: true,
						position: 'top'
					}
				}
			});
		}
	},
	mounted() {
		this.onLoad();
	}
});

// @mishuk
$('#gl-admin-meta-box').appendTo('body');
$('button.close_graph_modal').appendTo('div#gl-admin-meta-box h2.hndle');
$('#gl-admin-meta-box').hide();

$('div#gl-admin-meta-box button.handlediv').remove();
$('div#gl-admin-meta-box').removeClass('postbox');

$('.close_graph_modal').on('click', function () {

	var content = 'Nice Work!';

	tinymce.activeEditor.execCommand('mceInsertContent', false, content);

	$('#gl-admin-meta-box').fadeOut();
});

/***/ })
/******/ ]);
//# sourceMappingURL=graphs-lite-admin.js.map