import React from 'react';
import Link from 'next/link';
type MenuLinkType = {
  path?: String;
  name?: String;
};
const MenuLink: React.FC<MenuLinkType> = ({ path, name }) => {
  return (
    <Link href={`${path}`}>
      <a className="menu-item">{name}</a>
    </Link>
  );
};

export default MenuLink;
