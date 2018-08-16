<?php

/**
 * Graphs Lite
 *
 * Create beautiful charts. Interactive and easy to use. 
 *
 * @link              http://orchestra.ltd
 * @since             1.0.0
 * @package           Graph_Lite
 *
 * @wordpress-plugin
 * Plugin Name:       Graph Lite
 * Plugin URI:        http://wordpress.org/plugins/graphs-lite
 * Description:       Create beautiful charts. Interactive and easy to use.
 * Version:           2.0.4
 * Author:            Orchestra Technologies
 * Author URI:        http://orchestra.ltd
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       graphs-lite
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'GRAPHS_LITE_VERSION', '2.0.4' );
define( 'GRAPHS_LITE_NAME', 'Graph Light' );

/**
 * Initial Class of the plugin
 * should run first
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-graphs-lite-init.php';

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-graphs-lite-activator.php
 */
function activate_graphs_lite() {
	Graph_Lite_Init::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-graphs-lite-deactivator.php
 */
function deactivate_graphs_lite() {
	Graph_Lite_Init::deactivate();
}

register_activation_hook( __FILE__, 'activate_graphs_lite' );
register_deactivation_hook( __FILE__, 'deactivate_graphs_lite' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'functions.php';
require plugin_dir_path( __FILE__ ) . 'includes/class-ajax.php';
require plugin_dir_path( __FILE__ ) . 'includes/class-shortcode.php';
require plugin_dir_path( __FILE__ ) . 'admin/class-graphs-lite-admin.php';
require plugin_dir_path( __FILE__ ) . 'public/class-graphs-lite-public.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */

function graph_light_run() {
	new Graph_Lite_Init;
	new Graph_Lite_Ajax;
	new Graph_Lite_Shortcode;
	new Graph_Lite_Admin( GRAPHS_LITE_NAME, GRAPHS_LITE_VERSION );
	new Graph_Lite_Public( GRAPHS_LITE_NAME, GRAPHS_LITE_VERSION );
}

graph_light_run();