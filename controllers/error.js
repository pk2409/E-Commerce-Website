exports.geterror = (request, response, next) => {
  // response.status(404).sendFile(path.join(__dirname, "views", "notfound.html"));
  response
    .status(404)
    .render("notfound", { pageTitle: "Page Not Found", path: "/error" });
};
