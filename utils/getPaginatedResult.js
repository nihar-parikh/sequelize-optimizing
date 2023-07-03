const { Op } = require("sequelize");

exports.getPaginatedResult = async ({
  Model,
  filter = {},
  filterFields = {},
  include = [],
  search = "",
  page,
  pageSize,
  order = [["createdAt", "DESC"]],
}) => {
  let finalFilter = { ...filter, ...filterFields };

  // Apply the search condition if a search term is provided
  if (search.length > 0) {
    //dynamically adding search fields corresponding to Model selected
    const modelAttributes = Object.keys(Model.rawAttributes);
    const searchCondition = {
      [Op.or]: modelAttributes
        .filter(
          (attribute) =>
            typeof Model.rawAttributes[attribute].type.key !== "undefined" &&
            Model.rawAttributes[attribute].type.key !== "DATE"
        )
        .map((attribute) => ({
          [attribute]: { [Op.like]: `%${search}%` },
        })),
    };
    finalFilter = { ...finalFilter, ...searchCondition };
  }

  const { count, rows } = await Model.findAndCountAll({
    where: finalFilter,
    include,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    order,
  });

  const totalPages = Math.ceil(count / pageSize);

  const result = {
    data: rows,
    total: count,
    currentPage: page,
    perPage: pageSize,
    lastPage: totalPages,
    hasMorePages: totalPages > page,
    nextPage: totalPages > page ? page + 1 : 0,
    previousPage: page > 1 ? page - 1 : 0,
  };

  return result;
};
