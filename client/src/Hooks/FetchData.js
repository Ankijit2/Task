import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetPage, clearError, setData } from "../Redux/Slice/dataSlice";
import { setisLoading, setError } from "../Redux/Slice/dataSlice"; // Assuming your dataSlice file is named dataSlice.js

const useFetchCompanyData = (page) => {
  const dispatch = useDispatch();
  const [Message, setMessage] = useState(null);
  const baseurl = "http://localhost:4000/api/companydetails";
  const SearchField = useSelector((state) => state.CriteriaSearch?.SearchField);
  const SearchCategory = useSelector((state) => state.CriteriaSearch?.SearchCategory);

  const filtercriteria = useSelector((state) => state.Filter?.filtercriteria);
  const isAscending = useSelector((state) => state.Filter?.isAscending);


  

 

  useEffect(() => {
    
    const fetchData = async () => {
      dispatch(setisLoading(true));
      dispatch(clearError());
     
     
      try {
        const response = await axios.get(
          `${baseurl}?page=${page}&searchfield=${SearchField}&searchcategory=${SearchCategory}&filtercriteria=${filtercriteria}&isAscending=${isAscending}`,
          { withCredentials: true }

        );
        const companydata = response.data.details;
        console.log(companydata);
        

        setMessage("Data fetched successfully");

        dispatch(setData(companydata));
        
      } catch (err) {
        dispatch(setError(err.response.data.details.message));
        console.log(err);
      } finally {
        dispatch(setisLoading(false));
      }
    };

    fetchData();
  }, [page, SearchField, SearchCategory, filtercriteria, isAscending]);

  return Message;
};



export { useFetchCompanyData};
