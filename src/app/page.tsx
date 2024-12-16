"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { MovieProps } from "@/app/utils/types/movie";
import { Container } from "./components/container";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import PacmanLoader from "react-spinners/PacmanLoader";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Card } from "./components/cards";

export default function Home() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [series, setSeries] = useState<MovieProps[]>([]);
  const [loadingMovies, setLoadingMovies] = useState<boolean>(true);
  const [loadingSeries, setLoadingSeries] = useState<boolean>(true);
  const [errorMovies, setErrorMovies] = useState<string | null>(null);
  const [errorSeries, setErrorSeries] = useState<string | null>(null);

  // Função para buscar filmes
  const getMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR&page=1`
      );
      setMovies(response.data.results);
    } catch (error) {
      setErrorMovies("Erro ao buscar os filmes");
    } finally {
      setLoadingMovies(false);
    }
  };

  // Função para buscar séries
  const getSeries = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=pt-BR&page=1`
      );
      setSeries(response.data.results);
    } catch (error) {
      setErrorSeries("Erro ao buscar as séries");
    } finally {
      setLoadingSeries(false);
    }
  };

  useEffect(() => {
    getMovies();
    getSeries();
  }, []);

  return (
    <main className="px-5 py-10 min-h-screen ">
      <Container>
        <div className="w-full flex mb-12 max-sm:h-42">
          <Image
            src="/banner.png"
            alt="Banner"
            className="w-full object-cover rounded-lg brightness-75 max-sm:object-right"
            quality={100}
            priority={true}
            width={1500}
            height={600}
          />
        </div>

        <div className="w-full flex flex-col mb-10">
          <h2 className="text-2xl text-white my-10 uppercase font-semibold">Navegue pelos Gêneros de Cinema</h2>
          <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-sm:grid-cols-2">
            <Card name="Ação"> </Card>
            <Card name="Aventura"> </Card>
            <Card name="Comédia"> </Card>
            <Card name="Drama"> </Card>
            <Card name="Romance"> </Card>
            <Card name="Terror"> </Card>
            <Card name="Suspense"> </Card>
            <Card name="Fantasia"> </Card>
            <Card name="Mistério"> </Card>
            <Card name="Thriller"> </Card>
            <Card name="Animação"> </Card>
            <Card name="Documentário"> </Card>
          </div>
        </div>

        {/* Seção de Filmes */}
        <div className="mb-10">
          <h1 className="text-3xl text-white my-10 uppercase font-semibold">
            🍿 Filmes em alta
          </h1>
          {loadingMovies ? (
            <PacmanLoader color="white" />
          ) : errorMovies ? (
            <p className="text-red-500 text-center">{errorMovies}</p>
          ) : (
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              navigation={{
                disabledClass: "swiper-button-disabled",
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  navigation: false,
                },
                640: {
                  slidesPerView: 2,
                  navigation: false,
                },
                768: {
                  slidesPerView: 3,
                  navigation: true,
                },
                1024: {
                  slidesPerView: 4,
                  navigation: true,
                },
              }}
            >
              {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                  <Link href={`movie/${movie.id}`}>
                    <div className="rounded-lg text-center">
                      <div className="group overflow-hidden rounded-lg">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-auto rounded-t-lg group-hover:scale-110 duration-300 transition-all"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-base text-white font-semibold truncate">
                          {movie.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        {/* Seção de Séries */}
        <div className="mb-10">
          <h1 className="text-3xl text-white my-10 uppercase font-semibold">
            📺 Séries em alta
          </h1>
          {loadingSeries ? (
            <PacmanLoader color="white" />
          ) : errorSeries ? (
            <p className="text-red-500 text-center">{errorSeries}</p>
          ) : (
            <Swiper
              spaceBetween={30}
              slidesPerView={3}
              loop={true}
              navigation={{
                disabledClass: "swiper-button-disabled",
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  navigation: false,
                },
                640: {
                  slidesPerView: 2,
                  navigation: false,
                },
                768: {
                  slidesPerView: 3,
                  navigation: true,
                },
                1024: {
                  slidesPerView: 4,
                  navigation: true,
                },
              }}
            >
              {series.map((serie) => (
                <SwiperSlide key={serie.id}>
                  <Link href={`series/${serie.id}`}>
                    <div className="rounded-lg text-center">
                      <div className="group overflow-hidden rounded-lg">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                          alt={serie.name}
                          className="w-full h-auto rounded-t-lg group-hover:scale-110 duration-300 transition-all"
                        />
                      </div>
                      <div className="p-4">
                        <h2 className="text-base text-white font-semibold truncate">
                          {serie.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </Container>
    </main>
  );
}
