// 车门上的标记
import * as THREE from "three";
export class MySprite {
  constructor({ name, url, position, scale }) {
    const texture = new THREE.TextureLoader().load(url);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.set(...position);
    sprite.scale.set(...scale);
    sprite.name = name;
    return sprite;
  }
}
