import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customTwMerge = extendTailwindMerge({
  override: {
    theme: {
      colors: [
        "primary",
        "primary-light",
        "black",
        "white",
        "white-dull",
        {
          gray: ["light", "tinted", "middle", "dull", "dark"],
        },
        "sunday",
        "saturday",
        "kakaoBG",
        "kakaoFont",
        "loginBG",
      ],
    },
    classGroups: {
      "font-size": [{ text: ["base", "small"] }],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => {
  return customTwMerge(clsx(inputs));
};
