/* eslint-disable react/prop-types */
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const InputField = ({
  label,
  visible,
  setVisible,
  type,
  icon,
  id,
  require,
  value,
  onChange,
  size,
  isPassword,
  min,
}) => {
  return (
    <div className="w-full  ">
      {/* <div className="text-blue-700  border-slate-400 p-4 text-[24px] mr-0 border-r-0 ">
        {icon}
      </div> */}
      {isPassword ? (
        <FormControl className="m-0 p-0 w-full">
          <InputLabel htmlFor={id}>
            {
              <div className="flex gap-3 items-center ">
                <div className="text-[22px]">{icon}</div>
                {label}
              </div>
            }
          </InputLabel>
          <OutlinedInput
            className="w-full  "
            id={id}
            type={visible ? "text" : "password"}
            onChange={onChange}
            label={
              <div className="flex gap-3 items-center ">
                <div className="text-[22px]">{icon}</div>
                {label}
              </div>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton aria-label="toggle password visibility">
                  {visible ? (
                    <AiOutlineEye onClick={() => setVisible(false)} />
                  ) : (
                    <AiOutlineEyeInvisible onClick={() => setVisible(true)} />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : require === true ? (
        <TextField
          className="w-full"
          id={id}
          label={
            <div className="flex gap-3 items-center  ">
              <div className="text-[22px]">{icon}</div>
              {label}
            </div>
          }
          onChange={onChange}
          required
          defaultValue={value}
          size={size}
          type={type}
        />
      ) : (
        <TextField
          className="w-full"
          id={id}
          label={
            <div className="flex gap-3 items-center ">
              <div className="text-[22px]">{icon}</div>
              {label}
            </div>
          }
          onChange={onChange}
          defaultValue={value}
          size={size}
          type={type}
          min={min}
        />
      )}
    </div>
  );
};

export default InputField;
