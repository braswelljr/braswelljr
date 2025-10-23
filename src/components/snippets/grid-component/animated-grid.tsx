'use client';

import { useState } from 'react';
import Image from 'next/image';
import { HiX } from 'react-icons/hi';
import { AnimatePresence, motion } from 'motion/react';

interface ProductI {
  id: string;
  name: string;
  price: number;
  image: {
    url: string;
  };
  type: string;
  weight: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const products: ProductI[] = [
  {
    id: 'ecdc8405-87a9-4950-872e-885e27311481',
    name: 'Battlefield',
    price: 88.99,
    type: 'book',
    weight: 0.07,
    description: 'Game, Thriller, Action',
    image: {
      url: '/images/grid-component/540202.jpg'
    },
    createdAt: '2023-04-30T18:54:35.564Z',
    updatedAt: '2023-04-30T18:54:35.564Z'
  },
  {
    id: 'e8fb7251-6d54-46f0-995f-28845fc6cf30',
    name: "Assasin's Creed",
    price: 87.99,
    type: 'book',
    weight: 0.08,
    description: 'Thriller, Game, Action',
    image: {
      url: '/images/grid-component/320623.png'
    },
    createdAt: '2023-04-30T18:55:30.687Z',
    updatedAt: '2023-04-30T18:55:30.687Z'
  }
];

export default function AnimatedGridComponent() {
  const [selectedProduct, setSelectedProduct] = useState<ProductI | null>(null);

  return (
    <main className="relative min-h-[60vh] border border-neutral-800">
      {/* body */}
      <section className="mx-auto max-w-5xl px-2 py-7 max-lg:mx-5 md:px-12 xl:max-w-7xl">
        <div className="">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8 text-xs xsm:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]">
            {products.map((product) => (
              <motion.div
                key={product.id}
                layoutId={product.id}
                className="space-y-7 border border-neutral-800 p-4 text-xs"
              >
                {/* body */}
                <div className="space-y-2">
                  <div className="line-clamp-1">{product.id}</div>
                  <div className="font-bold uppercase">{product.name}</div>
                  <div className="">$ {product.price}</div>
                  <div className="text-xs">Weight : {product.weight} KG</div>

                  {/* actions */}
                  <div className="">
                    <button
                      type="button"
                      className="bg-neutral-300 px-2 py-1 text-xs font-bold uppercase dark:bg-neutral-700"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedProduct && (
              <motion.div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  className="absolute inset-0 block size-full bg-neutral-900/40 dark:bg-green-700/40"
                  tabIndex={-1}
                  onClick={() => setSelectedProduct(null)}
                />
                <motion.div
                  className="relative z-10 grid w-2/3 grid-cols-1 items-stretch rounded-md bg-white text-xs max-lg:h-[45vh] max-sm:max-w-3xl sm:w-auto lg:grid-cols-[2fr,3fr] dark:bg-neutral-800"
                  layoutId={selectedProduct.id}
                >
                  <div className="relative min-h-[20vh] overflow-hidden bg-neutral-900 lg:min-h-[30vh]">
                    <Image
                      fill
                      src={selectedProduct.image.url}
                      alt={selectedProduct.name}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center'
                      }}
                    />
                  </div>
                  <div className="relative px-3 py-4 pr-4">
                    <button
                      type="button"
                      className="absolute right-4 rounded-lg bg-neutral-300 p-2 max-md:bottom-4 md:top-4 dark:bg-neutral-700"
                      onClick={() => setSelectedProduct(null)}
                    >
                      <HiX className="h-4 w-auto text-neutral-900 dark:text-neutral-200" />
                    </button>
                    <div className="mx-auto flex h-full w-11/12 flex-col justify-between text-xs max-sm:space-y-8">
                      {/* about */}
                      <div className="space-y-2">
                        <div className="line-clamp-1">{selectedProduct.id}</div>
                        <div className="font-bold uppercase">{selectedProduct.name}</div>
                        <div className="">$ {selectedProduct.price}</div>
                        <div className="text-xs">Weight : {selectedProduct.weight} KG</div>
                      </div>
                      {/* type */}
                      <div className="">
                        <div className="flex items-center justify-between">
                          <span className="bg-neutral-300 px-2 py-1 font-bold uppercase dark:bg-neutral-700">{selectedProduct.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
