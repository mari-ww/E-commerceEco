import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQty,
  deleteProduct,
} from "../app/features/cart/cartSlice";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartList.reduce(
    (price, item) => price + item.qty * item.price,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const navigate = useNavigate();
  const handlePurchase = () => {
    const fakeOrderId = `ORDER-${Math.floor(Math.random() * 100000)}`;
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
  
    const newOrder = {
      id: fakeOrderId,
      products: cartList.map((item) => ({
        ...item,
        status: "Pendente" // você pode atualizar isso depois conforme o andamento
      })),
      total: totalPrice,
    };
  
    localStorage.setItem("orders", JSON.stringify([...savedOrders, newOrder]));
  
    alert("Compra feita com sucesso!");
    navigate("/pedido-status", { state: { orderId: fakeOrderId } });
  };

  return (
    <section className="cart-items">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {cartList.length === 0 && (
              <h1 className="no-items product">No Items are add in Cart</h1>
            )}
            {cartList.map((item) => {
              const productQty = item.price * item.qty;
              return (
                <div className="cart-list" key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt="" />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span> ${productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className="cartControl">
                          <button
                            className="incCart"
                            onClick={() =>
                              dispatch(addToCart({ product: item, num: 1 }))
                            }
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <button
                            className="desCart"
                            onClick={() => dispatch(decreaseQty(item))}
                          >
                            <i className="fa-solid fa-minus"></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button
                      className="delete"
                      onClick={() => dispatch(deleteProduct(item))}
                    >
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              );
            })}
          </Col>
          <Col md={4}>
            <div className="cart-total">
              <h2>Compras</h2>
              <div className="d_flex">
                <h4>Preço Total :</h4>
                <h3>R${totalPrice}.00</h3>
              </div>
              <button
                className="btn btn-primary w-100 mt-3"
                onClick={handlePurchase}
                disabled={cartList.length === 0}
              >
                Comprar Produto
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;
