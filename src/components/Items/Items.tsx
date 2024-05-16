import React from 'react';

import styles from './Items.module.scss';

import Item from '../Item/Item';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type ItemsProps = {
  sushis: any;
  status: string;
};

const Items: React.FC<ItemsProps> = ({ sushis, status }) => {
  const sushiItem = sushis;
  return (
    <div>
      {status !== 'error' ? (
        <div className={styles.items}>
          {status === 'loading'
            ? [...new Array(6)].map((_, i) => (
                <Skeleton
                  width={250}
                  height={294}
                  baseColor="#ddb869"
                  highlightColor="#dd8f2e"
                  key={i}
                />
              ))
            : sushiItem.map((obj: any) => <Item {...obj} key={obj.id} />)}
        </div>
      ) : (
        <div>Sushi not found :(</div>
      )}
    </div>
  );
};

export default Items;
