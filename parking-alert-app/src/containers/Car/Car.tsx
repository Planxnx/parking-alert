import React, { useEffect, useState } from "react";

import axios from "axios";
import axiosInstance from "../../services/axios";
import styled from "styled-components";
import styles from "./car.module.css";
import { useParams } from "react-router-dom";

const cancelAxios = axios.CancelToken.source();

const DivCar = styled.div`
  justify-content: center;
  align-items: center;
`;

interface IParam {
  carID: string;
}

interface ICarInfo {
  plateNumber: string;
  plateCountry: string;
  brand: string;
}

const getCarInfo = async (carID: string): Promise<ICarInfo> => {
  try {
    const resp = await axiosInstance({
      url: `/car/${carID}`,
      method: "GET",
    });
    return {
      plateNumber: resp.data.data.plateNumber,
      plateCountry: resp.data.data.plateCountry,
      brand: resp.data.data.brand,
    };
  } catch (error) {
    throw error;
  }
};

const SuccessCarNotiComponent: React.FC = () => {
  return (
    <DivCar>
      <h1>ส่งคำขอเรียบร้อยแล้ว</h1>
    </DivCar>
  );
};

const CarContainer: React.FC = () => {
  const { carID } = useParams<IParam>();
  const [carInfo, setCarInfo] = useState<ICarInfo>();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [notiLimit, setNotiLimit] = useState(false);
  const [apiStatus, setAPIStatus] = useState(true);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    document.title = `${carID} | Planxnx.dev`;
    (async () => {
      try {
        const carInfoResult = await getCarInfo(carID);
        setCarInfo(carInfoResult);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 404) {
          alert("ไม่เจอรถคันนี้");
          setLoading(false);
          setNotFound(true)
          return;
        }
        alert("ขออภัย, ไม่สามารถใช้งานได้ในขณะนี้");
        setIsError(true) 
      }
    })();
  }, []);

  const sendCarNoti = async () => {
    setLoading(true);
    try {
      await axiosInstance({
        url: `/notification/${carID}`,
        method: "POST",
        cancelToken: cancelAxios.token,
        data: {
          message: notificationMessage,
        },
      });
      setNotificationStatus(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      if (error.response?.data?.code === "001") {
        setNotiLimit(true);
        setLoading(false);
        alert("มีการส่งคำขอไปแล้ว, โปรดส่งคำขอเลื่อนรถอีกครั้งภายหลัง");
        return;
      }
      cancelAxios.cancel()
      setAPIStatus(false);
      setLoading(false);
      alert("ไม่สามารถส่งคำขอได้, โปรดส่งคำขอเลื่อนรถอีกครั้งภายหลัง");
    }
  };

  if (loading) {
    return (
      <DivCar>
        <h1>Loading</h1>
      </DivCar>
    );
  }
  if (notFound) {
    return (
      <DivCar>
        <h1>ไม่เจอรถทะเบียนนี้จ้า</h1>
      </DivCar>
    );
  }
  if (isError) {
    return (
      <DivCar>
        <h1>ขออภัย ไม่สามารถใช้งานได้ :(</h1>
      </DivCar>
    );
  }
  if (notificationStatus) {
    return <SuccessCarNotiComponent />;
  } else {
    return (
      <DivCar>
        <h2>{carInfo?.brand}</h2>
        <h2>{carInfo?.plateNumber}</h2>
        <h2>{carInfo?.plateCountry}</h2>
        <button onClick={sendCarNoti}>ส่งคำขอเลื่อนรถ</button>
      </DivCar>
    );
  }
};

export default CarContainer;
