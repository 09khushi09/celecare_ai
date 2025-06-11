export default function ChatLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div className="flex h-screen w-screen">
      {children}
    </div>
  );
}
