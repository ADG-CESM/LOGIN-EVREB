"use client";

type Props = {
  materialId?: string;
  title?: string;
  urlMaterial?: string;
  ubication?: string;
  type?: string;
  onOpened?: () => void;
};

export default function OpenMaterialButton({ materialId, title, urlMaterial, ubication, type, onOpened }: Props) {
  if (!urlMaterial) {
    return <span className="opacity-60 text-xs">Sin enlace</span>;
  }

  const handleClick = () => {
    // Registra SIEMPRE una vista por cada clic
    try {
      const payload = { materialId, title, urlMaterial, ubication, type };
      const url = "/evreb/api/metrics/view";
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
        navigator.sendBeacon(url, blob);
      } else {
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => { /* ignored */ });
      }
    } catch {
      // ignore tracking errors
    }

    try {
      window.open(urlMaterial, "_blank", "noopener,noreferrer");
    } catch {
      // Fallback to same-tab navigation
      window.location.href = urlMaterial;
    }

    try {
      if (onOpened) onOpened();
    } catch {
      // ignore callback errors
    }
  };

  return (
    <button type="button" className="btn btn-light" onClick={handleClick}>
      Abrir
    </button>
  );
}
