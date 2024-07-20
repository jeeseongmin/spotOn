import axios from "axios";

import { classifyingPlace } from "@/utils/place";

export const fetchBuilding = async () => {
  try {
    const res = await axios.get(
      `/talkingclass/portal-service/api/v1/building/list?cpsCd=PTK`,
    );

    return res;
  } catch (error: unknown) {
    console.log("error : ", error);
  }
};

export const fetchPlace = async () => {
  try {
    const res = await axios.get(
      `/talkingclass/portal-service/api/v1/place/list?cpsCd=PTK&bldCd=PTK_PTK`,
    );

    return classifyingPlace(res.data);
  } catch (error: unknown) {
    console.log("error : ", error);
  }
};
