export default class Observer {
  constructor() {
    this.state = {};
    this.observers = new Set();
  }

  init(key, defaultValue) {
    if (key in this.state) throw Error('이미 존재하는 Key값입니다.');
    this.state[key] = {
      state: defaultValue,
      observers: new Set(),
    };
  }

  subscribe(key, observer) {
    this.state[key].observers.add(observer);
  }

  notify(key) {
    this.state[key].observers.forEach(observer => observer());
  }

  get(key) {
    if (!(key in this.state)) throw Error('존재하지 않는 key값입니다.');
    return this.state[key].state;
  }

  set(key, value) {
    if (!(key in this.state)) throw Error('존재하지 않는 key값입니다.');
    this.state[key].state = value;
    this.notify(key);
  }
}
