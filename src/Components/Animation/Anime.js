$(document).ready(function () {
    $("#f-col").waypoint(
      function () {
        $("#f-col,#right,#register,.navbar-toggler ").addClass(
          "animate__animated animate__fadeInRight"
        );
        $("#s-col,.navbar-brand").addClass(
          "animate__animated animate__fadeInLeft"
        );
        $("#top").addClass("animate__animated animate__fadeInUp");
      },
      { offset: "50%" }
    );
  });
  
  $(document).ready(function () {
    $(".card-border").waypoint(
      function () {
        $(".card-border").addClass("animate__animated animate__fadeInUp");
      },
      { offset: "100%" }
    );
  });