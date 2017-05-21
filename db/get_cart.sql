select * from users
join cart
	on users.user_id = cart.customer_id
join products
	on products.product_id = cart.product_id
where users.user_id = $1;
