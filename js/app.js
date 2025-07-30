function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

window.uploadPicture = function(callback){
  croppie.result({
    size: "viewport"
  }).then(function(dataURI){
    var formData = new FormData();
    formData.append("design", $("#fg").data("design"));
    formData.append("image", dataURItoBlob(dataURI));
    $.ajax({
      url: "upload.php",
      data: formData,
      type: "POST",
      contentType: false,
      processData: false,
      success: callback,
      error: function(){
        document.getElementById("download").innerHTML = "Download Profile Picture";
      },
      xhr: function() {
        var myXhr = $.ajaxSettings.xhr();
        if(myXhr.upload){
            myXhr.upload.addEventListener('progress', function(e){
              if(e.lengthComputable){
                var max = e.total;
                var current = e.loaded;

                var percentage = Math.round((current * 100)/max);
                document.getElementById("download").innerHTML = "Uploading... Please Wait... " + percentage + "%";
              }
            }, false);
        }
        return myXhr;
      },
    });
  });
}

window.updatePreview = function(url) {
  document.getElementById("crop-area").innerHTML = "";
  window.croppie = new Croppie(document.getElementById("crop-area"), {
    "url": url,
    boundary: {
      height: 720,
      width: 720
    },
    viewport: {
      width: 720,
      height: 720
    },
  });

  $("#fg").on('mouseover touchstart', function(){
    document.getElementById("fg").style.zIndex = -1;
  });
  $(".cr-boundary").on('mouseleave touchend', function(){
    document.getElementById("fg").style.zIndex = 10;
  });

  document.getElementById("download").onclick = function(){
    this.innerHTML = "Uploading... Please wait...";
    uploadPicture(function(r){
      document.getElementById("download").innerHTML = "Uploaded";
      const name = encodeURIComponent($('#name').val().trim());
      const role = encodeURIComponent($('#role').val().trim());
      const testimony = encodeURIComponent($('#testimony').val().trim());
      window.location = `download.php?i=${r}&name=${name}&role=${role}&testimony=${testimony}`;

      // window.location = "download.php?i=" + r;
    });
  };
  // document.getElementById("download").removeAttribute("disabled");
  $('#download').data('preview-ready', true);
checkInputs();
};

window.onFileChange = function(input){
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      image = new Image();
      image.onload = function() {
        var width = this.width;
        var height = this.height;
        // if(width >= 1080 && height >= 1080)
          updatePreview(e.target.result);
        // else
        //   alert("Image should be atleast have 1080px width and 1080px height!", width);
        
      };
      image.src = e.target.result; 
    }

    reader.readAsDataURL(input.files[0]);
  }
}
function checkInputs() {
  const nameFilled = $('#name').val().trim() !== '';
  const roleSelected = $('#role').val().trim() !== '';
  const testimonyFilled = $('#testimony').val().trim() !== '';
  const isPreviewReady = $('#download').data('preview-ready') === true;

  if (nameFilled && roleSelected && isPreviewReady && testimonyFilled) {
    $('#download').prop('disabled', false);
  } else {
    $('#download').prop('disabled', true);
  }
}

$(document).ready(function(){
  $(".design").on("click", function(){
    $("#fg").attr("src", $(this).attr("src")).data("design", $(this).data("design"));
    $(".design.active").removeClass("active");
    $(this).addClass("active");
  });

    $('#name, #role, #testimony').on('input change', checkInputs);
});