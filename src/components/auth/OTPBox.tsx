import { useState } from "react";
import OtpInput from "react-otp-input";
import Timer from "../shared/Timer";
interface OTPInputProp {
  condLength: number;
  durationSeconds: number;
  phone: string;
  onFinish(code: string): void;
  onRefresh: () => Promise<any>;
}

const OTPBox: React.FC<OTPInputProp> = (props) => {
  const phone = `${props.phone.slice(0, -7)}*****${props.phone.slice(-2)}`;
  const [code, setCode] = useState<string>("");
  const [canRefresh, setCanRefresh] = useState<boolean>(false);


  function renderInput(props: any) {
    return (
      <input
        {...props}
        className={`ltr text-2xl !w-1/6 !max-w-[3rem] h-14 border-gray-300 focus:border-blue-500 placeholder:text-right  bg-gray-50 border  text-gray-900  rounded-md focus:ring-blue-500  block   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 `}
      />
    );
  }

  function handleChange(value: string) {
    setCode(value);
    if (value.length === props.condLength) {
      props.onFinish(value);
    }
  }

  function onTimerEnd() {
    setCanRefresh(true);
  }

  function handleRefresh() {
    setCode("");
    props.onRefresh().then(() => {
      setCanRefresh(false);
    });
  }

  return (
    <div>
      <p className="mb-6 text-lg font-semibold flex justify-center">
        کد فرستاده شده برای <span dir="auto">({phone})</span> را وارد کنید.
      </p>
      <div className="flex flex-col items-center">
        <OtpInput
          value={code}
          onChange={handleChange}
          numInputs={props.condLength}
          renderSeparator={<span className="p-1"></span>}
          renderInput={renderInput}
          containerStyle="ltr justify-center w-full mb-3"
          shouldAutoFocus={true}
          inputType="number"
        />
        <div className="text-sm">
          {canRefresh ? (
            <button
              className="text-primary2"
              type="button"
              onClick={handleRefresh}
            >
              ارسال مجدد
            </button>
          ) : (
            <Timer durationSeconds={props.durationSeconds} onEnd={onTimerEnd} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPBox;
