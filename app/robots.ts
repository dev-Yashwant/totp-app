import { type MetadataRoute } from 'next'
import { APP_CONFIG } from '@/lib/config'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${APP_CONFIG.domain}/sitemap.xml`,
    }
}
