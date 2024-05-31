const { toTitleCase } = require("../config/function");
const categoryModel = require("../models/categories");
const fs = require("fs");
const path = require("path");

class Category {
  async getAllCategory(req, res) {
    try {
      let Categories = await categoryModel.find({}).sort({ _id: -1 });
      if (Categories) {
        return res.json({ Categories });
      }
    } catch (err) {
      return res.json({
        error: err.message,
      });
    }
  }

  // add new category
  async postAddCategory(req, res) {
    let { cName, cDescription, cStatus } = req.body;
    let cImage = req.file.filename;
    const filePath =
      path.resolve(__dirname + "../../") +
      `/public/uploads/categories/${cImage}`;

    if (!cName || !cDescription || !cStatus || !cImage) {
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.json({
            error: err.message,
          });
        }
        return res.json({ error: "All filled must be required" });
      });
    } else {
      cName = toTitleCase(cName);
      try {
        let checkCategoryExists = await categoryModel.findOne({ cName: cName });
        if (checkCategoryExists) {
          fs.unlink(filePath, (err) => {
            if (err) {
              return res.json({
                error: err.message,
              });
            }
            return res.json({ error: "Category already exists" });
          });
        } else {
          let newCategory = new categoryModel({
            cName,
            cDescription,
            cStatus,
            cImage,
          });
          let save = await newCategory.save();
          if (save) {
            return res.json({ success: "Category created successfully" });
          }
        }
      } catch (err) {
        return res.json({
          error: err.message,
        });
      }
    }
  }

  // edit category
  async postEditCategory(req, res) {
    let { cId, cDescription, cStatus } = req.body;
    if (!cId || !cDescription || !cStatus) {
      return res.json({ error: "All filled must be required" });
    }
    try {
      let editCategory = categoryModel.findByIdAndUpdate(cId, {
        cDescription,
        cStatus,
        updatedAt: Date.now(),
      });
      let edit = await editCategory.exec();
      if (edit) {
        return res.json({ success: "Category edit successfully" });
      }
    } catch (err) {
      return res.json({
        error: err.message,
      });
    }
  }
  //delete Category
  async getDeleteCategory(req, res) {
    let { cId } = req.body;
    if (!cId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let deletedCategoryFile = await categoryModel.findById(cId);
        const filePath =
          path.resolve(__dirname + "../../") +
          `/public/uploads/categories/${deletedCategoryFile.cImage}`;

        let deleteCategory = await categoryModel.findByIdAndDelete(cId);
        if (deleteCategory) {
          // Delete Image from uploads -> categories folder
          fs.unlink(filePath, (err) => {
            if (err) {
              return res.json({
                error: err.message,
              });
            }
            return res.json({ success: "Category deleted successfully" });
          });
        }
      } catch (err) {
        return res.json({
          error: err.message,
        });
      }
    }
  }
}

const categoryController = new Category();
module.exports = categoryController;
