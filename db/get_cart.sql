select * from users
join cart
	on users.id = cart.user_id
join products
	on products.product_id = cart.product_id
where users.id = $1;
