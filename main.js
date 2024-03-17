import "@/entry";
import { ClickHandler } from "@/utils/ClickHandler.js";
import { camera } from "@/entry/index.js";
import "@/menu.js";
ClickHandler.getInstance().init(camera);
