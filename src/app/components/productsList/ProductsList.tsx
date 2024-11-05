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

const ProductsList = () => {
  const dispatch = useAppDispatch();

  const { images: imagesInFilter, filteredImages } = useAppSelector(
    (state) => state.images
  );

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
        {imagesInFilter?.map((image) => (
          <ProductCard
            key={image.id}
            image={image}
            onRemove={() => handleDelete(image.id)}
          />
        ))}
      </div>
      {filteredImages !== "favorites" && (
        <button onClick={onClickMore}>Показать еще</button>
      )}
    </div>
  );
};

export default ProductsList;
