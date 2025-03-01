"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

const ScrollToTopBottom = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      setShowButton(scrollHeight > clientHeight); // Show button only if scrolling is possible
    };

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5); // Small offset for precision
    };

    checkScrollable();
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  if (!showButton) return null; // Hide if scrolling is not needed

  const scrollTo = (position) => {
    window.scrollTo({
      top: position === "bottom" ? document.documentElement.scrollHeight : 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={() => scrollTo(isAtBottom ? "top" : "bottom")}
      className="fixed bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg"
    >
      {isAtBottom ? (
        <>
          <ArrowUp className="w-5 h-5 mr-1" /> Scroll to Top
        </>
      ) : (
        <>
          <ArrowDown className="w-5 h-5 mr-1" /> Scroll to Bottom
        </>
      )}
    </Button>
  );
};

export default ScrollToTopBottom;
