import { memo, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { filterSelector, setSortType, SortPropertyEnum } from '../../redux/slices/filterSlice';

import style from './Sort.module.scss';

type SortItem = {
  name: string;
  sortProp: SortPropertyEnum;
};

export const list: SortItem[] = [
  { name: 'popular(desc)', sortProp: SortPropertyEnum.RATING_DESC },
  { name: 'popular(asc)', sortProp: SortPropertyEnum.RATING_ASC },
  { name: 'price(desc)', sortProp: SortPropertyEnum.PRICE_DESC },
  { name: 'price(asc)', sortProp: SortPropertyEnum.PRICE_ASC },
  { name: 'alphabet(desc)', sortProp: SortPropertyEnum.TITLE_DESC },
  { name: 'alphabet(asc)', sortProp: SortPropertyEnum.TITLE_ASC },
];

const SortPopup = memo(() => {
  const [open, setOpen] = useState(false);
  const { sort } = useSelector(filterSelector);
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);

  const changeSort = (obj: any) => {
    dispatch(setSortType(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handlerClick = (e: MouseEvent) => {
      if (e.target && !sortRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handlerClick);

    return () => document.removeEventListener('click', handlerClick);
  }, []);

  return (
    <div className={style.sort} ref={sortRef}>
      <div className={style.label}>
        Sort by: <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className={style.popup}>
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                onClick={() => changeSort(obj)}
                className={obj.sortProp === sort.sortProp ? style.active : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
