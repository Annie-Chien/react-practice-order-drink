import React from 'react';

const Summary = ({ productList }) => {
  const totalAmount = productList
    .map((product) => product.qty * product.price)
    .reduce((prev, cur) => prev + cur, 0);
  return (
    <div className="card mt-3">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">品項</th>
              <th scope="col">冰塊</th>
              <th scope="col">甜度</th>
              <th scope="col">加料</th>
              <th scope="col">單價</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            {/* 更新表單內容 */}
            {productList.map((product, index) => {
              const {
                title,
                comment,
                iceType,
                sugarType,
                toppingsType,
                price,
                qty,
              } = product;
              return (
                <tr key={index}>
                  <th>
                    {title}
                    <br />
                    <small>{comment}</small>
                  </th>
                  <td>{iceType}</td>
                  <td>{sugarType}</td>
                  <td>{toppingsType.join(',')}</td>
                  <td>${price}</td>
                  <td>{qty}</td>
                  <td>{qty * price}元</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="text-end">共 NT$ {totalAmount}元</p>
        <button className="btn btn-secondary w-100">確認訂單</button>
      </div>
    </div>
  );
};

export default Summary;
