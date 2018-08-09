<template>
	<div class="scatterChart" id="scatter">
		<div class="graphOptions">
			<table class="form-table">
				<template v-for="(dataset, index) in datasets">
					<tr>
						<th scope="row"><label for="label">Label</label></th>
						<td><input class="regular-text" type="text" id="label" v-model="dataset.label" @keyup="addDatasetLabel(index)"></td>
					</tr>
					<tr>
						<th scope="row"><label for="datasets">Data</label></th>
							<td>
								<template v-for="(data, PIndex) in dataset.data">
									<div>
										<label for="xPoint">x-point</label>
										<input class="bubblePoints" type="number" id="xPoint" v-model="dataset.data[PIndex].x" @keyup="addDatasetDataPoints(index, PIndex, 'x')">
										<label for="xPoint">y-point</label>
										<input class="bubblePoints" type="number" id="yPoint" v-model="dataset.data[PIndex].y" @keyup="addDatasetDataPoints(index, PIndex, 'y')">
									</div>
								</template>
								<button type="button" @click="addBubblePoint(index)">Add Bubble Point</button>
							</td>
					</tr>
					<tr>
						<th scope="row"><label for="colors">Circle Background Color</label></th>
						<td><input class="regular-text" type="text" id="colors" v-model="dataset.backgroundColor" @keyup="addDatasetBgColor(index)"></td>
					</tr>
					<tr>
						<th scope="row"><label for="line_color">Circle Border Color</label></th>
						<td><input class="regular-text" type="text" id="line_color" v-model="dataset.borderColor" @keyup="addDatasetborderColor(index)"></td>
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
			<canvas id="scatterChart"></canvas>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['graphData', 'graphIndex'],
		data() {
			return {
				chartType: 'scatter',
				titleText: '',
				legendPosition: 'top',
				showTitle: false,
				showLegend: true,
				datasets: [
					{
						label: '',
						data: [
							{x: '', y: ''}
						],
						backgroundColor: '',
						borderColor: '',
						fill: false,
						showLine: false
					}
				]
			};
		},
		methods: {
			addDataset() {
				this.datasets.push({
					label: '',
					data: [
						{x: '', y: ''}
					],
					backgroundColor: '',
					borderColor: '',
					fill: false,
					showLine: false
				});
				this.theChart.data.datasets.push({
					label: '',
					data: [
						{x: '', y: ''}
					],
					backgroundColor: '',
					borderColor: '',
					fill: false,
					showLine: false
				});
				this.theChart.update();
			},
			addBubblePoint(index) {
				this.datasets[index].data.push({x: '', y: ''});
				this.theChart.data.datasets[index].data.push({x: '', y: ''});
				this.theChart.update();
			},
			addDatasetLabel(index) {
				this.theChart.data.datasets[index].label = this.datasets[index].label;
				this.theChart.update();
			},
			addDatasetDataPoints(index, pIndex, point) {
				this.theChart.data.datasets[index].data[pIndex][point] = this.datasets[index].data[pIndex][point];
				this.theChart.update();
			},
			addDatasetBgColor(index) {
				this.theChart.data.datasets[index].backgroundColor = this.datasets[index].backgroundColor;
				this.theChart.update();
			},
			addDatasetborderColor(index) {
				this.theChart.data.datasets[index].borderColor = this.datasets[index].borderColor;
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
			deleteDataset(index) {
				this.datasets.splice(index, 1);
				this.theChart.data.datasets.splice(index, 1);
				this.theChart.update();
			},
			saveGraphData() {
				let chartDatas = {
					type: this.chartType,
					data: {
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
				let outerThis = this;
				let chartDatas = {
					type: this.chartType,
					data: {
						datasets: []
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

				this.datasets.forEach(function(value, key) {
					chartDatas.data.datasets.push({
						label: value.label,
						data: value.data,
						backgroundColor: value.backgroundColor,
						borderColor: value.borderColor,
						fill: value.fill,
						showLine: value.showLine
					});
				});

				let payload = {'chartDetails': chartDatas, 'graphIndex': this.graphIndex, 'graph_id': this.graphData.graph_id};

				this.$store.dispatch('updateGraph', payload).then(function() {
					setTimeout(function() {
						outerThis.$emit("applied");
					}, 1000);
				});
			},
			onLoad() {
				let ctx = document.getElementById("scatterChart");
				this.theChart = new Chart(ctx, {
					type: this.chartType,
					data: {
						datasets: [
							{
								label: '',
								data: [
									{x: '', y: ''}
								],
								backgroundColor: '',
								borderColor: '',
								fill: false,
								showLine: false
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
				let outerThis = this;
				this.graphData.data.datasets.forEach(function(value, key) {
					if(key) {
						outerThis.datasets.push({ label: '', data: [{ x: '', y: '' }], backgroundColor:'', fill: false, showLine: false });
					}
					outerThis.datasets[key].label = value.label;
					value.data.forEach(function(innerValue, innerKey) {
						if(innerKey) {
							outerThis.datasets[key].data.push({ x: '', y: '' });
						}
						outerThis.datasets[key].data[innerKey].x = innerValue.x;
						outerThis.datasets[key].data[innerKey].y = innerValue.y;
					});
					outerThis.datasets[key].backgroundColor = value.backgroundColor;
					outerThis.datasets[key].borderColor = value.borderColor;
					outerThis.datasets[key].hoverRadius = 0;
				});

				this.showTitle = this.graphData.options.title.display;
				this.titleText = this.graphData.options.title.text;
				this.showLegend = this.graphData.options.legend.display;
				this.legendPosition = this.graphData.options.legend.position;

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
	.scatterChart {
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
	.bubblePoints {
		width: 50px;
	}
</style>