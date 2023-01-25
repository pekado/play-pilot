<script>
	export let city;
	export let urbanAreaScore;

	const searchUrbanAreaScores = async () => {
		const res = await fetch(city.href + 'scores');
		const data = await res.json();
		data.name = city.name;
		urbanAreaScore = data;
	};
</script>

<button on:click={searchUrbanAreaScores}>
	{city.name}
</button>

<style>
	button {
		padding: 12px;
		background-color: white;
		font-size: 18px;
	}
</style>
