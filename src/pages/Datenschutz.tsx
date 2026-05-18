import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-studio py-24 md:py-32 px-6 md:px-20 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-3 text-charcoal/40 hover:text-charcoal transition-colors mb-12 md:mb-16 group">
          <ArrowLeft size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Zurück zur Startseite</span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-light tracking-tighter text-charcoal mb-4">
            Datenschutz.
          </h1>
          <p className="text-charcoal/40 text-[10px] md:text-sm uppercase tracking-widest mb-16 md:mb-24">Gültig ab Mai 2026</p>
        </motion.div>
        
        <div className="space-y-20 md:space-y-24 text-charcoal/70 font-light leading-relaxed">
          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                01. Einleitung
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <p>
                Der Schutz Ihrer persönlichen Daten ist für Platinrein von höchster Priorität. In dieser Datenschutzerklärung informieren wir Sie über die Verarbeitung Ihrer personenbezogenen Daten beim Besuch unserer Website.
              </p>
              <p>
                Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Die Verarbeitung erfolgt im Einklang mit der Datenschutz-Grundverordnung (DSGVO).
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-platinum pt-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                02. Verantwortliche Stelle
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4">
              <p className="text-charcoal font-medium">Platinrein Gebäudeservice</p>
              <p>
                Letmather Str. 13<br/>
                58644 Iserlohn<br/>
                Deutschland
              </p>
              <p className="pt-4">
                <span className="block text-[10px] uppercase tracking-widest text-charcoal/30 mb-1">E-Mail</span>
                info@platinrein.de
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-platinum pt-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                03. Datenerfassung
              </h2>
            </div>
            <div className="md:col-span-8 space-y-8">
              <div>
                <h3 className="text-charcoal font-medium mb-3">Server-Log-Dateien</h3>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp, Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners und Uhrzeit der Serveranfrage.
                </p>
              </div>
              <div>
                <h3 className="text-charcoal font-medium mb-3">Kontaktformular</h3>
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
                </p>
              </div>
              <div>
                <h3 className="text-charcoal font-medium mb-3">Newsletter & E-Mail-Versand (Resend)</h3>
                <p>
                  Für den Versand von E-Mails aus unserem Kontaktformular nutzen wir den Dienst Resend (Resend Inc., 43 Page St, San Francisco, CA 94102, USA). Die von Ihnen im Formular eingegebenen Daten werden an Resend übertragen, um den Versand der Nachricht an uns zu ermöglichen. Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer zuverlässigen Kommunikation).
                </p>
              </div>
              <div>
                <h3 className="text-charcoal font-medium mb-3">SSL- bzw. TLS-Verschlüsselung</h3>
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
              </div>
              <div>
                <h3 className="text-charcoal font-medium mb-3">Cookies</h3>
                <p>
                  Unsere Website verwendet keine technisch nicht notwendigen Cookies. Wir verzichten auf Tracking-Cookies von Drittanbietern, um Ihre Privatsphäre maximal zu schützen.
                </p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-platinum pt-16">
            <div className="md:col-span-4">
              <h2 className="text-charcoal text-[10px] font-bold uppercase tracking-[0.4em] md:sticky md:top-32">
                04. Ihre Rechte
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6">
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.
              </p>
              <ul className="list-none space-y-4">
                <li className="flex gap-4">
                  <span className="text-charcoal font-serif italic">a.</span>
                  <span>Recht auf Widerruf Ihrer Einwilligung zur Datenverarbeitung</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-charcoal font-serif italic">b.</span>
                  <span>Recht auf Datenübertragbarkeit</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-charcoal font-serif italic">c.</span>
                  <span>Recht auf Beschwerde bei der zuständigen Aufsichtsbehörde</span>
                </li>
              </ul>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}
