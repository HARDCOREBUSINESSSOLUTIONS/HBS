
import { cn } from "@/lib/utils";

interface HardcoreButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const HardcoreButton = ({ children, className, ...props }: HardcoreButtonProps) => {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-cyber-indigo px-8 py-4 font-bold text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-hardcore-pink focus:ring-offset-2 focus:ring-offset-deep-black",
        className
      )}
      {...props}
    >
      <span className="absolute -inset-full top-0 block -translate-x-full -skew-x-12 transform bg-hardcore-pink transition-all duration-500 group-hover:translate-x-0 group-hover:skew-x-0" />
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
};

export default HardcoreButton;
