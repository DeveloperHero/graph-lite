<template>
	<div class="scatterChart gl_chart_template" id="scatter">
		<div class="graphOptions">
			<table class="form-table">
				<tr>
					<th scope="row" class="gl_backButotnTh">
						<img src="./../../images/back-arrow.png" @click="goBacktoAllGraphPage" class="gl_backButtonImage">
					</th>
					<td class="gl_backButotnTh">
						<p class="gl_fieldRequiredError" v-if="fieldsRequired">Field(s) required</p>
					</td>
				</tr>
			</table>

			<fieldset v-for="(dataset, index) in datasets" :key="dataset">
				<legend>Dataset {{index+1}}</legend>
				<table class="form-table">
					<tr>
						<th scope="row"><label for="label">Label</label></th>
						<td><input class="regular-text" type="text" id="label" placeholder="Dataset label" v-model="dataset.label" @keyup="addDatasetLabel(index)"></td>
					</tr>
					<tr>
						<th scope="row"><label for="datasets">Data*</label></th>
							<td>
								<template v-for="(data, PIndex) in dataset.data">
									<div class="gl_bb_point">
										<div class="button_input_fields">
											<div class="gl_bb_xp">
												<label for="xPoint">x-point</label>
												<input class="bubblePoints" :class="{'gl_fieldRequired': data.ifxPointEmpty}" type="number" id="xPoint" v-model="dataset.data[PIndex].x" @keyup="addDatasetDataPoints(index, PIndex, 'x')" @mouseup="addDatasetDataPoints(index, PIndex, 'x')">
											</div>
											<div class="gl_bb_yp">
												<label for="yPoint">y-point</label>
												<input class="bubblePoints" :class="{'gl_fieldRequired': data.ifyPointEmpty}" type="number" id="yPoint" v-model="dataset.data[PIndex].y" @keyup="addDatasetDataPoints(index, PIndex, 'y')" @mouseup="addDatasetDataPoints(index, PIndex, 'y')">
											</div>
										</div>
										<div v-if="PIndex != 0">
											<a href="javascript:void(0)" class="deleteButtonPoint" @click="deleteButtonPoint(index, PIndex)">X</a>
										</div>
									</div>
								</template>
								<button type="button" @click="addBubblePoint(index)">Add Bubble Point</button>
							</td>
					</tr>
					<tr>
						<th scope="row" style="padding-top: 5px; padding-bottom: 5px"><label for="colors">Circle Background Color*</label></th>
						<td><input class="regular-text" :class="{'gl_fieldRequired': dataset.ifCircleBackgroundEmpty}" type="text" id="colors" v-model="dataset.backgroundColor" @keyup="addDatasetBgColor(index)"></td>
					</tr>
					<tr>
						<th scope="row" style="padding-top: 5px; padding-bottom: 5px"><label for="line_color">Circle Border Color*</label></th>
						<td><input class="regular-text" :class="{'gl_fieldRequired': dataset.ifCicleBorderColorEmpty}" type="text" id="line_color" v-model="dataset.borderColor" @keyup="addDatasetborderColor(index)"></td>
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
			<div class="gl_graphChildDiv">
				<canvas id="scatterChart"></canvas>
			</div>
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
				fieldsRequired: false,
				datasets: [
					{
						label: '',
						data: [
							{
								x: '',
								y: '',
								ifxPointEmpty: false,
								ifyPointEmpty: false
							}
						],
						backgroundColor: '',
						borderColor: '',
						fill: false,
						showLine: false,
						ifCircleBackgroundEmpty: false,
						ifCicleBorderColorEmpty: false
					}
				]
			};
		},
		methods: {
			addDataset() {
				this.datasets.push({
					label: '',
					data: [
						{
							x: '',
							y: '',
							fxPointEmpty: false,
							ifyPointEmpty: false
						}
					],
					backgroundColor: '',
					borderColor: '',
					fill: false,
					showLine: false,
					ifCircleBackgroundEmpty: false,
					ifCicleBorderColorEmpty: false
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
				this.datasets[index].data.push({ x: '', y: '', ifxPointEmpty: false, ifyPointEmpty: false });
				this.theChart.data.datasets[index].data.push({x: '', y: ''});
				this.theChart.update();
			},
			addDatasetLabel(index) {
				this.theChart.data.datasets[index].label = this.datasets[index].label;
				this.theChart.update();
			},
			addDatasetDataPoints(index, pIndex, point) {
				let gettingErrorPoint = 'if'+point+'PointEmpty';
				if(this.datasets[index].data[pIndex][gettingErrorPoint]) {
					this.datasets[index].data[pIndex][gettingErrorPoint] = false;
				}
				this.theChart.data.datasets[index].data[pIndex][point] = this.datasets[index].data[pIndex][point];
				this.theChart.update();
			},
			addDatasetBgColor(index) {
				if(this.datasets[index].ifCircleBackgroundEmpty) {
					this.datasets[index].ifCircleBackgroundEmpty = false;
				}
				this.theChart.data.datasets[index].backgroundColor = this.datasets[index].backgroundColor;
				this.theChart.update();
			},
			addDatasetborderColor(index) {
				if(this.datasets[index].ifCicleBorderColorEmpty) {
					this.datasets[index].ifCicleBorderColorEmpty = false;
				}
				this.theChart.data.datasets[index].borderColor = this.datasets[index].borderColor;
				this.theChart.update();
			},
			addTitleText() {
				this.titleText !== '' ? this.showTitle = true : this.showTitle = false;
				this.theChart.options.title.display = this.showTitle;
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
			deleteButtonPoint(datasetIndex, bubblePointIndex) {
				this.datasets[datasetIndex].data.splice(bubblePointIndex, 1);
				this.theChart.data.datasets[datasetIndex].data.splice(bubblePointIndex, 1);
				this.theChart.update();
			},
			saveGraphData() {
				let outerThis = this;
				let DatasetHasEmptyValue = true

				this.datasets.forEach(function(value) {
					if(value.backgroundColor === '') {
						value.ifCircleBackgroundEmpty = true;
						DatasetHasEmptyValue = false;
						outerThis.fieldsRequired = true;
					}
					if(value.borderColor === '') {
						value.ifCicleBorderColorEmpty = true;
						DatasetHasEmptyValue = false;
						outerThis.fieldsRequired = true;
					}

					value.data.forEach(function(data) {
						if(data.x === '') {
							data.ifxPointEmpty = true;
							DatasetHasEmptyValue = false;
							outerThis.fieldsRequired = true;
						}
						if(data.y === '') {
							data.ifyPointEmpty = true;
							DatasetHasEmptyValue = false;
							outerThis.fieldsRequired = true;
						}
					})
				});

				if(DatasetHasEmptyValue) {
					let chartDatas = {
						type: this.chartType,
						data: {
							datasets: this.datasets
						},
						options: {
							maintainAspectRatio: false,
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
					if(value.backgroundColor === '') {
						value.ifCircleBackgroundEmpty = true;
						DatasetHasEmptyValue = false;
						outerThis.fieldsRequired = true;
					}
					if(value.borderColor === '') {
						value.ifCicleBorderColorEmpty = true;
						DatasetHasEmptyValue = false;
						outerThis.fieldsRequired = true;
					}

					value.data.forEach(function(data) {
						if(data.x === '') {
							data.ifxPointEmpty = true;
							DatasetHasEmptyValue = false;
							outerThis.fieldsRequired = true;
						}
						if(data.y === '') {
							data.ifyPointEmpty = true;
							DatasetHasEmptyValue = false;
							outerThis.fieldsRequired = true;
						}
					})
				});

				if(DatasetHasEmptyValue) {
					let chartDatas = {
						type: this.chartType,
						data: {
							datasets: []
						},
						options: {
							maintainAspectRatio: false,
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
							outerThis.$emit("updated");
						}, 2000);
					});
				}
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
						maintainAspectRatio: false,
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
						outerThis.datasets.push({ label: '', data: [{ x: '', y: '', ifxPointEmpty: false, ifyPointEmpty: false }], backgroundColor:'', fill: false, showLine: false, ifCircleBackgroundEmpty: false, ifCicleBorderColorEmpty: false });
						outerThis.theChart.data.datasets.push({ label: '', data: [{ x: '', y: '' }], backgroundColor:'', fill: false, showLine: false });
					}
					outerThis.theChart.data.datasets[key].label = outerThis.datasets[key].label = value.label;
					value.data.forEach(function(innerValue, innerKey) {
						if(innerKey) {
							outerThis.datasets[key].data.push({ x: '', y: '' });
							outerThis.theChart.data.datasets[key].data.push({ x: '', y: '' });
						}
						outerThis.theChart.data.datasets[key].data[innerKey].x = outerThis.datasets[key].data[innerKey].x = innerValue.x;
						outerThis.theChart.data.datasets[key].data[innerKey].y = outerThis.datasets[key].data[innerKey].y = innerValue.y;
					});
					outerThis.theChart.data.datasets[key].backgroundColor = outerThis.datasets[key].backgroundColor = value.backgroundColor;
					outerThis.theChart.data.datasets[key].borderColor = outerThis.datasets[key].borderColor = value.borderColor;
				});

				this.theChart.options.title.display = this.showTitle = this.graphData.options.title.display;
				this.theChart.options.title.text = this.titleText = this.graphData.options.title.text;
				this.theChart.options.legend.display = this.showLegend = this.graphData.options.legend.display;
				this.theChart.options.legend.position = this.legendPosition = this.graphData.options.legend.position;
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
	.bubblePoints {
		width: 50px;
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
	.button_input_fields {
		padding-right: 8px;
	}
	.deleteButtonPoint {
		text-decoration: none;
		font-size: 13px;
		color: black;
	}
</style>