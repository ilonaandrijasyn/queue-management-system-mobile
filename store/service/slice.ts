import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ServiceState {
  service: string | null
}

const initialState: ServiceState = {
  service: null
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setService: (state, action: PayloadAction<string>) => {
      state.service = action.payload
    }
  }
})

export const { setService } = serviceSlice.actions

export default serviceSlice.reducer
