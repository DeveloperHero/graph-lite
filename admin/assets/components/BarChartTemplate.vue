<template>
	<div class="barChart" id="bar">
		<div class="graphOptions">
			<table class="form-table">
				<tr>
					<th scope="row"><label for="labels">Labels</label></th>
					<td><input class="regular-text" type="text" id="labels" v-model="chartlabelsString" @keyup="addLabels"></td>
				</tr>
				<template v-for="(data, index) in datasets">
					<tr>
						<th scope="row"><label for="label">Label</label></th>
						<td><input class="regular-text" type="text" id="label" v-model="data.label" @keyup="addDatasetLabel(index)"></td>
					</tr>
					<tr>
						<th scope="row"><label for="datasets">Data</label></th>
						<td><input class="regular-text" type="text" id="datasets" v-model="data.chartDatasetDataString" @keyup="addDatasetData(index)"></td>
					</tr>
					<tr>
						<th scope="row"><label for="colors">Color</label></th>
						<td><input class="regular-text" type="text" id="colors" v-model="data.chartDatasetBgColor" @keyup="addDatasetBgColor(index)"></td>
					</tr>
				</template>
				<tr>
					<th scope="row"><label></label></th>
					<td>
						<input type="button" id="add_dataset" class="button button-primary" value="Add Dataset" @click="addDataset">
						<!-- <input type="button" id="delete_dataset" class="button button-danger" value="Delete Dataset" @click="deleteDataset"> -->
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="title">Show Chart Title</label></th>
					<td><input type="checkbox" id="title" v-model="showTitle" @change="showingGraphTitle"></td>
				</tr>
				<tr>
					<th scope="row"><label for="titleText">Title Text</label></th>
					<td><input class="regular-text" type="text" id="titleText" v-model="titleText" @keyup="addTitleText"></td>
				</tr>
				<tr>
					<th scope="row"><label for="legend">Show Legend</label></th>
					<td><input type="checkbox" id="legend" v-model="showLegend" @change="showingGraphLegend"></td>
				</tr>
				<tr>
					<th scope="row"><label for="legend">Legend Position</label></th>
					<td>
						<select id="legend_position" v-model="legendPosition" @change="changeLegendPosition">
							<option selected="selected" value="top">Top</option>
							<option value="bottom">Bottom</option>
							<option value="left">Left</option>
							<option value="right">Right</option>
						</select>
					</td>
				</tr>
				<tr>
					<th scope="row"><label></label></th>
					<td><button type="button" class="saveGraphData" @click="saveGraphData">Save</button></td>
				</tr>
			</table>
		</div>
		<div class="graphDiv">
			<canvas id="barChart"></canvas>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
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
			};
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
			saveGraphData() {
				var chartDatas = {'type':this.chartType, 'labels': this.labels, 'datasets': this.datasets, 'title_show': this.showTitle, 'title_text': this.titleText, 'legend_show': this.showLegend, 'legend_position': this.legendPosition};
				var chart_data = JSON.stringify(chartDatas);
				var route = gl.save_ajax_url;

				axios.post(route, chart_data)
				.then((response) => {
					var content = '[graph_lite id="'+response.data+'"]';	tinymce.activeEditor.execCommand('mceInsertContent', false, content);	$('#gl-admin-meta-box').fadeOut();
				});
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
	}
</script>

<style type="text/css">
	.barChart {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}
	.graphOptions {
		width: 50%;
		padding-top: 20px;
	}
	.graphDiv {
		width: 50%;
	}
	.saveGraphData {
		float: right;		
	}
</style>