import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        // Update this to your deployed domain in the future
        sitemap: 'https://your-domain.com/sitemap.xml',
    }
}
