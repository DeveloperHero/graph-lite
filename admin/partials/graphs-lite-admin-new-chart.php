<div id="app">
	<div class="gl_nav">
		<nav
		v-for="tab in tabs"
		v-bind:key="tab"
		v-on:click="currentTab = tab"
		>{{ tab }}</nav>
	</div>

	<component v-bind:is="currentTabComponent"></component>
</div>