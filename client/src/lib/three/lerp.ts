import { Vector3 } from "three";

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const damp = (current: number, target: number, lambda: number, dt: number) =>
  lerp(current, target, 1 - Math.exp(-lambda * dt));

export const dampV = (out: Vector3, target: Vector3, lambda: number, dt: number) => {
  out.x = damp(out.x, target.x, lambda, dt);
  out.y = damp(out.y, target.y, lambda, dt);
  out.z = damp(out.z, target.z, lambda, dt);
  return out;
};

export const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

/** Map a global scroll progress 0..1 onto a phase segment [start, end] returning local 0..1. */
export const phaseProgress = (p: number, start: number, end: number) =>
  clamp((p - start) / (end - start));
