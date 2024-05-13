import SDCard from "../../components/shared/Card";
import SDTextInput from "../../components/shared/TextInput";

const Home: React.FC = () => {


  return (
    <SDCard className="flex justify-center">
      <main className="w-full max-w-xl flex flex-col justify-center">
        <div className="flex flex-col justify-center">
          <p className="flex justify-start font-bold text-xl">
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
              <SDTextInput
                type="text"
                id="title"
                placeholder="عنوان شغلی یا شرکت"
              />
            </div>
            <div className="m-4 w-1/4">
              <SDTextInput
                type="text"
                id="title"
                placeholder="شهر"
              />
            </div>
          </div>
        </div>
      </main>
    </SDCard>
  );
};

export default Home;
