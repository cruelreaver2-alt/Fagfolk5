import { CheckCircle, Shield, Calendar, FileText, ExternalLink, AlertCircle } from "lucide-react";

interface Certification {
  id: string;
  type: string;
  name: string;
  status: "pending" | "uploaded" | "verified" | "rejected" | "expired";
  expiryDate?: string;
  number?: string;
  verifiedDate?: string;
}

interface CertificationDisplayProps {
  certifications: Certification[];
  category: string;
  supplierName: string;
}

export function CertificationDisplay({ certifications, category, supplierName }: CertificationDisplayProps) {
  const verifiedCerts = certifications.filter(c => c.status === "verified");
  const expiringSoonCerts = certifications.filter(c => {
    if (!c.expiryDate) return false;
    const daysUntilExpiry = Math.floor((new Date(c.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  });

  const getCategoryName = (cat: string) => {
    const names: Record<string, string> = {
      elektro: "Elektriker",
      ror: "Rørlegger",
      tre: "Tømrer",
      tak: "Taktekker",
      maling: "Maler",
      garasjeport: "Garasjeport",
      varmepumpe: "Varmepumpe",
    };
    return names[cat] || cat;
  };

  const getCertificationLabel = (type: string) => {
    const labels: Record<string, string> = {
      insurance: "Ansvarsforsikring",
      org_number: "Organisasjonsnummer",
      dsb_registration: "DSB Elvirksomhetsregistrering",
      electrician_certificate: "Fagbrev Elektriker",
      hms_certificate: "HMS / Internkontroll",
      plumber_approval: "Kommunal godkjenning",
      plumber_certificate: "Fagbrev Rørlegger",
      carpenter_certificate: "Fagbrev Tømrer",
      liability_cert: "Ansvarsrett",
      roofer_certificate: "Fagbrev Taktekker",
      fall_protection: "HMS-kort / Fallsikring",
      painter_certificate: "Fagbrev Maler",
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('nb-NO', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    return Math.floor((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  };

  if (verifiedCerts.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-6 h-6 text-gray-400" />
          <div>
            <h3 className="font-semibold text-gray-900">Sertifiseringer under behandling</h3>
            <p className="text-sm text-gray-600 mt-1">
              Leverandøren har sendt inn dokumentasjon som er under verifisering.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Verification Badge */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-green-900">Verifisert {getCategoryName(category)}</h3>
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-green-800 mt-1">
              {supplierName} har dokumentert og verifisert kompetanse innen {getCategoryName(category).toLowerCase()}.
              Alle lovpålagte krav er oppfylt.
            </p>
          </div>
        </div>
      </div>

      {/* Expiring Soon Warning */}
      {expiringSoonCerts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-900">Dokumenter utløper snart</h4>
              <p className="text-sm text-yellow-800 mt-1">
                Noen sertifiseringer utløper innen 30 dager. Leverandøren er informert om å fornye.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Certifications List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Verifiserte sertifiseringer
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {verifiedCerts.map((cert) => (
            <div key={cert.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <h4 className="font-semibold text-gray-900">
                      {getCertificationLabel(cert.type)}
                    </h4>
                  </div>

                  {/* Certificate number/ID */}
                  {cert.number && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Nummer:</span> {cert.number}
                    </p>
                  )}

                  {/* Verified date */}
                  {cert.verifiedDate && (
                    <p className="text-xs text-gray-500">
                      Verifisert: {formatDate(cert.verifiedDate)}
                    </p>
                  )}

                  {/* Expiry information */}
                  {cert.expiryDate && (
                    <div className="mt-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Utløper: {formatDate(cert.expiryDate)}
                        {(() => {
                          const days = getDaysUntilExpiry(cert.expiryDate);
                          if (days <= 30 && days > 0) {
                            return <span className="ml-2 text-yellow-600 font-medium">({days} dager igjen)</span>;
                          } else if (days <= 0) {
                            return <span className="ml-2 text-red-600 font-medium">(Utløpt)</span>;
                          }
                          return null;
                        })()}
                      </span>
                    </div>
                  )}

                  {/* Special info for specific certifications */}
                  {cert.type === "dsb_registration" && (
                    <a
                      href="https://www.dsb.no/elvirksomhetsregisteret"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                    >
                      Verifiser i DSB-registeret
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {cert.type === "org_number" && cert.number && (
                    <a
                      href={`https://www.brreg.no/bedrift/${cert.number.replace(/\s/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2"
                    >
                      Se i Brønnøysundregistrene
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Status badge */}
                <div className="flex-shrink-0 ml-4">
                  {cert.status === "verified" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Verifisert
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additional information */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Hva betyr dette?
        </h4>
        <div className="text-sm text-blue-800 space-y-2">
          <p>
            ✅ <strong>Verifisert identitet:</strong> Vi har bekreftet leverandørens identitet via BankID
          </p>
          <p>
            ✅ <strong>Dokumentert kompetanse:</strong> Fagbrev og sertifiseringer er sjekket
          </p>
          <p>
            ✅ <strong>Gyldig forsikring:</strong> Ansvarsforsikring er på plass
          </p>
          {category === "elektro" && (
            <p>
              ✅ <strong>Lovpålagt registrering:</strong> Registrert i DSB Elvirksomhetsregisteret
            </p>
          )}
          {category === "ror" && (
            <p>
              ✅ <strong>Kommunal godkjenning:</strong> Godkjent rørlegger
            </p>
          )}
          <p className="pt-2 border-t border-blue-200">
            <strong>Merk:</strong> Håndterkeren verifiserer dokumentasjon årlig. 
            Hvis du ser utløpte sertifiseringer, kontakt oss umiddelbart.
          </p>
        </div>
      </div>

      {/* Trust message */}
      <div className="text-center py-4">
        <p className="text-sm text-gray-600">
          🔒 Trygg plattform • Verifisert av Håndterkeren • Sikker betaling via escrow
        </p>
      </div>
    </div>
  );
}
