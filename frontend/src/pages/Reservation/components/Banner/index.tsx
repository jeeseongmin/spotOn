import { useState } from "react";

import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import Button from "@/components/Button";
import { cn } from "@/utils/cn";

interface BannerProps {
  title: string;
  content: string[];
}

const Banner = ({ title, content }: BannerProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const ArrowIcon = isOpen ? SlArrowUp : SlArrowDown;
  const buttonText = isOpen ? "접기" : "더보기";

  return (
    <div className="flex w-full flex-col gap-1 bg-gray-middle px-4 text-small text-black md:px-12">
      <div
        className={cn(
          "flex flex-col gap-4 pt-4",
          !isOpen && "max-h-[5.5rem] overflow-hidden",
        )}
      >
        <div className="text-base text-primary">{title}</div>
        <ol className="list-inside list-decimal leading-6">
          {content.length > 0 ? (
            content.map(text => {
              return <li>{text}</li>;
            })
          ) : (
            <></>
          )}
        </ol>
      </div>
      <div className="flex items-center justify-center">
        <Button
          variant="custom"
          className="flex items-center justify-center gap-1.5 py-2 text-small text-black outline-none"
          onClick={() => setIsOpen(prevState => !prevState)}
        >
          <ArrowIcon size={9} />
          <div>{buttonText}</div>
        </Button>
      </div>
    </div>
  );
};

export default Banner;
