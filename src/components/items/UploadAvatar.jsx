import { RxAvatar } from "react-icons/rx";

const UploadAvatar = ({ avatar, onChange }) => {
  return (
    <div className="w-full flex my-5 items-center">
      <span className="inline-block h-10 w-10 rounded-full overflow-hidden">
        {avatar ? (
          <img
            src={URL.createObjectURL(avatar)}
            alt="avatar"
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          <RxAvatar className="h-8 w-8" />
        )}
      </span>
      <label
        htmlFor="file-input"
        className="ml-5  flex items-center justify-center px-4 py-2 border border-gary-300 rounded-md shadow-sm font-medium text-gray-700 bg-white hover:bg-gary-500"
      >
        <span>Upload a File</span>
        <input
          type="file"
          name="avatar"
          id="file-input"
          accept=".jpg,.jpeg,.png"
          onChange={onChange}
          className="sr-only w-"
        />
      </label>
    </div>
  );
};

export default UploadAvatar;
