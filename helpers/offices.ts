import { type Office } from '../requests/offices'

export const getOfficeAddress = (office: Office) => {
  return `${office.street} ${office.block}${office.building !== null ? ` /${office.building}` : ''}, ${office.city} ${
    office.postCode
  }, ${office.country}`
}
