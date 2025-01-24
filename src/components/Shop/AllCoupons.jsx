import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import styles from "../../styles/styles";
import { getAllProductsShop } from "../../redux/actions/product";


const AllCoupons = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [coupouns,setCoupouns] = useState([]);
  

    const couponName = useRef(); 
    const val = useRef(); 
    const minimumAmount = useRef(); 
    const maximumAmount = useRef();
    const availProducts = useRef(); 

    const { seller } = useSelector((state) => state.seller);
    const { products } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(getAllProductsShop(seller._id));
    }, [dispatch]);

// Load all coupons
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

//Handle Delete
  const handleDelete = async (id) => {
    axios.delete(`${server}/coupon/delete-coupon/${id}`,{withCredentials: true})
    .then((res) => {
      toast.success("Coupon code deleted succesfully!")
    })
    window.location.reload();
  };

// Handle Submit
  const handleSubmit = async (e) => {
    // Access values after the form is submitted
    const name = couponName.current.value;
    const value = val.current.value;
    const minAmount = minimumAmount.current.value;
    const maxAmount = maximumAmount.current.value;
    const selectedProducts = availProducts.current.value;
    e.preventDefault();
    await axios.post(`${server}/coupon/create-coupon-code`,{
          name,
          minAmount,
          maxAmount,
          selectedProducts,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
       toast.success("Coupon code created successfully!");
       setOpen(false);
       window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {field: "name",headerName: "Coupon Code",minWidth: 180,flex: 1.4,},
    {field: "price",headerName: "Value",minWidth: 100,flex: 0.6,},
    {field: "Delete",headerName: "Delete",flex: 0.8,minWidth: 100,type: "number",sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  coupouns && coupouns.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: item.value + " %",
        sold: 10,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-4 pr-4 ">
          <div className="w-full flex justify-end">
            <div className={`${styles.button_addNew} !w-max !h-[45px] px-3 mr-3 mb-3`} onClick={() => setOpen(true)}>
              <span className="text-white">Create Coupon</span>
            </div>
          </div>

         <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick />
         </div>

          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[50%] h-[85vh] bg-white rounded-md shadow p-4 overflow-y-auto">
                <div className="w-full flex justify-end">
                  <RxCross1 size={30} className="cursor-pointer" onClick={() => setOpen(false)}/>
                </div>
                <h5 className="text-[30px] font-Poppins text-center">Create Coupon</h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <label className="pb-2">Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" required ref={couponName} placeholder="Enter your coupon code name..."
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Discount Percentenge{" "}<span className="text-red-500">*</span></label>
                    <input type="text" name="value" ref={val} placeholder="Enter your coupon code value..."
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Min Amount</label>
                    <input type="number" name="value" ref={minimumAmount} placeholder="Enter your coupon code min amount..."
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Max Amount</label>
                    <input type="number" name="value" ref={maximumAmount} placeholder="Enter your coupon code max amount..."
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select className="w-full mt-2 border h-[35px] rounded-[5px]" ref={availProducts} >
                      <option value="Choose your selected products">
                        Choose a selected product
                      </option>
                      {products && products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input type="submit" value="Create"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default AllCoupons;