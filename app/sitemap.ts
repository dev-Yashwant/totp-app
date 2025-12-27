import { type MetadataRoute } from 'next'
import { APP_CONFIG } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = APP_CONFIG.domain

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
    ]
}
