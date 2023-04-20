import * as Application from 'expo-application'
import * as Device from 'expo-device'

export const getPhoneId = async () => {
  if (Device.manufacturer === 'Apple') {
    return await Application.getIosIdForVendorAsync()
  }
  return Application.androidId
}
