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

		$chart_data = unserialize(get_post_meta( $id, 'graphs_lite_data', true ));

		wp_localize_script( GRAPHS_LITE_NAME, 'gl', [
			'chart_id'   => $id,
			'chart_data' =>	json_encode( $chart_data ),
		] );

		include plugin_dir_path( __FILE__ ) . '../public/partials/graphs-lite-public-display.php';

		return ob_get_clean();
	}
}