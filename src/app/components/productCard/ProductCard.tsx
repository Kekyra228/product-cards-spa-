import { ImageType } from "@/types/types";
import Image from "next/image";
import React from "react";
import styles from "./productCard.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { toggleLike } from "@/store/features/imagesSlice";
import Link from "next/link";

type Props = {
  image: ImageType;
  onRemove: () => void;
};

const ProductCard = ({ image, onRemove }: Props) => {
  const dispatch = useAppDispatch();

  const isLiked = useAppSelector((state) => state.images.likedImages[image.id]);

  function handleLike() {
    dispatch(toggleLike(image.id));
  }
  console.log(image);
  return (
    <div className={styles.imageCard}>
      {/* <Link href={`/cards/${encodeURIComponent(image.url)}`} prefetch={false}> */}
      <Image
        src={image.url}
        alt={image.name}
        width={280}
        height={280}
        className={styles.image}
      />
      <span className={styles.likeBtn} onClick={handleLike}>
        {" "}
        {isLiked ? "❤️" : "🤍"}
      </span>
      <span className={styles.deleteBtn} onClick={onRemove}>
        🗑️
      </span>
      {/* </Link> */}
    </div>
  );
};

export default ProductCard;
