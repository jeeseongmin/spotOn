export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  community: string;
}

export interface UserStateRequest {
  userId: string;
  userStateCode: "00" | "01" | "07" | "08" | "09";
}
