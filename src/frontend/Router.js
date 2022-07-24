const getRouter = () => {
  const getPathname = () => {
    const {pathname} = window.location;
    if (pathname === '/calendar' || pathname === '/statistics') return pathname;
    return '/detail';
  };
  const state = {};

  const router = {
    init(key, defaultValue) {
      if (key in state) throw Error('이미 존재하는 key값 입니다.');
      state[key] = {
        state: defaultValue,
        observers: new Set(),
      };
      return key;
    },
    get(key) {
      if (!(key in state)) throw Error('존재하지 않는 key값 입니다.');
      return state[key].state;
    },
    set(key, newValue) {
      if (!(key in state)) throw Error('존재하지 않는 key값 입니다.');
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

  router.init('pathname', getPathname());

  window.addEventListener('popstate', () => {
    router.set('pathname', getPathname());
  });

  return router;
};

const Router = getRouter();

export default Router;
