import * as THREE from "three";
export class Sky {
  constructor(scene) {
    this.scene = scene;
    this.nowMesh = []; // 当前背景物体对象列表;
    this.init();
  }
  init() {
    this.createInDoor();
  }
  // 室内场景
  createInDoor() {
    // 球体
    const sphereGeo = new THREE.SphereGeometry(10, 32, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x42454c,
      side: THREE.DoubleSide,
    });
    const sphere = new THREE.Mesh(sphereGeo, material);
    this.scene.add(sphere);
    this.nowMesh.push(sphere);

    // 地面
    const planeGeo = new THREE.CircleGeometry(10, 32);
    const standardMaterial = new THREE.MeshStandardMaterial({
      color: 0x42454c,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeo, standardMaterial);
    plane.rotation.set(-Math.PI / 2, 0, 0);
    this.scene.add(plane);
    this.nowMesh.push(plane);
  }
}
