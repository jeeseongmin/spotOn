import { axiosInstance } from "@/apis/core";
import type { UserStateRequest } from "@/types/user";

export const putUserState = async (userStateRequest: UserStateRequest) => {
  try {
    await axiosInstance.put(
      "/user-service/api/v1/users/state/change",
      userStateRequest,
    );
  } catch (error) {
    console.error(error);
  }
};
