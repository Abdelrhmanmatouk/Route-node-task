import { Category } from "./../../../DB/models/category.model.js";

export const addCategory = async (req, res, next) => {
    // save category to DB
    await Category.create({
        name: req.body.name,
        user: req.user.id,
    });
    // response
    return res.json({
        success: true,
        message: "category created successfully !",
    });
};

// update category
export const updateCategory = async (req, res, next) => {
    const { id } = req.params;
    // check category
    const category = await Category.findById(id);
    if (!category) return next(new Error("category not found", { cause: 404 }));
    // check owner
    if (category.user.toString() !== req.user.id.toString())
        return next(new Error("you cannot update this category"));
    //   update name
    category.name = req.body.name ? req.body.name : category.name;
    await category.save();
    //   response
    return res.json({
        success: true,
        message: "category update successfully!!",
    });
};
// delete category

export const deleteCategory = async (req, res, next) => {
    // check category
    const category = await Category.findById(req.params.id);
    if (!category) return next(new Error("category not found", { cause: 404 }));
    // check owner
    if (category.user.toString() !== req.user.id.toString())
        return next(new Error("you cannot delete this category"));
    // delete category
    await category.deleteOne();
    //   response
    return res.json({
        success: true,
        message: "category deleted successfully",
    });
};

// get

export const getCategories = async (req, res, next) => {
    const categories = await Category.find({ user: req.user._id });

    // response
    return res.json({
        success: true,
        results: categories,
    });
};
