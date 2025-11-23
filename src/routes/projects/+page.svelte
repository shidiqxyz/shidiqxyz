<script>
    const projects = [
        {
            title: "Sayuri Archive",
            description: "Arsip dari blog (Sanketsu Shoujo Sayuri).",
            link: "https://www.sayuri-archive.com/",
        },
        {
            title: "TukangSeblak",
            description: "Tool-tools sederhana.",
            link: "https://tukangseblak.vercel.app/",
        },
        {
            title: "Ramalan Haru",
            description:
                "Aplikasi ramalan sederhana untuk hiburan sehari-hari.",
            link: "https://ramalan-haru.vercel.app/",
        },
        {
            title: "gensynImpek_bot",
            description:
                "Bot Telegram untuk membantu cek kontibusi project Gensyn.",
            link: "https://t.me/gensynImpek_bot/",
        },
    ];

    const nodes = [
        {
            title: "Avail",
            description: "Menjalankan node validator untuk jaringan Avail.",
            link: "https://www.availproject.org/",
            status: "Active",
        },
        {
            title: "PolymerLabs",
            description:
                "Kontribusi pada jaringan PolymerLabs sebagai node operator.",
            link: "https://www.polymerlabs.org/",
            status: "Active",
        },
        {
            title: "Lava",
            description:
                "Menyediakan layanan RPC melalui jaringan Lava Network.",
            link: "https://www.lavanet.xyz/",
            status: "Active",
        },
        {
            title: "Nillion",
            description:
                "Berpartisipasi dalam jaringan komputasi privat Nillion.",
            link: "https://nillion.com/",
            status: "Active",
        },
    ];
</script>

<svelte:head>
    <title>Projects & Nodes - shidiq</title>
</svelte:head>

<section class="space-y-16">
    <!-- Header -->
    <div class="space-y-4">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
            Projects & Nodes
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Berikut adalah beberapa proyek yang saya kerjakan dan node jaringan
            yang saya kelola. Saya senang membangun sesuatu yang bermanfaat dan
            berkontribusi pada ekosistem terdesentralisasi.
        </p>
    </div>

    <!-- Projects Section -->
    <div class="space-y-8">
        <h2
            class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2"
        >
            <span class="text-blue-500">#</span> Projects
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each projects as project}
                <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group block p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                    <div class="flex justify-between items-start mb-4">
                        <h3
                            class="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-500 transition-colors"
                        >
                            {project.title}
                        </h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors"
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
                    <p
                        class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2"
                    >
                        {project.description}
                    </p>
                </a>
            {/each}
        </div>
    </div>

    <!-- Nodes Section -->
    <div class="space-y-8">
        <h2
            class="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2"
        >
            <span class="text-green-500">#</span> Nodes
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each nodes as node}
                <a
                    href={node.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group block p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                    <div class="flex justify-between items-start mb-4">
                        <h3
                            class="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-green-500 transition-colors"
                        >
                            {node.title}
                        </h3>
                        <span
                            class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium"
                        >
                            <span class="relative flex h-2 w-2">
                                <span
                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                                ></span>
                                <span
                                    class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
                                ></span>
                            </span>
                            {node.status}
                        </span>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400">
                        {node.description}
                    </p>
                </a>
            {/each}
        </div>
    </div>
</section>
