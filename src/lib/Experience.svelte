<script lang="ts">
	export let title: string;
	export let company: string;
	export let dates: string;
	export let summary: string;
	export let location: string;
</script>

<div class="experience">
	<div>
		<h3 class="title">{title} at {company}</h3>

		<div class="details">
			<p class="location">{location}</p>
			<p class="dates">({dates})</p>
		</div>
	</div>

	<p class="summary">{summary}</p>
</div>

<style>
	.experience {
		padding-top: 0.7em;
	}

	.details {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		padding-bottom: 0.3em;
	}

	.title {
		font-size: 0.75em;
		font-family: 'Noto Sans Display';
	}

	.summary {
		font-size: 0.9em;
	}

	.title {
		margin-bottom: 0.1em;
	}

	.location,
	.dates {
		color: var(--white);
		opacity: 0.6;
		font-family: 'Noto Sans Display';
		font-size: 0.75em;
		margin: 0;
	}
</style>
