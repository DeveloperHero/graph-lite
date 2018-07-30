<div id="app">
	<div class="gl_nav">
		<nav
		v-for="tab in tabs"
		v-bind:key="tab.tabFileName"
		v-on:click="currentTab = tab.tabFileName"
		>{{ tab.tabName }}</nav>
	</div>

	<component v-bind:is="currentTabComponent"></component>
</div>