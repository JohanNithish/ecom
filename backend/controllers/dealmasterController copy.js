const  dealModel=require('../models/registerModels');

exports.newRegister = async (req, res, next) => {
    try {
        const dealData = {
            deals: req.body.deals, 
            description: req.body.description,
            createdBy: req.user.id,
            createdAt: new Date()
        };
        const newDeal = await dealModel.create(dealData);

        res.json({
            success: true,
            message: "Insert Success",
            data: newDeal
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Insert Failed",
            error: error.message
        });
    }
}