import * as THREE from "three";
export class ClickHandler {
  static getInstance() {
    if (!this.instance) {
      this.instance = new ClickHandler();
    }
    return this.instance;
  }
  init(camera) {
    this.camera = camera;
    this.list = []; // 光线投射交互计算的物体
    this.map = new Map(); // key可以是Three.js物体（与点击要执行的回调产生1对1关系）;

    // 光线投射
    const rayCaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const app = document.querySelector(".app");

    window.addEventListener("click", (e) => {
      pointer.x = (e.clientX / app.clientWidth) * 2 - 1;
      pointer.y = -(e.clientY / app.clientHeight) * 2 + 1;
      rayCaster.setFromCamera(pointer, this.camera);
      const list = rayCaster.intersectObjects(this.list);

      // 通过交互物体本身，去map中找到对应找执行的回调
      // obj：涉嫌收集到的数据对象
      list.forEach((obj) => {
        const fn = this.map.get(obj.object);
        fn(obj.object);
      });
    });
  }

  // 传入要点击物体的函数体
  addMesh(mesh, fn) {
    this.list.push(mesh);
    this.map.set(mesh, fn);
  }
}
