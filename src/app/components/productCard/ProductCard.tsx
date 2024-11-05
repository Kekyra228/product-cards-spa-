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

  function handleLike(event: React.MouseEvent) {
    event.stopPropagation();
    dispatch(toggleLike(image.id));
  }
  function handleDelete(event: React.MouseEvent) {
    event.stopPropagation(); // Останавливаем всплытие события
    onRemove();
  }

  return (
    <div className={styles.imageCard}>
      <Link href={`/cards/${encodeURIComponent(image.id)}`} prefetch={false}>
        <Image
          src={image.url}
          alt="Dog"
          width={280}
          height={280}
          className={styles.image}
        />
        <span className={styles.likeBtn} onClick={handleLike}>
          {" "}
          {isLiked ? "❤️" : "🤍"}
        </span>
        <span className={styles.deleteBtn} onClick={handleDelete}>
          🗑️
        </span>
      </Link>
    </div>
  );
};

export default ProductCard;
