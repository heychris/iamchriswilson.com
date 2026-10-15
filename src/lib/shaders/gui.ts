import GUI from 'lil-gui';

import { defaultSettings, type ShaderSettings } from './settings';

// Dev-only tuning panel; edits `settings` in place, which the render loop reads every frame
export function createGui(settings: ShaderSettings, onChange: () => void) {
	const gui = new GUI({ title: 'Shader' });
	gui.onChange(onChange);

	const rendering = gui.addFolder('Rendering');
	rendering.add(settings, 'resolutionScale', 0.1, 1, 0.05);
	rendering.add(settings, 'fps', 5, 60, 1);

	const pattern = gui.addFolder('Pattern');
	pattern.add(settings, 'speed', 0, 5, 0.05);
	pattern.add(settings, 'zoom', 0.2, 4, 0.05);
	pattern.add(settings, 'background', 0, 1, 0.005);
	pattern.add(settings, 'strength', 0, 1, 0.005);
	pattern.add(settings, 'contrast', 0, 5, 0.05);
	pattern.add(settings, 'softness', 0.01, 1, 0.01);

	const lines = gui.addFolder('Contour lines');
	lines.add(settings, 'lineCount', 0, 50, 1);
	lines.add(settings, 'lineStrength', 0, 1, 0.005);

	const pulse = gui.addFolder('Pulse');
	pulse.add(settings, 'pulse', 0, 1, 0.01);
	pulse.add(settings, 'pulseSpeed', 0, 5, 0.05);
	pulse.add(settings, 'pulseFrequency', 0, 20, 0.1);

	gui
		.add(
			{
				copy: () => navigator.clipboard.writeText(JSON.stringify(settings, null, '\t'))
			},
			'copy'
		)
		.name('Copy settings');

	gui
		.add(
			{
				reset: () => {
					Object.assign(settings, defaultSettings);
					gui.controllersRecursive().forEach((controller) => controller.updateDisplay());
					onChange();
				}
			},
			'reset'
		)
		.name('Reset');

	return () => gui.destroy();
}
