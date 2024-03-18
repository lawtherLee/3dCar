// 颜色选择
import { EventBus } from "@/utils/EventBus.js";

// 颜色选择
const colorDivList = document.querySelectorAll(".col_group>div");
colorDivList.forEach((ele) => {
  ele.addEventListener("click", () => {
    const colorStr = ele.dataset.col;
    // 颜色字符串 => 事件总线 => Car类
    EventBus.getInstance().emit("changeCarColor", colorStr);
  });
});

// 贴膜切换
const coatDivList = document.querySelectorAll(".coat_group>div");
coatDivList.forEach((ele) => {
  ele.addEventListener("click", () => {
    const coatName = ele.dataset.co;
    EventBus.getInstance().emit("changeCarCoat", coatName);
    EventBus.getInstance().emit("celPrice");
  });
});

// 场景切换
const sceneDivList = document.querySelectorAll(".scene_group>div");
sceneDivList.forEach((ele) => {
  ele.addEventListener("click", () => {
    const sceneName = ele.dataset.poi;
    EventBus.getInstance().emit("changeSky", sceneName);
  });
});

// 视角切换
const lookDivList = document.querySelectorAll(".look_group>div");
lookDivList.forEach((ele) => {
  ele.addEventListener("click", () => {
    const viewName = ele.dataset.po;
    EventBus.getInstance().emit("changeCarAngleView", viewName);
  });
});
