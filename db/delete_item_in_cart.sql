delete * from cart
where product_id = $1 and user_id = $2;
