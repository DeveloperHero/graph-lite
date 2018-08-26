<template>
	<div class="PolarAreaChart gl_chart_template" id="PolarArea">
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
				<tr>
					<th scope="row"><label for="datasets">Data*</label></th>
					<td><input class="regular-text" :class="{'gl_fieldRequired': ifDataEmpty}" type="text" id="datasets" placeholder="Numeric data value for each label. Eg. 1,2,3 etc" v-model="chartDatasetDataString" @keyup="addDatasetData"></td>
				</tr>
				<tr>
					<th scope="row"><label for="colors">Color*</label></th>
					<td><input class="regular-text" :class="{'gl_fieldRequired': ifBackgroundEmpty}"  type="text" id="colors" placeholder="Color value for each label. Eg. red, green, blue" v-model="chartDatasetBgColorString" @keyup="addDatasetBgColor"></td>
				</tr>
				<tr>
					<th scope="row"><label for="labels">Labels*</label></th>
					<td><input class="regular-text" :class="{'gl_fieldRequired': ifLabelEmpty}" type="text" id="labels" placeholder="Comma separated list of labels" v-model="chartlabelString" @keyup="addLabels"></td>
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
				<canvas id="PolarAreaChart"></canvas>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		props: ['graphData', 'graphIndex'],
		data() {
			return {
				chartType: 'polarArea',
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
				showLegend: true,
				ifLabelEmpty: false,
				ifDataEmpty: false,
				ifBackgroundEmpty: false,
				fieldsRequired: false
			};
		},
		methods: {
			addLabels() {
				if(this.ifLabelEmpty) {
					this.ifLabelEmpty = false;
				}
				this.labels = this.chartlabelString.split(',');
				this.theChart.data.labels = this.labels;
				this.theChart.update();
			},
			addDatasetData() {
				if(this.ifDataEmpty) {
					this.ifDataEmpty = false;
				}
				this.datasets[0].data = this.chartDatasetDataString.split(',');
				this.theChart.data.datasets[0].data = this.datasets[0].data;
				this.theChart.update();
			},
			addDatasetBgColor() {
				if(this.ifBackgroundEmpty) {
					this.ifBackgroundEmpty = false;
				}
				this.datasets[0].backgroundColor = this.chartDatasetBgColorString.split(',');
				this.theChart.data.datasets[0].backgroundColor = this.datasets[0].backgroundColor;
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
			saveGraphData() {
				let outerThis = this;

				if(this.chartlabelString === '' || this.chartDatasetDataString === '' || this.chartDatasetBgColorString === '') {
					this.fieldsRequired = true;
					if(this.chartlabelString === '') {
						this.ifLabelEmpty = true;
					}
					if(this.chartDatasetDataString === '') {
						this.ifDataEmpty = true;
					}
					if(this.chartDatasetBgColorString === '') {
						this.ifBackgroundEmpty = true;
					}
				}

				if(this.chartlabelString !== '' && this.chartDatasetDataString !== '' && this.chartDatasetBgColorString !== '') {
					let chartDatas = {
						type: this.chartType,
						data: {
							labels: this.labels,
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

				if(this.chartlabelString === '' || this.chartDatasetDataString === '' || this.chartDatasetBgColorString === '') {
					this.fieldsRequired = true;
					if(this.chartlabelString === '') {
						this.ifLabelEmpty = true;
					}
					if(this.chartDatasetDataString === '') {
						this.ifDataEmpty = true;
					}
					if(this.chartDatasetBgColorString === '') {
						this.ifBackgroundEmpty = true;
					}
				}

				if(this.chartlabelString !== '' && this.chartDatasetDataString !== '' && this.chartDatasetBgColorString !== '') {
					let chartDatas = {
						type: this.chartType,
						data: {
							labels: this.labels,
							datasets: [
								{
									data: this.datasets[0].data,
									backgroundColor: this.datasets[0].backgroundColor
								}
							]
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

					let payload = {'chartDetails': chartDatas, 'graphIndex': this.graphIndex, 'graph_id': this.graphData.graph_id};

					this.$store.dispatch('updateGraph', payload).then(function() {
						setTimeout(function() {
							outerThis.$emit("updated");
						}, 2000);
					});
				}
			},
			onLoad() {
				let ctx = document.getElementById("PolarAreaChart");
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
				this.chartlabelString = this.graphData.data.labels.join(", ");
				this.theChart.data.labels = this.labels = this.graphData.data.labels;

				this.chartDatasetBgColorString = this.graphData.data.datasets[0].backgroundColor.join(", ");
				this.theChart.data.datasets[0].backgroundColor = this.datasets[0].backgroundColor = this.graphData.data.datasets[0].backgroundColor;

				this.chartDatasetDataString = this.graphData.data.datasets[0].data.join(", ");
				this.theChart.data.datasets[0].data = this.datasets[0].data = this.graphData.data.datasets[0].data;

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
	.PolarAreaChart {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}
	.graphOptions {
		width: 50%;
		padding-top: 20px;
	}
	.PolarAreaChart .graphDiv {
		width: 50%;
	}
	.PolarAreaChart .graphDiv .gl_graphChildDiv {
		position: fixed;
		width: 40%;
		height: 65%;
		right: 5%;
		top: 150px;
	}
	.saveGraphDataButton {
		display: block;
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
</style>