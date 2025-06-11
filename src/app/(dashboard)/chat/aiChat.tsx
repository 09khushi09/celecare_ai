import { AiChatImage } from "@/components/ui/aiAvatar"
import MarkdownContent from "@/components/ui/markdown-content"
import { ChatHistoryPart } from "@/lib/types/chat"

export const AiChat = ({
  parts,
}: {
  parts: ChatHistoryPart[],
}) => {
  return (
    <div className="max-w-[90%] md:max-w-[80%] rounded-lg text-lg text-left flex">
      <div className="flex-shrink-0 self-start pt-1">
        <AiChatImage />
      </div>
      <div className="flex-grow overflow-x-auto">
        <MarkdownContent
          markdown={parts.map((part) => part.text).join("\n")}
        />
      </div>
    </div>
  )
}