/*
 * Zentrale Einstellungen der Website.
 * Alle Werte, die sich ändern können (Miete, Bezugstermin, Formular-Empfänger),
 * werden nur hier gepflegt.
 */
window.SITE_CONFIG = {
  // Inserat auf ohne-makler.net
  inseratUrl: "https://www.ohne-makler.net/immobilie/464970/",
  inseratId: "OM-464970",

  // Empfänger der Anfragen und Selbstauskünfte
  email: "vermietung@donaukels-immo.de",

  // Formular-Dienst (FormSubmit). Beim ersten Absenden kommt eine Aktivierungs-Mail
  // an die obige Adresse, die einmal bestätigt werden muss.
  // Leer lassen (""), wenn Anfragen nur per E-Mail-Programm (mailto) verschickt werden sollen.
  formEndpoint: "https://formsubmit.co/ajax/vermietung@donaukels-immo.de",

  // Mietkonditionen. null = Feld wird nicht angezeigt, stattdessen Verweis auf das Inserat.
  // Werte in Euro pro Monat, ohne Tausenderpunkt (z. B. 1400).
  miete: {
    kaltmiete: null,
    stellplatz: null,
    nebenkosten: null, // Vorauszahlung Betriebs- und Heizkosten
    kaution: null,
    hinweis: "" // z. B. "Indexmietvertrag"
  },

  // Bezugstermin (Freitext)
  bezugAb: "voraussichtlich 01.12.2026",

  // Energieausweis-Pflichtangaben (§ 87 GEG). null = Verweis auf Inserat/Besichtigung.
  energie: {
    art: null, // "Bedarfsausweis" oder "Verbrauchsausweis"
    kennwert: null, // z. B. "15 kWh/(m²·a)"
    klasse: null, // z. B. "A+"
    traeger: "Strom (Luft-Wasser-Wärmepumpe, PV-Anlage mit Speicher)",
    baujahr: "2026"
  }
};
