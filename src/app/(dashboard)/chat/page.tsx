import { Suspense } from "react";
import ChatUI from "./chat"

const ChatPage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full flex items-center justify-center h-screen">
          <p>Loading chats...</p>
        </div>
      }
    >
      <ChatUI />
    </Suspense>
  );
}

export default ChatPage;
