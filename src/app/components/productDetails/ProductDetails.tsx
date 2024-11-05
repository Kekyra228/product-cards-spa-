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
    name: "Без названия",
    temperament: "Нет данных",
    life_span: "Нет данных",
  };

  return (
    <div className={styles.productDetail}>
      <h1>Детальная информация о продукте {breedInfo.name}</h1>
      <p>Темперамент: {breedInfo.temperament}</p>
      <p>Продолжительность жизни: {breedInfo.life_span}</p>
      <Image src={card.url} alt="Dog" width={280} height={280} />
      <Link href="/">
        <button>Назад на главную</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
