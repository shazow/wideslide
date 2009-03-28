Wideslide: jQuery slideshow plugin
==================================

Want to display an inline slideshow of images of a fixed size on your webpage?
Usually this requires cropping your images to a uniform dimension. But now with
Wideslide you can retain the original image ratio.

Wideslide Javascript for the header
-----------------------------------

    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="jquery.wideslide.js"></script>

    <script type="text/javascript">
        $(document).ready(function() {
            $('.wideslide').wideslide({
                width: 710,       // Width of the container
                height: 244,      // Height of the container
                max_width: 10000, // Any number greater than the sum of all images' widths
                speed: 800,       // Speed of the switching animation
                timer: 4000       // Timer in milliseconds for auto-play (0 = off)
            });
        });
    </script>

Wideslide HTML for the body
---------------------------

The contents of the jQuery-selected class in the Javascript header will be
replaced with the slideshow interface. In this case, the class is *wideslide*.

    <ul class="wideslide">
        <li><img src="image1.jpg" width="374" height="240" /></li>
        <li><img src="image5.jpg" width="320" height="240" /></li>
        <li><img src="image2.jpg" width="320" height="240" /></li>
        <li><img src="image6.jpg" width="320" height="240" /></li>
        <li><img src="image4.jpg" width="320" height="240" /></li>
        <li><img src="image8.jpg" width="240" height="240" /></li>
        <li><img src="image3.jpg" width="240" height="240" /></li>
        <li><img src="image7.jpg" width="320" height="240" /></li>
    </ul>

