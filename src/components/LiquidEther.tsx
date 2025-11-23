import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LiquidEtherProps {
  colors?: string[];
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  resolution?: number;
  isBounce?: boolean;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

export default function LiquidEther({
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  autoDemo = true,
  autoSpeed = 0.5,
  autoIntensity = 2.2,
}: LiquidEtherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create liquid silk wave geometry
    const geometry = new THREE.PlaneGeometry(12, 8, 128, 128);
    const positions = geometry.attributes.position;

    // Custom shader for liquid silk effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(colors[0]) },
        uColor2: { value: new THREE.Color(colors[1]) },
        uColor3: { value: new THREE.Color(colors[2]) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying float vWave;
        
        void main() {
          vUv = uv;
          vec3 pos = position;
          
          // Fluid wave motion
          float wave1 = sin(pos.x * 0.8 + uTime * 0.5) * 0.3;
          float wave2 = sin(pos.y * 0.6 + uTime * 0.4) * 0.25;
          float wave3 = cos(pos.x * 0.5 + pos.y * 0.5 + uTime * 0.3) * 0.2;
          
          pos.z += wave1 + wave2 + wave3;
          vWave = wave1 + wave2 + wave3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec2 vUv;
        varying float vWave;
        
        void main() {
          // Smooth color blending
          vec3 color = mix(uColor1, uColor2, vUv.x);
          color = mix(color, uColor3, vUv.y);
          
          // Add silky highlights
          float highlight = smoothstep(0.2, 0.8, vWave + 0.5);
          color += vec3(highlight * 0.15);
          
          // Soft vignette for depth
          float vignette = 1.0 - length(vUv - 0.5) * 0.5;
          color *= vignette;
          
          gl_FragColor = vec4(color, 0.95);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Auto animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      if (autoDemo) {
        time += autoSpeed * 0.016; // ~60fps
        material.uniforms.uTime.value = time * autoIntensity;
        
        // Gentle rotation for premium feel
        mesh.rotation.x = Math.sin(time * 0.2) * 0.1;
        mesh.rotation.y = Math.cos(time * 0.15) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [colors, autoDemo, autoSpeed, autoIntensity]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    />
  );
}
