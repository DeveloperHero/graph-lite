<template>
	<div class="barChart" id="bar">
		<div class="graphOptions">
			<table class="form-table">
				<tr>
					<th scope="row"><label for="labels">Labels</label></th>
					<td><input class="regular-text" type="text" id="labels" v-model="chartlabelsString" @keyup="addLabels"></td>
				</tr>
				<template v-for="(data, index) in datasets" :key="data">
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
						<td><input class="regular-text" type="text" id="colors" v-model="data.backgroundColor" @keyup="addDatasetBgColor(index)"></td>
					</tr>
					<tr>
						<th scope="row"><label></label></th>
						<td><input type="button" class="button button-danger delete_dataset" value="Delete Dataset" @click="deleteDataset(index)"></td>
					</tr>
				</template>
				<tr>
					<th scope="row"><label></label></th>
					<td>
						<input type="button" id="add_dataset" class="button button-primary" value="Add Dataset" @click="addDataset">
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
					<th scope="row"><label for="beginAtZero">yAxes Range (Begin at 0)</label></th>
					<td><input type="checkbox" id="beginAtZero" v-model="beginAtZero" @change="yAxesRange"></td>
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
					<td v-if="!graphData"><button type="button" class="saveGraphData" @click="saveGraphData">Save</button></td>
					<td v-else><button type="button" class="saveGraphData" @click="updateGraphData">Update</button></td>
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
		props: ['graphData', 'graphIndex'],
		data() {
			return {
				chartType: 'bar',
				chartlabelsString: '',
				titleText: '',
				legendPosition: 'top',
				labels: [],
				showTitle: false,
				showLegend: true,
				beginAtZero: false,
				datasets: [
					{
						label: '',
						chartDatasetDataString: '',
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
					data: [],
					backgroundColor: ''
				});
				this.theChart.data.datasets.push({
					label: '',
					data: [],
					backgroundColor: ''
				});
				this.theChart.update();
			},
			addLabels() {
				this.labels = this.chartlabelsString.split(',');
				this.theChart.data.labels = this.labels;
				this.theChart.update();
			},
			addDatasetLabel(index) {
				this.theChart.data.datasets[index].label = this.datasets[index].label;
				this.theChart.update();
			},
			addDatasetData(index) {
				this.datasets[index].data = this.datasets[index].chartDatasetDataString.split(',');
				this.theChart.data.datasets[index].data = this.datasets[index].data;
				this.theChart.update();
			},
			addDatasetBgColor(index) {
				this.theChart.data.datasets[index].backgroundColor = this.datasets[index].backgroundColor;
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
			yAxesRange() {
				this.theChart.options.scales.yAxes[0].ticks.beginAtZero = this.beginAtZero;
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
			deleteDataset(index) {
				this.datasets.splice(index, 1);
				this.theChart.data.datasets.splice(index, 1);
				this.theChart.update();
			},
			saveGraphData() {
				let outerThis = this;
				var chartDatas = {
					type: this.chartType,
					data: {
						labels: this.labels,
						datasets: this.datasets
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: this.beginAtZero
								}
							}]
						},
						title: {
							display: this.showTitle,
							text: this.titleText
						},
						legend: {
							display: this.showLegend,
							position: this.legendPosition
						}
					}
				};

				this.$store.dispatch('addNewGraph', chartDatas);
			},
			updateGraphData() {
				let chartDatas = {
					type: this.chartType,
					data: {
						labels: this.labels,
						datasets: this.datasets
					},
					options: {
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: this.beginAtZero
								}
							}]
						},
						title: {
							display: this.showTitle,
							text: this.titleText
						},
						legend: {
							display: this.showLegend,
							position: this.legendPosition
						}
					}
				};

				let payload = {'chartDetails': chartDatas, 'graphIndex': this.graphIndex};

				this.$store.dispatch('updateGraph', payload).then(function() {
					setTimeout(function() {
						outerThis.$emit("applied");
					}, 1000);
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
						scales: {
							yAxes: [{
								ticks: {
									beginAtZero: false
								}
							}]
						},
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
			},
			forEdit() {
				let outerThis = this;
				this.chartlabelsString = this.graphData.data.labels.join(", ");
				this.labels = this.graphData.data.labels;

				this.graphData.data.datasets.forEach(function(value, key) {
					if(key) {
						outerThis.datasets.push({ label: '', chartDatasetDataString: '', data: [], backgroundColor:'' });
					}
					outerThis.datasets[key].label = outerThis.graphData.data.datasets[key].label;
					outerThis.datasets[key].chartDatasetDataString = outerThis.graphData.data.datasets[key].chartDatasetDataString;
					outerThis.datasets[key].data = outerThis.graphData.data.datasets[key].data;
					outerThis.datasets[key].backgroundColor = outerThis.graphData.data.datasets[key].backgroundColor;
				});

				this.showTitle = this.graphData.options.title.display;
				this.titleText = this.graphData.options.title.text;
				this.showLegend = this.graphData.options.legend.display;
				this.legendPosition = this.graphData.options.legend.position;
				this.beginAtZero = this.graphData.options.scales.yAxes[0].ticks.beginAtZero;

				this.theChart.data.labels = this.labels;
				this.theChart.data.datasets = this.datasets;
				this.theChart.options.title.display = this.showTitle;
				this.theChart.options.title.text = this.titleText;
				this.theChart.options.legend.display = this.showLegend;
				this.theChart.options.legend.position = this.legendPosition;
				this.theChart.options.scales.yAxes[0].ticks.beginAtZero = this.beginAtZero;
				this.theChart.update();

				this.editedGraphIdNo = this.graphData.graph_id;
			}
		},
		mounted() {
			this.onLoad();
			if(this.graphData) {
				this.forEdit();
			}
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
	.delete_dataset {
		float: right;
		margin-right: 20px !important;
	}
</style>