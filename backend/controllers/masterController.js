const  categoryModel=require('../models/masterModels');

exports.insertCategory = async (req, res, next) => {
    try {
        const categoryData = {
            category: req.body.category, 
            description: req.body.description,
            createdBy: req.user.id,
            createdAt: new Date()
        };
        const newCategory = await categoryModel.create(categoryData);

        res.json({
            success: true,
            message: "Insert Success",
            data: newCategory
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
exports.getAllCategory = async (req, res, next) => {
try {
        const categories = await categoryModel.find();
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

exports.putCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
                category: req.body.category,
                description: req.body.description,
                modifieBy: req.user.id,
                modifiedAt: new Date(),
            },
            { new: true } // return the updated document
        );

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.json({
            success: true,
            message: "Update Success",
            data: updatedCategory,
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

exports.deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedCategory = await categoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.json({
            success: true,
            message: "Delete Success",
            data: deletedCategory
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