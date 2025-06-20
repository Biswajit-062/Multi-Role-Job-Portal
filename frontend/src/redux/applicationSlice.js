
import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: null,
        appliedJobs: [], // Changed initial state to an empty array


    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload; // Update state with fetched applicants

        },
        setAllAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload; // Update state with fetched applied jobs

        }
    }
});

export const { setAllApplicants, setAllAppliedJobs } = applicationSlice.actions;
export default applicationSlice.reducer;
export const applicationReducer = applicationSlice.reducer;
