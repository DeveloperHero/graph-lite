new Vue({
	el: '#app',
	data: {
		chartType: 'pie',
		chartlabelString: '',
		chartDatasetDataString: '',
		chartDatasetBgColorString: '',
		titleText: '',
		labels: [],
		DatasetData: [],
		DatasetBgColor: [],
		showTitle: false,
		showLegend: false
	},
	methods: {
		addLabels() {
			let separatingLabels = this.labels = this.chartlabelString.split(',');
			this.theChart.data.labels = separatingLabels;
			this.theChart.update();
		},
		addDatasetData() {
			let separatingDatasetData = this.DatasetData = this.chartDatasetDataString.split(',');
			this.theChart.data.datasets[0].data = separatingDatasetData;
			this.theChart.update();
		},
		addDatasetBgColor() {
			let separatingDatasetColor = this.DatasetBgColor = this.chartDatasetBgColorString.split(',');
			this.theChart.data.datasets[0].backgroundColor = separatingDatasetColor;
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

		},
		onLoad() {
			var ctx = document.getElementById("barChart");
			this.theChart = new Chart(ctx, {
				type: this.chartType,
				data: {
					labels: [],
					datasets: [
						{
							data: [],
							backgroundColor: []
						}
					]
				},
				options: {
					title: {
						display: false,
						text: ''
					}
				}
			});
		}
	},
	mounted() {
		this.onLoad();
	}
})
