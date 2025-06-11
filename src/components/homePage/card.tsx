'use client';
import Image from 'next/image';
import React from 'react';
import { Card, Carousel } from '../ui/apple-cards-carousel';

export function HomePageCard() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className='w-full h-full py-20 '>
      <h2 className='max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans'>
        Enhance Your Health with Smart Choices
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(0).fill(0)].map((_, index) => {
        return (
          <div
            key={'dummy-content' + index}
            className='bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4'
          >
            <p className='text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto'>
              <span className='font-bold text-neutral-700 dark:text-neutral-200'>
                The first rule of Apple club is that you boast about Apple club.
              </span>{' '}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            {/* <Image
              src='https://assets.aceternity.com/macbook.png'
              alt='Macbook mockup from Aceternity UI'
              height='500'
              width='500'
              className='md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain'
            /> */}
          </div>
        );
      })}
    </>
  );
};

const data = [
  {
    category: 'FOOD',
    title: 'Analyze Food Labels for Health Insights',
    src: 'https://i.ibb.co/9VcsmYG/10-Tips-for-Beating-Inflation-at-the-Grocery-Store-According-to-Experts.jpg',
    content: <DummyContent />,
  },
  {
    category: 'FOOD',
    title: 'Tailored Diet Plans for Your Goals',
    src: 'https://i.ibb.co/9c6fd7g/pexels-vadimmarkin-2383305.jpg',
    content: <DummyContent />,
  },
  {
    category: 'FOOD and Personal care',
    title: 'Health Condition-Based Product Warnings',
    src: 'https://i.ibb.co/860TynN/pexels-laura-james-6097942.jpg',
    content: <DummyContent />,
  },

  {
    category: 'Personal care',
    title: 'Evaluate Personal Care Products for Safety',
    src: 'https://i.ibb.co/WHQpht4/pexels-rr-medicinals-4977811.jpg',
    content: <DummyContent />,
  },
];
