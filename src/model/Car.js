/**
 * 汽车类
 */
export class Car {
  constructor(model, scene, camera, controls) {
    this.model = model;
    this.scene = scene;
    this.camera = camera;
    this.controls = controls;
    this.init();
  }
  init() {
    this.scene.add(this.model);
  }
}
