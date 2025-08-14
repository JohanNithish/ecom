const bcrypt = require('bcrypt');
const adminloginModels = require('../models/adminloginModels');

exports.adminLogin = async (req, res, next) => {
    // const hashedpassword = await bcrypt.hash(req.body.password, 10)
    // console.log(hashedpassword);
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: "Username and password are required!" });
    }
    try {
        // Find user in DB by name

        const user = await adminloginModels.findOne({ username: req.body.username });

        if (!user) {
            return res.status(401).json({ message: "Wrong Username" });
        }

        // Compare password
        const match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Wrong Password" });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }

};
