import { Button } from "@/components/ui/button"
import MarkdownContent from "@/components/ui/markdown";
import { AI } from "@/lib/types/prompt";
import { useState } from "react";

const FeatureCard5 = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [randomFact, setRandomFact] = useState<string>("");

  const onSubmit = async () => {
    setIsProcessing(true);

    const response = await fetch("/api/prompt/random-fact", {
      method: "POST",
      body: JSON.stringify({
        ai: AI.FOOD,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      setIsProcessing(false);
      return;
    }

    const data = await response.json();

    setRandomFact(data.message);

    setIsProcessing(false);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {
        randomFact && (
          <div className="w-full md:w-[75%] px-6 py-4 mx-auto bg-app-primary dark:bg-gray-2 rounded-lg">
            <h1 className="text-star-white text-base">
              <MarkdownContent
                markdown={randomFact}
              />
            </h1>
          </div>
        )
      }
      <div className="flex gap-4 items-center justify-center">
        <h1 className="text-foreground text-base">
          Click on the button to get a random food fact.
        </h1>
        <Button
          onClick={onSubmit}
          disabled={isProcessing}
          variant="app-primary"
        >
          {
            isProcessing
              ? "Searching..."
              : "Get Random Fact"
          }
        </Button>
      </div>
    </div>
  );
};

export default FeatureCard5;
