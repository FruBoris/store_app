### API ENDPOINTS 

 * ## User Registration
    ###  POST /auth/register
    <b> Description: </b> : Allows users to register by providing their name, email, and password.


* ## User Login
    ### POST /auth/login
    <b> Description: </b> : Allows users to log in by providing their email and password. It returns a JWT token upon successful authentication.

* ## Get All Products
    ### GET /products
    <b> Description: </b> Retrieves a list of all products. Requires authentication using a valid JWT token.

* ## Get Product by ID
    ### GET /products/:id
    <b> Description: </b> : Retrieves a specific product by its ID. Requires authentication using a valid JWT token.

* ## Create Product
    ### POST /products
    <b> Description: </b> : Allows users to create a new product. Requires authentication using a valid JWT token.

* ## Update Product
    ### PUT /products/:id
    <b> Description: </b> : Allows users to update an existing product by its ID. Requires authentication using a valid JWT token.

* ## Delete Product
    ### DELETE /products/:id
    <b> Description: </b> : Allows users to delete a product by its ID. Requires authentication using a valid JWT token.

* ## Get All Users
    ### GET /users
    <b> Description: </b> : Retrieves a list of all users. Requires authentication using a valid JWT token