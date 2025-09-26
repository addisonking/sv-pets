<script lang="ts">
	import Nest from '$lib/core/Nest.svelte';
</script>

<div class="container">
	<Nest animal="fox" />
</div>

<style>
	.container {
		height: 300px;
		width: 600px;
		border: 1px solid black;
	}
</style>
