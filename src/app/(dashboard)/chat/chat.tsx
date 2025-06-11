'use client';

import { useRouter, useSearchParams } from "next/navigation";
import ChatConversation from "./chat-conversation";
import ChatSidebar from "./chat-sidebar";
import { useEffect, useState } from "react";
import { Chat, ChatType } from "@/lib/types/chat";
import { useAuthContext } from "@/contexts/auth-context.provider";
import { getChatsByUserId } from "@/firebase/chat-db-requests";
import { Button } from "@/components/ui/button";
import { HOME_ROUTE } from "@/lib/constants/constants";

const ChatUI = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [selectedType, setSelectedType] = useState<ChatType>(ChatType.FOOD_AI);
  const [isChatsLoading, setIsChatsLoading] = useState<boolean>(true);
  const router = useRouter();
  const {
    user
  } = useAuthContext();
  const params = useSearchParams();
  const id = params.get("id");
  const type = params.get("type");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const userId = user?.id;

  const fetchChatsByUserId = async (userId: string) => {
    const response = await getChatsByUserId(userId);

    setChats(response);

    let chatType = selectedType;
    if (type) {
      chatType = type as ChatType;
      setSelectedType(chatType);
    }

    const filteredResponse = response.filter((chat) => chat.type === chatType);
    setFilteredChats(filteredResponse);

    if (filteredResponse.length !== 0 && id) {
      router.replace(`/chat?id=${id}&type=${chatType}`);
    } else if (filteredResponse.length !== 0) {
      router.replace(`/chat?id=${filteredResponse[0].id}&type=${chatType}`);
    }

    setIsChatsLoading(false);
  }

  useEffect(() => {
    const filteredResponse = chats.filter(chat => chat.type === selectedType);
    setFilteredChats(filteredResponse);
  }, [selectedType]);

  useEffect(() => {
    if (userId) {
      fetchChatsByUserId(userId);
    }
  }, [userId]);

  if (isChatsLoading) {
    return (
      <div className="w-full flex items-center justify-center h-screen">
        <p>Loading chats...</p>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="w-full flex flex-col gap-6 items-center justify-center h-screen">
        <p>No chats found</p>
        <Button
          variant="app-primary"
          onClick={() => router.push(HOME_ROUTE)}
        >
          Start first chat
        </Button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please login to view this page</p>
      </div>
    );
  }

  return (
    <>
      <ChatSidebar
        filteredChats={filteredChats}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        toggleSidebar={toggleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <main className="flex-1 overflow-y-auto ">
        <ChatConversation
          toggleSidebar={toggleSidebar}
        />
      </main>
    </>
  );
};

export default ChatUI;
