import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface ServiceState {
  organizationId: string | null
  officeId: string | null
  address: string | null
  service: string | null
}

const initialState: ServiceState = {
  organizationId: null,
  officeId: null,
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
    setOfficeId: (state, action: PayloadAction<string>) => {
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

export const { setOrganizationId, setOfficeId, setAddress, setService } = serviceSlice.actions

export default serviceSlice.reducer
