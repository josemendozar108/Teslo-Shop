'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './slideshow.css';

// import required modules
import { Autoplay, Pagination } from 'swiper/modules';
import { ProductImage } from '../product-image/ProductImage';

interface Props {
  images: { id: number; url: string }[]; // 👈 ahora es array de objetos
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100vw',
          height: '500px',
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiperMobile"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <ProductImage
              width={600}
              height={500}
              src={img.url}  // 👈 ya no hace falta `/products/`
              alt={title}
              className="object-contain w-full h-auto rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
