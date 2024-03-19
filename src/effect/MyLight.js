// 灯光类
import * as THREE from "three";
import { EventBus } from "@/utils/EventBus.js";

export class MyLight {
  constructor(scene) {
    this.scene = scene;
    this.nowSpotLight = {}; // 聚光灯光源对象
    this.nowSceneName = "展厅";

    // 平行光的坐标位置
    this.dirPosList = [
      [0, 5, 10],
      [-10, 5, 0],
      [0, 5, -10],
      [10, 5, 0],
    ];

    this.createCarDL();
    this.createSpotL();
    EventBus.getInstance().on("changeSky", (sceneName) => {
      if (this.nowSceneName === sceneName) return;
      if (sceneName === "展厅") {
        this.createSpotL();
      } else if (sceneName === "户外") {
        this.removeSpotL();
      }
      this.nowSceneName = sceneName;
    });
  }
  // 照亮汽车的平行光
  createCarDL() {
    this.dirPosList.forEach((item) => {
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(...item);
      this.scene.add(directionalLight);
    });
  }
  // 创建聚光灯
  createSpotL() {
    this.nowSpotLight = new THREE.SpotLight(0xffffff, 1);
    this.nowSpotLight.angle = 0.16 * Math.PI; // 聚光灯散射光斑大小
    this.nowSpotLight.penumbra = 0.2; // 光的衰减程度
    this.nowSpotLight.castShadow = true; // 阴影支持
    this.nowSpotLight.shadow.mapSize.set(4096, 4096); // 阴影贴图大小
    this.nowSpotLight.position.set(0, 5, 0);
    this.scene.add(this.nowSpotLight);
  }

  // 删除聚光灯
  removeSpotL() {
    this.nowSpotLight.parent.remove(this.nowSpotLight);
    this.nowSpotLight = {};
  }
}
