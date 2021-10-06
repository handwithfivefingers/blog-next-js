import { useRouter } from 'next/router';
import React from 'react';
import styles from './style.module.scss';
import { RouterPath } from './../../constant/router';
import Link from 'next/link';
const Breadcrumb = (props) => {
  const router = useRouter();
  // console.log(router);
  const SlicePath = () => {
    let xhtml = null;
    let path = router.asPath;

    xhtml = path.split('/').map((item, index) => {
      let alotOfPath = RouterPath.filter(
        (routerItem) => routerItem.path === item,
      );
      if (index === path.split('/').length - 1) {
        return (
          <li key={index}>
            <span className={styles.title}>
              <p>{props.title}</p>
            </span>
          </li>
        );
      }
      if (index >= 2) {
        return '';
      }
      if (RouterPath.filter((routerItem) => routerItem.path === item)) {
        return (
          <li key={item}>
            <Link href={`${alotOfPath[0].pathname}`}>
              <a>
                {alotOfPath[0].icon ? alotOfPath[0].icon : alotOfPath[0].name}
              </a>
            </Link>
          </li>
        );
      }
    });
    return xhtml;
  };
  return <ul className={styles.breadcrumb}>{SlicePath()}</ul>;
};

export default Breadcrumb;
