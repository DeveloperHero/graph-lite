<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       http://orchestra.ltd
 * @since      1.0.0
 *
 * @package    Graph_Lite
 * @subpackage Graph_Lite/admin/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<button type="submit" class="close_graph_modal">Close</button>

<div class="graphsProject" id="app">
	<div class="graphsOptions">
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
		</table>
	</div>
	<div class="graphsDiv">
		<canvas id="barChart"></canvas>
	</div>
</div>