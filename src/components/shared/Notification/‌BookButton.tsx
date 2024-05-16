import { Link } from "react-router-dom";
import KButton from "../Button";

const BookButton: React.FC = () => {
  return (
    <Link to="/payment" className="block w-full">
      <KButton color="primary" className="w-full" type="button">
        رزرو نهایی
      </KButton>
    </Link>
  );
};

export default BookButton;
