import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logger from 'redux-logger';
import chatReducer from '../reducers/chatReducer';
import messageReducer from '../reducers/messageReducer';
import profileReducer from '../reducers/profileReducer';
import botAnswerMW from './botAnswerMW';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, messageReducer);
/**
 * Шаг2. Все наши reducers мы передаем в store
 */

export default configureStore({
  reducer: {
    chatsStore: chatReducer,
    messagesStore: messageReducer,
    profileStore: profileReducer,
    persistor: persistedReducer,
  },
  middleware: [botAnswerMW, ...getDefaultMiddleware(), logger],
});
