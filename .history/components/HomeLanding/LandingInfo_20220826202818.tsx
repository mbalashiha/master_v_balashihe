import Header from "@/components/shared/NavigationMenu";
import React from "react";
import { ToastContainer } from "react-toastify";
import Footer from "@/components/shared/Footer";
import styles from "@/components/home_landing/LandingContactForm.module.scss";
import ChildrenText from "./ChildrenText";

const LandingInfo = () => {
  return (
    <div>
      <div
        style={{
          color: "rgb(255, 255, 255)",
          fontSize: "50px",
          transitionDelay: "0s",
        }}
      >
        <h1 className="text-xl md:text-3xl md:leading-[3rem] text-white">
          Компьютерный мастер в Балашихе и в Москве с выездом на дом или в офис
        </h1>
      </div>
      <div
        className=""
        style={{
          color: "rgb(255, 255, 255)",
          paddingTop: "20px",
          transition: "none 0s ease 0s",
        }}
      >
        <div>
          <strong className="font-semibold text-md md:text-xl md:leading-10">
            По возможности ремонтирую технику у заказчика на дому (в офисе) без доставки обурудования в сервисный центр
          </strong>
          <br />
          <br />
          <span style={{ fontSize: "18px" }}>
            Этот сайт создан для Вас чтобы Вы знали к кому можно обратиться в случае поломки компьюнера, ноутбука, смартфона и копировальной техники 
            в Балашихе рядом с Шоссе Энтузиастов.
            В большинстве случаев, я как компьютерный мастер выполняю ремонт техники в течении одного дня у вас дома в Балашихе в день обращения или в офисе предприятия без переноса техники в сервисный центр (около 90% вызовов)
          </span>
          <br />
          <span style={{ fontSize: "18px" }}></span>
        </div>
      </div>
    </div>
  );
};
export default LandingInfo;
