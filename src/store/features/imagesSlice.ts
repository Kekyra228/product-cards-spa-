import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchImages } from "@/api/fetchImages";
import { ImageType } from "@/types/types";

type ImageState = {
  images: ImageType[];
  filteredImages: "all" | "favorites"; //фильтрация
  likedImages: Record<string, boolean>; //ключ-значение для хранения лайков
  loading: boolean;
  error: string | null;
};

const initialState: ImageState = {
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
    return null;
  }
});

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<ImageType[]>) => {
      state.images = action.payload;
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const imageUrl = action.payload;
      if (state.likedImages[imageUrl]) {
        delete state.likedImages[imageUrl];
      } else {
        state.likedImages[imageUrl] = true;
      }
    },
    setFilter: (state, action: PayloadAction<"all" | "favorites">) => {
      state.filteredImages = action.payload;
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
        (state, action: PayloadAction<ImageType[]>) => {
          if (!action.payload) {
            return;
          }
          state.images = action.payload;
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
