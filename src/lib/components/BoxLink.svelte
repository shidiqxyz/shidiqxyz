<script lang="ts">
    export let box: {
        title: string;
        description: string;
        href: string;
    };

    const colorClass = 'hover:border-brand group-hover:text-brand';
</script>

<a
    href={box.href}
    class="group block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors hover:border-brand dark:hover:border-brand hover:bg-gray-50/60 dark:hover:bg-gray-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 h-full flex flex-col {colorClass}"
>
    <div class="mb-2 flex items-center justify-between gap-3">
        <h2
            class="text-xl font-bold font-heading tracking-tight text-gray-900 dark:text-gray-100 transition-colors"
        >
            {box.title}
        </h2>
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="h-5 w-5 shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-brand group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
    </div>
    <p
        class="text-gray-600 dark:text-gray-400 leading-relaxed text-[0.9375rem] flex-grow"
    >
        {box.description}
    </p>
</a>
