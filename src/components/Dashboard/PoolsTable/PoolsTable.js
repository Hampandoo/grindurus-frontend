import React, { useEffect, useState } from "react";
import {ethers} from 'ethers';
import "./PoolsTable.css";
import logoArbitrum from "../../../assets/images/logoArbitrum.png";
import { DataGrid } from "@mui/x-data-grid";
import {IconButton, InputAdornment, Pagination, PaginationItem, TextField} from "@mui/material";
import {POOL_TABLE_COLUMNS} from "./constants";
import {useContractService} from "../../../context/ContractContext";
import debounce from 'lodash.debounce';
import {useNavigate} from "react-router-dom";

const DEFAULT_PAGINATION_PARAMS = {
  pageSize: 5 ,
  page: 0,
}

function PoolsTable({ setPoolId }) {
  const [searchPoolsIds, setSearchPoolsIds] = useState([]);
  const [currentTableData, setCurrentTableData] = useState([]);
  const [tableRowsAmount, setTableRowsAmount] = useState(0);
  const [showPagination, setShowPagination] = useState(true);
  const [preparedPoolIds, setPreparedPoolIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { poolsNFT, isConnected } = useContractService();
  const [paginationModel, setPaginationModel] = useState(DEFAULT_PAGINATION_PARAMS);
  const navigate = useNavigate();

  useEffect(() => {
    if (isConnected && poolsNFT) {
      fetchTotalPools();
    }
  }, [isConnected, poolsNFT]);


  useEffect(() => {
    const ids = getPoolsIds(paginationModel, searchPoolsIds, tableRowsAmount);
    setPreparedPoolIds(ids);
  }, [paginationModel, searchPoolsIds, tableRowsAmount]);

  useEffect(() => {
    if (!poolsNFT || !preparedPoolIds.length) {
      return;
    }

    fetchLastPools(preparedPoolIds);

  }, [poolsNFT, preparedPoolIds]);

  useEffect(() => {
    if(!isConnected) {
      resetTableData();
    }
  }, [isConnected]);

  const fetchTotalPools = async () => {
    try {
      let totalPools = await poolsNFT.totalPools();
      setTableRowsAmount(Number(totalPools));
    } catch (error) {
      console.error("Failed to fetch total pools", error);
      resetTableData();
    }
  };

  const fetchLastPools = async (poolsIds) => {
    setIsLoading(true);
    try {
      let poolNFTInfos = await poolsNFT.getPoolNFTInfosBy(poolsIds);
      setCurrentTableData(formTabledata(poolNFTInfos));

    } catch (error) {
      console.log('error', error);
    }
    setIsLoading(false);
  };

  const formTabledata = (poolNFTInfos) => {
    // console.log(poolNFTInfos)
    let tableData = poolNFTInfos.map((poolNFTInfo) => {
      const poolId = poolNFTInfo.poolId.toString();
      const quoteTokenAddress = poolNFTInfo.quoteToken;
      const baseTokenAddress = poolNFTInfo.baseToken;

      const quoteTokenSymbol = poolNFTInfo.quoteTokenSymbol
      const baseTokenSymbol = poolNFTInfo.baseTokenSymbol
      const quoteTokenDecimals = poolNFTInfo.quoteTokenDecimals
      const baseTokenDecimals = poolNFTInfo.baseTokenDecimals
      const totalProfits = poolNFTInfo.totalProfits
      const roi = poolNFTInfo.roi
      const quoteTokenAmount = ethers.formatUnits(poolNFTInfo.quoteTokenAmount, quoteTokenDecimals)
      const baseTokenAmount = ethers.formatUnits(poolNFTInfo.baseTokenAmount, baseTokenDecimals)
      const quoteTokenYieldProfit = parseFloat(ethers.formatUnits(totalProfits.quoteTokenYieldProfit, quoteTokenDecimals)).toFixed(Number(quoteTokenDecimals))
      const baseTokenYieldProfit = parseFloat(ethers.formatUnits(totalProfits.baseTokenYieldProfit, baseTokenDecimals)).toFixed(Number(baseTokenDecimals))
      const quoteTokenTradeProfit = parseFloat(ethers.formatUnits(totalProfits.quoteTokenTradeProfit, quoteTokenDecimals)).toFixed(Number(quoteTokenDecimals))
      const baseTokenTradeProfit = parseFloat(ethers.formatUnits(totalProfits.baseTokenTradeProfit, baseTokenDecimals)).toFixed(Number(baseTokenDecimals))
      const start = new Date(Number(poolNFTInfo.startTimestamp) * 1000).toDateString();
      const aprNumerator = Number(roi.ROINumerator) * Number(365 * 30 * 24 * 60);
      const aprDenominator = Number(roi.ROIDeniminator) * Number(roi.ROIPeriod);
      const apr = aprDenominator > 0 ? `${((aprNumerator / aprDenominator) * 100).toFixed(2)}%` : "N/A"
      const royaltyParams = poolNFTInfo.royaltyParams;
      console.log(royaltyParams)
      const royaltyPrice = ethers.formatUnits(royaltyParams.newRoyaltyPrice, quoteTokenDecimals)

      return {
        networkIcon: logoArbitrum,
        poolId: poolId,
        quoteToken: `${quoteTokenAmount} ${quoteTokenSymbol} + ${baseTokenAmount} ${baseTokenSymbol}`,
        yieldProfit: `${quoteTokenYieldProfit} ${quoteTokenSymbol} + ${baseTokenYieldProfit} ${baseTokenSymbol}`,
        tradeProfit: `${quoteTokenTradeProfit} ${quoteTokenSymbol} + ${baseTokenTradeProfit} ${baseTokenSymbol}`,
        start: start,
        apr: apr,
        buyRoyaltyPrice: `${royaltyPrice}`,
      };
    })
    return tableData
  }

  const getPoolsIds = (paginationParams, ids, totalPools) => {
    const { page, pageSize } = paginationParams;
    let startIdx = page * pageSize;
    const maxIdx = Math.min(startIdx + pageSize, totalPools);

    return  ids.length > 0 ? ids : Array.from(
      { length: maxIdx - startIdx },
      (_, i) => startIdx + i
    );
  };


  const handlePaginationChange = (event, value) => {
    setPaginationModel((prev) => ({ ...prev, page: value - 1 }));
  };

  const handleViewPool = (poolId) => {
    navigate(`/pool/${poolId}`);
  }

  const resetTableData = () => {
    setCurrentTableData([]);
    setTableRowsAmount(0);
    setPaginationModel({ pageSize: 5, page: 0 });
  }

  const handleGrind = async (poolId) => {
    try {
      const estimatedGasLimit = await poolsNFT.grind.estimateGas(poolId);
      const adjustedGasLimit = estimatedGasLimit * 15n / 10n

      const tx = await poolsNFT.grind(poolId, {gasLimit: adjustedGasLimit});
      await tx.wait()

    } catch (error) {
      console.log("Failed to grind", error);
    }
  }

  const handleBuyRoyalty = async (poolId) => {
    try {
      const royaltyShares = await poolsNFT.calcRoyaltyPriceShares(poolId);
      const tx = await poolsNFT.buyRoyalty(poolId, {value: royaltyShares.newRoyaltyPrice});
      await tx.wait()

    } catch (error) {
      console.log("Failed to buy royalty", error);
    }
  }

  const handleSearch = debounce(async (event) => {
    const value = event.target.value;
    try {
      let searchIds = [];

      if (value.startsWith("0x")) {
        const response = await poolsNFT.getPoolIdsOf(value);
        searchIds = Object.values(response.poolIdsOwnedByPoolOwner).map(Number);
      }

      else if (value !== '' && typeof Number(value) === 'number') {
        searchIds = [value];
      }

      if (searchIds.length) {
        setShowPagination(false);
        setPaginationModel(DEFAULT_PAGINATION_PARAMS);
      } else {
        setShowPagination(true);
      }

      setSearchPoolsIds(searchIds);

    } catch (error) {
      resetTableData();
      console.log('failed to search', error);
    }
  }, 300);

  const rows = currentTableData.map((row, index) => ({
    id: index,
    ...row,
    handleBuyRoyalty,
    handleGrind,
    handleViewPool
  }));

  const CustomPagination = ({ className }) => {
    if (!showPagination || !rows.length) return null;

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
    <div className="pools-table-container">
      <div class="pools-table-header">
        <h2 class="pools-table-title title">Explore All Pools</h2>
        <div class="pools-table-search search">
          <input onChange={handleSearch} placeholder="Search with pool id or owner address" type="text" class="search-input" />
          <button class="search-button">Search</button>
        </div>
			</div>
      <div style={{ width: "100%"}}>
        <DataGrid
          rows={rows}
          columns={POOL_TABLE_COLUMNS}
          pagination={showPagination}
          paginationMode="server"
          loading={isLoading}
          rowCount={tableRowsAmount}
          paginationModel={paginationModel}
          hideFooterSelectedRowCount
          onRowDoubleClick={(params) => handleViewPool(params.row.poolId)}
          slots={{ pagination: CustomPagination }}
          style={{maxHeight: "800px"}}
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-columnHeader:focus": {

            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              height: "auto !important",
              minHeight: "80px !important",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: 'none',
            },
            "& .MuiDataGrid-row": {
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "2px solid rgba(224, 224, 224, 1)",
            },
            "& .MuiDataGrid-footerContainer": {
              justifyContent: "center",
            },
          }}
        />
      </div>
    </div>
  );
}

export default PoolsTable;