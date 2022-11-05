import React, { useState, useEffect, memo } from 'react'
import { getSwiperBanner } from "@/api/modules/find";
import { to } from "@/utils/util";
import { useRefCallback } from "@h/hooks";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/core'
// SwiperCore.use([Autoplay, Pagination])
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import './index.less';
import Img from '@/components/Img';
function MySwiper() {
  const [swiperList, setswiperList] = useState([])

  const getSwiperList = useRefCallback(async () => {
    const [err, res] = await to(getSwiperBanner())
    if (res) setswiperList(res.banners || [])
  }, [])

  useEffect(() => {
    getSwiperList()
  }, [])
  return (
    <Swiper
      modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
      autoplay
      delay={3000}
      loop
      navigation
      centeredSlides
      initialSlide={2}
      slidesPerView={2}
      effect='coverflow'
      pagination={{ clickable: true }}
      spaceBetween={50}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 500,
        modifier: 1,
        slideShadows: false,
      }}
    >
      {
        swiperList.map(item => (
          <SwiperSlide className='swiper-item' key={item.bannerId}>
            <Img className='swiper-img' src={item.pic} alt={item.typeTitle} />
          </SwiperSlide>
        ))
      }
    </Swiper>
  )
}

export default memo(MySwiper)
