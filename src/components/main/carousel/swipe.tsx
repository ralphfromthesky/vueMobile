import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/less/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./swipe.css";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import {useGlobalList,} from "../../globalFunctions/store";
function Swipers() {
  const useImage = useGlobalList((state) => state.swiperData);
  function gotoLink(val: any) {
    if (val.titleUrl !== "") {
      window.open(val.titleUrl, "_blank");
    }
  }
  return (
    <>
      {useImage && useImage !== "" && (
        <Swiper
          style={{ padding: ".2rem", width: "12.1rem" }}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          initialSlide={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          loop={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {!!useImage &&
            useImage?.success !== false &&
            !!useImage &&
            useImage?.map((value: any, index: any) => (
              <SwiperSlide key={index}>
                <img
                  onClick={() => gotoLink(value)}
                  src={value.titleImg}
                  alt={`Slide ${index + 1}`}
                  className="min-w-[9rem]"
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </>
  );
}

export default Swipers;
