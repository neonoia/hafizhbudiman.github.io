window.onload = function () {
    var pageHeight = 100;
    var layer2 = 30;
    var isAnimating = false;
    document.getElementById("layer1").style.transform = 'translate3d(0px,0px,0px)';
    document.getElementById("layer2").style.transform = "translate3d(0px,0px,0px)";

    document.addEventListener('scroll', function (e) {
        document.getElementById("layer1").scrollTop = 0;
        document.getElementById("layer2").scrollTop = 0;
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
        var yPos1 = getNewYPos1(scrollSize);
        var yPos2;
        if (scrollSize <= 0) {
            yPos2 = getNewYPos2(-layer2);
        } else {
            yPos2 = getNewYPos2(layer2);
        }
        document.getElementById("layer1").style.transform = "translate3d(0px," + yPos1 + ",0px)";
        document.getElementById("layer2").style.transform = "translate3d(0px," + yPos2 + ",0px)";
    }

    function getNewYPos1(add) {
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

    function getNewYPos2(add) {
        var oldYPos = document
            .getElementById("layer2")
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
    document
        .getElementById("layer2")
        .addEventListener("transitionend", function () {
            setTimeout(function () {
                isAnimating = false;
            }, 1);
            document.addEventListener("wheel", wheelListener);
        });
};