import { Address, iAddress } from "../Models/Address";

export default class AddressController {
    private _addressModel: Address;

    constructor(data?: iAddress) {
        this._addressModel = new Address(data)
    }

    async findOrCreate() {
        return await this._addressModel.create()
    }

    async bodyValidation(body: any) {
        const addressData = this._addressModel.get() as { [key: string]: any }
        const addressAttrib = Object.keys(addressData)

        for (const key of addressAttrib) {
            if (!body.hasOwnProperty(key)) {
                throw new Error(`address.${key} is missing`)
            }

            const addressType = typeof addressData[key]
            const bodyType = typeof body[key]
            if (addressType != bodyType) {
                throw new Error(`address.${key} as ${bodyType} not aceptable - must be ${addressType}`)
            }

            if(bodyType == 'string'){
                if(body[key] == ''){
                    throw new Error(`address.${key} is empty`)
                }
            }
        }

        return true 
    }
}