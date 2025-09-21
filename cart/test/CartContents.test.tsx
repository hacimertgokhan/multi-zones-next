import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CartContents from '../components/CartContents';
import cartReducer from '../store/cartSlice';

// Mock next/link
jest.mock('next/link', () => {
    return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
        return <a href={href}>{children}</a>;
    };
});

// Mock next/image
jest.mock('next/image', () => {
    return function MockImage({ src, alt, ...props }: any) {
        return <img src={src} alt={alt} {...props} />;
    };
});

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
    __esModule: true,
    default: {
        success: jest.fn(),
    },
}));

const createMockStore = (initialState = { items: [] }) => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
        preloadedState: {
            cart: initialState,
        },
    });
};

const mockCartItems = [
    {
        id: 1,
        title: 'Test Product 1',
        price: 29.99,
        image: 'https://example.com/image1.jpg',
        quantity: 2,
    },
    {
        id: 2,
        title: 'Test Product 2',
        price: 19.99,
        image: 'https://example.com/image2.jpg',
        quantity: 1,
    },
];

describe('CartContents', () => {
    it('renders empty cart message when no items', () => {
        const store = createMockStore();
        
        render(
            <Provider store={store}>
                <CartContents />
            </Provider>
        );

        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
        expect(screen.getByText('Start shopping to add items to your cart')).toBeInTheDocument();
    });

    it('renders cart items when items exist', () => {
        const store = createMockStore({ items: mockCartItems });
        
        render(
            <Provider store={store}>
                <CartContents />
            </Provider>
        );

        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();
        expect(screen.getByText('$29.99')).toBeInTheDocument();
        expect(screen.getByText('$19.99')).toBeInTheDocument();
    });

    it('dispatches removeFromCart when remove button is clicked', () => {
        const store = createMockStore({ items: mockCartItems });
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        
        render(
            <Provider store={store}>
                <CartContents />
            </Provider>
        );

        const removeButtons = screen.getAllByText('Remove');
        fireEvent.click(removeButtons[0]);

        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'cart/removeFromCart',
            payload: 1,
        });
    });

    it('dispatches updateQuantity when quantity is changed', () => {
        const store = createMockStore({ items: mockCartItems });
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        
        render(
            <Provider store={store}>
                <CartContents />
            </Provider>
        );

        const quantityInput = screen.getByDisplayValue('2');
        fireEvent.change(quantityInput, { target: { value: '5' } });

        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'cart/updateQuantity',
            payload: { id: 1, quantity: 5 },
        });
    });

    it('calculates total correctly', () => {
        const store = createMockStore({ items: mockCartItems });
        
        render(
            <Provider store={store}>
                <CartContents />
            </Provider>
        );

        // Total should be (29.99 * 2) + (19.99 * 1) = 79.97
        expect(screen.getByText('$79.97')).toBeInTheDocument();
    });

    it('renders back to products link', () => {
        const store = createMockStore();
        
        render(
            <Provider store={store}>
                <CartContents />
            </Provider>
        );

        const backLink = screen.getByText('← Back to Products');
        expect(backLink).toHaveAttribute('href', '/');
    });
});
