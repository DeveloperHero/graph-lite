<?php

/**
 *
 */
class Graph_Lite_Shortcode
{

	public function __construct()
	{
		add_shortcode( 'graph_lite', [$this, 'graph_lite_shortcode'] );
	}

	public function graph_lite_shortcode($atts)
	{
		ob_start();

		extract(shortcode_atts( array(
			'id'	=> '',
		), $atts ));

		$chart_data = unserialize(get_post_meta( $id, 'graphs_light_data', true ));

		include plugin_dir_path( __FILE__ ) . '../public/partials/graphs-lite-public-display.php';

		return ob_get_clean();
	}
}