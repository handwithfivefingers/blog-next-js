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
import { useDispatch, useSelector } from 'react-redux';
import { ShowupModal } from '../../../../redux/actions';
import style from './style.module.scss';
import VideoPost from '../../VideoPost';
const CardPost = ({
  id = null,
  title = null,
  image = null,
  categories = null,
  link,
  views = null,
  type = null,
  onClick = null,
}) => {
  const dispatch = useDispatch();
  switch (type) {
    case 'link':
      return <VideoPost link={link} />;
    default:
      return (
        <div className={style.card_post}>
          <Link
            href={{
              pathname: link,
            }}
          >
            <a style={{ display: 'block' }}>
              <div className={style.card_body}>
                <div className={style.card_image}>
                  {image ? (
                    <Image
                      src={image}
                      layout="fill"
                      unoptimized={true}
                      alt="..."
                    />
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
                <div className={style.content}>
                  <div className={style.author}>
                    <span></span>
                  </div>
                  <div className={style.title}>{title}</div>
                </div>
              </div>
            </a>
          </Link>
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
      );
  }
};

export default CardPost;
