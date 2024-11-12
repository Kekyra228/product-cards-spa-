"use client";
import { fetchImages } from "@/api/fetchImages";
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  deleteImage,
  setFilter,
  setImages,
} from "@/store/features/imagesSlice";
import Link from "next/link";
import { useEffect } from "react";

const ProductsList = () => {
  const dispatch = useAppDispatch();

  const {
    likedImages,
    dataImages,
    images: imagesInFilter,
    filteredImages,
  } = useAppSelector((state) => state.images);

  useEffect(() => {
    if (filteredImages === "favorites") {
      dispatch(setFilter("favorites"));
    } else {
      dispatch(setFilter("all"));
    }
  }, [dispatch, filteredImages, likedImages, dataImages]);

  function onClickMore() {
    fetchImages().then((res) => {
      dispatch(setImages([...imagesInFilter, ...res]));
    });
  }

  function handleFilter(chosedFilter: "all" | "favorites") {
    dispatch(setFilter(chosedFilter));
  }

  function handleDelete(imageId: string) {
    dispatch(deleteImage(imageId));
  }
  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.filterBtnsContain}>
          <button
            className={styles.filterBtn}
            onClick={() => handleFilter("favorites")}
          >
            Show favorites
          </button>
          <button
            className={styles.filterBtn}
            onClick={() => handleFilter("all")}
          >
            Show all
          </button>
        </div>
        <Link href="/create-product">
          <button className={styles.createButton}>Create product</button>
        </Link>
      </div>

      <div className={styles.imagesContain}>
        {imagesInFilter.length === 0 ? "Not found" : ""}
        {imagesInFilter?.map((image) => (
          <ProductCard
            key={image.id}
            image={image}
            onRemove={() => handleDelete(image.id)}
          />
        ))}
      </div>
      <div className={styles.buttonsWrapper}>
        {filteredImages !== "favorites" && (
          <button className={styles.button} onClick={onClickMore}>
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
