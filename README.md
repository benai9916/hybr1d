# hybr1d
### Instruction to run
- node index.js or nodemon index.jsx
- Server will be listening to port 5000

### End points
- Signup 
  Method: 'POST'
  /api/auth/signup (for both buyer and seller)
  Body
  ```
  {
	  "username": "",
	  "password": "",
	  "userType": "seller | buyer"
  }
  ```
- Login
  Method: 'POST'
  /api/auth/login (for both buyer and seller)
  Body
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
  End point: /:sellerId/get-catalog
  
- Get Orders
  Method: 'GET'
  End Point: /orders
  
### Buyer Route

  
  
  
  
