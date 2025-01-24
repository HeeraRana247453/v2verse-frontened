import styles from '../../styles/styles'
import { Link } from 'react-router-dom'
import { categoriesData, productData } from '../../static/data';
import { AiOutlineHeart, AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { useState } from 'react'
import {IoIosArrowDown, IoIosArrowForward}  from 'react-icons/io';
import {BiMenuAltLeft} from 'react-icons/bi';
import {CgProfile} from 'react-icons/cg';
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from 'react-redux';
import Cart from '../cart/Cart.jsx';
import Wishlist from '../Wishlist/Wishlist.jsx';
import { RxCross1 } from 'react-icons/rx';

const Header = ({activeHeading}) => {

    const {isAuthenticated,user} = useSelector((store)=> store.user);
    const {allProducts} = useSelector((state)=> state.products);
    const {cart} = useSelector((state) => state.cart);
    const {wishlist} = useSelector((state) => state.wishlist);
    const [searchTerm,setSearchTerm] = useState("");
    const [searchData,setSearchData] = useState(null);
    const [active,setActive] = useState(false);
    const [dropDown,setDropDown] = useState(false);

    const [openCart,setOpenCart] = useState(false); 
    const [openWishlist,setOpenWishlist] = useState(false); 
    const [open, setOpen] = useState(false);


    const handleSearchChange = (e)=>{
        const term = e.target.value;
        setSearchTerm(term);
        const filteredProducts = allProducts && allProducts.filter((product)=> product.name.toLowerCase().includes(term.toLowerCase()));
        setSearchData(filteredProducts);
    }

    window.addEventListener("scroll",()=>{
        if(window.scrollY > 100){
            setActive(true);
        }else{
            setActive(false);
        }
    })
  return (
    <>
    <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
            <div>
                <Link to="/">
                {/* <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt=""/> */}
                </Link>
            </div>

            {/* Search Box */}
            <div className="w-[50%] relative">
                <input type="text" placeholder='Search Products...' value={searchTerm} onChange={handleSearchChange} className='h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md' />
                <AiOutlineSearch size={30} className='absolute right-2 top-1.5 cursor-pointer'/>
                {
                    searchData && searchData.length !== 0 ? (
                        <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                            {searchData && searchData.map((i, index)=>{
                                // const d = i.name;
                                // const Product_name = d.replace(/\s+/g,"-");
                                return(
                                    <Link to={`/product/${i._id}`} key={index}>
                                        <div className="w-full flex items-start-py-3"><img src={i.images[0].url} className='w-[40px] h-[40px] mr-[10px]' alt="" /><h2>{i.name}</h2></div>
                                    </Link>
                                )
                            })}
                        </div>
                    ):null
                }
            </div>

            {/* Become Seller */}
            <div className={`${styles.button}`}>
                <Link to="/shop-create"><h1 className="text-[#fff] flex items-center">Become Seller<IoIosArrowForward className="ml-1"/></h1></Link>
            </div>
        </div>
    </div>

    <div className={`${active===true ? "shadow-sm fixed top-0 left-0 z-10" : null} transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}>
        <div className={`${styles.section} relative ${styles.noramlFlex} justify-between`}>
            {/* Categories */}
            <div>
                <div className="relative h-[60px] mt-[10px] w-[250px] hidden 1000px:block" onClick={()=>setDropDown(!dropDown)}>
                    <BiMenuAltLeft size={30} className='absolute top-3 left-2'/>
                    <button className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}> 
                        All Categories<IoIosArrowDown size={20} className="aonClick={()=>setDropDown(!dropDown)}bsolute right-2 top-4 cursor-pointer" />
                    </button>
                    {dropDown ? (<DropDown categoriesData={categoriesData} setDropDown={setDropDown}/>) : null}
                </div>
            </div>
            {/* Nav-Items */}
            <div className={`${styles.noramlFlex}`}>
                <Navbar active={activeHeading} />
            </div>

            {/* Wishlist, Cart, Profile */}
            <div className="flex">
                <div className={`${styles.noramlFlex}`}>
                    <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenWishlist(true)}>
                        <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                        <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0.5 m-0 text-white font-mono text-[12px] leading-tight text-center">
                        {wishlist && wishlist.length}
                        </span>
                    </div>
                </div>

                <div className={`${styles.noramlFlex}`}>
                    <div className="relative cursor-pointer mr-[15px]" onClick={() => setOpenCart(true)}>
                        <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)"/>
                        <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0.5 m-0 text-white font-mono text-[12px] leading-tight text-center">
                        {cart && cart.length}
                        </span>
                    </div>
                </div>

                <div className={`${styles.noramlFlex}`}>
                    <div className="relative cursor-pointer mr-[15px]">
                        {isAuthenticated ? (
                        <Link to="/profile"><img src={`${user?.avatar?.url}`} className="w-[35px] h-[35px] rounded-full" alt=""/></Link>
                        ) : (
                        <Link to="/login"><CgProfile size={30} color="rgb(255 255 255 / 83%)" /></Link>
                        )}
                    </div>
                </div>
                {/* cart popup */}
                {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

                {/* wishlist popup */}
                {openWishlist ? (<Wishlist setOpenWishlist={setOpenWishlist} />) : null}
          </div>
        </div>
    </div>



    {/* mobile header */}
    <div className={`${ active === true ? "shadow-sm fixed top-0 left-0 z-10" : null} w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}>
        <div className="w-full flex items-center justify-between">
          <div><BiMenuAltLeft size={40} className="ml-4" onClick={() => setOpen(true)}/></div>
          <div>
            <Link to="/">
              <img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" className="mt-3 cursor-pointer"/>
            </Link>
          </div>
          <div>
            <div className="relative mr-[20px]" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                
                <div className='flex'>
                    <div className="flex w-full justify-center mt-5 ps-5">
                        {isAuthenticated ? (
                        <>
                            <Link to="/profile">
                            <img src={`${user.avatar?.url}`} alt="" className="w-[55px] h-[55px] rounded-full border-[3px] border-[#0eae88]"/>
                            </Link>
                        </>
                        ) : (
                        <div className='flex flex-col'>
                            <div className={`${styles.button_login} mr-1`}>
                                <Link to="/login" className=" text-[18px] text-[#ffff]">Login</Link>
                            </div>
                            {/* <div className={`${styles.button_login}`}>
                                <Link to="/sign-up" className="text-[18px] text-[#ffff]">Sign up</Link>
                            </div> */}
                        </div>
                        )}
                    </div>
                  <div className="relative top-2 mr-[15px]" onClick={() => setOpenWishlist(true) || setOpen(false)}>
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 left-7 top-5 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1 size={30} className="ml-4 mt-5" onClick={() => setOpen(false)}/>
              </div>

              <div className="my-8 w-[92%] m-auto h-[40px relative]">
                <input type="search" placeholder="Search Product..." className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}/>
                {searchData && (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      const d = i.name;
                      const Product_name = d.replace(/\s+/g, "-");
                      return (
                        <Link to={`/product/${Product_name}`}>
                          <div className="flex items-center">
                            <img src={i.image_Url[0]?.url} alt="" className="w-[50px] mr-2"/>
                            <h5>{i.name}</h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <Navbar active={activeHeading} mobile={open} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              {/* <br />
              <br />
              <br /> */}

              
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Header