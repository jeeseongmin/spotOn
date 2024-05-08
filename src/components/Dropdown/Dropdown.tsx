import { ComponentPropsWithoutRef, MouseEventHandler, useRef } from "react";

import { VariantProps, cva } from "class-variance-authority";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import Button from "@/components/Button";
import useModal from "@/hooks/useModal";
import { useOutSideClick } from "@/hooks/useOutSideClick";
import { cn } from "@/utils/cn";

import { organization } from "../../constants/common";

/* 추가되는 다른 dropdown에 따라 variant 추가 예정 */
const dropdownCSS = cva("relative h-10", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface DropdownProps
  extends ComponentPropsWithoutRef<"input">,
    VariantProps<typeof dropdownCSS> {
  onChangeOption: (option: string) => void;
  disabled: boolean;
  category: string; // 드롭다운 카테고리
  options: string[]; // 드롭다운 별 옵션 배열
  selectedOption: string;
}

/* Option Component in Dropdown */
const Option = ({
  option,
  isSelected,
  onClick,
}: {
  option: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) => {
  const selectedStyle = "bg-primary text-white border border-primary";
  const nonSelectedStyle =
    "bg-white text-black border-t border-l border-r border-gray-dull";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${isSelected ? selectedStyle : nonSelectedStyle} z-20 flex w-full select-none flex-row items-center px-3 py-2.5 text-sm`}
    >
      {option}
    </button>
  );
};

/* Main Component */
const Dropdown = ({
  variant,
  onChangeOption,
  className,
  disabled,
  category,
  options,
  selectedOption,
}: DropdownProps) => {
  const placeholder = organization[category];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsModal = useModal();
  useOutSideClick(dropdownRef, () => optionsModal.onClose());

  /* 옵션 클릭 시 event */
  const onClickOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const target = e.currentTarget;
    const value = target.innerText;
    onChangeOption(value); // 실제 form 훅에 저장
    optionsModal.onClose(); // 모달  닫기
  };

  return (
    <div ref={dropdownRef} className={cn(dropdownCSS({ variant }), className)}>
      <div
        className={`absolute left-0 top-11 z-20 flex h-auto w-full flex-col overflow-hidden`}
      >
        <div
          className={`flex flex-col overflow-scroll ${optionsModal.isOpen ? "h-[124px] animate-dropdown-open border-b border-gray-dull" : "h-0"}`}
        >
          {options.map(option => {
            return (
              <Option
                key={option}
                option={option}
                isSelected={selectedOption === option}
                onClick={onClickOption}
              />
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className={`disabled:bg-gray-white disabled:text-gray-black absolute top-0 z-40 flex h-10 w-full select-none flex-row items-center justify-between gap-4 rounded-sm border border-gray-500 bg-white px-3 py-2.5 font-light disabled:border-gray-dull ${selectedOption ? "text-black" : "font-light text-gray-middle"}`}
        onClick={() => {
          if (!disabled) optionsModal.onToggle();
        }}
        disabled={disabled}
      >
        <span className={`text-sm`}>
          {selectedOption ? selectedOption : placeholder}
        </span>
        {!disabled && (
          <Button variant="icon" className="w-auto">
            {optionsModal.isOpen ? (
              <SlArrowUp size={14} className="py-0 text-xl text-gray-600" />
            ) : (
              <SlArrowDown size={14} className="py-0 text-xl text-gray-600" />
            )}
          </Button>
        )}
      </button>
    </div>
  );
};

export default Dropdown;
