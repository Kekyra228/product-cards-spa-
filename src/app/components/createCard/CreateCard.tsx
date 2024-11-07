"use client";
import { useAppDispatch } from "@/hooks/store";
import { addCard } from "@/store/features/imagesSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./createCard.module.css";

const CreateCard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    temperament: "",
    life_span: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addCard({
        id: Date.now().toString(),
        url: "https://cdn2.thedogapi.com/images/QBvGwfKLW.jpg",
        breeds: [{ ...formData }],
      })
    );
    setIsAdded(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Temperament:
          <input
            type="text"
            name="temperament"
            value={formData.temperament}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Life expectancy:
          <input
            type="text"
            name="life_span"
            value={formData.life_span}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          Add card
        </button>

        <Link href="/">
          <button className={styles.backButton}>Back</button>
        </Link>
        {isAdded && (
          <div className={styles.successMessage}>
            The card has been added successfully! You will now be redirected.
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCard;