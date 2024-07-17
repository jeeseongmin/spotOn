import { CellInfo } from "@/types/table";

export const getTableHeader = (headerList: string[]) => {
  return headerList.map((item: string) => {
    return {
      type: "header",
      name: item,
    };
  });
};

export const getTableBody = (
  titleList: string[],
  contentList: CellInfo[][],
) => {
  return contentList.map(items => {
    return items.map((item, index) => {
      return {
        ...item,
        name: titleList[index],
        type: "body",
      };
    });
  });
};
