import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import SDCard from '../../components/shared/Card'
import SDButton from '../../components/shared/Button'
import { BaseResponse } from '../../models/shared.models'
import useAPi from '../../hooks/useApi'
import { toast } from 'react-toastify'
import { getAuthDataFromLocal } from '../../utils/authUtils'
import { ZarinPalPayment } from '../../models/transactions.models'
import NumberWithSeperator from '../../components/shared/NumberWithSeperator'
import SDSpinner from '../../components/shared/Spinner'

const PaymentStatus: React.FC = () => {
  const location = useLocation()
  const [verifyApiResponse, setVerifyApiResponse] = useState<BaseResponse<ZarinPalPayment> | null>(null)
  const { sendRequest: sendVerifyRequest } = useAPi<null, BaseResponse<ZarinPalPayment>>()

  const searchParams = new URLSearchParams(location.search)
  const authority = searchParams.get('Authority')
  const authData = getAuthDataFromLocal()

  useEffect(() => {
    sendVerifyRequest(
      {
        url: `/ShoppingCarts/verify?authority=${authority}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${authData?.authToken}`,
        },
      },
      response => {
        setVerifyApiResponse(response)
      },
      error => {
        toast.error(error?.message)
      }
    )
  }, [sendVerifyRequest, authority, authData?.authToken])

  return (
    <>
      <SDCard className="flex min-h-screen flex-col items-center justify-center">
        <div className="flex justify-center border-b border-gray-400 pb-5 text-center">
          <p className="text-green mb-3 text-xl font-semibold">پرداخت شما با موفقیت انجام شد!</p>
          <div className="mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>
        {verifyApiResponse?.content.items.length ? (
          <div className="px-3">
            <div className="border-b border-gray-200 py-4">
              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold">شماره پرواز : </p>
                {verifyApiResponse.content.items.map((item, index) => (
                  <p key={index} className="mr-2">
                    {item.flightNumber || 0}
                  </p>
                ))}
              </div>
              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold">تاریخ پرواز :</p>
                <p>
                  {verifyApiResponse.content.items.map((item, index) => (
                    <p key={index} className="mr-2">
                      {item.flightDate || 0}
                    </p>
                  ))}
                </p>
              </div>

              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold">نوع بلیت :</p>
                <p>
                  {verifyApiResponse.content.items.map((item, index) => (
                    <p key={index} className="mr-2">
                      {item.type || 0}
                    </p>
                  ))}
                </p>
              </div>
              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold">شماره بلیت :</p>
                <p>
                  {verifyApiResponse.content.items.map((item, index) => (
                    <p key={index} className="mr-2">
                      {item.ticketsNumber || 0}
                    </p>
                  ))}
                </p>
              </div>
            </div>
            <div className="border-b border-gray-200 py-4">
              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold">مبلغ قابل پرداخت : </p>
                <p className="mr-2">
                  <NumberWithSeperator value={verifyApiResponse.content.totalAmount || 0} />
                  <span className="mr-1">ریال</span>
                </p>
              </div>
              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold">مالیات :</p>
                <p>
                  <NumberWithSeperator value={verifyApiResponse.content.taxAmount || 0} />
                  <span className="mr-1">ریال</span>
                </p>
              </div>

              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold"> تاریخ پرداخت:</p>
                <p>{verifyApiResponse.content.createdAt}</p>
              </div>

              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold">کد رهگیری :</p>
                <p>{verifyApiResponse.content.refId}</p>
              </div>
            </div>
            <div className="py-4">
              <div className="mb-4 flex justify-between px-1">
                <p className="font-semibold"> جمع کل صورتحساب پرداخت شده :</p>
                <p className="mr-2">
                  <NumberWithSeperator value={verifyApiResponse.content.payableAmount || 0} />
                  <span className="mr-1">ریال</span>
                </p>
              </div>
            </div>
            <div className="align-center flex justify-center">
              <Link to="/">
                <SDButton color="primary" className="mt-10 !h-10 font-extrabold">
                  بازگشت به سامانه
                </SDButton>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <SDSpinner size={20} />
          </div>
        )}
      </SDCard>
    </>
  )
}

export default PaymentStatus
