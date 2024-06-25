import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import UserHeader from './UserHeader';
import orderService from '../services/orderService';

const Orders = ({ user_id }) => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderService.getOrders(user_id);
        setOrders(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user_id]);

  const handleRemoveOrder = async (order_id) => {
    try {
      await orderService.deleteOrder(order_id);
      setOrders(orders.filter(order => order.order_id !== order_id));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleConfirmOrder = (order_id) => {
    navigate(`/shipping-payment/${order_id}`);
  };

  return (
    <>
    <UserHeader />
    <div>
      <table class="table table-borderless">
        <thead>
          <tr>
            <th scope="col">OrderID</th>
            <th scope="col">Total </th>
            <th scope="col">Status</th>
            <th scope="col">Confirmation</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            return(
              <tr key={order.order_id}>
              <th scope='row'>
                {order.order_id}
              </th>
                <td>Rp{order.total_price}</td>
                <td>{order.order_status}</td>
                <td>
                <Button onClick={() => handleConfirmOrder(order.order_id)}>Confirm Payment</Button>
                </td>
                <td>
                <Button type="primary" className='me-3' danger onClick={() => handleRemoveOrder(order.order_id)}>Remove</Button>
                </td>
            </tr>
            )
          })}
          
        </tbody>
      </table>
    </div>
    </>
  );
};

export default Orders;
