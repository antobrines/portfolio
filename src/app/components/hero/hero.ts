import { Component, AfterViewInit, Inject, PLATFORM_ID, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import gsap from 'gsap';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero implements AfterViewInit, OnDestroy {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animationId!: number;
  private particles!: THREE.Points;
  private core!: THREE.Group;
  private mouseX = 0;
  private mouseY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initThreeJs();
      this.initAnimations();
    }
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  initAnimations() {
     gsap.utils.toArray(".reveal-text").forEach((element: any, i) => {
      gsap.fromTo(
        element,
        { y: 50, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          delay: 0.2 + i * 0.15,
          ease: "power3.out",
        }
      );
    });
  }

  initThreeJs() {
    const container = document.getElementById("canvas-container");
    if (!container) return;

    // 1. Scene Setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x050505, 0.02); // Dense fog for depth

    this.camera = new THREE.PerspectiveCamera(
      75,
      container.offsetWidth / container.offsetHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(container.offsetWidth, container.offsetHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(this.renderer.domElement);

    // 2. The Core (Group)
    this.core = new THREE.Group();
    this.scene.add(this.core);

    // Outer Wireframe Shell
    const geometry = new THREE.IcosahedronGeometry(10, 1);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00f3ff, 
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireframeSphere = new THREE.Mesh(geometry, material);
    this.core.add(wireframeSphere);

    // Inner Glowing Core
    const innerGeometry = new THREE.IcosahedronGeometry(4, 2);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xbc13fe,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const innerSphere = new THREE.Mesh(innerGeometry, innerMaterial);
    this.core.add(innerSphere);

    // 3. Particle Field (Data Stream)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      // Spread particles wide
      posArray[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x00f3ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);

    // 4. Interaction
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener("mousemove", (event) => {
      this.mouseX = (event.clientX - windowHalfX) * 0.05;
      this.mouseY = (event.clientY - windowHalfY) * 0.05;
    });

    // 5. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate Core
      this.core.rotation.y += 0.005;
      this.core.rotation.x += 0.002;
      
      // Pulse Inner Core
      const scale = 1 + Math.sin(elapsedTime * 2) * 0.1;
      innerSphere.scale.set(scale, scale, scale);

      // Rotate Particles slowly
      this.particles.rotation.y = -elapsedTime * 0.05;
      this.particles.rotation.x = this.mouseY * 0.001;
      this.particles.rotation.y += this.mouseX * 0.001;

      // Parallax Camera
      this.camera.position.x += (this.mouseX * 0.1 - this.camera.position.x) * 0.05;
      this.camera.position.y += (-this.mouseY * 0.1 - this.camera.position.y) * 0.05;
      this.camera.lookAt(this.scene.position);

      this.renderer.render(this.scene, this.camera);
    };

    animate();

    // 6. Resize Handler
    window.addEventListener("resize", () => {
      if (!container) return;
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }
}
