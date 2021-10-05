import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { cateSitemap, postSitemap } from '../../constant/sitemap';
const url = 'https://nextjs.truyenmai.com';
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const cateResponse = await cateSitemap;
  const postsResponse = await postSitemap;

  // const categories = cateResponse.data.categories.edges.map((cate) => ({
  //   loc: `${url}${cate.node.uri}`,
  //   lastmod: new Date().toISOString(),
  // }));

  const posts = postsResponse.data.posts.edges.map((post) => ({
    loc: `${url}${post.node.uri}`,
    lastmod: new Date().toISOString(),
  }));

  // const fields: ISitemapField[] = categories.concat(posts);
  const fields: ISitemapField[] = posts;
  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
