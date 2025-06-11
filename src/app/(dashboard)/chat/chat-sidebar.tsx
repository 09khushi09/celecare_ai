'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HOME_ROUTE } from "@/lib/constants/constants";
import { Chat, ChatType } from "@/lib/types/chat";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { XIcon } from "lucide-react";

interface ChatSidebarProps {
  filteredChats: Chat[];
  selectedType: ChatType;
  setSelectedType: (value: ChatType) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  filteredChats,
  selectedType,
  setSelectedType,
  toggleSidebar,
  isSidebarOpen,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  return (
    <>
      <nav className={`w-full flex flex-col lg:w-1/4 fixed lg:static top-0 left-0 h-full bg-background z-10 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 origin-left transition-transform duration-300 ease-in-out shadow-md pb-8 pt-0 px-6 overflow-auto`}>
        <div className="sticky top-0 z-10 bg-background py-6">
          <div className="flex justify-between items-center pb-6">
            <h1 className="font-bold text-2xl">Chat History</h1>
            <Button
              className="visible lg:hidden"
              onClick={toggleSidebar}
              size="icon"
              variant="outline"
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <Select
            onValueChange={(value) => {
              setSelectedType(value as ChatType);
            }}
            value={selectedType}
            defaultValue={ChatType.FOOD_AI}
          >
            <SelectTrigger>
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value={ChatType.FOOD_AI}
              >
                Food AI Chats
              </SelectItem>
              <SelectItem
                value={ChatType.PERSONAL_CARE_AI}
              >
                Personal Care AI Chats
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <ul className="flex-1 flex-col space-y-2 pb-6 overflow-y-auto">
          {filteredChats.length !== 0 ? filteredChats.map((chat) => (
            <li
              key={chat.id}
              onClick={toggleSidebar}
            >
              <Link href={`/chat?id=${chat.id}`} className="cursor-pointer">
                <Card
                  className={`${chat.id === id as string ? 'bg-app-primary hover:opacity-85' : 'hover:bg-accent dark:hover:bg-gray-1'} transition duration-150 ease-in-out`}
                >
                  <CardContent className="p-4">
                    <span className="">{chat.title}</span>
                  </CardContent>
                </Card>
              </Link>
            </li>
          )) : <p className="text-center text-gray-400">No chats found</p>}
        </ul>
        <div className="w-full">
          <Button
            size="lg"
            variant="app-primary"
            className="w-full"
            onClick={() => router.push(HOME_ROUTE)}
          >
            Go to Dashboard
          </Button>
        </div>
      </nav>
    </>
  );
}

export default ChatSidebar;
