$('#gl-admin-meta-box').appendTo('body');
$('button.close_graph_modal').appendTo('div#gl-admin-meta-box h2.hndle');
$('#gl-admin-meta-box').hide();

$('div#gl-admin-meta-box button.handlediv').remove();
$('div#gl-admin-meta-box').removeClass('postbox');

$('.close_graph_modal').on('click', function () {
	$('#gl-admin-meta-box').fadeOut();
});

// Nav Menu
$('.gl_nav nav').click(function(e){

	$('.gl_nav nav').css('background-color', '#3e8e41');

	$(this).css('background-color', '#3473aa');

});

$('.gl_old_graph').hide();

$('nav#gl_new_chart').click(function(){
	$('.gl_old_graph').hide();
	$('.gl_new_chart').fadeIn();
});

$('nav#gl_old_chart').click(function(){
	$('.gl_new_chart').hide();
	$('.gl_old_graph').fadeIn();
});