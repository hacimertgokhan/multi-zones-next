import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const loadState = () => {
    if (typeof window === 'undefined') {
        return undefined; // Sunucudaysak, başlangıç durumu yok demektir.
    }
    try {
        const serializedState = localStorage.getItem('cartState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.warn("Could not load state from localStorage", err);
        return undefined;
    }
};

const saveState = (state: any) => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cartState', serializedState);
    } catch (err) {
        console.error("Could not save state to localStorage", err);
    }
};

const preloadedState = loadState();

export const store = configureStore({
    reducer: {
        // @ts-ignore
        cart: cartReducer,
    },
    preloadedState,
});

if (typeof window !== 'undefined') {
    store.subscribe(() => {
        saveState({
            cart: store.getState().cart,
        });
    });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;