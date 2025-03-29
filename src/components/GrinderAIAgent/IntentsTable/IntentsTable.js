import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./IntentsTable.css";
import logoArbitrum from "../../../assets/images/logoArbitrum.png";
import { DataGrid } from "@mui/x-data-grid";
import { Pagination, PaginationItem } from "@mui/material";
import { useContractService } from "../../../context/ContractContext";
import debounce from 'lodash.debounce';
import { useNavigate } from "react-router-dom";
import { INTENTS_TABLE_COLUMNS } from "./constants";

const DEFAULT_PAGINATION_PARAMS = {
  pageSize: 5,
  page: 0,
};

function IntentsTable() {
  const [currentTableData, setCurrentTableData] = useState([]);
  const [tableRowsAmount, setTableRowsAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { intentsNFT, isConnected } = useContractService();
  const [paginationModel, setPaginationModel] = useState(DEFAULT_PAGINATION_PARAMS);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && intentsNFT) {
      fetchTotalIntents();
    }
  }, [isConnected, intentsNFT]);

  useEffect(() => {
    fetchLastIntents(paginationModel.page);
  }, [paginationModel]);

  const fetchTotalIntents = async () => {
    try {
      let totalIntents = await intentsNFT.totalIntents();
      setTableRowsAmount(Number(totalIntents));
    } catch (error) {
      console.error("Failed to fetch total intents", error);
    }
  };

  const fetchLastIntents = async (page) => {
    setIsLoading(true);
    try {
      let intentInfos = await intentsNFT.getIntents(0, 1, 2, 3, 4);
      console.log(intentInfos)
      setCurrentTableData(intentInfos.map((intent) => ({
        id: intent.id,
        address: intent.address,
        grinds: intent.grinds.toString(),
        poolsIds: intent.poolsIds,
      })));
    } catch (error) {
      console.error('Error fetching intents', error);
    }
    setIsLoading(false);
  };

  const handlePaginationChange = (event, value) => {
    setPaginationModel((prev) => ({ ...prev, page: value - 1 }));
  };

  const handleViewIntent = (id) => {
    navigate(`/intent/${id}`);
  };

  const rows = currentTableData.map((row, index) => ({
    id: index,
    ...row,
    handleViewIntent,
  }));

  const CustomPagination = ({ className }) => {
    return (
      <Pagination
        className={className}
        count={Math.ceil(tableRowsAmount / paginationModel.pageSize)}
        page={paginationModel.page + 1}
        onChange={handlePaginationChange}
        renderItem={(item) => <PaginationItem {...item} />}
      />
    );
  };

  return (
    <div className="intents-table">
      <div className="intents-table-header">
        <h2 className="intents-table-title">Explore intents NFTs</h2>
        <div class="intents-search search">
          <input placeholder="Search with token id or owner address" type="text" class="search-input" />
          <button class="search-button">Search</button>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={INTENTS_TABLE_COLUMNS}
          pagination
          paginationMode="server"
          loading={isLoading}
          rowCount={tableRowsAmount}
          paginationModel={paginationModel}
          hideFooterSelectedRowCount
          onRowDoubleClick={(params) => handleViewIntent(params.row.id)}
          slots={{ pagination: CustomPagination }}
          style={{ maxHeight: "800px" }}
          getRowHeight={() => "auto"}
          sx={{
            borderCollapse: "collapse",
            "& .MuiDataGrid-topContainer": {
              padding: "0",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "black",
              padding: "0",
              minHeight: "40px !important",
              maxHeight: "40px !important",
            },
            "& .MuiDataGrid-columnHeader": {
              padding: "15px !important",
              backgroundColor: "black",
              color: "white",
              borderRight: "1px solid white",
              fontWeight: "800 !important",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell": {
              padding: "35px 15px !important",
              color: "white",
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid white",
              height: "auto !important",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid white",
            },
            "& .MuiDataGrid-footerContainer": {
              justifyContent: "center",
              padding: "20px",
            },
            "& .MuiTablePagination-root": {
              backgroundColor: "black",
              color: "white",
              borderTop: "2px solid white",
            },
            "& .MuiTablePagination-root .MuiSvgIcon-root": {
              color: "white",
            },
            "& .MuiPaginationItem-root": {
              opacity: "1",
              borderRadius: "50%",
              color: "white",
              border: "1px solid white",
              padding: "10px", 
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#933DC9",
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
}

export default IntentsTable;