new Vue({
	el: '#app',
	data: {
		chartType: 'pie'
	},
	methods: {
		onLoad() {
			var ctx = document.getElementById("barChart");
			var myChart = new Chart(ctx, {
				type: this.chartType,
				data: {
					labels: ['Red', 'Yellow', 'Blue'],
					datasets: [
						{
							data: [10, 20, 30],
							backgroundColor: [
								'#FF0000',
								'#FFFF00',
								'#0000FF'
							]
						}
					]
				},
				options: {}
			});
		}
	},
	mounted() {
		this.onLoad();
	}
})
