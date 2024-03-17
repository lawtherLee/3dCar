import * as THREE from "three";
import { EventBus } from "@/utils/EventBus.js";
export class Sky {
  constructor(scene) {
    this.scene = scene;
    this.nowMesh = []; // 当前背景物体对象列表;
    this.nowSkyName = "展厅";
    this.init();
  }
  init() {
    this.createInDoor();

    // 切换场景
    EventBus.getInstance().on("changeSky", (skyName) => {
      if (skyName === this.nowSkyName) return;
      this.clear();
      if (skyName === "展厅") {
        this.createInDoor();
        this.nowSkyName = "展厅";
      } else if (skyName === "户外") {
        this.createOutDoor();
        this.nowSkyName = "户外";
      }
    });
  }
  // 室内场景
  createInDoor() {
    // 球体
    const sphereGeo = new THREE.SphereGeometry(10, 64, 32);
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
  // 户外场景
  createOutDoor() {
    // 球体
    const sphereGeo = new THREE.SphereGeometry(40, 32, 16);
    const sphereTexture = new THREE.TextureLoader().load("image/desert.jpg");
    sphereTexture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({
      map: sphereTexture,
      side: THREE.DoubleSide,
    });
    const sphere = new THREE.Mesh(sphereGeo, material);
    this.scene.add(sphere);
    this.nowMesh.push(sphere);

    // 地面
    const planeGeo = new THREE.CircleGeometry(20, 32);
    const planeTexture = new THREE.TextureLoader().load("image/sand.jpg");
    planeTexture.colorSpace = THREE.SRGBColorSpace;
    const standardMaterial = new THREE.MeshStandardMaterial({
      color: 0xa0825c,
      map: planeTexture,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeo, standardMaterial);
    plane.rotation.set(-Math.PI / 2, 0, 0);
    this.scene.add(plane);
    this.nowMesh.push(plane);
  }

  // 清除场景
  clear() {
    this.nowMesh.forEach((item) => {
      item.geometry.dispose();
      item.material.dispose();
      item.material.map && item.material.map.dispose(); // 纹理对象释放内存
      item.parent.remove(item);
    });

    this.nowMesh.splice(0, this.nowMesh.length);
  }
}
