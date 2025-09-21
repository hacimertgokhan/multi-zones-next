import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from '../components/ProductCard';
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
};

describe('ProductCard', () => {
    it('renders product information correctly', () => {
        const store = createMockStore();
        
        render(
            <Provider store={store}>
                <ProductCard product={mockProduct} />
            </Provider>
        );

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$29.99')).toBeInTheDocument();
        expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    });

    it('has correct link to product detail page', () => {
        const store = createMockStore();
        
        render(
            <Provider store={store}>
                <ProductCard product={mockProduct} />
            </Provider>
        );

        const productLink = screen.getByRole('link');
        expect(productLink).toHaveAttribute('href', '/products/1');
    });

    it('dispatches addToCart action when Add to Cart button is clicked', () => {
        const store = createMockStore();
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        
        render(
            <Provider store={store}>
                <ProductCard product={mockProduct} />
            </Provider>
        );

        const addToCartButton = screen.getByText('Add to Cart - $29.99');
        fireEvent.click(addToCartButton);

        expect(dispatchSpy).toHaveBeenCalledWith({
            type: 'cart/addToCart',
            payload: mockProduct,
        });
    });

    it('renders with correct styling classes', () => {
        const store = createMockStore();
        
        render(
            <Provider store={store}>
                <ProductCard product={mockProduct} />
            </Provider>
        );

        const card = screen.getByRole('article');
        expect(card).toHaveClass('bg-white', 'rounded-2xl', 'shadow-lg', 'overflow-hidden');
    });
});
