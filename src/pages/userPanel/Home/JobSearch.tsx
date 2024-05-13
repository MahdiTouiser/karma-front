import SDButton from "../../../components/shared/Button"
import SDCard from "../../../components/shared/Card"
import SDSelect from "../../../components/shared/Select"
import SDTextInput from "../../../components/shared/TextInput"

const JobSearch = () => {
    return (
        <SDCard className="flex justify-center items-center mt-10">
            <main className="w-full flex flex-col justify-center">
                <div className="flex flex-col justify-center">
                    <p className="flex justify-start font-bold text-xl mr-4">
                        دنبال چه شغلی می گردید ؟
                    </p>
                    <div className="flex ">
                        <div className="m-4 w-1/2">
                            <SDTextInput
                                type="text"
                                id="title"
                                placeholder="عنوان شغلی یا شرکت"
                            />
                        </div>
                        <div className="m-4 w-1/4">
                            <SDSelect
                                id='job-category'
                                placeholder="گروه شغلی"
                            >
                                <option value="developer">برنامه نویسی</option>
                            </SDSelect>
                        </div>
                        <div className="m-4 w-1/4">
                            <SDTextInput
                                type="text"
                                id="title"
                                placeholder="شهر"
                            />
                        </div>
                        <div className="m-4 w-1/4">
                            <SDButton
                                color="primary2"
                                className="px-8"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                                </svg>
                                <p className="mr-2">
                                    جستجو مشاغل
                                </p>
                            </SDButton>
                        </div>
                    </div>
                </div>
            </main>
        </SDCard>)
}

export default JobSearch