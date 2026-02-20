import { axiosInstance } from "@/apis/core";
import { IS_DEMO_MODE, demoUsers } from "@/dummy/demo";
import type { UpdateUserInfoRequest, UserStateRequest } from "@/types/user";

export const putUserState = async (userStateRequest: UserStateRequest) => {
  if (IS_DEMO_MODE) {
    console.log("Demo mode: putUserState", userStateRequest);
    return { success: true };
  }

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
  if (IS_DEMO_MODE) {
    // 데모 모드에서는 첫 번째 유저 정보 반환
    return demoUsers[0];
  }

  try {
    const { data } = await axiosInstance.get(
      `/user-service/api/v1/users/info/${spotOnToken}`,
    );

    return data;
  } catch (error) {
    console.error(error);
  }
};

// 회원정보 수정 api
export const updateUserInfo = async (
  tokenId: string,
  updateUserInfoRequest: UpdateUserInfoRequest,
) => {
  if (IS_DEMO_MODE) {
    console.log("Demo mode: updateUserInfo", { tokenId, updateUserInfoRequest });
    return { success: true };
  }

  try {
    await axiosInstance.put(
      `/user-service/api/v1/users/info/${tokenId}`,
      updateUserInfoRequest,
    );
  } catch (error) {
    console.error(error);
  }
};

export const postUsersByState = async (
  page: number = 0,
  size: number = 10,
  userStateCode: string = "",
) => {
  if (IS_DEMO_MODE) {
    let filtered = demoUsers;
    if (userStateCode && userStateCode !== "all") {
      filtered = filtered.filter(u => u.userStateCode === userStateCode);
    }
    const start = page * size;
    const content = filtered.slice(start, start + size);
    return {
      content,
      numberOfElements: content.length,
      totalPages: Math.ceil(filtered.length / size),
      totalElements: filtered.length,
    };
  }

  try {
    const res = await axiosInstance.post(
      "/user-service/api/v1/users/list/page",
      {
        cpsCd: "PTK",
        userStateCode,
      },
      {
        params: {
          page,
          size,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return { content: [], numberOfElements: 0, totalPages: 0 };
  }
};
