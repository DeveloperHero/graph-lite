<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       http://orchestra.ltd
 * @since      1.0.0
 *
 * @package    Graph_Lite
 * @subpackage Graph_Lite/public/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<div class="chart_area">
	<?php

	echo '<pre>';

	print_r($chart_data);

	echo '</pre>';

	?>
</div>