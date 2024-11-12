"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/store";

import ProductsList from "./components/productsList/ProductsList";
import styles from "./page.module.css";
import { useEffect } from "react";
import { getImages } from "@/store/features/imagesSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.images.loading);
  const dataImages = useAppSelector((state) => state.images.dataImages);

  useEffect(() => {
    if (dataImages.length === 0) {
      dispatch(getImages());
    }
  }, [dispatch, dataImages.length]);

  return (
    <div className={styles.wrapper}>
      {isLoading ? <p>Loading...</p> : <ProductsList />}
    </div>
  );
}
