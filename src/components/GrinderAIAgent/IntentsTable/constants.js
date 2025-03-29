import { Button } from "@mui/material";
import React from "react";

export const INTENTS_TABLE_COLUMNS = [
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
    field: "id",
    headerName: "Id",
    flex: 0,
    width: 100,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    editable: false,
  },
  {
    field: "address",
    headerName: "Address",
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: () => "0xCfbC75f82D5F834dB119b3EFEC0aAf68149e0f81"
  },
  {
    field: "grinds",
    headerName: "Grinds",
    flex: 0,
    width: 100,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
  },
  {
    field: "poolsIds",
    headerName: "Pools IDs",
    flex: 1,
    align: "center",
    headerAlign: "center",
    sortable: false,
    disableColumnMenu: true,
    resizable: false,
    renderCell: (params) => params.value.join(", ")
  }
];
