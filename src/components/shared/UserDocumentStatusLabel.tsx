import React from "react";
import { DocumentStatus } from '../../models/account.models';

interface UserDocumentStatusLabelProps {
  status: (typeof DocumentStatus)[keyof typeof DocumentStatus];
  display: string;
  isUploading: boolean;
}

const UserDocumentStatusLabel: React.FC<UserDocumentStatusLabelProps> = (
  props
) => {
  const statusColorMap = new Map([
    [DocumentStatus.NOT_LOADED, 'text-gray-700'],
    ['', 'text-gray-700'],
    [DocumentStatus.PENDING, 'text-orange-500'],
    [DocumentStatus.CONFIRMED, 'text-cyan-500'],
    [DocumentStatus.EXPIRED, 'text-red-600'],
  ]);
  return (
    <p
      className={`${props.isUploading
          ? statusColorMap.get('')
          : statusColorMap.get(props.status || '')
        } ${props.isUploading &&
          (props.status === DocumentStatus.NOT_LOADED || props.status === '')
          ? 'opacity-70'
          : ''
        } font-semibold`}
    >
      {props.isUploading ? 'آماده ارسال' : props.display || 'بارگذاری نشده'}
    </p>
  );
};

export default UserDocumentStatusLabel;
