<template>
	<div>
		<component @applied="whenGraphUpdated" v-bind:is="currentChartTabComponent" :graph-data="editedGraphData" :graph-index="editedGraphIndex"></component>
		<div v-show="!currentComponent">
			<transition name="slide-fade" mode="out-in">
				<div class="gl_single_graph" v-if="docState === 'add'">
					<div class="gl_graph_box">
					</div>
					<div class="gl_control_area">
						<button type="button" @click="docState = 'create'">Add</button>
					</div>
				</div>
				<div class="gl_single_graph" v-if="docState === 'create'">
					<div class="gl_graph_box">
						<button type="button">Create</button>
						<button type="button" @click="docState = 'add'">Cancel</button>
					</div>
				</div>
			</transition>
			<div class="gl_single_graph" v-for="(graph, index) in allGraph" :key="graph.graph_id">
				<div class="gl_graph_box">
					<canvas :id="index"></canvas>
				</div>
				<div class="gl_control_area">
					<button type="button" @click="useGraph(graph.graph_id)">Use</button>
					<button type="button" @click="editGraphDetails(index)">Edit</button>
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
	import { mapGetters } from 'vuex';

	export default {
		data() {
			return {
				currentComponent: '',
				editedGraphData: [],
				editedGraphIndex: '',
				theChart: [],
				docState: 'add'
			}
		},
		computed: {
			currentChartTabComponent: function () {
                return this.currentComponent;
            },
            ...mapGetters(['allGraph'])
		},
		components: {
	        pieChart, doughnutChart, polarAreaChart, barChart, lineChart, radarChart, bubbleChart, scatterChart
	    },
		methods: {
			onLoad() {
				console.log(this.allGraph);
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
			editGraphDetails(index) {
				let chartType = this.allGraph[index].type+"Chart";
				this.editedGraphData = this.allGraph[index];
				this.editedGraphIndex = index;
				this.currentComponent = chartType;
			},
			whenGraphUpdated(updateChart) {
				let index = this.$store.state.editedGraphIndex;
				this.currentComponent = '';

				if(updateChart) {
					this.theChart[index].data.datasets = this.allGraph[index].data.datasets;
					this.theChart[index].options.legend.display = this.allGraph[index].options.legend.display;
					this.theChart[index].options.legend.position = this.allGraph[index].options.legend.position;
					this.theChart[index].options.title.display = this.allGraph[index].options.title.display;
						this.theChart[index].options.title.text = this.allGraph[index].options.title.text;

					if( this.allGraph[index].type == "pie" || this.allGraph[index].type == "doughnut" || this.allGraph[index].type == "polarArea" || this.allGraph[index].type == "bar" || this.allGraph[index].type == "line" || this.allGraph[index].type == "radar" ) {
						this.theChart[index].data.labels = this.allGraph[index].data.labels;
					}
					if( this.allGraph[index].type == "bar" || this.allGraph[index].type == "line" ) {
						this.theChart[index].options.scales.yAxes[0].ticks.beginAtZero = this.allGraph[index].options.scales.yAxes[0].ticks.beginAtZero;
					}
					if( this.allGraph[index].type == "radar") {
						this.theChart[index].options.scale.ticks.beginAtZero = this.allGraph[index].options.scale.ticks.beginAtZero;
					}

					this.theChart[index].update();
				}
			},
			deleteGraph(index) {
				let deletedGraphId = this.allGraph[index].graph_id;
				const outerThis = this;

				$.sweetModal.confirm('Are you sure to delete this ('+deletedGraphId+') chart?', function() {
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
								outerThis.$store.dispatch('deleteGraph', index);
							}, 1310)
						},
						error: function( error ) {
							alert('Something went wront please try again');
						}
					});
				});
			}
		},
		mounted() {
			this.onLoad();
		}
	}
</script>

<style>

</style>