// Auto-generated Retail Database Seeds from retail.db
if (!window.DB_SEEDS) window.DB_SEEDS = {};
window.DB_SEEDS['retail'] = {
  name: 'retail',
  tables: [
    {
      name: "departments",
      createSQL: "CREATE TABLE departments (\n        department_id INTEGER PRIMARY KEY,\n        department_name TEXT NOT NULL,\n        budget REAL NOT NULL,\n        manager_id INTEGER\n    )",
      seedSQL: "INSERT INTO departments VALUES\n        (1, 'Executive', 10000000.0, 1),\n        (10, 'Engineering', 5000000.0, 2),\n        (20, 'Data Science', 3500000.0, 3),\n        (30, 'Marketing', 1500000.0, 6),\n        (40, 'Sales', 2000000.0, 7),\n        (50, 'Human Resources', 800000.0, 8),\n        (60, 'Operations & Logistics', 1200000.0, NULL);",
      columns: [
        { name: "department_id", type: "INTEGER", pk: true },
        { name: "department_name", type: "TEXT", pk: false },
        { name: "budget", type: "REAL", pk: false },
        { name: "manager_id", type: "INTEGER", pk: false },
      ]
    },
    {
      name: "employees",
      createSQL: "CREATE TABLE employees (\n        employee_id INTEGER PRIMARY KEY,\n        first_name TEXT NOT NULL,\n        last_name TEXT NOT NULL,\n        salary REAL NOT NULL,\n        hire_date DATE NOT NULL,\n        department_id INTEGER,\n        job_title TEXT NOT NULL,\n        email TEXT NOT NULL,\n        is_active INTEGER NOT NULL,\n        manager_id INTEGER,\n        commission REAL,\n        FOREIGN KEY (department_id) REFERENCES departments(department_id)\n    )",
      seedSQL: "INSERT INTO employees VALUES\n        (1, 'Rajesh', 'Sen', 160000.0, '2019-01-15', 1, 'Director', 'rajesh.sen@manodemy.com', 1, NULL, NULL),\n        (2, 'Amit', 'Kumar', 95000.0, '2020-03-10', 10, 'Senior Engineering Manager', 'amit.kumar@manodemy.com', 1, 1, NULL),\n        (3, 'Priya', 'Nair', 120000.0, '2020-06-01', 20, 'Lead Data Scientist', 'priya.nair@manodemy.com', 1, 1, 15000.0),\n        (4, 'Sneha', 'Patel', 80000.0, '2021-02-15', 20, 'Senior Data Analyst', 'sneha.patel@manodemy.com', 1, 3, 8000.0),\n        (5, 'Rahul', 'Sharma', 75000.0, '2021-08-20', 20, 'Data Analyst', 'rahul.sharma@manodemy.com', 1, 3, 5000.0),\n        (6, 'Vikram', 'Malhotra', 70000.0, '2021-11-05', 30, 'Senior Marketing Manager', 'vikram.malhotra@manodemy.com', 1, 1, 12000.0),\n        (7, 'Ananya', 'Gupta', 65000.0, '2022-01-10', 40, 'Sales Representative', 'ananya.gupta@manodemy.com', 1, 2, 20000.0),\n        (8, 'Karan', 'Johar', 55000.0, '2022-05-15', 50, 'HR Specialist', 'karan.johar@manodemy.com', 1, NULL, NULL),\n        (9, 'Siddharth', 'Roy', 60000.0, '2023-02-10', 10, 'Software Engineer', 'siddharth.roy@manodemy.com', 0, 2, NULL),\n        (10, 'Riya', 'Sen', 45000.0, '2023-05-20', 30, 'Marketing Executive', 'riya.sen@manodemy.com', 1, 6, 2000.0),\n        (11, 'Devendra', 'Singh', 85000.0, '2022-10-01', 20, 'Data Scientist', 'devendra.singh@manodemy.com', 1, 3, NULL),\n        (12, 'Neha', 'Sharma', 50000.0, '2023-01-15', 40, 'Sales Executive', 'neha.sharma@manodemy.com', 1, 7, 15000.0),\n        (13, 'Aditi', 'Rao', 42000.0, '2023-04-01', 40, 'Sales Associate', 'aditi.rao@manodemy.com', 1, 7, 8000.0),\n        (14, 'Rohit', 'Verma', 88000.0, '2020-11-15', 10, 'Senior Software Engineer', 'rohit.verma@manodemy.com', 1, 2, NULL),\n        (15, 'Pooja', 'Patel', 48000.0, '2021-06-10', 50, 'HR Coordinator', 'pooja.patel@manodemy.com', 1, 8, NULL);",
      columns: [
        { name: "employee_id", type: "INTEGER", pk: true },
        { name: "first_name", type: "TEXT", pk: false },
        { name: "last_name", type: "TEXT", pk: false },
        { name: "salary", type: "REAL", pk: false },
        { name: "hire_date", type: "DATE", pk: false },
        { name: "department_id", type: "INTEGER", pk: false },
        { name: "job_title", type: "TEXT", pk: false },
        { name: "email", type: "TEXT", pk: false },
        { name: "is_active", type: "INTEGER", pk: false },
        { name: "manager_id", type: "INTEGER", pk: false },
        { name: "commission", type: "REAL", pk: false },
      ]
    },
    {
      name: "customers",
      createSQL: "CREATE TABLE customers (\n        customer_id INTEGER PRIMARY KEY,\n        first_name TEXT NOT NULL,\n        last_name TEXT NOT NULL,\n        email TEXT NOT NULL,\n        signup_date DATE NOT NULL,\n        region TEXT NOT NULL\n    )",
      seedSQL: "INSERT INTO customers VALUES\n        (1, 'Amit', 'Sharma', 'amit.sharma@example.com', '2022-01-15', 'North'),\n        (2, 'Priya', 'Nair', 'priya.nair@example.com', '2022-03-22', 'South'),\n        (3, 'Karthik', 'Raja', 'karthik.raja@example.com', '2022-06-18', 'South'),\n        (4, 'Rahul', 'Sharma', 'rahul.sharma@example.com', '2022-08-05', 'North'),\n        (5, 'Sneha', 'Patel', 'sneha.patel@example.com', '2022-10-12', 'West'),\n        (6, 'Anoop', 'Mishra', 'anoop.mishra@example.com', '2023-01-20', 'East'),\n        (7, 'Gaurav', 'Joshi', 'gaurav.joshi@example.com', '2023-03-15', 'North'),\n        (8, 'Ananya', 'Gupta', 'ananya.gupta@example.com', '2023-04-10', 'East'),\n        (9, 'Deepak', 'Verma', 'deepak.verma@example.com', '2023-05-18', 'West');",
      columns: [
        { name: "customer_id", type: "INTEGER", pk: true },
        { name: "first_name", type: "TEXT", pk: false },
        { name: "last_name", type: "TEXT", pk: false },
        { name: "email", type: "TEXT", pk: false },
        { name: "signup_date", type: "DATE", pk: false },
        { name: "region", type: "TEXT", pk: false },
      ]
    },
    {
      name: "orders",
      createSQL: "CREATE TABLE orders (\n        order_id INTEGER PRIMARY KEY,\n        customer_id INTEGER,\n        order_date DATE NOT NULL,\n        total_amount REAL NOT NULL,\n        status TEXT NOT NULL,\n        shipped_date DATE,\n        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)\n    )",
      seedSQL: "INSERT INTO orders VALUES\n        (1001, 1, '2024-05-15', 52000.0, 'Shipped', '2024-05-20'),\n        (1002, 2, '2024-08-04', 1600.0, 'Shipped', '2024-08-08'),\n        (1003, 3, '2024-10-05', 120000.0, 'Shipped', '2024-10-15'),\n        (1004, 4, '2024-10-06', 4500.0, 'Shipped', '2024-10-09'),\n        (1005, 5, '2024-11-15', 15000.0, 'Shipped', '2024-11-20'),\n        (1006, 1, '2024-12-22', 121000.0, 'Shipped', '2024-12-23'),\n        (1007, 2, '2024-12-29', 4000.0, 'Processing', NULL),\n        (1008, 6, '2024-02-14', 2500.0, 'Shipped', '2024-02-16'),\n        (1009, 1, '2026-06-19', 3000.0, 'Shipped', '2026-06-21'),\n        (1010, 3, '2026-06-12', 15000.0, 'Shipped', '2026-06-14'),\n        (1011, 5, '2026-05-10', 7500.0, 'Shipped', '2026-05-15'),\n        (1012, 7, '2026-04-10', 900.0, 'Shipped', '2026-04-11'),\n        (1013, 9, '2026-02-24', 4000.0, 'Shipped', '2026-02-26');",
      columns: [
        { name: "order_id", type: "INTEGER", pk: true },
        { name: "customer_id", type: "INTEGER", pk: false },
        { name: "order_date", type: "DATE", pk: false },
        { name: "total_amount", type: "REAL", pk: false },
        { name: "status", type: "TEXT", pk: false },
        { name: "shipped_date", type: "DATE", pk: false },
      ]
    },
    {
      name: "products",
      createSQL: "CREATE TABLE products (\n        product_id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL,\n        unit_price REAL NOT NULL,\n        stock_qty INTEGER NOT NULL,\n        category_id INTEGER,\n        cost_price REAL NOT NULL\n    )",
      seedSQL: "INSERT INTO products VALUES\n        (101, 'Python Course Book', 1500.0, 150, 5, 800.0),\n        (102, 'Data Science Bundle', 4500.0, 80, 5, 2500.0),\n        (103, 'Mechanical Keyboard', 6000.0, 40, 3, 3500.0),\n        (104, 'Noise Cancelling Headphones', 12000.0, 30, 3, 8000.0),\n        (105, 'Ergonomic Desk Chair', 15000.0, 15, 6, 10000.0),\n        (106, 'LED Monitor 24\"', 11000.0, 25, 2, 7000.0),\n        (107, 'Coffee Mug', 500.0, 200, 6, 200.0),\n        (108, 'Notebook Pack of 3', 300.0, 300, 5, 120.0),\n        (109, 'Wireless Mouse', 1800.0, 100, 3, 1000.0),\n        (110, 'Standing Desk Converter', 18000.0, 10, 6, 12000.0),\n        (201, 'MacBook Pro', 120000.0, 10, 2, 90000.0),\n        (202, 'iPad Air', 50000.0, 15, 2, 38000.0),\n        (203, 'Wireless Mouse Extra', 2000.0, 50, 3, 1200.0),\n        (204, 'USB-C Cable', 1000.0, 100, 3, 400.0),\n        (205, 'SQL Queries in 10 Minutes', 800.0, 80, 5, 400.0),\n        (206, 'Python Data Science Handbook', 2500.0, 40, 5, 1200.0),\n        (207, 'Ergonomic Chair Office', 15000.0, 12, 6, 10000.0);",
      columns: [
        { name: "product_id", type: "INTEGER", pk: true },
        { name: "name", type: "TEXT", pk: false },
        { name: "unit_price", type: "REAL", pk: false },
        { name: "stock_qty", type: "INTEGER", pk: false },
        { name: "category_id", type: "INTEGER", pk: false },
        { name: "cost_price", type: "REAL", pk: false },
      ]
    },
    {
      name: "order_items",
      createSQL: "CREATE TABLE order_items (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        order_id INTEGER,\n        product_id INTEGER,\n        qty INTEGER NOT NULL,\n        unit_price REAL NOT NULL,\n        FOREIGN KEY (order_id) REFERENCES orders(order_id),\n        FOREIGN KEY (product_id) REFERENCES products(product_id)\n    )",
      seedSQL: "INSERT INTO order_items VALUES\n        (1, 1001, 202, 1, 50000.0),\n        (2, 1001, 203, 1, 2000.0),\n        (3, 1002, 205, 2, 800.0),\n        (4, 1003, 201, 1, 120000.0),\n        (5, 1004, 206, 1, 2500.0),\n        (6, 1004, 204, 2, 1000.0),\n        (7, 1005, 207, 1, 15000.0),\n        (8, 1006, 201, 1, 120000.0),\n        (9, 1006, 204, 1, 1000.0),\n        (10, 1007, 203, 2, 2000.0),\n        (11, 1008, 206, 1, 2500.0);",
      columns: [
        { name: "id", type: "INTEGER", pk: true },
        { name: "order_id", type: "INTEGER", pk: false },
        { name: "product_id", type: "INTEGER", pk: false },
        { name: "qty", type: "INTEGER", pk: false },
        { name: "unit_price", type: "REAL", pk: false },
      ]
    },
    {
      name: "categories",
      createSQL: "CREATE TABLE categories (\n        id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL,\n        parent_id INTEGER\n    )",
      seedSQL: "INSERT INTO categories VALUES\n        (1, 'Electronics', NULL),\n        (2, 'Computers', 1),\n        (3, 'Accessories', 1),\n        (4, 'Books', NULL),\n        (5, 'Tech Books', 4),\n        (6, 'Home & Living', NULL);",
      columns: [
        { name: "id", type: "INTEGER", pk: true },
        { name: "name", type: "TEXT", pk: false },
        { name: "parent_id", type: "INTEGER", pk: false },
      ]
    },
    {
      name: "sales",
      createSQL: "CREATE TABLE sales (\n        id INTEGER PRIMARY KEY AUTOINCREMENT,\n        product_id INTEGER,\n        revenue REAL,\n        units_sold INTEGER,\n        amount REAL,\n        sale_date DATE,\n        customer_id INTEGER,\n        customer_signup_month TEXT,\n        order_id INTEGER\n    )",
      seedSQL: "INSERT INTO sales VALUES\n        (1, 101, 15000.0, 10, 15000.0, '2024-05-15', 1, '2022-01', 1001),\n        (2, 102, 45000.0, 10, 45000.0, '2024-08-04', 2, '2022-03', 1002),\n        (3, 103, 60000.0, 10, 60000.0, '2024-10-05', 3, '2022-06', 1003),\n        (4, 104, 120000.0, 10, 120000.0, '2024-10-06', 4, '2022-08', 1004);",
      columns: [
        { name: "id", type: "INTEGER", pk: true },
        { name: "product_id", type: "INTEGER", pk: false },
        { name: "revenue", type: "REAL", pk: false },
        { name: "units_sold", type: "INTEGER", pk: false },
        { name: "amount", type: "REAL", pk: false },
        { name: "sale_date", type: "DATE", pk: false },
        { name: "customer_id", type: "INTEGER", pk: false },
        { name: "customer_signup_month", type: "TEXT", pk: false },
        { name: "order_id", type: "INTEGER", pk: false },
      ]
    },
    {
      name: "returns",
      createSQL: "CREATE TABLE returns (\n        order_id INTEGER PRIMARY KEY,\n        return_date DATE NOT NULL,\n        reason TEXT NOT NULL,\n        FOREIGN KEY (order_id) REFERENCES orders(order_id)\n    )",
      seedSQL: "INSERT INTO returns VALUES\n        (1001, '2024-05-22', 'Defective'),\n        (1005, '2024-11-25', 'Changed Mind');",
      columns: [
        { name: "order_id", type: "INTEGER", pk: true },
        { name: "return_date", type: "DATE", pk: false },
        { name: "reason", type: "TEXT", pk: false },
      ]
    },
    {
      name: "sales_reps",
      createSQL: "CREATE TABLE sales_reps (\n        id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL,\n        region_id INTEGER\n    )",
      seedSQL: "INSERT INTO sales_reps VALUES\n        (1, 'Rohan Mehta', 1),\n        (2, 'Aditi Rao', 2),\n        (3, 'Siddharth Sen', 3),\n        (4, 'Neha Sharma', 4);",
      columns: [
        { name: "id", type: "INTEGER", pk: true },
        { name: "name", type: "TEXT", pk: false },
        { name: "region_id", type: "INTEGER", pk: false },
      ]
    },
    {
      name: "regions",
      createSQL: "CREATE TABLE regions (\n        id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL,\n        zone TEXT NOT NULL,\n        manager TEXT NOT NULL\n    )",
      seedSQL: "INSERT INTO regions VALUES\n        (1, 'North', 'Zone-A', 'Rajesh Sharma'),\n        (2, 'South', 'Zone-B', 'Priya Nair'),\n        (3, 'East', 'Zone-C', 'Amit Das'),\n        (4, 'West', 'Zone-D', 'Sneha Patel');",
      columns: [
        { name: "id", type: "INTEGER", pk: true },
        { name: "name", type: "TEXT", pk: false },
        { name: "zone", type: "TEXT", pk: false },
        { name: "manager", type: "TEXT", pk: false },
      ]
    },
    {
      name: "active_employees",
      createSQL: "CREATE TABLE active_employees (\n        employee_id INTEGER PRIMARY KEY,\n        first_name TEXT NOT NULL,\n        category TEXT\n    )",
      seedSQL: "INSERT INTO active_employees VALUES\n        (1, 'Rajesh', 'Active'),\n        (2, 'Amit', 'Active'),\n        (3, 'Priya', 'Active'),\n        (4, 'Sneha', 'Active'),\n        (5, 'Rahul', 'Active'),\n        (6, 'Vikram', 'Active'),\n        (7, 'Ananya', 'Active'),\n        (8, 'Karan', 'Active'),\n        (10, 'Riya', 'Active'),\n        (11, 'Devendra', 'Active'),\n        (12, 'Neha', 'Active'),\n        (13, 'Aditi', 'Active'),\n        (14, 'Rohit', 'Active'),\n        (15, 'Pooja', 'Active');",
      columns: [
        { name: "employee_id", type: "INTEGER", pk: true },
        { name: "first_name", type: "TEXT", pk: false },
        { name: "category", type: "TEXT", pk: false },
      ]
    },
    {
      name: "archived_employees",
      createSQL: "CREATE TABLE archived_employees (\n        employee_id INTEGER PRIMARY KEY,\n        first_name TEXT NOT NULL,\n        category TEXT\n    )",
      seedSQL: "INSERT INTO archived_employees VALUES\n        (9, 'Siddharth', 'Archived'),\n        (99, 'Kunal', 'Archived');",
      columns: [
        { name: "employee_id", type: "INTEGER", pk: true },
        { name: "first_name", type: "TEXT", pk: false },
        { name: "category", type: "TEXT", pk: false },
      ]
    },
    {
      name: "source_employees",
      createSQL: "CREATE TABLE source_employees (\n        employee_id INTEGER PRIMARY KEY,\n        first_name TEXT NOT NULL\n    )",
      seedSQL: "INSERT INTO source_employees VALUES\n        (1, 'Rajesh'),\n        (2, 'Amit'),\n        (3, 'Priya'),\n        (4, 'Sneha'),\n        (5, 'Rahul'),\n        (9, 'Siddharth');",
      columns: [
        { name: "employee_id", type: "INTEGER", pk: true },
        { name: "first_name", type: "TEXT", pk: false },
      ]
    },
    {
      name: "target_employees",
      createSQL: "CREATE TABLE target_employees (\n        employee_id INTEGER PRIMARY KEY,\n        first_name TEXT NOT NULL\n    )",
      seedSQL: "INSERT INTO target_employees VALUES\n        (1, 'Rajesh'),\n        (2, 'Amit'),\n        (3, 'Priya'),\n        (4, 'Sneha'),\n        (5, 'Rahul'),\n        (10, 'Riya');",
      columns: [
        { name: "employee_id", type: "INTEGER", pk: true },
        { name: "first_name", type: "TEXT", pk: false },
      ]
    },
    {
      name: "orders_2023",
      createSQL: "CREATE TABLE orders_2023 (\n        order_id INTEGER PRIMARY KEY,\n        customer_id INTEGER,\n        amount REAL NOT NULL\n    )",
      seedSQL: "INSERT INTO orders_2023 VALUES\n        (101, 1, 15000.0),\n        (102, 2, 25000.0),\n        (103, 3, 30000.0),\n        (104, 4, 12000.0);",
      columns: [
        { name: "order_id", type: "INTEGER", pk: true },
        { name: "customer_id", type: "INTEGER", pk: false },
        { name: "amount", type: "REAL", pk: false },
      ]
    },
    {
      name: "orders_2024",
      createSQL: "CREATE TABLE orders_2024 (\n        order_id INTEGER PRIMARY KEY,\n        customer_id INTEGER,\n        amount REAL NOT NULL\n    )",
      seedSQL: "INSERT INTO orders_2024 VALUES\n        (201, 1, 18000.0),\n        (202, 3, 35000.0),\n        (203, 5, 22000.0),\n        (204, 7, 14000.0);",
      columns: [
        { name: "order_id", type: "INTEGER", pk: true },
        { name: "customer_id", type: "INTEGER", pk: false },
        { name: "amount", type: "REAL", pk: false },
      ]
    },
    {
      name: "signups_2023",
      createSQL: "CREATE TABLE signups_2023 (\n        year INTEGER,\n        signups INTEGER\n    )",
      seedSQL: "INSERT INTO signups_2023 VALUES\n        (2023, 150);",
      columns: [
        { name: "year", type: "INTEGER", pk: false },
        { name: "signups", type: "INTEGER", pk: false },
      ]
    },
    {
      name: "signups_2024",
      createSQL: "CREATE TABLE signups_2024 (\n        year INTEGER,\n        signups INTEGER\n    )",
      seedSQL: "INSERT INTO signups_2024 VALUES\n        (2024, 220);",
      columns: [
        { name: "year", type: "INTEGER", pk: false },
        { name: "signups", type: "INTEGER", pk: false },
      ]
    },
    {
      name: "north_region_sales",
      createSQL: "CREATE TABLE north_region_sales (\n        region TEXT,\n        product_id INTEGER,\n        sales REAL\n    )",
      seedSQL: "INSERT INTO north_region_sales VALUES\n        ('North', 101, 45000.0),\n        ('North', 102, 90000.0);",
      columns: [
        { name: "region", type: "TEXT", pk: false },
        { name: "product_id", type: "INTEGER", pk: false },
        { name: "sales", type: "REAL", pk: false },
      ]
    },
    {
      name: "south_region_sales",
      createSQL: "CREATE TABLE south_region_sales (\n        region TEXT,\n        product_id INTEGER,\n        sales REAL\n    )",
      seedSQL: "INSERT INTO south_region_sales VALUES\n        ('South', 101, 30000.0),\n        ('South', 103, 60000.0);",
      columns: [
        { name: "region", type: "TEXT", pk: false },
        { name: "product_id", type: "INTEGER", pk: false },
        { name: "sales", type: "REAL", pk: false },
      ]
    },
    {
      name: "contractors",
      createSQL: "CREATE TABLE contractors (\n        salary REAL\n    )",
      seedSQL: "INSERT INTO contractors VALUES\n        (50000.0),\n        (65000.0),\n        (NULL);",
      columns: [
        { name: "salary", type: "REAL", pk: false },
      ]
    },
    {
      name: "raw_customers",
      createSQL: "CREATE TABLE raw_customers (\n        id INTEGER PRIMARY KEY,\n        name TEXT,\n        email TEXT,\n        phone TEXT,\n        signup_date DATE\n    )",
      seedSQL: "INSERT INTO raw_customers VALUES\n        (1, '  amit SHARMA ', 'amit@gmail.com', ' 9876543210  ', '2022-01-15'),\n        (2, 'priya Nair  ', 'priya@yahoo.com', '9876543211', '2022-03-22'),\n        (3, '  Karthik Raja', 'karthik@outlook.com', '  9876543212 ', '2022-06-18');",
      columns: [
        { name: "id", type: "INTEGER", pk: true },
        { name: "name", type: "TEXT", pk: false },
        { name: "email", type: "TEXT", pk: false },
        { name: "phone", type: "TEXT", pk: false },
        { name: "signup_date", type: "DATE", pk: false },
      ]
    },
    {
      name: "salaries",
      createSQL: "CREATE TABLE salaries (\n        emp_id INTEGER,\n        amount REAL NOT NULL,\n        effective_date DATE NOT NULL,\n        PRIMARY KEY (emp_id, effective_date),\n        FOREIGN KEY (emp_id) REFERENCES employees(employee_id)\n    )",
      seedSQL: "INSERT INTO salaries VALUES\n        (1, 150000.0, '2019-01-15'),\n        (1, 160000.0, '2021-01-15'),\n        (2, 90000.0, '2020-03-10'),\n        (2, 95000.0, '2022-03-10'),\n        (3, 110000.0, '2020-06-01'),\n        (3, 120000.0, '2022-06-01');",
      columns: [
        { name: "emp_id", type: "INTEGER", pk: true },
        { name: "amount", type: "REAL", pk: false },
        { name: "effective_date", type: "DATE", pk: true },
      ]
    },
    {
      name: "projects",
      createSQL: "CREATE TABLE projects (\n        id INTEGER PRIMARY KEY,\n        name TEXT NOT NULL,\n        status TEXT NOT NULL,\n        deadline DATE NOT NULL\n    )",
      seedSQL: "INSERT INTO projects VALUES\n        (101, 'Alpha Analytics', 'In Progress', '2025-12-31'),\n        (102, 'Beta Cloud migration', 'Completed', '2024-06-30'),\n        (103, 'Gamma Brand Refresh', 'In Progress', '2026-03-15');",
      columns: [
        { name: "id", type: "INTEGER", pk: true },
        { name: "name", type: "TEXT", pk: false },
        { name: "status", type: "TEXT", pk: false },
        { name: "deadline", type: "DATE", pk: false },
      ]
    },
    {
      name: "emp_projects",
      createSQL: "CREATE TABLE emp_projects (\n        emp_id INTEGER,\n        project_id INTEGER,\n        role TEXT NOT NULL,\n        PRIMARY KEY (emp_id, project_id),\n        FOREIGN KEY (emp_id) REFERENCES employees(employee_id),\n        FOREIGN KEY (project_id) REFERENCES projects(id)\n    )",
      seedSQL: "INSERT INTO emp_projects VALUES\n        (2, 101, 'Lead Developer'),\n        (3, 101, 'Data Architect'),\n        (4, 101, 'Data Analyst'),\n        (2, 102, 'Cloud Specialist'),\n        (6, 103, 'Marketing Lead');",
      columns: [
        { name: "emp_id", type: "INTEGER", pk: true },
        { name: "project_id", type: "INTEGER", pk: true },
        { name: "role", type: "TEXT", pk: false },
      ]
    },
  ]
};
