window.canvas = null;
window.userImage = null;

/*
|--------------------------------------------------------------------------
| INIT FABRIC
|--------------------------------------------------------------------------
*/

function initCanvas() {

  if (window.canvas) {
    window.canvas.dispose();
  }

  window.canvas = new fabric.Canvas('editor-canvas', {
    preserveObjectStacking: true,
    selection: false
  });

  canvas.setWidth(720);
  canvas.setHeight(720);

  /*
  |-------------------------------------------------------------------------- 
  | Mouse Wheel Zoom
  |--------------------------------------------------------------------------
  */

  canvas.on('mouse:wheel', function(opt) {

    const obj = canvas.getActiveObject();

    if (!obj) return;

    let scale = obj.scaleX;

    scale *= 0.999 ** opt.e.deltaY;

    if (scale > 3) scale = 3;
    if (scale < 0.1) scale = 0.1;

    obj.scale(scale);

    $('#zoom-slider').val(scale);

    canvas.renderAll();

    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
}

/*
|--------------------------------------------------------------------------
| LOAD IMAGE
|--------------------------------------------------------------------------
*/

window.updatePreview = function(url) {

  initCanvas();

  fabric.Image.fromURL(url, function(img) {

    window.userImage = img;

    const scale = Math.max(
      720 / img.width,
      720 / img.height
    );

    img.set({
      left: 360,
      top: 360,
      originX: 'center',
      originY: 'center',
      centeredRotation: true,
      cornerColor: '#22a73a',
      cornerStrokeColor: '#22a73a',
      borderColor: '#22a73a',
      transparentCorners: false,
      cornerSize: 14,
      padding: 40,
      borderScaleFactor: 3,
      cornerSize: 18,
      cornerStyle: 'circle',
      transparentCorners: false,
      // hasRotatingPoint: false
    });

    img.scale(scale);

    canvas.add(img);

    canvas.setActiveObject(img);

    canvas.renderAll();

    $('#zoom-slider').val(scale);

  }, {
    crossOrigin: 'anonymous'
  });

  /*
  |--------------------------------------------------------------------------
  | ROTATE LEFT
  |--------------------------------------------------------------------------
  */

  $('#rotate-left')
    .off('click')
    .on('click', function(e) {

      e.preventDefault();

      const obj = canvas.getActiveObject();

      if (!obj) return;

      obj.rotate(obj.angle - 5);

      canvas.renderAll();
    });

  /*
  |--------------------------------------------------------------------------
  | ROTATE RIGHT
  |--------------------------------------------------------------------------
  */

  $('#rotate-right')
    .off('click')
    .on('click', function(e) {

      e.preventDefault();

      const obj = canvas.getActiveObject();

      if (!obj) return;

      obj.rotate(obj.angle + 5);

      canvas.renderAll();
    });

  /*
  |--------------------------------------------------------------------------
  | ZOOM SLIDER
  |--------------------------------------------------------------------------
  */

  $('#zoom-slider')
    .off('input')
    .on('input', function() {

      const obj = canvas.getActiveObject();

      if (!obj) return;

      const scale = parseFloat(this.value);

      obj.scale(scale);

      canvas.renderAll();
    });

  $('#download').data('preview-ready', true);

  checkInputs();
};

/*
|--------------------------------------------------------------------------
| FILE CHANGE
|--------------------------------------------------------------------------
*/

window.onFileChange = function(input) {

  if (input.files && input.files[0]) {

    const reader = new FileReader();

    reader.onload = function(e) {

      updatePreview(e.target.result);
    };

    reader.readAsDataURL(input.files[0]);
  }
};

/*
|--------------------------------------------------------------------------
| DOWNLOAD IMAGE
|--------------------------------------------------------------------------
*/
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('download').onclick = function() {

    const exportCanvas = document.createElement('canvas');

    exportCanvas.width = 720;
    exportCanvas.height = 720;

    const ctx = exportCanvas.getContext('2d');

    /*
    |--------------------------------------------------------------------------
    | DRAW USER IMAGE
    |--------------------------------------------------------------------------
    */

    const image = new Image();

    image.src = canvas.toDataURL({
      format: 'png',
      quality: 1
    });

    image.onload = function() {

      ctx.drawImage(image, 0, 0);

      /*
      |--------------------------------------------------------------------------
      | DRAW FRAME
      |--------------------------------------------------------------------------
      */

      const frame = new Image();

      frame.src = document.getElementById('frame-overlay').src;

      frame.onload = function() {

        ctx.drawImage(frame, 0, 0, 720, 720);

        /*
        |--------------------------------------------------------------------------
        | FINAL IMAGE
        |--------------------------------------------------------------------------
        */

        const finalImage =
          exportCanvas.toDataURL('image/png');

        /*
        |--------------------------------------------------------------------------
        | FORM VALUES
        |--------------------------------------------------------------------------
        */

        const name =
          encodeURIComponent(
            $('#name').val().trim()
          );

        const role =
          encodeURIComponent(
            $('#role').val().trim()
          );

        const testimony =
          encodeURIComponent(
            $('#testimony').val().trim()
          );

        /*
        |--------------------------------------------------------------------------
        | SAVE IMAGE TEMPORARILY
        |--------------------------------------------------------------------------
        */

        sessionStorage.setItem(
          'campaignImage',
          finalImage
        );

        /*
        |--------------------------------------------------------------------------
        | REDIRECT TO DOWNLOAD PAGE
        |--------------------------------------------------------------------------
        */

        window.location =
          `download.php?name=${name}&role=${role}&testimony=${testimony}`;
      };
    };
  };
});
/*
|--------------------------------------------------------------------------
| FORM VALIDATION
|--------------------------------------------------------------------------
*/

function checkInputs() {

  const nameFilled =
    $('#name').val().trim() !== '';

  const roleSelected =
    $('#role').val().trim() !== '';

  const testimonyFilled =
    $('#testimony').val().trim() !== '';

  const isPreviewReady =
    $('#download').data('preview-ready') === true;

  if (
    nameFilled &&
    roleSelected &&
    testimonyFilled &&
    isPreviewReady
  ) {

    $('#download').prop('disabled', false);

  } else {

    $('#download').prop('disabled', true);
  }
}

/*
|--------------------------------------------------------------------------
| INIT FORM EVENTS
|--------------------------------------------------------------------------
*/

$(document).ready(function() {

  $('#name, #role, #testimony')
    .on('input change', checkInputs);
});