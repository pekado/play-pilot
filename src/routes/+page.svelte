<script>
	import Chart from '../lib/components/Chart.svelte';
	import CityButton from '../lib/components/CityButton.svelte';

	export let data;

	let city = '';
	let filteredAreas = [];
	let urbanAreaScore;
	let chartData;
	let isOpen = !false;

	$: if (city) {
		searchArea();
	} else {
		filteredAreas = data._links['ua:item'];
	}

	$: if (urbanAreaScore) {
		chartData = {
			labels: urbanAreaScore.categories.map((category) => category.name),
			datasets: [
				{
					label: urbanAreaScore.name,
					backgroundColor: 'rgba(194, 116, 161, 0.5)',
					borderColor: 'rgb(194, 116, 161)',
					data: urbanAreaScore.categories.map((category) => category.score_out_of_10)
				}
			]
		};
	}

	const debounce = (v) => {
		let timer;
		clearTimeout(timer);
		timer = setTimeout(() => {
			city = v;
		}, 750);
	};

	const searchArea = () => {
		console.log('is working');
		filteredAreas = data._links['ua:item'].filter((area) => {
			return area.name.toLowerCase().includes(city.toLowerCase());
		});
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1>I HATE THIS TOWN! WHERE SHOULD I GO?</h1>
<h3>Search for an urban area or city and find your next place to be. Or not.</h3>
<input
	type="text"
	name="city"
	on:keyup={({ target: { value } }) => debounce(value)}
	on:focus={() => (isOpen = true)}
	on:blur={() => (isOpen = false)}
/>
<div>
	{#each filteredAreas as urbanArea}
		<CityButton city={urbanArea} bind:urbanAreaScore />
	{/each}
</div>
{#if urbanAreaScore}
	<p>{@html urbanAreaScore.summary}</p>
	<Chart type="radar" data={chartData} />
{/if}

<style>
	h1 {
		font-size: 56px;
	}
	p {
		font-size: 42px;
	}

	input {
		width: 100%;
		height: 40px;
		outline: none;
		font-size: 40px;
	}
</style>
