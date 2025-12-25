<script lang="ts">
    export let href: string = "";
    export let type: "button" | "reset" | "submit" = "button";
    export let variant: "primary" | "secondary" | "outline" = "primary"; // primary, secondary, outline

    const variants = {
        primary:
            "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
        secondary:
            "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
        outline:
            "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    };

    const baseClass =
        "inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-95 no-underline cursor-pointer";
</script>

{#if href}
    <a {href} class="{baseClass} {variants[variant]}">
        <slot />
    </a>
{:else}
    <button {type} class="{baseClass} {variants[variant]}" on:click>
        <slot />
    </button>
{/if}
