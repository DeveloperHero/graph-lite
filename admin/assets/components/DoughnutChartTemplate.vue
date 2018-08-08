<template>
	<div class="DoughnutChart" id="Doughnut">
		<div class="graphOptions">
			<table class="form-table">
				<tr>
					<th scope="row"><label for="labels">Labels</label></th>
					<td><input class="regular-text" type="text" id="labels" v-model="chartlabelString" @keyup="addLabels"></td>
				</tr>
				<tr>
					<th scope="row"><label for="datasets">Data</label></th>
					<td><input class="regular-text" type="text" id="datasets" v-model="chartDatasetDataString" @keyup="addDatasetData"></td>
				</tr>
				<tr>
					<th scope="row"><label for="colors">Color</label></th>
					<td><input class="regular-text" type="text" id="colors" v-model="chartDatasetBgColorString" @keyup="addDatasetBgColor"></td>
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
					<td v-if="!graphData"><button type="button" class="saveGraphData" @click="saveGraphData">Save</button></td>
					<td v-else><button type="button" class="saveGraphData" @click="updateGraphData">Update</button></td>
				</tr>
			</table>
		</div>
		<div class="graphDiv">
			<canvas id="DoughnutChart"></canvas>
		</div>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios';
	import querystring from 'querystring';

	export default {
		props: ['graphData', 'graphIndex'],
		data() {
			return {
				chartType: 'doughnut',
				chartlabelString: '',
				chartDatasetDataString: '',
				chartDatasetBgColorString: '',
				titleText: '',
				legendPosition: 'top',
				labels: [],
				datasets: [
					{
						data: [],
						backgroundColor: []
					}
				],
				showTitle: false,
				showLegend: true
			};
		},
		methods: {
			addLabels() {
				this.labels = this.chartlabelString.split(',');
				this.theChart.data.labels = this.labels;
				this.theChart.update();
			},
			addDatasetData() {
				this.datasets[0].data = this.chartDatasetDataString.split(',');
				this.theChart.data.datasets[0].data = this.datasets[0].data;
				this.theChart.update();
			},
			addDatasetBgColor() {
				this.datasets[0].backgroundColor = this.chartDatasetBgColorString.split(',');
				this.theChart.data.datasets[0].backgroundColor = this.datasets[0].backgroundColor;
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
			saveGraphData() {
				let outerThis = this;
				var chartDatas = {
					type: this.chartType,
					data: {
						labels: this.labels,
						datasets: this.datasets
					},
					options: {
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
				var ctx = document.getElementById("DoughnutChart");
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
			},
			forEdit() {
				this.chartlabelString = this.graphData.data.labels.join(", ");
				this.labels = this.graphData.data.labels;

				this.chartDatasetBgColorString = this.graphData.data.datasets[0].backgroundColor.join(", ");
				this.datasets[0].backgroundColor = this.graphData.data.datasets[0].backgroundColor;
				this.chartDatasetDataString = this.graphData.data.datasets[0].data.join(", ");
				this.datasets[0].data = this.graphData.data.datasets[0].data;

				this.showTitle = this.graphData.options.title.display;
				this.titleText = this.graphData.options.title.text;
				this.showLegend = this.graphData.options.legend.display;
				this.legendPosition = this.graphData.options.legend.position;

				this.theChart.data.labels = this.labels;
				this.theChart.data.datasets = this.datasets;
				this.theChart.options.title.display = this.showTitle;
				this.theChart.options.title.text = this.titleText;
				this.theChart.options.legend.display = this.showLegend;
				this.theChart.options.legend.position = this.legendPosition;
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
	.DoughnutChart {
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
	.saveGraphDataButton {
		display: block;
	}
	.saveGraphData {
		float: right;
	}
</style>