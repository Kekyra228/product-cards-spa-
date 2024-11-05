"use client";
import { usePathname } from "next/navigation";
import styles from "./productDetails.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/store";
import { BreedType } from "@/types/types";
import Image from "next/image";

const ProductDetails = () => {
  const pathname = usePathname();
  const [decodedId, setDecodedId] = useState<string | null>(null);

  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  useEffect(() => {
    if (id) {
      setDecodedId(decodeURIComponent(id));
    }
  }, [id]);

  const card = useAppSelector((state) =>
    state.images.images.find((img) => img.id === id)
  );
  console.log("Найденная карточка:", card);

  if (!decodedId || !card) return <p>Загрузка...</p>;

  const breedInfo: BreedType = card?.breeds?.[0] || {
    name: "No data",
    temperament: "No",
    life_span: "No",
  };

  return (
    <div className={styles.productDetail}>
      <h1 className={styles.title}>Info about {breedInfo.name}</h1>
      <div className={styles.content}>
        <div className={styles.info}>
          <p>Temperament: {breedInfo.temperament}</p>
          <p>Life expectancyи: {breedInfo.life_span}</p>
        </div>

        <Image
          src={card.url}
          alt={breedInfo.name}
          width={280}
          height={280}
          className={styles.image}
        />
      </div>

      <Link href="/">
        <button className={styles.backButton}>Back</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
