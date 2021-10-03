import React from 'react';
import { getSinglePage, Pages } from '../../constant/page';
// import { contactPage } from '../../constant/page';
import parser from 'react-html-parser';
import Head from 'next/head';
import client from '../../apollo-client';
import { gql, useQuery } from '@apollo/client';
import CardProject from './../../components/UI/CardProject';
const Project = (props) => {
  const { loading, error, data, refetch } = useQuery(
    gql`
      query MyQuery {
        allProject(first: 12, after: "", before: "") {
          edges {
            node {
              id
              title
              uri
              views {
                views
              }
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    `,
    {
      variables: { after: '', before: '', first: 12, last: null },
      notifyOnNetworkStatusChange: true,
    },
  );
  if (loading) return 'loading ....';
  console.log(data.allProject);
  if (data) {
    return (
      <>
        <Head>{parser(props?.data.page.seo.fullHead)}</Head>
        <div className="row" style={{ margin: 0 }}>
          <div className="about-page" style={{ minHeight: '100vh' }}>
            <h2>Project/Program</h2>
            <div className="wrapper">
              {/* {parser(props?.data.page.content)} */}
              {data.allProject.edges.map((project) => {
                return (
                  <CardProject
                    key={project.node.id}
                    img={project.node.featuredImage?.node.sourceUrl}
                    title={project.node.title}
                    // author={project.author}
                    // like={project.like}
                    views={project.node.views.views}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Project;

export const getServerSideProps = async (context) => {
  const { data } = await getSinglePage(Pages.Project);
  return {
    props: {
      data: data,
    },
  };
};
