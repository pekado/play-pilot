<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';
	//  Expected data
	// dataChart = {
	// 		labels: [labels],
	// 		datasets: [
	// 			{
	// 				label: label,
	// 				backgroundColor: 'rgba(194, 116, 161, 0.5)',
	// 				borderColor: 'rgb(194, 116, 161)',
	// 				data: []
	// 			}
	// 		]
	// 	};
	export let data = {
		labels: [],
		datasets: [{ values: [] }],
		yMarkers: {},
		yRegions: []
	};
	export let type = '';
	export let options = {};
	export let plugins = {};
	let chart = null;
	let chartRef;
	let props = clean($$props, ['data', 'type', 'options', 'plugins']);
	onMount(() => {
		console.log(options);
		chart = new Chart(chartRef, {
			type,
			data,
			options,
			plugins
		});
	});
	afterUpdate(() => {
		if (!chart) return;
		chart.data = data;
		chart.type = type;
		chart.options = options;
		chart.plugins = plugins;
		chart.update();
	});
	onDestroy(() => {
		chart = null;
	});
	function clean($$props, extra_keys) {
		let keys = ['children', '$$scope', '$$slots'].concat(extra_keys);
		const rest = {};
		for (const key of Object.keys($$props)) {
			if (!keys.includes(key)) {
				rest[key] = $$props[key];
			}
		}
		return rest;
	}
</script>

<canvas bind:this={chartRef} {...props} />
