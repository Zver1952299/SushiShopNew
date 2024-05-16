import React, { memo } from 'react';

import style from './Categories.module.scss';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = memo(({ value, onClickCategory }) => {
  const categoriesNames = ['All', 'Sets', 'Rols', 'Hot', 'Sushis'];

  return (
    <div className={style.categories}>
      <ul className={style.list}>
        {categoriesNames.map((categoryName, i) => (
          <li
            key={i}
            className={value === i ? style.item + ' ' + style.active : style.item}
            onClick={() => onClickCategory(i)}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
