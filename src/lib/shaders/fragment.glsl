#version 100

// mediump time loses per-frame precision after ~30 minutes on some GPUs
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 resolution;
uniform float time;
uniform float zoom;

// Pattern
uniform float background;
uniform float strength;
uniform float contrast;
uniform float softness;

// Contour lines
uniform float lineCount;
uniform float lineStrength;

// Pulse
uniform float pulse;
uniform float pulseTime;
uniform float pulseFrequency;

const float TAU = 6.28318530718;

// Utils
const mat2 m = mat2(0.80,  0.60, -0.60,  0.80);

float noise(in vec2 p) {
  return sin(p.x) * sin(p.y);
}

float fbm4(vec2 p) {
  float f = 0.0;
  f += 0.5000*noise(p); p = m*p*2.02;
  f += 0.2500*noise(p); p = m*p*2.03;
  f += 0.1250*noise(p); p = m*p*2.01;
  f += 0.0625*noise(p);

  return f/0.9375;
}

float fbm6(vec2 p) {
  float f = 0.0;
  f += 0.500000*(0.5+0.5*noise(p)); p = m*p*2.02;
  f += 0.250000*(0.5+0.5*noise(p)); p = m*p*2.03;
  f += 0.125000*(0.5+0.5*noise(p)); p = m*p*2.01;
  f += 0.062500*(0.5+0.5*noise(p)); p = m*p*2.04;
  f += 0.031250*(0.5+0.5*noise(p)); p = m*p*2.01;
  f += 0.015625*(0.5+0.5*noise(p));

  return f/0.96875;
}

vec2 fbm4_2(vec2 p) {
  return vec2(fbm4(p), fbm4(p+vec2(7.8)));
}

vec2 fbm6_2(vec2 p) {
  return vec2(fbm6(p+vec2(16.8)), fbm6(p+vec2(11.5)));
}

// - - - - - - - - - - - - - - - - - - - -

float func(vec2 q, out vec4 ron, out float unfolded) {
  q += 0.05 * sin(vec2(0.27,0.23)*time + length(q)*vec2(4.1,4.3));

  vec2 o = fbm4_2(0.9 * q);
  o += 0.05 * sin(vec2(0.12,0.14)*time + length(o));

  vec2 n = fbm6_2(3.0 * o);
  ron = vec4(o, n);
  float f = 0.45 + 0.5*fbm4(1.8*q + 6.0*n);
  unfolded = f;

  // Folded copy of the field; its sharper creases give the contour lines their shape
  return mix(f, f*f*f*3.5, f*abs(n.x));
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
  vec2 p = zoom * (2.0*fragCoord - resolution.xy) / resolution.y;
  float e = zoom * 2.0 / resolution.y;

  vec4 on = vec4(1.0);
  float density;
  float f = func(p, on, density);

  // Neighbouring samples, one pixel over, to keep contour lines a constant width
  vec4 kk;
  float kd;
  vec2 df = vec2(func(p+vec2(e, 0.0), kk, kd), func(p+vec2(0.0, e), kk, kd)) - f;

  // Smoke: shade by the unfolded density of the field, with the second warp layer
  // thinning it out into wisps
  float wisps = density * (0.6 + 0.8*on.w);
  float smokeShade = smoothstep(0.5 - softness, 0.5 + softness, wisps);

  float shade = clamp((smokeShade - 0.5)*contrast + 0.5, 0.0, 1.0);

  // Contour lines of constant width in pixels, regardless of how steep the pattern is
  float bands = f * lineCount;
  float distToLine = abs(fract(bands + 0.5) - 0.5) / max(lineCount * length(df), 1e-4);
  float line = 1.0 - smoothstep(0.0, 1.0, distToLine);

  // Pulse: a wave sweeping across the screen that brightens lines as it passes
  float wave = 0.5 + 0.5*sin(pulseFrequency*(p.x + p.y) + TAU*f - pulseTime);
  line *= mix(1.0, wave, pulse);

  float value = background - strength*shade - lineStrength*line;
  fragColor = vec4(vec3(clamp(value, 0.0, 1.0)), 1.0);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
