<!DOCTYPE html>
<html>
  <head>
    <title>Support Campaign</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/croppie.css" rel="stylesheet" async="async" />
    <link href="css/style.css" rel="stylesheet" async="async" />
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="js/croppie.min.js" async="async"></script>
    <script src="js/app.js" async="async"></script>
  </head>
  <body>
    <div id="wrapper">
      <div id="content">
        <h1>Support Campaign!</h1>
        <p>Support the campaign by changing your profile picture</p>
        <div id="preview">
          <div id="crop-area">
            <img src="images/default-profile-pic.jpg" id="profile-pic" />
          </div>
          <img src="frames/frame-0.png" id="fg" data-design="0" />
        </div>
        <div id="upload-cnt">
          <h4>Upload: </h4>
          <input type="file" name="file" onchange="onFileChange(this)">
        </div>
        <p>
          <input type="text" id="name" name="name" value="" placeholder="Your Name">
          <select id="role">
             <option value="">Select your role</option>
            <option value="student">student</option>
            <option value="alumnus">alumnus</option>
            <option value="alumna">alumna</option>
            <option value="instructor">instructor</option>
            <option value="volunteer">volunteer</option>
          </select>
        </p>
        
        <div id="testimonial-content">
          One thing I truly loved about ZCMC is
          <textarea rows="4" cols="50" id="testimony" placeholder="Insert your personal experience, testimony or reflection..."></textarea>
        </div>
        <p>
          <button id="download" disabled>Download Profile Picture</button>
        </p>
        <!-- <h2>Caption</h2> -->
        <!-- <div id="designs">
          <img class="design active" src="frames/frame-0.png" data-design="0" />
          <img class="design" src="frames/frame-1.png" data-design="1" />
          <img class="design" src="frames/frame-2.png" data-design="2" />
        </div> -->
        <?php
        require_once __DIR__ . "/footer.php";
        ?>
      </div>
    </div>
  </body>
</html>