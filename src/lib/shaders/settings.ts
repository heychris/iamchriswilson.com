// Tunable in dev via the on-screen panel; paste "Copy settings" output here to keep changes
export const defaultSettings = {
	// Rendering
	resolutionScale: 0.75,
	fps: 30,

	// Pattern
	speed: 3.3,
	zoom: 1.5,
	background: 1,
	strength: 0.065,
	contrast: 0.65,

	// How blurry the edges of the smoke are
	softness: 0.44,

	// Contour lines
	lineCount: 12,
	lineStrength: 0.03,

	// Pulse: a wave sweeping across the screen that brightens lines as it passes
	pulse: 0.2,
	pulseSpeed: 0.7,
	pulseFrequency: 3
};

export type ShaderSettings = typeof defaultSettings;
