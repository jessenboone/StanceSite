update cart
set quantity = $2
where product_id = $1 and user_id = $3;
