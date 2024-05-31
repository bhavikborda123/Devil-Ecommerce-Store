const fs = require("fs");
const path = require("path");
const categoryModel = require("../models/categories");
const productModel = require("../models/products");
const orderModel = require("../models/orders");
const userModel = require("../models/users");
const customizeModel = require("../models/customize");


class Customize {
    async getImages(req, res) {
        try {
            let Images = await customizeModel.find({});
            if (Images) {
                return res.json({ Images });
            }
        } catch (err) {
            return res.json({
                error: err.message,
            });
        }
    }

    async uploadSlideImage(req, res) {
        let image = req.file.filename;
        if (!image) {
            return res.json({ error: "All field required" });
        }
        try {
            let newCustomize = new customizeModel({
                slideImage: image,
            });
            let save = await newCustomize.save();
            if (save) {
                return res.json({ success: "Image upload successfully" });
            }
        } catch (err) {
            return res.json({
                error: err.message,
            });
        }
    }

    async deleteSlideImage(req, res) {
        let { id } = req.body;
        if (!id) {
            return res.json({ error: "All field required" });
        } else {
            try {
                let deletedSlideImage = await customizeModel.findById(id);
                const filePath = path.resolve(__dirname + "../../") + `/public/uploads/customize/${deletedSlideImage.slideImage}`;

                let deleteImage = await customizeModel.findByIdAndDelete(id);
                if (deleteImage) {
                    // Delete Image from uploads -> customizes folder
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            return res.json({
                                error: err.message,
                            });
                        }
                        return res.json({ success: "Image deleted successfully" });
                    });
                }
            } catch (err) {
                return res.json({
                    error: err.message,
                });
            }
        }
    }

    async getAllData(req, res) {
        try {
            let Categories = await categoryModel.find({}).count();
            let Products = await productModel.find({}).count();
            let Orders = await orderModel.find({}).count();
            let Users = await userModel.find({ userRole: 0 }).count();

            if (Categories && Products && Orders) {
                const ProductsData = await productModel.find({}).exec();
                const lowStockProducts = ProductsData.filter(
                    (product) => product.pQuantity < 15
                );
                return res.json({ Categories, Products, Orders, Users, lowStockProducts, });
            }
        } catch (err) {
            return res.json({
                error: err,
            });
        }
    }
}


const customizeController = new Customize();
module.exports = customizeController;