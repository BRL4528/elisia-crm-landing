/**
 * Data stream — instanced particles flow along a curve from a channel source
 * into the orb. Fragment fades by life and adds a soft halo.
 */

export const streamVertex = /* glsl */ `
  attribute float aOffset;
  attribute float aSpeed;

  uniform float uTime;
  uniform float uIntensity;
  uniform vec3  uOrigin;
  uniform vec3  uTarget;
  uniform float uCurve;
  uniform float uSize;

  varying float vLife;

  void main() {
    float t = fract(uTime * aSpeed + aOffset);
    vLife = t;

    vec3 path = mix(uOrigin, uTarget, t);
    // Arc the trajectory upward then dive back
    float arc = sin(t * 3.14159) * uCurve;
    path.y += arc;
    path.x += sin(t * 6.28 + aOffset * 12.0) * 0.05 * (1.0 - t);

    vec4 mv = modelViewMatrix * vec4(path, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uIntensity * (1.0 - t * 0.7) * (300.0 / -mv.z);
  }
`;

export const streamFragment = /* glsl */ `
  precision highp float;

  uniform vec3  uColor;
  uniform float uOpacity;
  varying float vLife;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * (1.0 - vLife) * uOpacity;
    vec3 col = uColor * (1.0 + (1.0 - vLife) * 0.6);
    gl_FragColor = vec4(col, a);
  }
`;
