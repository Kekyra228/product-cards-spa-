import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchImages } from "@/api/fetchImages";
import { ImageType } from "@/types/types";

type ImageState = {
  dataImages: ImageType[];
  images: ImageType[];
  filteredImages: "all" | "favorites"; //фильтрация
  likedImages: Record<string, boolean>; //ключ-значение для хранения лайков
  loading: boolean;
  error: string | null;
};

const initialState: ImageState = {
  dataImages: [],
  images: [],
  filteredImages: "all",
  likedImages: {},
  loading: false,
  error: null as string | null,
};

export const getImages = createAsyncThunk("images/getImages", async () => {
  try {
    console.log("Отправка запроса к API");
    const allImages = await fetchImages();
    console.log("Данные получены:", allImages);
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
      // state.images = state.dataImages.filter((img) => state.likedImages[img]);
    },

    setFilter: (state, action: PayloadAction<"all" | "favorites">) => {
      state.filteredImages = action.payload;
      if (action.payload === "favorites") {
        state.images = state.dataImages.filter((img) => state.likedImages[img]);
      } else {
        state.images = state.dataImages;
      }
    },
    deleteImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((img) => img !== action.payload);
      // обновленный массив, содержащий все изображения, кроме того, URL которого совпадает с action.payload
      delete state.likedImages[action.payload];
      //так же удаляем из лайкнутых
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
        (state, action: PayloadAction<string[]>) => {
          if (!action.payload) {
            return;
          }
          // const newImages: ImageType[] = action.payload.map((el) => ({
          //   url: el,
          //   isLiked: false,
          // }));
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
export const { setImages, setFilter, toggleLike, deleteImage } =
  imagesSlice.actions;

export const ImagesReducer = imagesSlice.reducer;
