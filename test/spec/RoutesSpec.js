describe("Routes", function() {
  var returnedData = {};
  G.Routes.addRoute('/news/:id',function(data){ 
    returnedData = data;
  });
});