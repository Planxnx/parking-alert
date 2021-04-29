import React, { useEffect, useState } from "react";

import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import { GetCartInfo, SendCarNoti } from "../../api/car";

import { ICarInfo } from "../../types/car";

const cancelAxios = axios.CancelToken.source();

const DivCar = styled.div`
  justify-content: center;
  align-items: center;
`;

const SuccessCarNotiComponent: React.FC = () => {
  return (
    <DivCar>
      <h1>ส่งคำขอเรียบร้อยแล้ว</h1>
    </DivCar>
  );
};

const CarPage: React.FC = () => {
  const { carID } = useParams<{ carID: string }>();
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
        const carInfoResult = await GetCartInfo(carID);
        setCarInfo(carInfoResult);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 404) {
          alert("ไม่เจอรถคันนี้");
          setLoading(false);
          setNotFound(true);
          return;
        }
        alert("ขออภัย, ไม่สามารถใช้งานได้ในขณะนี้");
        setIsError(true);
      }
    })();
  }, []);

  const sendCarNoti = async () => {
    setLoading(true);
    try {
      await SendCarNoti(carID, notificationMessage, cancelAxios);
      setNotificationStatus(true);
      setLoading(false);
    } catch (error) {
      if (error.response?.data?.code === "001") {
        setNotiLimit(true);
        setLoading(false);
        alert("มีการส่งคำขอไปแล้ว, โปรดส่งคำขอเลื่อนรถอีกครั้งภายหลัง");
        return;
      }
      cancelAxios.cancel();
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
  }
  return (
    <DivCar>
      <h2>{carInfo?.brand}</h2>
      <h2>{carInfo?.plateNumber}</h2>
      <h2>{carInfo?.plateCountry}</h2>
      <button onClick={sendCarNoti}>ส่งคำขอเลื่อนรถ</button>
    </DivCar>
  );
};

export default CarPage;
