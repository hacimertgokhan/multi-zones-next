import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Product } from '../../../store/cartSlice';
import AddToCartButton from '../../../components/AddToCartButton';

interface ProductDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return null;
        }

        const product = await res.json();
        return {
            ...product,
            quantity: 1
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <nav className="mb-8">
                    <Link
                        href="/"
                        className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                    >
                        ← Ürünler
                    </Link>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="relative">
                        <div className="aspect-square bg-white rounded-2xl shadow-lg p-8">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                style={{ objectFit: 'contain' }}
                                className="rounded-lg absolute left-0 right-0 top-0 bottom-0 w-fit h-fit m-auto max-w-96 max-h-96"
                                priority
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                {product.title}
                            </h1>
                            <div className="text-3xl font-bold text-indigo-600 mb-6">
                                {product.price.toFixed(2)} TL
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-200">
                            <AddToCartButton product={product} />
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

export async function generateStaticParams() {
    const products = await fetch('https://fakestoreapi.com/products?limit=20').then(res => res.json());
    return products.map((product: Product) => ({
        id: product.id.toString(),
    }));
}
