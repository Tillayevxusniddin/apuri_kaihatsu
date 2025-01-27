import React, { useEffect } from "react";
import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const Fancybox = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    NativeFancybox.bind('[data-fancybox="gallery"]', {});

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default Fancybox;
