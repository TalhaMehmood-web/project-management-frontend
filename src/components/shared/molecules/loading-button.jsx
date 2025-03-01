import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React from "react";

const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <Button {...props} disabled={loading}>
      {loading && <Loader className="mr-2 animate-spin " />}
      {children}
    </Button>
  );
};

export default LoadingButton;
