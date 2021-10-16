import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import {
  cateSitemap,
  englishSitemap,
  postSitemap,
  projectSitemap,
} from '../../constant/sitemap';
const url = 'https://nextjs.truyenmai.com';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const cateResponse = await cateSitemap;
  const postsResponse = await postSitemap;
  const englishResponse = await englishSitemap;
  const projectResponse = await projectSitemap;
  // const categories = cateResponse.data.categories.edges.map((cate) => ({
  //   loc: `${url}${cate.node.uri}`,
  //   lastmod: new Date().toISOString(),
  // }));

  const posts = postsResponse.data.posts.edges.map((post) => ({
    loc: `${url}${post.node.uri}`,
    lastmod: new Date().toISOString(),
  }));
  const english = englishResponse.data.allEnglish.edges.map((english) => ({
    loc: `${url}${english.node.uri}`,
    lastmode: new Date().toISOString(),
  }));
  const project = projectResponse.data.allProject.edges.map((project) => ({
    loc: `${url}${project.node.uri}`,
    lastmode: new Date().toISOString(),
  }));
  // const fields: ISitemapField[] = posts;
  const fields: ISitemapField[] = posts.concat(english).concat(project);
  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}
