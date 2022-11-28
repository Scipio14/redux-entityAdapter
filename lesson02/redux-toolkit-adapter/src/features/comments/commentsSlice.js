/**
 * Lesson02 using the entities selector
 */

import {createSlice,createEntityAdapter,createAsyncThunk} from '@reduxjs/toolkit'

export const fetchComments = createAsyncThunk("comments/fetchComments",async ()=>{
  return  await fetch('https://jsonplaceholder.typicode.com/comments?_limit=10').then(res=>  res.json())
})

const commentsAdapter = createEntityAdapter({
  selectId:(comment)=>comment.id
})


const commentsSlice = createSlice({
  name:"comments",
  initialState:commentsAdapter.getInitialState({loading:false}),
  reducers:{
    
  },
  extraReducers:{
    [fetchComments.pending](state){
      state.loading = true
    },
    [fetchComments.fulfilled](state,{payload}){
      state.loading = false;
      commentsAdapter.setAll(state,payload)
    },
    [fetchComments.rejected](state){
      state.loading = false
      
    }
  }
})

//Using the selectors
export const commentsSelectors = commentsAdapter.getSelectors(state=>state.comments)
// export const {
//   selectIds,//selects only the ids
//   selectById,//retrieves one with the id provided
//   selectTotal,//returns entities and ids
//   selectEntities,//returns only the entities
//   selectAll// returns all the information
// } = commentsSelectors

export default commentsSlice.reducer;