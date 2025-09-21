'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { hydrate } from './cartSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const savedState = localStorage.getItem('cart-state');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                store.dispatch(hydrate(parsedState));
            } catch (error) {
                console.error('Error loading cart state from localStorage:', error);
            }
        }

        const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            localStorage.setItem('cart-state', JSON.stringify(state.cart));
        });

        return () => unsubscribe();
    }, []);

    return <Provider store={store}>{children}</Provider>;
}