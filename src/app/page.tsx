"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getImages } from "@/store/features/imagesSlice";
import ProductsList from "./components/productsList/ProductsList";
import { ImageType } from "@/types/types";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const allImages: ImageType[] = useAppSelector((state) => state.images.images);
  const isLoading = useAppSelector((state) => state.images.loading);

  useEffect(() => {
    console.log("a");
    if (allImages.length === 0) {
      dispatch(getImages());
    }
  }, [dispatch, allImages.length]);

  return (
    <div>
      {isLoading && <p>Загрузка...</p>}
      <ProductsList images={allImages} />
    </div>
  );
}
