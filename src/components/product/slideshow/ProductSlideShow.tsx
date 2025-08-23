'use client';
import React, { useState } from 'react';
import { Swiper as SwiperObject } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css'; 

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: { id: number; url: string }[]; // 👈 ahora es array de objetos
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={className}>
      {/* Slideshow principal */}
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        } as React.CSSProperties}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <ProductImage
              width={1024}
              height={800}
              src={img.url}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Miniaturas */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <ProductImage
              width={300}
              height={300}
              src={img.url}
              alt={title}
              className="rounded-lg object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
