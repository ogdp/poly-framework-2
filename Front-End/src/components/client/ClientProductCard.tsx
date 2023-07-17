import { Link } from "react-router-dom";
import { formatMoney } from "../../utils/MoneyUtils";
type Props = {
  _id: string | undefined;
  imageUrl: string;
  name: string;
  price: number;
};

const ClientProductCard = (props: Props) => {
  if (!props || props == undefined) return <div>Loading ...</div>;
  return (
    <aside className="p-4 shadow-md rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <Link to={`/products/${props._id}`}>
        <div className="mb-3">
          <img src={props.imageUrl} className="w-full" alt="" />
        </div>
        <div>
          <h3
            className="font-medium text-[15px] hover:text-yellow-500 mb-1"
            style={{ transition: "all .35s" }}
          >
            {props.name}
          </h3>
          <h4 className="font-medium text-[15px] mb-1 text-red-500">
            {formatMoney(Number(props.price))}
          </h4>
        </div>
      </Link>
    </aside>
  );
};

export default ClientProductCard;
