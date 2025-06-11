import MarkdownContent from "@/components/ui/markdown";
import { ChatHistoryPart } from "@/lib/types/chat";
import Image from "next/image";

export const UserChat = ({
  parts,
}: {
  parts: ChatHistoryPart[],
}) => {
  return (
    <div className="max-w-[90%] md:max-w-[80%] bg-accent dark:bg-gray-1 border rounded-lg">
      {
        parts.map((part, index) => {
          if (part.fileData && part.fileData.fileUri) {
            return (
              <Image
                key={index + part.fileData.fileUri}
                className="rounded-lg w-[360px]"
                src={part.fileData.fileUri}
                alt="User"
                width={360}
                height={360}
              />
            )
          }

          if (part.text && part.text !== "") {
            return (
              <div key={index}>
                <MarkdownContent
                  markdown={parts.map((part) => part.text).join("\n")}
                />
              </div>
            );
          }

          return null;
        })
      }
    </div>
  )
}