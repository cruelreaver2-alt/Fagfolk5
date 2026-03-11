import { useState } from "react";
import { Upload, X, FileText, CheckCircle, AlertCircle, Calendar } from "lucide-react";

interface Certification {
  id: string;
  type: string;
  name: string;
  file?: File;
  expiryDate?: string;
  number?: string; // For org number, DSB number, etc.
  status: "pending" | "uploaded" | "verified" | "rejected";
}

interface CertificationUploadProps {
  category: string;
  certifications: Certification[];
  onCertificationsChange: (certs: Certification[]) => void;
}

export function CertificationUpload({ category, certifications, onCertificationsChange }: CertificationUploadProps) {
  const [localCertifications, setLocalCertifications] = useState<Certification[]>(certifications);

  // Define required certifications based on category
  const getRequiredCertifications = (cat: string): Omit<Certification, 'id' | 'status'>[] => {
    const base = [
      { type: "insurance", name: "Ansvarsforsikring", file: undefined, expiryDate: "" },
      { type: "org_number", name: "Organisasjonsnummer / Firmaattest", number: "" },
    ];

    switch (cat) {
      case "elektro":
        return [
          { type: "insurance", name: "Ansvarsforsikring (minimum 5 mill kr)", file: undefined, expiryDate: "" },
          { type: "org_number", name: "Organisasjonsnummer", number: "" },
          { type: "dsb_registration", name: "DSB Elvirksomhetsregistrering", number: "", expiryDate: "" },
          { type: "electrician_certificate", name: "Fagbrev som elektriker (Gr. L)", file: undefined },
          { type: "hms_certificate", name: "HMS / Internkontrollsystem (anbefalt)", file: undefined },
        ];
      case "ror":
        return [
          { type: "insurance", name: "Ansvarsforsikring (minimum 5 mill kr)", file: undefined, expiryDate: "" },
          { type: "org_number", name: "Organisasjonsnummer", number: "" },
          { type: "plumber_approval", name: "Kommunal godkjenning som rørlegger", file: undefined, number: "" },
          { type: "plumber_certificate", name: "Fagbrev som rørlegger", file: undefined },
        ];
      case "tre":
        return [
          { type: "insurance", name: "Ansvarsforsikring (minimum 2 mill kr)", file: undefined, expiryDate: "" },
          { type: "org_number", name: "Organisasjonsnummer", number: "" },
          { type: "carpenter_certificate", name: "Fagbrev som tømrer (anbefalt)", file: undefined },
          { type: "liability_cert", name: "Ansvarsrett for søknadspliktig arbeid (anbefalt)", file: undefined },
        ];
      case "tak":
        return [
          { type: "insurance", name: "Ansvarsforsikring (minimum 2 mill kr)", file: undefined, expiryDate: "" },
          { type: "org_number", name: "Organisasjonsnummer", number: "" },
          { type: "roofer_certificate", name: "Fagbrev som taktekker (anbefalt)", file: undefined },
          { type: "fall_protection", name: "HMS-kort / Opplæring i fallsikring", file: undefined, expiryDate: "" },
        ];
      case "maling":
        return [
          { type: "insurance", name: "Ansvarsforsikring (minimum 1 mill kr)", file: undefined, expiryDate: "" },
          { type: "org_number", name: "Organisasjonsnummer", number: "" },
          { type: "painter_certificate", name: "Fagbrev som maler (anbefalt)", file: undefined },
        ];
      case "varmepumpe":
        return [
          { type: "insurance", name: "Ansvarsforsikring (minimum 2 mill kr)", file: undefined, expiryDate: "" },
          { type: "org_number", name: "Organisasjonsnummer", number: "" },
          { type: "heatpump_certificate", name: "Kompetansebevis varmepumpe (anbefalt)", file: undefined },
        ];
      default:
        return base;
    }
  };

  // Initialize certifications if empty
  useState(() => {
    if (localCertifications.length === 0) {
      const required = getRequiredCertifications(category);
      const initialized = required.map((cert, index) => ({
        ...cert,
        id: `cert-${index}`,
        status: "pending" as const,
      }));
      setLocalCertifications(initialized);
      onCertificationsChange(initialized);
    }
  });

  const handleFileUpload = (certId: string, file: File) => {
    const updated = localCertifications.map(cert =>
      cert.id === certId
        ? { ...cert, file, status: "uploaded" as const }
        : cert
    );
    setLocalCertifications(updated);
    onCertificationsChange(updated);
  };

  const handleNumberChange = (certId: string, number: string) => {
    const updated = localCertifications.map(cert =>
      cert.id === certId
        ? { ...cert, number, status: number ? "uploaded" as const : "pending" as const }
        : cert
    );
    setLocalCertifications(updated);
    onCertificationsChange(updated);
  };

  const handleDateChange = (certId: string, date: string) => {
    const updated = localCertifications.map(cert =>
      cert.id === certId ? { ...cert, expiryDate: date } : cert
    );
    setLocalCertifications(updated);
    onCertificationsChange(updated);
  };

  const removeFile = (certId: string) => {
    const updated = localCertifications.map(cert =>
      cert.id === certId
        ? { ...cert, file: undefined, status: "pending" as const }
        : cert
    );
    setLocalCertifications(updated);
    onCertificationsChange(updated);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "uploaded":
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const isRequired = (type: string) => {
    if (category === "elektro") {
      return ["insurance", "org_number", "dsb_registration", "electrician_certificate"].includes(type);
    }
    if (category === "ror") {
      return ["insurance", "org_number", "plumber_approval", "plumber_certificate"].includes(type);
    }
    return ["insurance", "org_number"].includes(type);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">Dokumentasjon kreves</h4>
            <p className="text-sm text-blue-800">
              Last opp nødvendig dokumentasjon for å bli verifisert. 
              <span className="text-red-600 font-semibold"> *</span> = Obligatorisk.
            </p>
          </div>
        </div>
      </div>

      {localCertifications.map((cert) => (
        <div key={cert.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">
                  {cert.name}
                  {isRequired(cert.type) && <span className="text-red-600 ml-1">*</span>}
                </h4>
                {getStatusIcon(cert.status)}
              </div>
              {cert.type === "insurance" && (
                <p className="text-xs text-gray-600 mt-1">
                  Minimum dekning: {category === "elektro" || category === "ror" ? "5" : category === "tre" || category === "tak" ? "2" : "1"} millioner kr
                </p>
              )}
            </div>
          </div>

          {/* Number input for org number, DSB registration, etc */}
          {(cert.type === "org_number" || cert.type === "dsb_registration" || cert.type === "plumber_approval") && (
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-2">
                {cert.type === "org_number" ? "Organisasjonsnummer" : 
                 cert.type === "dsb_registration" ? "DSB Registreringsnummer" :
                 "Godkjenningsnummer"}
              </label>
              <input
                type="text"
                placeholder={cert.type === "org_number" ? "123 456 789" : "Registreringsnummer"}
                value={cert.number || ""}
                onChange={(e) => handleNumberChange(cert.id, e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Expiry date for insurance and time-limited certificates */}
          {(cert.type === "insurance" || cert.type === "dsb_registration" || cert.type === "fall_protection") && (
            <div className="mb-3">
              <label className="block text-sm text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Utløpsdato
              </label>
              <input
                type="date"
                value={cert.expiryDate || ""}
                onChange={(e) => handleDateChange(cert.id, e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* File upload */}
          {cert.type !== "org_number" && (
            <div>
              {cert.file ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-900 font-medium truncate max-w-xs">
                      {cert.file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(cert.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(cert.id, file);
                    }}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <Upload className="w-8 h-8 text-gray-400" />
                  <p className="text-sm text-gray-600 text-center">
                    Klikk for å laste opp dokument
                  </p>
                  <p className="text-xs text-gray-500">PDF, JPG eller PNG</p>
                </label>
              )}
            </div>
          )}

          {/* Status message */}
          {cert.status === "verified" && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Verifisert av Håndterkeren
            </p>
          )}
          {cert.status === "rejected" && (
            <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Avvist - vennligst last opp gyldig dokument
            </p>
          )}
        </div>
      ))}

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Status</h4>
        <div className="text-sm text-gray-700">
          <p>
            Dokumenter lastet opp: {localCertifications.filter(c => c.status !== "pending").length} / {localCertifications.filter(c => isRequired(c.type)).length} (obligatoriske)
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Du kan fullføre registreringen nå og laste opp resterende dokumenter senere, 
            men profilen vil ikke bli verifisert før all obligatorisk dokumentasjon er godkjent.
          </p>
        </div>
      </div>
    </div>
  );
}