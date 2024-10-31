import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchImages } from "@/api/fetchImages";
import { ImageType } from "@/types/types";

type ImageState = {
  images: ImageType[];
  filteredImages: "all" | "favorites";
  loading: boolean;
  error: string | null;
};

const initialState: ImageState = {
  images: [],
  filteredImages: "all",
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
export const { setImages } = imagesSlice.actions;

export const ImagesReducer = imagesSlice.reducer;
