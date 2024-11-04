"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { getImages } from "@/store/features/imagesSlice";
import ProductsList from "./components/productsList/ProductsList";
import styles from "./page.module.css";

export default function HomePage() {
  const dispatch = useAppDispatch();
  // const allImages: ImageType[] = useAppSelector((state) => state.images.images);
  const isLoading = useAppSelector((state) => state.images.loading);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? <p>Загрузка...</p> : <ProductsList />}
    </div>
  );
}
