<template>
	<div>
		<h1>All Charts</h1>
		<div v-for="(graph, index) in allGraph" :key="graph.graph_id">
			<div class="gl_single_graph">
				<div class="gl_graph_box">
					<canvas :id="index"></canvas>
				</div>
				<div class="gl_control_area">
					<button type="button">Edit</button>
					<button type="button" @click="deleteGraph(index)">Delete</button>
				</div>
			</div>
		</div>
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
				console.log(this.allGraph);
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
			deleteGraph(index) {
				let deletedGraphId = this.allGraph[index].graph_id;
				const outerThis = this;
				// this.allGraph.splice(index, 1);
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
							alert(response);
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
		},
		mounted() {
			this.onLoad();
		}
	}
</script>

<style>
	
</style>