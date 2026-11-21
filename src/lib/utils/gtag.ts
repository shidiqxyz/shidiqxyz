const GA_MEASUREMENT_ID = "G-769KD4QR7Z";

declare global {
    interface Window {
        dataLayer?: Array<Record<string, unknown>>;
    }
}

let loaded = false;

/**
 * Loads gtag.js. Only call this after the user has granted consent
 * (see ConsentBanner), so no third-party traffic happens before that.
 */
export async function loadGtag(): Promise<void> {
    if (loaded || typeof window === "undefined") return;
    loaded = true;

    // Mirror the classic gtag bootstrap: queue events into dataLayer, then
    // load the external script that drains it.
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    dataLayer.push({ event: "js", value: new Date() });
    dataLayer.push({ event: "config", send_to: GA_MEASUREMENT_ID });

    await new Promise<void>((resolve) => {
        const script = document.createElement("script");
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        script.async = true;
        script.addEventListener("load", () => resolve(), { once: true });
        script.addEventListener("error", () => resolve(), { once: true });
        document.head.appendChild(script);
    });
}
