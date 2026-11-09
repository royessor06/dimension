/**
 * GLSL Shaders for the 3D Cyberpunk Dimensional Portal — DIMENSION
 * Features relativistic event horizon swirl, gravitational distortion,
 * neon plasma accretion disk (Violet #7C3AED, Cyan #06B6D4, Rose #F472B6)
 * and interactive spatial ripples.
 */

export const portalVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDistortion;
  uniform float uWarpIntensity;
  uniform float uShockwave;
  uniform vec2 uMouse;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vDistToCenter;
  varying float vFresnel;

  // Simplex 3D noise
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Radius from center in XY
    float r = length(pos.xy);
    vDistToCenter = r;

    // Relativistic vortex twist around Z axis
    float twistAngle = (3.5 / (r + 0.4)) * (0.8 + uWarpIntensity * 0.5) - uTime * 0.8;
    float cosT = cos(twistAngle);
    float sinT = sin(twistAngle);
    vec2 twistedXY = vec2(
      pos.x * cosT - pos.y * sinT,
      pos.x * sinT + pos.y * cosT
    );
    pos.x = twistedXY.x;
    pos.y = twistedXY.y;

    // Gravitational space funnel along Z axis
    float funnelDepth = -2.2 / (r + 0.65) * (1.0 + uWarpIntensity * 0.6);
    pos.z += funnelDepth;

    // Plasma turbulence
    float noise = snoise(pos * 0.8 + vec3(0.0, 0.0, uTime * 0.5));
    pos += normal * (noise * 0.22 * uDistortion);

    // Shockwave ripple
    if (uShockwave > 0.0 && uShockwave < 1.0) {
      float waveDist = abs(r - uShockwave * 3.8);
      float shock = sin(waveDist * 16.0) * exp(-waveDist * 3.5) * (1.0 - uShockwave);
      pos.z += shock * 0.8;
      pos.xy += normalize(pos.xy + 0.001) * shock * 0.4;
    }

    // Interactive mouse pull
    vec2 toMouse = pos.xy - uMouse * 2.0;
    float distMouse = length(toMouse);
    if (distMouse < 3.0) {
      pos.z += (1.0 - distMouse / 3.0) * 0.4;
    }

    vPosition = pos;
    vNormal = normalize(normalMatrix * normal);

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    vec3 viewDir = normalize(cameraPosition - worldPos.xyz);
    vFresnel = pow(1.0 - max(0.0, dot(viewDir, vNormal)), 2.6);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const portalFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorViolet; // #7C3AED
  uniform vec3 uColorCyan;   // #06B6D4
  uniform vec3 uColorRose;   // #F472B6
  uniform float uSingularityPurity; // 0 to 1
  uniform float uGlowBoost;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vDistToCenter;
  varying float vFresnel;

  void main() {
    float r = vDistToCenter;

    // Event horizon singularity core: pure dark void in the center
    float horizonMask = smoothstep(0.45, 0.95, r);

    // High-speed plasma bands
    float angle = atan(vPosition.y, vPosition.x);
    float spiral = sin(angle * 8.0 - r * 14.0 + uTime * 4.5);
    float bands = sin(r * 24.0 - uTime * 3.0) * 0.5 + 0.5;

    // Neon energy gradient: Violet -> Cyan -> Rose
    vec3 plasma = mix(uColorViolet, uColorCyan, clamp(spiral * 0.5 + 0.5, 0.0, 1.0));
    plasma = mix(plasma, uColorRose, clamp(bands * vFresnel * 1.5, 0.0, 1.0));

    // Outer relativistic accretion flare
    float accretion = pow(1.0 / (r * 0.7 + 0.3), 1.8) * 0.4;
    vec3 finalColor = plasma * accretion;

    // Core glow & Fresnel border
    finalColor += uColorCyan * pow(vFresnel, 1.8) * (1.6 + uGlowBoost);
    finalColor += uColorRose * (spiral * 0.4 + 0.2);

    // Cut out inner singularity hole (the portal aperture leading to the other dimension)
    finalColor *= horizonMask;

    // Inner rim intense photon ring
    float photonRing = exp(-pow(r - 0.75, 2.0) * 45.0);
    finalColor += vec3(0.9, 0.95, 1.0) * photonRing * 3.0;

    gl_FragColor = vec4(finalColor, 0.92);
  }
`;

// Holographic Reticle Grid Shader for concentric cyber rings
export const hologramVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uRotationSpeed;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const hologramFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;

  varying vec2 vUv;

  void main() {
    vec2 p = vUv - vec2(0.5);
    float dist = length(p);

    // Thin laser concentric ring
    float ring1 = smoothstep(0.015, 0.005, abs(dist - 0.46));
    float ring2 = smoothstep(0.012, 0.004, abs(dist - 0.40));
    
    // Ticks & notches
    float angle = atan(p.y, p.x);
    float notches = step(0.94, sin(angle * 32.0 + uTime * 0.5));

    float alpha = (ring1 * 1.5 + ring2 * 0.8 + notches * ring2 * 2.0) * uOpacity;
    if (alpha < 0.02) discard;

    gl_FragColor = vec4(uColor, alpha);
  }
`;
