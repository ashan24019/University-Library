import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

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
    <section className="book-overview">
        <div className="flex flex-1 flex-col gap-5">
        <h1>{title}</h1>

        <div className="book-info">
          <p>
            By <span className="font-semibold text-[#D9B28B]">{author}</span>
          </p>

          <p>
            Category {""} 
            <span className="font-semibold text-[#D9B28B]">{genre}</span>
          </p>
        </div>

        <div className="flex flex-row gap-1">
            <Image src="/icons/star.svg" alt="star" width={22} height={22}/>
            <p className="text-2xl">{rating}</p>
          </div>

        <div className="book-copies">
            <p>
                Total Books: <span>{totalCopies}</span>
            </p>

            <p>
                Available Books: <span>{availableCopies}</span>
            </p>
        </div>
        <p className="book-description">{description}</p>

        <Button className="mt-4 min-h-14 w-fit bg-[#E7C9A5] text-[#16191E] hover:bg-[#E7C9A5]/80 max-md:w-full">
            <Image src="/icons/book.svg" alt="book" width={20} height={20}/>
            <p className="font-bebas-neue text-[#16191E] text-">Borrow Book</p>
        </Button>
      </div>


    </section>
  );
};

export default BookOverview;
