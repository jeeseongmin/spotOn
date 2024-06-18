export const getTableHeader = (headerList: string[]) => {
  return headerList.map((item: string) => {
    return {
      type: "header",
      name: item,
    };
  });
};

export const getTableBody = (bodyList: CellInfo[][]) => {
  return bodyList.map(items => {
    return items.map(item => {
      return {
        ...item,
        type: "body",
      };
    });
  });
};
