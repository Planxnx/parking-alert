import { CancelTokenSource } from "axios";
import axiosInstance from "../utils/axios";
import { ICarInfo } from "../types/car";
import { IResponse } from "../types/response";

export const GetCartInfo = async (carID: string) => {
  try {
    const { data } = await axiosInstance.get<IResponse<ICarInfo>>(
      `/car/${carID}`
    );
    if (!data?.data) {
      throw new Error("data not found!");
    }
    return {
      plateNumber: data.data.plateNumber,
      plateCountry: data.data.plateCountry,
      brand: data.data.brand,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const SendCarNoti = async (
  carID: string,
  notificationMessage?: string,
  cancelToken?: CancelTokenSource
) => {
  try {
    await axiosInstance({
      url: `/notification/${carID}`,
      method: "POST",
      cancelToken: cancelToken?.token,
      data: {
        message: notificationMessage,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
