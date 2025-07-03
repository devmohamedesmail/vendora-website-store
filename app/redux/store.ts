import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import wishlistReducer from './slices/wishlistSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishlist'], // Only persist cart and wishlist
};

// Combine reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
