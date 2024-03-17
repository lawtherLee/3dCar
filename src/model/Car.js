import * as THREE from "three";
import { MySprite } from "@/model/MySprite.js";
import { ClickHandler } from "@/utils/ClickHandler.js";
import gsap from "gsap";
import { EventBus } from "@/utils/EventBus.js";
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
    // 车数值相关（记录用于发给后台-保存用户要购车相关信息）
    this.info = {
      color: [
        {
          name: "土豪金",
          color: "#ff9900",
          isSelected: true,
        },
        {
          name: "传奇黑",
          color: "#343a40",
          isSelected: false,
        },
        {
          name: "海蓝",
          color: "#409EFF",
          isSelected: false,
        },
        {
          name: "玫瑰紫",
          color: "#6600ff",
          isSelected: false,
        },
        {
          name: "银灰色",
          color: "#DCDFE6",
          isSelected: false,
        },
      ],
      // 贴膜
      film: [
        {
          name: "高光",
          price: 0,
          isSelected: true,
        },
        {
          name: "磨砂",
          price: 20000,
          isSelected: false,
        },
      ],
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

    // 订阅切换车身颜色
    EventBus.getInstance().on("changeCarColor", (color) => {
      Object.values(this.carModel.body).forEach((item) => {
        item.model.material.color = new THREE.Color(color);
      });
      // 保存选择的车颜色
      this.info.color.forEach((item) => {
        item.isSelected = item.color === color;
      });
    });

    // 订阅贴膜修改
    EventBus.getInstance().on("changeCarCoat", (coatName) => {
      if (coatName === "高光") {
        Object.values(this.carModel.body).forEach((item) => {
          item.model.material.roughness = 0.5; // 粗糙度
          item.model.material.metalness = 1; // 金属度
          item.model.material.clearcoat = 1; // 清漆度
        });
      } else if (coatName === "磨砂") {
        Object.values(this.carModel.body).forEach((item) => {
          item.model.material.roughness = 1; // 粗糙度
          item.model.material.metalness = 0.5; // 金属度
          item.model.material.clearcoat = 0; // 清漆度
        });
      }
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
          // 绑定交互
          ClickHandler.getInstance().addMesh(sprite, (spriteObj) => {
            const targetDoor = spriteObj.parent.parent.parent;
            if (!targetDoor.userData.isOpen) {
              // 没开门
              // targetDoor.rotation.set(Math.PI / 3, 0, 0);
              this.setDoorAnimation(targetDoor, { x: Math.PI / 3 });
              targetDoor.userData.isOpen = true;
            } else {
              this.setDoorAnimation(targetDoor, { x: 0 });
              targetDoor.userData.isOpen = false;
            }
          });
        }
      });
    });
  }
  setDoorAnimation(mesh, obj) {
    gsap.to(mesh.rotation, { x: obj.x, duration: 1, ease: "power1.in" });
  }
}
