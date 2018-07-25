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
		datasets: [
			{
				label: '',
				chartDatasetDataString: '',
				chartDatasetBgColor: '',
				data: [],
				backgroundColor: ''
			}
		]
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
		deleteDataset() {

		},
		onLoad() {
			var ctx = document.getElementById("barChart");
			this.theChart = new Chart(ctx, {
				type: this.chartType,
				data: {
					labels: [],
					datasets: [
						{
							label: '',
							data: [],
							backgroundColor: ''
						}
					]
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
})
