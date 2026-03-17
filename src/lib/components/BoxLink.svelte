<script lang="ts">
    export let box: {
        title: string;
        description: string;
        href: string;
    };

    const colorClass = 'hover:border-brand hover:ring-brand/20 group-hover:text-brand';
</script>

<a
    href={box.href}
    class="group block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl transition-all shadow-sm hover:shadow-xl hover:ring-4 hover:-translate-y-1 h-full flex flex-col {colorClass}"
>
    <h2
        class="text-xl font-bold font-heading text-gray-900 dark:text-gray-100 transition-colors mb-3"
    >
        {box.title}
    </h2>
    <p
        class="text-gray-600 dark:text-gray-400 leading-relaxed text-[0.9375rem] flex-grow"
    >
        {box.description}
    </p>
    
    <div class="mt-4 flex items-center text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Jelajahi</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
    </div>
</a>
