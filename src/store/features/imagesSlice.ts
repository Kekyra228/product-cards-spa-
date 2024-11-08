import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchImages } from "@/api/fetchImages";
import { ImageType } from "@/types/types";

const saveLikesToLocalStorage = (likedImages: Record<string, boolean>) => {
  localStorage.setItem("likedImages", JSON.stringify(likedImages));
};

const loadLikesFromLocalStorage = (): Record<string, boolean> => {
  const savedLikes = localStorage.getItem("likedImages");
  return savedLikes ? JSON.parse(savedLikes) : {};
};

type ImageState = {
  dataImages: ImageType[];
  images: ImageType[];
  filteredImages: "all" | "favorites";
  likedImages: Record<string, boolean>;
  searchString: string;
  loading: boolean;
  error: string | null;
};

const initialState: ImageState = {
  dataImages: [],
  images: [],
  filteredImages: "all",
  likedImages: loadLikesFromLocalStorage(),
  searchString: "",
  loading: false,
  error: null as string | null,
};

export const getImages = createAsyncThunk("images/getImages", async () => {
  try {
    const allImages = await fetchImages();
    return allImages;
  } catch (error) {
    if (error instanceof Error) {
      return null;
    }
  }
});

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<ImageType[]>) => {
      state.images = action.payload;
      state.dataImages = action.payload;
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const imageUrl = action.payload;
      if (state.likedImages[imageUrl]) {
        delete state.likedImages[imageUrl];
      } else {
        state.likedImages[imageUrl] = true;
      }
      saveLikesToLocalStorage(state.likedImages);
      if (state.filteredImages === "favorites") {
        state.images = state.dataImages.filter(
          (img) => state.likedImages[img.id]
        );
      } else {
        state.images = state.dataImages;
      }
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      const imageId = action.payload;
      state.images = state.images.filter((img) => img.id !== imageId);
      delete state.likedImages[imageId];
    },
    setFilter: (state, action: PayloadAction<"all" | "favorites">) => {
      state.filteredImages = action.payload;
      if (action.payload === "favorites") {
        state.images = state.dataImages.filter(
          (img) => state.likedImages[img.id]
        );
      } else {
        state.images = state.dataImages;
      }
    },
    addCard: (state, action: PayloadAction<ImageType>) => {
      state.images = [...state.images, action.payload];
      state.dataImages = [...state.dataImages, action.payload];
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      state.searchString = action.payload;
      if (state.searchString === "") {
        state.images = [...state.dataImages];
      } else {
        state.images = state.dataImages.filter((img) =>
          img.breeds.some((breed) =>
            breed.name
              .toLocaleLowerCase()
              .includes(state.searchString.toLocaleLowerCase())
          )
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getImages.fulfilled,
        (state, action: PayloadAction<ImageType[]>) => {
          if (!action.payload) {
            return;
          }

          state.images = action.payload;
          state.dataImages = action.payload;
          state.loading = false;
        }
      )
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка при загрузке данных";
      });
  },
});
export const {
  setImages,
  setFilter,
  toggleLike,
  deleteImage,
  addCard,
  setSearchString,
} = imagesSlice.actions;

export const ImagesReducer = imagesSlice.reducer;
