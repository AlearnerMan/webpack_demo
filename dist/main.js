(() => {
    "use strict";
    var e = document.getElementById("root");

    function n(e, n) {
        var t = null;
        return function () {
            return t || (t = document.createElement(e)), t.innerHTML = n, t
        }
    }


    console.log(aaa+"sdfkajsf");
    var t = n("div", "header"),
        r = n("div", "content");
    e.append(new t), e.append(new r)
})();