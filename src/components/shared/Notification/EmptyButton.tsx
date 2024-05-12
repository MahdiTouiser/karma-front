import { useAppDispatch } from "../../../hooks/reduxHooks";
import { emptyBasket } from "../../../store/basket";
import SDButton from "../Button";

const EmptyButton: React.FC = () => {
  const dispatch = useAppDispatch();

  function onEmpty() {
    dispatch(emptyBasket());
  }

  return (
    <SDButton
      onClick={onEmpty}
      color="primary2"
      outline
      className="w-full mt-1"
      type="button"
    >
      خالی کردن سبد خرید
    </SDButton>
  );
};

export default EmptyButton;
