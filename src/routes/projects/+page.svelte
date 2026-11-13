<script>
    import { fly, fade } from "svelte/transition";

    const projects = [
        {
            title: "Sayuri Archive",
            description: "Arsip dari blog (Sanketsu Shoujo Sayuri).",
            link: "https://www.sayuri-archive.com/",
            image: "/projects/sayuri-archive.png",
        },
        {
            title: "TukangSeblak",
            description: "Tool-tools sederhana.",
            link: "https://tukangseblak.vercel.app/",
            image: "/projects/tukangseblak.png",
        },
        {
            title: "see you on july",
            description: "Situs personal untuk band shoegaze.",
            link: "https://syoj.vercel.app/",
            image: "/projects/seeyouonjuly.png",
        },
        {
            title: "Paranada Records",
            description: "Situs resmi label musik dengan desain profesional.",
            link: "https://paranada.vercel.app/",
            image: "/projects/paranada.png",
        },
        {
            title: "HIMASIK",
            description: "Situs resmi Himpunan Musik (HIMASIK).",
            link: "https://www.himasik.org/",
            image: "/projects/himasik.png",
        },
    ];
</script>

<svelte:head>
    <title>Project - shidiq</title>
    <meta name="description" content="Daftar proyek yang dikerjakan oleh shidiq." />

    <!-- Open Graph -->
    <meta property="og:site_name" content="shidiq" />
    <meta property="og:title" content="Project - shidiq" />
    <meta property="og:description" content="Daftar proyek yang dikerjakan oleh shidiq." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://shidiq.xyz/projects" />
    <meta property="og:image" content="https://shidiq.xyz/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Project - shidiq" />
    <meta name="twitter:description" content="Daftar proyek yang dikerjakan oleh shidiq." />
    <meta name="twitter:image" content="https://shidiq.xyz/og-image.png" />
</svelte:head>

<section class="space-y-16">
    <!-- Header -->
    <div class="space-y-4" in:fly={{ y: 20, duration: 500 }}>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Project
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
            Kumpulan proyek yang pernah saya kerjakan.
        </p>
    </div>

    <!-- Projects Section -->
    <div class="space-y-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {#each projects as project, i}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    in:fly={{ y: 24, duration: 450, delay: 100 + i * 90 }}
                    class="group block overflow-hidden bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-1 hover:ring-blue-500/20"
                >
                    <div class="relative overflow-hidden">
                        <img
                            src={project.image}
                            alt={`Tangkapan layar ${project.title}`}
                            loading="lazy"
                            class="w-full aspect-[2/1] object-cover object-top border-b border-gray-200 dark:border-gray-700 transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div
                            class="absolute inset-0 flex items-center justify-center bg-gray-900/0 group-hover:bg-gray-900/40 transition-colors duration-300"
                        >
                            <span
                                class="inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-gray-900/90 px-3 py-1.5 text-xs font-medium text-gray-900 dark:text-gray-100 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
                            >
                                Kunjungi situs
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <h3
                                class="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors"
                            >
                                {project.title}
                            </h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {project.description}
                        </p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>
