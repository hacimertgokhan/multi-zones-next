'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from "next/link";
import dynamic from 'next/dynamic';

const CartContents = dynamic(() => import("../components/CartContents").catch(() => {
    return { default: () => <div>Cart could not be loaded</div> };
}), {
    loading: () => <LoadingState />,
    ssr: false
});

function LoadingState() {
    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Cart</h1>
                <Link href="/.." className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block font-medium">
                    ← Back to Products
                </Link>
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="ml-3 text-gray-600">Loading cart...</span>
                </div>
            </div>
        </div>
    );
}

export default function CartPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="min-h-screen bg-gray-50">
                <LoadingState />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={<LoadingState />}>
                <CartContents />
            </Suspense>
        </div>
    );
}