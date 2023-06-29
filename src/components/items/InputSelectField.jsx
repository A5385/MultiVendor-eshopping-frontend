import React from "react";

const InputSelectField = ({ value, onChange, data, title, placeholder }) => {
  return (
    <div>
      <select
        className="w-full px-3 border border-[#ccc] h-[57px] rounded-[5px]"
        value={value}
        onChange={onChange}
      >
        <option value={placeholder}>{placeholder}</option>
        {data &&
          data.map((i) => (
            <option value={i.name} key={i.name}>
              {i.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default InputSelectField;

// import * as React from "react";
// import { useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Chip from "@mui/material/Chip";
// import { categoriesData } from "../../static/data";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function MultipleSelectChip({
//   data,
//   onChange,
//   category,
//   setCategory,
//   title,
// }) {
//   //   const theme = useTheme();
//   //   const [personName, setPersonName] = React.useState([]);

//   return (
//     <div>
//       <FormControl className="w-full">
//         <InputLabel id="demo-multiple-chip-label">{title}</InputLabel>
//         <Select
//           labelId="demo-multiple-chip-label"
//           id="demo-multiple-chip"
//           //   multiple
//           value={category}
//           onChange={onChange}
//           input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
//           //   renderValue={(selected) => (
//           //     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//           //       {selected.map((value) => (
//           //         <Chip key={value} label={value} />
//           //       ))}
//           //     </Box>
//           //   )}
//           MenuProps={MenuProps}
//         >
//           {data.map((name) => (
//             <MenuItem
//               key={name.id}
//               value={name.name}
//               //   style={getStyles(name, personName, theme)}
//             >
//               {name.name}
//             </MenuItem>
//           ))}
//         </Select>
//       </FormControl>
//     </div>
//   );
// }
