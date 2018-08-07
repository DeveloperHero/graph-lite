<template>
	<div>
		<component @applied="whenGraphUpdated" v-bind:is="currentChartTabComponent" :graph-data="editedGraphData" :graph-index="editedGraphIndex"></component>
		<div v-show="!currentComponent">
			<h1>All Charts</h1>
			<div class="gl_single_graph" v-for="(graph, index) in allGraph" :key="graph.graph_id">
				<div class="gl_graph_box">
					<canvas :id="index"></canvas>
				</div>
				<div class="gl_control_area">
					<button type="button" @click="useGraph(graph.graph_id)">Use</button>
					<button type="button" @click="editGraphDetails(index, graph.graph_id)">Edit</button>
					<button type="button" @click="deleteGraph(index)">Delete</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import barChart from './BarChartTemplate';
	import lineChart from './LineChartTemplate';
	import pieChart from './PieChartTemplate';
	import doughnutChart from './DoughnutChartTemplate';
	import radarChart from './RadarChartTemplate';
	import polarAreaChart from './PolarAreaChartTemplate';
	import bubbleChart from './BubbleChartTemplate';
	import scatterChart from './ScatterChartTemplate';
	import { mapState, mapMutations } from 'vuex';

	export default {
		data() {
			return {
				currentComponent: '',
				editedGraphData: [],
				editedGraphIndex: '',
				theChart: []
			}
		},
		computed: {
			allGraph() {
				return this.$store.state.allGraph;
			},
			currentChartTabComponent: function () {
                return this.currentComponent;
            }
		},
		components: {
	        pieChart, doughnutChart, polarAreaChart, barChart, lineChart, radarChart, bubbleChart, scatterChart
	    },
		methods: {
			onLoad() {
				let outerThis = this;
				this.allGraph.forEach(function(value, key) {
					var ctx = document.getElementById(key);
					outerThis.theChart[key] = new Chart(ctx, {
						type: value.type,
						data: value.data,
						options: value.options
					});
				});
			},
			// @mishuk
			useGraph(id){
				var content = '[graph_lite id="'+id+'"]';
				tinymce.activeEditor.execCommand('mceInsertContent', false, content);
				$('#gl-admin-meta-box').fadeOut();
			},
			editGraphDetails(index, id) {
				let chartType = this.allGraph[index].type+"Chart";
				this.editedGraphData = this.allGraph[index];
				this.editedGraphIndex = index;
				this.currentComponent = chartType;
			},
			whenGraphUpdated(data, index) {
				this.currentComponent = '';
				this.allGraph[index].data = data.data;
				this.allGraph[index].options = data.options;


				this.theChart[index].data.datasets = data.data.datasets;
				this.theChart[index].options.legend.display = data.options.legend.display;
				this.theChart[index].options.legend.position = data.options.legend.position;
				this.theChart[index].options.title.display = data.options.title.display;
					this.theChart[index].options.title.text = data.options.title.text;

				if( data.type == "pie" || data.type == "doughnut" || data.type == "polarArea" || data.type == "bar" || data.type == "line" || data.type == "radar" ) {
					this.theChart[index].data.labels = data.data.labels;
				}
				if( data.type == "bar" || data.type == "line" ) {
					this.theChart[index].options.scales.yAxes[0].ticks.beginAtZero = data.options.scales.yAxes[0].ticks.beginAtZero;
				}
				if( data.type == "radar") {
					this.theChart[index].options.scale.ticks.beginAtZero = data.options.scale.ticks.beginAtZero;
				}

				this.theChart[index].update();
			},
			deleteGraph(index) {
				let deletedGraphId = this.allGraph[index].graph_id;
				const outerThis = this;

				if(confirm("Are you sure to delete this chart?")) {
					$.ajax({
						url: ajaxurl,
						type: 'POST',
						dataType: 'json',
						data: {
							action: 'delete_chart',
							graph_id: deletedGraphId,
						},
						success: function( response ) {
							$.sweetModal({
								content: response,
								icon: $.sweetModal.ICON_SUCCESS,
								timeout: 1300,
								showCloseButton: false
							});
							setTimeout(function(){
								outerThis.allGraph.splice(index, 1);
							}, 1310)
						},
						error: function( error ) {
							alert('Something went wront please try again');
						}
					});
				}
			}
		},
		mounted() {
			this.onLoad();
		}
	}
</script>

<style>

</style>