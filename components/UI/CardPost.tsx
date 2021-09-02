import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
const CardPost = ({ id, title, image, categories, link }) => {
  return (
    <Link
      href={{
        pathname: link,
        query: { id },
      }}
    >
      <a>
        <div className="card-post">
          <div className="card-body">
            <div className="card-image">
              <Image src={image} layout="fill" unoptimized={true} alt="..." />
              <div className="card-social">
                <span>F</span>
                <span>G</span>
                <span>I</span>
                <span>P</span>
              </div>
            </div>
            <div className="content">
              <div className="author">
                <span></span>
              </div>
              <div className="title">{title}</div>
            </div>
          </div>
          <div className="card-action">
            <span>
              {categories.edges !== undefined
                ? categories.edges.map((item, index) => {
                    return (
                      <Link
                        key={item.node.uri + '-' + index}
                        href={`${item.node.uri}`}
                      >
                        <a> {item.node.name}</a>
                      </Link>
                    );
                  })
                : ''}
            </span>
            <span> ... </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default CardPost;
