<template>
	<div>
		<h1>All Charts</h1>
		<template v-for="(graph, index) in allGraph" :key="graph.graph_id">
			<div class="gl_single_graph">
				<div class="gl_graph_box">
					<canvas :id="index"></canvas>
				</div>
				<div class="gl_control_area">
					<button type="button" @click="useGraph(graph.graph_id)">Use</button>
					<button type="button" @click="editGraphDetails(index, graph.graph_id)">Edit</button>
					<button type="button" @click="deleteGraph(index)">Delete</button>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				allGraph: []
			}
		},
		methods: {
			beforeLoad() {
				this.allGraph = gl.all_graphs;
			},
			whenCalled() {
				let outerThis = this;
				this.$eventHub.$on('ChartDataPassed', data => {
					outerThis.allGraph.push(data);
				});
			},
			onLoad() {
				this.allGraph.forEach(function(value, key) {
					var ctx = document.getElementById(key);
					new Chart(ctx, {
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
				let editedGraphData = this.allGraph[index];
				console.log(chartType);
				console.log(index);
				console.log(id);
				console.log(router);
				router.push({ name: chartType, params: { graph_data: editedGraphData }});
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
							outerThis.allGraph.splice(index, 1);
						},
						error: function( error ) {
							alert('Something went wront please try again');
						}
					});
				}
			}
		},
		beforeMount() {
			this.beforeLoad();
			this.whenCalled();
		},
		mounted() {
			this.onLoad();
		}
	}
</script>

<style>

</style>