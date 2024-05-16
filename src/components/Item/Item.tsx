import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import style from './Item.module.scss';

import { ItemCart, addProduct, cartSelectorItemById } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

type ItemProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
};

const Item: React.FC<ItemProps> = ({ id, title, price, imageUrl, size }) => {
  const [sizeActive, setSizeActive] = useState(0);
  const cartItem = useSelector(cartSelectorItemById(id));
  const dispatch = useDispatch();

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: ItemCart = {
      id,
      title,
      price,
      imageUrl,
      sizeActive,
      size,
      count: 0,
    };
    dispatch(addProduct(item));
  };

  return (
    <div className={style.item}>
      <img src={imageUrl} alt="sushi" />
      <Link to={`/product/${id}`} className={style.title}>
        {title}
      </Link>
      <p>{price}$</p>
      <ul className={style.sizes}>
        {size.map((value, i) => (
          <li
            key={i}
            className={sizeActive === i ? style.active : ''}
            onClick={() => setSizeActive(i)}>
            {value}
          </li>
        ))}
      </ul>
      <button className={style.button} onClick={onClickAdd}>
        <span>Добавить</span>
        {addedCount > 0 && <p>{addedCount}</p>}
      </button>
    </div>
  );
};

export default Item;
