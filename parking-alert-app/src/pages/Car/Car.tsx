import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GetCartInfo, SendCarNoti } from "../../api/car";
import { ReactComponent as CarLogo } from "../../assets/car.svg";
import { ReactComponent as WebIcon } from "../../assets/icon.svg";
import { ReactComponent as NotiIcon } from "../../assets/noti.svg";
import Footer from "./component/Footer";
import { ICarInfo } from "../../types/car";
import LoadingScreen from "./component/Loading";
import OverlayMessage from "./component/OverlayMessage";

const cancelAxios = axios.CancelToken.source();

const CarPage: React.FC = () => {
  const { carID } = useParams<{ carID: string }>();
  const [carInfo, setCarInfo] = useState<ICarInfo>();
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [notiLimit, setNotiLimit] = useState(false);
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
        setLoading(false);
        if (error.response?.status === 404) {
          setNotFound(true);
          return;
        }
        setIsError(true);
      }
    })();
  }, [carID]);

  const sendCarNoti = async () => {
    setLoading(true);
    try {
      await SendCarNoti(carID, notificationMessage, cancelAxios);
      setLoading(false);
      setNotificationStatus(true);
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.code === "001") {
        setNotiLimit(true);
        return;
      }
      cancelAxios.cancel();
      setIsError(true);
    }
  };

  const StateOverlayMessage = () => {
    if (loading) {
      return <LoadingScreen />;
    } else if (notificationStatus) {
      return (
        <OverlayMessage
          title="Success✨"
          subtitle="I'll comeback to you in a few mintues"
        />
      );
    } else if (notiLimit) {
      return (
        <OverlayMessage
          title="Enough!😡"
          subtitle="Too much notification, Please try again later"
        />
      );
    } else if (isError) {
      return (
        <OverlayMessage
          code="500"
          title="Aww! Error!"
          subtitle="Unexpected error, Please try again later."
        />
      );
    } else if (notFound) {
      return (
        <OverlayMessage
          code="404"
          title="Not Found!"
          subtitle="It's look like you're lost"
        />
      );
    }
    return null;
  };
  return (
    <div className="font-prompt h-screen bg-purple-700 ">
      <StateOverlayMessage />
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
          <p>{carInfo?.brand}</p>&nbsp;&nbsp;&nbsp;&nbsp;
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
              <a
                className="w-72	h-14 my-4 rounded-md flex items-center justify-center bg-pinkyz text-white "
                onClick={sendCarNoti}
              >
                <div className="flex justify-center">
                  <NotiIcon className="mr-2 h-5" />
                  Send notification
                </div>
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarPage;
