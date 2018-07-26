<?php

/**
 *
 */
class Graph_Light_Shortcode
{

	public function __construct()
	{
		add_shortcode( 'graph_light', [$this, 'graph_light_shortcode'] );
	}

	public function graph_light_shortcode($atts)
	{
		ob_start();

		extract(shortcode_atts( array(
			'id'	=> '',
		), $atts ));

		include plugin_dir_path( __FILE__ ) . '../public/partials/graphs-lite-public-display.php';

		return ob_get_clean();
	}
}