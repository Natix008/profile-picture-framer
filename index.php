<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Support Campaign</title>

  <!-- <link href="css/croppie.css" rel="stylesheet" /> -->
  <link href="css/style-2.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
  <!-- <script src="js/croppie.min.js"></script> -->
  <script src="js/fabric.min.js"></script>
  <script src="js/app-2.js"></script>
</head>

<body>

<div class="container">
  <div class="campaign-card">

    <!-- LEFT SIDE -->
    <div class="preview-section">
      <div class="preview-wrapper">

        <div id="preview-container">

          <canvas id="editor-canvas" width="720" height="720"></canvas>

          <img
            src="frames/frame-2.png"
            id="frame-overlay"
          />

        </div>

        <div class="editor-tools">

          <div class="tool-item">
            <button type="button" id="rotate-left" class="tool-btn">
              ↺
            </button>
            <span>Rotate</span>
          </div>

          <div class="tool-item">
            <button type="button" id="rotate-right" class="tool-btn">
              ↻
            </button>
            <span>Rotate</span>
          </div>

          <div class="tool-item zoom-tool">

            <label>🔍</label>

            <input
              type="range"
              id="zoom-slider"
              min="0.1"
              max="3"
              step="0.01"
              value="1"
            />

            <span>Zoom</span>
          </div>

          <div class="tool-tip">
            ✋ Drag image • Scroll to zoom • Rotate freely
          </div>

        </div>

      </div>
    </div>

    <!-- RIGHT SIDE -->
    <div class="form-section">

      <div class="badge">
        🎉 Campaign Frame Generator
      </div>

      <h1>
        Support the Campaign
      </h1>

      <p class="subtitle">
        Upload your photo, share your testimony, and generate your personalized campaign profile picture.
      </p>

      <div class="upload-box">
        <div class="upload-text">
          Upload a square profile photo for the best result
        </div>

        <input type="file" name="file" onchange="onFileChange(this)">
      </div>

      <div class="field">
        <label>Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your full name"
        >
      </div>

      <div class="field">
        <label>Your Role</label>

        <select id="role">
          <option value="">Select your role</option>
          <option value="student">Student</option>
          <option value="alumnus">Alumnus</option>
          <option value="alumna">Alumna</option>
          <option value="instructor">Instructor</option>
          <option value="volunteer">Volunteer</option>
        </select>
      </div>

      <div class="field">
        <label>
          What are you grateful for?
        </label>

        <textarea
          id="testimony"
          placeholder="share something meaningful you appreciate — a person, experience, opportunity, blessing, or lesson"
        ></textarea>

        <div class="helper-text">
          Your answer will automatically be inserted into the campaign caption.
        </div>
      </div>

      <button id="download" disabled>
        Generate Profile Picture
      </button>

      <div class="footer-note">
        Your personalized campaign photo will be automatically downloaded after processing.
      </div>

    </div>

  </div>
</div>

</body>
</html>