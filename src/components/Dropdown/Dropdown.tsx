import {
  ComponentPropsWithoutRef,
  MouseEventHandler,
  forwardRef,
  useRef,
  useState,
} from "react";

import { VariantProps, cva } from "class-variance-authority";
import { FieldValues, UseFormSetValue } from "react-hook-form";
import { SlArrowDown } from "react-icons/sl";

import useModal from "@/hooks/useModal";
import { useOutSideClick } from "@/hooks/useOutSideClick";
import { cn } from "@/utils/cn";

import { organization } from "../../constants/common";

/* 추가되는 다른 dropdown에 따라 variant 추가 예정 */
const dropdownCSS = cva("relative", {
  variants: {
    variant: {
      default: "rounded-sm border border-gray-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface DropdownProps
  extends ComponentPropsWithoutRef<"input">,
    VariantProps<typeof dropdownCSS> {
  setValue: UseFormSetValue<FieldValues>;
  category: string; // 드롭다운 카테고리
  options: string[]; // 드롭다운 별 옵션 배열
  disabled: boolean; // 미사용 여부
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
  const selectedStyle = "bg-blue-900 text-white border border-blue-900";
  const nonSelectedStyle = "bg-white text-black border border-gray-300";

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
const Dropdown = forwardRef<HTMLInputElement, DropdownProps>(
  ({ variant, setValue, category, options, disabled, ...props }, ref) => {
    const placeholder = organization[category];
    const [selectedOption, setSelectedOption] = useState(placeholder); // 선택된 option 관리 State입니다. (초기 세팅은 placeholder)
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionsModal = useModal();
    useOutSideClick(dropdownRef, () => optionsModal.onClose());

    /* 옵션 클릭 시 event */
    const onClickOption = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      const target = e.currentTarget;
      const value = target.innerText;
      setSelectedOption(value);
      setValue(category, value); // 실제 form 훅에 저장
      optionsModal.onClose(); // 모달  닫기
    };

    return (
      <div ref={dropdownRef} className={cn(dropdownCSS({ variant }))}>
        <button
          type="button"
          className={`z-40 flex w-full cursor-pointer select-none flex-row items-center justify-between gap-4 rounded-sm px-3 py-2.5 disabled:bg-gray-200 disabled:text-gray-500 ${selectedOption === placeholder ? "font-light text-gray-300" : "text-black"}`}
          onClick={() => optionsModal.onToggle()}
          disabled={disabled}
        >
          <span className={`text-sm`}>{selectedOption}</span>
          <SlArrowDown size={14} className="py-0 text-xl text-gray-600" />
        </button>

        {optionsModal.isOpen && (
          <div className="absolute left-0 top-10 z-20 flex h-auto max-h-32 w-full flex-col overflow-hidden bg-white shadow-lg">
            <div className="scrollbar-hide flex h-auto flex-col overflow-scroll">
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
        )}

        {/* useForm hooks 사용을 위한 input 값 사용 */}
        <input ref={ref} type="hidden" {...props} />
      </div>
    );
  },
);

export default Dropdown;