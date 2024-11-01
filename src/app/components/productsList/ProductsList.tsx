import { ImageType } from "@/types/types";
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";

type Props = {
  images: ImageType[];
};

const ProductsList = ({ images }: Props) => {
  return (
    <div className={styles.imagesContain}>
      {images.length === 0 ? "Продуктов не найдено" : ""}
      {images?.map((imageUrl, index) => (
        <ProductCard key={index} image={imageUrl} />
      ))}
    </div>
  );
};

export default ProductsList;
