import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const response = await resolve(event);

    // Untuk halaman HTML: selalu revalidate dengan server
    // Browser akan tetap menggunakan cache jika konten belum berubah (304),
    // tapi akan mengambil versi baru jika sudah ada update
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('text/html')) {
        response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    return response;
};
