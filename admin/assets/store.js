import axios from 'axios';
import querystring from 'querystring';

export default {
	state: {
		allGraph: []
	},
	getters: {
		allGraph: state => {
			return state.allGraph;
		}
	},
	mutations: {
		onLoad(state) {
			state.allGraph = global_chart_data;
		},
		addNewGraph(state, newGraph) {
			state.allGraph.push(newGraph);
		},
		editGraph(state, details) {
			let dataIndex = details.graphIndex;
			let graphDetails = details.chartDetails;
			state.allGraph[dataIndex].data = graphDetails.data;
			state.allGraph[dataIndex].options = graphDetails.options;
		},
		deleteGraph(state, index) {
			state.allGraph.splice(index, 1);
		}
	},
	actions: {
		onLoad: context => {
			context.commit('onLoad');
		},
		addNewGraph: (context, newGraph) => {
			$.ajax({
				url: gl.ajax_url,
				type: 'POST',
				dataType: 'json',
				data: {
					action: 'save_chart',
					graph_data: newGraph,
				},
				success: function( response ) {
					newGraph.graph_id = response;
					context.commit('addNewGraph', newGraph);
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
		editGraph(context, editedGraphDetails) {
			let outerThis = this;
			let graphIndex = editedGraphDetails.graphIndex;
			let graphDetails = editedGraphDetails.chartDetails;
			let graphId = editedGraphDetails.chartDetails.graph_id;

			axios.post(gl.ajax_url, querystring.stringify({action: 'save_chart', graph_id: graphId, updated_graph_data: graphDetails}), {
				  'content-type': 'multipart/form-data'
			})
			.then(function(response) {
				context.commit('editGraph', editedGraphDetails);

				$.sweetModal({
					content: 'Graph id '+ response + ' updated',
					icon: $.sweetModal.ICON_SUCCESS,
					timeout: 1300,
					showCloseButton: false
				});
				setTimeout(function(){
					// outerThis.$emit("applied", graphIndex);
				}, 1500);
			}).catch(function (error) {
				alert('Something went wront please try again');
			});
		},
		deleteGraph: (context, index) => {
			context.commit('deleteGraph', index);
		}
	}
}