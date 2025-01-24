import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Loader from "../Layout/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/orders";
import { Button } from "@mui/material";


const AllOrders = () => {
    const { orders, isLoading } = useSelector((state) => state.order);
    const { seller } = useSelector((state) => state.seller);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getAllOrdersOfShop(seller._id));
    }, [dispatch]);
  
    const columns = [
      { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
      {field: "status",headerName: "Status",minWidth: 130,flex: 0.7,cellClassName: (params) => {
          return (params.row.status === "Delivered") ? "greenColor" : "redColor";},},
      {field: "itemsQty",headerName: "Items Qty",type: "number",minWidth: 130,flex: 0.7,},
      {field: "total",headerName: "Total",type: "number",minWidth: 130,flex: 0.8,},
      {field: " ",flex: 1,minWidth: 150,headerName: "",type: "number",sortable: false,renderCell: (params) => {
          return (
            <>
              <Link to={`/order/${params.id}`}>
                <Button><AiOutlineArrowRight size={20} /></Button>
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
          total: "INR₹ " + item.totalPrice,
          status: item.status,
        });
      });
  
    return (
      <>
        {isLoading ? (<Loader />
        ) : (
          <div className="w-full mx-0 pt-1 pr-5 mt-10 rounded-md">
            <h1 className="text-xl font-bold mb-4 pl-3">All Orders</h1>
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
              sx={{
                backgroundColor: "#f0f0f0", // Light gray background
                "& .MuiDataGrid-cell": {backgroundColor: "#ffffff",},// White background for cells
                "& .MuiDataGrid-columnHeaders": {backgroundColor: "#e0e0e0",}, // Light gray background for headers
              }}
            />
          </div>
        )}
      </>
    );
  };
  
  export default AllOrders;