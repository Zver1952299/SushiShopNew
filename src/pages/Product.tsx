import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Product: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://646ca3e17b42c06c3b2bb0e7.mockapi.io/items/${id}`).then(
          (data) => data.json(),
        );
        setProduct(res);
      } catch (error) {
        alert('Error fetch product');
        navigate('/');
      }
    };

    fetchProduct();
  }, [navigate, id]);

  if (!product) {
    return <div className="wrapper">'Loading...';</div>;
  }

  return (
    <div className="wrapper">
      <img src={product.imageUrl} alt="product" style={{ width: '200px', borderRadius: '20px' }} />
      <h2>{product.title}</h2>
      <p>{product.price}$</p>
      <Link to="/">Назад</Link>
    </div>
  );
};

export default Product;
