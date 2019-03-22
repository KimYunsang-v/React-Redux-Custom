// 스토어를 생성하는 함수륾 만들어서 내보냄
// 이 함수는 store/index.js 에서 불러와서 사용하게됨
import { createStore, applyMiddleware, compose } from 'redux';
import modules from './modules';
import ReduxThunk from 'redux-thunk';

const configuer = () => {
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(modules,devTools(
        applyMiddleware(ReduxThunk), /* enhancer(middleware) */
      ));
    return store;
}

export default configuer;