### USER CRUD OPERATION

1. you can get all user and filters by [searchTerm] query to partial match and also filter by user address, phoneNumber this will match exactly with database and show you exact match results.
2. you can get, update, delete single user by id

#### User Endpoints

1. create user (api/v1/auth/signup (POST))
2. get all users (api/v1/users (GET))
3. get single user (api/v1/users/:id) (Single GET)
4. update user (api/v1/users/:id) (PATCH)
5. delete user (api/v1/users/:id) (DELETE)

### COW CRUD OPERATION

1. you can get all cows and filters by [searchTerm] query to partial match and also filter by cow name, location, breed, category these filter will match exactly database and show exact match result;
2. you can get, update delete single cow by id;

#### Cow Endpoints

1. create cow (api/v1/cows (POST))
2. get all cows (api/v1/cows (GET))
3. get single cow (api/v1/cows/:id) (Single GET)
4. update cow (api/v1/cows/:id) (PATCH)
5. delete cow (api/v1/cows/:id) (DELETE)

### Pagination and Filtering routes of Cows

1. api/v1/cows?page=1&limit=10
2. api/v1/cows?sortBy=price&sortOrder=asc
3. api/v1/cows?minPrice=20000&maxPrice=70000
4. api/v1/cows?location=Chattogram
5. api/v1/cows?searchTerm=Comilla

#### Order Endpoints

1. create order (api/v1/orders) (POST)
2. get all orders (api/v1/orders) (GET)
