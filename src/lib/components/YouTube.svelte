<script>
    export let id;
    export let title = "YouTube video player";

    let isPlaying = false;

    function play() {
        isPlaying = true;
    }
</script>

<div
    class="relative w-full aspect-video my-8 rounded-xl overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800"
>
    {#if isPlaying}
        <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/{id}?autoplay=1"
            {title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
        ></iframe>
    {:else}
        <!-- Thumbnail Facade -->
        <button
            on:click={play}
            class="group absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer"
            aria-label="Play Video"
        >
            <!-- Thumbnail Image -->
            <img
                src="https://i.ytimg.com/vi/{id}/maxresdefault.jpg"
                alt={title}
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
            />

            <!-- Play Button Overlay -->
            <div
                class="relative z-10 w-16 h-16 flex items-center justify-center rounded-full bg-red-600 group-hover:bg-red-700 text-white shadow-xl transition-all duration-300 group-hover:scale-110"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-8 h-8 ml-1"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M8 5v14l11-7z" />
                </svg>
            </div>

            <!-- Dark Overlay for better contrast -->
            <div
                class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"
            ></div>
        </button>
    {/if}
</div>
