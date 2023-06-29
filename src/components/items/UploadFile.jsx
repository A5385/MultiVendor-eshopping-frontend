import { AiOutlinePlusCircle } from "react-icons/ai";

const UploadFile = ({ label, id, require, value, onChange, size, files }) => {
  return (
    <div className="justify-center w-full h-[57px] border rounded-md border-[#c0bfbf] px-3 flex   items-center">
      <label>
        {label} <span className="text-[#555]">*</span>
      </label>
      <input
        type="file"
        className="hidden"
        name=""
        id={id}
        multiple
        onChange={onChange}
        required={require}
        // value={value}
      />
      <label
        htmlFor={id}
        className=" flex !items-center !justify-center px-2 rounded-md cursor-pointer"
      >
        <AiOutlinePlusCircle size={size} className="px-auto" color="#555" />
      </label>
    </div>
  );
};

export default UploadFile;
