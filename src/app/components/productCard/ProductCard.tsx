import { ImageType } from "@/types/types";
import Image from "next/image";
import React from "react";
import styles from "./productCard.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { toggleLike } from "@/store/features/imagesSlice";

type Props = {
  image: ImageType;
};

const ProductCard = ({ image }: Props) => {
  const dispatch = useAppDispatch();

  const isLiked = useAppSelector((state) => state.images.likedImage[image]);

  function handleLike() {
    dispatch(toggleLike(image));
  }

  return (
    <div className={styles.imageCard}>
      <Image
        src={image}
        alt="Dog"
        width={280}
        height={280}
        className={styles.image}
      />
      <span className={styles.likeBtn} onClick={handleLike}>
        {" "}
        {isLiked ? "❤️" : "🤍"}
      </span>
    </div>
  );
};

export default ProductCard;
