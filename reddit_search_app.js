require = (function(r, e, n) {
  function t(n, o) {
    function i(r) {
      return t(i.resolve(r));
    }
    function f(e) {
      return r[n][1][e] || e;
    }
    if (!e[n]) {
      if (!r[n]) {
        var c = "function" == typeof require && require;
        if (!o && c) return c(n, !0);
        if (u) return u(n, !0);
        var l = new Error("Cannot find module '" + n + "'");
        throw ((l.code = "MODULE_NOT_FOUND"), l);
      }
      i.resolve = f;
      var s = (e[n] = new t.Module(n));
      r[n][0].call(s.exports, i, s, s.exports);
    }
    return e[n].exports;
  }
  function o(r) {
    (this.id = r), (this.bundle = t), (this.exports = {});
  }
  var u = "function" == typeof require && require;
  (t.isParcelRequire = !0),
    (t.Module = o),
    (t.modules = r),
    (t.cache = e),
    (t.parent = u);
  for (var i = 0; i < n.length; i++) t(n[i]);
  return t;
})(
  {
    6: [
      function(require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", { value: !0 }),
          (exports.default = {
            search: function(t, e, n) {
              return fetch(
                "https://www.reddit.com/search.json?q=" +
                  t +
                  "&sort=" +
                  n +
                  "&limit=" +
                  e
              )
                .then(function(t) {
                  return t.json();
                })
                .then(function(t) {
                  return t.data.children.map(function(t) {
                    return t.data;
                  });
                })
                .catch(function(t) {
                  return console.log(t);
                });
            }
          });
      },
      {}
    ],
    4: [
      function(require, module, exports) {
        "use strict";
        var e = require("./redditapi"),
          t = a(e);
        function a(e) {
          return e && e.__esModule ? e : { default: e };
        }
        var n = document.getElementById("search-form"),
          r = document.getElementById("search-input");
        function d(e, t) {
          var a = document.createElement("div");
          (a.className = "alert " + t),
            a.appendChild(document.createTextNode(e));
          var n = document.getElementById("search-container"),
            r = document.getElementById("search");
          n.insertBefore(a, r),
            setTimeout(function() {
              document.querySelector(".alert").remove();
            }, 2e3);
        }
        function c(e, t) {
          var a = e.indexOf(" ", t);
          return -1 == a ? e : e.substring(0, a);
        }
        n.addEventListener("submit", function(e) {
          e.preventDefault();
          var a = r.value,
            n = document.querySelector('input[name="sortby"]:checked').value,
            s = document.getElementById("limit").value;
          "" === a && d("Please add search term", "alert-danger"),
            t.default.search(a, s, n).then(function(e) {
              var t = '<div class="card-columns">';
              e.forEach(function(e) {
                var a = e.preview
                  ? e.preview.images[0].source.url
                  : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";
                t +=
                  '\n      <div class="card mb-2">\n      <img class="card-img-top" src="' +
                  a +
                  '" alt="Card image cap">\n      <div class="card-body">\n        <h5 class="card-title">' +
                  e.title +
                  '</h5>\n        <p class="card-text">' +
                  c(e.selftext, 100) +
                  '</p>\n        <a href="' +
                  e.url +
                  '" target="_blank\n        " class="btn btn-primary">Read More</a>\n        <hr>\n        <span class="badge badge-secondary">Subreddit: ' +
                  e.subreddit +
                  '</span> \n        <span class="badge badge-dark">Score: ' +
                  e.score +
                  "</span>\n      </div>\n    </div>\n      ";
              }),
                (t += "</div>"),
                (document.getElementById("results").innerHTML = t);
            });
        });
      },
      { "./redditapi": 6 }
    ]
  },
  {},
  [4]
);
