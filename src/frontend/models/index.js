export default class Observer {
  constructor() {
    this.observers = new Set();
  }

  subscribe(observer) {
    this.observers.add(observer);
  }

  notify() {
    this.observers.forEach(observer => observer());
  }
}
