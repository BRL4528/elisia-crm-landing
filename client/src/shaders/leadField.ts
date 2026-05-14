/**
 * LeadField shader — each particle is a lead.
 * Designed to read as DISTANT STARS, not foreground bokeh:
 *   - small pixel sizes with capped max
 *   - normal blending (no luminance pile-up on overlap)
 *   - softer fragment falloff
 *   - hot core only when gathered (captured leads are brighter)
 */

export const leadVertex = /* glsl */ `
  attribute vec3 aScattered;
  attribute vec3 aTarget;
  attribute float aSeed;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uGather;
  uniform vec2  uPointer;

  varying float vLife;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Ambient drift — per-particle speed + amplitude so the field reads as
    // a living swarm, not synchronized noise. Cross-axis sinusoids + a
    // gentle orbital component give organic 3D motion.
    float speed = 0.14 + aSeed * 0.10;          // per-particle pace
    float t = uTime * speed;
    vec3 drift = vec3(
      sin(t * 1.10 + aSeed * 6.28) * 0.55,
      cos(t * 0.85 + aSeed * 4.71) * 0.42,
      sin(t * 0.65 + aSeed * 3.14) * 0.50
    );

    // Slow orbital sway in XZ plane — gives the swarm a subtle rotation
    // around the focal point, like data drifting in a current
    float orbit = uTime * (0.06 + aSeed * 0.05);
    drift.x += cos(orbit + aSeed * 12.0) * 0.20;
    drift.z += sin(orbit + aSeed * 12.0) * 0.20;

    // Drift fades as leads gather into the funnel (no wobble when captured)
    vec3 scattered = aScattered + drift * (1.0 - uGather);

    // Depth-varied pointer parallax — each particle shifts by 0.6–1.6×
    // depending on its seed, giving a layered (not uniform) 3D feel
    float parallaxStrength = 0.6 + aSeed * 1.0;
    scattered.x += uPointer.x * 1.4 * (1.0 - uGather) * parallaxStrength;
    scattered.y += uPointer.y * 1.0 * (1.0 - uGather) * parallaxStrength;

    // Per-particle wave gather
    float phase = clamp((uGather - aSeed * 0.35) / 0.65, 0.0, 1.0);
    float ease = phase < 0.5
      ? 4.0 * phase * phase * phase
      : 1.0 - pow(-2.0 * phase + 2.0, 3.0) / 2.0;

    vec3 pos = mix(scattered, aTarget, ease);

    // Spiral curl during transition for cinematic motion
    float curl = sin(uTime * 1.4 + aSeed * 12.0) * 0.06 * (ease - ease * ease) * 4.0;
    pos.x += curl;
    pos.z += curl * 0.6;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;

    // Star-sized points: small, gently scaled by distance, hard-capped
    float dist = -mv.z;
    float base = mix(2.4, 1.6, ease);                  // gathered = slightly tighter
    float attenuation = 110.0 / max(dist, 0.5);
    gl_PointSize = clamp(base * attenuation, 1.6, 9.0);

    vLife = ease;
    // Scattered = channel-tinted (slight dim); gathered = emerald (CRM)
    vec3 emerald = vec3(0.20, 0.83, 0.60);
    vColor = mix(aColor * 0.95, emerald, ease * 0.85);
    // Alpha — visible at rest, brighter when captured
    float depthFade = clamp(1.0 - smoothstep(9.0, 16.0, dist), 0.6, 1.0);
    vAlpha = (0.78 + ease * 0.22) * depthFade;
  }
`;

export const leadFragment = /* glsl */ `
  precision highp float;
  uniform float uOpacity;
  varying float vLife;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    // Soft circular falloff with a subtle inner core for visibility
    float soft = smoothstep(0.5, 0.05, d);
    float core = smoothstep(0.22, 0.0, d) * (0.25 + vLife * 0.45);
    float alpha = (soft + core) * vAlpha * uOpacity;

    vec3 col = vColor * (0.95 + vLife * 0.45);
    gl_FragColor = vec4(col, alpha);
  }
`;
