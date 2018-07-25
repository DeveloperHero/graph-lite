new Vue({
	el: '#app',
	data: {
		chartType: 'pie',
		chartlabelString: '',
		chartDatasetDataString: '',
		chartDatasetBgColorString: '',
		titleText: '',
		legendPosition: 'top',
		labels: [],
		DatasetData: [],
		DatasetBgColor: [],
		showTitle: false,
		showLegend: true
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
			this.theChart.options.legend.display = this.showLegend;
			this.theChart.update();
		},
		changeLegendPosition() {
			this.theChart.options.legend.position = this.legendPosition;
			this.theChart.update();
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




// @mishuk
$('#gl-admin-meta-box').appendTo('body');
$('button.close_graph_modal').appendTo('div#gl-admin-meta-box h2.hndle');
$('#gl-admin-meta-box').hide();

$('div#gl-admin-meta-box button.handlediv').remove();
$('div#gl-admin-meta-box').removeClass('postbox');

$('.close_graph_modal').on('click', function(){

	var content = 'Nice Work!'

	tinymce.activeEditor.execCommand('mceInsertContent', false, content);

	$('#gl-admin-meta-box').fadeOut();
});