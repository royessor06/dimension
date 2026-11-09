import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import {
  portalVertexShader,
  portalFragmentShader,
  hologramVertexShader,
  hologramFragmentShader,
} from '../glsl/portalShader';
import { particleVertexShader, particleFragmentShader } from '../glsl/particleShader';
import { soundEngine } from '../audio/soundEngine';

export interface DimensionCanvasProps {
  currentSection: number; // 0 to 6
  scrollProgress: number; // 0 to 1
  selectedTechIndex: number; // 0, 1, 2
  warpIntensity: number; // 0.1 to 2.5
  onPortalClick?: () => void;
}

export const DimensionCanvas: React.FC<DimensionCanvasProps> = ({
  currentSection,
  scrollProgress,
  selectedTechIndex,
  warpIntensity,
  onPortalClick,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef({
    currentSection,
    scrollProgress,
    selectedTechIndex,
    warpIntensity,
  });

  useEffect(() => {
    propsRef.current = {
      currentSection,
      scrollProgress,
      selectedTechIndex,
      warpIntensity,
    };
  }, [currentSection, scrollProgress, selectedTechIndex, warpIntensity]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect software WebGL as per guidelines
    const isSoftwareGl = (() => {
      try {
        const glProbe = document.createElement('canvas').getContext('webgl2');
        if (!glProbe) return true;
        const ext = glProbe.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : glProbe.RENDERER;
        const gpu = String(glProbe.getParameter(param));
        glProbe.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.045);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 2. Post-Processing Pipeline (UnrealBloomPass for Cyberpunk Neon Glow)
    let composer: EffectComposer | null = null;
    let bloomPass: UnrealBloomPass | null = null;
    let fxaaPass: ShaderPass | null = null;

    if (!isSoftwareGl) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.85, // Vibrant cyberpunk neon glow
        0.42, // Spread radius
        0.82  // Threshold
      );
      composer.addPass(bloomPass);

      fxaaPass = new ShaderPass(FXAAShader);
      const pr = renderer.getPixelRatio();
      fxaaPass.material.uniforms['resolution'].value.set(1 / (width * pr), 1 / (height * pr));
      composer.addPass(fxaaPass);
    }

    // 3. Cyberpunk Neon Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x0a0c20, 1.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06B6D4, 5.0, 20);
    cyanLight.position.set(3, 3, 2);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x7C3AED, 6.0, 20);
    violetLight.position.set(-3, -2, 2);
    scene.add(violetLight);

    const roseLight = new THREE.PointLight(0xF472B6, 4.5, 18);
    roseLight.position.set(0, 4, -2);
    scene.add(roseLight);

    // 4. Central 3D Luminous Portal Group
    const portalGroup = new THREE.Group();

    // 4A. Accretion Disk / Event Horizon Mesh
    const diskSegments = isSoftwareGl ? 48 : 80;
    const diskGeo = new THREE.RingGeometry(0.3, 3.4, diskSegments, 32);

    const portalUniforms = {
      uTime: { value: 0.0 },
      uDistortion: { value: 1.0 },
      uWarpIntensity: { value: warpIntensity },
      uShockwave: { value: 0.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorViolet: { value: new THREE.Color(0x7C3AED) },
      uColorCyan: { value: new THREE.Color(0x06B6D4) },
      uColorRose: { value: new THREE.Color(0xF472B6) },
      uSingularityPurity: { value: 0.95 },
      uGlowBoost: { value: 0.0 },
    };

    const portalMaterial = new THREE.ShaderMaterial({
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
      uniforms: portalUniforms,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const portalMesh = new THREE.Mesh(diskGeo, portalMaterial);
    portalGroup.add(portalMesh);

    // 4B. Inner Singularity Void Sphere
    const voidGeo = new THREE.SphereGeometry(0.72, 32, 32);
    const voidMat = new THREE.MeshBasicMaterial({ color: 0x010206 });
    const voidMesh = new THREE.Mesh(voidGeo, voidMat);
    portalGroup.add(voidMesh);

    // 4C. Concentric Holographic HUD Cyber Rings
    const ringGroup = new THREE.Group();

    // Ring 1 (Inner Cyan)
    const ringGeo1 = new THREE.PlaneGeometry(5.2, 5.2);
    const ringMat1 = new THREE.ShaderMaterial({
      vertexShader: hologramVertexShader,
      fragmentShader: hologramFragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Color(0x06B6D4) },
        uOpacity: { value: 0.8 },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringGroup.add(ring1);

    // Ring 2 (Outer Violet)
    const ringGeo2 = new THREE.PlaneGeometry(6.6, 6.6);
    const ringMat2 = new THREE.ShaderMaterial({
      vertexShader: hologramVertexShader,
      fragmentShader: hologramFragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uColor: { value: new THREE.Color(0x7C3AED) },
        uOpacity: { value: 0.7 },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringGroup.add(ring2);

    // Outer Geodesic Laser Cage
    const cageGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xF472B6,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    portalGroup.add(cageMesh);

    portalGroup.add(ringGroup);
    scene.add(portalGroup);

    // 5. Three Interactive Cyberpunk Technology Artifacts (Section 3: TECHNOLOGY)
    const techGroup = new THREE.Group();
    techGroup.position.set(0, -22, 0);

    // Tech 1: Quantum Tesseract (Nested Wireframe Cubes)
    const tesseractGroup = new THREE.Group();
    tesseractGroup.position.set(-2.8, 0, 0);
    const cubeOuter = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1.4, 1.4),
      new THREE.MeshStandardMaterial({ color: 0x06B6D4, wireframe: true, roughness: 0.1 })
    );
    const cubeInner = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 0.8, 0.8),
      new THREE.MeshStandardMaterial({ color: 0xF472B6, wireframe: true, roughness: 0.1 })
    );
    tesseractGroup.add(cubeOuter, cubeInner);
    techGroup.add(tesseractGroup);

    // Tech 2: Tachyon Flux Relay (Toroidal Plasma Coil)
    const relayGroup = new THREE.Group();
    relayGroup.position.set(0, 0, 0);
    const relayTorus = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.22, 16, 64),
      new THREE.MeshStandardMaterial({ color: 0x7C3AED, metalness: 0.9, roughness: 0.15 })
    );
    const relayCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.4, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x06B6D4 })
    );
    relayGroup.add(relayTorus, relayCore);
    techGroup.add(relayGroup);

    // Tech 3: Holographic Neuro-Matrix (Geodesic Dodecahedron)
    const matrixGroup = new THREE.Group();
    matrixGroup.position.set(2.8, 0, 0);
    const matrixGeo = new THREE.DodecahedronGeometry(0.95, 0);
    const matrixMesh = new THREE.Mesh(
      matrixGeo,
      new THREE.MeshPhysicalMaterial({
        color: 0x030712,
        emissive: 0xF472B6,
        emissiveIntensity: 0.5,
        roughness: 0.1,
        metalness: 0.8,
        clearcoat: 1.0,
      })
    );
    matrixGroup.add(matrixMesh);
    techGroup.add(matrixGroup);

    scene.add(techGroup);

    // 6. Worlds Gallery Cluster (Section 4: WORLDS)
    const worldsGroup = new THREE.Group();
    worldsGroup.position.set(0, -38, 0);

    const worldNodes: THREE.Mesh[] = [];
    const worldCount = 6;
    for (let i = 0; i < worldCount; i++) {
      const g = i % 2 === 0
        ? new THREE.TorusGeometry(0.7, 0.08, 16, 48)
        : new THREE.IcosahedronGeometry(0.65, 1);
      const m = new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? 0x06B6D4 : (i % 3 === 1 ? 0x7C3AED : 0xF472B6),
        wireframe: i % 2 === 1,
        metalness: 0.85,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(g, m);
      const angle = (i / worldCount) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 3.4, (Math.random() - 0.5) * 1.8, Math.sin(angle) * 3.4);
      worldsGroup.add(mesh);
      worldNodes.push(mesh);
    }
    scene.add(worldsGroup);

    // 7. Volumetric Energetic Particle Jet (4,000+ particles)
    const particleCount = isSoftwareGl ? 1400 : 4200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);
    const velocities = new Float32Array(particleCount * 3);
    const lifespans = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = -3.0;

      scales[i] = 0.6 + Math.random() * 1.4;
      phases[i] = Math.random();
      lifespans[i] = 0.7 + Math.random() * 0.8;

      velocities[i * 3] = (Math.random() - 0.5) * 0.6;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
      velocities[i * 3 + 2] = 0.8 + Math.random() * 1.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    particleGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
    particleGeo.setAttribute('aVelocity', new THREE.BufferAttribute(velocities, 3));
    particleGeo.setAttribute('aLifespan', new THREE.BufferAttribute(lifespans, 1));

    const particleUniforms = {
      uTime: { value: 0.0 },
      uTurbulence: { value: 1.0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScatter: { value: 0.0 },
      uSpeed: { value: 1.0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
    };

    const particleMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      uniforms: particleUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particleSystem);

    // 8. Raycasting and Interactive Pointer & Mobile Gyroscope
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-100, -100);
    const targetMouse = new THREE.Vector2(0, 0);
    const currentMouse = new THREE.Vector2(0, 0);

    let shockwaveTime = -10.0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(x, y);
      targetMouse.set(x, y);

      const speed = Math.hypot(x - currentMouse.x, y - currentMouse.y);
      soundEngine.modulateAtmosphere(speed * 2.2);
    };

    // Mobile Gyroscope support
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamp angles to subtle [-1, 1] range
        const gammaClamped = Math.max(-30, Math.min(30, e.gamma)) / 30;
        const betaClamped = Math.max(-30, Math.min(30, e.beta - 45)) / 30;
        targetMouse.set(gammaClamped, -betaClamped);
      }
    };
    window.addEventListener('deviceorientation', handleOrientation);

    const triggerPortalJump = () => {
      shockwaveTime = performance.now() * 0.001;
      portalUniforms.uGlowBoost.value = 2.0;
      soundEngine.playShockwave();
      if (onPortalClick) onPortalClick();
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(x, y);

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObject(portalMesh);
      if (intersects.length > 0) {
        triggerPortalJump();
      } else {
        triggerPortalJump();
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('click', handleClick);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (composer) {
        composer.setSize(w, h);
        if (bloomPass) bloomPass.resolution.set(w, h);
        if (fxaaPass) {
          const pr = renderer.getPixelRatio();
          fxaaPass.material.uniforms['resolution'].value.set(1 / (w * pr), 1 / (h * pr));
        }
      }
      particleUniforms.uPixelRatio.value = renderer.getPixelRatio();
    };
    window.addEventListener('resize', handleResize);

    // 10. Camera Choreography Targets across the 7 Sections
    // 0: PORTAL (Hero entrance)
    // 1: TRANSMISSION (Particle stream macro)
    // 2: TECHNOLOGY (Focus on 3 tech artifacts)
    // 3: WORLDS (Panoramic orbiting worlds)
    // 4: ENERGY (High-speed particle vortex burst)
    // 5: ENTER (Hyperspace dive into portal core)
    // 6: TERMINAL (Global command view)
    const sectionTargets = [
      { camPos: new THREE.Vector3(0, 0, 7.8), lookAt: new THREE.Vector3(0, 0, 0), portalPos: new THREE.Vector3(0, 0, 0), scatter: 0.0 },
      { camPos: new THREE.Vector3(2.4, 0.6, 6.0), lookAt: new THREE.Vector3(-0.6, 0, 0), portalPos: new THREE.Vector3(-1.0, 0.2, 0), scatter: 0.3 },
      { camPos: new THREE.Vector3(0, -22, 6.8), lookAt: new THREE.Vector3(0, -22, 0), portalPos: new THREE.Vector3(0, 12, 0), scatter: 0.15 },
      { camPos: new THREE.Vector3(0, -38, 8.2), lookAt: new THREE.Vector3(0, -38, 0), portalPos: new THREE.Vector3(0, 12, 0), scatter: 0.4 },
      { camPos: new THREE.Vector3(-1.6, 2.0, 5.8), lookAt: new THREE.Vector3(0, -0.2, 0), portalPos: new THREE.Vector3(0.4, -0.4, 0), scatter: 0.8 },
      { camPos: new THREE.Vector3(0, 0, 3.8), lookAt: new THREE.Vector3(0, 0, -2.0), portalPos: new THREE.Vector3(0, 0, 0), scatter: 0.1 },
      { camPos: new THREE.Vector3(0, 0.5, 8.0), lookAt: new THREE.Vector3(0, 0, 0), portalPos: new THREE.Vector3(0, 0, 0), scatter: 0.0 },
    ];

    const currentCamPos = new THREE.Vector3(0, 0, 8.2);
    const currentCamLookAt = new THREE.Vector3(0, 0, 0);
    const currentPortalPos = new THREE.Vector3(0, 0, 0);

    // 11. Animation Loop
    const clock = new THREE.Clock();
    let frameId = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const tick = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();
      const props = propsRef.current;

      // Update uniforms
      portalUniforms.uTime.value = elapsedTime;
      portalUniforms.uWarpIntensity.value = props.warpIntensity;
      particleUniforms.uTime.value = elapsedTime;
      ringMat1.uniforms.uTime.value = elapsedTime;
      ringMat2.uniforms.uTime.value = elapsedTime;

      // Glow boost decay
      portalUniforms.uGlowBoost.value = THREE.MathUtils.damp(
        portalUniforms.uGlowBoost.value,
        0.0,
        2.5,
        delta
      );

      // Inertial mouse damping
      const mouseFactor = prefersReducedMotion ? 0.3 : 1.0;
      currentMouse.x = THREE.MathUtils.damp(currentMouse.x, targetMouse.x * mouseFactor, 3.5, delta);
      currentMouse.y = THREE.MathUtils.damp(currentMouse.y, targetMouse.y * mouseFactor, 3.5, delta);
      portalUniforms.uMouse.value.set(currentMouse.x, currentMouse.y);
      particleUniforms.uMouse.value.set(currentMouse.x, currentMouse.y);

      // Shockwave timing
      const shockElapsed = elapsedTime - shockwaveTime;
      if (shockElapsed >= 0.0 && shockElapsed <= 1.2) {
        portalUniforms.uShockwave.value = shockElapsed / 1.2;
      } else {
        portalUniforms.uShockwave.value = 0.0;
      }

      // Camera choreography interpolation
      const secIdx = Math.max(0, Math.min(sectionTargets.length - 1, props.currentSection));
      const target = sectionTargets[secIdx];

      // Track selected tech artifact when in TECHNOLOGY section
      if (secIdx === 2) {
        const techX = (props.selectedTechIndex - 1) * 2.8;
        target.camPos.x = techX * 0.75;
        target.lookAt.x = techX;
      }

      const parallax = new THREE.Vector3(currentMouse.x * 0.4, currentMouse.y * 0.3, 0);
      const targetCam = target.camPos.clone().add(parallax);

      currentCamPos.lerp(targetCam, delta * 2.6);
      currentCamLookAt.lerp(target.lookAt, delta * 2.8);
      currentPortalPos.lerp(target.portalPos, delta * 2.6);

      camera.position.copy(currentCamPos);
      camera.lookAt(currentCamLookAt);

      portalGroup.position.copy(currentPortalPos);

      // Real-time counter-rotations
      const speed = prefersReducedMotion ? 0.1 : 0.35;
      portalMesh.rotation.z = -elapsedTime * speed * 0.8;
      ring1.rotation.z = elapsedTime * speed * 0.6;
      ring2.rotation.z = -elapsedTime * speed * 0.45;
      cageMesh.rotation.x = elapsedTime * speed * 0.2;
      cageMesh.rotation.y = elapsedTime * speed * 0.25;

      // Animate tech artifacts
      tesseractGroup.rotation.x = elapsedTime * 0.4;
      tesseractGroup.rotation.y = elapsedTime * 0.5;
      cubeInner.rotation.x = -elapsedTime * 0.8;

      relayTorus.rotation.y = elapsedTime * 0.6;
      relayTorus.rotation.x = Math.sin(elapsedTime * 0.4) * 0.3;

      matrixMesh.rotation.y = -elapsedTime * 0.4;
      matrixMesh.rotation.z = elapsedTime * 0.3;

      // Animate worlds nodes
      for (let i = 0; i < worldNodes.length; i++) {
        const wNode = worldNodes[i];
        wNode.rotation.x = elapsedTime * (0.2 + (i % 2) * 0.15);
        wNode.rotation.y = elapsedTime * (0.25 + (i % 3) * 0.1);
      }

      // Particle scatter
      particleUniforms.uScatter.value = THREE.MathUtils.damp(
        particleUniforms.uScatter.value,
        target.scatter,
        3.0,
        delta
      );

      // Render with bloom post-processing on GPU, or direct on software GL
      if (composer && !isSoftwareGl) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // 12. Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('resize', handleResize);

      diskGeo.dispose();
      portalMaterial.dispose();
      voidGeo.dispose();
      voidMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (composer) composer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden"
      style={{ touchAction: 'none' }}
    />
  );
};
