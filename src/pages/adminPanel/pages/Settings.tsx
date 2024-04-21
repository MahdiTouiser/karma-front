import GeneralSettingsComponent from "../../../components/adminPanel/settings/GeneralSettings";
import SettingsSectionCard from "../../../components/adminPanel/settings/SettingsSectionCard";
import UserTypeSettings from "../../../components/adminPanel/settings/UserTypeSettings";

const Settings: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      <section className="w-full lg:w-1/2 p-2">
        <SettingsSectionCard title="تنظیمات عمومی">
          <GeneralSettingsComponent />
        </SettingsSectionCard>
      </section>
      <section className="w-full lg:w-1/2 p-2">
        <SettingsSectionCard title="انواع کاربر و بلیت‌های مجاز">
          <UserTypeSettings />
        </SettingsSectionCard>
      </section>
    </div>
  );
};

export default Settings;
