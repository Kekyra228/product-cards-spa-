export async function fetchImages() {
  const response = await fetch("https://dog.ceo/api/breeds/image/random/8");
  if (!response.ok) {
    throw new Error("Ошибка при получении данных");
  }
  const data = await response.json();
  return data.message;
}
