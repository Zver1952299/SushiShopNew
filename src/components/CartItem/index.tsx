import { useDispatch } from 'react-redux';
import { ItemCart, addProduct, itemMinus, removeProduct } from '../../redux/slices/cartSlice';
import styles from './CartItem.module.scss';
import React from 'react';

// import img from '../../assets/img/100.png';

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  size: number[];
  sizeActive: number;
  imageUrl: string;
  count: number;
};

const CartItem: React.FC<CartItemProps> = ({
  id,
  title,
  price,
  size,
  sizeActive,
  imageUrl,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickMinus = () => {
    dispatch(itemMinus(id));
  };

  const onClickPlus = () => {
    dispatch(addProduct({ id } as ItemCart));
  };

  return (
    <div className={styles.cartItem}>
      <img src={imageUrl} alt="img" />
      <div className={styles.title}>
        <h3>{title}</h3>
        <p>Size: {size[sizeActive]}</p>
      </div>
      <div className={styles.counter}>
        <button
          disabled={count === 1}
          onClick={() => onClickMinus()}
          className={styles.counter__button}>
          -
        </button>
        <span className={styles.counter__count}>{count}</span>
        <span onClick={() => onClickPlus()} className={styles.counter__button}>
          +
        </span>
      </div>
      <span>{price * count}$</span>
      <span onClick={() => dispatch(removeProduct(id))} className={styles.delete}>
        delete
      </span>
    </div>
  );
};

export default CartItem;
