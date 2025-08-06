# Vn Production App

### Laravel
1. git clone https://github.com/elvinafirmansyah/VnProductionApp.git
2. cd VnProductionApp
3. cd laravel
4. open terminal
5. composer i
6. cp .env.example .env
7. php artisan key:generate
8. run xampp > start apache and mysql 
9. click admin sql > create database sponsor_api
10. in .env
SANCTUM_STATEFUL_DOMAINS=http://localhost:3000/

DB_HOST=localhost
DB_DATABASE=sponsor_api
DB_USERNAME=root
DB_PASSWORD=
11. php artisan migrate --seed

### React
1. npm i
2. npm start
3. User & Password Info is in DatabseSeeder.php laravel
4. Try login 

