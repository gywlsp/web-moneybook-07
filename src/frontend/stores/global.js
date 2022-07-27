const getGlobalStore = () => {
  const state = {};

  const globalStore = {
    init(key, defaultValue) {
      if (key in state) throw Error('이미 존재하는 key값입니다.');
      state[key] = {
        state: defaultValue,
        observers: new Set(),
      };
    },
    get(key) {
      if (!(key in state)) throw Error('존재하지 않는 key값입니다.');
      return state[key].state;
    },
    set(key, newValue) {
      if (!(key in state)) throw Error('존재하지 않는 key값입니다.');
      state[key].state = newValue;
      this.notify(key);
    },
    subscribe(key, observer) {
      state[key].observers.add(observer);
    },
    notify(key) {
      state[key].observers.forEach(observer => observer());
    },
  };

  const currentDate = new Date();
  globalStore.init('globalState', {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
  });
  globalStore.init('detailState', {
    income: true,
    expenditure: true,
  });
  globalStore.init('statisticsState', {
    categoryId: null,
  });

  return globalStore;
};

const GlobalStore = getGlobalStore();

export default GlobalStore;
