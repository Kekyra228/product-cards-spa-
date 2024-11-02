"use client";
import { ImageType } from "@/types/types";
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { deleteImage, setFilter } from "@/store/features/imagesSlice";
import { useEffect, useState } from "react";

type Props = {
  images: ImageType[];
};

const ProductsList = ({ images }: Props) => {
  const dispatch = useAppDispatch();
  const likedImages = useAppSelector((state) => state.images.likedImages);
  const filterImages = useAppSelector((state) => state.images.filteredImages);

  const [imagesInFilter, setImagesInFilter] = useState<ImageType[]>([]);
  useEffect(() => {
    if (filterImages === "favorites") {
      setImagesInFilter(
        images?.filter((image: ImageType) => likedImages[image])
      );
      console.log("выбраны избранные");
    } else {
      setImagesInFilter(images);
      console.log("выбраны все");
    }
  }, [filterImages, images, likedImages]);

  function handleFilter(chosedFilter: "all" | "favorites") {
    dispatch(setFilter(chosedFilter));
  }

  function handleDelete(imageUrl: string) {
    dispatch(deleteImage(imageUrl));
  }
  return (
    <div>
      <div className={styles.filterBtnsContain}>
        <button
          className={styles.filterBtn}
          onClick={() => handleFilter("favorites")}
        >
          Показать избранное
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => handleFilter("all")}
        >
          Показать все
        </button>
      </div>
      <div className={styles.imagesContain}>
        {imagesInFilter.length === 0 ? "Продуктов не найдено" : ""}
        {imagesInFilter?.map((imageUrl, index) => (
          <ProductCard
            key={index}
            image={imageUrl}
            onRemove={() => handleDelete(imageUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
