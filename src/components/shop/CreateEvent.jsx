import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../items/InputField";
import DateRangePicker from "../items/DateRangePicker";
import InputSelectField from "../items/InputSelectField";

import { FiPackage } from "react-icons/fi";
import { MdOutlineAttachMoney, MdOutlineDescription } from "react-icons/md";
import { categoriesData } from "../../static/data";
import { AiFillDelete, AiOutlineTag } from "react-icons/ai";
import { CiMoneyBill } from "react-icons/ci";
import { GrStorage } from "react-icons/gr";
import { toast } from "react-toastify";
import UploadFile from "../items/UploadFile";
import { createevent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date, dateString) => {
    setStartDate(dateString);
  };

  const handleEndDateChange = (date, dateString) => {
    setEndDate(dateString);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully!");
      navigate("/dashboard-events");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDelete = (index) => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => {
      newForm.append("images", image);
    });
    const eventData = {
      name: name,
      description: description,
      category: category,
      tags: tags,
      originalPrice: originalPrice,
      discountPrice: discountPrice,
      stock: stock,
      shopId: seller._id,
      start_date: startDate,
      end_date: endDate,
    };

    dispatch(createevent(eventData));
  };

  return (
    <div className="w-[90%] mx-auto mt-5  bg-white shadow h-[80vh] rounded-md p-8 overflow-y-scroll ">
      <h5 className="text-[30px] font-Poppins text-center">Create Event</h5>
      {/* form */}
      <form onSubmit={handleSubmit}>
        {/* personal info */}
        <div className="w-full pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full grid gap-4">
            {/* product Name */}
            <InputField
              label="Event Product Name"
              type="text"
              id="name"
              require={true}
              icon={<FiPackage />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* product description */}
            <InputField
              label="Event Description"
              type="textarea"
              id="description"
              require={true}
              icon={<MdOutlineDescription />}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* Category */}
            <InputSelectField
              data={categoriesData}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              placeholder="Choose product category"
            />
            {/* Tags */}
            <InputField
              label="Event Tags"
              type="text"
              id="tags"
              require={false}
              icon={<AiOutlineTag />}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            {/* Original Price */}
            <InputField
              label="Original Price"
              type="number"
              id="originalPrice"
              require={false}
              icon={<CiMoneyBill />}
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
            {/* price with discount */}
            <InputField
              label="Price (with Discount)"
              type="number"
              id="discountPrice"
              require={true}
              icon={<MdOutlineAttachMoney />}
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
            {/* Product stock */}
            <InputField
              label="Product Stock"
              type="number"
              id="stock"
              require={true}
              icon={<GrStorage />}
              value={setStock}
              onChange={(e) => setStock(e.target.value)}
            />

            <div className="flex gap-3">
              <DateRangePicker
                id="start-date"
                placeholder="Start Date"
                onChange={handleStartDateChange}
                value={startDate}
              />
              <DateRangePicker
                id="end-date"
                placeholder="End Date"
                onChange={handleEndDateChange}
                value={endDate}
              />
            </div>
          </div>

          <div className="w-full flex flex-col justify-between">
            <div className="flex flex-col justify-between gap-4">
              <UploadFile
                label="Upload Event Images"
                id="images"
                require={true}
                value={images}
                onChange={handleImageChange}
                files={images}
                size={30}
              />
              <div className="w-full min-h-[57px] grid grid-cols-2 md:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4  gap-3 p-3  border border-gray-300 md:gap-2  justify-center items-center rounded-md">
                {images &&
                  images.map((i, index) => (
                    <div className="relative mx-auto w-[120px]">
                      <img
                        src={URL.createObjectURL(i)}
                        alt=""
                        key={index}
                        className="object-cover "
                      />
                      <AiFillDelete
                        className="absolute top-2 right-3 cursor-pointer"
                        size={22}
                        onClick={() => handleDelete(index)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <input
              type="submit"
              value="Create Event"
              className="mt-2 cursor-pointer appearance-none text-center  w-full px-3 h-[40px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
