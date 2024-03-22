import AddressSequelize from "./Sequelize/AddressSequelize";

export interface iAddress {
    zipCode: string;
    name: string;
    number: number;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
}

export class Address implements iAddress {
    public zipCode!: string;
    public name!: string;
    public number!: number;
    public complement?: string;
    public neighborhood!: string;
    public city!: string;
    public state!: string;

    private _isEmptyAddress: boolean;
    private _AddressSequelize: typeof AddressSequelize

    constructor(data: iAddress | undefined) {
        if (!data) {
            this.zipCode = '';
            this.name = '';
            this.number = 0;
            this.complement = '';
            this.neighborhood = '';
            this.city = '';
            this.state = '';

            this._isEmptyAddress = true
        } else {
            this.zipCode = data.zipCode;
            this.name = data.name;
            this.number = data.number;
            this.complement = data.complement;
            this.neighborhood = data.neighborhood;
            this.city = data.city;
            this.state = data.state;

            this._isEmptyAddress = false
        }

        this._AddressSequelize = AddressSequelize
    }

    get(): iAddress {
        return {
            zipCode: this.zipCode,
            name: this.name,
            number: this.number,
            complement: this.complement,
            neighborhood: this.neighborhood,
            city: this.city,
            state: this.state
        }
    }

    private _set(data: iAddress): iAddress {
        this.zipCode = data.zipCode;
        this.name = data.name;
        this.number = data.number;
        this.complement = data.complement;
        this.neighborhood = data.neighborhood;
        this.city = data.city;
        this.state = data.state;
    
        return this.get();
    }

    async getByID(id: number) {
        const addressById = await this._AddressSequelize.findByPk(id)
            .then(resp => {
                if (!resp) {
                    throw new Error("addresss id not found")
                }
                return resp
            })
        
        return this._set(addressById.dataValues)
    }

    async create() {
        if (this._isEmptyAddress) {
            throw new Error('empty address can not be created')
        }

        return await this._AddressSequelize.findOrCreate({
            where: {
                zipCode: this.zipCode,
                name: this.name,
                number: this.number,
                complement: this.complement,
            },
            defaults: {
                zipCode: this.zipCode,
                name: this.name,
                number: this.number,
                complement: this.complement,
                neighborhood: this.neighborhood,
                city: this.city,
                state: this.state
            }
        }).then(([address, created]) => {
            return{
                address,
                created
            }
        })


    }

    async update() {
    }

    async delete() {
    }



}