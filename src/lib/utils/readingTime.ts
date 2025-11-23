/**
 * Calculate estimated reading time for text content
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Reading time in minutes
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
    // Remove HTML tags and extra whitespace
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    // Count words
    const wordCount = cleanText.split(' ').length;

    // Calculate reading time in minutes
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return readingTime;
}

/**
 * Format reading time for display
 * @param minutes - Reading time in minutes
 * @returns Formatted string like "5 menit baca"
 */
export function formatReadingTime(minutes: number): string {
    return `${minutes} menit baca`;
}
