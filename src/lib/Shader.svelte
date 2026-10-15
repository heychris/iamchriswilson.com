<script lang="ts">
	import { onMount } from 'svelte';

	import vertexShaderSource from '#lib/shaders/vertex.glsl?raw';
	import fragmentShaderSource from '#lib/shaders/fragment.glsl?raw';
	import { defaultSettings } from '#lib/shaders/settings.ts';

	// Uniforms set straight from settings every frame
	const SETTING_UNIFORMS = [
		'zoom',
		'background',
		'strength',
		'contrast',
		'softness',
		'lineCount',
		'lineStrength',
		'pulse',
		'pulseFrequency'
	] as const;

	let canvas: HTMLCanvasElement | undefined = $state();

	function compile(gl: WebGLRenderingContext, type: number, source: string) {
		const shader = gl.createShader(type);
		if (!shader) return null;

		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.error(gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			return null;
		}

		return shader;
	}

	onMount(() => {
		if (!canvas) return;

		const gl = canvas.getContext('webgl');
		if (!gl) return;

		const vertexShader = compile(gl, gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = compile(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
		const program = gl.createProgram();

		if (!vertexShader || !fragmentShader || !program) return;

		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		gl.detachShader(program, vertexShader);
		gl.detachShader(program, fragmentShader);
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error(gl.getProgramInfoLog(program));
			gl.deleteProgram(program);
			return;
		}

		// Setup
		const settings = { ...defaultSettings };
		const uniforms = Object.fromEntries(
			[...SETTING_UNIFORMS, 'time', 'pulseTime', 'resolution'].map((name) => [
				name,
				gl.getUniformLocation(program, name)
			])
		);
		const positionAttribLocation = gl.getAttribLocation(program, 'a_position');

		const buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

		const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		gl.enableVertexAttribArray(positionAttribLocation);
		gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
		gl.useProgram(program);

		// Accumulated rather than derived from the clock, so changing a speed doesn't jump
		let time = 0;
		let pulseTime = 0;

		const draw = () => {
			for (const name of SETTING_UNIFORMS) gl.uniform1f(uniforms[name], settings[name]);

			gl.uniform1f(uniforms.time, time);
			gl.uniform1f(uniforms.pulseTime, pulseTime);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		};

		function resize() {
			if (!canvas || !gl) return;

			// Render below native resolution and let CSS scale it up; the effect is soft
			// enough that this is barely visible, and it cuts the per-frame GPU cost a lot
			canvas.width = Math.round(window.innerWidth * settings.resolutionScale);
			canvas.height = Math.round(window.innerHeight * settings.resolutionScale);
			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
		}

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let frame = 0;
		let lastDraw = -Infinity;

		function loop(now: number) {
			frame = requestAnimationFrame(loop);

			const elapsed = now - lastDraw;
			if (elapsed < 1000 / settings.fps) return;

			// Cap the step so returning to a backgrounded tab doesn't lurch forward
			const dt = Math.min(elapsed, 100) / 1000;
			time += dt * settings.speed;
			pulseTime += dt * settings.pulseSpeed;

			lastDraw = now;
			draw();
		}

		function start() {
			cancelAnimationFrame(frame);

			if (reducedMotion.matches) {
				draw();
			} else {
				frame = requestAnimationFrame(loop);
			}
		}

		function onResize() {
			resize();
			if (reducedMotion.matches) draw();
		}

		resize();
		start();

		let destroyGui: (() => void) | undefined;
		let destroyed = false;

		if (import.meta.env.DEV) {
			import('#lib/shaders/gui.ts').then(({ createGui }) => {
				if (destroyed) return;
				// Resizing also redraws when reduced motion has paused the loop
				destroyGui = createGui(settings, onResize);
			});
		}

		window.addEventListener('resize', onResize);
		reducedMotion.addEventListener('change', start);

		return () => {
			destroyed = true;
			destroyGui?.();
			cancelAnimationFrame(frame);
			window.removeEventListener('resize', onResize);
			reducedMotion.removeEventListener('change', start);

			gl.useProgram(null);
			gl.deleteBuffer(buffer);
			gl.deleteProgram(program);
		};
	});
</script>

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		pointer-events: none;
	}
</style>
