import { SitemapStream, streamToPromise } from 'sitemap';

export default defineEventHandler(() => {
	// Fetch all documents
	const sitemap = new SitemapStream({
		hostname: 'https://harshkumarsingh.software'
	});
	sitemap.write({ url: '/', changefreq: 'monthly' });
	sitemap.write({ url: '/hrt', changefreq: 'monthly' });

	sitemap.end();
	return streamToPromise(sitemap);
});
