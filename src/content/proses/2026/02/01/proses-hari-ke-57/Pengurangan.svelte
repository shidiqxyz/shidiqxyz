<svg
    width="500"
    height="100"
    viewBox="0 0 500 100"
    xmlns="http://www.w3.org/2000/svg"
    class="max-w-full h-auto"
>
    <!-- Garis utama -->
    <line
        x1="50"
        y1="50"
        x2="450"
        y2="50"
        stroke="currentColor"
        stroke-width="2"
    />

    <!-- Skala dan angka -->
    <g font-size="14" text-anchor="middle" fill="currentColor">
        <!-- ticks -->
        <line x1="100" y1="45" x2="100" y2="55" stroke="currentColor" />
        <line x1="175" y1="45" x2="175" y2="55" stroke="currentColor" />
        <line x1="250" y1="45" x2="250" y2="55" stroke="currentColor" />
        <line x1="325" y1="45" x2="325" y2="55" stroke="currentColor" />
        <!-- labels -->
        <text x="100" y="75">5</text>
        <text x="175" y="75">6</text>
        <text x="250" y="75">7</text>
        <text x="325" y="75">8</text>
    </g>

    <!-- Titik awal (8) -->
    <circle cx="325" cy="50" r="5" fill="currentColor" />

    <!-- Panah ke kiri -->
    <polygon points="50,50 60,45 60,55" fill="currentColor" />
</svg>
