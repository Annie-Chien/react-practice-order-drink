import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import Form from './Form';
import Summary from './Summary';
import './App.css';

const App = () => {
  const initialData = {
    title: '',
    price: 0,
    qty: 0,
    iceType: '',
    sugarType: '',
    toppingsType: [],
    comment: '',
  };
  const [productList, setProductList] = useState([]);
  const [productData, setProductData] = useState(initialData);
  const [pickedProduct, setPickedProduct] = useState(true);
  // 接收來自Menu的資料（name , price)
  // const [product, setProduct] = useState({ title: '', price: 0 });
  const pickProduct = (product) => {
    setProductData((prev) => ({
      ...prev,
      title: product.name,
      price: product.price,
    }));
  };

  // 接收來自Form的資料
  const getFormData = (formInfo) => {
    setProductData((prev) => ({
      ...prev,
      qty: formInfo.qty,
      sugarType: formInfo.sugarType,
      iceType: formInfo.iceType,
      comment: formInfo.comment,
      toppingsType: formInfo.toppingsType,
    }));
  };

  //點餐（submit)
  const submitHandler = (e) => {
    e.preventDefault();
    if (!productData.title) {
      setPickedProduct(false);
      return;
    }
    setProductList((prev) => [...prev, productData]);
    //表單內容淨空
    e.target.reset();
    setProductData(initialData);
  };
  //取消
  const handleCancel = (e) => {
    e.target.form.reset();
    setProductData(initialData);
  };
  //控制提醒出現時間
  useEffect(() => {
    const timer = setTimeout(() => setPickedProduct('true'), 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [pickedProduct]);

  return (
    <div className="container">
      {!pickedProduct && (
        <div className="row">
          <div className="col-md-12 bg-danger text-center">
            哎呀～你忘記選擇飲料囉！
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-4">
          <h2 className="display-2 d-inline-block">1.</h2>
          <span className="fs-6 text-secondary">選飲料先！</span>
          <Menu pickProduct={pickProduct} />
        </div>
        <div className="col-md-8">
          <h2 className="display-2 d-inline-block">2.</h2>
          <span className="fs-6 text-secondary">客製化任你挑！</span>
          <Form
            {...productData}
            getFormData={getFormData}
            onSubmit={submitHandler}
            handleCancel={handleCancel}
          />
          <Summary productList={productList} />
        </div>
      </div>
    </div>
  );
};

export default App;
