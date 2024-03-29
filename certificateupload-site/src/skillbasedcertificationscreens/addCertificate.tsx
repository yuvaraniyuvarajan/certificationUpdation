
import AddCertificateDialogue from '../components/dialogue/addCertificateDialogue';
import style from './addCertificate.module.scss'


export const AddCertificate: React.FC = () => {


    return (
        <div><title>AddCertificate</title>
            <div className={style.maincontainer}>
                <div className={style.heading}>Skills-Based Certifications</div>
                <div className={style.noteLabel}>(You can add upto 5 certificates)</div>
                <AddCertificateDialogue />
            </div>
        </div>
    );
}
export default AddCertificate;

function usehistory() {
    throw new Error('Function not implemented.');
}

