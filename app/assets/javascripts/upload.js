$(function () {
  function showFile(file, cont) {
    var uploadcont = $("<div>");

    $("<div>")
      .addClass("info")
      .html(file.name + " (" + file.type + ") size: " + file.size + " bytes")
      .appendTo(uploadcont);
    $("<div>")
      .addClass("progressbar")
      .appendTo(uploadcont).append($("<div>&nbsp;</div>"));

    return uploadcont.appendTo($(".uploads", cont));
  }

  function getFileProgressBar(cont) {
    return $(".progressbar div", cont);
  }

  function sendFile(url, file, cont) {
    var pbar = getFileProgressBar(cont);

    $.ajax({
      type: "post",
      url: url,
      data: file,
      success: function () {
        pbar.addClass("success").width("100%");
      },
      error: function () {
        pbar.addClass("failed").width("100%");
      },
      xhrFields: {
        onprogress: function (progress) {
          var percentage = Math.floor((progress.total / progress.totalSize) * 100);
          pbar.width(percentage + "%");
        }
      },
      processData: false,
      contentType: file.type
   });
  }

  function fileDragHover(e) {
    e.preventDefault();
    e.stopPropagation();
    $(e.target)[(e.type === "dragover" ? "addClass" : "removeClass")]("hover");
  }

  function initForm(form) {
    var fileselect = $(".filefield", form),
        filedrag = $(".filedrag", form),
        submitbutton = $(".submit", form),
        url = form.attr("action");

    function fileSelectHandler(e) {
      var filecont;
      // cancel event and hover styling
      fileDragHover(e);

      // fetch FileList object
      var files = e.target.files || e.originalEvent.dataTransfer.files;

      // process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        filecont = showFile(f, form);
        sendFile(url, f, filecont);
      }
    }
    fileselect.on("change", fileSelectHandler);

    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {

      // file drop
      filedrag.on("dragover", fileDragHover);
      filedrag.on("dragleave", fileDragHover);
      filedrag.on("drop", fileSelectHandler);
      filedrag.show();

      // remove submit button
      submitbutton.hide();
    }

  }

  if (window.File && window.FileList && window.FileReader) {
    $(".autoupload").each(function (i, e) {
      initForm($(e));
    });
  }

});
