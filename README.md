# GrowImageCircle Component Documentation

This document explains the implementation and usage of the `GrowImageCircle` component, a React component that creates an engaging scroll-triggered animation sequence using GSAP.

## Overview

The `GrowImageCircle` component creates a dynamic animation sequence that includes:
1. Initial state with centered content and a circular image
2. A purple background that expands to fill the screen
3. An image that grows and transitions to the right
4. Content that smoothly transitions from initial to final state

## Installation

### Prerequisites
```bash
npm install gsap @gsap/react
```

### Next.js Configuration
Add the following to your `next.config.js`:
```javascript
const nextConfig = {
  transpilePackages: ['gsap']
}

module.exports = nextConfig
```

## Component Structure

### Key Elements
1. **Container Section**: Main wrapper that holds all elements
2. **Initial Content**: 
   - Heading
   - Description text
   - Call-to-action button
3. **Animation Elements**:
   - Purple circle background (grows to fill screen)
   - Circular image (transitions right and scales up)
4. **Final Content**:
   - New heading
   - Description
   - Call-to-action button

### Refs
```typescript
const containerRef = useRef<HTMLElement>(null);
const imageWrapperRef = useRef<HTMLDivElement>(null);
const circleRef = useRef<HTMLDivElement>(null);
const initialContentRef = useRef<HTMLDivElement>(null);
const finalContentRef = useRef<HTMLDivElement>(null);
```

## Animation Sequence

### Initial Setup
```typescript
gsap.set(circleRef.current, {
  width: "220px",
  height: "220px",
  xPercent: -50,
  yPercent: -50,
  top: "50%",
  left: "50%",
  scale: 1,
});

gsap.set(finalContentRef.current, {
  opacity: 0,
  y: 50,
});
```

### Timeline Sequence
1. **Purple Background Expansion**
   ```typescript
   .to(circleRef.current, {
     scale: 15,
     duration: 1,
   })
   ```

2. **Initial Content Fade Out**
   ```typescript
   .to(initialContentRef.current, {
     opacity: 0,
     y: -50,
     duration: 0.3,
   }, 0.3)
   ```

3. **Image Translation**
   ```typescript
   .to(imageWrapperRef.current, {
     scale: 2,
     x: "30vw",
     duration: 1,
   }, 0.5)
   ```

4. **Final Content Fade In**
   ```typescript
   .to(finalContentRef.current, {
     opacity: 1,
     y: 0,
     duration: 0.5,
   }, 0.8)
   ```

## Customization Options

### Timing Adjustments
- Modify `scrub: 1.5` for overall animation speed
- Adjust individual duration values in the timeline
- Change timing offsets (numbers after commas in timeline) for sequence timing

### Visual Customization
1. **Image Size**:
   ```jsx
   className="relative w-[200px] h-[200px]"
   ```

2. **Background Color**:
   ```jsx
   className="absolute rounded-full bg-purple-600"
   ```

3. **Content Positioning**:
   ```jsx
   className="absolute left-32 top-1/2 -translate-y-1/2"
   ```

### Scroll Trigger Settings
```typescript
scrollTrigger: {
  trigger: containerRef.current,
  start: "top top",
  end: "+=150%",
  scrub: 1.5,
  pin: true,
  pinSpacing: true,
  invalidateOnRefresh: true,
}
```

## Best Practices

1. **Cleanup**
   ```typescript
   useEffect(() => {
     return () => {
       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
     };
   }, []);
   ```

2. **Null Checks**
   ```typescript
   if (!containerRef.current || !imageWrapperRef.current /* ... */) return;
   ```

3. **Performance**
   - Use `transform` properties for animations
   - Implement proper cleanup
   - Ensure smooth scroll behavior

## Common Issues and Solutions

1. **Animation Not Triggering**
   - Verify ScrollTrigger import and registration
   - Check container height and scroll space
   - Ensure refs are properly connected

2. **Choppy Animations**
   - Adjust `scrub` value
   - Reduce animation complexity
   - Check for performance bottlenecks

3. **Mobile Responsiveness**
   - Use viewport units (vw/vh) for scaling
   - Implement media queries for size adjustments
   - Test on various screen sizes

## Browser Support

- Requires modern browser support for CSS transforms and GSAP
- Ensure proper polyfills for older browser support
- Test across different browsers and devices