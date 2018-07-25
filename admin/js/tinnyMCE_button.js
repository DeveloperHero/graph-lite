(function() {
	tinymce.PluginManager.add('graphs_lite_mce_btn', function( editor, url ) {
		editor.addButton( 'graphs_lite_mce_btn', {
			text: 'Chart',
			icon: false,
			type: 'menubutton',
			menu: [
				{
					text: 'Add Chart',
						onclick: function() {
							editor.insertContent('[chart id=""]');
						}
				},

				// {
				// 	text: 'Admin Dashboard',
				// 		onclick: function() {
				// 			editor.insertContent('[f2p_admin_dashboard]');
				// 		}
				// },

				// {
				// 	text: 'User Dashboard',
				// 		onclick: function() {
				// 			editor.insertContent('[f2p_user_dashboard]');
				// 		}
				// }
			]
		});
	});
})();