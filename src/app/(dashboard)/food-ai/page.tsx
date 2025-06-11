'use client';

import React, { useState } from "react";
import InputRender from "./input-render";
import Header from "@/components/header";
import FeatureCard from "@/components/feature-card";

const FOOD_AI_FEATURE_CARDS = [
  {
    id: '1',
    description: "I want to find out ingredients in my food are healthy or not",
  },
  {
    id: '2',
    description: "I am suffering from a health condition and should I eat it?",
  },
  {
    id: '3',
    description: "Create a personalized diet plan tailored to my needs",
  },
  {
    id: '4',
    description: "How much protein, carbs, and fats are in my food?",
  },
  {
    id: '5',
    description: "Give me a random food fact",
  },
];

type FeatureCard = {
  id: string;
  description: string;
}

const FoodPage = () => {
  const [selectedCard, setSelectedCard] = useState<FeatureCard>(FOOD_AI_FEATURE_CARDS[0]);

  const handleCardSelection = (card: FeatureCard) => {
    setSelectedCard(card);
  }

  return (
    <div className="flex p-8 gap-4 min-h-screen bg-app-dark">
      <div className="flex flex-col items-center w-[95%] md:w-[80%] gap-36 mx-auto">
        <div className="flex flex-1 flex-col items-center gap-16">
          <Header />

          <div className="flex flex-wrap gap-6 items-center justify-center">
            {
              FOOD_AI_FEATURE_CARDS.map((card) => (
                <FeatureCard
                  active={selectedCard?.id === card.id}
                  key={card.id}
                  onClick={() => handleCardSelection(card)}
                  width="max-w-96"
                >
                  <p className="text-center text-base">{card.description}</p>
                </FeatureCard>
              ))
            }
          </div>
        </div>
        <div className="w-full flex justify-end items-end gap-4 min-h-64 p-0 md:p-8">
          {
            selectedCard && (
              <InputRender id={selectedCard.id} />
            )
          }
        </div>
      </div>
    </div>
  )
};

export default FoodPage;
