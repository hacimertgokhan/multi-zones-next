import { ReduxProvider } from '../store/provider';
import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Toaster} from "react-hot-toast";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Task 3 - Micro Frontend',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ReduxProvider>{children}</ReduxProvider>
                <Toaster position={"bottom-right"}/>
            </body>
        </html>
    );
}
