import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

/**
 * 专门加载模型文件的
 * @param path 模型文件路径
 * @param successFn 接收模型对象成功的回调
 */
export function loadManager(path, successFn) {
  const gltfLoader = new GLTFLoader();
  gltfLoader.load(
    path,
    (gltf) => successFn(gltf.scene),
    (process) => console.log(process),
    (error) => {
      throw new Error(error);
    },
  );
}
