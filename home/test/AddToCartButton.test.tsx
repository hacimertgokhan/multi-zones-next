import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AddToCartButton from '../components/AddToCartButton';
import cartReducer from '../store/cartSlice';

// Mock react-hot-toast
jest.mock('react-hot-toast', () => ({
    __esModule: true,
    default: {
        success: jest.fn(),
    },
}));

const createMockStore = () => {
    return configureStore({
        reducer: {
            cart: cartReducer,
        },
    });
};

const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: 'https://example.com/image.jpg',
    quantity: 1,
};

describe('AddToCartButton', () => {
    it('renders correctly with product information', () => {
        const store = createMockStore();
        
        render(
            <Provider store={store}>
                <AddToCartButton product={mockProduct} />
            </Provider>
        );

        expect(screen.getByText('Add to Cart - $29.99')).toBeInTheDocument();
    });

    it('dispatches addToCart action when clicked', () => {
        const store = createMockStore();
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        
        render(
            <Provider store={store}>
                <AddToCartButton product={mockProduct} />
            </Provider>
        );

        const button = screen.getByText('Add to Cart - $29.99');
        fireEvent.click(button);

        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'cart/addToCart',
            payload: mockProduct,
        });
    });

    it('renders with large variant correctly', () => {
        const store = createMockStore();
        
        render(
            <Provider store={store}>
                <AddToCartButton product={mockProduct} variant="large" />
            </Provider>
        );

        const button = screen.getByText('Add to Cart - $29.99');
        expect(button).toHaveClass('py-4', 'px-8', 'text-lg');
    });

    it('renders with default variant correctly', () => {
        const store = createMockStore();
        
        render(
            <Provider store={store}>
                <AddToCartButton product={mockProduct} variant="default" />
            </Provider>
        );

        const button = screen.getByText('Add to Cart - $29.99');
        expect(button).toHaveClass('py-3', 'px-6', 'text-base');
    });
});
