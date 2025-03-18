import React, { useEffect, useState } from "react";
import {ethers} from 'ethers';
import "./PoolsTable.css";
import logoArbitrum from "../../../assets/images/logoArbitrum.png";
import { DataGrid } from "@mui/x-data-grid";
import { Pagination, PaginationItem, TextField} from "@mui/material";
import {POOL_TABLE_COLUMNS} from "./constants";
import {useContractService} from "../../../context/ContractContext";

function PoolsTable({ setPoolId }) {
  const [searchPoolsIds, setSearchPoolsIds] = useState([]);
  const [currentTableData, setCurrentTableData] = useState([]);
  const [tableRowsAmount, setTableRowsAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { poolsNFT } = useContractService();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5 ,
    page: 0,
  });

  useEffect(() => {
    if (!poolsNFT) {
      setCurrentTableData([]);
      setTableRowsAmount(0);
      setPaginationModel({ pageSize: 5, page: 0 });
    }

    console.log('searchPoolsIds', searchPoolsIds);

    const poolsIds = getPoolsIds(paginationModel.page, paginationModel.pageSize, searchPoolsIds);
    fetchLastPools(poolsIds);

    if (!searchPoolsIds.length) {
      fetchTotalPools();
    }
  }, [poolsNFT, paginationModel.page, paginationModel.pageSize, tableRowsAmount, searchPoolsIds]);

  const fetchTotalPools = async () => {
    try {
      let totalPools = await poolsNFT.totalPools();
      setTableRowsAmount(Number(totalPools));
    } catch (error) {
      console.error("Failed to fetch total pools", error);
      setTableRowsAmount(0);
    }
  };

  const fetchLastPools = async (poolsIds) => {
    setIsLoading(true);
    try {
      let poolNFTInfos = await poolsNFT.getPoolNFTInfosBy(poolsIds);
      setCurrentTableData(formTabledata(poolNFTInfos));

    } catch (error) {
      console.error("Failed to fetch pools", error);
      setCurrentTableData([]);
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
      const APR = poolNFTInfo.apr
      const quoteTokenAmount = ethers.formatUnits(poolNFTInfo.quoteTokenAmount, quoteTokenDecimals)
      const baseTokenAmount = ethers.formatUnits(poolNFTInfo.baseTokenAmount, baseTokenDecimals)
      const quoteTokenYieldProfit = parseFloat(ethers.formatUnits(totalProfits.quoteTokenYieldProfit, quoteTokenDecimals)).toFixed(Number(quoteTokenDecimals))
      const baseTokenYieldProfit = parseFloat(ethers.formatUnits(totalProfits.baseTokenYieldProfit, baseTokenDecimals)).toFixed(Number(baseTokenDecimals))
      const quoteTokenTradeProfit = parseFloat(ethers.formatUnits(totalProfits.quoteTokenTradeProfit, quoteTokenDecimals)).toFixed(Number(quoteTokenDecimals))
      const baseTokenTradeProfit = parseFloat(ethers.formatUnits(totalProfits.baseTokenTradeProfit, baseTokenDecimals)).toFixed(Number(baseTokenDecimals))
      console.log(poolNFTInfo.startTimestamp)
      const start = new Date(Number(poolNFTInfo.startTimestamp) * 1000).toDateString();
      const aprNumerator = Number(APR.APRNumerator);
      const aprDenominator = Number(APR.APRDenominator);
      const apr = aprDenominator > 0 ? `${((aprNumerator / aprDenominator) * 100).toFixed(2)}%` : "N/A"
      const royaltyPrice = ethers.formatUnits(poolNFTInfo.royaltyPrice, 18)

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

  const getPoolsIds = (page, pageSize, ids) => {
    let startIdx = page * pageSize;
    return  ids.length > 0 ? ids : Array.from(
      { length: Math.min(pageSize, tableRowsAmount - startIdx) },
      (_, i) => startIdx + i
    );
  };


  const handlePaginationChange = (event, value) => {
    setPaginationModel((prev) => ({ ...prev, page: value - 1 }));
  };

  const handleViewPool = (poolId) => {
    setPoolId(poolId)
  }

  const handleGrind = async (poolId) => {
    try {
      // console.log(poolsNFT)
      const estimatedGasLimit = await poolsNFT.grind.estimateGas(poolId);
      // console.log(estimatedGasLimit)
      const adjustedGasLimit = estimatedGasLimit * 15n / 10n
      // console.log(adjustedGasLimit)
  
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

  const handleSearch = async (event) => {
    const value = event.target.value;
    try {
      if (value.startsWith("0x")) {
        const response = await poolsNFT.getPoolIdsOf(value);
        setSearchPoolsIds(response.poolIdsOwnedByPoolOwner);

        return;
      }

      if (value !== '' && typeof Number(value) === 'number') {
        setSearchPoolsIds([value]);
        setPaginationModel({ pageSize: 5, page: 0 });
        setTableRowsAmount(0);

        return;
      }
      if (searchPoolsIds.length) {
        setSearchPoolsIds([]);
      }
    } catch (error) {
      console.log('failed to search', error)
    }

  }

  const rows = currentTableData.map((row, index) => ({
    id: index,
    ...row,
    handleBuyRoyalty,
    handleGrind,
    handleViewPool
  }));

  const CustomPagination = ({ className }) => {
    if (!tableRowsAmount) return null;

    return (
      <Pagination
        className={className}
        count={Math.ceil(tableRowsAmount / paginationModel.pageSize)} // Загальна кількість сторінок, заміни на динамічне значення
        page={paginationModel.page + 1}
        onChange={handlePaginationChange}
        renderItem={(item) => <PaginationItem {...item} />}
      />
    );
  };

  return (
    <div className="pools-table-container">
      <h2>Pools NFTs</h2>

      <div className="filters-and-pagination">

        <div className="filters">
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="pool id / strategy id / address"
            onChange={handleSearch}
          />
        </div>
      </div>
      <div style={{height: "fit-content", width: "100%"}}>
        <DataGrid
          rows={rows}
          columns={POOL_TABLE_COLUMNS}
          pagination={tableRowsAmount > 0}
          paginationMode="server"
          loading={isLoading}
          paginationModel={paginationModel}
          hideFooterSelectedRowCount
          slots={{ pagination: CustomPagination }}
          getRowHeight={() => "auto"} // Авто-висота для адаптації
          sx={{
            "& .MuiDataGrid-cell": {
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid rgba(224, 224, 224, 1)",
              height: "auto !important", // Примушує збільшення висоти
              minHeight: "80px !important", // Мінімальна висота рядка
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