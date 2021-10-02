import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaGooglePlusG,
  FaPinterestP,
  FaEye,
} from 'react-icons/fa';
import style from './style.module.scss';
const CardPostStyle2 = (props) => {
  const { image, link, title, categories, views } = props;
  return (
    <div className={style.card_post}>
      <div className={style.card_image}>
        {image ? (
          <Image src={image} layout="fill" unoptimized={true} alt="..." />
        ) : (
          ''
        )}
        <div className={style.card_social}>
          <FaFacebookF />
          <FaInstagram />
          <FaGooglePlusG />
          <FaPinterestP />
        </div>
      </div>
      
      <div className={style.card_body}>
        <div className={style.content}>
          <div className={style.author}>
            <span></span>
          </div>
          <div className={style.title}>
            <Link
              href={{
                pathname: link,
              }}
            >
              <a style={{ display: 'block' }}>{title}</a>
            </Link>
          </div>
        </div>

        <div className={style.card_action}>
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
          <span style={{ color: 'rgb( 0 0 0 / 50%)' }}>
            {views}
            <FaEye
              style={{
                paddingLeft: 5,
                transform: ' translate(0px ,2px)',
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardPostStyle2;