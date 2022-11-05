import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from 'redux'
//引入redux-thunk，用于支持异步action
import reduxThunk from "redux-thunk";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import reduxPromise from "redux-promise";
import user from '@/redux/modules/user/reducer'
import play from '@/redux/modules/play/reducer'
// 开启devtools
// import { composeWithDevTools } from "redux-devtools-extension";

// console.log('import.meta.env >>', import.meta.env.MODE )

// 创建reducer(拆分reducer)
const reducer = combineReducers({
  user,
  play
})



// // redux 持久化配置
// const persistConfig = {
// 	key: "redux-state",
// 	storage: storage
// };
// const persistReducerConfig = persistReducer(persistConfig, reducer);
// // 使用 redux 中间件
// const middleWares = applyMiddleware(reduxThunk, reduxPromise);
// // 创建 store
// const store = createStore(persistReducerConfig, composeEnhancers(middleWares));
// // 创建持久化 store
// const persistor = persistStore(store);
// export { store, persistor };

// 开启 redux-devtools
const composeEnhancers = import.meta.env.MODE === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose


export default createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk, reduxPromise)))
// export default createStore(reducer, composeEnhancers(applyMiddleware(reduxThunk)))



