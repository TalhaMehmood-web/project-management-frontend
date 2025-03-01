import React from "react";
import {
  TooltipProvider,
  Tooltip as ShadTooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const Tooltip = ({ children, text, side = "top", delay = 100 }) => {
  return (
    <TooltipProvider>
      <ShadTooltip delayDuration={delay}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{text}</p>
        </TooltipContent>
      </ShadTooltip>
    </TooltipProvider>
  );
};

export default Tooltip;
