import { useEffect, useRef, useState } from "react";
import SDCard from "../../components/shared/Card";
import { SDTabs } from "../../components/shared/Tabs";
import AccountInfo from "../../components/userPanel/Account/AccountInfo";
import Documents from "../../components/userPanel/Account/Documents";
import PersonalInfo from "../../components/userPanel/Account/PersonalInfo";
import { TabsRef } from "flowbite-react";
import useAPi from "../../hooks/useApi";
import {
  DocumentItemModel,
  DocumentsList,
  PersonalInfoEditRequest,
  PersonalInfoEditableFormData,
} from "../../models/account.models";
import {
  BaseResponse,
  UserGeneralInfo,
  UserStatuses,
} from "../../models/shared.models";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useConfirm from "../../hooks/useConfirm";
import { toast } from "react-toastify";
import {
  UserDocumentsFieldType,
  UserDocumentsFields,
  accoutnActions,
} from "../../store/account";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useForm } from "react-hook-form";

const Account: React.FC = () => {
  const [, setActiveTab] = useState<number>(0);
  const accountState = useAppSelector((state) => state.account);
  const tabsRef = useRef<TabsRef>(null);
  const [anyInvalidDocument, setAnyInvalidDocument] = useState<boolean>();
  const userStatus = useAppSelector((state) => state.auth.userStatus);
  const props = { setActiveTab, tabsRef };
  const anyDocChange = useAppSelector((state) => state.account.anyDocChange);
  const generalSettings = useAppSelector(
    (state) => state.generalSettings.generalSettings
  );
  const personalInfoForm = useForm<PersonalInfoEditableFormData>({
    mode: "onTouched",
  });
  const { sendRequest, isPending } = useAPi<
    PersonalInfoEditRequest,
    BaseResponse<null>
  >();

  const { sendRequest: sendGetDocumentsRequest } = useAPi<
    null,
    BaseResponse<DocumentsList>
  >();

  const { sendRequest: sendUserInfoRequest } = useAPi<
    null,
    BaseResponse<UserGeneralInfo>
  >();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [ConfirmModal, confirmation] = useConfirm(
    "آیا از صحت اطلاعات اطمینان دارید و مدارک برای تأیید ارسال شود ؟ ",
    "تکمیل اطلاعات و ارسال"
  );

  function getUserInfo() {
    sendUserInfoRequest(
      {
        url: "/Users/GetUserInformation",
      },
      (response) => {
        dispatch(authActions.setUserGenralInfo(response.content));
      }
    );
  }

  function getDcouments() {
    sendGetDocumentsRequest(
      {
        url: "/Users/GetUserDocument",
      },
      (response) => {
        dispatch(accoutnActions.setDocuments(response.content));
      }
    );
  }

  useEffect(() => {
    getDcouments();
  }, []);

  useEffect(() => {
    if (generalSettings) {
      dispatch(
        accoutnActions.setTimeStaps({
          medicalDocumentsValidityDuration:
            generalSettings.medicalDocumentsValidityDuration,
          attorneyDocumentsValidityDuration:
            generalSettings.attorneyDocumentsValidityDuration,
        })
      );
    }
  }, [generalSettings, dispatch]);

  useEffect(() => {
    const documentFiels: UserDocumentsFieldType[] = [
      UserDocumentsFields.attorneyDocument,
      UserDocumentsFields.logBookDocument,
      UserDocumentsFields.medicalDocument,
      UserDocumentsFields.nationalCardDocument,
    ];
    const anyInvalidDocument = documentFiels.some((field) => {
      const documentData: DocumentItemModel = accountState[field];
      return documentData.validationMessage !== "";
    });
    setAnyInvalidDocument(anyInvalidDocument);
  }, [accountState]);

  function onPersonalInfoSubmit() {
    props.tabsRef.current?.setActiveTab(2);
  }

  async function sendAllInformations() {
    if (anyInvalidDocument) {
      return;
    }

    if (!personalInfoForm.formState.isValid) {
      toast.error("اطلاعات شخصی را کامل کنید.");
      props.tabsRef.current?.setActiveTab(1);
      return;
    }
    const personalInfo = accountState.personalInfo;

    const confirmed = await confirmation();
    if (confirmed) {
      const body: PersonalInfoEditRequest = {
        birthDate: personalInfo?.birthDate || "",
        firstName: personalInfo?.birthDate || "",
        lastName: personalInfo?.lastName || "",
        nationalCode: personalInfo?.nationalCode || "",
        address: personalInfo?.address,
        cityAndState: personalInfo?.cityAndState || null,
        email: personalInfo?.email,
        emergencyContact: personalInfo?.emergencyContact,
        emergencyPhone: personalInfo?.emergencyPhone,
        height: personalInfo?.height || null,
        weight: personalInfo?.weight || null,
        nationalCardDocument:
          accountState.nationalCardDocument &&
          accountState.nationalCardDocument.fileId
            ? {
                fileId: accountState.nationalCardDocument.fileId,
              }
            : undefined,
        attorneyDocument:
          accountState.attorneyDocument && accountState.attorneyDocument.fileId
            ? {
                fileId: accountState.attorneyDocument.fileId,
                expirationDate: accountState.attorneyDocument.expirationDate,
              }
            : undefined,
        logBookDocument:
          accountState.logBookDocument && accountState.logBookDocument.fileId
            ? {
                fileId: accountState.logBookDocument.fileId,
              }
            : undefined,
        medicalDocument:
          accountState.medicalDocument && accountState.medicalDocument.fileId
            ? {
                fileId: accountState.medicalDocument.fileId,
                expirationDate: accountState.medicalDocument.expirationDate,
              }
            : undefined,
      };
      sendRequest(
        {
          url: "/Users/UserPersonalInformationCompletion/false",
          data: body,
          method: "post",
        },
        (response) => {
          toast.success(response.message);
          getDcouments();
          getUserInfo();
          navigate("/");
        },
        (error) => toast.error(error?.message)
      );
    }
  }
  return (
    <div>
      <ConfirmModal />
      <SDCard>
        <SDTabs.Group
          ref={props.tabsRef}
          aria-label="Tabs with underline"
          style="underline"
          onActiveTabChange={(tab) => props.setActiveTab(tab)}
        >
          <SDTabs.Item active title="اطلاعات کاربری">
            <AccountInfo></AccountInfo>
          </SDTabs.Item>
          <SDTabs.Item
            title={
              <div className="flex flex-wrap gap-3 items-center justify-center text-center">
                <span>اطلاعات شخصی</span>
                {!personalInfoForm.formState.isValid && (
                  <span className="!text-xs !text-red-600">(تکمیل نشده)</span>
                )}
              </div>
            }
          >
            <PersonalInfo
              onSubmit={onPersonalInfoSubmit}
              formHook={personalInfoForm}
              disableAll={userStatus === UserStatuses.PENDING}
            />
          </SDTabs.Item>
          <SDTabs.Item
            title={
              <div className="flex flex-wrap gap-3 items-center justify-center text-center">
                <span>مدارک ارسالی</span>
                {anyInvalidDocument && (
                  <span className=" !text-xs !text-red-600">(تکمیل نشده)</span>
                )}
              </div>
            }
          >
            <Documents
              onSubmit={sendAllInformations}
              isPending={isPending}
              userStatus={userStatus}
              anyChange={anyDocChange || personalInfoForm.formState.isDirty}
            />
          </SDTabs.Item>
        </SDTabs.Group>
      </SDCard>
    </div>
  );
};
export default Account;
