import { ImageType } from "@/types/types";
import Image from "next/image";

type Props = {
  images: ImageType[];
};

const ProductsList = ({ images }: Props) => {
  return (
    <div>
      {images.length === 0 ? "Продуктов не найдено" : ""}
      {images?.map((image, index) => (
        <div key={index}>
          <Image src={image} alt="Dog" width={200} height={200} />
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
