import React, { useState } from 'react';
import { Button, Menu, MenuItem, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {  useDispatch } from 'react-redux';
import { FilterListOutlined } from '@mui/icons-material';
import { clearfilter, setFilterCriteria, setIsAscending } from '../Redux/Slice/FilterSlice';
import { SetPage } from '../Redux/Slice/dataSlice';



const FilterMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  
  const [Sortcriteria,setSortcriteria] = useState(null)
  const [Sortorder,setSortorder] = useState(null)

 

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = () => {
    setSortorder(!Sortorder)
  };

  const handleCategoryChange = (event) => {
    setSortcriteria(event.target.value);
  };

  const handleSubmit = (e) => {
    dispatch(SetPage(0));
    e.preventDefault()
    dispatch(setFilterCriteria(Sortcriteria))
    dispatch(setIsAscending(Sortorder))
    handleClose();
  };

  const handleClearFilter = () => {
    dispatch(SetPage(0));
    dispatch(clearfilter());
    setSortcriteria(null);
    setSortorder(null);
     // Reset filter criteria
  };

  return (
    <div>
      <Button
        id="filter-button"
        aria-controls={open ? 'filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ color: 'white', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }} // Custom button styles
        startIcon={<FilterListOutlined />}
      >
        Filter
      </Button>
      <Menu
        component={"div"}
        id="filter-menu"
        aria-labelledby="filter-button"
        anchorEl={anchorEl}
        open={open}
        sx={{ width: '300px' }} // Set width for the menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box component={"div"} sx={{ display: 'flex', justifyContent: 'flex-end' ,padding:"10px"}}>
          <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer', color: 'red', border: '1px solid red', borderRadius: '50%'  }} />
          </Box>
       
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* Added spacing and positioning for close button */}

           

            <TextField label="category" select value={Sortcriteria} name="category" onChange={handleCategoryChange} sx={{ width: '250px' }}>
              <MenuItem value="foundedYear">Founded Year</MenuItem>
              <MenuItem value="Revenue">Revenue</MenuItem>
            </TextField>
          </Box>

          <TextField
            label="Sort By"
            select
            value={Sortorder}
            onChange={handleSortChange}
            sx={{ width: '250px' }}
          >
            <MenuItem value={true}>Ascending</MenuItem>
            <MenuItem value={false}>Descending</MenuItem>
          </TextField>

          <Box sx={{ mt: '16px' , display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}> {/* Maintained spacing for filter buttons */}
            <Button variant="contained" type="submit" color="primary" onClick={handleSubmit}>
              Filter
            </Button>
            <Button variant="outlined" color="error" onClick={handleClearFilter}>
              Clear Filter
            </Button>
          </Box>
        </form>
      </Menu>
    </div>
  );
};

export default FilterMenu;
