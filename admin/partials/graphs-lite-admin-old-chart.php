<div class="gl_old_graph">

	<?php

	$all_graphs = get_option('graphs_lite_all_data', true);

	foreach ($all_graphs as $key => $graph): ?>

		<div class="gl_single_graph">
			<div class="gl_graph_box">

			</div>
			<div class="gl_control_area">
				<button type="button">Edit</button>
				<button type="button">Delete</button>
			</div>
		</div>

	<?php endforeach; ?>

</div>