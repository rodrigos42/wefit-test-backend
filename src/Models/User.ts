import UserSequelize from "./Sequelize/UserSequelize";

export interface iUser {
    name: string;
    email: string;
    cellphone: string;
    telephone: string;
    legalPerson: boolean;
    cnpj: string;
    cpf: string;
    addressId: number;
    termsAgreementAccepted?: boolean;
}

export class User implements iUser {
    public name!: string;
    public email!: string;
    public cellphone!: string;
    public telephone!: string;
    public legalPerson!: boolean;
    public cnpj!: string;
    public cpf!: string;
    public termsAgreementAccepted?: boolean;
    public addressId!: number;

    private _isEmptyUser: boolean
    private _userSequelize: typeof UserSequelize

    constructor(data: iUser | number | undefined) {
        if (!data) {
            this.name = '';
            this.email = '';
            this.cellphone = '';
            this.telephone = '';
            this.legalPerson = false;
            this.cnpj = '';
            this.cpf = '';
            this.termsAgreementAccepted = false;
            this.addressId = 0

            this._isEmptyUser = true;

        } else if (typeof data == 'number') {

        } else {
            this.name = data.name;
            this.email = data.email;
            this.cellphone = data.cellphone;
            this.telephone = data.telephone;
            this.legalPerson = data.legalPerson;
            this.cnpj = data.cnpj;
            this.cpf = data.cpf;
            this.termsAgreementAccepted = data.termsAgreementAccepted;
            this.addressId = data.addressId;

            this._isEmptyUser = false;
        }

        this._userSequelize = UserSequelize
    }

    get(): iUser {
        return {
            name: this.name,
            email: this.email,
            cellphone: this.cellphone,
            telephone: this.telephone,
            legalPerson: this.legalPerson,
            cnpj: this.cnpj,
            cpf: this.cpf,
            termsAgreementAccepted: this.termsAgreementAccepted,
            addressId: this.addressId
        };
    }

    private _set(data: iUser) {
        this.name = data.name;
        this.email = data.email;
        this.cellphone = data.cellphone;
        this.telephone = data.telephone;
        this.legalPerson = data.legalPerson;
        this.cnpj = data.cnpj;
        this.cpf = data.cpf;
        this.termsAgreementAccepted = data.termsAgreementAccepted;
        this.addressId = data.addressId;

        return this.get()
    }

    async getByID(id: number) {
        const userById = await this._userSequelize.findByPk(id)
            .then(resp => {
                if (!resp) {
                    throw new Error("user id not found")
                }
                return resp
            })
        
        return this._set(userById.dataValues)
    }

    async create() {
        if (this._isEmptyUser) {
            throw new Error('Empty user can not be created')
        }

        return await this._userSequelize.findOrCreate({
            where: {
                cnpj: this.cnpj,
                cpf: this.cpf
            },
            defaults: {
                name: this.name,
                email: this.email,
                cellphone: this.cellphone,
                telephone: this.telephone,
                legalPerson: this.legalPerson,
                cnpj: this.cnpj,
                cpf: this.cpf,
                termsAgreementAccepted: this.termsAgreementAccepted,
                addressId: this.addressId
            }
        }).then(([user, created]) => {
            return {
                user,
                created
            }
        })
    }

    async update() {
    }

    async delete() {
    }
}