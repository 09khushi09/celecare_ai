import { DetailedHTMLProps, HTMLAttributes } from "react";

interface FeatureCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  active?: boolean;
  width?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  active = false,
  width = 'auto',
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={`flex ${width} min-h-24 items-center justify-center gap-3 text-foreground cursor-pointer p-5 rounded-lg border-4 ${active ? 'border-app-primary' : 'border-accent hover:border-app-primary dark:border-gray-1 dark:hover:border-gray-2'}`}
    >
      {children}
    </div>
  );
};

export default FeatureCard;
