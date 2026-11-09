/**
 * Custom GLSL Shaders for the Volumetric Portal Particle Jet
 * 4,000+ volumetric energy particles flowing out of the dimensional portal rift.
 * Palette: Violet #7C3AED, Cyan #06B6D4, Rose #F472B6
 */

export const particleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uTurbulence;
  uniform vec2 uMouse;
  uniform float uScatter;
  uniform float uSpeed;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aPhase;
  attribute vec3 aVelocity;
  attribute float aLifespan;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Continuous flow along Z from the dimensional rift towards the camera
    float cycle = fract(uTime * 0.15 * aLifespan + aPhase);
    // Spiral expansion: starts tight in the portal singularity (Z = -3.0), widens as it approaches
    float radius = 0.5 + cycle * 4.2;
    float spiralAngle = cycle * 14.0 + aPhase * 6.28 + uTime * 0.3;

    pos.x = cos(spiralAngle) * radius + aVelocity.x * uTurbulence * 0.8;
    pos.y = sin(spiralAngle) * radius + aVelocity.y * uTurbulence * 0.8;
    pos.z = -3.2 + cycle * 10.5;

    // Mouse magnetic vortex pull
    vec3 mousePos = vec3(uMouse.x * 3.5, uMouse.y * 3.0, 1.0);
    vec3 diff = pos - mousePos;
    float d = length(diff);
    if (d < 3.0) {
      pos += normalize(diff) * (3.0 - d) * 0.6;
    }

    // Explosive shockwave hyperspace jump
    if (uScatter > 0.0) {
      pos += aVelocity * uScatter * 5.0;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size attenuation
    gl_PointSize = (aScale * 38.0 * uPixelRatio) / -mvPosition.z;
    gl_PointSize = clamp(gl_PointSize, 1.5, 42.0);

    // Cyberpunk tri-color spectrum
    vec3 colViolet = vec3(0.486, 0.227, 0.929); // #7C3AED
    vec3 colCyan   = vec3(0.024, 0.714, 0.831); // #06B6D4
    vec3 colRose   = vec3(0.957, 0.447, 0.714); // #F472B6

    float colorMix = fract(aPhase * 3.0 + cycle * 1.5);
    if (colorMix < 0.45) {
      vColor = mix(colViolet, colCyan, colorMix / 0.45);
    } else {
      vColor = mix(colCyan, colRose, (colorMix - 0.45) / 0.55);
    }

    // Fade in at birth from portal, fade out near camera
    vAlpha = smoothstep(0.0, 0.15, cycle) * (1.0 - smoothstep(0.75, 1.0, cycle));
  }
`;

export const particleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) discard;

    // Soft neon energy core with energetic falloff
    float glow = 1.0 - smoothstep(0.0, 0.5, dist);
    float core = 1.0 - smoothstep(0.0, 0.12, dist);

    vec3 finalColor = vColor + vec3(core * 0.9);
    float alpha = (glow * 0.75 + core * 0.25) * vAlpha;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;
