var sp = function(e, t) {
    var n, r = !0,
        i = window,
        o = document.location,
        a = i.XMLHttpRequest && "withCredentials" in new XMLHttpRequest,
        c = Object.prototype.toString,
        s = {
            api_host: ("https:" == o.protocol ? "https://" : "http://") + o.hostname + o.pathname,
            track_pageview: !0,
            track_links_timeout: 300,
            cookie_name: "_sp",
            cookie_expiration: 365,
            cookie_domain: (n = o.hostname.match(/[a-z0-9][a-z0-9\-]+\.[a-z\.]{2,6}$/i)) ? n[0] : ""
        },
        u = "pageview",
        p = "sp_alias";
    Date.prototype.toISOString || function() {
        function e(e) {
            var t = String(e);
            return 1 === t.length && (t = "0" + t), t
        }
        Date.prototype.toISOString = function() {
            return this.getUTCFullYear() + "-" + e(this.getUTCMonth() + 1) + "-" + e(this.getUTCDate()) + "T" + e(this.getUTCHours()) + ":" + e(this.getUTCMinutes()) + ":" + e(this.getUTCSeconds()) + "." + String((this.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z"
        }
    }(), Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
        "use strict";
        var n, r;
        for (n = 0, r = this.length; r > n; ++n) n in this && e.call(t, this[n], n, this)
    });
    var f = {
            getItem: function(e) {
                return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null
            },
            setItem: function(e, t, n, r, i, o) {
                if (!e || /^(?:expires|max\-age|path|domain|secure)$/i.test(e)) return !1;
                var a = "";
                if (n) switch (n.constructor) {
                    case Number:
                        a = 1 / 0 === n ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + n;
                        break;
                    case String:
                        a = "; expires=" + n;
                        break;
                    case Date:
                        a = "; expires=" + n.toGMTString()
                }
                return document.cookie = escape(e) + "=" + escape(t) + a + (i ? "; domain=" + i : "") + (r ? "; path=" + r : "") + (o ? "; secure" : ""), !0
            },
            removeItem: function(e, t) {
                return e && this.hasItem(e) ? (document.cookie = escape(e) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (t ? "; path=" + t : ""), !0) : !1
            },
            hasItem: function(e) {
                return new RegExp("(?:^|;\\s*)" + escape(e).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
            }
        },
        l = function() {
            var e, t = {};
            if (e = f.getItem(s.cookie_name)) {
                try {
                    t = JSON.parse(decodeURIComponent(e))
                } catch (n) {}
                return t
            }
            return !1
        },
        h = function(e) {
            f.setItem(s.cookie_name, i.encodeURIComponent(JSON.stringify(e)), 3600 * 24 * s.cookie_expiration, "/", s.cookie_domain)
        },
        m = function() {
            function e(t) {
                return t ? (t ^ 16 * Math.random() >> t / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, e)
            }
            return e
        }(),
        d = function() {
            var e, t = !1;
            return (e = l()) && (t = e && e.id), t
        },
        v = function(e) {
            var t;
            return t = l() || {}, t.id = e ? e : m(), h(t), t.id
        },
        g = function() {
            var e;
            return (e = d()) || (e = v()), e
        },
        k = function(e, t, n, r) {
            return e.addEventListener ? e.addEventListener(t, n, r || !1) : e.attachEvent("on" + t, n), n
        },
        y = function(e) {
            if ("function" == typeof e) {
                var t = s.track_links_timeout;
                return "[object Number]" != c.call(t) ? (i.setTimeout(e), void 0) : (i.setTimeout(e, t), void 0)
            }
        },
        _ = function(e) {
            if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return !0;
            var n = e.which,
                r = e.button;
            return n || r === t ? 2 === n ? !0 : !1 : 1 & !r && 2 & !r && 4 & r
        };
    e.init = function(n) {
        for (name in n) {
            var r = n[name];
            r !== t && (s[name] = n[name])
        }
        return s.api_host = s.api_host.replace("/$", ""), e
    }, e.track = function(t, n, o) {
        n = n || {};
        var c = l();
        if (c)
            for (var u in c) n[u] = c[u];
        n.id || (n.id = g());
        var p = {
                e: t,
                t: (new Date).toISOString(),
                kv: n
            },
            f = s.api_host + "/track?data=" + i.encodeURIComponent(JSON.stringify(p));
        if (a) {
            var h = new XMLHttpRequest;
            h.open("GET", f, r), h.withCredentials = r, h.send(null)
        } else {
            var m = document.createElement("script");
            m.type = "text/javascript", m.async = r, m.defer = r, m.src = f;
            var d = document.getElementsByTagName("script")[0];
            d.parentNode.insertBefore(m, d)
        }
        return y(o), e
    }, e.pageview = function(t) {
        var n = {
            url: t || o.href,
            name: document.title,
            referrer: document.referrer
        };
        return e.track(u, n)
    }, e.trackLink = function(t, n, r) {
        return t ? (t.jquery && (t = t.get()), "[object Array]" != c.call(t) && (t = [t]), t.forEach(function(t) {
            k(t, "click", function(o) {
                var a = "function" == typeof n ? n(t) : n,
                    c = "function" == typeof r ? r(t) : r;
                c = c || {}, c.href = t.href, c.text = t.textContent, e.track(a, c), t.href && "_blank" !== t.target && !_(o) && (o.preventDefault ? o.preventDefault() : o.returnValue = !1, y(function() {
                    i.location.href = t.href
                }))
            })
        }), e) : !1
    }, e.identify = function(t, n) {
        if (t) {
            var r = d();
            v(t), r && e.track(p, {
                oldId: r
            })
        }
        if (n) {
            var i = l();
            for (var o in n) i[o] = n[o];
            h(i)
        }
        return e
    }, e.get_distinct_id = function() {
        return g()
    }, e._endpoint ? e.init({
        api_host: e._endpoint
    }) : console.error("[sp] Your must set your collector endpoint via sp.load(endpoint) in thoughtservice Analytics JS snippet");
    for (var S = !1, w = "", T = 0, o = e.length; o > T; T++) w = e[T][0], "pageview" == w && (S = !0), e[w].apply(null, e[T].slice(1));
    return e.splice(0, o), !S && s.track_pageview && e.pageview(), e
}(sp || []);