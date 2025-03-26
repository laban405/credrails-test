import { icons } from "lucide-react";

export interface IconProps {
  name: keyof typeof icons;
  color: string;
  size: number;
  className?: string;
}

const Icon = ({ name, color, size, className = "" }: IconProps) => {
  const LucideIcon = icons[name as keyof typeof icons];

  return <LucideIcon color={color} size={size} className={className} />;
};

export { Icon };

export default Icon
