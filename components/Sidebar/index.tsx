import React, { useEffect } from 'react';
import { AppQuery } from './../../constant/category';
import CardPost from '../UI/CardPost/CardPostStyle1';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { FetchPostRelative } from '../../constant/posts';
import Carousel from '../UI/Carousel';
type SidebarType = {
  categoryPost: any;
  type: string;
};
const Sidebar: React.FC<SidebarType> = (props) => {
  // const { loading, error, data, refetch } = useQuery(AppQuery, {
  //   variables: {
  //     after: '',
  //     before: '',
  //     first: 12,
  //     last: null,
  //     slug: categoryPost,
  //   },
  // });
  const [data, setData] = React.useState(null);
  useEffect(() => {
    fetchData();
  }, [props]);

  const fetchData = async () => {
    console.log(props.categoryPost);
    const { data } = await FetchPostRelative({
      type: props.type,
      categoriesName: props.categoryPost,
    });
    console.log(data);
    if (props.type === 'post') {
      setData(data.posts.edges);
    } else if (props.type === 'english') {
      setData(data.allEnglishCategories.edges[0].node.english.edges);
    } else if (props.type === 'project') {
      setData(data.allProjectCategories.edges[0].node.project.edges);
    } else {
      setData(null);
    }
  };
  const renderCategoriesList = (data) => {
    let newPost = null;
    newPost = data.map((item) => ({
      title: item.node.title,
      uri: item.node.uri,
      id: item.node.uri,
      categories: [],
      views: item.node.views.views,
      featuredImage: item.node.featuredImage,
    }));
    console.log(newPost);
    return <Carousel item={newPost && newPost} column={4} />;
  };
  return (
    <div className="sticky">
      <h2>{(data && 'Post cùng danh mục') || <Skeleton />}</h2>
      {data && renderCategoriesList(data)}
    </div>
  );
};

export default Sidebar;
