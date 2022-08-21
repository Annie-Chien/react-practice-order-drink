import React, { useState, useEffect } from 'react';
import { formData } from './Data';
const Form = ({ title, getFormData, onSubmit, handleCancel }) => {
  // 取得表單資料（數量、冰塊、甜度、[配料]、備註）
  const [formInfo, setFormInfo] = useState({
    qty: 0,
    iceType: '',
    sugarType: '',
    toppingsType: [],
    comment: '',
  });

  const [pickedToppings, setPickedToppings] = useState([]);
  const pickedToppingsHandler = (e) => {
    if (e.target.checked) {
      const newTopping = e.target.value;
      setPickedToppings((prev) => [...prev, newTopping]);
    } else {
      const existingIndex = pickedToppings.findIndex(
        (t) => t === e.target.value
      );
      const updatedToppings = [...pickedToppings];
      updatedToppings.splice(existingIndex, 1);
      setPickedToppings(updatedToppings);
    }
  };

  useEffect(() => {
    setFormInfo((preValues) => ({
      ...preValues,
      toppingsType: pickedToppings,
    }));
  }, [pickedToppings]);

  // 全部儲存在 formInfo state，最後由 submitHandler 回傳到App componenet
  const changeHandler = (e) => {
    const type = e.target.name;
    const value = e.target.value;
    setFormInfo((preValues) => ({
      ...preValues,
      [type]: value,
    }));
  };
  useEffect(() => {
    getFormData(formInfo);
  }, [formInfo]);
  return (
    <div className="card mt-2">
      <form className=" card-body mb-2" onSubmit={(e) => onSubmit(e)}>
        <h5 className="card-title text-primary">{title}</h5>
        <div className="mb-3">
          <label className="form-label" htmlFor="qty">
            數量
          </label>
          <input
            className="form-control"
            type="number"
            id="qty"
            placeholder="數量"
            min="1"
            onChange={changeHandler}
            name="qty"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">冰塊*</label>
          <div className="form-check">
            {formData.iceType.map((ice, index) => {
              return (
                <div key={index} className="form-check form-check-inline">
                  <input
                    onChange={changeHandler}
                    name="iceType"
                    className="form-check-input"
                    type="radio"
                    id={ice}
                    value={ice}
                    required
                  />
                  <label className="form-check-label" htmlFor={ice}>
                    {ice}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="mb-3">
            <label className="form-label d-block">甜度*</label>
            <div className="form-check">
              {formData.sugarType.map((sugar, index) => {
                return (
                  <div key={index} className="form-check form-check-inline">
                    <input
                      onChange={changeHandler}
                      className="form-check-input"
                      type="radio"
                      id={sugar}
                      name="sugarType"
                      value={sugar}
                      required
                    />
                    <label className="form-check-label" htmlFor={sugar}>
                      {sugar}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label d-block"> 加料</label>
            <div className="form-check">
              {formData.toppingsType.map((topping, index) => {
                return (
                  <div key={index} className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={topping}
                      name="toppings"
                      value={topping}
                      onChange={pickedToppingsHandler}
                    />
                    <label className="form-check-label" htmlFor={topping}>
                      {topping}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="comment">
              備註：
            </label>
            <textarea
              type="text"
              className="form-control"
              id="comment"
              name="comment"
              onChange={changeHandler}
            ></textarea>
          </div>
          <div className="d-flex mb-3 gap-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-danger w-100"
              onClick={(e) => handleCancel(e)}
            >
              取消
            </button>
            <button
              type="submit"
              className="btn btn-sm btn-outline-primary w-100"
            >
              點餐
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
