import '../../css/src/style.scss';
import bootstrap from './bootstrap';

bootstrap.ready( function() {

	var demoDiv = document.getElementById( 'graphs-light-item' );
	demoDiv.appendChild( document.createTextNode( '### This worked! ###' ) );
});
