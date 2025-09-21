import ProductCard from '../components/ProductCard';
import Link from 'next/link';
import { Product } from '../store/cartSlice';

async function getProducts() {
    const res = await fetch('https://fakestoreapi.com/products', {
        next: { revalidate: 3600 } // ISR: 1 saat cache
    });
    if (!res.ok) {
        throw new Error('Failed to fetch products');
    }
    return res.json();
}

export default async function HomePage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-gray-50 !text-gray-900 font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header
                    className="flex flex-col sm:flex-row justify-between items-center mb-12 border-b border-gray-200 pb-6">
                    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-black">
                        Ürünleri keşfet
                    </h1>
                    <Link
                        href="/cart"
                        className="mt-4 sm:mt-0 bg-green-400 text-green-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-500 transition-all duration-300 transform hover:scale-105"
                    >
                        Sepeti Göster
                    </Link>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product: Omit<Product, "quantity">) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}