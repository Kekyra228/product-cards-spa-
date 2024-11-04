export async function fetchImages() {
  const response = await fetch(
    "https://api.thedogapi.com/v1/images/search?limit=10",
    {
      headers: {
        "x-api-key":
          "live_5RMWom5TCxMCcstcau98HJZve3C5u3UXkb0TZXkFQQzus6dTM7qyXORU3iOktSFr",
      },
    }
  );
  const data = await response.json();
  return data;
}
