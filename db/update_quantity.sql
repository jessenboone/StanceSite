update cart
set quantity = $2
where product_id = $1 and customer_id = $3;
