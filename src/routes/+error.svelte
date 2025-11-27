<script>
    import { page } from "$app/stores";
</script>

<svelte:head>
    <title>404 - Halaman Tidak Ditemukan</title>
</svelte:head>

<div class="flex flex-col items-center min-h-[80vh] text-center px-4 py-12">
    <div class="max-w-3xl w-full mb-5">
        <img
            src="/og-image.png"
            alt="404 Illustration"
            class="w-full h-auto rounded-xl shadow-sm border border-gray-100 dark:border-gray-800"
        />
    </div>

    <h1
        class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight"
    >
        404
    </h1>

    <p
        class="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed"
    >
        Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah
        dipindahkan.
    </p>

    <a
        href="/"
        class="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200"
    >
        Kembali ke Beranda
    </a>
</div>
