"use client";

type Props = {
  title?: string;
  urlMaterial?: string;
  ubication?: string;
  type?: string;
};

export default function OpenMaterialButton({ title, urlMaterial, ubication, type }: Props) {
  if (!urlMaterial) {
    return <span className="opacity-60 text-xs">Sin enlace</span>;
  }

  const TRACK_TTL_MS = 5 * 60 * 1000; // 5 minutos

  const handleClick = () => {
    // Evita sumar múltiples veces en poco tiempo para el mismo material
    try {
      const key = `metrics:view:${urlMaterial}`;
      const now = Date.now();
      const last = Number(localStorage.getItem(key) || 0);
      if (isFinite(last) && now - last < TRACK_TTL_MS) {
        // En ventana de enfriamiento, no enviar métrica
      } else {
        localStorage.setItem(key, String(now));
        const payload = { title, urlMaterial, ubication, type };
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
  };

  return (
    <button type="button" className="btn btn-light" onClick={handleClick}>
      Abrir
    </button>
  );
}
