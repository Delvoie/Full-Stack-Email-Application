// header
import React from 'react';

export default function Header() {
    return (
        <header className="bg-blue-500">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <h1 className="text-2xl font-bold">📬 Mail Client</h1>
                </div>
            </nav>
        </header>
    );
}