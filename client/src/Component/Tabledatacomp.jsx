import React from 'react'
import { useSelector } from 'react-redux';
import {  TableRow, TableCell } from '@mui/material';



function Tabledatacomp() {
   
    const data = useSelector(state => state.data)
    const company = data.companydata;
    

  

  return (
  <>
    {company && company.companyData.map((row) => (
        <TableRow key={row._id}>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.website_url}</TableCell>
          <TableCell align="center">{row.foundedYear}</TableCell>
          <TableCell align="center">{row.Revenue}$</TableCell>
          <TableCell align="center">{row.keywords}</TableCell>
          <TableCell align="center">{row.company_email}</TableCell>
          <TableCell align="center">{row.location}</TableCell>
        </TableRow>
      ))}

     
  </>
  )
}

export default Tabledatacomp