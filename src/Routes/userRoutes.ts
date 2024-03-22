import { Router } from "express";
import AddressController from "../Controllers/Address";
import UserController from "../Controllers/User";


const userRoutes = Router()

userRoutes.get('/:id', async(req, res) => {
    let userController = new UserController()
    return await userController.getById(parseInt(req.params.id))
        .then(resp => {
            return res.status(200).send(resp)
        })
        .catch(err => {
            return res.status(500).send(err.message)
        })
})

userRoutes.post('/create', async (req, res) => {
    let addressController = new AddressController
    const isAddressValid = await addressController.bodyValidation(req.body.address)
        .catch(err => {
            res.status(400).send(err.message)
            return false
        })

    if (!isAddressValid) { return }

    addressController = new AddressController(req.body.address)
    const address = await addressController.findOrCreate()
        .catch(err => {
            res.status(500).send(err.message)
            return undefined
        })

    if(!address){ return }
    req.body.addressId = address.address.dataValues.id

    let userController = new UserController
    const isUserValid = await userController.bodyValidation(req.body)
        .catch(err => {
            res.status(400).send(err.message)
            return false
        })

    if(!isUserValid) { return }

    userController = new UserController(req.body)
    return await userController.create()
        .then(resp => {
            if(resp.created){
                return res.status(201).send(resp)
            }else {
                if(resp.errMessage == 'CONFLICT'){
                    const output = {
                        warning: 'user already exists',
                        user: resp.user
                    }
                    return res.status(409).send(output)
                }else {
                    return res.status(500).send(resp)
                }
            }

        })
        .catch(err => {
            return res.status(500).send(err.message)
        })
})

export default userRoutes