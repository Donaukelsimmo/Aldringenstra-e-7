/*
 * Zentrale Einstellungen der Website.
 * Alle Werte, die sich ändern können (Miete, Bezugstermin, Formular-Empfänger),
 * werden nur hier gepflegt. Quelle: Exposé OM-464970 (ohne-makler.net).
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

  // Mietkonditionen in Euro pro Monat. Die Gesamtmiete wird automatisch summiert.
  miete: {
    positionen: [
      ["Kaltmiete Wohnung", 1400],
      ["Einbauküche", 80],
      ["Tiefgaragenstellplatz inkl. Wallbox", 120],
      ["Kellerabteil", 50],
      ["Nebenkosten (Vorauszahlung)", 115],
      ["Heizkosten (Vorauszahlung)", 70]
    ],
    kaution: 4200,
    hinweis: ""
  },

  // Bezugstermin (Freitext)
  bezugAb: "01.11.2026",

  // Energieausweis-Pflichtangaben (§ 87 GEG)
  energie: {
    art: "Bedarfsausweis",
    kennwert: "6,1 kWh/(m²·a)",
    klasse: "A+",
    traeger: "Luft-/Wasser-Wärmepumpe",
    baujahr: "2026"
  }
};
