import { AiFillHeart, AiOutlineEye, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useEffect, useState } from "react";
import Ratings from "../../Products/Ratings.jsx";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCartAsync } from "../../../redux/actions/cart.js";
import { addToWishlistAsync, removeFromWishlistAsync } from "../../../redux/actions/wishlist.js";


const ProductCard = ({data,isEvent}) => {
    const { wishlist } = useSelector((state) => state.wishlist);
    const { cart } = useSelector((state) => state.cart);
    const [click, setClick] = useState(false);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (wishlist && wishlist.find((i) => i._id === data._id)) {
        setClick(true);
      } else {
        setClick(false);
      }
    }, [wishlist]);
  
    const removeFromWishlistHandler = (data) => {
      setClick(!click);
      dispatch(removeFromWishlistAsync(data));
    };
  
    const addToWishlistHandler = (data) => {
      setClick(!click);
      dispatch(addToWishlistAsync(data));
    };
  
    const addToCartHandler = (id) => {
        const isItemExists = cart && cart.find((i) => i._id === id);
        if (data.stock < 1) {
          toast.error("Product is out of stock!");
        } 
        else if (isItemExists) {
          toast.error("Item already in cart!");
        } 
        else {
          const cartData = { ...data, qty: 1 };
          dispatch(addToCartAsync(cartData));
          toast.success("Item added to cart successfully!");
        }
      };

    // const d = data.name;
    // const product_name = d.replace(/\s+/g,"-");
    return (
        <>
            <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
                <div className="flex justify-end"></div>
                <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                    <img src={`${data.images && data.images[0]?.url}`} alt="" className="w-full h-[170px] object-contain" />
                </Link>
                
                <Link to={`/shop/preview/${data?.shop._id}`}>
                    <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
                </Link>

                <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
                    <h4 className="pb-3 font-[500]">{data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name} </h4>

                    <div className="flex"><Ratings rating={data?.ratings} /></div>

                    <div className="py-2 flex items-center justify-between">
                        <div className="flex">
                            <h5 className={`${styles.productDiscountPrice}`}>₹{data.originalPrice === 0 ? data.originalPrice : data.discountPrice}</h5>
                            <h4 className={`${styles.price}`}>{data.originalPrice ? "₹" + data.originalPrice : null}</h4>
                        </div>
                        <span className="hidden sm:block font-[400] text-[17px] text-[#68d284]">{data?.sold_out} sold </span>
                    </div>
                </Link>

                {/* side Three options */}
                <div>
                    {click ? (<AiFillHeart size={22} className="cursor-pointer absolute right-2 top-5" onClick={() => removeFromWishlistHandler(data)} color={click ? "#E63946" : "#333"} title="Remove from wishlist" />
                        ) : (<AiOutlineHeart size={22} className="cursor-pointer absolute right-2 top-5" onClick={() => addToWishlistHandler(data)} color={click ? "#E63946" : "#333"} title="Add to wishlist" />
                    )}
                    <AiOutlineEye size={22} className="cursor-pointer absolute right-2 top-14" onClick={() => setOpen(!open)} color="#333" title="Quick view" />
                    <AiOutlineShoppingCart size={25} className="cursor-pointer absolute right-2 top-24" onClick={() => addToCartHandler(data._id)} color="#444" title="Add to cart" />
                    {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
                </div>
            </div>
        </>
    )
}

export default ProductCard;