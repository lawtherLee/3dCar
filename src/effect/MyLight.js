// 灯光类
import * as THREE from "three";

export class MyLight {
  constructor(scene) {
    this.scene = scene;

    // 平行光的坐标位置
    this.dirPosList = [
      [0, 5, 10],
      [-10, 5, 0],
      [0, 5, -10],
      [10, 5, 0],
    ];

    this.createCarDL();
  }
  // 照亮汽车的平行光
  createCarDL() {
    this.dirPosList.forEach((item) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(...item);
      this.scene.add(directionalLight);
    });
  }
}
