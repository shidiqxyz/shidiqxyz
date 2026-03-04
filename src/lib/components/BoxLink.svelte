<script lang="ts">
    export let box: {
        title: string;
        description: string;
        href: string;
    };
</script>

<a
    href={box.href}
    class="group block p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all shadow-sm hover:shadow-md h-full flex flex-col"
>
    <h2
        class="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2"
    >
        {box.title}
    </h2>
    <p
        class="text-gray-600 dark:text-gray-300 leading-relaxed text-sm flex-grow"
    >
        {box.description}
    </p>
</a>
