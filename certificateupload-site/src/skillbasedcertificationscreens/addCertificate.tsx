
import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router';
import AddCertificateDialogue from '../components/dialogue/addCertificateDialogue';
import { certificateInformationState } from '../redux/interface/interface';
import { RouterLocationState } from '../redux/interface/RouterLocationState';
import style from './addCertificate.module.scss'


export const AddCertificate: React.FC = () => {
    const history = useNavigate();

    const dispatch = useDispatch();
    const onSave = useCallback((certi: certificateInformationState) => {
        return history('/SkillBasedcertification/List'
        );
    }, [dispatch,
        history,]
    );

    return (
        <div><title>AddCertificate</title>
            <div className={style.maincontainer}>
                <div className={style.heading}>Skills-Based Certifications</div>
                <div className={style.noteLabel}>(You can add upto 5 certificates)</div>
                <AddCertificateDialogue saveCertificate={onSave} />
            </div>
        </div>
    );
}
export default AddCertificate;

function usehistory() {
    throw new Error('Function not implemented.');
}

