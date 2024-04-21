import SDCard from '../shared/Card'
import { BsCheckCircleFill } from 'react-icons/bs'
interface PaymentMethodProp {
  title: string
  subtitle?: string
  icon: React.ReactNode
  isActive?: boolean
  onSelect: (id: string) => void
  id: string
}
const PaymentMethod: React.FC<PaymentMethodProp> = ({ title, subtitle, icon, isActive = false, onSelect, id }) => {
  function onClick() {
    onSelect(id)
  }
  return (
    <button className="block w-full" onClick={onClick}>
      <SDCard className={`${isActive ? 'border-green-600' : 'border-gray-300'} my-2 flex items-center  border`}>
        <div className="ml-8">{icon}</div>
        <div>
          <p className="mb-2 text-lg font-semibold">{title}</p>
          <div className="align-center flex justify-start">
            <p className="mt-3 text-right text-slate-600">{subtitle}</p>
          </div>
        </div>
        <div></div>
        <div className="mr-auto">{isActive ? <BsCheckCircleFill size="2.5rem" color="green" /> : <div className="h-10 w-10 rounded-full  border-2 border-gray-300 "></div>}</div>
      </SDCard>
    </button>
  )
}
export default PaymentMethod
