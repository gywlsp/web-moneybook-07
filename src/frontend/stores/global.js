const globalStore = {
  state: {},
  init(key, defaultValue) {
    if (key in this.state) throw Error('이미 존재하는 key값 입니다.');
    this.state[key] = {
      state: defaultValue,
      observers: new Set(),
    };
    return key;
  },
  get(key) {
    if (!(key in this.state)) throw Error('존재하지 않는 key값 입니다.');
    return this.state[key].state;
  },
  set(key, newValue) {
    if (!(key in this.state)) throw Error('존재하지 않는 key값 입니다.');
    this.state[key].state = newValue;
    this.notify(key);
  },
  subscribe(key, observer) {
    this.state[key].observers.add(observer);
  },
  notify(key) {
    this.state[key].observers.forEach(observer => observer());
  },
};

export default globalStore;
