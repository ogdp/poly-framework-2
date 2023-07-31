import { Link } from "react-router-dom"
import { Result, Button, Skeleton } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchproducts } from "../redux/slices/product.slice";
import { IProduct } from "../types/product";
const NotFoundPage = () => {
    const { products, isLoading } = useSelector((state: RootState) => state.products)
    const dispatch = useDispatch<AppDispatch>()

    const handleFetchFilm = async () => {
        try {
            const {data} = await dispatch(fetchproducts()).unwrap()
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        handleFetchFilm()
    }, [])
    // return (
    //     <Result
    //         status="404"
    //         title="404"
    //         subTitle="Sorry, the page you visited does not exist."
    //         extra={<Link to='/'><Button className="bg-[#1677ff]" type="primary">Back Home</Button></Link>}
    //     />
    // )
    console.log(products)
    return (
        <div className="pt-4 grid grid-cols-3 gap-2">
        {isLoading && <Skeleton active />}
        {products.map((item:IProduct) => <div>{item.name}</div>)}
    </div>
    )
}
export default NotFoundPage