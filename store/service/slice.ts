import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ServiceState {
  organizationId: string | null
  office: string | null
  address: string | null
  service: string | null
}

const initialState: ServiceState = {
  organizationId: null,
  office: null,
  address: null,
  service: null
}

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setOrganizationId: (state, action: PayloadAction<string>) => {
      state.organizationId = action.payload
    },
    setOffice: (state, action: PayloadAction<string>) => {
      state.service = action.payload
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.service = action.payload
    },
    setService: (state, action: PayloadAction<string>) => {
      state.service = action.payload
    }
  }
})

export const { setOrganizationId, setOffice, setAddress, setService } = serviceSlice.actions

export default serviceSlice.reducer
