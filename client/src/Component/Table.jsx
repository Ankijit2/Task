import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Error from "./Error.jsx";
import FilterMenu from "./Filtercomp.jsx";
import { useFetchCompanyData } from "../Hooks/FetchData.js";

import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";

import Search from "./Search";
// import Filtercomp from "./Filtercomp";
import Tabledatacomp from "./Tabledatacomp.jsx";
import Loader from "./Loader.jsx";
import { SetPage } from "../Redux/Slice/dataSlice.js";

function TableData() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  console.log(data)
  
  useFetchCompanyData(data.page);

  const company = data.companydata;

  const changepage = (event, newPage) => {
    dispatch(SetPage(newPage));
  };

  const columns = [
    { id: "name", label: "Company Name", align: "center" },
    { id: "website_url", label: "Website URL", align: "center" },
    { id: "foundedYear", label: "Founded Year", align: "center" },
    { id: "Revenue", label: "Revenue", align: "center" },
    { id: "keywords", label: "Keywords", align: "center" },
    { id: "company_email", label: "Email", align: "center" },
    { id: "location", label: "Location", align: "center" },
  ];

  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: "90vw" }}>
          <TableHead
            sx={{ background: "linear-gradient(to right, #396afc, #2948ff)" }}
          >
            <TableRow>
              <TableCell
                colSpan={3}
                align="left"
                sx={{ fontSize: "28px", color: "white" }} 
              >
                Companydata
              </TableCell>
              <TableCell
                colSpan={2}
                align="right"
                sx={{ fontSize: "20px", color: "white" }}
              >
                <FilterMenu />
              </TableCell>
              <TableCell
                colSpan={2}
                align="right"
                sx={{ fontSize: "20px", color: "white" }}
              >
                <Search />
              </TableCell>
            </TableRow>

            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{ fontSize: "20px", color: "white" }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{ position: "relative", height: "70vh", width: "100vw" }}
          >
            {data.error?  <Error /> : (!data.loading ? <Tabledatacomp /> : <Loader />)}

            

          </TableBody>
        </Table>
        <TablePagination
          component="div"
          sx={{
            background: "linear-gradient(to right, #396afc, #2948ff)",
            color: "white",
          }}
          rowsPerPageOptions={[]}
          count={company?.pagination.totaldata || 0}
          page={data.page || 0}
          rowsPerPage={10}
          onPageChange={changepage}
        />
      </TableContainer>
    </>
  );
}

export default TableData;
