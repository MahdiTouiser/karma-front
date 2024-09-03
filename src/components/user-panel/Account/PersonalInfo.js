import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import useApi from '../../../hooks/useApi';
import { accoutnActions } from '../../../store/account';
import { Regexes } from '../../../utils/shared';
import { heightRangeOptions, phoneInputValidator, weightRangeOptions } from '../../../utils/validations';
import KButton from '../../shared/Button';
import KLabel from '../../shared/Label';
import KTextInput from '../../shared/TextInput';
const PersonalInfo = props => {
    const { register, formState: { errors, touchedFields }, handleSubmit, trigger, setValue, } = props.formHook;
    const { sendRequest: getInfo, data: personalInfo } = useApi();
    const userMobile = useAppSelector(state => state.auth.mobile);
    const dispatch = useAppDispatch();
    useEffect(() => {
        getInfo({
            url: '/Users/GetPersonalInformation',
        }, response => {
            // setFormValue(response.content);
            dispatch(accoutnActions.setPersonalInfo(response.content));
        });
    }, [getInfo, dispatch]);
    useEffect(() => {
        function setFormValue(info) {
            // reset({
            //   address: info.address,
            //   cityAndState: info.cityAndState || "",
            //   email: info.email,
            //   emergencyContact: info.emergencyContact,
            //   emergencyPhone: info.emergencyPhone,
            //   height: info.height,
            //   weight: info.weight,
            // });
            setValue('address', info.address || '');
            setValue('cityAndState', info.cityAndState || '');
            setValue('email', info.email || '');
            setValue('emergencyContact', info.emergencyContact || '');
            setValue('emergencyPhone', info.emergencyPhone || '');
            setValue('height', info.height || null);
            setValue('weight', info.weight || null);
            trigger();
        }
        if (personalInfo?.content) {
            setFormValue(personalInfo.content);
        }
    }, [personalInfo, trigger, setValue]);
    function onSubmit(data) {
        const info = {
            ...personalInfo.content,
            ...data,
        };
        dispatch(accoutnActions.setPersonalInfo(info));
        props.onSubmit();
    }
    return (_jsx("div", { className: "flex pt-4", children: _jsxs("form", { className: "mx-auto flex max-w-xl flex-wrap justify-end", onSubmit: handleSubmit(onSubmit), children: [_jsxs("div", { className: "mb-6 flex w-full gap-6", children: [_jsxs("div", { className: "w-1/2", children: [_jsx(KLabel, { htmlFor: "nationalCode", children: "\u06A9\u062F \u0645\u0644\u06CC" }), _jsx(KTextInput, { type: "text", id: "nationalCode", disabled: true, defaultValue: personalInfo?.content.nationalCode })] }), _jsxs("div", { className: "w-1/2", children: [_jsx(KLabel, { htmlFor: "birthDate", children: "\u062A\u0627\u0631\u06CC\u062E \u062A\u0648\u0644\u062F" }), _jsx(KTextInput, { disabled: true, type: "text", id: "birthDate", defaultValue: personalInfo?.content.birthDate })] })] }), _jsxs("div", { className: "mb-6 flex w-full gap-3", children: [_jsxs("div", { className: "w-1/3", children: [_jsx(KLabel, { htmlFor: "firstName", children: "\u0646\u0627\u0645" }), _jsx(KTextInput, { type: "text", id: "firstName", disabled: true, defaultValue: personalInfo?.content.firstName })] }), _jsxs("div", { className: "w-2/3", children: [_jsx(KLabel, { htmlFor: "lastName", children: "\u0646\u0627\u0645 \u062E\u0627\u0646\u0648\u0627\u062F\u06AF\u06CC" }), _jsx(KTextInput, { disabled: true, type: "text", id: "lastName", defaultValue: personalInfo?.content.lastName })] })] }), _jsxs("div", { className: "mb-6 w-full", children: [_jsxs(KLabel, { htmlFor: "email", children: ["\u0627\u06CC\u0645\u06CC\u0644", errors.email?.message && _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx(KTextInput, { ...register('email', {
                                required: 'فیلد اجباری است.',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'مقدار وارد شده صحیح نیست.',
                                },
                            }), type: "email", id: "email", className: "ltr", disabled: props.disableAll, invalid: !!errors.email && touchedFields.email }), errors.email?.message && touchedFields.email && _jsx("p", { className: "mt-2 pr-2 text-sm text-red-600", children: errors.email.message })] }), _jsxs("div", { className: "mb-6 w-full", children: [_jsxs(KLabel, { htmlFor: "cityId", children: ["\u0627\u0633\u062A\u0627\u0646 \u0648 \u0634\u0647\u0631 \u0627\u0642\u0627\u0645\u062A", errors.cityAndState?.message && _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx(KTextInput, { id: "cityId", ...register('cityAndState', { required: 'فیلد اجباری است.' }), invalid: !!errors.cityAndState && touchedFields.cityAndState, disabled: props.disableAll }), errors.cityAndState?.message && touchedFields.cityAndState && _jsx("p", { className: "mt-2 pr-2 text-sm text-red-600", children: errors.cityAndState.message })] }), _jsxs("div", { className: " mb-6 w-full", children: [_jsxs(KLabel, { htmlFor: "address", children: ["\u0646\u0634\u0627\u0646\u06CC", errors.address?.message && _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx(KTextInput, { ...register('address', { required: 'فیلد اجباری است.' }), type: "address", id: "address", disabled: props.disableAll, invalid: !!errors.address && touchedFields.address }), errors.address?.message && touchedFields.address && _jsx("p", { className: "mt-2 pr-2 text-sm text-red-600", children: errors.address.message })] }), _jsxs("div", { className: "mb-6 flex w-full gap-6", children: [_jsxs("div", { className: "w-1/2 ", children: [_jsxs(KLabel, { htmlFor: "height", children: ["\u0642\u062F (\u0633\u0627\u0646\u062A\u06CC \u0645\u062A\u0631)", errors.height?.message && _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx(KTextInput, { ...register('height', {
                                        valueAsNumber: true,
                                        required: 'فیلد اجباری است.',
                                        ...heightRangeOptions,
                                    }), numeric: true, id: "height", className: "ltr", disabled: props.disableAll, invalid: !!errors.height && touchedFields.height }), errors.height?.message && touchedFields.height && _jsx("p", { className: "mt-2 pr-2 text-sm text-red-600", children: errors.height.message })] }), _jsxs("div", { className: "w-1/2", children: [_jsxs(KLabel, { htmlFor: "weight", children: ["\u0648\u0632\u0646 (\u06A9\u06CC\u0644\u0648\u06AF\u0631\u0645)", errors.weight?.message && _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx(KTextInput, { ...register('weight', {
                                        valueAsNumber: true,
                                        required: 'فیلد اجباری است.',
                                        ...weightRangeOptions,
                                    }), numeric: true, id: "weight", disabled: props.disableAll, invalid: !!errors.weight && touchedFields.weight, className: "ltr" }), errors.weight?.message && touchedFields.weight && _jsx("p", { className: "mt-2 pr-2 text-sm text-red-600", children: errors.weight.message })] })] }), _jsxs("div", { className: "mt-8 w-full", children: [_jsx("p", { className: "mb-4 text-slate-700", children: "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633 \u0627\u0636\u0637\u0631\u0627\u0631\u06CC" }), _jsxs("div", { className: "mb-6 flex w-full gap-6", children: [_jsxs("div", { className: "w-1/2 ", children: [_jsxs(KLabel, { htmlFor: "emergencyContact", children: ["\u0646\u0627\u0645", errors.emergencyContact?.message && _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx(KTextInput, { ...register('emergencyContact', {
                                                required: 'فیلد اجباری است.',
                                                pattern: {
                                                    value: Regexes.persianName,
                                                    message: 'نام باید فارسی باشد.',
                                                },
                                            }), type: "text", disabled: props.disableAll, id: "emergencyContact", invalid: !!errors.emergencyContact && touchedFields.emergencyContact }), errors.emergencyContact?.message && touchedFields.emergencyContact && _jsx("p", { className: "mt-2 pr-2 text-sm text-red-600", children: errors.emergencyContact.message })] }), _jsxs("div", { className: "w-1/2", children: [_jsxs(KLabel, { htmlFor: "emergencyPhone", children: ["\u0645\u0648\u0628\u0627\u06CC\u0644", errors.emergencyPhone?.message && _jsx("span", { className: "text-red-600", children: "*" })] }), _jsx(KTextInput, { ...phoneInputValidator, ...register('emergencyPhone', {
                                                pattern: {
                                                    value: Regexes.mobile,
                                                    message: 'شماره موبایل صحیح نیست.',
                                                },
                                                required: 'فیلد اجباری است.',
                                                validate: value => {
                                                    if (value !== userMobile) {
                                                        return;
                                                    }
                                                    return 'شماره موبایل اضطراری نباید با شماره موبایل شما یکسان باشد.';
                                                },
                                            }), type: "text", disabled: props.disableAll, maxLength: 14, id: "emergencyPhone", className: "ltr", invalid: !!errors.emergencyPhone && touchedFields.emergencyPhone }), errors.emergencyPhone?.message && touchedFields.emergencyPhone && _jsx("p", { className: "mt-2 pr-2 text-sm text-red-600", children: errors.emergencyPhone.message })] })] })] }), _jsx("div", { className: "flex w-full justify-center ", children: _jsx(KButton, { className: "w-full md:w-1/2", color: "primary", type: "submit", disabled: props.disableAll, children: "\u0645\u0631\u062D\u0644\u0647 \u0628\u0639\u062F" }) })] }) }));
};
export default PersonalInfo;
