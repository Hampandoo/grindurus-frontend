import {Button} from "@mui/material";
import React from "react";

export const POOL_TABLE_COLUMNS = [
  {
    field: "networkIcon",
    headerName: "Network",
    minWidth: 80,
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    className: "centered-cell",
    renderCell: (params) => <img src={params.value} alt="Network Icon" style={{ width: 30, height: 30 }} />
  },
  { field: "poolId", headerName: "Pool ID", minWidth: 80, flex: 1, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true, resizable: false },
  { field: "quoteToken", headerName: "Quote Token + Base Token", width: 200, flex: 1, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true, resizable: false },
  {
    field: "yieldProfit",
    headerName: "Yield Profit + Trade Profit",
    minWidth: 300,
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
  { field: "start", headerName: "Start", width: 150, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true, resizable: false },
  { field: "apr", headerName: "APR", width: 80, align: "center", headerAlign: "center", sortable: false, disableColumnMenu: true, resizable: false },
  {
    field: "buyRoyalty",
    headerName: "Buy Royalty",
    minWidth: 180,
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="primary"
        onClick={() => params.row.handleBuyRoyalty(params.row.poolId, params.row.buyRoyaltyPrice)}
      >
        Buy {params.row.buyRoyaltyPrice} ETH
      </Button>
    )
  },
  {
    field: "grindPool",
    headerName: "Grind Pool",
    minWidth: 150,
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => params.row.handleGrind(params.row.poolId)}
      >
        Grind
      </Button>
    )
  },
  {
    field: "viewPool",
    headerName: "View Pool",
    minWidth: 150,
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => (
      <Button
        variant="outlined"
        onClick={() => params.row.handleViewPool(params.row.poolId)}
      >
        View
      </Button>
    )
  }
];

