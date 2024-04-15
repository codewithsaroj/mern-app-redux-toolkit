import React, { useEffect } from 'react';
import {fetchEmployees} from "../features/employeeSlice";
import {useDispatch, useSelector} from "react-redux"

const EmployeeList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state)=>state.employee);
  console.log(data)
  useEffect(()=>{
    dispatch(fetchEmployees())
  },[]);

  return (
    <div>EmployeeList</div>
  )
}

export default EmployeeList