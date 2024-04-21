import { useNavigate } from "react-router-dom";
import UserForm from "../../../../components/adminPanel/userManagement/UserForm";
import SDCard from "../../../../components/shared/Card";
import useAPi from "../../../../hooks/useApi";
import { BaseResponse } from "../../../../models/shared.models";
import { UserRequest } from "../../../../models/usermanagement.models";
import { toast } from "react-toastify";

const CreateUserPage: React.FC = () => {

  const { sendRequest } = useAPi<UserRequest, BaseResponse<null>>();
  const navigate = useNavigate();

  function onSubmit(data: UserRequest, afterSubmit: () => void) {
    sendRequest({
      url: '/Admin/CreateUser',
      method: 'post',
      data: {
        ...data,
        email: data.email || null
      }
    }, (response) => {
      toast.success(response.message);
      afterSubmit();
      navigate('/admin/users')
    }, (error) => {
      toast.error(error?.message);
      afterSubmit();
    })
  }

  return (
    <SDCard className="pt-0 px-0 pb-2 border border-blue-100">
      <div className="  py-5 px-10 bg-blue-900 text-white rounded-t-lg" >
        <h6 className="font-bold text-lg ">کاربر جدید</h6>
      </div>
      <div className="px-2 xs:px-4 lg:px-12 mt-12">
        <UserForm onSubmit={onSubmit} />
      </div>
    </SDCard>
  );
};

export default CreateUserPage;
