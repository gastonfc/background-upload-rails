$(function () {
  function showFile(file, cont) {
    var n = $(".messages", cont);
    n.html(n.html() + "<p>" + file.name + " (" + file.type + ") size: " + file.size + " bytes</p>");
  }

  function fileDragHover(e) {
    e.preventDefault();
    e.stopPropagation();
    $(e.target)[(e.type === "dragover" ? "addClass" : "removeClass")]("hover");
  }

  function initForm(form) {
    var fileselect = $(".filefield", form),
        filedrag = $(".filedrag", form),
        submitbutton = $(".submit", form);

    function fileSelectHandler(e) {
      // cancel event and hover styling
      fileDragHover(e);

      // fetch FileList object
      var files = e.target.files || e.originalEvent.dataTransfer.files;

      // process all File objects
      for (var i = 0, f; f = files[i]; i++) {
        showFile(f, form);
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
