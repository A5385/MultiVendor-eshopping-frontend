import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import { AiOutlineArrowRight } from "react-icons/ai";

import Loader from "../website/layout/Loader";
import { getAllOrdersOfShop } from "../../redux/actions/orders";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: "fit-content", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 300,
      flex: 0.7,
      cellClassName: "Delivered",
    },
    {
      field: "client",
      headerName: "Client",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 75,
      // flex: 1,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      // flex: 1,
    },

    {
      field: " ",
      // flex: 1,
      minWidth: 50,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.id}`}>
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

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.status,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        client: item.user.name,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 p-4 mt-10 bg-white cursor-pointer">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllOrders;
