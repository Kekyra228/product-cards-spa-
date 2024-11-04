"use client";
import { useSearchParams } from "next/navigation";
import styles from "./productDetails.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  console.log(id);

  useEffect(() => {
    if (id) {
      // Декодируем параметр id обратно в URL
      setImageUrl(decodeURIComponent(id));
    }
  }, [id]);

  if (!imageUrl) return <p>загрузка...</p>;
  return (
    <div className={styles.productDetail}>
      <h1>Детальная информация о продукте {imageUrl}</h1>
      <Link href="/">
        <button>Назад на главную</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
