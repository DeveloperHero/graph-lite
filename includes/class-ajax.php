<?php

/**
 * The file that defines the crude operation by ajax
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://orchestra.ltd
 * @since      1.0.0
 *
 * @package    Graph_Lite
 * @subpackage Graph_Lite/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Graph_Lite
 * @subpackage Graph_Lite/includes
 * @author     Orchestra Technologies <ask@orchestra.ltd>
 */
class Graph_Lite_Ajax
{

	public function __construct()
	{
		add_action( 'wp_ajax_save_chart', [$this, 'save_chart'] );
		add_action( 'wp_ajax_save_chart', [$this, 'update_chart'] );
		add_action( 'wp_ajax_save_chart', [$this, 'delete_chart'] );
	}

	public function save_chart() {

		$data = $_POST['graph_data'];

		$post_id = wp_insert_post( [
			'post_type'      => 'graphs_light',
			'post_title'     => $data['title_text'],
			'post_status'    => 'publish',
			'comment_status' => 'closed'
		] );

		update_post_meta( $post_id, 'graphs_light_data', serialize($data) );

		wp_send_json( $post_id );

	}

	public function update_chart() {

		wp_update_post( [
			'ID'           => 37,
			'post_title'   => '',
		] );

		update_post_meta( $post_id, 'graphs_light_data', serialize($_POST['data']) );

	}

	public function delete_chart() {

		wp_delete_post( $_POST['graph_id'], true );
		delete_post_meta( $_POST['graph_id'], 'graphs_light_data' );

	}
}