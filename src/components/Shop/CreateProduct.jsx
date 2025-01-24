import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.set("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);

    dispatch(
      createProduct({
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId:seller._id,
        images,
      })
    );
  };

  return (
    <div className="w-[100%] 800px:w-[50%] bg-white  shadow h-[90vh] rounded-[4px] p-3 mr-3 overflow-y-auto">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block pb-2 font-medium">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your product name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"/>
          </div>
          <div>
            <label className="block pb-2 font-medium">
              Product Description <span className="text-red-500">*</span>
            </label>
            <textarea cols="30" rows="5" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter your product description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label className="block pb-2 font-medium">
              Product Category <span className="text-red-500">*</span>
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Choose a category">Choose a category</option>
              {categoriesData?.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block pb-2 font-medium">Tags</label>
            <input type="text" name="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Enter your product tags..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"/>
          </div>
          <div className="grid grid-cols-1 1000px:grid-cols-2 gap-4">
            <div>
              <label className="block pb-2 font-medium">Original Price</label>
              <input type="number" name="price" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} placeholder="Enter original price..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"/>
            </div>
            <div>
              <label className="block pb-2 font-medium">
                Price (With Discount) <span className="text-red-500">*</span>
              </label>
              <input type="number" name="price" value={discountPrice} onChange={(e) => setDiscountPrice(e.target.value)} placeholder="Enter discounted price..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"/>
            </div>
          </div>
          <div>
            <label className="block pb-2 font-medium">
              Product Stock <span className="text-red-500">*</span>
            </label>
            <input type="number" name="price" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Enter stock quantity..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"/>
          </div>

          <div>
            <label className="block pb-2 font-medium">
              Upload Product Images <span className="text-red-500">*</span>
            </label>
            <input type="file" id="upload" className="hidden" multiple onChange={handleImageChange} />
            <div className="flex items-center gap-4 flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="cursor-pointer" />
              </label>
              {images?.map((i) => (
                <img key={i} src={i} alt="" className="w-[100px] h-[100px] object-cover rounded-md" />
              ))}
            </div>
          </div>
          
          <div>
            <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300">
              Create Product
            </button>
          </div>
        </form>
    </div>
  );
};

export default CreateProduct;