<script lang="ts">
    import { onMount } from "svelte";
    import { loadGtag } from "$lib/utils/gtag";

    const STORAGE_KEY = "gtag-consent";

    let visible = false;

    onMount(() => {
        if (readConsent()) {
            // Already consented (e.g. returning visitor): load analytics
            // right away and stay out of the way with the banner.
            void loadGtag();
        } else {
            visible = true;
        }
    });

    function readConsent(): boolean {
        try {
            return localStorage.getItem(STORAGE_KEY) === "granted";
        } catch {
            // Storage can be unavailable (private mode, blocked site data).
            return false;
        }
    }

    function setConsent(grant: boolean) {
        try {
            localStorage.setItem(STORAGE_KEY, grant ? "granted" : "denied");
        } catch {
            // Consent is best-effort; analytics work this visit only if granted.
        }
        visible = false;
        if (grant) void loadGtag();
    }
</script>

{#if visible}
    <div
        class="fixed bottom-2 left-1/2 z-30 -translate-x-1/2"
        role="status"
        aria-label="Permintaan izin analytics"
    >
        <div
            class="mx-auto max-w-[calc(100%-1rem)] rounded-xl border border-gray-200 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:max-w-md"
        >
            <p class="text-sm text-gray-600 dark:text-gray-400">
                Kami menggunakan Google Analytics di situs ini untuk membantu
                kami menyempurnakan produk. Izinkan analytics untuk
                mengaktifkannya, atau klik &ldquo;Tolak&rdquo; untuk
                mematikannya.
            </p>
            <div class="mt-3 flex flex-wrap justify-end gap-2">
                <button
                    type="button"
                    on:click={() => setConsent(false)}
                    class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                    Tolak
                </button>
                <button
                    type="button"
                    on:click={() => setConsent(true)}
                    class="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                    Izinkan analytics
                </button>
            </div>
        </div>
    </div>
{/if}
