import { createSlice } from '@reduxjs/toolkit';

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    selectedBrands: [],
    selectedModels: [],
  },
  reducers: {
    AddFilterBrands: (state, action) => {
      state.selectedBrands.push(action.payload);
      return state
    },
    RemoveFilterBrands: (state, action) => {
      state.selectedBrands = state.selectedBrands.filter((brand) => brand !== action.payload);
      return state
    },
    AddFilterModels: (state, action) => {
      state.selectedModels.push(action.payload);
      return state
    },
    RemoveFilterModels: (state, action) => {
      state.selectedModels = state.selectedModels.filter((model) => model !== action.payload);
      return state
    }
  },
});

// Action creators are generated for each case reducer function
export const { AddFilterBrands, RemoveFilterBrands,AddFilterModels, RemoveFilterModels } = filterSlice.actions;

export default filterSlice.reducer;