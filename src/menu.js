// 颜色选择
import { EventBus } from "@/utils/EventBus.js";

const colorDivList = document.querySelectorAll(".col_group>div");
colorDivList.forEach((ele) => {
  ele.addEventListener("click", () => {
    const colorStr = ele.dataset.col;
    // 颜色字符串 => 事件总线 => Car类
    EventBus.getInstance().emit("changeCarColor", colorStr);
  });
});
