<template>
	<div class="pieChart" id="pie">
		<div class="graphOptions">
			<table class="form-table">
				<tr>
					<th scope="row"><label for="labels">Labels</label></th>
					<td><input class="regular-text" type="text" id="labels" v-model="chartlabelString" @keyup="addLabels"></td>
				</tr>
				<tr>
					<th scope="row"><label for="datasets">Datasets</label></th>
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
					<td><button type="button" class="saveGraphData" @click="saveGraphData">Save</button></td>
				</tr>
			</table>
		</div>
		<div class="graphDiv">
			<canvas id="pieChart"></canvas>
		</div>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios';
	import querystring from 'querystring';

	export default {
		data() {
			return {
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
			};
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
			saveGraphData() {
				var chartDatas = {
					'type':this.chartType, 'labels': this.labels, 'data': this.DatasetData, 'backgroundColor': this.DatasetBgColor, 'title_show': this.showTitle, 'title_text': this.titleText, 'legend_show': this.showLegend, 'legend_position': this.legendPosition
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
					},
					error: function( error ) {
						alert('Something went wront please try again');
					}
				});


				// var chart_data = JSON.stringify(chartDatas);
				// var route = gl.save_ajax_url;
				// axios.post(route, {chart_data})
				// .then((response) => {
				// 	var content = '[graph_lite id="'+response.data+'"]';	tinymce.activeEditor.execCommand('mceInsertContent', false, content);	$('#gl-admin-meta-box').fadeOut();
				// });
			},
			onLoad() {
				var ctx = document.getElementById("pieChart");
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
	}
</script>

<style type="text/css">
	.pieChart {
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