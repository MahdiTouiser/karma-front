import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../../../../components/adminPanel/userManagement/UserForm";
import SDCard from "../../../../components/shared/Card";
import useAPi from "../../../../hooks/useApi";
import { BaseResponse } from "../../../../models/shared.models";
import { UserRequest } from "../../../../models/usermanagement.models";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useEffect } from "react";
import {
  fetchUserDetail,
  usermanagementActions,
} from "../../../../store/usermanagement";
import SDSpinner from "../../../../components/shared/Spinner";
import UserStatusLabel from "../../../../components/shared/UserStatusLabel";

const EditUserPage: React.FC = () => {
  const { sendRequest } = useAPi<UserRequest, BaseResponse<null>>();
  const navigate = useNavigate();
  const params = useParams();
  const userManagementState = useAppSelector((state) => state.userManagement);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserDetail(params.userId as string));
    return () => {
      dispatch(usermanagementActions.resetUserDetail());
    };
  }, [params.userId, dispatch]);

  function onSubmit(data: UserRequest, afterSubmit: () => void) {
    sendRequest(
      {
        url: `/Admin/UpdateUser/${params.userId}`,
        method: "put",
        data: {
          ...data,
          email: data.email || null,
        },
      },
      (response) => {
        toast.success(response.message);
        afterSubmit();
        navigate(`/admin/users/${params.userId}`);
      },
      (error) => {
        toast.error(error?.message);
        afterSubmit();
      }
    );
  }

  return (
    <SDCard className="pt-0 px-0 pb-2 border border-blue-100">
      <div className="  py-5 px-10 bg-blue-900 text-white rounded-t-lg">
        <h6 className="font-bold text-lg ">ویرایش کاربر</h6>
      </div>
      <div className="px-2 xs:px-4 lg:px-12 mt-12">
        {userManagementState.loading && (
          <div className="flex justify-center">
            <SDSpinner color="blue" size={28}></SDSpinner>
          </div>
        )}
        {userManagementState.userDetail && !userManagementState.loading && (
          <>
            <div className="flex gap-4 mb-12 justify-center">
              <p className="text-slate-800 font-semibold">وضعیت حساب کاربری</p>

              <UserStatusLabel
                status={userManagementState.userDetail.userStatus}
                display={userManagementState.userDetail.userStatusDisplay}
              />
            </div>
            <UserForm
              onSubmit={onSubmit}
              userDetail={userManagementState.userDetail}
            />
          </>
        )}
      </div>
    </SDCard>
  );
};

export default EditUserPage;
