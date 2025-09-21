'use client';

import Image from "next/image";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from '../store/hooks'; // Kendi typed hook'larınızı kullanın
import { removeFromCart, updateQuantity } from '../store/cartSlice';

export default function CartContents() {
    const cartItems = useAppSelector((state) => state.cart.items);
    const dispatch = useAppDispatch();

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleUpdateQuantity = (id: number, quantity: number) => {
        if (quantity <= 0) {
            dispatch(removeFromCart(id));
        } else {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="http://localhost:3000"
                    className="text-black font-medium transition-colors mb-4 inline-block"
                >
                    ← Ürünlere Geri Dön
                </Link>
                <h1 className="text-4xl font-bold text-gray-900">Sepetin</h1>
                {totalItems > 0 && (
                    <p className="text-gray-600 mt-2">
                        {totalItems} ürün sepetinde
                    </p>
                )}
            </div>

            {cartItems.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sepetin boş</h2>
                    <p className="text-gray-600 mb-8">Henüz bir şey eklememişsin gibi görünüyor...</p>
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Alışverişe Başla
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            style={{ objectFit: 'contain' }}
                                            className="rounded-lg"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-xl font-bold text-indigo-600 mt-1">
                                            ${item.price.toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center border border-gray-300 rounded-lg">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-l-lg transition-colors"
                                            >
                                                −
                                            </button>
                                            <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-r-lg transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Remove item"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sipariş Özeti</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Toplam ({totalItems} eşya)</span>
                                    <span>{totalPrice.toFixed(2)} TL</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Kargo</span>
                                    <span className="text-green-600">Ücretsiz</span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Toplam</span>
                                        <span>{(totalPrice * 1.08).toFixed(2)} TL</span>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                                Ödemeye Geç
                            </button>

                            <p className="text-xs text-gray-500 text-center mt-4">
                                Güvenli ödeme ile hızlıca ödemeni yapabilirsin !
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}