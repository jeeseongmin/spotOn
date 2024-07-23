import { ReactNode } from "react";

export type PropsWithRequiredChildren<P = unknown> = P & {
  children: ReactNode;
};

export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  community: string;
}
