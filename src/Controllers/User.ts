import { User, iUser } from "../Models/User";
import isValidCPForCNPJ from "../utils/cpfCnpj";

export default class UserController {
    private _userModel: User;

    constructor(data?: iUser) {
        this._userModel = new User(data);
    }

    async getById(id: number) {
        return await this._userModel.getByID(id)
    }

    async create() { 
        return await this._userModel.create()
            .then(resp => {
            return {
                    created: resp.created,
                    user: resp.user,
                    errMessage: resp.created ? '' : 'CONFLICT'
                }
            })
    }

    async bodyValidation(body: any) {
        const userData = this._userModel.get() as { [key: string]: any };
        const userAttrib = Object.keys(userData);

        for (const key of userAttrib) {
            if (!body.hasOwnProperty(key)) {
                throw new Error(`${key} is missing`);
            }

            const userType = typeof userData[key];
            const bodyType = typeof body[key];
            if (userType !== bodyType) {
                throw new Error(`${key} as ${bodyType} not acceptable - must be ${userType}`);
            }

            if (bodyType == 'string') {
                if (body[key] == '') {
                    throw new Error(`${key} is empty`)
                }
            }

            switch (key) {
                case 'termsAgreementAccepted':
                    if (!body[key]) { throw new Error(`termsAgreement must be accepted`) }
                    break
                case 'email':
                    if(body[key] != body['confirmEmail']) { throw new Error('confirmEmail does not match') }
                    break
                default:
                    break
            } 
            
            if  (key == 'cpf' || key == 'cnpj')  {
                if  (!isValidCPForCNPJ(body[key])) {
                    throw new Error(`${key} is invalid`)
    } else {
                   body[key] = body[key].replace(/\D/g, '')
    } 
            }
        }

                    return true;
    }
}