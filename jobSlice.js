/*import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: '',
    allAppliedJobs: [],
    searchedQuery: '',
    archivedJobs: [],
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setArchivedJobs: (state, action) => {
      state.archivedJobs = action.payload;
    },
    setFilteredJobs: (state, action) => {
      state.filteredJobs = action.payload;
    },
    
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setArchivedJobs
} = jobSlice.actions;

export default jobSlice.reducer;
*/



import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    allAdminJobs: [],
    singleJob: null,
    searchJobByText: '',
    allAppliedJobs: [],
    searchedQuery: '',
    archivedJobs: [],
    filteredJobs: [],  // Filtered jobs for UI updates
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = Array.isArray(action.payload) ? action.payload : [];
      // Also update filteredJobs when allJobs are set
      state.filteredJobs = state.allJobs;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setArchivedJobs: (state, action) => {
      state.archivedJobs = action.payload;
    },
    setFilteredJobs: (state, action) => {
      state.filteredJobs = action.payload;
    },
    // Handle job deletion
    deleteJob: (state, action) => {
      const jobId = action.payload;
      // Remove job from both allJobs and filteredJobs
      state.allJobs = state.allJobs.filter(job => job._id !== jobId);
      state.filteredJobs = state.filteredJobs.filter(job => job._id !== jobId);
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  setArchivedJobs,
  setFilteredJobs,
  deleteJob,  // Add deleteJob action
} = jobSlice.actions;

export default jobSlice.reducer;
