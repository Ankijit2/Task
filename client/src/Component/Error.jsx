import React from 'react';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';


const Error = () => {
  const errormessage = useSelector((state) => state.data?.errormessage) || "Something went wrong!";
  return (
    
      <Alert severity="error" sx={{ position: 'absolute', left: '40%', top: '40%', fontSize: '20px' }}>
        This is an error alert — <strong>{errormessage}</strong>
      </Alert>
  );
};

export default Error;