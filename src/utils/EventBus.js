// 观察者模式
export class EventBus {
  constructor() {
    this.eventObj = {};
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new EventBus();
    }
    return this.instance;
  }
  on(eventName, fn) {
    if (!this.eventObj[eventName]) {
      this.eventObj[eventName] = [];
    }

    this.eventObj[eventName].push(fn);
  }
  emit(eventName, ...arg) {
    this.eventObj[eventName].forEach((fn) => {
      fn(...arg);
    });
  }
}
