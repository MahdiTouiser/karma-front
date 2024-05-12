import { useCallback, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminUploadDocumentModal from '../../../../../components/adminPanel/userManagement/AdminUploadDocumentModal';
import SDButton from '../../../../../components/shared/Button';
import FileViewButton from '../../../../../components/shared/FileViewButtom';
import Grid from '../../../../../components/shared/Grid/Grid';
import {
  ColDef,
  GridGetData,
  GridRef,
} from '../../../../../components/shared/Grid/grid.types';
import UserDocumentStatusLabel from '../../../../../components/shared/UserDocumentStatusLabel';
import { useAppDispatch } from '../../../../../hooks/reduxHooks';
import useAPi from "../../../../../hooks/useApi";
import useConfirm from '../../../../../hooks/useConfirm';
import {
  DocumentItem,
  DocumentItemRow,
  DocumentStatus,
  DocumentsList,
} from '../../../../../models/account.models';
import { BaseResponse } from '../../../../../models/shared.models';
import { fetchUserDetail } from '../../../../../store/usermanagement';
import { sortDate } from '../../../../../utils/shared';

const AdminUserDocument: React.FC = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [colDefs] = useState<ColDef[]>([
    {
      headerName: 'عنوان',
      field: 'title',
    },
    {
      headerName: 'تاریخ بارگذاری',
      field: 'createdAt',
    },
    {
      headerName: 'تاریخ انقضا',
      field: 'expirationDate',
    },
    {
      headerName: 'وضعیت',
      field: 'statusDisplay',
      cellRenderer: (item) => {
        return (
          <UserDocumentStatusLabel
            status={item.status || ''}
            display={item.statusDisplay || ''}
            isUploading={false}
          ></UserDocumentStatusLabel>
        );
      },
    },
    {
      headerName: '',
      field: '',
      cellRenderer: (item: DocumentItemRow) => {
        return <FileViewButton fileId={item.fileId} alt={item.title} />;
      },
    },
  ]);
  const gridRef = useRef<GridRef>(null);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const { sendRequest } = useAPi<null, BaseResponse<DocumentsList>>();

  const { sendRequest: checkRequest } = useAPi<null, BaseResponse<null>>();
  const { sendRequest: sendRemoveRequest } = useAPi<null, BaseResponse<null>>();
  const [DeleteConfirmModal, deleteConfirmation] = useConfirm(
    ' این مدرک حذف خواهد شد. آیا مطمئن هستید؟ ',
    'حذف کردن مدرک'
  );
  const mapDocumentsToRows = useCallback(
    (documents: DocumentItem[], title: string) => {
      const rows: DocumentItemRow[] = documents.map((item) => {
        return {
          ...item,
          title,
          isPending: item.status === DocumentStatus.PENDING,
        };
      });
      return rows;
    },
    []
  );

  const getDocuments = useCallback<GridGetData<DocumentItemRow>>(
    (_gridParams, setRows, fail) => {
      const userId = params.userId;
      sendRequest(
        {
          url: '/Users/GetUserDocument',
          params: {
            userId: userId,
          },
        },
        (response) => {
          const documents = response.content;
          const nationalCardDocuments: DocumentItem[] =
            documents.nationalCardDocuments || [];
          const logBookDocument: DocumentItem[] =
            documents.logBookDocuments || [];
          const attorneyDocument: DocumentItem[] =
            documents.attorneyDocuments || [];
          const medicalDocument: DocumentItem[] =
            documents.medicalDocuments || [];
          const rows = [
            ...mapDocumentsToRows(nationalCardDocuments, 'کارت ملی'),
            ...mapDocumentsToRows(logBookDocument, 'لاگ بوک'),
            ...mapDocumentsToRows(attorneyDocument, 'وکالت‌نامه محضری'),
            ...mapDocumentsToRows(medicalDocument, 'مدارک پزشکی'),
          ];
          setRows(sortDate<DocumentItemRow>(rows, 'createdAt'));
          const allApproved = rows.every(
            (row) => DocumentStatus.CONFIRMED === row.status
          );
          if (allApproved) {
            dispatch(fetchUserDetail(userId as string));
          }
        },
        (error) => fail(error)
      );
    },
    [sendRequest, dispatch, mapDocumentsToRows, params]
  );

  const checkDocument = useCallback(
    (id: string, approve: boolean) => {
      checkRequest(
        {
          url: `/Admin/CheckUserDocument/${id}/${approve}`,
          method: 'put',
        },
        (response) => {
          toast.success(response.message);
          gridRef.current?.refresh();
        },
        (error) => {
          toast.error(error?.message || '');
        }
      );
    },
    [checkRequest]
  );

  function uploadDocumentStart() {
    setShowUploadModal(true);
  }

  function onUploadClose(submitted: boolean) {
    setShowUploadModal(false);
    if (submitted) {
      gridRef.current?.refresh();
    }
  }

  async function onRemoveDocument(item: DocumentItemRow) {
    const confirm = await deleteConfirmation();
    if (!confirm) {
      return;
    }
    sendRemoveRequest(
      {
        url: `/admin/RemoveDocument/${item.id}`,
        method: 'delete',
      },
      (response) => {
        toast.success(response.message);
        gridRef.current?.refresh();
      },
      (error) => {
        toast.error(error?.message);
      }
    );
  }
  // useEffect(() => {
  //   getDocuments(params.userId as string);
  // }, [params.userId, getDocuments]);
  return (
    <>
      <DeleteConfirmModal />
      {showUploadModal && (
        <AdminUploadDocumentModal
          userId={params.userId as string}
          onCloseModal={onUploadClose}
        />
      )}
      <div className="py-16 px-12">
        <div className="mb-2">
          <SDButton color="primary2" onClick={uploadDocumentStart}>
            + جدید
          </SDButton>
        </div>
        <Grid<DocumentItemRow>
          colDefs={colDefs}
          getData={getDocuments}
          pageSize={null}
          ref={gridRef}
          onRemoveRow={onRemoveDocument}
          rowActions={{
            remove: true,
            edit: false,
            otherActions: [
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 stroke-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                descriptions: 'تأیید',
                onClick: (item) => {
                  checkDocument(item.id as string, true);
                },
                showField: 'isPending',
              },
              {
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 stroke-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                ),
                descriptions: 'عدم تأیید',
                onClick: (item) => {
                  checkDocument(item.id as string, false);
                },
                showField: 'isPending',
              },
            ],
          }}
        />
      </div>
    </>
  );
};

export default AdminUserDocument;
