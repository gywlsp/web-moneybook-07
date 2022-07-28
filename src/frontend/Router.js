const getRouter = () => {
  const getPathname = () => {
    const {pathname} = window.location;
    if (pathname === '/calendar' || pathname === '/statistics') return pathname;
    return '/';
  };

  const state = {};

  function Router() {}
  Router.prototype.init = (key, defaultValue) => {
    if (key in state) throw Error('이미 존재하는 key값 입니다.');
    state[key] = {
      state: defaultValue,
      observers: new Set(),
    };
    return key;
  };
  Router.prototype.subscribe = (key, observer) => {
    state[key].observers.add(observer);
  };
  Router.prototype.notify = key => {
    state[key].observers.forEach(observer => observer());
  };
  Router.prototype.get = key => {
    if (!(key in state)) throw Error('존재하지 않는 key값 입니다.');
    return state[key].state;
  };
  Router.prototype.set = (key, newValue) => {
    if (!(key in state)) throw Error('존재하지 않는 key값 입니다.');
    state[key].state = newValue;
    window.history.pushState({}, null, newValue);
    Router.prototype.notify(key);
  };

  const router = new Router();

  router.init('pathname', getPathname());

  window.addEventListener('popstate', () => {
    router.set('pathname', getPathname());
  });

  return router;
};

const Router = getRouter();

export default Router;
