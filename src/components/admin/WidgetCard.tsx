
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type WidgetCardProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const WidgetCard = ({ title, children, className }: WidgetCardProps) => {
  return (
    <Card
      className={cn(
        "bg-deep-black/50 border border-hardcore-pink/20 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,119,0.2)] hover:shadow-[0_0_25px_rgba(255,0,119,0.4)] transition-shadow duration-300",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-hardcore-pink uppercase font-heading tracking-widest">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default WidgetCard;
