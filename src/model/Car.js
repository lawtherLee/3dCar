import * as THREE from "three";
import { MySprite } from "@/model/MySprite.js";

/**
 * 汽车类
 */
export class Car {
  constructor(model, scene, camera, controls) {
    this.model = model;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;

    // 车小模型对象
    this.carModel = {
      body: {
        main: {
          name: "Object_103",
          model: {},
        },
        roof: {
          name: "Object_110",
          model: {},
        },
        leftDoor: {
          name: "Object_64",
          model: {},
          mark: [
            {
              name: "sprite",
              url: "image/sprite.png",
              scale: [0.2, 0.2],
              position: [1.07, 1.94, -0.23],
            },
          ],
        },
        rightDoor: {
          name: "Object_77",
          model: {},
          mark: [
            {
              name: "sprite",
              url: "image/sprite.png",
              scale: [0.2, 0.2],
              position: [-1.05, 0.78, -0.23],
            },
          ],
        },
      },
    };
    this.init();
    this.modifyCarBody();
    this.createDoorSprite();
  }
  init() {
    this.scene.add(this.model);
    Object.values(this.carModel.body).forEach((obj) => {
      obj.model = this.model.getObjectByName(obj.name);
    });
  }
  // 修改车身材质
  modifyCarBody() {
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff9900,
      roughness: 0.5, // 粗糙度
      metalness: 1, // 金属度
      clearcoat: 1, // 清漆度
      clearcoatRoughness: 0, // 清漆粗糙度
    });

    // 赋予小物体材质
    Object.values(this.carModel.body).forEach((item) => {
      item.model.material = bodyMaterial;
    });
  }

  // 加载精灵物体
  createDoorSprite() {
    const markList = [
      this.carModel.body.leftDoor,
      this.carModel.body.rightDoor,
    ];
    markList.forEach((item) => {
      item.mark.forEach((ele) => {
        if (ele.name === "sprite") {
          const sprite = new MySprite(ele);
          item.model.add(sprite);
        }
      });
    });
  }
}
