<script lang="ts">
	import Shader from '#lib/Shader.svelte';
</script>

<Shader />

<main>
	<div class="container">
		<header>
			<h1>Chris Wilson</h1>
			<p>Software engineer</p>
		</header>

		<section>
			<h2>About</h2>
			<p>
				I enjoy building software people want to use. I believe good engineering means caring about
				the details, having no ego, and making things go really fast.
			</p>
			<p>I work at Fountain. Before that I was at InVision and MVP Marketing + Design.</p>
		</section>

		<section>
			<h2>Contact</h2>
			<p>
				You can reach me via email at hello@iamchriswilson.com. Around the internet I can be found
				on <a href="https://github.com/heychris" target="_blank">GitHub</a> and
				<a href="https://www.linkedin.com/in/christopherwilson3/" target="_blank">LinkedIn</a>.
			</p>
		</section>
	</div>
</main>

<svelte:head>
	<title>Chris Wilson | Software Engineer</title>
</svelte:head>

<style>
	main {
		display: flex;
		align-items: center;
		flex-direction: column;
		text-wrap: pretty;
	}

	.container {
		padding: 6em 6vw;
		max-width: 36em;
		box-sizing: content-box;
	}

	header {
		padding-bottom: 5em;
	}

	header > p {
		margin-top: 0em;
	}

	section + section {
		padding-top: 4em;
	}

	h2 + p {
		margin-top: 0.3em;
	}

	h1,
	h2 {
		font-size: var(--fontSizeHeadings);
		font-weight: 600;
		margin: 0;
	}
</style>
