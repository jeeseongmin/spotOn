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

// spotOnToken으로 유저 정보를 가져오는 api
export const getUserInfo = async (spotOnToken: string) => {
  try {
    const { data } = await axiosInstance.get(
      `/user-service/api/v1/users/info/${spotOnToken}`,
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};
