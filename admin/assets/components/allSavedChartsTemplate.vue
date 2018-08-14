<template>
	<div>
		<div style="text-align: right; font-weight: bold; font-size: 18px;"><a href="javascript:void(0)" style="text-decoration: none; color: #000; box-shadow: none;" @click="resetComponent" class="close_graph_modal">X</a></div>
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
						<div class="gl_chart_dropdown_area">
				            <!-- <p class="gl_chart_template_title"></p> -->
				            <div class="dropdown gl_chart_dropdown">
				                <button class="dropbtn">Select a chart</button>
				                <div class="dropdown-content">
				                    <a href="javascript:void(0)"
				                       v-for="(chartTab, index) in chartTabs"
				                       v-bind:key="chartTab.tabFileName"
				                       @click="changeTabChart(index)">{{ chartTab.tabName }}</a>
				                </div>
				            </div>
				        </div>
						<button type="button" @click="docState = 'add'">Cancel</button>
					</div>
				</div>
			</transition>
			<div class="gl_single_graph" v-for="(graph, index) in allGraph" :key="graph.graph_id">
				<div class="gl_graph_box">
					<canvas :id="index"></canvas>
				</div>
				<div class="gl_control_area">
					<button type="button" @click="useGraph(graph.graph_id)">Insert</button>
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
				docState: 'add',
				chartTabs: [
	                { tabFileName: 'pieChart', tabName: 'Pie Chart' },
	                { tabFileName: 'doughnutChart', tabName: 'Doughnut Chart' },
	                { tabFileName: 'polarAreaChart', tabName: 'Polar Area Chart' },
	                { tabFileName: 'barChart', tabName: 'Bar Chart' },
	                { tabFileName: 'lineChart', tabName: 'Line Chart' },
	                { tabFileName: 'radarChart', tabName: 'Radar Chart' },
	                { tabFileName: 'bubbleChart', tabName: 'Bubble Chart' },
	                { tabFileName: 'scatterChart', tabName: 'Scatter Chart' }
	            ]
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
			changeTabChart(index) {
	            this.currentComponent = this.chartTabs[index].tabFileName;
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
			},
			resetComponent() {
				let outerThis = this;
				setTimeout(function() {
					outerThis.currentComponent = '';
				}, 500);
			}
		},
		mounted() {
			this.onLoad();
		}
	}
</script>

<style>
    .dropbtn {
        background-color: #3473aa;
        color: white;
        padding: 10px;
        font-size: 16px;
        border: none;
        cursor: pointer;
        min-width: 130px;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
    .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }
    .dropdown-content a {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }
    .dropdown-content a:hover {
        background-color: #f1f1f1
    }
    .dropdown:hover .dropdown-content {
        display: block;
    }
    .dropdown:hover .dropbtn {
        background-color: #3e8e41;
    }
</style>