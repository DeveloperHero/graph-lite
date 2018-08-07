export default {
	state: {
		allGraph: [
		{
			type: 'pie',
			data: {
				labels: ['A','B','C'],
				datasets: [
					{
						data: [4,5,6],
						backgroundColor: ['red','green','blue']
					}
				]
			},
			options: {
				title: {
					display: true,
					text: 'Pie Chart'
				},
				legend: {
					display: true,
					position: 'left'
				}
			},
			graph_id: 1
		}, {
			type: 'doughnut',
			data: {
				labels: ['A','B','C'],
				datasets: [
					{
						data: [4,5,6],
						backgroundColor: ['red','green','blue']
					}
				]
			},
			options: {
				title: {
					display: true,
					text: 'Doughnut Chart'
				},
				legend: {
					display: true,
					position: 'left'
				}
			},
			graph_id: 2
		},{
			type: 'polarArea',
			data: {
				labels: ['A','B','C'],
				datasets: [
					{
						data: [4,5,6],
						backgroundColor: ['red','green','blue']
					}
				]
			},
			options: {
				title: {
					display: true,
					text: 'Polar Area Chart'
				},
				legend: {
					display: true,
					position: 'left'
				}
			},
			graph_id: 3
		}],
		count: 0
	},
	getters: {
	},
	mutations: {
		addNewGraph(state, newGraph) {
			state.allGraph.push(newGraph);
		}
	},
	actions: {
		addNewGraph: (context, newGraph) => {
			context.commit('addNewGraph', newGraph);
		}
	}
}