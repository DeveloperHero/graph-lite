(function($) {
	tinymce.PluginManager.add('graphs_lite_mce_btn', function( editor, url ) {
		editor.addButton( 'graphs_lite_mce_btn', {
			// text: 'Chart',
			icon: true,
			image: '/wp-content/plugins/Graphs-Lite/admin/images/16x16.png',
			type: 'button',
			onclick: function() {
				$('#gl-admin-meta-box').fadeIn();
			},
		});
	});
})(jQuery);