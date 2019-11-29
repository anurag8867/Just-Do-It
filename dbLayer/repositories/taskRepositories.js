exports.post = function (db, query, req, res) {
  try {
    var dbo = db.db("toDoApp");
    dbo.collection("tasks").insertOne(query, function (err, result) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'An Error occured insertOne',
          error: err
        });
      } else {
        res.status(200).json({
          success: true,
          message: "document inserted operation",
          data: result
        });
      }
    });
  } catch (e) {
    console.log("we will insert a mock data if soemthing fails");
  }
};

exports.get = function (db, query, req, res) {
  try {
    var dbo = db.db("toDoApp");
    dbo.collection("tasks").find(query).toArray(function (err, result) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'An Error occured insertOne',
          error: err
        });
      } else {
        res.status(200).json({
          success: true,
          message: "document fetched",
          data: result
        });
      }
    });
  } catch (e) {
    console.log("we will insert a mock data if soemthing fails");
  }
};

exports.put = function (db, searchQuery, updateQuery, req, res) {
  try {
    var dbo = db.db("toDoApp");
    dbo.collection("tasks").updateOne(searchQuery, updateQuery, function (err, result) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'An Error occured insertOne',
          error: err
        });
      } else {
        res.status(200).json({
          success: true,
          message: "document updated operation",
          data: result
        });
      }
    });
  } catch (e) {
    console.log("we will insert a mock data if soemthing fails");
  }
};

exports.delete = function (db, query, req, res) {
  try {
    var dbo = db.db("toDoApp");
    dbo.collection("tasks").deleteOne(query, function (err, result) {
      if (err) {
        res.status(500).json({
          success: false,
          message: 'An Error occured insertOne',
          error: err
        });
      } else {
        res.status(200).json({
          success: true,
          message: "document delete operation",
          data: result
        });
      }
    });
  } catch (e) {
    console.log("we will insert a mock data if soemthing fails");
  }
};


