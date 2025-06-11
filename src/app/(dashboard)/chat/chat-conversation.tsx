'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getChatById, updateChatById } from "@/firebase/chat-db-requests";

import { WEB_APP_NAME } from "@/lib/constants/web";
import { Chat, Sender } from "@/lib/types/chat";

import { Menu, SendHorizonalIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { UserChat } from "./userChat";
import { AiChat } from "./aiChat";
import { ROUTES } from "@/lib/constants/constants";
import { useAuthContext } from "@/contexts/auth-context.provider";
import { AI } from "@/lib/types/prompt";

interface ChatConversationProps {
  toggleSidebar: () => void;
}

const ChatConversation: React.FC<ChatConversationProps> = ({
  toggleSidebar,
}) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const {
    user,
  } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChat = async (id: string) => {
    setIsFetching(true);
    const response = await getChatById(id);
    if (response) setChat(response);
    setIsFetching(false);
  };

  const handleSubmission = async () => {
    if (!message.trim()) return;

    setIsProcessing(true);

    const historyWithoutFileData = chat?.history.filter((history) => {
      const parts = history.parts.filter((part) => {
        if (part.text) return { text: part.text };
      });

      if (parts.length > 0) return { role: history.role, parts };
    });

    try {
      const response = await fetch("/api/prompt/start-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: [
            {
              role: Sender.User,
              parts: [
                {
                  text: `Hi, I am ${user?.name}`,
                }
              ]
            },
            ...historyWithoutFileData!,
          ],
          prompt: message,
          ai: AI.FOOD,
        }),
      });

      if (!response.ok) throw new Error("Error submitting message");

      const data = await response.json();

      const updatedHistory = [
        ...(chat?.history ?? []),
        {
          role: Sender.User,
          parts: [{ text: message }],
        },
        {
          role: Sender.Model,
          parts: [{ text: data.message }],
        },
      ];

      if (chat?.id) {
        await updateChatById(
          chat.id,
          {
            history: updatedHistory,
          },
        );
        setChat((prevChat) => prevChat && { ...prevChat, history: updatedHistory });
      }

      setMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (id) fetchChat(id as string);
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  if (isFetching) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <span>Loading...</span>
      </div>
    );
  }

  if (!chat) {
    return (
      <div className="flex flex-col w-full h-screen items-center justify-center gap">
        <span>No Chats Found</span>
        <Button
          onClick={() => router.replace(ROUTES.DASHBOARD)}
        >
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div
      className="flex lg:px-0 py-8 gap-4 h-screen w-full"
      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmission()}
    >
      <div className="flex flex-col w-full items-center gap-8 mx-auto">
        <div className="w-full flex px-8 items-center lg:w-[80%]">
          <Button
            className="visible lg:hidden"
            onClick={toggleSidebar}
            size="icon"
            variant="outline"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="flex-1 text-center text-foreground cursor-pointer text-2xl lg:text-3xl font-secondary">
            {chat.title}
          </h1>
        </div>
        <div className="flex flex-col px-8 w-full flex-1 items-center gap-8 overflow-y-auto">
          <div className="flex flex-col space-y-8 w-full lg:w-[80%]">
            {chat.history.map((history, index) => (
              <div
                key={index}
                className={`flex gap-4 items-center ${history.role === Sender.User ? "justify-end" : "justify-start"
                  }`}
              >
                {history.role === Sender.User ? (
                  <UserChat
                    parts={history.parts}
                  />
                ) : (
                  <AiChat
                    parts={history.parts}
                  />
                )}
              </div>
            ))}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <div className="w-full lg:w-[80%] flex flex-col px-8 gap-4">
          {isProcessing && (
            <div className="flex items-center justify-center">
              <span className="text-white">Processing...</span>
            </div>
          )}
          <div className="flex gap-4 items-end">
            {/* <Button variant="app-primary">
              <Paperclip />
            </Button> */}
            <Input
              className="flex-1"
              onChange={handleChange}
              placeholder={`Message ${WEB_APP_NAME}`}
              value={message}
              disabled={isProcessing}
            />
            <Button variant="app-primary" onClick={handleSubmission}>
              <SendHorizonalIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatConversation;
