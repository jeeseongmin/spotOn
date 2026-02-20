import { axiosInstance } from "@/apis/core";
import { placesByFloor } from "@/dummy/places";
import { IS_DEMO_MODE, getDemoPlaces, demoBuildings } from "@/dummy/demo";
import { classifyingPlace } from "@/utils/place";

export const fetchBuilding = async () => {
  if (IS_DEMO_MODE) {
    return { data: demoBuildings };
  }

  try {
    const res = await axiosInstance.get(
      `/portal-service/api/v1/building/list?cpsCd=PTK`,
    );

    return res;
  } catch (error: unknown) {
    console.log("error : ", error);
  }
};

export const fetchPlace = async (bldCd: string) => {
  if (IS_DEMO_MODE) {
    return getDemoPlaces();
  }

  try {
    const res = await axiosInstance.get(
      `/portal-service/api/v1/place/list?cpsCd=PTK&bldCd=${bldCd}`,
    );

    return classifyingPlace(res.data);
  } catch (error: unknown) {
    console.log("error : ", error);
    return placesByFloor;
  }
};
