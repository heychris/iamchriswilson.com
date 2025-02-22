<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	import vertexShaderSource from '$lib/shaders/vertex.glsl?raw';
	import fragmentShaderSource from '$lib/shaders/fragment.glsl?raw';

	let canvas: HTMLCanvasElement | null;
	let buffer: WebGLBuffer | null;
	let gl: WebGLRenderingContext | null;
	let program: WebGLProgram | null;

	onMount(() => {
		if (!canvas) return;

		gl = canvas.getContext('webgl');
		canvas.height = document.body.clientHeight;
		canvas.width = document.body.clientWidth;

		if (!gl) return;

		const vertexShader = gl.createShader(gl.VERTEX_SHADER);
		const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		if (!fragmentShader || !vertexShader) return;

		program = gl.createProgram();
		if (!program) return;

		// Vertex
		gl.shaderSource(vertexShader, vertexShaderSource);
		gl.compileShader(vertexShader);
		gl.attachShader(program, vertexShader);

		// Fragment
		gl.shaderSource(fragmentShader, fragmentShaderSource);
		gl.compileShader(fragmentShader);
		gl.attachShader(program, fragmentShader);

		// Program
		gl.linkProgram(program);
		gl.detachShader(program, vertexShader);
		gl.detachShader(program, fragmentShader);
		gl.deleteShader(vertexShader);
		gl.deleteShader(fragmentShader);

		// Setup
		const timeUniformLocation = gl.getUniformLocation(program, 'time');
		const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');
		const positionUniformLocation = gl.getAttribLocation(program, 'a_position');

		buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

		const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
		gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

		gl.enableVertexAttribArray(positionUniformLocation);
		gl.vertexAttribPointer(positionUniformLocation, 2, gl.FLOAT, false, 0, 0);
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		// Go
		gl.useProgram(program);

		let startTime = Date.now();

		function render() {
			if (!canvas || !gl) return;

			// Update time and resolution uniforms
			const currentTime = (Date.now() - startTime) / 1000;
			gl.uniform1f(timeUniformLocation, currentTime);
			gl.uniform2fv(resolutionUniformLocation, [canvas.width, canvas.height]);

			// Clear the canvas and render
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.drawArrays(gl.TRIANGLES, 0, 6);

			requestAnimationFrame(render);
		}

		render();
	});

	function onResize() {
		if (!gl || !canvas) return;

		canvas.height = document.body.clientHeight;
		canvas.width = document.body.clientWidth;
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
	}

	onDestroy(() => {
		if (!gl) return;

		// Cleanup
		gl.useProgram(null);

		if (buffer) gl.deleteBuffer(buffer);
		if (program) gl.deleteProgram(program);
	});
</script>

<svelte:window on:resize={onResize} />

<canvas bind:this={canvas}></canvas>

<style>
	canvas {
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		pointer-events: none;
	}
</style>
