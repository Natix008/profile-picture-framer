'use strict';

const CANVAS_SIZE = 720;
const ZOOM_MIN = 0.1;
const ZOOM_MAX = 3;

let canvas = null;

function initCanvas() {
  if (canvas) canvas.dispose();

  canvas = new fabric.Canvas('editor-canvas', {
    preserveObjectStacking: true,
    selection: false
  });

  canvas.setWidth(CANVAS_SIZE);
  canvas.setHeight(CANVAS_SIZE);

  canvas.on('mouse:wheel', function(opt) {
    const obj = canvas.getActiveObject();
    if (!obj) return;

    let scale = obj.scaleX * (0.999 ** opt.e.deltaY);
    scale = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, scale));

    obj.scale(scale);
    document.getElementById('zoom-slider').value = scale;
    canvas.renderAll();

    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
}

function loadImage(url) {
  initCanvas();

  fabric.Image.fromURL(url, function(img) {
    const scale = Math.max(CANVAS_SIZE / img.width, CANVAS_SIZE / img.height);

    img.set({
      left: CANVAS_SIZE / 2,
      top: CANVAS_SIZE / 2,
      originX: 'center',
      originY: 'center',
      centeredRotation: true,
      cornerColor: '#22a73a',
      cornerStrokeColor: '#22a73a',
      borderColor: '#22a73a',
      transparentCorners: false,
      cornerSize: 18,
      cornerStyle: 'circle',
      padding: 40,
      borderScaleFactor: 3,
    });

    img.scale(scale);
    canvas.add(img);
    canvas.setActiveObject(img);
    canvas.renderAll();

    document.getElementById('zoom-slider').value = scale;
    document.getElementById('download').dataset.previewReady = 'true';
    checkInputs();
  }, { crossOrigin: 'anonymous' });
}

function checkInputs() {
  const name = document.getElementById('name').value.trim();
  const role = document.getElementById('role').value.trim();
  const testimony = document.getElementById('testimony').value.trim();
  const previewReady = document.getElementById('download').dataset.previewReady === 'true';

  document.getElementById('download').disabled = !(name && role && testimony && previewReady);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('rotate-left').addEventListener('click', function() {
    const obj = canvas && canvas.getActiveObject();
    if (!obj) return;
    obj.rotate(obj.angle - 5);
    canvas.renderAll();
  });

  document.getElementById('rotate-right').addEventListener('click', function() {
    const obj = canvas && canvas.getActiveObject();
    if (!obj) return;
    obj.rotate(obj.angle + 5);
    canvas.renderAll();
  });

  document.getElementById('zoom-slider').addEventListener('input', function() {
    const obj = canvas && canvas.getActiveObject();
    if (!obj) return;
    obj.scale(parseFloat(this.value));
    canvas.renderAll();
  });

  document.querySelector('input[name="file"]').addEventListener('change', function() {
    if (!this.files || !this.files[0]) return;
    const reader = new FileReader();
    reader.onload = function(e) { loadImage(e.target.result); };
    reader.readAsDataURL(this.files[0]);
  });

  ['name', 'role', 'testimony'].forEach(function(id) {
    const el = document.getElementById(id);
    el.addEventListener('input', checkInputs);
    el.addEventListener('change', checkInputs);
  });

  document.getElementById('download').addEventListener('click', function() {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = CANVAS_SIZE;
    exportCanvas.height = CANVAS_SIZE;

    const ctx = exportCanvas.getContext('2d');
    const image = new Image();

    image.src = canvas.toDataURL({ format: 'png', quality: 1 });
    image.onload = function() {
      ctx.drawImage(image, 0, 0);

      const frame = new Image();
      frame.src = document.getElementById('frame-overlay').src;
      frame.onload = function() {
        ctx.drawImage(frame, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

        const finalImage = exportCanvas.toDataURL('image/png');
        const name = encodeURIComponent(document.getElementById('name').value.trim());
        const role = encodeURIComponent(document.getElementById('role').value.trim());
        const testimony = encodeURIComponent(document.getElementById('testimony').value.trim());

        sessionStorage.setItem('campaignImage', finalImage);
        window.location = `download.php?name=${name}&role=${role}&testimony=${testimony}`;
      };
    };
  });
});
