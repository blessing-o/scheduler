// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $(".saveBtn").on("click", function (event) {
    console.log("saved")

    //get the id base on where the save button is clicked
    let blockId = $(this).closest(".time-block").attr("id");
    let textContent = $(this).siblings(".description").val().trim();

    // Save to local storage using the id as the key
    localStorage.setItem(blockId, textContent);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  let currentHour = dayjs().hour();

  $(".time-block").each(function () {
    let blockHour = parseInt($(this).attr("id").split("-")[1]);

    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  $(".time-block").each(function () {
    let blockId = $(this).attr("id");
    let savedContent = localStorage.getItem(blockId);

    if (savedContent) {
      $(this).find(".description").val(savedContent);
    }
  });


  // TODO: Add code to display the current date in the header of the page.

  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
});





