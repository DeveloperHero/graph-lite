<template>
	<div class="barChart gl_chart_template" id="bar">
		<div class="graphOptions">
			<table class="form-table">
				<tr>
					<th scope="row" class="gl_backButotnTh"><button type="button" @click="goBacktoAllGraphPage">Go Back</button></th>
					<td></td>
				</tr>
				<tr>
					<th scope="row"><label for="labels">xAsis Labels*</label></th>
					<td>
						<input class="regular-text" :class="{'gl_fieldRequired': ifxAxesLabelEmpty}" type="text" id="labels" placeholder="Comma separated list of labels" v-model="chartlabelsString" @keyup="addLabels">
						<p class="gl_fieldRequiredError" v-if="ifxAxesLabelEmpty">Field required</p>
					</td>
				</tr>
			</table>

			<fieldset v-for="(data, index) in datasets" :key="data">
				<legend>Dataset {{index+1}}</legend>
				<table class="form-table">
					<tr>
						<th scope="row"><label for="label">Label</label></th>
						<td><input class="regular-text" type="text" id="label" placeholder="Dataset label" v-model="data.label" @keyup="addDatasetLabel(index)"></td>
					</tr>
					<tr>
						<th scope="row"><label for="datasets">Data*</label></th>
						<td>
							<input class="regular-text" :class="{'gl_fieldRequired': data.ifDataEmpty}" type="text" id="datasets" placeholder="Numeric data value for each label. Eg. 1,2,3 etc" v-model="data.chartDatasetDataString" @keyup="addDatasetData(index)">
							<p class="gl_fieldRequiredError" v-if="data.ifDataEmpty">Field required</p>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="colors">Color*</label></th>
						<td>
							<input class="regular-text" :class="{'gl_fieldRequired': data.ifBackgroundEmpty}" type="text" id="colors" placeholder="Color value for bar. Eg. red" v-model="data.backgroundColor" @keyup="addDatasetBgColor(index)">
							<p class="gl_fieldRequiredError" v-if="data.ifBackgroundEmpty">Field required</p>
						</td>
					</tr>
					<tr v-if="index != 0">
						<th scope="row" class="gl_deleteButtonTh"><label></label></th>
						<td class="gl_deleteButtonTd"><input type="button" class="button button-danger delete_dataset" value="Delete Dataset" @click="deleteDataset(index)"></td>
					</tr>
				</table>
			</fieldset>

			<table class="form-table">
				<tr>
					<th scope="row" style="padding-top: 5px;"><input type="button" id="add_dataset" class="button button-primary" value="Add Dataset" @click="addDataset"></th>
					<td></td>
				</tr>
				<tr>
					<th scope="row"><label for="titleText">Chart Title</label></th>
					<td><input class="regular-text" type="text" id="titleText" placeholder="Title for the chart" v-model="titleText" @keyup="addTitleText"></td>
				</tr>
				<tr>
					<th scope="row"><label for="beginAtZero">yAxes Range (Begin at 0)</label></th>
					<td><input type="checkbox" id="beginAtZero" v-model="beginAtZero" @change="yAxesRange"></td>
				</tr>
				<tr>
					<th scope="row"><label for="legend">Show Label</label></th>
					<td><input type="checkbox" id="legend" v-model="showLegend" @change="showingGraphLegend"></td>
				</tr>
				<tr>
					<th scope="row"><label for="legend_position">Label Position</label></th>
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
					<td v-if="graphData == ''"><button type="button" class="saveGraphData" @click="saveGraphData">Save</button></td>
					<td v-else><button type="button" class="saveGraphData" @click="updateGraphData">Update</button></td>
				</tr>
			</table>
		</div>
		<div class="graphDiv">
			<iframe class="tutorialFrame" v-if="showTutorial" width="560" height="315" src="https://www.youtube.com/embed/Hwn4UKc5Bew?rel=0&amp;controls=0&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
			<div class="gl_graphChildDiv" v-show="!showTutorial">
				<canvas id="barChart"></canvas>
			</div>
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
				ifxAxesLabelEmpty: false,
				showTutorial: true,
				datasets: [
					{
						label: '',
						chartDatasetDataString: '',
						data: [],
						backgroundColor: '',
						ifDataEmpty: false,
						ifBackgroundEmpty: false
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
					backgroundColor: '',
					ifDataEmpty: false,
					ifBackgroundEmpty: false
				});
				this.theChart.data.datasets.push({
					label: '',
					data: [],
					backgroundColor: ''
				});
				this.theChart.update();
			},
			addLabels() {
				if(this.ifxAxesLabelEmpty) {
					this.ifxAxesLabelEmpty = false;
				}
				this.showTutorial=false;
				this.labels = this.chartlabelsString.split(',');
				this.theChart.data.labels = this.labels;
				this.theChart.update();
			},
			addDatasetLabel(index) {
				this.showTutorial=false;
				this.theChart.data.datasets[index].label = this.datasets[index].label;
				this.theChart.update();
			},
			addDatasetData(index) {
				if(this.datasets[index].ifDataEmpty) {
					this.datasets[index].ifDataEmpty = false;
				}
				this.showTutorial=false;
				this.datasets[index].data = this.datasets[index].chartDatasetDataString.split(',');
				this.theChart.data.datasets[index].data = this.datasets[index].data;
				this.theChart.update();
			},
			addDatasetBgColor(index) {
				if(this.datasets[index].ifBackgroundEmpty) {
					this.datasets[index].ifBackgroundEmpty = false;
				}
				this.showTutorial=false;
				this.theChart.data.datasets[index].backgroundColor = this.datasets[index].backgroundColor;
				this.theChart.update();
			},
			addTitleText() {
				this.titleText !== '' ? this.showTitle = true : this.showTitle = false;
				this.showTutorial=false;
				this.theChart.options.title.display = this.showTitle;
				this.theChart.options.title.text = this.titleText;
				this.theChart.update();
			},
			yAxesRange() {
				this.showTutorial=false;
				this.theChart.options.scales.yAxes[0].ticks.beginAtZero = this.beginAtZero;
				this.theChart.update();
			},
			showingGraphLegend() {
				this.showTutorial=false;
				this.theChart.options.legend.display = this.showLegend;
				this.theChart.update();
			},
			changeLegendPosition() {
				this.showTutorial=false;
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
				let DatasetHasEmptyValue = true

				this.datasets.forEach(function(value) {
					if(value.chartDatasetDataString === '') {
						value.ifDataEmpty = true;
						DatasetHasEmptyValue = false;
					}
					if(value.backgroundColor === '') {
						value.ifBackgroundEmpty = true;
						DatasetHasEmptyValue = false;
					}
				});

				if(this.chartlabelsString === '') {
					this.ifxAxesLabelEmpty = true;
				}

				if(this.chartlabelsString !== '' && DatasetHasEmptyValue) {
					let chartDatas = {
						type: this.chartType,
						data: {
							labels: this.labels,
							datasets: this.datasets
						},
						options: {
							maintainAspectRatio: false,
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

					this.$store.dispatch('addNewGraph', chartDatas).then(function() {
						setTimeout(function() {
							outerThis.$emit("saved");
						}, 1500);
					});
				}
			},
			updateGraphData() {
				let outerThis = this;
				let DatasetHasEmptyValue = true

				this.datasets.forEach(function(value) {
					if(value.chartDatasetDataString === '') {
						value.ifDataEmpty = true;
						DatasetHasEmptyValue = false;
					}
					if(value.backgroundColor === '') {
						value.ifBackgroundEmpty = true;
						DatasetHasEmptyValue = false;
					}
				});

				if(this.chartlabelsString === '') {
					if(this.chartlabelsString === '') {
						this.ifxAxesLabelEmpty = true;
					}
				}

				if(this.chartlabelsString !== '' && DatasetHasEmptyValue) {
					let chartDatas = {
						type: this.chartType,
						data: {
							labels: this.labels,
							datasets: []
						},
						options: {
							maintainAspectRatio: false,
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

					this.datasets.forEach(function(value) {
						chartDatas.data.datasets.push({ label: value.label, data: value.data, chartDatasetDataString: value.chartDatasetDataString, backgroundColor: value.backgroundColor });
					});

					let payload = {'chartDetails': chartDatas, 'graphIndex': this.graphIndex, 'graph_id': this.graphData.graph_id};

					this.$store.dispatch('updateGraph', payload).then(function() {
						setTimeout(function() {
							outerThis.$emit("updated");
						}, 2000);
					});
				}
			},
			onLoad() {
				let ctx = document.getElementById("barChart");
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
						maintainAspectRatio: false,
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
				this.showTutorial=false;
				let outerThis = this;
				this.chartlabelsString = this.graphData.data.labels.join(", ");
				this.theChart.data.labels = this.labels = this.graphData.data.labels;
				this.graphData.data.datasets.forEach(function(value, key) {
					if(key) {
						outerThis.datasets.push({ label: '', chartDatasetDataString: '', data: [], backgroundColor:'', ifDataEmpty: false, ifBackgroundEmpty: false });
						outerThis.theChart.data.datasets.push({ label: '', data: [], backgroundColor:'' });
					}
					outerThis.theChart.data.datasets[key].label = outerThis.datasets[key].label = outerThis.graphData.data.datasets[key].label;

					outerThis.datasets[key].chartDatasetDataString = outerThis.graphData.data.datasets[key].chartDatasetDataString;

					outerThis.theChart.data.datasets[key].data = outerThis.datasets[key].data = outerThis.graphData.data.datasets[key].data;

					outerThis.theChart.data.datasets[key].backgroundColor = outerThis.datasets[key].backgroundColor = outerThis.graphData.data.datasets[key].backgroundColor;
				});

				this.theChart.options.title.display = this.showTitle = this.graphData.options.title.display;
				this.theChart.options.title.text = this.titleText = this.graphData.options.title.text;

				this.theChart.options.legend.display = this.showLegend = this.graphData.options.legend.display;
				this.theChart.options.legend.position = this.legendPosition = this.graphData.options.legend.position;

				this.theChart.options.scales.yAxes[0].ticks.beginAtZero = this.beginAtZero = this.graphData.options.scales.yAxes[0].ticks.beginAtZero;
				this.theChart.update();
			},
			goBacktoAllGraphPage() {
				this.$emit("backed");
			}
		},
		mounted() {
			this.onLoad();
			if(this.graphData != '') {
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
	.gl_graphChildDiv {
		position: fixed;
		width: 46%;
		height: 50%;
		right: 40px;
		top: 150px;
	}
	.saveGraphData {
		float: right;
	}
	input[type="text"] {
		height: 35px;
	}
	.form-table th {
		width: 25%;
	}
	.gl_deleteButtonTd, .gl_deleteButtonTh {
		padding: 0 !important;
	}
	.delete_dataset {
		float: right;
		background-color: #dc3545 !important;
		border-color: #dc3545 !important;
		color: #fff !important;
		margin-bottom: 8px !important;
		margin-right: 10px !important;
	}
	fieldset {
		width: 100%;
		border: 1px solid #32373c;
		padding-left: 10px;
		margin-bottom: 7px;
	}
	legend {
		font-weight: bold;
	}
	fieldset table {
		margin-top: 0 !important;
	}
</style>