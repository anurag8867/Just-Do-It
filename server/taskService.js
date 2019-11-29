const objectId = require("mongodb").ObjectID

exports.searchQuery = function (query) {
  let searchQuery = {};
  if (query.searchBy === "ObjectId") {
    searchQuery["_id"] = objectId(query.searchParam);
  } else if(query.searchBy) {
    searchQuery[query.searchBy] = query.searchParam;
  }
  return searchQuery;
};
