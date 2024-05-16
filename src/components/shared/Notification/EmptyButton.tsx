import { useAppDispatch } from "../../../hooks/reduxHooks";
import { emptyBasket } from "../../../store/basket";
import KButton from "../Button";

const EmptyButton: React.FC = () => {
  const dispatch = useAppDispatch();

  function onEmpty() {
    dispatch(emptyBasket());
  }

  return (
    <KButton
      onClick={onEmpty}
      color="primary"
      outline
      className="w-full mt-1"
      type="button"
    >
      خالی کردن سبد خرید
    </KButton>
  );
};

export default EmptyButton;
