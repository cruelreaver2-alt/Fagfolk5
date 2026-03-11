/**
 * ONBOARDING-GUIDE FOR KUNDER
 * Print-optimalisert versjon for PDF-generering
 */

export function OnboardingKunde() {
  return (
    <div className="print-document" style={{
      fontFamily: 'Inter, -apple-system, sans-serif',
      maxWidth: '210mm',
      margin: '0 auto',
      padding: '20mm',
      backgroundColor: '#FFFFFF',
      color: '#111827',
      lineHeight: 1.6
    }}>
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .page-break {
            page-break-before: always;
          }
          .no-print {
            display: none;
          }
        }
      `}</style>

      {/* Cover */}
      <div style={{ textAlign: 'center', paddingTop: '40mm' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>👨‍👩‍👧‍👦</div>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#17384E', marginBottom: '16px' }}>
          Onboarding-guide
        </h1>
        <h2 style={{ fontSize: '28px', color: '#E07B3E', marginBottom: '32px' }}>
          For kunder
        </h2>
        <div style={{ 
          display: 'inline-block', 
          padding: '16px 32px', 
          backgroundColor: '#F8FAFC', 
          borderRadius: '12px',
          border: '2px solid #E5E7EB',
          marginBottom: '48px'
        }}>
          <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
            <strong>Tidsbruk:</strong> 5-10 minutter<br/>
            <strong>Vanskelighetsgrad:</strong> Lett
          </p>
        </div>

        <p style={{ fontSize: '18px', color: '#111827', maxWidth: '500px', margin: '0 auto' }}>
          Denne guiden viser deg steg-for-steg hvordan du oppretter en kundekonto 
          og legger ut din første jobbforespørsel
        </p>
      </div>

      {/* Oversikt */}
      <div className="page-break" style={{ paddingTop: '20px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#17384E', marginBottom: '24px', borderBottom: '3px solid #E07B3E', paddingBottom: '12px' }}>
          📋 Oversikt
        </h2>

        <p style={{ fontSize: '16px', marginBottom: '24px', color: '#6B7280' }}>
          Som kunde får du tilgang til følgende funksjoner:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          {[
            { icon: "✍️", title: "Legg ut jobber", desc: "Beskriv hva du trenger hjelp til" },
            { icon: "📬", title: "Motta tilbud", desc: "Få tilbud fra verifiserte fagfolk" },
            { icon: "💬", title: "Chat direkte", desc: "Kommuniser med håndverkere" },
            { icon: "✅", title: "Godkjenn tilbud", desc: "Ett klikk for å godkjenne" },
            { icon: "📊", title: "Følg fremdrift", desc: "Se status på alle jobber" },
            { icon: "⭐", title: "Gi tilbakemelding", desc: "Vurder kvalitet og service" }
          ].map((item, index) => (
            <div key={index} style={{ 
              padding: '16px', 
              backgroundColor: '#F8FAFC',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              <div style={{ fontSize: '28px' }}>{item.icon}</div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#111827', margin: '0 0 4px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          backgroundColor: '#EFF6FF', 
          border: '2px solid #BFDBFE', 
          borderRadius: '12px', 
          padding: '20px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E40AF', marginTop: 0, marginBottom: '12px' }}>
            💡 Viktig informasjon
          </h3>
          <ul style={{ margin: 0, paddingLeft: '24px', color: '#1E3A8A', fontSize: '14px', lineHeight: '1.8' }}>
            <li>Håndtverkeren er <strong>100% gratis for kunder</strong> – ingen skjulte kostnader</li>
            <li>Du betaler kun den håndverkeren du velger, direkte til dem</li>
            <li>Alle håndverkere er <strong>verifisert med ID-sjekk</strong></li>
            <li>Du kan chatte med flere håndverkere samtidig før du bestemmer deg</li>
            <li>Ingen forpliktelser – du kan avvise alle tilbud hvis de ikke passer</li>
          </ul>
        </div>
      </div>

      {/* Steg 1: Registrering */}
      <div className="page-break" style={{ paddingTop: '20px' }}>
        <div style={{ 
          backgroundColor: '#17384E', 
          color: '#FFFFFF',
          padding: '16px 24px',
          borderRadius: '8px 8px 0 0',
          marginBottom: '0'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            STEG 1: Opprett konto
          </h2>
        </div>
        <div style={{ 
          border: '2px solid #17384E',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
            <strong>Tidsbruk:</strong> 2-3 minutter
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            1.1 Gå til registreringssiden
          </h3>
          <div style={{ 
            backgroundColor: '#F8FAFC',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '24px',
            border: '1px solid #E5E7EB'
          }}>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 8px 0' }}>
              <strong>URL:</strong>
            </p>
            <p style={{ 
              fontSize: '16px', 
              fontFamily: 'monospace',
              color: '#E07B3E',
              backgroundColor: '#FFFFFF',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #E5E7EB',
              margin: 0
            }}>
              https://handtverkeren.no/registrer
            </p>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            1.2 Fyll ut registreringsskjemaet
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Du må oppgi følgende informasjon:
          </p>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginBottom: '24px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold', color: '#111827', border: '1px solid #E5E7EB' }}>
                  Felt
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontSize: '13px', fontWeight: 'bold', color: '#111827', border: '1px solid #E5E7EB' }}>
                  Beskrivelse
                </th>
                <th style={{ padding: '12px', textAlign: 'center', fontSize: '13px', fontWeight: 'bold', color: '#111827', border: '1px solid #E5E7EB' }}>
                  Påkrevd
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { field: "Fullt navn", desc: "Fornavn og etternavn", required: true },
                { field: "E-postadresse", desc: "Brukes for innlogging og varsler", required: true },
                { field: "Passord", desc: "Min. 8 tegn (bruk et sterkt passord)", required: true },
                { field: "Telefonnummer", desc: "For viktige varsler", required: true },
                { field: "Adresse", desc: "Gateadresse, postnummer og sted", required: false },
              ].map((row, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#111827', border: '1px solid #E5E7EB', fontWeight: '500' }}>
                    {row.field}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                    {row.desc}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', fontSize: '13px', border: '1px solid #E5E7EB' }}>
                    {row.required ? '✅' : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            1.3 Bekreft e-postadressen din
          </h3>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8' }}>
            <li>Etter registrering får du en e-post med en bekreftelseslenke</li>
            <li>Sjekk innboksen din (og spam-mappen hvis den ikke kommer)</li>
            <li>Klikk på lenken i e-posten</li>
            <li>Du blir automatisk logget inn</li>
          </ol>

          <div style={{ 
            backgroundColor: '#FEF3E2', 
            border: '2px solid #E07B3E', 
            borderRadius: '8px', 
            padding: '16px',
            marginTop: '24px'
          }}>
            <p style={{ fontSize: '14px', color: '#92400E', margin: '0', fontWeight: '500' }}>
              ⚠️ <strong>Viktig:</strong> Du må bekrefte e-posten din før du kan legge ut jobber!
            </p>
          </div>
        </div>
      </div>

      {/* Steg 2: Komplett profil */}
      <div className="page-break" style={{ paddingTop: '20px' }}>
        <div style={{ 
          backgroundColor: '#17384E', 
          color: '#FFFFFF',
          padding: '16px 24px',
          borderRadius: '8px 8px 0 0',
          marginBottom: '0'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            STEG 2: Komplett din profil
          </h2>
        </div>
        <div style={{ 
          border: '2px solid #17384E',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
            <strong>Tidsbruk:</strong> 2-3 minutter (valgfritt, men anbefalt)
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            2.1 Gå til Min Profil
          </h3>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Klikk på ditt navn øverst til høyre (eller på mobil: hamburger-menyen)</li>
            <li>Velg "Min Profil"</li>
            <li>Klikk på "Rediger profil" knappen</li>
          </ol>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            2.2 Legg til profilbilde (valgfritt)
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Et profilbilde gjør det lettere for håndverkere å kjenne deg igjen:
          </p>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Klikk på "Last opp bilde"</li>
            <li>Velg et tydelig bilde av deg selv</li>
            <li>Maksimal filstørrelse: 2 MB</li>
            <li>Anbefalte formater: JPG, PNG</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            2.3 Oppdater kontaktinformasjon
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Sørg for at denne informasjonen er oppdatert:
          </p>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li><strong>Adresse:</strong> Der jobben skal utføres (kan endres per jobb)</li>
            <li><strong>Telefonnummer:</strong> For urgent kontakt</li>
            <li><strong>Preferert kommunikasjon:</strong> E-post, SMS eller telefon</li>
          </ul>

          <div style={{ 
            backgroundColor: '#F0FDF4', 
            border: '2px solid #86EFAC', 
            borderRadius: '8px', 
            padding: '16px',
            marginTop: '24px'
          }}>
            <p style={{ fontSize: '14px', color: '#166534', margin: '0', fontWeight: '500' }}>
              💡 <strong>Tips:</strong> En komplett profil gir deg raskere og bedre tilbud fra håndverkere!
            </p>
          </div>
        </div>
      </div>

      {/* Steg 3: Legg ut første jobb */}
      <div className="page-break" style={{ paddingTop: '20px' }}>
        <div style={{ 
          backgroundColor: '#E07B3E', 
          color: '#FFFFFF',
          padding: '16px 24px',
          borderRadius: '8px 8px 0 0',
          marginBottom: '0'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            STEG 3: Legg ut din første jobb
          </h2>
        </div>
        <div style={{ 
          border: '2px solid #E07B3E',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
            <strong>Tidsbruk:</strong> 5-10 minutter
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            3.1 Start en ny forespørsel
          </h3>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Gå til Dashboard (klikk på "Dashboard" i menyen)</li>
            <li>Klikk på den store orange knappen "Ny forespørsel"</li>
            <li>Du kommer til et 4-stegs skjema</li>
          </ol>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            3.2 STEG 1/4: Grunninfo
          </h3>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginBottom: '24px'
          }}>
            <tbody>
              {[
                { 
                  field: "Kategori", 
                  desc: "Velg type arbeid (f.eks. Tømrer, Rørlegger, Elektro)",
                  example: "Eksempel: Tømrer" 
                },
                { 
                  field: "Produktnavn", 
                  desc: "Hvis du vet nøyaktig hva du vil ha (valgfritt)",
                  example: "Eksempel: Weber Spirit E-320 Classic grill" 
                },
                { 
                  field: "Tittel", 
                  desc: "En kort beskrivelse av jobben",
                  example: "Eksempel: Bytte vinduer på kjøkken" 
                },
                { 
                  field: "Beskrivelse", 
                  desc: "Detaljert forklaring av hva som skal gjøres",
                  example: "Eksempel: Jeg trenger å bytte 3 vinduer på kjøkkenet. Vinduene er ca. 120x140 cm hver..." 
                },
              ].map((row, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#111827', border: '1px solid #E5E7EB', fontWeight: 'bold', width: '150px', verticalAlign: 'top' }}>
                    {row.field}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', border: '1px solid #E5E7EB', verticalAlign: 'top' }}>
                    <p style={{ margin: '0 0 8px 0', color: '#6B7280' }}>{row.desc}</p>
                    <p style={{ margin: 0, color: '#E07B3E', fontStyle: 'italic', fontSize: '12px' }}>{row.example}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ 
            backgroundColor: '#EFF6FF', 
            border: '2px solid #BFDBFE', 
            borderRadius: '8px', 
            padding: '16px',
            marginBottom: '24px'
          }}>
            <p style={{ fontSize: '13px', color: '#1E40AF', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              💡 Tips for god beskrivelse:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#1E3A8A', fontSize: '12px', lineHeight: '1.8' }}>
              <li>Vær så spesifikk som mulig (mål, materiale, merke)</li>
              <li>Beskriv nåværende situasjon og ønsket resultat</li>
              <li>Nevn eventuelle utfordringer eller spesielle krav</li>
              <li>Jo mer informasjon, desto bedre tilbud får du!</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            3.3 STEG 2/4: Last opp bilder
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Bilder hjelper håndverkere å forstå jobben bedre:
          </p>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '16px' }}>
            <li>Klikk på "Last opp bilder" eller dra bilder inn i boksen</li>
            <li>Du kan laste opp opptil 8 bilder</li>
            <li>Maksimal filstørrelse: 2 MB per bilde</li>
            <li>Ta bilder fra flere vinkler</li>
            <li>Inkluder oversiktsbilder og detaljer</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            3.4 STEG 3/4: Lokasjon og tidspunkt
          </h3>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginBottom: '24px'
          }}>
            <tbody>
              {[
                { 
                  field: "Lokasjon", 
                  desc: "Gateadresse hvor arbeidet skal utføres"
                },
                { 
                  field: "Postnummer", 
                  desc: "For å finne lokale håndverkere"
                },
                { 
                  field: "Startdato", 
                  desc: "Når ønsker du at arbeidet skal starte?"
                },
                { 
                  field: "Sluttdato", 
                  desc: "Når må arbeidet være ferdig?"
                },
                { 
                  field: "ASAP", 
                  desc: "Kryss av hvis det haster (prioriteres av håndverkere)"
                },
              ].map((row, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#111827', border: '1px solid #E5E7EB', fontWeight: 'bold', width: '150px' }}>
                    {row.field}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            3.5 STEG 4/4: Preferanser og budsjett
          </h3>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginBottom: '24px'
          }}>
            <tbody>
              {[
                { 
                  field: "Budsjett (min)", 
                  desc: "Laveste beløp du er villig til å betale"
                },
                { 
                  field: "Budsjett (maks)", 
                  desc: "Høyeste beløp du er villig til å betale"
                },
                { 
                  field: "Kun verifiserte", 
                  desc: "Anbefales! Kun ID-verifiserte håndverkere"
                },
                { 
                  field: "Kun fastpris", 
                  desc: "Vis kun tilbud med fast totalpris (ikke timebetaling)"
                },
                { 
                  field: "Minimum rating", 
                  desc: "Kun håndverkere med minst 4.0 i rating"
                },
              ].map((row, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#111827', border: '1px solid #E5E7EB', fontWeight: 'bold', width: '150px' }}>
                    {row.field}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            3.6 Send inn forespørselen
          </h3>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '16px' }}>
            <li>Gjennomgå all informasjon nøye</li>
            <li>Klikk på "Send inn" knappen nederst</li>
            <li>Du får en bekreftelse på skjermen</li>
            <li>Du mottar også en bekreftelses-e-post</li>
          </ol>

          <div style={{ 
            backgroundColor: '#F0FDF4', 
            border: '2px solid #86EFAC', 
            borderRadius: '8px', 
            padding: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#166534', margin: '0', fontWeight: '500' }}>
              🎉 <strong>Gratulerer!</strong> Forespørselen din er nå synlig for verifiserte håndverkere i ditt område!
            </p>
          </div>
        </div>
      </div>

      {/* Steg 4: Motta og vurdere tilbud */}
      <div className="page-break" style={{ paddingTop: '20px' }}>
        <div style={{ 
          backgroundColor: '#17384E', 
          color: '#FFFFFF',
          padding: '16px 24px',
          borderRadius: '8px 8px 0 0',
          marginBottom: '0'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            STEG 4: Motta og vurdere tilbud
          </h2>
        </div>
        <div style={{ 
          border: '2px solid #17384E',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '24px' }}>
            <strong>Forventet tid:</strong> Innen 24 timer får du de første tilbudene
          </p>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            4.1 Du blir varslet om nye tilbud
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Når håndverkere sender tilbud får du beskjed på flere måter:
          </p>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>📧 <strong>E-postvarsel</strong> (umiddelbart)</li>
            <li>🔔 <strong>Varsel i appen</strong> (rød notifikasjon øverst til høyre)</li>
            <li>📱 <strong>SMS</strong> (hvis du har aktivert dette)</li>
          </ul>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            4.2 Se tilbudene
          </h3>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Gå til Dashboard</li>
            <li>Under "Mine forespørsler" ser du alle dine jobber</li>
            <li>Klikk på jobben for å se detaljer</li>
            <li>Under "Tilbud" (orange fane) ser du alle mottatte tilbud</li>
          </ol>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            4.3 Vurder tilbudene
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Hvert tilbud inneholder:
          </p>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse',
            marginBottom: '24px'
          }}>
            <tbody>
              {[
                { item: "Totalpris", desc: "Fast pris eller timeestimate" },
                { item: "Materialliste", desc: "Hva som inngår (hvis relevant)" },
                { item: "Arbeidstimer", desc: "Estimert tid for jobben" },
                { item: "Beskrivelse", desc: "Hvordan håndverkeren planlegger å løse jobben" },
                { item: "Håndverkerprofil", desc: "Erfaring, rating, tidligere jobber" },
                { item: "Leveringstid", desc: "Når de kan starte og når det blir ferdig" },
              ].map((row, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#F8FAFC' : '#FFFFFF' }}>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#111827', border: '1px solid #E5E7EB', fontWeight: 'bold', width: '150px' }}>
                    {row.item}
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                    {row.desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ 
            backgroundColor: '#EFF6FF', 
            border: '2px solid #BFDBFE', 
            borderRadius: '8px', 
            padding: '16px',
            marginBottom: '24px'
          }}>
            <p style={{ fontSize: '13px', color: '#1E40AF', margin: '0 0 8px 0', fontWeight: 'bold' }}>
              💡 Viktige ting å sjekke:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#1E3A8A', fontSize: '12px', lineHeight: '1.8' }}>
              <li>✅ Er håndverkeren <strong>verifisert</strong>? (grønn badge)</li>
              <li>⭐ Hvilken <strong>rating</strong> har de? (se anmeldelser)</li>
              <li>💰 Er prisen <strong>konkurransedyktig</strong>? (sammenlign flere tilbud)</li>
              <li>📅 Passer <strong>tidspunktet</strong>? (startdato og leveringstid)</li>
              <li>📝 Er tilbudet <strong>detaljert</strong>? (ikke bare "kan fikse dette")</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            4.4 Chat med håndverkerne
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Før du godkjenner et tilbud kan du stille spørsmål:
          </p>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Klikk på "Send melding" under tilbudet</li>
            <li>Skriv spørsmålet ditt i chat-boksen</li>
            <li>Håndverkeren får varsel og svarer vanligvis innen få timer</li>
            <li>All kommunikasjon lagres i chat-historikken</li>
          </ol>

          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            <strong>Gode spørsmål å stille:</strong>
          </p>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8' }}>
            <li>"Kan du utdype hvilke materialer du bruker?"</li>
            <li>"Har du gjort lignende jobber før?"</li>
            <li>"Hva skjer hvis det tar lenger tid enn estimert?"</li>
            <li>"Inkluderer prisen opprydding etter arbeidet?"</li>
            <li>"Gir du garanti på arbeidet?"</li>
          </ul>
        </div>
      </div>

      {/* Steg 5: Godkjenn tilbud */}
      <div className="page-break" style={{ paddingTop: '20px' }}>
        <div style={{ 
          backgroundColor: '#E07B3E', 
          color: '#FFFFFF',
          padding: '16px 24px',
          borderRadius: '8px 8px 0 0',
          marginBottom: '0'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            STEG 5: Godkjenn tilbud og start jobb
          </h2>
        </div>
        <div style={{ 
          border: '2px solid #E07B3E',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            5.1 Godkjenn tilbudet
          </h3>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Når du har bestemt deg, gå til tilbudet du vil godkjenne</li>
            <li>Klikk på den grønne knappen "Godkjenn tilbud"</li>
            <li>Bekreft at du har lest og forstått tilbudet</li>
            <li>Klikk "Bekreft godkjenning"</li>
          </ol>

          <div style={{ 
            backgroundColor: '#FEF3E2', 
            border: '2px solid #E07B3E', 
            borderRadius: '8px', 
            padding: '16px',
            marginBottom: '24px'
          }}>
            <p style={{ fontSize: '14px', color: '#92400E', margin: '0', fontWeight: '500' }}>
              ⚠️ <strong>Viktig:</strong> Når du godkjenner et tilbud blir de andre tilbudene automatisk avvist. 
              Sørg for at du har valgt riktig håndverker!
            </p>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            5.2 Hva skjer når du godkjenner?
          </h3>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>📧 Håndverkeren får umiddelbart e-postvarsel</li>
            <li>📱 Du og håndverkeren kan chatte direkte</li>
            <li>📅 Jobben flytter til "Pågående" i dashboardet ditt</li>
            <li>🔔 Andre håndverkere får beskjed om at tilbudet er tatt</li>
          </ol>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            5.3 Koordiner med håndverkeren
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Etter godkjenning må dere avtale:
          </p>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>📅 <strong>Nøyaktig dato og tidspunkt</strong> for oppstart</li>
            <li>🔑 <strong>Tilgang til lokasjon</strong> (nøkler, koder, etc.)</li>
            <li>📋 <strong>Forberedelser</strong> du må gjøre før arbeidet starter</li>
            <li>💳 <strong>Betalingsmåte</strong> (faktura, Vipps, kort)</li>
            <li>📞 <strong>Kontaktinfo</strong> for dagen (mobilnummer)</li>
          </ul>

          <div style={{ 
            backgroundColor: '#F0FDF4', 
            border: '2px solid #86EFAC', 
            borderRadius: '8px', 
            padding: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#166534', margin: '0', fontWeight: '500' }}>
              💡 <strong>Tips:</strong> Hold all kommunikasjon i plattformens chat-system. 
              Dette gir deg dokumentasjon hvis noe skulle gå galt!
            </p>
          </div>
        </div>
      </div>

      {/* Steg 6: Fullfør og vurder */}
      <div className="page-break" style={{ paddingTop: '20px' }}>
        <div style={{ 
          backgroundColor: '#17384E', 
          color: '#FFFFFF',
          padding: '16px 24px',
          borderRadius: '8px 8px 0 0',
          marginBottom: '0'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>
            STEG 6: Fullfør jobb og gi vurdering
          </h2>
        </div>
        <div style={{ 
          border: '2px solid #17384E',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            6.1 Marker jobb som fullført
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Når arbeidet er ferdig og du er fornøyd:
          </p>
          <ol style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Gå til jobben i "Mine forespørsler"</li>
            <li>Klikk på "Marker som fullført" knappen</li>
            <li>Bekreft at arbeidet er utført tilfredsstillende</li>
          </ol>

          <div style={{ 
            backgroundColor: '#FEF3E2', 
            border: '2px solid #E07B3E', 
            borderRadius: '8px', 
            padding: '16px',
            marginBottom: '24px'
          }}>
            <p style={{ fontSize: '14px', color: '#92400E', margin: '0 0 8px 0', fontWeight: '500' }}>
              ⚠️ <strong>Sjekkliste før du markerer som fullført:</strong>
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#92400E', fontSize: '13px', lineHeight: '1.8' }}>
              <li>✓ Er alt arbeid utført som avtalt?</li>
              <li>✓ Er området ryddet og rent?</li>
              <li>✓ Fungerer alt som det skal?</li>
              <li>✓ Er du fornøyd med kvaliteten?</li>
              <li>✓ Har du betalt (eller avtalt betalingsplan)?</li>
            </ul>
          </div>

          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827', marginBottom: '16px' }}>
            6.2 Gi vurdering av håndverkeren
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            Etter at jobben er fullført, ber vi deg vurdere håndverkeren:
          </p>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>⭐ <strong>Rating (1-5 stjerner):</strong> Samlet vurdering</li>
            <li>💬 <strong>Skriftlig anmeldelse:</strong> Hva gikk bra/dårlig?</li>
            <li>📸 <strong>Bilder av resultat:</strong> Vis sluttresultatet (valgfritt)</li>
          </ul>

          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '12px' }}>
            <strong>Hva bør du kommentere på?</strong>
          </p>
          <ul style={{ paddingLeft: '24px', fontSize: '14px', color: '#6B7280', lineHeight: '1.8', marginBottom: '24px' }}>
            <li>Punktlighet og profesjonalitet</li>
            <li>Kvalitet på arbeidet</li>
            <li>Kommunikasjon underveis</li>
            <li>Ryddighet og opprydding</li>
            <li>Pris i forhold til kvalitet</li>
          </ul>

          <div style={{ 
            backgroundColor: '#F0FDF4', 
            border: '2px solid #86EFAC', 
            borderRadius: '8px', 
            padding: '16px'
          }}>
            <p style={{ fontSize: '14px', color: '#166534', margin: '0', fontWeight: '500' }}>
              🌟 <strong>Viktig:</strong> Din vurdering hjelper andre kunder og motiverer håndverkere 
              til å levere god kvalitet!
            </p>
          </div>
        </div>

        <div style={{ 
          marginTop: '40px',
          padding: '32px',
          backgroundColor: '#17384E',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#FFFFFF'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
            Gratulerer – Du er i gang!
          </h2>
          <p style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px' }}>
            Du har nå fullført onboardingen og er klar til å bruke Håndtverkeren.
            Ved spørsmål, kontakt oss på pilot@handtverkeren.no
          </p>
          <p style={{ fontSize: '14px', opacity: 0.7, margin: 0 }}>
            Lykke til med dine prosjekter! 🔨
          </p>
        </div>
      </div>

      {/* Print button (hidden when printing) */}
      <div className="no-print" style={{ 
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#E07B3E',
        color: '#FFFFFF',
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
        cursor: 'pointer'
      }}
      onClick={() => window.print()}>
        <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0 }}>
          📄 Trykk Cmd+P / Ctrl+P for å generere PDF
        </p>
      </div>
    </div>
  );
}
