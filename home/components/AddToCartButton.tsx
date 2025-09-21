'use client';

import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart, Product } from '../store/cartSlice';

type AddToCartButtonProps = {
    product: Product;
    variant?: 'default' | 'large';
};

export default function AddToCartButton({ product, variant = 'default' }: AddToCartButtonProps) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success(`${product.title} sepete eklendi !`, {
            position: 'bottom-right',
            style: { 
                background: '#1f2937', 
                color: '#fff', 
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px'
            },
        });
    };

    const baseClasses = "w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-md transform hover:scale-105";
    
    const sizeClasses = variant === 'large' 
        ? "py-4 px-8 text-lg" 
        : "py-3 px-6 text-base";

    return (
        <button
            onClick={handleAddToCart}
            className={`${baseClasses} ${sizeClasses}`}
        >
            Sepete Ekle - {product.price.toFixed(2)} TL
        </button>
    );
}
