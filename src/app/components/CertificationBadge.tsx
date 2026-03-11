import { Shield, Award, CheckCircle, FileText, Zap, Wrench, HardHat, Flame } from "lucide-react";

export interface Certification {
  type: string;
  status: "verified" | "pending" | "uploaded" | "expired";
  name?: string;
  expiryDate?: string;
  url?: string;
  value?: string;
}

interface CertificationBadgeProps {
  certification: Certification;
  showDetails?: boolean;
  size?: "sm" | "md" | "lg";
}

// Mapping av sertifiseringstyper til visuelle elementer
const certificationConfig: Record<string, {
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  name: string;
  description: string;
}> = {
  insurance: {
    icon: Shield,
    color: "text-green-700",
    bgColor: "bg-green-100",
    borderColor: "border-green-300",
    name: "Ansvarsforsikring",
    description: "Gyldig yrkesskadeforsikring",
  },
  org_number: {
    icon: FileText,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
    borderColor: "border-blue-300",
    name: "Organisasjonsnummer",
    description: "Registrert i Brønnøysundregistrene",
  },
  dsb_registration: {
    icon: Zap,
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-300",
    name: "DSB Elvirksomhet",
    description: "Registrert hos DSB som elektrovirksomhet",
  },
  electrician_certificate: {
    icon: Zap,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-300",
    name: "Fagbrev Elektriker",
    description: "Godkjent fagbrev som elektriker",
  },
  plumber_approval: {
    icon: Wrench,
    color: "text-cyan-700",
    bgColor: "bg-cyan-100",
    borderColor: "border-cyan-300",
    name: "Kommunal godkjenning",
    description: "Godkjent som rørlegger av kommunen",
  },
  plumber_certificate: {
    icon: Wrench,
    color: "text-teal-700",
    bgColor: "bg-teal-100",
    borderColor: "border-teal-300",
    name: "Fagbrev Rørlegger",
    description: "Godkjent fagbrev som rørlegger",
  },
  fall_protection: {
    icon: HardHat,
    color: "text-orange-700",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-300",
    name: "HMS-kort / Fallsikring",
    description: "Godkjent HMS-kort og fallsikringskurs",
  },
  carpenter_certificate: {
    icon: Award,
    color: "text-brown-700",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-300",
    name: "Fagbrev Tømrer",
    description: "Godkjent fagbrev som tømrer",
  },
  gas_certificate: {
    icon: Flame,
    color: "text-red-700",
    bgColor: "bg-red-100",
    borderColor: "border-red-300",
    name: "Gasssertifikat",
    description: "Godkjent for gassarbeid",
  },
  painter_certificate: {
    icon: Award,
    color: "text-purple-700",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-300",
    name: "Fagbrev Maler",
    description: "Godkjent fagbrev som maler",
  },
};

export function CertificationBadge({ 
  certification, 
  showDetails = false,
  size = "md"
}: CertificationBadgeProps) {
  const config = certificationConfig[certification.type] || {
    icon: Award,
    color: "text-gray-700",
    bgColor: "bg-gray-100",
    borderColor: "border-gray-300",
    name: certification.name || certification.type,
    description: "Annen godkjenning",
  };

  const Icon = config.icon;

  // Størrelsesvarianter
  const sizeClasses = {
    sm: {
      container: "w-10 h-10",
      icon: "w-5 h-5",
      badge: "w-3 h-3",
      checkIcon: "w-2 h-2",
    },
    md: {
      container: "w-14 h-14",
      icon: "w-7 h-7",
      badge: "w-4 h-4",
      checkIcon: "w-2.5 h-2.5",
    },
    lg: {
      container: "w-20 h-20",
      icon: "w-10 h-10",
      badge: "w-6 h-6",
      checkIcon: "w-3.5 h-3.5",
    },
  };

  const sizes = sizeClasses[size];

  // Status-farger
  const statusConfig = {
    verified: {
      badgeBg: "bg-green-500",
      badgeBorder: "border-white",
      tooltip: "Verifisert",
    },
    uploaded: {
      badgeBg: "bg-blue-500",
      badgeBorder: "border-white",
      tooltip: "Lastet opp",
    },
    pending: {
      badgeBg: "bg-yellow-500",
      badgeBorder: "border-white",
      tooltip: "Venter på godkjenning",
    },
    expired: {
      badgeBg: "bg-red-500",
      badgeBorder: "border-white",
      tooltip: "Utløpt",
    },
  };

  const status = statusConfig[certification.status];

  if (showDetails) {
    return (
      <div className="flex items-start gap-3 p-4 bg-white border-2 rounded-xl hover:shadow-md transition-shadow">
        <div className="relative flex-shrink-0">
          <div className={`${sizes.container} ${config.bgColor} ${config.borderColor} border-2 rounded-lg flex items-center justify-center`}>
            <Icon className={`${sizes.icon} ${config.color}`} />
          </div>
          <div 
            className={`absolute -bottom-1 -right-1 ${sizes.badge} ${status.badgeBg} ${status.badgeBorder} border-2 rounded-full flex items-center justify-center`}
            title={status.tooltip}
          >
            {certification.status === "verified" && (
              <CheckCircle className={`${sizes.checkIcon} text-white`} />
            )}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-[#111827] text-sm mb-1">
            {config.name}
          </h4>
          <p className="text-xs text-[#6B7280] mb-2">
            {config.description}
          </p>
          {certification.expiryDate && (
            <p className="text-xs text-[#9CA3AF]">
              Utløper: {new Date(certification.expiryDate).toLocaleDateString("nb-NO")}
            </p>
          )}
          {certification.status === "verified" && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-green-50 border border-green-200 rounded-full">
              <CheckCircle className="w-3 h-3 text-green-600" />
              <span className="text-xs font-medium text-green-700">Verifisert</span>
            </div>
          )}
          {certification.status === "expired" && (
            <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-red-50 border border-red-200 rounded-full">
              <span className="text-xs font-medium text-red-700">Utløpt - må fornyes</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Kompakt visning
  return (
    <div 
      className="relative group"
      title={`${config.name} - ${status.tooltip}`}
    >
      <div className={`${sizes.container} ${config.bgColor} ${config.borderColor} border-2 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}>
        <Icon className={`${sizes.icon} ${config.color}`} />
      </div>
      <div 
        className={`absolute -bottom-1 -right-1 ${sizes.badge} ${status.badgeBg} ${status.badgeBorder} border-2 rounded-full flex items-center justify-center`}
      >
        {certification.status === "verified" && (
          <CheckCircle className={`${sizes.checkIcon} text-white`} />
        )}
      </div>
      
      {/* Tooltip on hover */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
        {config.name}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}

// Komponent for å vise alle badges i et grid
interface CertificationGridProps {
  certifications: Certification[];
  size?: "sm" | "md" | "lg";
  maxDisplay?: number;
}

export function CertificationGrid({ 
  certifications, 
  size = "md",
  maxDisplay
}: CertificationGridProps) {
  const verified = certifications.filter(c => c.status === "verified");
  const displayCerts = maxDisplay ? verified.slice(0, maxDisplay) : verified;
  const remaining = verified.length - displayCerts.length;

  if (verified.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {displayCerts.map((cert, index) => (
        <CertificationBadge 
          key={index}
          certification={cert}
          size={size}
        />
      ))}
      {remaining > 0 && (
        <div 
          className={`${size === "sm" ? "w-10 h-10" : size === "md" ? "w-14 h-14" : "w-20 h-20"} bg-gray-100 border-2 border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors`}
          title={`+${remaining} flere sertifiseringer`}
        >
          <span className="text-sm font-semibold text-gray-600">
            +{remaining}
          </span>
        </div>
      )}
    </div>
  );
}

// Liste-visning med detaljer
interface CertificationListProps {
  certifications: Certification[];
}

export function CertificationList({ certifications }: CertificationListProps) {
  const verified = certifications.filter(c => c.status === "verified");

  if (verified.length === 0) {
    return (
      <div className="text-center py-8 text-[#6B7280]">
        <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Ingen verifiserte sertifiseringer ennå</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {verified.map((cert, index) => (
        <CertificationBadge 
          key={index}
          certification={cert}
          showDetails={true}
        />
      ))}
    </div>
  );
}
