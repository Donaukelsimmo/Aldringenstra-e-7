(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};

  function fmtEuro(v) {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 }).format(v);
  }

  // Links und Texte aus der Konfiguration
  document.querySelectorAll("[data-inserat]").forEach(function (a) { a.href = C.inseratUrl; });
  document.querySelectorAll("[data-inserat-id]").forEach(function (el) { el.textContent = C.inseratId; });
  document.querySelectorAll("[data-email]").forEach(function (el) {
    if (el.tagName === "A") el.href = "mailto:" + C.email;
    el.textContent = C.email;
  });
  document.querySelectorAll("[data-bezug]").forEach(function (el) { el.textContent = C.bezugAb; });

  // Mietkonditionen
  var priceRows = document.getElementById("price-rows");
  if (priceRows && C.miete) {
    var m = C.miete;
    var rows = (m.positionen || []).filter(function (r) { return r[1] != null; });
    if (rows.length) {
      var html = rows.map(function (r) {
        return '<div class="price-row"><span>' + r[0] + "</span><span>" + fmtEuro(r[1]) + "</span></div>";
      }).join("");
      if (rows.length > 1) {
        var sum = rows.reduce(function (s, r) { return s + r[1]; }, 0);
        html += '<div class="price-row total"><span>Gesamtmiete monatlich</span><span>' + fmtEuro(sum) + "</span></div>";
      }
      if (m.kaution != null) html += '<div class="price-row"><span>Kaution</span><span>' + fmtEuro(m.kaution) + "</span></div>";
      priceRows.innerHTML = html;
      var note = document.getElementById("price-note");
      if (note && m.hinweis) note.textContent = m.hinweis + " · Provisionsfrei, Vermietung direkt vom Eigentümer.";
    }
  }

  // Energieausweis
  var en = document.getElementById("energy");
  if (en && C.energie) {
    var e = C.energie;
    var parts = [];
    if (e.art) parts.push(e.art);
    if (e.kennwert) parts.push("Endenergie " + e.kennwert);
    if (e.klasse) parts.push("Effizienzklasse " + e.klasse);
    if (e.traeger) parts.push("Energieträger: " + e.traeger);
    if (e.baujahr) parts.push("Baujahr " + e.baujahr);
    var txt = parts.join(" · ");
    if (!e.art || !e.kennwert) txt += " · Kennwerte des Energieausweises siehe Inserat bzw. Vorlage bei der Besichtigung.";
    en.textContent = txt;
  }

  // Warmmiete in Texten
  if (C.miete && C.miete.positionen) {
    var warm = C.miete.positionen.reduce(function (s, r) { return s + (r[1] || 0); }, 0);
    document.querySelectorAll("[data-warmmiete]").forEach(function (el) {
      el.textContent = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }).format(warm) + " €";
    });
  }

  // Galerie mit Großansicht
  var lb = document.getElementById("lightbox");
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".gallery a"));
  if (lb && thumbs.length) {
    var lbImg = lb.querySelector("img");
    var lbCap = lb.querySelector("figcaption");
    var idx = 0;
    function show(i) {
      idx = (i + thumbs.length) % thumbs.length;
      var a = thumbs[idx];
      lbImg.src = a.getAttribute("href");
      lbImg.alt = a.querySelector("img").alt;
      lbCap.textContent = a.getAttribute("data-caption") || "";
    }
    function open(i) { show(i); lb.hidden = false; document.body.style.overflow = "hidden"; lb.querySelector(".lb-close").focus(); }
    function close() { lb.hidden = true; document.body.style.overflow = ""; thumbs[idx].focus(); }
    thumbs.forEach(function (a, i) {
      a.addEventListener("click", function (ev) { ev.preventDefault(); open(i); });
    });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(idx - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { show(idx + 1); });
    lb.addEventListener("click", function (ev) { if (ev.target === lb) close(); });
    document.addEventListener("keydown", function (ev) {
      if (lb.hidden) return;
      if (ev.key === "Escape") close();
      if (ev.key === "ArrowLeft") show(idx - 1);
      if (ev.key === "ArrowRight") show(idx + 1);
    });
  }

  // Mobile CTA
  if (document.querySelector(".mobile-cta")) document.body.classList.add("has-mobile-cta");

  // Formulare
  function formToObject(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      if (typeof value !== "string") return;
      value = value.trim();
      if (value === "" && key !== "_honey") return;
      if (key in data) data[key] += ", " + value;
      else data[key] = value;
    });
    return data;
  }

  function toPlainText(data) {
    return Object.keys(data)
      .filter(function (k) { return k.charAt(0) !== "_" && data[k] !== ""; })
      .map(function (k) { return k + ": " + data[k]; })
      .join("\n");
  }

  function mailtoLink(subject, body) {
    // mailto-Links werden von vielen Programmen bei ca. 2.000 Zeichen abgeschnitten
    if (body.length > 1800) body = body.slice(0, 1800) + "\n[…gekürzt]";
    return "mailto:" + C.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function showStatus(el, cls, html) {
    el.className = "form-status " + cls;
    el.innerHTML = html;
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.querySelectorAll("form[data-send]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var button = form.querySelector("button[type=submit]");
    var subjectBase = form.getAttribute("data-subject") || "Anfrage Aldringenstraße 7";
    var successText = form.getAttribute("data-success") || "Vielen Dank. Ihre Nachricht ist eingegangen.";

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      if (!form.reportValidity()) return;

      var data = formToObject(form);
      if (data._honey) return; // Spam-Schutz
      var name = data["Name"] || data["Interessent 1 – Name"] || "";
      var subject = subjectBase + (name ? " – " + name : "");
      var text = toPlainText(data);
      var fallback = mailtoLink(subject, text);

      if (!C.formEndpoint) {
        window.location.href = fallback;
        showStatus(status, "ok", "Ihr E-Mail-Programm wurde geöffnet. Bitte senden Sie die vorbereitete Nachricht ab.");
        return;
      }

      data._subject = subject;
      data._template = "table";
      data._captcha = "false";
      delete data._honey;

      button.disabled = true;
      var label = button.textContent;
      button.textContent = "Wird gesendet …";

      fetch(C.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (!res.ok || String(res.body.success) === "false") throw new Error("send failed");
          form.reset();
          showStatus(status, "ok", successText);
          if (typeof form.onSent === "function") form.onSent();
        })
        .catch(function () {
          showStatus(status, "err",
            'Die Übermittlung hat nicht geklappt. Bitte <a href="' + fallback + '">senden Sie Ihre Angaben per E-Mail</a> ' +
            "oder schreiben Sie direkt an " + C.email + ".");
        })
        .then(function () {
          button.disabled = false;
          button.textContent = label;
        });
    });
  });

  // Weitere Personen (Selbstauskunft)
  var addBtn = document.getElementById("add-person");
  if (addBtn) {
    var count = 1;
    addBtn.addEventListener("click", function () {
      count++;
      var wrap = document.getElementById("person-rows");
      var row = document.createElement("div");
      row.className = "person-row";
      row.innerHTML =
        '<input type="text" name="Weitere Person ' + count + ' – Name" placeholder="Name" aria-label="Name">' +
        '<input type="text" name="Weitere Person ' + count + ' – Geburtsdatum" placeholder="Geburtsdatum" aria-label="Geburtsdatum">' +
        '<input type="text" name="Weitere Person ' + count + ' – Verhältnis" placeholder="Verhältnis zu Interessent/in 1" aria-label="Verhältnis">';
      wrap.appendChild(row);
      if (count >= 6) addBtn.disabled = true;
    });
  }

  var printBtn = document.getElementById("print-form");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
})();
