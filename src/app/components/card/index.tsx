"use client";
import { MovieProps } from "@/app/utils/types/movie";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";

interface CardProps {
  movies: MovieProps[];
}

export function Card({ movies }: CardProps) {
  return (
    <div className="grid gap-7   sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <Link key={movie.id} href={`movie/${movie.id}`}>
          <section className="w-full flex flex-col  justify-center items-center mb-5">
            <div className="relative w-full h-96 group overflow-hidden rounded-lg">
              <Image
                className="rounded-lg hover:opacity-70 group-hover:scale-110 transition-all duration-300"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                priority={true}
                fill={true}
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
              />
            </div>
            <p className="text-lg text-white mt-2 text-center text-clip overflow-hidden">
              {movie.title}
            </p>
            <p className="flex items-center gap-1 text-sm text-white mt-2 text-center">
              <IoIosStar color="yellow" />
              {movie.vote_average.toFixed(1)}
            </p>
          </section>
        </Link>
      ))}
    </div>
  );
}
