import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import BookCover from "./BookCover";

const BookOverview = ({
  title,
  author,
  genre,
  rating,
  totalCopies,
  availableCopies,
  description,
  color,
  cover,
}: Book) => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-start justify-between gap-10">
      {/* LEFT SIDE - Book Details */}
      <div className="flex flex-1 flex-col gap-5 text-white">
        <h1 className="text-5xl font-semibold md:text-7xl">{title}</h1>

        <div className="mt-4 flex flex-row flex-wrap gap-4 text-xl text-[#D6E0FF]">
          <p>
            By <span className="font-semibold text-[#D9B28B]">{author}</span>
          </p>
          <p>
            Category{" "}
            <span className="font-semibold text-[#D9B28B]">{genre}</span>
          </p>
        </div>

        <div className="flex flex-row items-center gap-2 text-2xl">
          <Image src="/icons/star.svg" alt="star" width={22} height={22} />
          <p>{rating}</p>
        </div>

        <div className="text-2xl flex flex-row flex-wrap gap-4 mt-1 text-[#F5E6D5]">
          <p>
            Total Books: <span>{totalCopies}</span>
          </p>
          <p>
            Available Books: <span>{availableCopies}</span>
          </p>
        </div>

        <p className="mt-2 text-justify text-xl text-[#F5E6D5]">
          {description}
        </p>

        <Button className="mt-4 min-h-14 w-fit bg-[#E7C9A5] text-[#16191E] hover:bg-[#E7C9A5]/80 max-md:w-full">
          <Image src="/icons/book.svg" alt="book" width={20} height={20} />
          <p className="ml-2 font-bebas-neue text-lg">BORROW BOOK REQUEST</p>
        </Button>
      </div>

      {/* RIGHT SIDE - Book Cover */}
      <div className="relative flex flex-1 justify-center md:justify-end">
        <div className="relative">
          <BookCover
            variant="wide"
            className="z-10"
            coverColor={color}
            coverImage={cover}
          />
          <div className="absolute left-16 top-10 rotate-12 opacity-40 max-sm:hidden">
            <BookCover variant="wide" coverColor={color} coverImage={cover} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookOverview;
