
# Aldringenstraße 7 – Vermietungs-Website

Statische Website zur Vermietung der Neubauwohnung Aldringenstraße 7, Whg. 08, 85051 Ingolstadt.

## Seiten
- `index.html` – Wohnungsvorstellung, Kurzanfrage, Link auf das Inserat OM-464970 (ohne-makler.net)
- `selbstauskunft.html` – Mieterselbstauskunft online (inhaltsgleich mit dem PDF/Word-Formular)
- `impressum.html`, `datenschutz.html`

## Pflege
Alle veränderlichen Werte stehen in `assets/config.js`:
- `miete` – Kaltmiete, Stellplatz, Nebenkosten, Kaution. Solange `null`, verweist die Seite auf das Inserat.
- `energie` – Pflichtangaben aus dem Energieausweis (§ 87 GEG).
- `bezugAb` – Bezugstermin.
- `formEndpoint` – Formular-Dienst. Standard: FormSubmit an vermietung@donaukels-immo.de.
  Beim ersten Absenden kommt eine Aktivierungs-Mail, die einmal bestätigt werden muss.
  Leerer Wert = Formulare öffnen das E-Mail-Programm (mailto).

Fotos liegen in `images/`.

## Veröffentlichung (GitHub Pages)
Repository → Settings → Pages → Branch auswählen, Ordner `/ (root)`.
