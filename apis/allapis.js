const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registration = async function (req, res) {
    try {
        let data = req.body
        const { first_name,last_name, email, password} = data
        let emailExist = await userModel.findOne({ email: email })
        if (emailExist != null) {
            return res.status(400).send({ status: false, message: "Entered email is already exist" })
        }
        if (password.length < 8 || password.length > 15) { return res.status(400).send({ status: false, massage: "Password should be 8 to 15 characters long" }) }
        const hash = bcrypt.hashSync(password, 6);
        data.password = hash
        const createUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: "User created successfully", data: createUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.login = async function (req, res) {
    try {
        const requestbody = req.body;

        const { email, password } = requestbody;

        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(401).send({ status: false, message: 'Entered EmailId is wrong' })
        }
        const decrpted = bcrypt.compareSync(password, user.password);
        if (decrpted == true) {
            const token = await jwt.sign({
                UserId: user._id,
            }, 'privatekey', { expiresIn: "10h" })
            let update = await userModel.findOneAndUpdate({ email: email }, { token: token, loginStatus: true })
            return res.status(200).send({ status: true, message: 'User logged in successfully', data: { userId: user._id, token: token } })
        }
        else {
            res.status(400).send({ status: false, message: "Entered password is incorrect" })
        }


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}