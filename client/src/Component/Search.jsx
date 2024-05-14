import  React,{useState} from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  
  Button,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setClearsearch, setSearch, setSearchCategory } from '../Redux/Slice/CriteriaSearchSlice';
import { SetPage } from '../Redux/Slice/dataSlice';

const Search = () => {
  const dispatch = useDispatch();
  const[Searchvalue,setSearchvalue] = useState(null)
  const[Searchpara,setSearchpara] = useState(null)
 

  
  const handleChange = (event) => {
    setSearchpara(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(SetPage(0));
    dispatch(setSearch(Searchvalue)); // Dispatch the search action
    dispatch(setSearchCategory(Searchpara));
     // Dispatch the search category action
  };
  const handleClearSearch = () => {
    dispatch(SetPage(0));
    dispatch(setClearsearch());
    setSearchvalue('');
    setSearchpara(null); // Dispatch the clear search action
  };

  return (
    <form
      action=""
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '14px',
        borderRadius: '4px',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        fullWidth
        value={Searchvalue}
        onChange={(e) => setSearchvalue(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="search" onClick={handleSubmit}>
                <SearchOutlined />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ width: '300px' }}
      />
      <Box sx={{ marginLeft: '16px', minWidth: 120 }}> {/* Add margin for spacing */}
        <FormControl fullWidth>
          <InputLabel id="search-field-label">Search Field</InputLabel> {/* Clearer label */}
          <Select
            labelId="search-field-label"
            id="search-field"
            label="Search Field"
            value={Searchpara}
            onChange={handleChange}
          >
            
            <MenuItem value={"name"}>Company Name</MenuItem>
            <MenuItem value={"website_url"}>Website URL</MenuItem>
            <MenuItem value={"foundedYear"}>Founded Year</MenuItem>
            <MenuItem value={"Revenue"}>Revenue</MenuItem>
            <MenuItem value={"keywords"}>Keywords</MenuItem>
            <MenuItem value={"company_email"}>Email</MenuItem>
            <MenuItem value={"location"}>Location</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ marginLeft: '16px', display: 'flex', alignItems: 'center' }}> {/* Align checkbox to the right */}
        <Button variant="contained" onClick={handleClearSearch} size="small" sx={{ marginLeft: '16px', color: 'white', fontSize: '14px' }}>
          Clear Search
        </Button>
      </Box>
    </form>
  );
};

export default Search;
