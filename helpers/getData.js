const selectFields = require('./selectFields')

const getData = async ({ query, select, populate = null } = {}) => {
  try {
    const data = await strapi
      .query(query)
      .model.find({ published_at: { $ne: null } }, select)
      .populate(populate)

    const output = select
      ? data.map(program => selectFields({ obj: program, select }))
      : data
    return output
  } catch (err) {
    console.log(err)
    return null
  }
}

module.exports = getData
