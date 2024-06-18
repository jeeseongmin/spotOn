/**
 * Header, Body에 공통적으로 쓰이는 Cell Info Type
 */
type CellInfo = {
  type?: string; // "header" | "body"
  name: string; // Cell Name
  data?: string; // Cell Data
  method?: () => void; // Cell Method
};
