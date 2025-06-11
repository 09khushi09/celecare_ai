'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/contexts/auth-context.provider";
import { createChat } from "@/firebase/chat-db-requests";
import { userPromptParts } from "@/lib/helpers/prompt";
import { ChatType, Sender } from "@/lib/types/chat";
import { UploadButton, UploadResponse } from "@/lib/uploadthing/uploadthing";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FeatureCard4 = () => {
  const [imgURL, setImgURL] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");
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

  const onSubmit = async () => {
    setIsProcessing(true);

    const response = await fetch("/api/prompt/analyze-nutrients", {
      method: "POST",
      body: JSON.stringify({
        prompt,
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
      title: "Analyzed Nutrients",
      userId: user?.id ?? "test-user-id",
      type: ChatType.FOOD_AI,
      history: [
        {
          role: Sender.User,
          parts: userPromptParts(imgURL, "image/jpeg", prompt || "Analyze nutrients for this food item."),
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
        <p className="text-foreground text-sm">
          Upload an image of the food item or write down about the food item.
        </p>
      </div>
    </div>
  );
};

export default FeatureCard4;
