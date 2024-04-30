import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  override: {
    theme: {
      colors: ["primary", "black", "white", "gray", "sunday", "saturday"],
    },
    classGroups: {
      "font-size": [{ text: ["base", "small"] }],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};
