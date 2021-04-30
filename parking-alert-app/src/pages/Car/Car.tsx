import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GetCartInfo, SendCarNoti } from "../../api/car";
import { ReactComponent as CarLogo } from "../../assets/car.svg";
import { ReactComponent as WebIcon } from "../../assets/icon.svg";
import Footer from "./component/Footer";
import { ICarInfo } from "../../types/car";

const cancelAxios = axios.CancelToken.source();

const SuccessCarNotiComponent: React.FC = () => {
  return (
    <div>
      <h1>ส่งคำขอเรียบร้อยแล้ว</h1>
    </div>
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
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  if (notFound) {
    return (
      <div>
        <h1>ไม่เจอรถทะเบียนนี้จ้า</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1>ขออภัย ไม่สามารถใช้งานได้ :(</h1>
      </div>
    );
  }
  if (notificationStatus) {
    return <SuccessCarNotiComponent />;
  }
  return (
    <div className="font-prompt h-screen bg-purple-700 ">
      <div className="w-screen h-1/6 text-white ">
        <div className="pt-3 px-3 flex">
          <WebIcon className="mr-2" />
          <p className="text-lg font-medium">Parking Alert</p>
        </div>
        <div className="py-4 justify-items-center grid ">
          <p className="text-xl font-semibold">
            If you want to move the car,
            <br /> Tell me!
          </p>
        </div>
      </div>
      <div className="w-screen h-5/6 py-7	px-9 rounded-t-mvp1 bg-white">
        <div className="flex font-normal text-purple-700">
          <p>{carInfo?.brand}</p>
          <p>{carInfo?.plateNumber}</p>
        </div>
        <div className="justify-items-center grid">
          <div className="py-5">
            <CarLogo />
          </div>
          <form>
            <div className="grid justify-items-center">
              <div className="w-64">
                <label className="text-pinkyz">Tell me ? (optional)</label>
                <textarea
                  className="w-64 h-40 p-3 rounded-lg border border-pinkyz focus:border-pinkyz resize-none text-purple-700"
                  placeholder="Ex. ฉันมีธุรด่วน โปรดรีบกลับมา, โทรกลับหาฉัน 08x-xxxxxxx "
                  onChange={(e) => {
                    setNotificationMessage(e.target.value);
                  }}
                ></textarea>
              </div>
              <button
                className="w-72	h-14 my-4 rounded-md justify-center bg-pinkyz text-white "
                onClick={sendCarNoti}
              >
                Send notification
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarPage;
