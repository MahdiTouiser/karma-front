import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckInfoMessageModal from '../../../../../components/adminPanel/userManagement/CheckInfoMessageModal'
import SDButton from '../../../../../components/shared/Button'
import SDCard from '../../../../../components/shared/Card'
import SDSpinner from '../../../../../components/shared/Spinner'
import UserStatusLabel from '../../../../../components/shared/UserStatusLabel'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import useAPi from '../../../../../hooks/useApi'
import useConfirm from '../../../../../hooks/useConfirm'
import { BaseResponse, UserStatuses } from '../../../../../models/shared.models'
import { CheckUserInfoRequest } from '../../../../../models/usermanagement.models'
import { fetchUserDetail, usermanagementActions } from '../../../../../store/usermanagement'

const UserDetailPage: React.FC = () => {
  const params = useParams()
  const navigate = useNavigate()

  // const { sendRequest, isPending, data } = useAPi<
  //   null,
  //   BaseResponse<UserDatail>
  // >();

  const userManagementState = useAppSelector(state => state.userManagement)
  const [showMessageModal, setShowMessageModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  // const {sendRequest: sendTypesRequest}
  const { sendRequest: sendCheckRequest, isPending: checkPending } = useAPi<CheckUserInfoRequest, BaseResponse<null>>()
  const { sendRequest: deleteRequest } = useAPi<CheckUserInfoRequest, BaseResponse<null>>()
  const [ConfirmModal, confirmation] = useConfirm(' این کاربر حذف خواهد شد. آیا مطمئن هستید؟ ', 'حذف کردن کاربر')

  function approveInfo(id: string) {
    // if(userManagementState.userDetail.ty)
    checkInfo(id, true)
  }

  function rejectInfo() {
    setShowMessageModal(true)
  }

  async function OnDeleteUser(userId: string) {
    const confirm = await confirmation()
    if (confirm) {
      deleteRequest(
        {
          method: 'delete',
          url: `/Admin/RemoveUser/${userId}`,
        },
        response => {
          toast.success(response.message)
          navigate('/admin/users')
        },
        error => {
          toast.error(error?.message)
        }
      )
    }
  }

  function onMessageClose(submitted: boolean, userId: string) {
    if (submitted) {
      dispatch(fetchUserDetail(userId))
    }
    setShowMessageModal(false)
  }

  function checkInfo(id: string, confirm: boolean) {
    sendCheckRequest(
      {
        url: '/Admin/CheckUserPersonalInformation',
        data: {
          id: id,
          isConfirmed: confirm,
          message: '',
        },
        method: 'put',
      },
      response => {
        toast.success(response.message)
        dispatch(fetchUserDetail(id))
      },
      error => {
        toast.error(error?.message)
      }
    )
  }

  // const getUserDetail = useCallback(
  //   (id: string) => {
  //     sendRequest({
  //       url: `/Admin/UserDetail/${id}`,
  //     });
  //   },
  //   [sendRequest]
  // );

  useEffect(() => {
    // getUserDetail(params.userId as string);
    dispatch(fetchUserDetail(params.userId as string))
    return () => {
      dispatch(usermanagementActions.resetUserDetail())
    }
  }, [params.userId, dispatch])

  return (
    <>
      <ConfirmModal />

      <CheckInfoMessageModal showModal={showMessageModal} userId={params.userId as string} onCloseModal={submitted => onMessageClose(submitted, params.userId as string)} />
      <SDCard className="px-0">
        {userManagementState.loading && (
          <div className="flex justify-center py-24">
            <SDSpinner size={28} color="blue" />
          </div>
        )}
        {userManagementState.userDetail && !userManagementState.loading && (
          <div className="mb-10 px-2 xs:px-8">
            <div className="my-5 flex justify-center gap-4">
              <p className="font-semibold text-slate-800">وضعیت حساب کاربری</p>
              {userManagementState.userDetail && <UserStatusLabel status={userManagementState.userDetail.userStatus} display={userManagementState.userDetail.userStatusDisplay} />}
            </div>
            <div className="flex gap-3">
              <Link to="edit">
                <SDButton color="primary2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  ویرایش
                </SDButton>
              </Link>
              <SDButton color="failure" onClick={() => OnDeleteUser(params.userId as string)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
                حذف
              </SDButton>
              {userManagementState.userDetail.userStatus === UserStatuses.PENDING && (
                <>
                  <SDButton
                    color="primary2"
                    onClick={() =>
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      approveInfo(userManagementState.userDetail!.id)
                    }
                    disabled={checkPending || !userManagementState.userDetail.documentsConfirmed}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    تأیید اطلاعات
                  </SDButton>
                  <SDButton color="failure" onClick={rejectInfo} disabled={checkPending}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="ml-2 h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                    عدم تأیید اطلاعات
                  </SDButton>
                </>
              )}
            </div>

            <main className=" mt-10 text-slate-800">
              <div className="flex flex-wrap justify-between">
                <div className="flex w-full md:w-1/2 lg:w-5/12   lg:pl-12">
                  <div className="ml-6 flex w-1/2  flex-col border-l font-semibold md:w-auto md:min-w-max md:pl-6">
                    <p className="pb-6">نام</p>
                    <p className="pb-6">نام خانوادگی</p>
                    <p className="pb-6">نوع حساب کاربری</p>
                    <p className="pb-6">کد ملی</p>
                    <p className="pb-6">تاریخ تولد</p>
                    <p className="pb-6">محل اقامت</p>
                    <p className="pb-6">آدرس</p>
                  </div>
                  <div className=" flex w-1/2 flex-col text-center md:text-right">
                    <p className="pb-6">{userManagementState.userDetail.firstName}</p>
                    <p className="pb-6"> {userManagementState.userDetail.lastName}</p>
                    <p className="pb-6">{userManagementState.userDetail.userTypeDisplay}</p>
                    <p className="pb-6">{userManagementState.userDetail.nationalCode}</p>
                    <p className="pb-6">{userManagementState.userDetail.birthDate}</p>
                    <p className="pb-6">{userManagementState.userDetail.cityAndState}</p>
                    <p className="pb-6">{userManagementState.userDetail.address}</p>
                  </div>
                </div>
                <div className="flex w-full md:w-1/2 md:pl-12  lg:w-5/12">
                  <div className="ml-6 flex w-1/2  flex-col border-l font-semibold md:w-auto md:min-w-max  md:pl-6">
                    <p className="pb-6">کد کاربر</p>
                    <p className="pb-6">نام کاربری</p>
                    <p className="pb-6">رمز عبور</p>
                    <p className="pb-6">ایمیل</p>
                    <p className="pb-6">شماره موبایل</p>
                    <p className="pb-6">قد</p>
                    <p className="pb-6">وزن</p>
                  </div>
                  <div className=" flex w-1/2 flex-col text-center md:text-right">
                    <p className="pb-6">{userManagementState.userDetail.userCode}</p>
                    <p className="pb-6"> {userManagementState.userDetail.username}</p>
                    <p className="pb-6">•••••••</p>
                    <p className="pb-6">{userManagementState.userDetail.email}</p>
                    <p className="pb-6">{userManagementState.userDetail.phone}</p>
                    <p className="pb-6">{userManagementState.userDetail.height}</p>
                    <p className="pb-6">{userManagementState.userDetail.weight}</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <h6 className="text-lg font-bold">اطلاعات تماس اضطراری</h6>
                <div className="flex flex-wrap justify-between pt-5">
                  <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
                    <p className="ml-12 font-semibold">نام</p>
                    <p>{userManagementState.userDetail.emergencyContact}</p>
                  </div>
                  <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
                    <p className="ml-12 font-semibold">موبایل</p>
                    <p>{userManagementState.userDetail.emergencyPhone}</p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        )}
        <nav className="flex border-b border-blue-400">
          <ul className="flex w-full">
            <li className="flex-grow text-center">
              <NavLink
                end={true}
                className={nav =>
                  `${nav.isActive && 'border-b-2 !border-blue-500 !text-blue-500'
                  } block pb-4 text-gray-500 transition-all duration-75 ease-linear  hover:border-b-2 hover:border-gray-300 hover:text-gray-600`
                }
                to={''}
              >
                بلیت‌ها
              </NavLink>
            </li>
            <li className="flex-grow text-center">
              <NavLink
                className={nav =>
                  `${nav.isActive && 'border-b-2 !border-blue-500 !text-blue-500'
                  } block pb-4 text-gray-500 transition-all duration-75 ease-linear  hover:border-b-2 hover:border-blue-300 hover:text-blue-400`
                }
                to="transactions"
              >
                تراکنش‌ها
              </NavLink>
            </li>
            <li className="flex-grow text-center">
              <NavLink
                className={nav =>
                  `${nav.isActive && 'border-b-2 !border-blue-500 !text-blue-500'
                  } block pb-4 text-gray-500 transition-all duration-75 ease-linear  hover:border-b-2 hover:border-blue-300 hover:text-blue-400`
                }
                to="documents"
              >
                مدارک
              </NavLink>
            </li>
            <li className="flex-grow text-center">
              <NavLink
                className={nav =>
                  `${nav.isActive && 'border-b-2 !border-blue-500 !text-blue-500'
                  } block pb-4 text-gray-500 transition-all duration-75 ease-linear  hover:border-b-2 hover:border-blue-300 hover:text-blue-400`
                }
                to="jumps"
              >
                سوابق پرش
              </NavLink>
            </li>
            <li className="flex-grow text-center">
              <NavLink
                className={nav =>
                  `${nav.isActive && 'border-b-2 !border-blue-500 !text-blue-500'
                  } block pb-4 text-gray-500 transition-all duration-75 ease-linear  hover:border-b-2 hover:border-blue-300 hover:text-blue-400`
                }
                to="wallet"
              >
                کیف پول
              </NavLink>
            </li>
          </ul>
        </nav>
        <Outlet></Outlet>
      </SDCard>
    </>
  )
}
export default UserDetailPage
