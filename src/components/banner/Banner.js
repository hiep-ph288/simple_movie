import React from "react";
import useSWR from "swr";
import { fetcher, apiKey } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    fetcher
  );
  const movies = data?.results || [];
  return (
    <section className="banner h-[800px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg relative">
      <div
        className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)]
         rounded-lg"
      ></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Horror
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Mystery
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Thriller
          </span>
        </div>
        <button onClick={() => navigate(`/movie/${id}`)} className="py-3 px-6 rounded-lg bg-primary text-white font-medium">
          Watch Now
        </button>
      </div>
    </div>
  );
}

export default Banner;
