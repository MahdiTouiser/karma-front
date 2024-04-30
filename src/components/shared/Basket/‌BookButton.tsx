import { Link } from "react-router-dom";
import SDButton from "../Button";

const BookButton: React.FC = () => {
  return (
    <Link to="/payment" className="block w-full">
      <SDButton color="primary2" className="w-full" type="button">
        رزرو نهایی
      </SDButton>
    </Link>
  );
};

export default BookButton;
