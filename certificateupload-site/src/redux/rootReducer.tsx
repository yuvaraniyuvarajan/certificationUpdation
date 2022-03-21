import { combineReducers } from '@reduxjs/toolkit';
import { certificateInformationSlice } from './slice/certificatedetail';

const rootReducer = combineReducers({
    certificateInformation: certificateInformationSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
