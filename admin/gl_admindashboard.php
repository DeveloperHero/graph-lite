<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Bingo</title>
</head>
<body>
	<h1>Bingo</h1>
	<div class="graphProject" id="app">
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
					<td>
						<input type="checkbox" id="title" v-model="showTitle" @change="showingGraphTitle">
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="titleText">Title Text</label></th>
					<td>
						<input type="text" id="titleText" v-model="titleText" @keyup="addTitleText">
					</td>
				</tr>
				<tr>
					<th scope="row"><label for="legend">Show Legend</label></th>
					<td>
						<input type="checkbox" id="legend" v-model="showLegend" @change="showingGraphLegend">
					</td>
				</tr>
			</table>
		</div>
		<div class="graphDiv">
			<canvas id="barChart"></canvas>
		</div>
	</div>
</body>
</html>