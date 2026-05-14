/**
 * Intelligence Core orb — vertex displacement using layered simplex-style noise,
 * fragment uses fresnel + radial gradient to read as a "thinking" volumetric sphere.
 */

export const orbVertex = /* glsl */ `
  uniform float uTime;
  uniform float uDisplacement;
  uniform float uPulse;
  uniform vec2  uPointer;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  // Hash-based pseudo-noise (cheap, no texture sampling)
  vec3 hash3(vec3 p) {
    p = vec3(
      dot(p, vec3(127.1, 311.7,  74.7)),
      dot(p, vec3(269.5, 183.3, 246.1)),
      dot(p, vec3(113.5, 271.9, 124.6))
    );
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
  }

  float snoise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
              dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
          mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
              dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
      mix(mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
              dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
          mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
              dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y),
      u.z);
  }

  float fbm(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 pos = position;
    vec3 n = normalize(normal);
    float t = uTime * 0.35;

    // Pointer bias: subtle bulge toward mouse direction in world XY
    vec3 pointerBias = vec3(uPointer * 0.18, 0.0);
    float pointerDot = clamp(dot(n, normalize(vec3(uPointer, 0.4))), 0.0, 1.0);

    float n1 = fbm(pos * 1.35 + t);
    float n2 = fbm(pos * 2.8 - t * 0.8 + 12.4);
    float disp = (n1 * 0.6 + n2 * 0.4) * uDisplacement;
    disp += uPulse * 0.18 * sin(uTime * 1.6 + pos.y * 2.2);
    disp += pointerDot * 0.07;

    vec3 displaced = pos + n * disp;

    vDisp = disp;
    vNormal = normalize(normalMatrix * n);
    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    vView = -mv.xyz;

    gl_Position = projectionMatrix * mv;
  }
`;

export const orbFragment = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3  uColorA; // emerald
  uniform vec3  uColorB; // neural cyan
  uniform vec3  uColorRim;
  uniform float uOpacity;

  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vView);

    float fres = pow(1.0 - max(dot(N, V), 0.0), 2.4);
    float core = smoothstep(0.0, 1.0, dot(N, V));

    // Soft inner gradient based on displacement (gives "thinking" feel)
    float pulse = 0.5 + 0.5 * sin(uTime * 1.2);
    float mixT  = clamp(0.5 + vDisp * 1.6 + pulse * 0.05, 0.0, 1.0);

    vec3 base = mix(uColorA, uColorB, mixT * 0.7);
    vec3 col  = base * (0.45 + core * 0.75);
    col      += uColorRim * fres * 1.4;

    // Subtle additive bloom-feeder on bright zones
    col += uColorB * pow(core, 6.0) * 0.45;

    gl_FragColor = vec4(col, uOpacity);
  }
`;
