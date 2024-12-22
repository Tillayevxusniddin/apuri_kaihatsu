"use client";

import { usePathname } from "@/navigation";

export const useActiveState = () => {
  const pathname = usePathname();

  const getActiveState = (url: string, items: any[]): boolean => {
    // Find the item whose URL matches the current pathname
    const matchedItem = items?.find((item: { url: string }) => item?.url === pathname);

    // Check if the parent of the matched item equals the given URL
    return matchedItem?.parent === url;
  };

  return { pathname, getActiveState };
};
