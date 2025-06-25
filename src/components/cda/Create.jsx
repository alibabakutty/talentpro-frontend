import { useParams } from 'react-router-dom'
import LedgerMaster from '../../redux/forms/LedgerMaster';

const Create = () => {
    const { type } = useParams();

    const renderComp = () => {
        switch (type) {
            case 'ledger':
                return <LedgerMaster />
            default:
                return <div>404 Not Found</div>
        }
    }
  return (
    <>
        <div>{renderComp()}</div>
    </>
  )
}

export default Create;