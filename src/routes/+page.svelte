<script lang="ts">
	import Experience from '$lib/experience.svelte';
	import Shader from '$lib/shader.svelte';
</script>

<Shader />

<main>
	<div class="container">
		<header>
			<h1>Chris Wilson</h1>
			<p>Software engineer <br />Minnesota</p>
		</header>

		<section>
			<h2>About</h2>
			<p>
				A full-stack software engineer with over 10 years of experience in planning and building
				software. I value clear communication, documented systems, and simple solutions.
			</p>
			<p>
				I enjoy scotch served neat, (almost) any kind of music, and quiet evenings with family.
				When I'm lucky I have all three.
			</p>
		</section>

		<section>
			<h2>Contact</h2>
			<p>
				You can reach me via email at hello@iamchriswilson.com. Around the internet I can be found
				found on <a href="https://github.com/heychris" target="_blank">GitHub</a> and
				<a href="https://www.linkedin.com/in/christopherwilson3/" target="_blank">LinkedIn</a>.
			</p>
		</section>

		<section>
			<h2>Experience</h2>

			<Experience
				company="InVision"
				title="Senior Software Engineer"
				dates="June 2021 – Sept 2023"
				location="Remote"
				summary="I led more than a dozen frontend and full-stack projects on multiple enterprise-grade SaaS products. In collaboration with product and design, we iterated on solutions while seeking to understand company/user needs and technical limitations. I documented technical approaches and lead their implementation. Projects involved coordinating changes across teams and microservices."
			/>

			<Experience
				company="MVP Marketing + Design"
				title="Senior Web Developer"
				dates="May 2014 – June 2021"
				location="Minneapolis, MN and Remote"
				summary="Work at MVP required being motivated to find and address needs in all parts of the engineering org. I led projects, advocated for engineers, provided reviews, and interfaced with customers. I drove awareness and initiative to improve internal tooling/process, server infrastructure and security. "
			/>
		</section>
	</div>
</main>

<svelte:head>
	<title>Chris Wilson | Software Engineer</title>
</svelte:head>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Display:wght@600&family=Noto+Serif&display=optional');

	:root {
		--white: #eeeefa;
		--fontSize: 21px;
		--fontSizeHeadings: 18px;
	}

	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	:global(body) {
		background-color: #000000;
		color: var(--white);
		font-size: var(--fontSize);
		font-family: 'Noto Serif', serif;
		line-height: 1.5;
		text-rendering: geometricPrecision;
	}

	a {
		color: var(--white);
	}

	main {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.container {
		padding: 6em 6vw;
		max-width: 36em;
	}

	header {
		padding-bottom: 5em;
	}

	header > p {
		margin-top: 0.3em;
		font-size: 16px;
	}

	section + section {
		padding-top: 4em;
	}

	h2 + p {
		margin-top: 0.5em;
	}

	h1,
	h2 {
		font-size: var(--fontSizeHeadings);
		font-family: 'Noto Sans Display', sans-serif;
		font-weight: 600;
		margin: 0;
	}
</style>
