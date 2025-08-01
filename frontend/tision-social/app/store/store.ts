// store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import menuVisibleSlice from './menuVisibleSlice'; // adjust path as needed
import footerSlice from '@/app/data/store/slices/footer/footerSlice'; // adjust path as needed
import chatVisibleStateSlice from '@/app/data/store/slices/chat/chatVisibleSlice'; // adjust path as needed
import chatTextAreaSlice from '@/app/data/store/slices/chat/chatTextAreaSlice'; // adjust path as needed
import chatMessagesSlice from '@/app/data/message/messageSlice'
import postCommentSlice from '@/app/data/post/comment/commentSlice'; // adjust path as needed
import commentsModalSlice from '@/app/data/post/postState/commentsModalSlice'; // adjust path as needed
import createPostSlice from '@/app/data/post/postState/createPostSlice'; // adjust path as needed
import postsSlice from '@/app/data/post/postState/postSlice'; // adjust path as needed
import postLikesSlice from '@/app/data/post/postState/postLikesSlice'; // adjust path as needed
import activePostSlice from '@/app/data/post/postState/ActivePost';
import eventSlice from '@/app/data/event/eventSlice'
import bioSlice from '@/app/data/profile/bio/bioSlice';
import experienceSlice from '@/app/data/profile/experience/experienceSlice'
import educationSlice from '@/app/data/profile/education/educationSlice'
import projectSlice from '@/app/data/profile/project/projectSlice'
import interestSlice from '@/app/data/profile/interest/interestSlice'
import userSlice from '@/app/data/user/userSlice'
import jobSlice from '@/app/data/job/jobSlice'
import gigSlice from '@/app/data/gig/gigSlice'
import scholarshipSlice from "@/app/data/scholarship/scholarshipSlice";


const rootReducer = combineReducers({
    menuVisible: menuVisibleSlice,
    footerSlice: footerSlice,
    chatVisibleStateSlice: chatVisibleStateSlice,
    chatTextAreaSlice: chatTextAreaSlice,
    chatMessagesSlice: chatMessagesSlice,
    postCommentSlice: postCommentSlice,
    commentsModalSlice: commentsModalSlice,
    createPostSlice: createPostSlice,
    postsSlice: postsSlice,
    postLikesSlice: postLikesSlice,
    activePostSlice: activePostSlice,
    eventSlice: eventSlice,
    bioSlice: bioSlice,
    experienceSlice: experienceSlice,
    educationSlice: educationSlice,
    projectSlice: projectSlice,
    interestSlice: interestSlice,
    userSlice: userSlice,
    jobSlice: jobSlice,
    gigSlice: gigSlice,
    scholarshipSlice: scholarshipSlice,
})

// Redux Persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['postsSlice', 'postLikesSlice'], // 👈 only persist slices you need
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch