import { Task } from "./../../../DB/models/task.model.js";

// add a task
export const addTask = async (req, res, next) => {
    await Task.create({
        ...req.body,
        user: req.user._id,
    });
    // response
    return res.json({
        success: true,
        message: "Task created successfully !",
    });
};

// get tasks
export const getTask = async (req, res, next) => {
    const match = {};
    const sort = {};
    if (req.query.shared) {
        match.shared = req.query.shared === "true";
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    await req.user
        .populate({
            path: "tasks",
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            },
        })
        .execPopulate();
    // response
    return res.json({
        success: true,
        results: req.user.tasks,
    });
};

// update task

export const updateTask = async (req, res, next) => {
    const { id } = req.params;
    // check task
    const task = await Task.findById(id);
    if (!task) return next(new Error("task not found", { cause: 404 }));
    // update
    await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true, runValidators: true }
    );
    //   response
    return res.json({
        success: true,
        message: "task update successfully!!",
    });
}

// delete task

export const deleteTask = async (req, res, next) => {
    const { id } = req.params;
    // check task
    const task = await Task.findById(id);
    if (!task) return next(new Error("task not found", { cause: 404 }));
     // check owner
     if (task.user.toString() !== req.user.id.toString())
        return next(new Error("you cannot delete this task"));
    // delete category
    await task.deleteOne();
    //   response
    return res.json({
        success: true,
        message: "task deleted successfully",
    });
}