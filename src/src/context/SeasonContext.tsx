import React, { createContext, useContext, useState, useEffect } from 'react';

export type SeasonId = 'autumn' | 'winter' | 'spring' | 'summer';

export interface SeasonTip {
  id: string;
  title: string;
  category: string;
  tag: string;
  challenge: string;
  recommendation: string;
  stepByStep: string[];
  scope: 'platinrein' | 'eigenvorsorge';
  iconName: string;
}

export interface SeasonQuote {
  quote: string;
  author: string;
  context: string;
}

export interface SeasonChecklistItem {
  id: string;
  task: string;
  description: string;
}

export interface SeasonConfig {
  id: SeasonId;
  name: string;
  tagline: string;
  kicker: string;
  headlineLead: string;
  headlineAccent: string;
  description: string;
  heroImage: string;
  aboutImage: string;
  accentBadge: string;
  note: string;
  tips: SeasonTip[];
  quotes: SeasonQuote[];
  checklist: SeasonChecklistItem[];
}

export const SEASONS_DATA: Record<SeasonId, SeasonConfig> = {
  autumn: {
    id: 'autumn',
    name: 'Herbst',
    tagline: 'Goldenes Herbstlicht & meisterhafte Reinheit',
    kicker: 'Herbst-Edition & Werterhalt',
    headlineLead: 'Pure',
    headlineAccent: 'Herbst-Ästhetik.',
    description: 'Goldenes Herbstlicht, makellose Glasflächen und vollendete Reinheit. Platinrein bietet diskreten, erstklassigen Gebäudeservice für anspruchsvolle Privathäuser, Kanzleien, Praxen und repräsentative Gewerbeimmobilien in NRW.',
    heroImage: '/src/assets/images/hero_autumn_building_1791798144635.jpg',
    aboutImage: '/src/assets/images/autumn_exclusive_entrance_1791794721368.jpg',
    accentBadge: 'Herbst-Saison 2026',
    note: 'Erstklassige Innenraum- und Glaspflege für die goldene Jahreszeit.',
    quotes: [
      {
        quote: '„Reinheit ist nicht die Abwesenheit von Leben, sondern die Kunst, dem Wesentlichen seinen reinsten Raum zu geben.“',
        author: 'Platinrein Leitgedanke',
        context: 'Philosophie für Klarheit & Wohlbefinden'
      },
      {
        quote: '„Im sanften Licht des Herbstes zeigt sich die wahre Qualität eines Raumes: Wenn alles zur Ruhe kommt, zählt jedes Detail.“',
        author: 'Resul Gündüz',
        context: 'Inhaber Platinrein Gebäudeservice'
      },
      {
        quote: '„Qualität bedeutet, der Sache die Zeit und Sorgfalt zu schenken, die sie braucht, um vollkommen zu sein.“',
        author: 'Handwerksphilosophie',
        context: 'Werterhalt durch Präzision'
      }
    ],
    tips: [
      {
        id: 'naessestopp',
        title: 'Nässestopp & Schutz für edle Böden',
        category: 'Eingangsbereich & Foyers',
        tag: 'Boden-Werterhalt',
        challenge: 'Nasses Laub, Feuchtigkeit und feiner Sand wirken auf poliertem Marmor, Granit und Echtholzparkett wie feines Schmirgelpapier und können bleibende Kratzer verursachen.',
        recommendation: 'Etablieren Sie ein 3-Zonen-Schmutzfangkonzept: Eine Grobmatte im wettergeschützten Außenbereich, feuchtigkeitsabsorbierende Textilmatten im Windfang und regelmäßiges trockenes Absaugen. So halten Sie bis zu 85% des Straßenschmutzes fern.',
        stepByStep: [
          'Grobmatte vor der Eingangstür fängt groben Schmutz und feuchtes Laub ab.',
          'Saugfähige Textilmatte im Foyer nimmt Regenfeuchtigkeit von Schuhsohlen auf.',
          'Tägliches kurzes Bürstsaugen verhindert, dass Sandkörner in den Belag gerieben werden.'
        ],
        scope: 'platinrein',
        iconName: 'Sparkles'
      },
      {
        id: 'glas-herbstlicht',
        title: 'Streifenfreie Glaspflege bei tiefem Herbstlicht',
        category: 'Fenster & Glasflächen',
        tag: 'Glasästhetik',
        challenge: 'Die tiefstehende Herbstsonne bricht sich unbarmherzig an jedem Schmutzfilm. Regenwasser vermischt mit organischen Blattstäuben brennt sich bei Sonnenschein leicht in Glasflächen ein.',
        recommendation: 'Reinigen Sie Fensterflächen vorzugsweise an bewölkten Tagen oder morgens, damit Reinigungslösungen nicht vorzeitig antrocknen. Vermeiden Sie aggressive Scheuermittel, die empfindliche Beschichtungen angreifen.',
        stepByStep: [
          'Fenster nicht bei direkter Sonneneinstrahlung putzen, um Schlierenbildung zu vermeiden.',
          'Immer zuerst Fensterrahmen und Falze säubern, danach die Glasflächen abziehen.',
          'Verwenden Sie hochwertige Mikrofasertücher ohne Weichspüler für das Finish.'
        ],
        scope: 'platinrein',
        iconName: 'Sun'
      },
      {
        id: 'raumklima-hygiene',
        title: 'Raumhygiene & Wohlfühlklima zur Heizperiode',
        category: 'Büro, Kanzlei & Praxis',
        tag: 'Hygiene & Gesundheit',
        challenge: 'Mit dem Start der Heizperiode wird die Raumluft trockener und Viren sowie Bakterien halten sich länger auf oft berührten Oberflächen wie Türklinken, Schreibtischen und Tastaturen.',
        recommendation: 'Erhöhen Sie die Wischfrequenz auf hochfrequentierten Kontaktpunkten mit materialschonenden Reinigungsmitteln. Richtiges Stoßlüften (3–5 Minuten mit Durchzug) tauscht die Luft schnell aus, ohne die Wände auszukühlen.',
        stepByStep: [
          'Mehrmals täglich 3–5 Minuten Stoßlüften statt Fenster auf Dauerkipp zu stellen.',
          'Gezielte Wischpflege für Kontaktstellen wie Lichtschalter, Türklinken und Kaffeeküchen.',
          'Heizkörper vor dem ersten Aufdrehen entstauben, um verbranntem Staubgeruch vorzubeugen.'
        ],
        scope: 'platinrein',
        iconName: 'Droplets'
      },
      {
        id: 'lichtschacht-eigenvorsorge',
        title: 'Lichtschächte & Abläufe (Eigenvorsorge-Tipp!)',
        category: 'Praxistipp für Eigentümer & Hausmeister',
        tag: 'Ratgeber für Eigentümer',
        challenge: 'Nasses Herbstlaub sammelt sich lautlos auf Lichtschachtgittern und Bodenabläufen. Bei plötzlichem Starkregen kann gestautes Wasser Kellerfenster oder Sockelbereiche belasten.',
        recommendation: 'Ein wertvoller Praxistipp zur Eigenvorsorge für Eigentümer: Kontrollieren Sie vor gemeldetem Dauerregen kurz die Gitterroste und Abläufe und befreien Sie diese mit Handfeger oder Laubharke. (Transparenter Hinweis: Platinrein ist spezialisiert auf meisterhafte Innenraum- und Glasreinigung – diesen nützlichen Tipp geben wir Ihnen als Ratgeber für Ihre eigene Vorsorge mit auf den Weg!)',
        stepByStep: [
          'Lichtschacht-Gitter vor angekündigtem Dauerregen kurz auf Laubschichten prüfen.',
          'Bei starkem Laubfall ggf. feinmaschige Schutzgitter aus dem Fachhandel überlegen.',
          'Freier Wasserablauf im Schacht verhindert Feuchtigkeitsdruck am Mauerwerk.'
        ],
        scope: 'eigenvorsorge',
        iconName: 'Leaf'
      }
    ],
    checklist: [
      { id: 'c1', task: 'Schmutzfangzone einrichten', description: 'Grob- und Feinmatte im Eingangsbereich auslegen, um Nässe und Schmutz zu stoppen.' },
      { id: 'c2', task: 'Glasflächen streifenfrei pflegen', description: 'Fenster von sommerlichen Rückständen befreien, um tiefstehendes Herbstlicht voll zu nutzen.' },
      { id: 'c3', task: 'Heizkörper entstauben', description: 'Vor Beginn des dauerhaften Heizens Heizlamellen entstauben für frische, gesunde Raumluft.' },
      { id: 'c4', task: 'Kontaktflächen-Hygiene etablieren', description: 'Tägliche Wischpflege für Türklinken, Schalter und Tastaturen gegen Erkältungswellen.' },
      { id: 'c5', task: 'Lichtschächte prüfen (Eigenvorsorge)', description: 'Gitterroste und Bodenabläufe selbst oder über den Hausmeisterdienst laubfrei halten.' }
    ]
  },
  winter: {
    id: 'winter',
    name: 'Winter',
    tagline: 'Winter-Guide: Werterhalt bei Frost, Kälte und Streusalz',
    kicker: 'Winter-Ratgeber & Empfehlungen',
    headlineLead: 'Winter-Guide &',
    headlineAccent: 'Empfehlungen.',
    description: 'Klirrende Kälte, Schnee und aggressives Streusalz stellen Böden und Gebäude vor Herausforderungen. Erfahren Sie hier unsere besten Tipps für kristallklare Reinheit und geschützte Oberflächen in der kalten Jahreszeit.',
    heroImage: '/src/assets/images/hero_luxury_building_1791206927412.jpg',
    aboutImage: '/src/assets/images/about_craft_perfection_1791206937704.jpg',
    accentBadge: 'Winter-Ratgeber',
    note: 'Optimaler Schutz vor Frost und Streusalzrändern: Erhalten Sie den repräsentativen Glanz Ihrer Immobilie.',
    quotes: [
      {
        quote: '„Klarheit im Raum schafft Klarheit im Geist – besonders wenn draußen die Welt zur Ruhe kommt.“',
        author: 'Platinrein Philosophie',
        context: 'Innere Ruhe & Reinheit'
      },
      {
        quote: '„Ein makelloser Raum ist die beste Antwort auf einen grauen Wintertag.“',
        author: 'Resul Gündüz',
        context: 'Präzision & Wohlgefühl'
      }
    ],
    tips: [
      {
        id: 'salzflecken',
        title: 'Streusalzränder auf Böden neutralisieren',
        category: 'Bodenpflege & Schutz',
        tag: 'Naturstein & Parkett',
        challenge: 'Streusalz und Schneematsch hinterlassen weiße, ätzende Ränder auf Naturstein, Fliesen und Parkettversiegelungen.',
        recommendation: 'Salzrückstände zeitnah mit lauwarmem Wasser und neutralem Reiniger aufwischen. Keine säurehaltigen Mittel auf kalkhaltigen Natursteinen wie Marmor verwenden.',
        stepByStep: [
          'Schneematsch und Salzreste nicht antrocknen lassen.',
          'Mit pH-neutralem Reiniger und nebelfeuchtem Tuch nachwischen.',
          'Ausreichend große saugfähige Schmutzfangmatten im Foyer bereithalten.'
        ],
        scope: 'platinrein',
        iconName: 'Sparkles'
      },
      {
        id: 'frost-glas',
        title: 'Glasreinigung bei Minustemperaturen',
        category: 'Fenster & Glasflächen',
        tag: 'Frostschutz',
        challenge: 'Wasser gefriert bei Minustemperaturen sofort auf der Scheibe und führt zu milchigen Eisfilmen.',
        recommendation: 'Fensterreinigung bei Frost erfordert spezielle, schonende Frostschutz-Zusätze. Keine heißen Flüssigkeiten auf eiskalte Scheiben bringen – Spannungsrissgefahr!',
        stepByStep: [
          'Niemals heißes Wasser auf gefrorene Scheiben gießen.',
          'Nur bei leichten Plusgraden oder mit speziellem Glas-Frostschutz arbeiten.',
          'Dichtungsgummis mit Glycerin oder Pflegemitteln geschmeidig halten.'
        ],
        scope: 'platinrein',
        iconName: 'ShieldCheck'
      }
    ],
    checklist: [
      { id: 'w1', task: 'Schmutzfangmatten winterfest machen', description: 'Ausreichend Wechselmatten für Schneetage bereitstellen.' },
      { id: 'w2', task: 'Streusalz sofort von Böden entfernen', description: 'Tägliche Wischpflege verhindert dauerhafte Verätzungen.' },
      { id: 'w3', task: 'Stoßlüften diszipliniert einhalten', description: 'Feuchtigkeit abführen, um Kondenswasser an Fenstern zu vermeiden.' }
    ]
  },
  spring: {
    id: 'spring',
    name: 'Frühling',
    tagline: 'Frühjahrs-Guide: Frischer Glanz & Pollenschutz',
    kicker: 'Frühjahrs-Ratgeber & Empfehlungen',
    headlineLead: 'Frühjahrs-Guide &',
    headlineAccent: 'Empfehlungen.',
    description: 'Das Erwachen der Natur bringt neues Licht – aber auch Blütenstaub und Winterrückstände. Entdecken Sie unsere Ratschläge für einen perfekten Start in die helle Jahreszeit.',
    heroImage: '/src/assets/images/hero_luxury_building_1791206927412.jpg',
    aboutImage: '/src/assets/images/about_craft_perfection_1791206937704.jpg',
    accentBadge: 'Frühlings-Ratgeber',
    note: 'Frischer Glanz und vollkommene Transparenz: Bringen Sie Ihr Gebäude zum Strahlen.',
    quotes: [
      {
        quote: '„Mit dem ersten Frühlingslicht erwacht der Wunsch nach vollkommener Klarheit und neuer Frische.“',
        author: 'Platinrein Philosophie',
        context: 'Erneuerung & Glanz'
      }
    ],
    tips: [
      {
        id: 'fruehjahrs-grundreinigung',
        title: 'Frühjahrs-Tiefenreinigung nach dem Winter',
        category: 'Innenbereich & Büro',
        tag: 'Neustart',
        challenge: 'Über die Wintermonate sammelt sich in Ecken, Textilböden und Fugen feiner Heizstaub und Schmutz an.',
        recommendation: 'Nutzen Sie das Frühjahr für eine intensive Grundreinigung: Teppichtiefenreinigung, Einpflege empfindlicher Böden und gründliche Säuberung aller Sockelleisten.',
        stepByStep: [
          'Textilbeläge gründlich tiefensaugen oder sprühextrahieren.',
          'Alle Schrankoberseiten und Leuchten von Winterstaub befreien.',
          'Böden mit geeigneten Pflegemitteln neu einpflegen.'
        ],
        scope: 'platinrein',
        iconName: 'Sparkles'
      }
    ],
    checklist: [
      { id: 's1', task: 'Fenster & Rahmen gründlich reinigen', description: 'Winterfilm von Scheiben und Rahmen entfernen.' },
      { id: 's2', task: 'Böden tiefenreinigen', description: 'Salzreste und Winterstaub restlos entfernen.' }
    ]
  },
  summer: {
    id: 'summer',
    name: 'Sommer',
    tagline: 'Sommer-Guide: Brillantes Sonnenlicht & Hitzetipps',
    kicker: 'Sommer-Ratgeber & Empfehlungen',
    headlineLead: 'Sommer-Guide &',
    headlineAccent: 'Empfehlungen.',
    description: 'Maximale Sonneneinstrahlung und warme Tage verlangen nach klarem Durchblick und frischen Innenräumen. Unsere Empfehlungen für ungetrübten Sommergenuss in Ihren Räumen.',
    heroImage: '/src/assets/images/hero_luxury_building_1791206927412.jpg',
    aboutImage: '/src/assets/images/about_craft_perfection_1791206937704.jpg',
    accentBadge: 'Sommer-Ratgeber',
    note: 'Klares Licht und Wohlfühlatmosphäre: Genießen Sie den Sommer in perfekt gepflegten Räumen.',
    quotes: [
      {
        quote: '„Wenn die Sommersonne durch makelloses Glas strahlt, spürt man die pure Kraft des Lichts.“',
        author: 'Platinrein Philosophie',
        context: 'Licht & Transparenz'
      }
    ],
    tips: [
      {
        id: 'sonnenlicht-glas',
        title: 'Glasreinigung ohne Streifen bei starker Sonne',
        category: 'Fenster & Glasflächen',
        tag: 'Hitzetipp',
        challenge: 'Wasser trocknet auf aufgeheizten Glasscheiben binnen Sekunden und hinterlässt unschöne Kalk- und Seifenränder.',
        recommendation: 'Fenster frühmorgens oder am späten Nachmittag im Schatten putzen. Mit kalkarmem Wasser und schnellen Zügen mit dem Abzieher arbeiten.',
        stepByStep: [
          'Nur im Schatten oder bei bewölktem Himmel putzen.',
          'Großzügig mit klarem Wasser arbeiten, damit nichts vorzeitig antrocknet.',
          'Gummilippe nach jedem Zug mit trockenem Tuch abwischen.'
        ],
        scope: 'platinrein',
        iconName: 'Sun'
      }
    ],
    checklist: [
      { id: 'su1', task: 'Fenster früh morgens putzen', description: 'Direkte Mittagssonne beim Fensterputzen meiden.' },
      { id: 'su2', task: 'Lüftungsschlitze entstauben', description: 'Klimatisierung und Ventilatoren vor Staub schützen.' }
    ]
  }
};

interface SeasonContextType {
  season: SeasonId;
  seasonConfig: SeasonConfig;
  setSeason: (season: SeasonId) => void;
}

const SeasonContext = createContext<SeasonContextType | undefined>(undefined);

const STORAGE_KEY = 'platinrein_active_season';

export const SeasonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [season, setSeasonState] = useState<SeasonId>(() => {
    try {
      // User specifically requested the website to be set to Autumn (Herbst)
      localStorage.setItem(STORAGE_KEY, 'autumn');
    } catch {
      // ignore localStorage error
    }
    return 'autumn';
  });

  const setSeason = (newSeason: SeasonId) => {
    setSeasonState(newSeason);
    try {
      localStorage.setItem(STORAGE_KEY, newSeason);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, season);
    } catch {
      // ignore
    }
  }, [season]);

  const seasonConfig = SEASONS_DATA[season] || SEASONS_DATA.autumn;

  return (
    <SeasonContext.Provider value={{ season, seasonConfig, setSeason }}>
      {children}
    </SeasonContext.Provider>
  );
};

export const useSeason = () => {
  const context = useContext(SeasonContext);
  if (!context) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
};
