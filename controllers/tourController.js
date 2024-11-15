const Tour = require("../models/tourModel");
const { catchAsync } = require("../utils/error");

exports.getTours = catchAsync(async (req, res) => {
  //example url with query strings - http://localhost:8000/api/v1/tours?sortBy=price&order=desc&page=2
  console.log(req.query);
  // const tours = await Tour.find(); //without query string
  const { sortBy, order, page, ...filteredQueries } = req.query; // sorting
  let tours = await Tour.find(filteredQueries); //sorting
  let sortedTours = [...tours]; //sorting

  if (sortBy === "price") {
    sortedTours.sort((a, b) => {
      return order === "desc" ? b.price - a.price : a.price - b.price;
    });
  }
  // sorting ends above
  //pagination starts
  let parsedPage = parseInt(page);
  let x = 0;
  let showToursPerPage = 4;
  let y = x + showToursPerPage;

  if (page !== undefined) {
    // page === '1' ? (x = x, y = y) : (x = (y + 1), y = x + y);
    page === "1"
      ? ((x = x), (y = y))
      : ((x = parsedPage ** 2 + 1), (y = x + y));
    console.log("x: " + x, " y: " + y);
    sortedTours = sortedTours.slice(x, y);
  }
  //paginations ends
  return res.status(200).json({
    status: "success",
    data: sortedTours,
  });
});

exports.postTour = catchAsync(async (req, res) => {
  // console.log("post tour");
  const newTour = await Tour.create({ ...req.body });
  return res.status(201).json({
    status: "success",
    tour: newTour,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  // console.log("get tour");
  const { id } = req.params;
  console.log("id: " + id);
  console.log("tour: " + Tour.findById(id));
  const tour = await Tour.findOne({ _id: id });
  return res.status(200).json({
    status: "success",
    data: tour,
  });
});

exports.updateTour = catchAsync(async(req, res) => {
  console.log("update tour");
  const { id } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      //runValidators: true
    });
    return res.status(200).json({
      status: "success",
      data: updatedTour,
    });
});

exports.deleteTour = catchAsync(async (req, res) => {
  // console.log("delete tour")
  const { id } = req.params;
    await Tour.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Deleted",
    });
});

