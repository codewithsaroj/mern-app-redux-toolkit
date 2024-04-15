import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios"


const initialState = {
  updateState:false,
  loading:false,
  employeeList:[],
  employee:{},
  error:'',
  response:""
};


const fetchEmployees = createAsyncThunk(
  "employee/fetchEmployees",
  async ()=>{
    const response = await axios.get("http://localhost:5000/users");
    return response.data.result;
  }
);

const fetchEmployee = createAsyncThunk(
  "employee/fetchEmployee",
  async (data)=>{
    const response = await axios.get("http://localhost:5000/user/"+data.id);
    return response.data.result;
  }
)


const addEmployee = createAsyncThunk(
  "employee/addEmployee",
  async (data)=>{
    const response = await axios.post("http://localhost:5000/addUser",{name:data.name, role:data.role});
    return response.data.result;
  }
)


const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (data)=>{
    const response = await axios.patch("http://localhost:5000/user/"+data.id);
    return response.data.result;
  }
)

const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (data)=>{
    const response = await axios.delete("http://localhost:5000/user/"+data.id);
    return response.data.result;
  }
)

const employeeSlice = createSlice({
  name:'employee',
  initialState:initialState,
  extraReducers:(builder)=>{
    builder.addCase(addEmployee.pending, (state)=>{
      state.loading = true;
    }).addCase(addEmployee.fulfilled, (state,action)=>{
      state.loading =false;
      state.employeeList.push(action.payload);
      //state.response = 'add'
    }).addCase(addEmployee.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.error.message
    });

    builder.addCase(fetchEmployees.pending, (state)=>{
      state.loading = true;
    }).addCase(fetchEmployees.fulfilled, (state, action)=>{
      state.employeeList = action.payload;
      state.loading= false;
    }).addCase(fetchEmployees.rejected, (state, action)=>{
      state.error = action.payload;
      state.loading= false;
    });

    builder.addCase(fetchEmployee.pending, (state)=>{
      state.loading = true
    }).addCase(fetchEmployee.fulfilled, (state, action)=>{
      state.loading =false;
      state.employee = action.payload
    }).addCase(fetchEmployee.rejected, (state, action)=>{
      state.loading = false;
      state.error = action.payload
    });

    builder.addCase(updateEmployee.pending, (state,action)=>{
      state.loading = true;
    }).addCase(updateEmployee.fulfilled, (state, action)=>{
      state.loading = false;
    }).addCase(updateEmployee.rejected, (state,action)=>{
      state.error = action.payload
    });

    builder.addCase(deleteEmployee.pending, (state,action)=>{
      state.loading = false;
    }).addCase(deleteEmployee.fulfilled, (state, action)=>{
      state.loading = false
    }).addCase(deleteEmployee.rejected, (state, action)=>{
      state.loading = false
    })

  }

});


export default employeeSlice.reducer;

export  {addEmployee, updateEmployee, deleteEmployee, fetchEmployee, fetchEmployees};