$('#gl-admin-meta-box').appendTo('body');
$('button.close_graph_modal').appendTo('div#gl-admin-meta-box h2.hndle');
$('#gl-admin-meta-box').hide();

$('div#gl-admin-meta-box button.handlediv').remove();
$('div#gl-admin-meta-box').removeClass('postbox');

$('.close_graph_modal').on('click', function () {
	$('#gl-admin-meta-box').fadeOut();
});