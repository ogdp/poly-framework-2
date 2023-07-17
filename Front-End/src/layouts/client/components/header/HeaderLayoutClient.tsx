import { useEffect, useContext } from "react";
import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ICartItem } from "../../../../types/cart";
import { SumCartContext } from "../../../../context/client/HeaderContext";
export default function HeaderLayoutClient() {
  const sumCartContext = useContext(SumCartContext);
  const [show, setshow] = useState(false);
  const [sumCart, setSumCart] = useState(0);
  useEffect(() => {
    setSumCart(Number(sumCartContext?.value));
    try {
      const cartString = window.localStorage.getItem("cart");
      const localCart: ICartItem[] | null = cartString
        ? JSON.parse(cartString)
        : null;
      if (isICartItemArray(localCart)) {
        setSumCart(Number(localCart?.length));
      } else {
        setSumCart(0);
      }
    } catch (error) {
      // console.log("Giỏ rỗng");
      // console.log(error);
    }
  }, [sumCartContext]);
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
  return (
    <div className="bg-white">
      <nav className="2xl:container 2xl:mx-auto sm:py-6">
        <div className="flex justify-between ">
          <Link
            to="/"
            className="text-2xl text-gray-700 dark:text-gray-400 font-bold"
          >
            SNEAKER
          </Link>
          <div className="hidden sm:flex flex-row items-center space-x-6">
            <ul className="hidden lg:w-auto lg:space-x-12 lg:items-center lg:flex ">
              <li className="pb-3">
                <Link
                  to="/"
                  className="text-sm text-gray-700 hover:text-blue-400 font-bold dark:text-gray-400"
                >
                  Trang chủ
                </Link>
              </li>
              <li className="pb-3">
                <Link
                  to="/products"
                  className="text-sm text-gray-700 hover:text-blue-400 font-bold dark:text-gray-400"
                >
                  Sản phẩm
                </Link>
              </li>
              <li className="pb-3">
                <Link
                  to="/products/sales"
                  className="text-sm text-[red] font-bold"
                >
                  Sản phẩm sale
                </Link>
              </li>
              <li className="pb-3">
                <Link
                  to="/contacts"
                  className="text-sm text-gray-700 font-bold hover:text-blue-400 dark:text-gray-400"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div className="hidden sm:flex flex-row space-x-4">
            {/* hthi giỏ hàng */}
            <div>
              <Link
                to="/cart"
                className="w-[50px] flex items-center dark:text-gray-400"
              >
                <Badge count={sumCart}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "30px" }}
                    className="text-gray-600"
                  />
                </Badge>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link
                to="/signup"
                className="mx-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md"
              >
                Đăng ký
              </Link>
              <Link
                to="/signin"
                className="mx-4 px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md"
              >
                Đăng nhập
              </Link>
            </div>
          </div>
          {/* Burger Icon */}
          <div
            id="bgIcon"
            onClick={() => setshow(!show)}
            className={`focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  justify-center items-center sm:hidden cursor-pointer`}
          >
            <svg
              className={`${show ? "hidden" : ""}`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className=" transform duration-150"
                d="M4 6H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 12H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className=" transform duration-150"
                d="M4 18H20"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className={`${show ? "block" : "hidden"}`}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="#1F2937"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Mobile and small-screen devices (toggle Menu) */}
        <div
          id="MobileNavigation"
          className={`${show ? "block" : "hidden"} sm:hidden mt-4 mx-auto`}
        >
          <div className="block sm:hidden md:block">
            <ul>
              <li className="hover:bg-slate-200 h-8" key="home">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="hover:bg-slate-200 h-8" key="products">
                <Link to="/products">Sản phẩm</Link>
              </li>
              <li className="hover:bg-slate-200 h-8" key="products/sales">
                <Link to="/products/sales">Sản phẩm sale</Link>
              </li>
              <li className="hover:bg-slate-200 h-8" key="contacts">
                <Link to="/contacts">Liên hệ</Link>
              </li>
            </ul>
          </div>
          <div className="mt-4 ml-[-10px]">
            <Link
              to="/signup"
              className="mx-2 px-2 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md"
            >
              Đăng ký
            </Link>
            <Link
              to="/signin"
              className="mx-2 px-2 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md"
            >
              Đăng nhập
            </Link>
            {/* Shopping cart icon */}
            <Link
              to="/cart"
              className="mt-4 text-sm font-medium text-gray-700 hover:text-blue-400 flex items-center"
            >
              <div className="relative flex-shrink-0">
                <Badge count={sumCart}>
                  <ShoppingCartOutlined
                    className="h-5 w-5 ml-[20px]"
                    style={{ fontSize: "30px" }}
                  />
                </Badge>
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
