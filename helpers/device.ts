import * as Application from 'expo-application'
import * as Device from 'expo-device'

export const getPhoneId = async () => {
  const manufacturer = Device.manufacturer
  if (manufacturer === 'Apple') {
    return await Application.getIosIdForVendorAsync()
  }
  if (manufacturer === 'Google' || manufacturer === 'xiaomi') {
    return Application.androidId
  }
  return null
}
