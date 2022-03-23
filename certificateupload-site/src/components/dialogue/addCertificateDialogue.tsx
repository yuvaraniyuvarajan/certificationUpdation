
import InputField from '../InputField';
import { certificateInformationSlice, useCertificateInformationDetail } from '../../redux/slice/certificatedetail';
import { certificateInformationState } from '../../redux/interface/interface';
import style from './addCertificateDialogue.module.scss'
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import image from '../../upload.jpg'
import React from 'react';
import { useNavigate } from 'react-router-dom';
export enum CertiEnum {
    certificatename = 'certificatename',
    issuer = 'issuer',
    file = 'file'
}

export const AddCertificateDialogue: React.FC = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const certi: certificateInformationState = useCertificateInformationDetail();
    const [errors, setErrors] = useState<{ [key: string]: string }>({} as { [key: string]: string });
    const [isDialogue, setDialogue] = useState(true)
    const [selectedFile, setSelectedFile] = useState()
    const [fileerror, setfileerror] = useState<string>()
    const [preview, setPreview] = useState<string>();
    const setCerti = useCallback(
        (newState: certificateInformationState & { errors?: { [key: string]: string } }) => {
            if (newState.errors) {
                setErrors(newState.errors);
            }
            dispatch(certificateInformationSlice.actions.setInformation({ certificateInformation: newState }));
            console.log(newState)
        },

        [dispatch],
    );
    useEffect(() => {
        if (!selectedFile) {
            setPreview('')
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
    }, [selectedFile])
    const certiValidations: {
        [key: string]: (value: certificateInformationState) => string;
    } = {};
    certiValidations[CertiEnum.certificatename] = (value) => {
        return !value.certificatename ? 'Please enter certification name' : '';
    };
    certiValidations[CertiEnum.issuer] = (value) => {
        return !value.issuer ? 'Please enter issuer name' : '';
    };
    const isCertSubmitOk = (state: certificateInformationState) => {
        return Object.keys(certiValidations).filter(key => certiValidations[key](state)).length === 0;
    };

    const handleChange = useCallback(
        (field: CertiEnum) => (value: string | undefined) => {
            const newState = { ...certi, [field]: value };
            setCerti({
                ...newState,
            });
        },
        [certi],
    );
    const checkError = useCallback(
        (field: CertiEnum) => () => {
            setCerti({
                ...certi,
                errors: {
                    ...errors,
                    [field]: certiValidations[field](certi),
                },
            });
        },
        [certi, errors]
    );
    const onSaveCertificate = useCallback(() => {
        const isValid = isCertSubmitOk(certi);
        if (!isValid) {
            // has error
            const errorMap: { [key: string]: string } = {};
            Object.keys(certiValidations).forEach(key => {
                errorMap[key] = certiValidations[key](certi);
            });
            setCerti({
                ...certi,
                errors: {
                    ...errors,
                    ...errorMap,
                },
            });
            return;
        }
        if (preview === '') {
            setfileerror('please upload file')
            return;
        }
        return history('/SkillBasedcertification/List', { state: { file: preview } })

    }, [preview, certi]);

    const onClose = () => {
        setDialogue(false)
    }
    const onOpen = () => {
        setDialogue(true)
    }
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const handleClick = (event: any) => {
        hiddenFileInput.current!.click();
    }

    const onSelectFile = (e: any) => {
        if (!e.target.files || e.target.files.lenght === 0) {
            setSelectedFile(undefined)
            return
        }

        setSelectedFile(e.target.files[0])

    }
    return (
        <div>{isDialogue ? (
            <div className={style.box} >
                <div className={style.closeDiv}>
                    <button className={style.closebuttonDiv} onClick={onClose}>X</button>
                </div>
                <div className={style.certiRowDiv}>
                    <InputField label={'Certification name'}
                        identity={'certificatename'}
                        value={certi.certificatename}
                        placeholder={'Enter certification name'}
                        onChange={handleChange(CertiEnum.certificatename)}
                        error={errors[CertiEnum.certificatename]}
                        onBlur={checkError(CertiEnum.certificatename)} />

                    <InputField label={'Issuer'}
                        identity={'Issuer'}
                        maxLength={50}
                        placeholder={'Enter Issuer'}
                        value={certi.issuer}
                        onChange={handleChange(CertiEnum.issuer)}
                        error={errors[CertiEnum.issuer]}
                        onBlur={checkError(CertiEnum.issuer)} />

                </div>
                <div className={style.uploadDiv}>
                    <div className={style.uploadText}>Upload a file showing your certification  </div>
                    <button className={style.buttonDiv} onClick={handleClick}>
                        <label >UPLOAD</label>
                        <img className={style.imgDiv} src={image} alt="" />
                    </button>
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={onSelectFile}
                        accept="application/pdf,image/jpeg"
                        style={{ display: 'none' }} />
                </div>
                <div className={style.fileType}>(File format should be only pdf and jpg)</div>
                {fileerror && (<div style={{ color: 'red' }}>{fileerror}</div>)}
                <div className={style.saveButtonDiv}>
                    <button className={style.saveButton} onClick={onSaveCertificate}>SAVE CERTIFICATION </button>
                </div>
            </div>) : (
            <div className={style.addButtonDiv}>
                <button className={style.saveButton} onClick={onOpen}>ADD CERTIFICATION </button>
            </div>
        )}
        </div>
    );
}
export default AddCertificateDialogue;