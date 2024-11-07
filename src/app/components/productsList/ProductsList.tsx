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
          Show favorites
        </button>
        <button
          className={styles.filterBtn}
          onClick={() => handleFilter("all")}
        >
          Show all
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
      <div className={styles.buttonsWrapper}>
        {filteredImages !== "favorites" && (
          <button className={styles.button} onClick={onClickMore}>
            Show more
          </button>
        )}
        <div>
          <Link href="/create-product">
            <button className={styles.button}>Create product</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
