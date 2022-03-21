import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({ reducer: rootReducer, devTools: process.env.NODE_ENV !== 'production' });

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('./rootReducer', () => {
        store.replaceReducer(rootReducer);
    });
}

export { store };
