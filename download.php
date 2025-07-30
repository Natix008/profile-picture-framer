<!DOCTYPE html>
<html>
  <head>
    <title>Download Profile Picture | Support Kerala Blasters !</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="css/style.css" rel="stylesheet" async="async" />
  </head>
  <body>
    <div id="wrapper">
      <div id="content">
        <h1>Support Campaign!</h1>
        <p>Make this as your profile picture to support the campaign !</p>
        <?php
        $url = htmlspecialchars($_GET["i"]);
        if(isset($_GET["i"]))
          echo "<a href='". $url ."' download='campaign-profile'><img src='". $url ."' /></a>";
        else
          header("Redirect: index.php");
        ?>
        <p>
        Click the above image to download.<br/>Or right click (in mobile, hold down) and choose "Save Image"
<div class="container">
  <h2>ZCMC 35th Anniversary Caption</h2>
  <textarea id="zcmcMessage" readonly>
Hi, I’m <?php echo htmlspecialchars($_GET["name"] ?? '');?>, a proud <?php echo htmlspecialchars($_GET["role"] ?? '');?> of Zion Christian Mission Center.
One thing I truly loved about ZCMC is <?php echo htmlspecialchars($_GET["testimony"] ?? '');?>.

ZCMC has been a bright light for 35 years—and I’m honored to be part of this journey. Let’s celebrate this milestone together!

📅 June 14, 2025 (Saturday)
🎉 Theme: Love shines, blessings flow, and light leads the way
🔗 Reserve your spot here: https://forms.gle/uAvuvCwHKFbX2rcC9

#ZCMC35 #35YearsStrong #LoveLightBlessings #ZCMCFoundationDay #ZCMC35thAnniversary #ThriveAt35
  </textarea>
  <button onclick="copyText()">Copy Message</button>
</div>
          <a href="index.php"><button id="download">Create Another Profile Picture!</button></a>
        </p>
        <?php
        require_once __DIR__ . "/footer.php";
        ?>
      </div>
    </div>
    <script>
function copyText() {
  const textarea = document.getElementById("zcmcMessage");
  textarea.select();
  textarea.setSelectionRange(0, 99999); // For mobile compatibility
  document.execCommand("copy");
  alert("Message copied to clipboard!");
}
</script>
  </body>
</html>
