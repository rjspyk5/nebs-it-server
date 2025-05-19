const database = {
  findWithPaigination: async (model, page, limit, condition) => {
    const skip = (page - 1) * limit;
    const result = await model
      .find(condition || null)
      .skip(skip)
      .limit(limit);
    return result;
  },
  find: async (model, conditon) => await model.find(conditon || null),
  delete: async (model, conditon) => await model.deleteOne(conditon),
  create: async (model, data) => await model.create(data),
  update: async (model, condition, data) =>
    await model.updateOne(condition, data, { runValidators: true }),
};
module.exports = database;
