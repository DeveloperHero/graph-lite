<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://orchestra.ltd
 * @since      1.0.0
 *
 * @package    Graph_Light
 * @subpackage Graph_Light/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Graph_Light
 * @subpackage Graph_Light/admin
 * @author     Orchestra Technologies <ask@orchestra.ltd>
 */
class Graph_Light_Admin {

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

		add_action('admin_menu', array( $this, 'setting_page' ));

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
		 * defined in Graph_Light_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Graph_Light_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/graph-light-admin.css', array(), $this->version, 'all' );

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
		 * defined in Graph_Light_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Graph_Light_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( 'Vuejs', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', array( 'jquery' ), $this->version, true );

		wp_enqueue_script( 'Chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js', array( 'jquery' ), $this->version, true );

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/graph-light-admin.js', array( 'jquery' ), $this->version, true );

	}

	public function setting_page() {

		add_options_page('Graph Light', 'Graph Light', 'manage_options', 'gl-admin-dashboard', array( $this, 'admin_dashboard' ));


	}

	public function admin_dashboard() {

		include 'gl_admindashboard.php';

	}

}
