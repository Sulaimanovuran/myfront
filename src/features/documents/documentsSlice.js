import { createSlice } from "@reduxjs/toolkit";
import {
  deleteDocument,
  fetchDocuments,
  getDocument,
  getDocuments,
  patchDocument,
} from "./documentsActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  documents: null,
  documentInfo: null,
  patchLoading: false,
  patchError: null,
  patchSuccess: false,
  getLoading: false,
  getError: null,
  getSuccess: false,
  documentsList: null,
  deleteLoading: false,
  deleteError: null,
  deleteSuccess: false,
  deleteResult: null,
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchDocuments.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [fetchDocuments.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.documents = payload;
      state.success = true;
    },
    [fetchDocuments.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    [patchDocument.pending]: (state) => {
      state.patchLoading = true;
      state.patchError = null;
      state.patchSuccess = false;
    },
    [patchDocument.fulfilled]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchSuccess = true;
      state.patchError = null;
    },
    [patchDocument.rejected]: (state, { payload }) => {
      state.patchLoading = false;
      state.patchError = payload;
      state.patchSuccess = false;
    },
    [getDocuments.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getDocuments.fulfilled]: (state, { payload }) => {
      state.gerLoading = false;
      state.documentsList = payload;
    },
    [getDocuments.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteDocument.pending]: (state) => {
      state.deleteLoading = true;
      state.deleteError = null;
      state.deleteSuccess = false;
    },
    [getDocument.pending]: (state) => {
      state.getLoading = true;
      state.getError = null;
    },
    [getDocument.fulfilled]: (state, { payload }) => {
      state.getLoading = false;
      state.documentInfo = payload;
    },
    [getDocument.rejected]: (state, { payload }) => {
      state.getLoading = false;
      state.getError = payload;
    },
    [deleteDocument.fulfilled]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteResult = payload;
      state.deleteSuccess = true;
    },
    [deleteDocument.rejected]: (state, { payload }) => {
      state.deleteLoading = false;
      state.deleteError = payload;
      state.deleteSuccess = false;
    },
  },
});

export default documentsSlice.reducer;
