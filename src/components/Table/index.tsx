import { ComponentPropsWithRef } from "react";

import { VariantProps, cva } from "class-variance-authority";

import Button from "@/components/Button";
import type { CellInfo } from "@/types/table";
import { cn } from "@/utils/cn";

const tableContentCSS = cva("", {
  variants: {
    variant: {},
  },
});

interface TableProps
  extends VariantProps<typeof tableContentCSS>,
    ComponentPropsWithRef<"table"> {
  header: CellInfo[];
  body: CellInfo[][];
}

const Table = ({ header, body }: TableProps) => {
  return (
    <table id="table" className="w-full border-collapse">
      <thead id="table-head" className="h-[44px] bg-gray-light text-base">
        <tr>
          {header.map(item => {
            return (
              <th
                className={cn(
                  "w-auto border border-gray-middle font-light",
                  !item.name && "w-[44px]",
                )}
              >
                {item.name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody id="table-body">
        {body.map(items => {
          return (
            <tr className="h-[44px] text-center text-small">
              {items.map(item => {
                if (!item.name)
                  return (
                    <td className="border border-gray-middle">
                      <Button
                        variant="underlined"
                        className={cn(
                          "text-nowrap text-xs text-primary",
                          item.data === "거절" && "text-gray-dark",
                        )}
                        onClick={item.method}
                      >
                        {item.data}
                      </Button>
                    </td>
                  );
                else
                  return (
                    <td className="border border-gray-middle">{item.data}</td>
                  );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
