import { useNavigate } from 'react-router-dom';
import { useCertificateInformationDetail } from '../redux/slice/certificatedetail';
import style from './viewCertificate.module.scss'
export const ViewCertificate: React.FC = () => {
    const certiData = useCertificateInformationDetail();
    const history = useNavigate();
    const onOpen = () => {
        history('/');
    }
    return (

        <div><title>ViewCertificate</title>
            <div className={style.maincontainer}>
                <div className={style.heading}>Skills-Based Certifications</div>
                <div className={style.noteLabel}>(You can add upto 5 certificates)</div>
                {certiData.certificatename !== '' && certiData.issuer !== '' ? (
                    <div className={style.detailBox}>
                        <div className={style.nameDiv}>
                            <div className={style.number}>1</div>
                            <label className={style.name}>{certiData?.certificatename}</label>
                            <label className={style.issuer}>{certiData?.issuer}</label>
                        </div>
                        <a href='' className={style.link}>View certification</a>
                    </div>) : (
                    <div className={style.addButtonDiv}>
                        <button className={style.saveButton} onClick={onOpen}>ADD CERTIFICATION </button>
                    </div>
                )}
            </div>
        </div >
    );
}
export default ViewCertificate;