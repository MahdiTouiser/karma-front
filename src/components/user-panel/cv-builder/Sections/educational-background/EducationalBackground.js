import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, } from 'react';
import { FormProvider, useForm, } from 'react-hook-form';
import { toast } from 'react-toastify';
import useApi from '../../../../../hooks/useApi';
import KButton from '../../../../shared/Button';
import KSpinner from '../../../../shared/Spinner';
import EducationalData from './EducationalData';
import EducationalRecordCards from './EducationalRecordCards';
const EducationalBackground = (props) => {
    const { goToPreviousStep, onSubmitSuccess } = props;
    const methods = useForm({ defaultValues: { stillEducating: false } });
    const { handleSubmit, formState: { errors }, reset } = methods;
    const { sendRequest: fetch, isPending: fetchIsPending } = useApi();
    const { sendRequest: AddEducationalData, isPending } = useApi();
    const [isRecordCreated, setIsRecordCreated] = useState(false);
    const [educationalRecords, setEducationalRecords] = useState([]);
    const [isRecordVisible, setIsRecordVisible] = useState(false);
    const fetchEducationalRecords = () => {
        fetch({
            url: "/Resumes/EducationalRecords",
        }, (response) => {
            if (response.length === 0) {
                setIsRecordCreated(false);
            }
            else {
                setIsRecordCreated(true);
                setEducationalRecords(response);
            }
        });
    };
    useEffect(() => {
        fetchEducationalRecords();
    }, []);
    const onSubmit = async (data) => {
        const cleanedData = {
            ...data,
            fromYear: +data.fromYear || 0,
        };
        if (!data.stillEducating) {
            cleanedData.toYear = data.toYear !== undefined ? +data.toYear : 0;
        }
        if (data.gpa) {
            cleanedData.gpa = +data.gpa;
        }
        if (data.stillEducating) {
            delete cleanedData.toYear;
        }
        if (!data.gpa) {
            delete cleanedData.gpa;
        }
        AddEducationalData({
            url: "/Resumes/AddEducationalRecord",
            method: "post",
            data: cleanedData,
        }, (response) => {
            toast.success(response?.message);
            setIsRecordCreated(true);
            fetchEducationalRecords();
            reset();
        }, (error) => {
            toast.error(error?.message);
        });
    };
    const handleFormSubmit = () => {
        handleSubmit(onSubmit)();
    };
    const handleButtonClick = () => {
        (isRecordVisible || !isRecordCreated) ? handleFormSubmit() : onSubmitSuccess();
    };
    return (_jsx(_Fragment, { children: fetchIsPending ? (_jsx("span", { className: 'flex items-center justify-center h-screen', children: _jsx(KSpinner, { color: 'primary', size: 20 }) })) : (_jsxs(_Fragment, { children: [!Object.keys(errors).length && isRecordCreated ? (_jsx(EducationalRecordCards, { records: educationalRecords, refresh: fetchEducationalRecords, setIsRecordVisible: setIsRecordVisible, isRecordVisible: isRecordVisible })) : (_jsx(FormProvider, { ...methods, children: _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsx("h1", { className: "text-2xl font-bold", children: "\u0633\u0648\u0627\u0628\u0642 \u062A\u062D\u0635\u06CC\u0644\u06CC" }), _jsx("div", { className: 'mt-10', children: _jsx(EducationalData, {}) })] }) })), !isRecordVisible && (_jsxs("div", { className: 'flex justify-end p-2', children: [_jsx(KButton, { color: 'secondary', className: 'ml-4', onClick: goToPreviousStep, children: "\u0645\u0631\u062D\u0644\u0647 \u0642\u0628\u0644\u06CC" }), isPending ? _jsx(KSpinner, { color: 'primary' }) :
                            _jsx(KButton, { color: 'primary', type: "button", onClick: handleButtonClick, children: "\u0630\u062E\u06CC\u0631\u0647 \u0648 \u0645\u0631\u062D\u0644\u0647 \u0628\u0639\u062F" })] }))] })) }));
};
export default EducationalBackground;
