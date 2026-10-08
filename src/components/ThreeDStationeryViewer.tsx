import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Play, Pause, Sparkles, ZoomIn, ZoomOut, Eye } from 'lucide-react';

interface ThreeDStationeryViewerProps {
  modelType?: 'notebook' | 'pen' | 'pencil_case' | 'highlighter' | 'desk_organizer' | 'bottle';
  initialColor?: string;
  allowColorSwitch?: boolean;
}

export const ThreeDStationeryViewer: React.FC<ThreeDStationeryViewerProps> = ({
  modelType = 'notebook',
  initialColor = '#D8B4E2',
  allowColorSwitch = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [currentColor, setCurrentColor] = useState<string>(initialColor);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<'notebook' | 'pen' | 'desk_organizer' | 'bottle'>(
    modelType === 'bottle' ? 'bottle' : modelType === 'pencil_case' || modelType === 'highlighter' ? 'pen' : (modelType as any)
  );

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  const colorOptions = [
    { name: 'Lilac Dream', hex: '#D8B4E2' },
    { name: 'Sage Matcha', hex: '#A7D7C5' },
    { name: 'Peach Sorbet', hex: '#FBC4AB' },
    { name: 'Sky Cadet', hex: '#A2C4C9' },
    { name: 'Butter Cream', hex: '#FEF08A' },
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 350;

    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 3.8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffaf0, 1.5);
    dirLight1.position.set(5, 8, 6);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xe0f2fe, 0.7);
    dirLight2.position.set(-5, -2, -3);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xfff5ea, 1.2, 10);
    pointLight.position.set(0, 3, 2);
    scene.add(pointLight);

    // Group to hold models
    const group = new THREE.Group();
    scene.add(group);
    meshGroupRef.current = group;

    buildModel(group, activeModel, currentColor, isWireframe);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && meshGroupRef.current && !isDraggingRef.current) {
        meshGroupRef.current.rotation.y += 0.008;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse drag rotation controls
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !meshGroupRef.current) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || !meshGroupRef.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      meshGroupRef.current.rotation.y += deltaX * 0.01;
      meshGroupRef.current.rotation.x += deltaY * 0.01;

      previousMousePositionRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElement.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domElement.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [activeModel]);

  // Update materials when color or wireframe changes
  useEffect(() => {
    if (!meshGroupRef.current) return;
    buildModel(meshGroupRef.current, activeModel, currentColor, isWireframe);
  }, [currentColor, isWireframe, activeModel]);

  // Camera zoom
  useEffect(() => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = 3.8 / zoomLevel;
  }, [zoomLevel]);

  const buildModel = (
    group: THREE.Group,
    type: 'notebook' | 'pen' | 'desk_organizer' | 'bottle',
    hexColor: string,
    wireframe: boolean
  ) => {
    // Clear previous children
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }
    materialsRef.current = [];

    const baseColor = new THREE.Color(hexColor);
    const goldColor = new THREE.Color(0xd4af37);
    const paperColor = new THREE.Color(0xfcfbf7);
    const chromeColor = new THREE.Color(0xcccccc);

    if (type === 'notebook') {
      // Hardcover notebook
      // 1. Front cover
      const coverMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.35,
        metalness: 0.1,
        wireframe,
      });
      materialsRef.current.push(coverMat);

      const coverGeom = new THREE.BoxGeometry(1.6, 2.2, 0.05);
      const frontCover = new THREE.Mesh(coverGeom, coverMat);
      frontCover.position.set(0, 0, 0.16);
      group.add(frontCover);

      // Back cover
      const backCover = new THREE.Mesh(coverGeom, coverMat);
      backCover.position.set(0, 0, -0.16);
      group.add(backCover);

      // Spine
      const spineGeom = new THREE.BoxGeometry(0.06, 2.2, 0.36);
      const spine = new THREE.Mesh(spineGeom, coverMat);
      spine.position.set(-0.82, 0, 0);
      group.add(spine);

      // Paper pages block (Cream 160 GSM block)
      const paperMat = new THREE.MeshStandardMaterial({
        color: paperColor,
        roughness: 0.9,
        wireframe,
      });
      const paperGeom = new THREE.BoxGeometry(1.5, 2.1, 0.28);
      const paperBlock = new THREE.Mesh(paperGeom, paperMat);
      paperBlock.position.set(0.02, 0, 0);
      group.add(paperBlock);

      // Gold Bookmark Ribbon hanging out
      const ribbonMat = new THREE.MeshStandardMaterial({
        color: goldColor,
        roughness: 0.2,
        metalness: 0.6,
      });
      const ribbonGeom = new THREE.BoxGeometry(0.1, 0.9, 0.02);
      const ribbon = new THREE.Mesh(ribbonGeom, ribbonMat);
      ribbon.position.set(0.2, -1.3, 0.02);
      ribbon.rotation.z = -0.15;
      group.add(ribbon);

      // Elastic closure band
      const bandMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(hexColor).multiplyScalar(0.7),
        roughness: 0.6,
      });
      const bandGeom = new THREE.BoxGeometry(0.12, 2.22, 0.38);
      const band = new THREE.Mesh(bandGeom, bandMat);
      band.position.set(0.6, 0, 0);
      group.add(band);

      // Initial angle tilt
      group.rotation.set(0.2, 0.4, 0);
    } else if (type === 'pen') {
      // Aesthetic Gel Pen
      // Barrel
      const barrelMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.3,
        wireframe,
      });
      const barrelGeom = new THREE.CylinderGeometry(0.09, 0.09, 2.0, 32);
      const barrel = new THREE.Mesh(barrelGeom, barrelMat);
      group.add(barrel);

      // Grip section (Matte silicone)
      const gripMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(hexColor).multiplyScalar(0.85),
        roughness: 0.8,
        wireframe,
      });
      const gripGeom = new THREE.CylinderGeometry(0.105, 0.1, 0.7, 32);
      const grip = new THREE.Mesh(gripGeom, gripMat);
      grip.position.set(0, -0.6, 0);
      group.add(grip);

      // Chrome Tip
      const tipMat = new THREE.MeshStandardMaterial({
        color: chromeColor,
        metalness: 0.9,
        roughness: 0.1,
      });
      const tipGeom = new THREE.ConeGeometry(0.08, 0.35, 32);
      const tip = new THREE.Mesh(tipGeom, tipMat);
      tip.position.set(0, -1.12, 0);
      tip.rotation.x = Math.PI;
      group.add(tip);

      // Chrome Pen Clip
      const clipGeom = new THREE.BoxGeometry(0.04, 0.8, 0.16);
      const clip = new THREE.Mesh(clipGeom, tipMat);
      clip.position.set(0, 0.6, 0.14);
      group.add(clip);

      // Cap Click Button
      const capGeom = new THREE.CylinderGeometry(0.07, 0.07, 0.25, 32);
      const cap = new THREE.Mesh(capGeom, tipMat);
      cap.position.set(0, 1.1, 0);
      group.add(cap);

      group.rotation.set(0.4, 0.3, 0.6);
    } else if (type === 'bottle') {
      // 3D HydroPastel Vacuum Thermal Flask
      // Main Flask Cylinder
      const bottleMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.25,
        metalness: 0.2,
        wireframe,
      });
      const bodyGeom = new THREE.CylinderGeometry(0.45, 0.45, 1.7, 32);
      const body = new THREE.Mesh(bodyGeom, bottleMat);
      group.add(body);

      // Shoulder taper
      const shoulderGeom = new THREE.CylinderGeometry(0.28, 0.45, 0.3, 32);
      const shoulder = new THREE.Mesh(shoulderGeom, bottleMat);
      shoulder.position.set(0, 1.0, 0);
      group.add(shoulder);

      // Neck & Cap
      const capMat = new THREE.MeshStandardMaterial({
        color: 0x292524,
        roughness: 0.5,
      });
      const capGeom = new THREE.CylinderGeometry(0.25, 0.28, 0.35, 32);
      const cap = new THREE.Mesh(capGeom, capMat);
      cap.position.set(0, 1.3, 0);
      group.add(cap);

      // Carrying loop handle
      const handleGeom = new THREE.TorusGeometry(0.18, 0.04, 16, 32);
      const handle = new THREE.Mesh(handleGeom, capMat);
      handle.position.set(0, 1.52, 0);
      handle.rotation.x = Math.PI / 2;
      group.add(handle);

      // Chrome rim ring
      const chromeRimMat = new THREE.MeshStandardMaterial({
        color: chromeColor,
        metalness: 0.9,
        roughness: 0.1,
      });
      const rimGeom = new THREE.CylinderGeometry(0.29, 0.29, 0.04, 32);
      const rim = new THREE.Mesh(rimGeom, chromeRimMat);
      rim.position.set(0, 1.15, 0);
      group.add(rim);

      group.rotation.set(0.2, 0, 0);
    } else {
      // Rotating Desk Organizer Caddy
      const caddyMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.4,
        wireframe,
      });

      // Main base cylinder
      const baseGeom = new THREE.CylinderGeometry(1.0, 1.1, 0.2, 32);
      const base = new THREE.Mesh(baseGeom, caddyMat);
      base.position.set(0, -0.7, 0);
      group.add(base);

      // Center high cylinder
      const centerGeom = new THREE.CylinderGeometry(0.4, 0.4, 1.5, 32);
      const center = new THREE.Mesh(centerGeom, caddyMat);
      center.position.set(0, 0.1, 0);
      group.add(center);

      // 4 peripheral lower cup cylinders
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const cupGeom = new THREE.CylinderGeometry(0.35, 0.35, 1.0, 32);
        const cup = new THREE.Mesh(cupGeom, caddyMat);
        cup.position.set(Math.cos(angle) * 0.65, -0.15, Math.sin(angle) * 0.65);
        group.add(cup);

        // Put a simulated pastel pen in each cup
        const penStickMat = new THREE.MeshStandardMaterial({
          color: i % 2 === 0 ? 0xffc6ff : 0xbdb2ff,
          roughness: 0.4,
        });
        const penStickGeom = new THREE.CylinderGeometry(0.04, 0.04, 1.3, 16);
        const penStick = new THREE.Mesh(penStickGeom, penStickMat);
        penStick.position.set(
          Math.cos(angle) * 0.65,
          0.3,
          Math.sin(angle) * 0.65
        );
        penStick.rotation.z = (Math.random() - 0.5) * 0.3;
        penStick.rotation.x = (Math.random() - 0.5) * 0.3;
        group.add(penStick);
      }

      group.rotation.set(0.4, 0, 0);
    }
  };

  return (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#F7F4EF] to-[#EFECE4] border border-stone-200/80 p-4 shadow-inner flex flex-col items-center">
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[250px] sm:h-[300px] md:h-[380px] cursor-grab active:cursor-grabbing flex items-center justify-center touch-pan-y select-none"
      />

      {/* Floating 3D controls badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 text-xs text-stone-600 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200 shadow-sm pointer-events-none">
        <Rotate3d className="w-3.5 h-3.5 text-purple-600 animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-medium">360° Interactive 3D Model</span>
      </div>

      {/* Control toolstrip */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-md p-1 rounded-full border border-stone-200 shadow-sm">
        <button
          onClick={() => setIsRotating(!isRotating)}
          title={isRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
          className="p-1.5 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
        >
          {isRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.15))}
          title="Zoom In"
          className="p-1.5 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.15))}
          title="Zoom Out"
          className="p-1.5 text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsWireframe(!isWireframe)}
          title="Toggle Wireframe Mesh"
          className={`p-1.5 rounded-full transition-colors ${
            isWireframe ? 'bg-purple-100 text-purple-700' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Switcher: Product Model & Custom Pastel Color */}
      <div className="w-full mt-2 pt-3 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Model switcher tabs */}
        <div className="flex items-center gap-1 bg-white/90 p-1 rounded-xl border border-stone-200 shadow-xs overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveModel('notebook')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap text-[11px] sm:text-xs cursor-pointer ${
              activeModel === 'notebook'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            160 GSM Journal
          </button>
          <button
            onClick={() => setActiveModel('pen')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap text-[11px] sm:text-xs cursor-pointer ${
              activeModel === 'pen'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            CloudGrip Pen
          </button>
          <button
            onClick={() => setActiveModel('desk_organizer')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap text-[11px] sm:text-xs cursor-pointer ${
              activeModel === 'desk_organizer'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Desk Carousel
          </button>
          <button
            onClick={() => setActiveModel('bottle')}
            className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap text-[11px] sm:text-xs cursor-pointer ${
              activeModel === 'bottle'
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Thermal Flask
          </button>
        </div>

        {/* Live Color Picker for 3D model */}
        {allowColorSwitch && (
          <div className="flex items-center gap-2 bg-white/90 px-3 py-1.5 rounded-xl border border-stone-200 shadow-xs">
            <span className="text-stone-500 font-medium">Pastel Finish:</span>
            <div className="flex items-center gap-1.5">
              {colorOptions.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setCurrentColor(c.hex)}
                  title={c.name}
                  className={`w-5 h-5 rounded-full border transition-transform ${
                    currentColor === c.hex ? 'scale-125 ring-2 ring-purple-500 ring-offset-1 border-white' : 'border-stone-300 hover:scale-110'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 text-[11px] text-stone-400 text-center">
        💡 Drag or touch to rotate 360° · Scroll to inspect textures
      </div>
    </div>
  );
};
