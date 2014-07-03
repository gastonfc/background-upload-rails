$(function () {
  function showFile(file, cont) {
    var n = $(".messages", cont);
    n.html(n.html() + "<p>" + file.name + " (" + file.type + ") size: " + file.size + " bytes</p>");
  }

  function FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    $(e.target)[(e.type === "dragover" ? "addClass" : "removeClass")]("hover");
  }

  function initForm(form) {
    var fileselect = $(".filefield", form),
        filedragjq = $(".filedrag", form),
        submitbutton = $(".submit", form);

    function fileSelectHandler(e) {
      // cancel event and hover styling
      FileDragHover(e);

      // fetch FileList object
      var files = e.target.files || e.dataTransfer.files;

      // process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        showFile(f, form);
      }
    }
    fileselect.on("change", fileSelectHandler);

    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      var filedrag = filedragjq.get(0);

      // file drop
      filedrag.addEventListener("dragover", FileDragHover, false);
      filedrag.addEventListener("dragleave", FileDragHover, false);
      filedrag.addEventListener("drop", fileSelectHandler, false);
      filedrag.style.display = "block";

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
