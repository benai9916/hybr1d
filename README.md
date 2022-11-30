# hybr1d
### Instruction to run
- node index.js or nodemon index.jsx
- Server will be listening to port 5000

### End points
- Signup 
  Method: 'POST'
  End Point: /api/auth/signup (for both buyer and seller)
  Request Body
  ```
  {
	  "username": "",
	  "password": "",
	  "userType": "seller | buyer"
  }
  ```
- Login
  Method: 'POST'
  End Point: /api/auth/login (for both buyer and seller)
  Request Body
  ```
  {
	  "username": "",
	  "password": "",
  }
  ```
  
### Seller Route
Base url : `/api/seller`

- Create catalog
  Method: 'POST'
  End point : /create-catalog
  Request Body: 
```
{
	"name": "product name",
	"price": 122
}
```

- Get catalog list
  Method: 'GET'
  End point: /`:sellerId`/get-catalog
  
- Get Orders
  Method: 'GET'
  End Point: /orders
  
### Buyer Route

- Seller List
  Method: 'GET'
  End Point: /list-of-sellers
  
- Get Seller Catalog
   Methos: 'GET'
   End Point: /seller-catalog/`:sellerId`
   
- Place order
  Method: 'POST'
  End point: /create-order/`:sellerId`
  Request Body: 
 ```
 {
"data": [
    {
	"id": 1,
	"name": "tets",
	"price": 123333.33,
	"userId": 1
    }]
}
 ```
 
-  Get Placed Order
   Method: 'GET'
   End Point: /get-order/`:buyerId`
   
   
  
  
  
  
