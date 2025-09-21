import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Bu fonksiyon artık tarayıcıda olup olmadığımızı kontrol ediyor.
const loadState = () => {
    // Sadece tarayıcı ortamındaysak localStorage'dan okuma yap.
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

// Bu fonksiyon da artık tarayıcıda olup olmadığımızı kontrol ediyor.
const saveState = (state: any) => {
    // Sadece tarayıcı ortamındaysak localStorage'a yazma yap.
    if (typeof window === 'undefined') {
        return; // Sunucudaysak hiçbir şey yapma.
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
        // @ts-ignore - Bu ignore'u kaldırmak için cartReducer'ınızın tipini doğru ayarlamanız gerekebilir.
        cart: cartReducer,
    },
    preloadedState,
});

// Store aboneliğini de sadece tarayıcıda kurmalıyız.
if (typeof window !== 'undefined') {
    store.subscribe(() => {
        saveState({
            cart: store.getState().cart,
        });
    });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;