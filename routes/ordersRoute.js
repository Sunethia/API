const express = require("express");
const router = express.Router();
const con = require("../lib/db_connection");

router.get("/", (req, res) => {
  try {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.get("/:id", (req, res) => {
  try {
    con.query(
      `SELECT * FROM orders WHERE order_id='${req.params.id}'`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.post("/", (req, res) => {
  const {
    user_id,
    amount,
    shipping_address,
    order_email,
    order_date,
    order_status,
  } = req.body;
  try {
    con.query(
      `INSERT INTO orders (user_id, amount, shipping_address,order_email, order_date, order_status) VALUES("${user_id}","${amount}","${shipping_address}","${order_email}","${order_date}","${order_status}")`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
  }
});

//put
router.put("/:id", (req, res) => {
  const {user_id, amount, shipping_address, order_email, order_date, order_status } =
    req.body;
  try {
    con.query(
      `UPDATE orders
          SET amount = "${amount}",shipping_address = "${shipping_address}",order_email= "${order_email},order_date= "${order_date},order_status= "${order_status}"
          WHERE order_id=${req.params.id}`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});
//delete
router.delete("/:id", (req, res) => {
  try {
    con.query(
      `DELETE  FROM orders WHERE order_id='${req.params.id}'`,
      (err, result) => {
        if (err) throw err;
        res.send(result);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
