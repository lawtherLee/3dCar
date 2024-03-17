import "@/entry";
import { ClickHandler } from "@/utils/ClickHandler.js";
import { camera } from "@/entry/index.js";
import { EventBus } from "@/utils/EventBus.js";
ClickHandler.getInstance().init(camera);
