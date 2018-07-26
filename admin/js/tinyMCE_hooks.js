(function($) {
	tinymce.PluginManager.add('graphs_lite_mce_btn', function( editor, url ) {
		editor.addButton( 'graphs_lite_mce_btn', {
			text: 'Chart',
			icon: false,
			type: 'button',
			onclick: function() {
				$('#gl-admin-meta-box').fadeIn();
			},
		});
	});
})(jQuery);