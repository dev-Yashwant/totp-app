import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    // Update this to your deployed domain
    const baseUrl = 'https://your-domain.com'

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]
}
