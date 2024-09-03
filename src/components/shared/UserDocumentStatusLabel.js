import { jsx as _jsx } from "react/jsx-runtime";
import { DocumentStatus } from '../../models/account.models';
const UserDocumentStatusLabel = (props) => {
    const statusColorMap = new Map([
        [DocumentStatus.NOT_LOADED, 'text-gray-700'],
        ['', 'text-gray-700'],
        [DocumentStatus.PENDING, 'text-orange-500'],
        [DocumentStatus.CONFIRMED, 'text-cyan-500'],
        [DocumentStatus.EXPIRED, 'text-red-600'],
    ]);
    return (_jsx("p", { className: `${props.isUploading
            ? statusColorMap.get('')
            : statusColorMap.get(props.status || '')} ${props.isUploading &&
            (props.status === DocumentStatus.NOT_LOADED || props.status === '')
            ? 'opacity-70'
            : ''} font-semibold`, children: props.isUploading ? 'آماده ارسال' : props.display || 'بارگذاری نشده' }));
};
export default UserDocumentStatusLabel;
