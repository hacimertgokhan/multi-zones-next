'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart, Product } from '../store/cartSlice';

type ProductCardProps = {
    product: Omit<Product, 'quantity'>;
};

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        toast.success(`${product.title} added to cart!`, {
            position: 'bottom-right',
            style: { background: '#1f2937', color: '#fff', borderRadius: '8px' },
        });
    };

    return (
        <div className="group relative flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105">
            <Link href={`/products/${product.id}`} className="block">
                <div className="relative w-full h-64 bg-gray-100 p-6 cursor-pointer">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="group-hover:opacity-95 transition-opacity duration-300"
                    />
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <Link href={`/products/${product.id}`} className="block">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-3 transition-colors cursor-pointer">
                        {product.title}
                    </h2>
                </Link>
                <p className="text-2xl font-bold text-black mb-4">
                    {product.price.toFixed(2)} TL
                </p>
                <button
                    onClick={handleAddToCart}
                    className="mt-auto w-full text-black font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-md"
                >
                    Sepete Ekle
                </button>
            </div>
        </div>
    );
}