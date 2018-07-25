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
					<td><input type="text" id="labels" v-model="chartlabelString" @keyup="addLabels"></td>
				</tr>
				<tr>
					<th scope="row"><label for="datasets">Datasets</label></th>
					<td><input type="text" id="datasets" v-model="chartDatasetDataString" @keyup="addDatasetData"></td>
				</tr>
				<tr>
					<th scope="row"><label for="colors">Color</label></th>
					<td><input type="text" id="colors" v-model="chartDatasetBgColorString" @keyup="addDatasetBgColor"></td>
				</tr>
			</table>
		</div>
		<div class="graphDiv">
			<canvas id="barChart"></canvas>
		</div>
	</div>
</body>
</html>