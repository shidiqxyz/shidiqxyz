<script lang="ts">
    import { onMount } from "svelte";

    export let tweetLink: string = "";
    export let theme: "light" | "dark" = "light";

    let container: HTMLElement;

    // Normalize x.com to twitter.com for the widget
    $: finalLink = tweetLink.replace("x.com", "twitter.com");

    onMount(() => {
        if (window.twttr) {
            window.twttr.widgets.load(container);
        } else {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charset = "utf-8";
            document.body.appendChild(script);
        }
    });
</script>

<div
    class="tweet-container my-8 w-full flex justify-center"
    bind:this={container}
>
    <blockquote
        class="twitter-tweet"
        data-theme={theme}
        data-dnt="true"
        data-align="center"
    >
        <a href={finalLink} aria-label="View Tweet on Twitter"></a>
    </blockquote>
</div>

<style>
    /* Optional: Ensure it doesn't overflow */
    :global(.twitter-tweet) {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        width: 100% !important;
    }
</style>
