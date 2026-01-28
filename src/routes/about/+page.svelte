<script>
	import ContactLinks from "$lib/components/ContactLinks.svelte";
</script>

<svelte:head>
	<title>About - shidiq</title>
	<meta
		name="description"
		content="Tentang shidiq - seseorang yang berusaha untuk hidup."
	/>

	<!-- Open Graph -->
	<meta property="og:site_name" content="shidiq" />
	<meta property="og:title" content="About - shidiq" />
	<meta
		property="og:description"
		content="Tentang shidiq - seseorang yang berusaha untuk hidup."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://shidiq.xyz/about" />
	<meta property="og:image" content="https://shidiq.xyz/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="About - shidiq" />
	<meta
		name="twitter:description"
		content="Tentang shidiq - seseorang yang berusaha untuk hidup."
	/>
	<meta name="twitter:image" content="https://shidiq.xyz/og-image.png" />
</svelte:head>

<article class="prose prose-lg dark:prose-invert">
	<h1>About Me</h1>

	<h2>Halo!</h2>
	<p>Perkenalkan nama saya <strong>Muhamad Shidiq Maulana</strong>.</p>
	<p>Saya adalah seseorang yang bingung dengan kehidupannya sendiri.</p>
	<p>Ada beberapa hal yang saya sukai.</p>
	<p>
		Saya suka menulis, membaca, menonton film maupun anime, menggambar,
		mendengarkan musik, mengobrol dan lain-lain.
	</p>

	<p>Jika ditanya apa top anime yang terbaik akan jawab ini.</p>
	<ul>
		<li>Chikyu</li>
		<li>Kino no Tabi</li>
		<li>Colorful</li>
	</ul>

	<p>Untuk musik saya penikmat jpop, seperti</p>
	<ul>
		<li>Sanketsu Shoujo Sayuri</li>
		<li>Yorushika</li>
		<li>Yanagi Nagi</li>
		<li>Ado</li>
		<li>Dan lain-lain.</li>
	</ul>

	<p>Tujuan dari blog ini.</p>
	<p>Mendokumentasi perjalanan dan pemikiran saya.</p>
	<p>Untuk melihat bagaimana perjalanan saya setiap harinya.</p>
	<p>Ya, seperti itu saja.</p>

	<h2>Kontak</h2>
	<p>Anda bisa menghubungi saya melalui media sosial berikut:</p>
	<ContactLinks />
</article>
