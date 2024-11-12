export const saveLikesToLocalStorage = (
  likedImages: Record<string, boolean>
) => {
  localStorage.setItem("likedImages", JSON.stringify(likedImages));
};

export const loadLikesFromLocalStorage = (): Record<string, boolean> => {
  const savedLikes = localStorage.getItem("likedImages");
  return savedLikes ? JSON.parse(savedLikes) : {};
};
export const saveFilterToLocalStorage = (filter: string) => {
  localStorage.setItem("filteredImages", filter);
};

export const loadFilterFromLocalStorage = (): "all" | "favorites" => {
  const savedFilter = localStorage.getItem("filteredImages");
  return savedFilter === "favorites" ? "favorites" : "all";
};
