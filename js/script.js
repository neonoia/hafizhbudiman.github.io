window.onload = function () {
    var pageHeight = 100;
    var isAnimating = false;
    document.getElementById("layer1").style.transform = 'translate3d(0px,0px,0px)';

    document.addEventListener('scroll', function (e) {
        document.getElementById("layer1").scrollTop = 0;
    });
    document.addEventListener('wheel', wheelListener);

    function wheelListener(e) {
        if (e.deltaY > 0) {
            scrollPage(-pageHeight);
        } else {
            scrollPage(+pageHeight);
        }
    }

    function scrollPage(scrollSize) {
        isAnimating = true;
        var yPos = getNewYPos(scrollSize);
        document.getElementById("layer1").style.transform = "translate3d(0px," + yPos + ",0px)";
    }

    function getNewYPos(add) {
        var oldYPos = document
          .getElementById("layer1")
          .style.transform.split(",")[1];
        oldYPos = parseInt(oldYPos.replace(/px/, ''));
        var newYPos = oldYPos + add;
        if (newYPos > 0) {
            isAnimating = false;
        }
        return Math.min(0, newYPos) + 'px';
    }

    document
      .getElementById("layer1")
      .addEventListener("transitionend", function() {
        setTimeout(function() {
          isAnimating = false;
        }, 1);
        document.addEventListener("wheel", wheelListener);
      });
};