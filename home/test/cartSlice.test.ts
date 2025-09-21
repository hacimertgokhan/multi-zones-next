import cartReducer, { addToCart, removeFromCart, updateQuantity, hydrate } from '../store/cartSlice';
import { Product } from '../store/cartSlice';

const mockProduct: Omit<Product, 'quantity'> = {
    id: 1,
    title: 'Test Product',
    price: 29.99,
    image: 'https://example.com/image.jpg',
};

describe('cartSlice', () => {
    const initialState = {
        items: [],
    };

    it('should return the initial state', () => {
        expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle addToCart with new product', () => {
        const actual = cartReducer(initialState, addToCart(mockProduct));
        expect(actual.items).toEqual([{ ...mockProduct, quantity: 1 }]);
    });

    it('should handle addToCart with existing product', () => {
        const stateWithProduct = {
            items: [{ ...mockProduct, quantity: 1 }],
        };
        
        const actual = cartReducer(stateWithProduct, addToCart(mockProduct));
        expect(actual.items[0].quantity).toBe(2);
    });

    it('should handle removeFromCart', () => {
        const stateWithProduct = {
            items: [{ ...mockProduct, quantity: 1 }],
        };
        
        const actual = cartReducer(stateWithProduct, removeFromCart(1));
        expect(actual.items).toEqual([]);
    });

    it('should handle updateQuantity', () => {
        const stateWithProduct = {
            items: [{ ...mockProduct, quantity: 1 }],
        };
        
        const actual = cartReducer(stateWithProduct, updateQuantity({ id: 1, quantity: 5 }));
        expect(actual.items[0].quantity).toBe(5);
    });

    it('should handle hydrate', () => {
        const newState = {
            items: [{ ...mockProduct, quantity: 3 }],
        };
        
        const actual = cartReducer(initialState, hydrate(newState));
        expect(actual).toEqual(newState);
    });

    it('should not update quantity for non-existent product', () => {
        const stateWithProduct = {
            items: [{ ...mockProduct, quantity: 1 }],
        };
        
        const actual = cartReducer(stateWithProduct, updateQuantity({ id: 999, quantity: 5 }));
        expect(actual.items[0].quantity).toBe(1);
    });
});
