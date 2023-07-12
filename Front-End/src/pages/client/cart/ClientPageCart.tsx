import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ICartItem } from "../../../types/cart";
import ClientEmptyCart from "../../../components/client/ClientEmptyCart";
import ClientExistsCart from "../../../components/client/ClientExistsCart";
import { SumCartContext } from "../../../context/client/HeaderContext";
const ClientPageCart = () => {
  const sumCartContext = useContext(SumCartContext);
  const [cart, setCart] = useState<ICartItem[] | undefined>(undefined);
  const [load, setLoad] = useState<boolean>(true);
  useEffect(() => {
    const cartCore = window.localStorage.getItem("cart");
    if (!cartCore) {
      setLoad(!load);
      return;
    } else {
      try {
        if (isICartItemArray(JSON.parse(cartCore))) {
          setCart(JSON.parse(cartCore));
        }
      } catch (error) {
        // console.log(error);
      }
      setLoad(!load);
      return;
    }
  }, []);
  function isICartItemArray(arr: any) {
    let checker: boolean = true;
    if (Array.isArray(arr)) {
      arr.map((item) => {
        if (
          !(
            typeof item._id === "string" &&
            typeof item.name === "string" &&
            typeof item.image === "string" &&
            typeof item.size === "string" &&
            typeof item.price === "number" &&
            typeof item.quantity === "number"
          )
        ) {
          checker = false;
        }
      });
      return checker;
    } else {
      checker = false;
      return checker;
    }
  }
  function onHandleRemoveItemCart(id: string) {
    const beforeCart = cart?.filter((item) => item._id !== id);
    sumCartContext?.onHandleSumCart(Number(beforeCart?.length));
    window.localStorage.setItem("cart", JSON.stringify(beforeCart));
    setCart(beforeCart);
    return;
  }
  if (load) return;
  return (
    <section className="min-h-[60vh]">
      <div className="max-w-[1170px] m-auto">
        <div className="min-w-full flex md:py-3 py-1 my-2 bg-gray-100 text-gray-600">
          <Link to={"/"} className="mx-3">
            Trang chủ
          </Link>{" "}
          /
          <Link to={"/cart"} className="mx-3">
            Giỏ hàng
          </Link>
        </div>
        <div className="md:py-8">
          <h1 className="text-center font-semibold md:text-3xl text-xl my-3">
            Giỏ hàng của bạn
          </h1>
          <ClientExistsCart
            onHandleRemoveItemCart={onHandleRemoveItemCart}
            data={cart}
          />
          <ClientEmptyCart data={cart} />
        </div>
      </div>
    </section>
  );
};

export default ClientPageCart;
