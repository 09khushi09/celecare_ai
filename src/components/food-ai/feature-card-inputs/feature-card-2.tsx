import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth-context.provider";
import { createChat } from "@/firebase/chat-db-requests";
import { userPromptParts } from "@/lib/helpers/prompt";
import { ChatType, Sender } from "@/lib/types/chat";
import { UploadButton, UploadResponse } from "@/lib/uploadthing/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FeatureCard2 = () => {
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
  const [healthCondition, setHealthCondition] = useState("");
  const router = useRouter();

  const {
    user,
  } = useAuthContext();

  const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  }

  const handleUploadComplete = (res: UploadResponse[] | null) => {
    if (res && res.length > 0) {
      const uploadedImgURL = res[0].url;
      setImgURL(uploadedImgURL);
    }
  };

  const handleHealthConditionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHealthCondition(e.target.value);
  }

  const onSubmit = async () => {
    setIsProcessing(true);

    const promptText = `Analyze Food Ingredients For Health Condition: ${healthCondition}. Should I eat this food item with ingredients - ${prompt}`;

    const response = await fetch("/api/prompt/analyze-food-for-health-condition", {
      method: "POST",
      body: JSON.stringify({
        healthCondition,
        prompt: promptText,
        imageUrl: imgURL,
        mimeType: "image/jpeg",
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

    const chatId = await createChat({
      title: 'Should I eat it?',
      userId: user?.id ?? "test-user-id",
      type: ChatType.FOOD_AI,
      history: [
        {
          role: Sender.User,
          parts: userPromptParts(imgURL, "image/jpeg", promptText),
        },
        {
          role: Sender.Model,
          parts: [
            {
              text: data.message,
            },
          ],
        },
      ],
    });

    if (!chatId) {
      setIsProcessing(false);
      return;
    }

    setIsProcessing(false);
    router.push(`/chat?id=${chatId}&type=${ChatType.FOOD_AI}`);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={handleUploadComplete}
          onUploadError={(error: Error) => alert(`Error: ${error.message}`)}
          className="text-app-primary hover:text-app-primary/90"
        />
        <div className="w-full flex gap-4 items-center">
          <span>Health condition</span>
          <Input
            className="flex-1"
            placeholder="e.g. I have diabetes, high blood pressure, etc."
            type="text"
            value={healthCondition}
            onChange={handleHealthConditionChange}
          />
        </div>
        <div className="w-full flex gap-4 items-center">
          <Input
            className="flex-1"
            placeholder="e.g. apple, banana, etc."
            type="text"
            value={prompt}
            onChange={handlePromptChange}
          />
          <Button
            onClick={onSubmit}
            disabled={isProcessing || !imgURL && !prompt}
            variant="app-primary"
          >
            {isProcessing ? "Processing..." : "Submit"}
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-foreground text-sm">
          Upload an image of the food item or write down about the food item.
        </h1>
      </div>
    </div>
  );
};

export default FeatureCard2;
