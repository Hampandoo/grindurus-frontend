import {Button} from "@mui/material";
import React from "react";
import visible from "../../../assets/images/eye.svg";

export const POOL_TABLE_COLUMNS = [
  {
    field: "networkIcon",
    headerName: "Network",
    flex: 0,
    width: 50,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    className: "centered-cell",
    renderCell: (params) => <img src={params.value} alt="Network Icon" style={{ width: 30, height: 30 }} />
  },
  {
    field: "viewPool",
    headerName: "View",
    flex: 0,
    width: 50,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => (
      <img src={visible} alt='visible' style={{cursor: "pointer"}} onClick={() => params.row.handleViewPool(params.row.poolId)} />
    )
  },
  {
    field: "poolId",
    headerName: "Id",
    flex: 0,
    width: 50,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    editable: false,
  },
  { field: "quoteToken", headerName: "Quote Token + Base Token", flex: 1, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true, resizable: false },
  {
    field: "yieldProfit",
    headerName: "Yield Profit + Trade Profit",
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => (
      <div style={{ whiteSpace: "pre-line", textAlign: "center", lineHeight: "1.4",  minHeight: "100%", }}>
        {params.row.yieldProfit} <br /> + {params.row.tradeProfit}
      </div>
    )
  },
  { field: "start", headerName: "Start", flex: 0, width: 100, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true, resizable: false },
  { field: "apr", headerName: "APR", flex: 0, width: 100, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true, resizable: false },
  {
    field: "buyRoyalty",
    headerName: "Buy Royalty",
    flex: 0,
    width: 180,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#933DC9",
          textTransform: "none"
        }}
        onClick={() => params.row.handleBuyRoyalty(params.row.poolId, params.row.buyRoyaltyPrice)}
      >
        Buy {params.row.buyRoyaltyPrice} ETH
      </Button>
    )
  },
  {
    field: "grindPool",
    headerName: "Grind Pool",
    flex: 0,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => (
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#933DC9",
          textTransform: "none"
        }}
        onClick={() => params.row.handleGrind(params.row.poolId)}
      >
        Grind
      </Button>
    )
  },
];

