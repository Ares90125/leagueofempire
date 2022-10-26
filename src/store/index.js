import { configureStore } from '@reduxjs/toolkit';

import authReducer from "@store/slices/auth.slice";
import marketplaceReducer from "@store/slices/marketplace.slice";
import matchReducer from "@store/slices/match.slice";
import attributeReducer from "@store/slices/attribute.slice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        marketplace: marketplaceReducer,
        match: matchReducer,
        attribute: attributeReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;