import Upload from "../../../assets/icons/Upload";
import KCard from "../../shared/Card";

const PersonalResume = () => {

    return (
        <KCard className='flex flex-col justify-between w-full'>
            <div className="flex items-center justify-between">
                <h1 className='text-xl font-extrabold'>بارگذاری رزومه شخصی</h1>
                <button className="text-sm text-blue-500 flex items-center">
                    <Upload />
                </button>
            </div>
        </KCard>)
}

export default PersonalResume