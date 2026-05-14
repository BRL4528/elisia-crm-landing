export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.83, 0, 0.17, 1] as const,
  soft: [0.4, 0.0, 0.2, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
};

export const dur = {
  xs: 0.24,
  sm: 0.42,
  md: 0.7,
  lg: 1.1,
  xl: 1.8,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: dur.md, ease: ease.out },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: dur.md, ease: ease.out } },
};

export const stagger = (children = 0.08, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: children, delayChildren: delay } },
});
