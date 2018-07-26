<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://orchestra.ltd
 * @since      1.0.0
 *
 * @package    Graphs_Lite
 * @subpackage Graphs_Lite/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Graphs_Lite
 * @subpackage Graphs_Lite/admin
 * @author     Orchestra Technologies <ask@orchestra.ltd>
 */
class Graph_Lite_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		// add_action('admin_menu', array( $this, 'setting_page' ));
		add_action( 'admin_head', array( $this, 'mce_button' ) );
		add_action( 'add_meta_boxes', [ $this, 'adding_custom_meta_boxes' ], 10, 2 );
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Graph_Lite_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Graph_Lite_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/graphs-lite-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Graph_Lite_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Graph_Lite_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( 'Vuejs', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', array( 'jquery' ), $this->version, true );

		wp_enqueue_script( 'Chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js', array( 'jquery' ), $this->version, true );

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/graphs-lite-admin.js', array( 'jquery' ), $this->version, true );

		wp_enqueue_script( 'graphs-light-response', plugin_dir_url( __FILE__ ) . 'assets/js/graphs-lite-admin-response.js', array( 'jquery' ), $this->version, true );

		// wp_enqueue_style( 'graphs-light-npm-style', plugin_dir_url( __FILE__ ) . 'css/style.css' );

		// wp_enqueue_script( 'graphs-light-npm-js', plugin_dir_url( __FILE__ ) . 'js/scripts.js', array(), false, true );

	}

	// public function setting_page() {

	// 	add_options_page('Graph Lite', 'Graph Lite', 'manage_options', 'gl-admin-dashboard', array( $this, 'admin_dashboard' ));

	// }

	/**
	 * Register new button in TinyMCE
	 *
	 * @return array
	 */
	public function register_mce_button( $buttons ) {

		array_push( $buttons, 'graphs_lite_mce_btn' );

		return $buttons;
	}

	/**
	 * Adding button to TinyMCE
	 *
	 * @return void
	 */
	public function mce_button() {

		// check user permissions
		if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
			return;
		}

		// check if WYSIWYG is enabled
		if ( 'true' == get_user_option( 'rich_editing' ) ) {
			add_filter( 'mce_external_plugins', array( $this, 'button_for_tinymce_plugin' ) );
			add_filter( 'mce_buttons', array( $this, 'register_mce_button' ) );
		}

	}

	/**
	 * Declareing script for new button
	 *
	 * @return array
	 *
	 */
	public function button_for_tinymce_plugin( $plugin_array ) {

		$plugin_array['graphs_lite_mce_btn'] = plugins_url( '/js/tinyMCE_hooks.js', __FILE__ );

		return $plugin_array;
	}


	public function adding_custom_meta_boxes( $post_type, $post ) {
	    add_meta_box(
	        'gl-admin-meta-box',
	        __( 'Graph Light' ),
	        [$this, 'render_graph_light_admin_metabox'],
	        array('post','page'),
	        'normal',
	        'default'
	    );
	}


	public function render_graph_light_admin_metabox(){
		include plugin_dir_path( __FILE__ ) . '/partials/graphs-lite-admin-display.php';
	}

}