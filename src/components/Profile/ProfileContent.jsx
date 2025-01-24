import React, { useState,useEffect, useRef} from "react";
import {AiOutlineArrowRight,AiOutlineCamera,AiOutlineDelete,} from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import styles from "../../styles/styles";

import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { Link } from "react-router-dom";
import {deleteUserAddress,loadUser,updateUserAddress,updateUserInformation,} from "../../redux/actions/user";
import { City, Country, State } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/orders";

const ProfileContent = ({ active }) => {

  return (
    <div className="w-full">
      {/* profile */}
      {active === 1 && (
        <div>
          <Profile/>
        </div>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}

    </div>
  );
};



const Profile = () =>{
  
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios.put(`${server}/user/update-avatar`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            dispatch(loadUser());
            toast.success("avatar updated successfully!");
          })
          .catch((error) => {
            toast.error(error);
          });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return(
       <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img src={`${user?.avatar?.url}`} className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]" alt=""/>
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input type="file" id="image" className="hidden" onChange={handleImage}/>
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input type="text" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input type="text" className={`${styles.input} !w-[95%] mb-1 800px:mb-0`} required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input type="number" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Enter your password</label>
                  <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} required value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
              </div>
              <input className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`} required value="Update" type="submit"/>
            </form>
          </div>
        </>
  )
}

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {field: "status",headerName: "Status",minWidth: 130,flex: 0.7, cellClassName: (params) => {return params.row.status === "Delivered" ? "greenColor" : "redColor";},},
    {field: "itemsQty",headerName: "Items Qty",type: "number",minWidth: 130,flex: 0.7,},
    {field: "total",headerName: "Total",type: "number",minWidth: 130,flex: 0.8,},
    {field: " ",flex: 1,minWidth: 150,headerName: "",type: "number",sortable: false,renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders && orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.status,
        itemsQty: item.cart.length,
        total: "₹ " + item.totalPrice,
      });
    });

  return (
    <div className="pl-8 pt-1 max-w-full mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
        style={{ width: '100%'}} // Set a max width to avoid stretching beyond the screen
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders = orders && orders.filter((item) => item.status === "Processing refund");

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {field: "status",headerName: "Status",minWidth: 130,flex: 0.7,cellClassName: (params) => {
            return params.row.status === "Delivered" ? "greenColor" : "redColor";},
        },
        {field: "itemsQty",headerName: "Items Qty",type: "number",minWidth: 130,flex: 0.7,},
        {field: "total",headerName: "Total",type: "number",minWidth: 130,flex: 0.8,},
        {field: " ",flex: 1,minWidth: 150,headerName: "",type: "number",sortable: false,renderCell: (params) => {
            return (
              <>
                <Link to={`/user/order/${params.id}`}>
                  <Button> <AiOutlineArrowRight size={20}/> </Button>
                </Link>
              </>
            );
          },
        },
      ];

  const row = [];

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "₹" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1 max-w-full mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {field: "status",headerName: "Status",minWidth: 130,flex: 0.7,cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";},},
    {field: "itemsQty",headerName: "Items Qty",type: "number",minWidth: 130,flex: 0.7,},
    {field: "total",headerName: "Total",type: "number",minWidth: 130,flex: 0.8,},
    {field: " ",flex: 1,minWidth: 150,headerName: "",type: "number",sortable: false,renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button><MdTrackChanges size={20}/></Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders && orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "₹" + item.totalPrice,
        status: item.status,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick
        autoHeight/>
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Password changed successfully!!");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form aria-required onSubmit={passwordChangeHandler} className="flex flex-col items-center">
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required/>
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input type="password" className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} required/>
            <input className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              value="Update" type="submit" required/>
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const city = useRef();
  const address = useRef();
  const zipCode = useRef(null);
  const addressType = useRef();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    { name: "Default",},
    { name: "Home",},
    { name: "Office",},
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType.current.value === "" || country === "" || state === "" || city.current.value === "" || zipCode.current.value === null) {
      toast.error("Please fill all the fields!");
    } 
    else {
      dispatch(
        updateUserAddress(
          country,
          state,
          city.current.value,
          address.current.value,
          zipCode.current.value,
          addressType.current.value
        )
      );
      setOpen(false);
      setCountry("");
      setState("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[80%] lg:w-[35%] h-[80vh] bg-white rounded-lg shadow relative overflow-auto">
            <div className="w-full flex justify-end p-3">
              <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpen(false)}/>
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required={true} onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select name="" id="" value={country} onChange={(e) => setCountry(e.target.value)} className="w-[95%] border h-[40px] rounded-[5px]">
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country && Country.getAllCountries().map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your State</label>
                    <select name="" id="" value={state} onChange={(e) => setState(e.target.value)} className="w-[95%] border h-[40px] rounded-[5px]">
                      <option value="" className="block border pb-2">
                        choose your state
                      </option>
                      {country && State.getStatesOfCountry(country).map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">City</label>
                    <select name="" id="" ref={city} className="w-[95%] border h-[40px] rounded-[5px]">
                      <option value="" className="block border pb-2">
                        choose your city
                      </option>
                      {state && City.getCitiesOfState(country,state).map((item) => (
                          <option className="block pb-2" key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address</label>
                    <input type="address" className={`${styles.input}`} ref={address} required/>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input type="number" className={`${styles.input}`} ref={zipCode} required/>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select name="" id="" ref={addressType} className="w-[95%] border h-[40px] rounded-[5px]">
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData && addressTypeData.map((item) => (
                          <option className="block pb-2" key={item.name} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input type="submit" className={`${styles.input} mt-5 cursor-pointer`} readOnly required/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
       {/* Address List */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg sm:text-xl font-semibold">My Addresses</h1>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => setOpen(true)}>
            Add New
          </button>
        </div>

        <div className="space-y-4">
          {user?.addresses?.length ? (
            user.addresses.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-white rounded-md shadow gap-4">
                {/* Address Info */}
                <div className="flex flex-row items-center justify-between w-full sm:w-auto gap-4">
                  <div>
                    <h5 className="font-medium">{item.addressType}</h5>
                    <p className="text-md truncate sm:line-clamp-1 sm:max-w-[40ch] max-w-[20ch]">
                      {`${item.city}, ${item.address}`}
                    </p>
                  </div>

                  {/* Delete Icon */}
                  <button className="text-red-500 hover:text-red-600 transition sm:hidden" onClick={() => handleDelete(item)} >
                    <AiOutlineDelete size={25} />
                  </button>
                </div>

                {/* Delete Icon for Larger Devices */}
                <button className="hidden sm:block text-red-500 hover:text-red-600 transition" onClick={() => handleDelete(item)} >
                  <AiOutlineDelete size={25} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 bg-white shadow-md p-6 rounded-lg">
              <span className="block text-xl font-semibold text-gray-700">
                No Saved Addresses
              </span>
              <span className="block text-sm text-gray-500 mt-2">
                Add a new address to see it here!
              </span>
              <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition" onClick={() => setOpen(true)}>
                Add New Address
              </button>
            </p>
          )}
        </div>
    </div>
  );
};

export default ProfileContent;