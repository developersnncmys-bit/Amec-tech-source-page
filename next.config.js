/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disabled: GSAP ScrollTrigger's pin/pinSpacing wraps DOM nodes React owns,
  // and Strict Mode's double-invoke of effects in dev causes the pin-spacer
  // to be inserted → reverted → re-inserted, leaving React's fiber tree
  // pointing at stale positions and throwing `removeChild` errors.
  reactStrictMode: false,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

module.exports = nextConfig;
