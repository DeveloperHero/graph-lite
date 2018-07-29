<template>
	<div class="bubbleChart" id="bubble">
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
										<label for="radius">Bubble Radius</label>
										<input class="bubblePoints" type="number" id="radius" v-model="dataset.data[PIndex].r" @keyup="addDatasetDataPoints(index, PIndex, 'r')">
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
					<td><button type="button" class="saveGraphData" @click="saveGraphData">Save</button></td>
				</tr>
			</table>
		</div>
		<div class="graphDiv">
			<canvas id="bubbleChart"></canvas>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				chartType: 'bubble',
				titleText: '',
				legendPosition: 'top',
				showTitle: false,
				showLegend: true,
				datasets: [
					{
						label: '',
						data: [
							{x: '', y: '', r: ''}
						],
						backgroundColor: '',
						borderColor: ''
					}
				]
			};
		},
		methods: {
			addDataset() {
				this.datasets.push({
					label: '',
					data: [
						{x: '', y: '', r: ''}
					],
					backgroundColor: '',
					borderColor: ''
				});
				this.theChart.data.datasets.push({
					label: '',
					data: [
						{x: '', y: '', r: ''}
					],
					backgroundColor: '',
					borderColor: ''
				});
				this.theChart.update();
			},
			addBubblePoint(index) {
				this.datasets[index].data.push({x: '', y: '', r: ''});
				this.theChart.data.datasets[index].data.push({x: '', y: '', r: ''});
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
				// var chartDatas = {'type':this.chartType, 'datasets': this.datasets, 'title_show': this.showTitle, 'title_text': this.titleText, 'legend_show': this.showLegend, 'legend_position': this.legendPosition};
				var chartDatas = {
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

				$.ajax({
					url: gl.ajax_url,
					type: 'POST',
					dataType: 'json',
					data: {
						action: 'save_chart',
						graph_data: chartDatas,
					},
					success: function( response ) {
						var content = '[graph_lite id="'+response+'"]';
						tinymce.activeEditor.execCommand('mceInsertContent', false, content);
						$('#gl-admin-meta-box').fadeOut();
						$('div#gl-admin-meta-box').find('input:text').val('');
					},
					error: function( error ) {
						alert('Something went wront please try again');
					}
				});
			},
			onLoad() {
				var ctx = document.getElementById("bubbleChart");
				this.theChart = new Chart(ctx, {
					type: this.chartType,
					data: {
						datasets: [
							{
								label: '',
								data: [
									{x: '', y: '',r: ''}
								],
								backgroundColor: '',
								borderColor: '',
								hoverRadius: 0
							}
						],
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
	.bubbleChart {
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