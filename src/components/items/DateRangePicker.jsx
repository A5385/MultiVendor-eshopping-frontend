import { DatePicker, Space } from "antd";
import { useState } from "react";

const DateRangePicker = ({
  onChange,
  picker,
  size,
  showTime,
  placeholder,
  defaultValue,
  id,
  //   placement, // bottomRight bottomLeft topRight topLeft
  required,
}) => {
  return (
    <DatePicker
      className="w-full h-[57px]"
      id={id}
      placeholder={placeholder}
      //   placement={placement}
      onChange={onChange}
      showToday
      defaultValue={defaultValue}
    />
  );
};

export default DateRangePicker;
