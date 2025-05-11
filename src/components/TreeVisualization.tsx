
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TreeVisualizationProps {
  className?: string;
}

const TreeVisualization: React.FC<TreeVisualizationProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 2, 8);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 0.5;
    scene.add(trunk);
    
    // Create tree top (leaves)
    const createTreeTop = (y: number, scale: number) => {
      const treeTopGeometry = new THREE.ConeGeometry(scale, scale * 2, 8);
      const treeTopMaterial = new THREE.MeshPhongMaterial({ color: 0x2E8B57 });
      const treeTop = new THREE.Mesh(treeTopGeometry, treeTopMaterial);
      treeTop.position.y = y;
      scene.add(treeTop);
      return treeTop;
    };
    
    const treeTop1 = createTreeTop(2, 1);
    const treeTop2 = createTreeTop(2.8, 0.8);
    const treeTop3 = createTreeTop(3.4, 0.6);
    
    // Position camera
    camera.position.z = 5;
    camera.position.y = 2;
    
    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate tree slightly
      trunk.rotation.y += 0.005;
      treeTop1.rotation.y += 0.005;
      treeTop2.rotation.y += 0.005;
      treeTop3.rotation.y += 0.005;
      
      // Add slight movement to simulate wind
      const time = Date.now() * 0.001;
      treeTop1.position.x = Math.sin(time) * 0.05;
      treeTop2.position.x = Math.sin(time + 0.5) * 0.04;
      treeTop3.position.x = Math.sin(time + 1) * 0.03;
      
      renderer.render(scene, camera);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      trunkGeometry.dispose();
      trunkMaterial.dispose();
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`tree-visualization ${className || ''}`}
      style={{ width: '100%', height: '300px' }}
    />
  );
};

export default TreeVisualization;
