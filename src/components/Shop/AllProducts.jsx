import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import { toast } from "react-toastify";


const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
    dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch,seller?._id]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    // window.location.reload().then(
    //   setTimeout(() => {}, 3000)
    // );
    toast.success("Product Deleted Successfully!, \nWait for 3-4 seconds & refresh the page");
  };

  const columns = [
    { field: "id", headerName: "Product Id", minWidth: 150, flex: 0.7 },
    {field: "name",headerName: "Name",minWidth: 180,flex: 1.4,},
    {field: "price",headerName: "Price",minWidth: 100,flex: 0.6,},
    {field: "Stock",headerName: "Stock",type: "number",minWidth: 80,flex: 0.5,},
    {field: "sold",headerName: "Sold out",type: "number",minWidth: 130,flex: 0.6,},
    {field: "Preview",headerName: "Preview",type: "number",flex: 0.8,minWidth: 100,sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/product/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {field: "Delete",headerName: "Delete", type: "number", flex: 0.8, minWidth: 120, sortable: false,
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
  products &&  products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        price: "INR₹ " + item.discountPrice,
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full px-3 pt-1 mt-10 bg-white rounded-md">
          <h1 className="text-xl font-bold mb-4">All Products</h1>
          <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick 
          sx={{
            backgroundColor: "#f0f0f0", // Light gray background
            "& .MuiDataGrid-cell": {backgroundColor: "#ffffff",},// White background for cells
            "& .MuiDataGrid-columnHeaders": {backgroundColor: "#e0e0e0",}, // Light gray background for headers
          }}/>
        </div>
      )}
    </>
  );
};

export default AllProducts;