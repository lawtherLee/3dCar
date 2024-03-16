import * as THREE from "three";

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
        },
        rightDoor: {
          name: "Object_77",
          model: {},
        },
      },
    };
    this.init();
    this.modifyCarBody();
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
}
