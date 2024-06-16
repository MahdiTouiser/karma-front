import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useApi from "../../../../hooks/useApi";
import { SamplesFormData } from "../../../../models/cvbuilder.models";
import { BaseResponse } from "../../../../models/shared.models";
import KButton from "../../../shared/Button";
import KLabel from "../../../shared/Label";
import KModal from "../../../shared/Modal/Modal";
import KSpinner from "../../../shared/Spinner";
import KTextInput from "../../../shared/TextInput";

const SamplesModal: React.FC<{ show: boolean; onClose: () => void; fetch: () => void }> = ({ show, onClose, fetch }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<SamplesFormData>();
    const { sendRequest, isPending } = useApi<SamplesFormData, BaseResponse<null>>();

    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };


    const onSubmit = (data: SamplesFormData) => {
        sendRequest(
            {
                url: '/Resumes/AddWorkSample',
                method: 'post',
                data: data,
            },
            (response) => {
                toast.success(response.message);
                onClose();
                fetch()
            },
            (error) => {
                toast.error(error?.message);
            }
        );
    };

    return (
        <KModal show={show} onClose={onClose} containerClass="!w-full !max-w-[40vw] !md:max-w-[70vw] !lg:max-w-[60vw] !pb-2">
            <KModal.Header>
                <h2>افزودن نمونه کار</h2>
            </KModal.Header>
            <KModal.Body>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap justify-start">
                        <div className="w-full md:w-full p-5">
                            <KLabel>لینک</KLabel>
                            <KTextInput className="ltr" type="link" {...register('link', { required: true })} />
                            {errors.link && <span className="text-red-500 text-sm">لینک الزامی است</span>}
                        </div>
                    </div>
                    <div className='flex justify-end p-5'>
                        {isPending ? <KSpinner color='primary' /> :
                            <KButton color='primary' type="button" onClick={handleFormSubmit}>
                                ذخیره
                            </KButton>
                        }
                    </div>
                </form>
            </KModal.Body>
        </KModal >
    )
}

export default SamplesModal