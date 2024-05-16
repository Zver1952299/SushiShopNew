import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import style from './Header.module.scss';

import icon from '../../assets/img/sushiIcon.svg';
import cart from '../../assets/img/cart.svg';
import Search from '../Search/Search';
import { useSelector } from 'react-redux';
import { cartSelector } from '../../redux/slices/cartSlice';

const Header: React.FC = () => {
  const { totalPrice, items } = useSelector(cartSelector);
  const location = useLocation();
  const isMounted = useRef(false);

  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem('cart', json);
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className={style.header}>
      <Link to="/" className={style.link}>
        <div className={style.logo}>
          <img className={style.icon} src={icon} alt="logo" />
          <div>
            <h1>Suhsi</h1>
            <h3>Best rols & sushis</h3>
          </div>
        </div>
      </Link>
      {location.pathname !== '/cart' && <Search />}

      {location.pathname !== '/cart' && (
        <Link to="/cart" className={style.link}>
          <div className={style.cart}>
            <div className={style.totalPrice}>
              {totalPrice}$ | {totalCount}
            </div>
            <img className={style.cart_img} src={cart} alt="cart" />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;
