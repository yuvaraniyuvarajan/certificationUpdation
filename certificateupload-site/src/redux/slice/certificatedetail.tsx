import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import { certificateInformationState } from '../interface/interface';
const initialState: certificateInformationState = {
    certificatename: '',
    issuer: ''
};

export const certificateInformationSlice = createSlice({
    name: 'certificateInformation',
    initialState,
    reducers: {
        setInformation: (state, { payload }: PayloadAction<{ certificateInformation: certificateInformationState }>) => {
            return {
                ...state,
                ...payload.certificateInformation,
            };
        },
    },
});

export const useCertificateInformationDetail = () =>
    useSelector<RootState, certificateInformationState>(state => state.certificateInformation);
