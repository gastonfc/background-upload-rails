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
    var pbar = getFileProgressBar(cont),
        data = new FormData();

    data.append("datafile", file);

    var xhr = new XMLHttpRequest();
    if (xhr.upload) {

        xhr.upload.addEventListener("progress", function (progress) {
          console.log("progress", file.name, progress);
          var percentage = Math.floor((progress.loaded / progress.total) * 100);
          pbar.width(percentage + "%");
          console.log(percentage);
        });
        xhr.onreadystatechange = function (e) {
          if (xhr.readyState == 4) {
            if (xhr.status == 200) {
              pbar.addClass("success").width("100%");
            } else {
              pbar.addClass("failed").width("100%");
            }
          }
        }
        xhr.open("POST", url, true);
        // xhr.setRequestHeader("X_FILENAME", file.name);
        // Add csrf token for Rails
        var token = $('meta[name="csrf-token"]').attr('content');
        console.log('Token', token);
        xhr.setRequestHeader("X-CSRF-Token", token);
        xhr.send(data);
    }
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
