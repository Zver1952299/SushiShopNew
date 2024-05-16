import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './CartBlock.module.scss';
import CartItem from '../CartItem';
import { cartSelector, clearItems } from '../../redux/slices/cartSlice';

const CartBlock: React.FC = () => {
  const { items, totalPrice } = useSelector(cartSelector);
  const dispatch = useDispatch();

  const totalCount = items.reduce((sum: number, obj: any) => {
    return obj.count + sum;
  }, 0);

  const onClickClear = () => {
    if (window.confirm('Are you sure?')) {
      dispatch(clearItems());
    }
  };

  if (!items.length) {
    return (
      <div className={styles.cartBlock}>
        <div className={styles.title}>
          <h2>Cart empty</h2>
        </div>

        <div className={styles.footer}>
          <Link to="/" className={styles.button}>
            Назад
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartBlock}>
      <div className={styles.title}>
        <h2>Cart</h2>
        <h4 onClick={() => onClickClear()}>Clear cart</h4>
      </div>
      <div className={styles.content}>
        {items.map((item: any) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <div className={styles.subTitle}>
        <h4>Total items: {totalCount}</h4>
        <h4>Total price: {totalPrice}$</h4>
      </div>
      <div className={styles.footer}>
        <Link to="/" className={styles.button}>
          Назад
        </Link>
        <button>Оплатить</button>
      </div>
    </div>
  );
};

export default CartBlock;
