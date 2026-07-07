document.addEventListener("DOMContentLoaded", () => {
	localStorage.getItem("data-night") ? 
		($(".rightFloatBox.mode .icoNight").addClass("active"), $(".rightFloatBox.mode .icoDay").removeClass("active")) : 
		($("html").removeAttr("data-night"), $(".rightFloatBox.mode .icoNight").removeClass("active"), $(".rightFloatBox.mode .icoDay").addClass("active")), $(".rightFloatBox.mode").on("click", () => {
			localStorage.getItem("data-night") ? 
				($(".rightFloatBox.mode .icoNight").removeClass("active"), $(".rightFloatBox.mode .icoDay").addClass("active"), $("html").removeAttr("data-night"), localStorage.removeItem("data-night")) : 
				($(".rightFloatBox.mode .icoNight").addClass("active"), $(".rightFloatBox.mode .icoDay").removeClass("active"), $("html").attr("data-night", "night"), localStorage.setItem("data-night", "night"))
		}),
	Otsite.IS_MOBILE || "off" === Otsite.DYNAMIC_BACKGROUND || !Otsite.DYNAMIC_BACKGROUND || Otsite.WALLPAPER_BACKGROUND_PC || $.getScript(window.Otsite.THEME_URL + `assets/backdrop/${Otsite.DYNAMIC_BACKGROUND}`),
	$(".topSearchBox .input").on("click", e => {
		e.stopPropagation(), $(".topSearchBox .result").addClass("active")
	}), $(document).on("click", function() {
		$(".topSearchBox .result").removeClass("active")
	}), $(".navSubMenuBox").each(function(e, t) {
		const o = $(this).find(".navSubMenuItem"),
			a = $(t).attr("trigger") || "click",
			n = $(t).attr("placement") || $(this).height() || 0;
		o.css("top", n), "hover" === a ? $(this).hover(() => $(this).addClass("active"), () => $(this).removeClass("active")) : ($(this).on("click", function(e) {
			$(this).toggleClass("active"), $(document).one("click", () => $(this).removeClass("active")), e.stopPropagation()
		}), o.on("click", e => e.stopPropagation()))
	}); {
		let e = null;
		const t = () => (document.documentElement.scrollTop || document.body.scrollTop) > 300 ? $(".rightFloatBox.scroll").addClass("active") : $(".rightFloatBox.scroll").removeClass("active");
		t(), $(document).on("scroll", () => {
			clearTimeout(e), e = setTimeout(t, 80)
		}), $(".rightFloatBox.scroll").on("click", () => window.scrollTo({
			top: 0,
			behavior: "smooth"
		}))
	}
	if ($(".commItemBox.timelife").length) {
		let e = [{
			title: "今日已经过去",
			endTitle: "小时",
			num: 0,
			percent: "0%"
		}, {
			title: "这周已经过去",
			endTitle: "天",
			num: 0,
			percent: "0%"
		}, {
			title: "本月已经过去",
			endTitle: "天",
			num: 0,
			percent: "0%"
		}, {
			title: "今年已经过去",
			endTitle: "个月",
			num: 0,
			percent: "0%"
		}]; {
			let t = +new Date,
				o = new Date((new Date).toLocaleDateString()).getTime(),
				a = (t - o) / 1e3 / 60 / 60,
				n = a / 24 * 100;
			e[0].num = parseInt(a), e[0].percent = parseInt(n) + "%"
		} {
			let t = {
					0: 7,
					1: 1,
					2: 2,
					3: 3,
					4: 4,
					5: 5,
					6: 6
				},
				o = t[(new Date).getDay()],
				a = o / 7 * 100;
			e[1].num = parseInt(o), e[1].percent = parseInt(a) + "%"
		} {
			let t = (new Date).getFullYear(),
				o = (new Date).getDate(),
				a = (new Date).getMonth() + 1,
				n = new Date(t, a, 0).getDate(),
				i = o / n * 100;
			e[2].num = o, e[2].percent = parseInt(i) + "%"
		} {
			let t = (new Date).getMonth() + 1,
				o = t / 12 * 100;
			e[3].num = t, e[3].percent = parseInt(o) + "%"
		}
		let t = "";
		e.forEach((e, o) => {
			t += `\n\t\t\t\t\t\t<div class="item">\n\t\t\t\t\t\t\t<div class="title">\n\t\t\t\t\t\t\t\t${e.title}\n\t\t\t\t\t\t\t\t<span class="text">${e.num}</span>\n\t\t\t\t\t\t\t\t${e.endTitle}\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="rateBox">\n\t\t\t\t\t\t\t\t<div class="rateBar">\n\t\t\t\t\t\t\t\t\t<div class="rateInner rateInner${o}" style="width: ${e.percent}"></div>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class="ratePer">${e.percent}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>`
		}), $(".commItemBox.timelife .lifeTimeMain").html(t)
	}
	if ($(".commItemBox.tags").length) {
		const e = [],
			t = ["#F8D800", "#0396FF", "#EA5455", "#7367F0", "#32CCBC", "#F6416C", "#28C76F", "#9F44D3", "#F55555", "#736EFE", "#E96D71", "#DE4313", "#D939CD", "#4C83FF", "#F072B6", "#C346C2", "#5961F9", "#FD6585", "#465EFB", "#FFC600", "#FA742B", "#5151E5", "#BB4E75", "#FF52E5", "#49C628", "#00EAFF", "#F067B4", "#F067B4", "#ff9a9e", "#00f2fe", "#4facfe", "#f093fb", "#6fa3ef", "#bc99c4", "#46c47c", "#f9bb3c", "#e8583d", "#f68e5f"],
			o = (e, t) => (e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e + 1)) + e);
		$(".lifeTimeMain .list li").each((a, n) => {
			e.push({
				label: $(n).attr("data-label"),
				url: $(n).attr("data-url"),
				target: "_blank",
				fontColor: t[o(0, t.length - 1)],
				fontSize: 15
			})
		}), $(".lifeTimeMain .tag").svg3DTagCloud({
			entries: e,
			width: 220,
			height: 220,
			radius: "65%",
			radiusMin: 75,
			bgDraw: !1,
			fov: 800,
			speed: .5,
			fontWeight: 500
		})
	}

	$(".wapIcoMenu").on("click", function() {
		$(".wapSearchArea").removeClass("active"), $(".wapMenuArea").hasClass("active") ? ($("body").css("overflow", ""), $(".wapMenuMask").removeClass("active slideout"), $(".wapMenuArea").removeClass("active")) : ($("body").css("overflow", "hidden"), $(".wapMenuMask").addClass("active slideout"), $(".wapMenuArea").addClass("active"))
	}), $(".wapIcoSearch").on("click", function() {
		$(".wapMenuArea").removeClass("active"), $(".wapSearchArea").hasClass("active") ? ($("body").css("overflow", ""), $(".wapMenuMask").removeClass("active slideout"), $(".wapSearchArea").removeClass("active")) : ($("body").css("overflow", "hidden"), $(".wapMenuMask").addClass("active"), $(".wapSearchArea").addClass("active"))
	}), $(".wapMenuMask").on("click", function() {
		$("body").css("overflow", ""), $(".wapMenuMask").removeClass("active slideout"), $(".wapSearchArea").removeClass("active"), $(".wapMenuArea").removeClass("active")
	}), $(".wapMenuItem .current").parents(".panelBox").show().siblings(".panel").addClass("in"), $(".wapMenuItem .panel").on("click", function() {
		const e = $(this).parent().parent();
		e.find(".panel").not($(this)).removeClass("in"), e.find(".panelBox").not($(this).siblings(".panelBox")).stop().hide("fast"), $(this).toggleClass("in").siblings(".panelBox").stop().toggle("fast")
	}); {
		const e = () => {
			const e = new Date(Otsite.BIRTHDAY),
				t = +new Date,
				o = t - e.getTime();
			let a = o / 864e5,
				n = Math.floor(a),
				i = 24 * (a - n),
				s = Math.floor(i),
				c = 60 * (i - s),
				r = Math.floor(c),
				d = 60 * (c - r),
				_ = Math.floor(d);
			a = String(n).padStart(2, 0), i = String(s).padStart(2, 0), c = String(r).padStart(2, 0), d = String(_).padStart(2, 0), $(".joe_run__day").html(a), $(".joe_run__hour").html(i), $(".joe_run__minute").html(c), $(".joe_run__second").html(d)
		};
		Otsite.BIRTHDAY && /(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2})\:(\d{1,2})\:(\d{1,2})/.test(Otsite.BIRTHDAY) && (e(), setInterval(e, 1e3))
	}
	{
		let e = Otsite.MOTTO;
		e || (e = "个人签名"), e.includes("http") ? $.ajax({
			url: e,
			dataType: "text",
			success: e => $(".userTitle").html(e)
		}) : $(".userTitle").html(e)
	}
	if (!window.Otsite.IS_MOBILE) {
		let e = !0;
		const t = t => {
			if (window.pageYOffset >= $(".headerArea").height() && t <= 0) {
				if (e) return;
				$(".headerArea").addClass("active"), $(".siteInfoBox .commItemBox:last-child").css("top", $(".headerArea").height() - 60 + 15), e = !0
			} else {
				if (!e) return;
				$(".headerArea").removeClass("active"), $(".siteInfoBox .commItemBox:last-child").css("top", $(".headerArea").height() + 15), e = !1
			}
		};
		let o = window.pageYOffset;
		t(o);
		let a = Date.now();
		document.addEventListener("scroll", () => {
			let e = Date.now();
			e - a > 15 && (t(o - window.pageYOffset), o = window.pageYOffset), a = e
		})
	}
});


document.addEventListener("DOMContentLoaded", () => {
    if (0 !== $(".bannerBox .swiper-container").length) {
        let e = "horizontal";
        Otsite.IS_MOBILE || 2 !== $(".bannerBox-recommend .item").length || (e = "vertical"), new Swiper(".swiper-container", {
            keyboard: !1,
            direction: e,
            loop: !0,
            autoplay: !0,
            mousewheel: !0,
            pagination: {
                el: ".swiper-pagination"
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        })
    }
});


// 3D标签云
! function() {
	function t(t, e) {
		function o() {
			F = document.createElementNS(I, "svg"), F.addEventListener("mousemove", y), t.appendChild(F), x.bgDraw && (z = document.createElementNS(I, "rect"), z.setAttribute("x", 0), z.setAttribute("y", 0), z.setAttribute("fill", x.bgColor), F.appendChild(z)), s(), i(), h(), window.addEventListener("resize", b)
		}

		function i() {
			var e = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
				o = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
				i = e,
				r = o;
			x.width.toString().indexOf("%") > 0 || x.height.toString().indexOf("%") > 0 ? (i = Math.round(t.offsetWidth / 100 * parseInt(x.width)), r = Math.round(i / 100 * parseInt(x.height))) : (i = parseInt(x.width), r = parseInt(x.height)), i >= e && (i = e), r >= o && (r = o), P = {
				x: i / 2,
				y: r / 2
			}, E.x = x.speed / P.x, E.y = x.speed / P.y, C = i >= r ? r / 100 * parseInt(x.radius) : i / 100 * parseInt(x.radius), 1 > C && (C = 1), S = C / 2, S < x.radiusMin && (S = x.radiusMin, C = 2 * S), F.setAttribute("width", i), F.setAttribute("height", r), x.bgDraw && (z.setAttribute("width", i), z.setAttribute("height", r)), n(S)
		}

		function n(t) {
			for (var e = 0, o = D.length; o > e; e++) r(D[e], t)
		}

		function r(t, e) {
			var o = t.vectorPosition.x - O.x,
				i = t.vectorPosition.y - O.y,
				n = t.vectorPosition.z - O.z,
				r = Math.sqrt(o * o + i * i + n * n);
			t.vectorPosition.x /= r, t.vectorPosition.y /= r, t.vectorPosition.z /= r, t.vectorPosition.x *= e, t.vectorPosition.y *= e, t.vectorPosition.z *= e
		}

		function l(t, e, o, i, n) {
			var r = {};
			return void 0 !== e.label ? (r.element = document.createElementNS(I, "text"), r.element.setAttribute("x", 0), r.element.setAttribute("y", 0), r.element.setAttribute("fill", null == e.fontColor ? x.fontColor : e.fontColor), r.element.setAttribute("font-family", null == e.fontFamily ? x.fontFamily : e.fontFamily), r.element.setAttribute("font-size", null == e.fontSize ? x.fontSize : e.fontSize), r.element.setAttribute("font-weight", null == e.fontWeight ? x.fontWeight : e.fontWeight), r.element.setAttribute("font-style", null == e.fontStyle ? x.fontStyle : e.fontStyle), r.element.setAttribute("font-stretch", null == e.fontStretch ? x.fontStretch : e.fontStretch), r.element.setAttribute("text-anchor", "middle"), r.element.textContent = x.fontToUpperCase ? e.label.toUpperCase() : e.label) : void 0 !== e.image && (r.element = document.createElementNS(I, "image"), r.element.setAttribute("x", 0), r.element.setAttribute("y", 0), r.element.setAttribute("width", e.width), r.element.setAttribute("height", e.height), r.element.setAttribute("id", "image_" + t), r.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", e.image), r.diffX = e.width / 2, r.diffY = e.height / 2), r.link = document.createElementNS(I, "a"), r.link.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", e.url), r.link.setAttribute("target", e.target), r.link.addEventListener("mouseover", m, !0), r.link.addEventListener("mouseout", v, !0), r.link.appendChild(r.element), void 0 !== e.tooltip ? (r.tooltip = !0, r.tooltipLabel = x.tooltipFontToUpperCase ? e.tooltip.toUpperCase() : e.tooltip) : r.tooltip = !1, r.index = t, r.mouseOver = !1, r.vectorPosition = {
				x: o,
				y: i,
				z: n
			}, r.vector2D = {
				x: 0,
				y: 0
			}, F.appendChild(r.link), r
		}

		function s() {
			for (var t = !1, e = 1, o = x.entries.length + 1; o > e; e++) {
				var i = Math.acos(2 * e / o - 1),
					n = Math.sqrt(o * Math.PI) * i,
					r = Math.cos(n) * Math.sin(i),
					s = Math.sin(n) * Math.sin(i),
					u = Math.cos(i),
					c = l(e - 1, x.entries[e - 1], r, s, u);
				D.push(c), void 0 !== x.entries[e - 1].tooltip && (t = !0)
			}
			t && a()
		}

		function a() {
			w = document.createElementNS(I, "text"), w.setAttribute("x", 0), w.setAttribute("y", 0), w.setAttribute("fill", x.tooltipFontColor), w.setAttribute("font-family", x.tooltipFontFamily), w.setAttribute("font-size", x.tooltipFontSize), w.setAttribute("font-weight", x.tooltipFontWeight), w.setAttribute("font-style", x.tooltipFontStyle), w.setAttribute("font-stretch", x.tooltipFontStretch), w.setAttribute("text-anchor", x.tooltipTextAnchor), w.textContent = "", F.appendChild(w)
		}

		function u(t) {
			for (var e = 0, o = D.length; o > e; e++) {
				var i = D[e];
				if (i.element.getAttribute("x") === t.getAttribute("x") && i.element.getAttribute("y") === t.getAttribute("y")) return i
			}
		}

		function c(t) {
			for (var e = 0, o = D.length; o > e; e++) {
				var i = D[e];
				i.index === t.index ? i.mouseOver = !0 : i.mouseOver = !1
			}
		}

		function f(t) {
			t.tooltip && (w.setAttribute("x", t.vector2D.x - x.tooltipDiffX), w.setAttribute("y", t.vector2D.y - x.tooltipDiffY), w.textContent = x.tooltipFontToUpperCase ? t.tooltipLabel.toUpperCase() : t.tooltipLabel, w.setAttribute("opacity", 1))
		}

		function d(t) {
			w.setAttribute("opacity", 0)
		}

		function p() {
			var t = E.x * T.x - x.speed,
				e = x.speed - E.y * T.y,
				o = t * W,
				i = e * W;
			k.sx = Math.sin(o), k.cx = Math.cos(o), k.sy = Math.sin(i), k.cy = Math.cos(i);
			for (var n = 0, r = D.length; r > n; n++) {
				var l = D[n];
				if (M) {
					var s = l.vectorPosition.x,
						a = l.vectorPosition.y * k.sy + l.vectorPosition.z * k.cy;
					l.vectorPosition.x = s * k.cx + a * k.sx, l.vectorPosition.y = l.vectorPosition.y * k.cy + l.vectorPosition.z * -k.sy, l.vectorPosition.z = s * -k.sx + a * k.cx
				}
				var u, c = x.fov / (x.fov + l.vectorPosition.z);
				l.vector2D.x = l.vectorPosition.x * c + P.x, l.vector2D.y = l.vectorPosition.y * c + P.y, l.diffX && l.diffY && (l.vector2D.x -= l.diffX, l.vector2D.y -= l.diffY), l.element.setAttribute("x", l.vector2D.x), l.element.setAttribute("y", l.vector2D.y), M ? (u = (S - l.vectorPosition.z) / C, u < x.opacityOut && (u = x.opacityOut)) : (u = parseFloat(l.element.getAttribute("opacity")), u += l.mouseOver ? (x.opacityOver - u) / x.opacitySpeed : (x.opacityOut - u) / x.opacitySpeed), l.element.setAttribute("opacity", u)
			}
			D = D.sort(function(t, e) {
				return e.vectorPosition.z - t.vectorPosition.z
			})
		}

		function h() {
			requestAnimFrame(h), p()
		}

		function m(t) {
			M = !1;
			var e = u(t.target);
			c(e), e.tooltip && f(e)
		}

		function v(t) {
			M = !0;
			var e = u(t.target);
			e.tooltip && d(e)
		}

		function y(t) {
			T = g(F, t)
		}

		function g(t, e) {
			var o = t.getBoundingClientRect();
			return {
				x: e.clientX - o.left,
				y: e.clientY - o.top
			}
		}

		function b(t) {
			i()
		}
		var x = {
			entries: [],
			width: 480,
			height: 480,
			radius: "70%",
			radiusMin: 75,
			bgDraw: !0,
			bgColor: "#000",
			opacityOver: 1,
			opacityOut: .05,
			opacitySpeed: 6,
			fov: 800,
			speed: 2,
			fontFamily: "Arial, sans-serif",
			fontSize: "15",
			fontColor: "#fff",
			fontWeight: "normal",
			fontStyle: "normal",
			fontStretch: "normal",
			fontToUpperCase: !1,
			tooltipFontFamily: "Arial, sans-serif",
			tooltipFontSize: "15",
			tooltipFontColor: "#fff",
			tooltipFontWeight: "normal",
			tooltipFontStyle: "normal",
			tooltipFontStretch: "normal",
			tooltipFontToUpperCase: !1,
			tooltipTextAnchor: "left",
			tooltipDiffX: 0,
			tooltipDiffY: 10
		};
		if (void 0 !== e)
			for (var A in e) e.hasOwnProperty(A) && x.hasOwnProperty(A) && (x[A] = e[A]);
		if (!x.entries.length) return !1;
		var w, S, C, P, F, z, D = [],
			M = !0,
			T = {
				x: 0,
				y: 0
			},
			O = {
				x: 0,
				y: 0,
				z: 0
			},
			E = {
				x: 0,
				y: 0
			},
			k = {
				sx: 0,
				cx: 0,
				sy: 0,
				cy: 0
			},
			W = Math.PI / 180,
			I = "http://www.w3.org/2000/svg";
		window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
			window.setTimeout(t, 1e3 / 60)
		}, o()
	}
	window.SVG3DTagCloud = t
}(), "undefined" != typeof jQuery && function(t) {
	t.fn.svg3DTagCloud = function(e) {
		var o = arguments;
		return this.each(function() {
			if (t.data(this, "plugin_SVG3DTagCloud")) {
				var i = t.data(this, "plugin_SVG3DTagCloud");
				i[e] ? i[e].apply(this, Array.prototype.slice.call(o, 1)) : t.error("Method " + e + " does not exist on jQuery.svg3DTagCloud")
			} else t.data(this, "plugin_SVG3DTagCloud", new SVG3DTagCloud(this, e))
		})
	}
}(jQuery);