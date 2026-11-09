/**
 * Custom GLSL Shaders for the Monumental Organic Sculpture — DIMENSION
 * Luxury Cinematic Edition: Graphite black base, electric violet, cyan, and rose
 * with Blinn-Phong specular sheen, Fresnel dispersion, and smooth liquid morphing.
 */

export const organicVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uDeformIntensity;
  uniform float uNoiseFrequency;
  uniform float uShockwaveProgress;
  uniform vec3 uShockwaveOrigin;
  uniform vec2 uMouse;
  uniform float uMorph;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vFresnel;

  // 3D Simplex noise
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

  float fbm(vec3 p) {
    float val = 0.0;
    float amp = 0.55;
    float freq = 1.0;
    for (int i = 0; i < 4; i++) {
      val += amp * snoise(p * freq);
      freq *= 2.08;
      amp *= 0.48;
    }
    return val;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Subtle breathing time
    float t = uTime * 0.35;
    vec3 noiseCoord = pos * uNoiseFrequency + vec3(t * 0.15, t * 0.22, t * 0.1);

    // Mouse kinetic pressure wave
    float mouseDistance = length(pos.xy - uMouse * 1.8);
    float mouseWave = sin(mouseDistance * 3.5 - uTime * 2.5) * exp(-mouseDistance * 1.1) * 0.28;

    // Organic displacement
    float displacement = fbm(noiseCoord) * uDeformIntensity + mouseWave;

    // Geometric morphing modulation between spheres and crystalline ridges
    float geometricRidge = sin(pos.x * 4.0) * cos(pos.y * 4.0) * sin(pos.z * 4.0) * 0.2 * uMorph;
    displacement += geometricRidge;

    // Shockwave ripple
    if (uShockwaveProgress > 0.0 && uShockwaveProgress < 1.0) {
      float distToOrigin = length(pos - uShockwaveOrigin);
      float waveRadius = uShockwaveProgress * 4.0;
      float waveDist = abs(distToOrigin - waveRadius);
      float shock = sin(waveDist * 14.0) * exp(-waveDist * 4.2) * (1.0 - uShockwaveProgress);
      displacement += shock * 0.55;
    }

    vec3 newPos = pos + normal * displacement;

    // Tangent normal recalculation for authentic specular highlights
    float offset = 0.02;
    vec3 tangent1 = vec3(normal.y, -normal.x, 0.0);
    if (length(tangent1) < 0.001) tangent1 = vec3(0.0, normal.z, -normal.y);
    tangent1 = normalize(tangent1);
    vec3 tangent2 = normalize(cross(normal, tangent1));

    vec3 p1 = pos + tangent1 * offset;
    vec3 p2 = pos + tangent2 * offset;
    float d1 = fbm(p1 * uNoiseFrequency + vec3(t * 0.15, t * 0.22, t * 0.1)) * uDeformIntensity;
    float d2 = fbm(p2 * uNoiseFrequency + vec3(t * 0.15, t * 0.22, t * 0.1)) * uDeformIntensity;

    vec3 displacedP1 = p1 + normal * d1;
    vec3 displacedP2 = p2 + normal * d2;
    vec3 newNormal = normalize(cross(displacedP1 - newPos, displacedP2 - newPos));

    vNormal = normalize(normalMatrix * (newNormal != vec3(0.0) ? newNormal : normal));
    vPosition = newPos;
    vDisplacement = displacement;

    vec4 worldPos = modelMatrix * vec4(newPos, 1.0);
    vWorldPosition = worldPos.xyz;

    vec3 viewDir = normalize(cameraPosition - worldPos.xyz);
    vFresnel = pow(1.0 - max(0.0, dot(viewDir, vNormal)), 3.2);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const organicFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform int uMaterialMode; // 0: Iridescent Chrome, 1: Pure Liquid Mercury, 2: Dark Optical Crystal
  uniform vec3 uColorBase;   // Graphite #050510
  uniform vec3 uColorViolet; // Electric violet #7928ca
  uniform vec3 uColorCyan;   // Cyan #00f2fe
  uniform vec3 uColorPink;   // Rose #ff007a
  uniform float uRoughness;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec3 vWorldPosition;
  varying vec2 vUv;
  varying float vDisplacement;
  varying float vFresnel;

  void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);

    // Cinematic 3-point studio lighting
    vec3 keyLight = normalize(vec3(2.5, 4.0, 3.0));
    vec3 fillLight = normalize(vec3(-3.0, -1.5, 2.0));
    vec3 rimLight = normalize(vec3(0.0, -3.0, -4.0));

    float diffKey = max(dot(normal, keyLight), 0.0);
    float diffFill = max(dot(normal, fillLight), 0.0);
    float diffRim = max(dot(normal, rimLight), 0.0);

    // Blinn-Phong Specular
    vec3 halfKey = normalize(keyLight + viewDir);
    float specKey = pow(max(dot(normal, halfKey), 0.0), 64.0);

    vec3 halfFill = normalize(fillLight + viewDir);
    float specFill = pow(max(dot(normal, halfFill), 0.0), 40.0);

    // Pseudo-environment metallic reflection vector
    vec3 reflectDir = reflect(-viewDir, normal);
    float envReflect = sin(reflectDir.x * 4.0 + uTime * 0.4) * sin(reflectDir.y * 4.0) * cos(reflectDir.z * 4.0);
    envReflect = envReflect * 0.5 + 0.5;

    // Prismatic chromatic dispersion (Violet -> Cyan -> Rose)
    float dispersion = clamp(vDisplacement * 1.8 + vFresnel * 1.4, 0.0, 1.0);
    vec3 chromaticColor = mix(uColorViolet, uColorCyan, dispersion);
    chromaticColor = mix(chromaticColor, uColorPink, pow(vFresnel, 2.2));

    vec3 finalColor = vec3(0.0);

    if (uMaterialMode == 0) {
      // MODE 0: Iridescent Graphite Glass & Chrome
      vec3 base = mix(uColorBase, vec3(0.04, 0.04, 0.10), diffKey * 0.6 + 0.2);
      finalColor = base + chromaticColor * (vFresnel * 1.6 + 0.15);
      finalColor += vec3(0.95, 0.98, 1.0) * (specKey * 2.2 + specFill * 0.8);
      finalColor += uColorCyan * diffRim * 0.4;
    } else if (uMaterialMode == 1) {
      // MODE 1: Pure Liquid Mercury
      vec3 chromeTint = mix(vec3(0.08, 0.09, 0.16), vec3(0.92, 0.96, 1.0), envReflect * 0.75 + 0.25);
      chromeTint += chromaticColor * vFresnel * 1.2;
      chromeTint += vec3(1.0) * (specKey * 3.0 + specFill * 1.2);
      finalColor = chromeTint;
    } else {
      // MODE 2: Dark Optical Crystal
      vec3 core = mix(vec3(0.02, 0.02, 0.06), uColorViolet * 0.4, pow(vFresnel, 1.5));
      finalColor = core + uColorPink * (specKey * 1.8) + uColorCyan * (vFresnel * 2.0);
    }

    // Elegant depth falloff
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;
