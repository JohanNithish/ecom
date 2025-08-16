const  dealModel=require('../models/dealModels');

exports.insertDeal = async (req, res, next) => {
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
exports.getAllDeal = async (req, res, next) => {
try {
        const categories = await dealModel.find();
        res.json({
            success: true,
            message: "Get Success",
            data: categories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Get Failed",
            error: error.message
        });
    }
}

exports.putDeal = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedDeal = await dealModel.findByIdAndUpdate(
            id,
            {
                deals: req.body.deals,
                description: req.body.description,
                modifieBy: req.user.id,
                modifiedAt: new Date(),
            },
            { new: true } // return the updated document
        );

        if (!updatedDeal) {
            return res.status(404).json({
                success: false,
                message: "Deal not found",
            });
        }

        res.json({
            success: true,
            message: "Update Success",
            data: updatedDeal,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Update Failed",
            error: error.message,
        });
    }
};

exports.deleteDeal = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedDeal = await dealModel.findByIdAndDelete(id);

        if (!deletedDeal) {
            return res.status(404).json({
                success: false,
                message: "Deal not found",
            });
        }

        res.json({
            success: true,
            message: "Delete Success",
            data: deletedDeal
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Delete Failed",
            error: error.message
        });
    }
};