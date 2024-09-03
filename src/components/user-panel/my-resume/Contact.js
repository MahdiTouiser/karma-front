import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Edit from '../../../assets/icons/Edit';
import KCard from '../../shared/Card';
const Contact = () => {
    const ContactData = [
        { title: 'آدرس ایمیل', value: 'mahditouiserkani78@gmail.com' },
        { title: 'شماره تماس', value: '09393502695' },
    ];
    return (_jsxs(KCard, { className: 'flex flex-col justify-between', children: [_jsx("div", { className: "flex items-center justify-between", children: _jsx("h1", { className: 'text-xl font-bold', children: "\u0627\u0637\u0644\u0627\u0639\u0627\u062A \u062A\u0645\u0627\u0633" }) }), ContactData.map((contact, index) => (_jsxs("div", { className: "flex items-center justify-between mr-5 mt-5 bg-gray-50 p-2 rounded-md", children: [_jsxs("p", { className: 'text-sm', children: [_jsx("span", { className: 'text-gray-600', children: contact.title }), " ", _jsx("br", {}), _jsx("span", { className: 'font-extrabold', children: contact.value })] }), _jsx("button", { className: "text-sm text-blue-500 flex items-center", children: _jsx(Edit, {}) })] }, index)))] }));
};
export default Contact;
