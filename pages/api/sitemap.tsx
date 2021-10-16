import { SitemapStream, streamToPromise } from 'sitemap';
import { IncomingMessage, ServerResponse } from 'http';
import {
  englishSitemap,
  postSitemap,
  projectSitemap,
} from '../../constant/sitemap';

export default async function sitemapFunc(
  req: IncomingMessage,
  res: ServerResponse,
) {
  res.setHeader('Content-Type', 'text/xml');
  try {
    const postsResponse = await postSitemap; // call the backend and fetch all stories
    const englishResponse = await englishSitemap;
    const projectResponse = await projectSitemap;

    const smStream = new SitemapStream({
      hostname: 'https://' + req.headers.host,
    });
    postsResponse.data.posts.edges.map((post) => {
      return smStream.write({
        url: post.node.uri,
        lastmod: new Date().toISOString(),
      });
    });
    englishResponse.data.allEnglish.edges.map((english) => {
      return smStream.write({
        url: english.node.uri,
        lastmod: new Date().toISOString(),
      });
    });
    projectResponse.data.allProject.edges.map((project) => {
      return smStream.write({
        url: project.node.uri,
        lastmod: new Date().toISOString(),
      });
    });

    smStream.end();
    const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());
    res.write(sitemap);
    res.end();
  } catch (e) {
    // console.log(e);
    res.statusCode = 500;
    res.end();
  }
}
