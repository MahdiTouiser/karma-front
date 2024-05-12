import { useEffect, useState } from "react";
import SDCard from "../../components/shared/Card";
import HomeLink, {
  HomeLinkProps,
} from "../../components/userPanel/home/HomeLink";
import { useAppSelector } from "../../hooks/reduxHooks";
import { UserStatuses } from "../../models/shared.models";

const Home: React.FC = () => {
  const [links, setLinks] = useState<HomeLinkProps[]>([]);
  const name = useAppSelector((state) => state.auth.name);
  const authState = useAppSelector((state) => state.auth);

  const termsLink = useAppSelector(
    (state) => state.generalSettings.generalSettings?.termsAndConditionsUrl
  );

  const statusBgColorMap = new Map([
    [UserStatuses.AWAITING_COMPLETION, "bg-yellow-300"],
    [UserStatuses.PENDING, "bg-yellow-300"],
    [UserStatuses.ACTIVE, "bg-green-200"],
    [UserStatuses.INACTIVE, "bg-red-500"],
  ]);


  useEffect(() => {
    setLinks([
      {
        title: "رویدادها",
        href: "/events",
      },
      {
        title: "قوانین و شرایط",
        href: termsLink || "",
        newTab: true,
      },
      {
        title: "سوابق پرش",
        href: "/jumps",
        needActivation: true,
      },
      {
        title: "کیف پول",
        href: "/wallet",
        needActivation: true,
      },
      {
        title: "بلیت‌های من",
        href: "/tickets",
      },
      {
        title: "سوابق تراکنش ها",
        href: "/transactions",
        needActivation: true,
      },
    ]);
  }, [termsLink]);

  return (
    <SDCard className="flex justify-center">
      <main className="w-full max-w-xl flex flex-col justify-center">
        <div className="mb-6">
          <div className="text-center">
            <p className="mb-2 text-lg">{name}</p>
            <div className="flex justify-center items-center">
              <p className="ml-2 font-semibold text-sm">وضعیت حساب کاربری:</p>
              <p
                className={`${statusBgColorMap.get(
                  authState.userStatus
                )} text-xs  inline py-1 px-3 rounded-2xl`}
              >
                {authState.userStatusDisplay}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          {links.map((link, index) => (
            <HomeLink
              key={index}
              {...link}
              isActiveUser={authState.userStatus === UserStatuses.ACTIVE}
            />
          ))}
        </div>
      </main>
    </SDCard>
  );
};

export default Home;
