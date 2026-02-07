<svg
    width="500"
    height="120"
    viewBox="0 0 500 120"
    xmlns="http://www.w3.org/2000/svg"
    class="max-w-full h-auto"
>
    <!-- Garis utama -->
    <line
        x1="50"
        y1="60"
        x2="400"
        y2="60"
        stroke="currentColor"
        stroke-width="2"
    />

    <!-- Skala dan angka -->
    <g font-size="14" text-anchor="middle" fill="currentColor">
        <!-- ticks -->
        <line x1="100" y1="55" x2="100" y2="65" stroke="currentColor" />
        <line x1="160" y1="55" x2="160" y2="65" stroke="currentColor" />
        <line x1="220" y1="55" x2="220" y2="65" stroke="currentColor" />
        <line x1="280" y1="55" x2="280" y2="65" stroke="currentColor" />

        <!-- labels -->
        <text x="100" y="90">-2</text>
        <text x="160" y="90">-1</text>
        <text x="220" y="90">0</text>
        <text x="280" y="90">1</text>
    </g>

    <!-- Pergerakan dari -2 ke +3 -->
    <line
        x1="100"
        y1="60"
        x2="280"
        y2="60"
        stroke="currentColor"
        stroke-width="2"
    />

    <!-- Titik awal (-2) -->
    <circle cx="100" cy="60" r="5" fill="currentColor" />

    <!-- Panah ke kanan (menuju +3) -->
    <polygon points="400,60 390,55 390,65" fill="currentColor" />
</svg>
