import os
import sqlite3
from datetime import datetime, timedelta

def populate_all_tables(conn):
    cursor = conn.cursor()
    
    # 1. departments
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS departments (
        department_id INTEGER PRIMARY KEY,
        department_name TEXT NOT NULL,
        budget REAL NOT NULL,
        manager_id INTEGER
    )
    """)
    
    # 2. employees
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS employees (
        employee_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        salary REAL NOT NULL,
        hire_date DATE NOT NULL,
        department_id INTEGER,
        job_title TEXT NOT NULL,
        email TEXT NOT NULL,
        is_active INTEGER NOT NULL,
        manager_id INTEGER,
        commission REAL,
        FOREIGN KEY (department_id) REFERENCES departments(department_id)
    )
    """)
    
    # 3. customers
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS customers (
        customer_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        signup_date DATE NOT NULL,
        region TEXT NOT NULL
    )
    """)
    
    # 4. orders
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        order_date DATE NOT NULL,
        total_amount REAL NOT NULL,
        status TEXT NOT NULL,
        shipped_date DATE,
        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    )
    """)
    
    # 5. products
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        unit_price REAL NOT NULL,
        stock_qty INTEGER NOT NULL,
        category_id INTEGER,
        cost_price REAL NOT NULL
    )
    """)
    
    # 6. order_items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        qty INTEGER NOT NULL,
        unit_price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )
    """)
    
    # 7. categories
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        parent_id INTEGER
    )
    """)
    
    # 8. sales
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        revenue REAL,
        units_sold INTEGER,
        amount REAL,
        sale_date DATE,
        customer_id INTEGER,
        customer_signup_month TEXT,
        order_id INTEGER
    )
    """)
    
    # 9. returns
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS returns (
        order_id INTEGER PRIMARY KEY,
        return_date DATE NOT NULL,
        reason TEXT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
    )
    """)
    
    # 10. sales_reps
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS sales_reps (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        region_id INTEGER
    )
    """)
    
    # 11. regions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS regions (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        zone TEXT NOT NULL,
        manager TEXT NOT NULL
    )
    """)
    
    # 12. active_employees
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS active_employees (
        employee_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        category TEXT
    )
    """)
    
    # 13. archived_employees
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS archived_employees (
        employee_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL,
        category TEXT
    )
    """)
    
    # 14. source_employees
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS source_employees (
        employee_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL
    )
    """)
    
    # 15. target_employees
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS target_employees (
        employee_id INTEGER PRIMARY KEY,
        first_name TEXT NOT NULL
    )
    """)
    
    # 16. orders_2023
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders_2023 (
        order_id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        amount REAL NOT NULL
    )
    """)
    
    # 17. orders_2024
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS orders_2024 (
        order_id INTEGER PRIMARY KEY,
        customer_id INTEGER,
        amount REAL NOT NULL
    )
    """)
    
    # 18. signups_2023
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS signups_2023 (
        year INTEGER,
        signups INTEGER
    )
    """)
    
    # 19. signups_2024
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS signups_2024 (
        year INTEGER,
        signups INTEGER
    )
    """)
    
    # 20. north_region_sales
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS north_region_sales (
        region TEXT,
        product_id INTEGER,
        sales REAL
    )
    """)
    
    # 21. south_region_sales
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS south_region_sales (
        region TEXT,
        product_id INTEGER,
        sales REAL
    )
    """)
    
    # 22. contractors
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS contractors (
        salary REAL
    )
    """)
    
    # 23. raw_customers
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS raw_customers (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        phone TEXT,
        signup_date DATE
    )
    """)
    
    # 24. salaries
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS salaries (
        emp_id INTEGER,
        amount REAL NOT NULL,
        effective_date DATE NOT NULL,
        PRIMARY KEY (emp_id, effective_date),
        FOREIGN KEY (emp_id) REFERENCES employees(employee_id)
    )
    """)
    
    # 25. projects
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        status TEXT NOT NULL,
        deadline DATE NOT NULL
    )
    """)
    
    # 26. emp_projects
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS emp_projects (
        emp_id INTEGER,
        project_id INTEGER,
        role TEXT NOT NULL,
        PRIMARY KEY (emp_id, project_id),
        FOREIGN KEY (emp_id) REFERENCES employees(employee_id),
        FOREIGN KEY (project_id) REFERENCES projects(id)
    )
    """)

    # Seed departments
    depts = [
        (1, 'Executive', 10000000.0, 1),
        (10, 'Engineering', 5000000.0, 2),
        (20, 'Data Science', 3500000.0, 3),
        (30, 'Marketing', 1500000.0, 6),
        (40, 'Sales', 2000000.0, 7),
        (50, 'Human Resources', 800000.0, 8),
        (60, 'Operations & Logistics', 1200000.0, None)
    ]
    cursor.executemany("INSERT OR REPLACE INTO departments VALUES (?, ?, ?, ?)", depts)

    # Seed employees
    emps = [
        (1, 'Rajesh', 'Sen', 160000.0, '2019-01-15', 1, 'Director', 'rajesh.sen@manodemy.com', 1, None, None),
        (2, 'Amit', 'Kumar', 95000.0, '2020-03-10', 10, 'Senior Engineering Manager', 'amit.kumar@manodemy.com', 1, 1, None),
        (3, 'Priya', 'Nair', 120000.0, '2020-06-01', 20, 'Lead Data Scientist', 'priya.nair@manodemy.com', 1, 1, 15000.0),
        (4, 'Sneha', 'Patel', 80000.0, '2021-02-15', 20, 'Senior Data Analyst', 'sneha.patel@manodemy.com', 1, 3, 8000.0),
        (5, 'Rahul', 'Sharma', 75000.0, '2021-08-20', 20, 'Data Analyst', 'rahul.sharma@manodemy.com', 1, 3, 5000.0),
        (6, 'Vikram', 'Malhotra', 70000.0, '2021-11-05', 30, 'Senior Marketing Manager', 'vikram.malhotra@manodemy.com', 1, 1, 12000.0),
        (7, 'Ananya', 'Gupta', 65000.0, '2022-01-10', 40, 'Sales Representative', 'ananya.gupta@manodemy.com', 1, 2, 20000.0),
        (8, 'Karan', 'Johar', 55000.0, '2022-05-15', 50, 'HR Specialist', 'karan.johar@manodemy.com', 1, None, None),
        (9, 'Siddharth', 'Roy', 60000.0, '2023-02-10', 10, 'Software Engineer', 'siddharth.roy@manodemy.com', 0, 2, None),
        (10, 'Riya', 'Sen', 45000.0, '2023-05-20', 30, 'Marketing Executive', 'riya.sen@manodemy.com', 1, 6, 2000.0),
        (11, 'Devendra', 'Singh', 85000.0, '2022-10-01', 20, 'Data Scientist', 'devendra.singh@manodemy.com', 1, 3, None),
        (12, 'Neha', 'Sharma', 50000.0, '2023-01-15', 40, 'Sales Executive', 'neha.sharma@manodemy.com', 1, 7, 15000.0),
        (13, 'Aditi', 'Rao', 42000.0, '2023-04-01', 40, 'Sales Associate', 'aditi.rao@manodemy.com', 1, 7, 8000.0),
        (14, 'Rohit', 'Verma', 88000.0, '2020-11-15', 10, 'Senior Software Engineer', 'rohit.verma@manodemy.com', 1, 2, None),
        (15, 'Pooja', 'Patel', 48000.0, '2021-06-10', 50, 'HR Coordinator', 'pooja.patel@manodemy.com', 1, 8, None)
    ]
    cursor.executemany("INSERT OR REPLACE INTO employees VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", emps)

    # Seed customers
    custs = [
        (1, 'Amit', 'Sharma', 'amit.sharma@example.com', '2022-01-15', 'North'),
        (2, 'Priya', 'Nair', 'priya.nair@example.com', '2022-03-22', 'South'),
        (3, 'Karthik', 'Raja', 'karthik.raja@example.com', '2022-06-18', 'South'),
        (4, 'Rahul', 'Sharma', 'rahul.sharma@example.com', '2022-08-05', 'North'),
        (5, 'Sneha', 'Patel', 'sneha.patel@example.com', '2022-10-12', 'West'),
        (6, 'Anoop', 'Mishra', 'anoop.mishra@example.com', '2023-01-20', 'East'),
        (7, 'Gaurav', 'Joshi', 'gaurav.joshi@example.com', '2023-03-15', 'North'),
        (8, 'Ananya', 'Gupta', 'ananya.gupta@example.com', '2023-04-10', 'East'),
        (9, 'Deepak', 'Verma', 'deepak.verma@example.com', '2023-05-18', 'West')
    ]
    cursor.executemany("INSERT OR REPLACE INTO customers VALUES (?, ?, ?, ?, ?, ?)", custs)

    # Seed orders
    today = datetime.now().date()
    ords = [
        (1001, 1, '2024-05-15', 52000.0, 'Shipped', '2024-05-20'),
        (1002, 2, '2024-08-04', 1600.0, 'Shipped', '2024-08-08'),
        (1003, 3, '2024-10-05', 120000.0, 'Shipped', '2024-10-15'),
        (1004, 4, '2024-10-06', 4500.0, 'Shipped', '2024-10-09'),
        (1005, 5, '2024-11-15', 15000.0, 'Shipped', '2024-11-20'),
        (1006, 1, '2024-12-22', 121000.0, 'Shipped', '2024-12-23'),
        (1007, 2, '2024-12-29', 4000.0, 'Processing', None),
        (1008, 6, '2024-02-14', 2500.0, 'Shipped', '2024-02-16'),
        (1009, 1, (today - timedelta(days=5)).strftime('%Y-%m-%d'), 3000.0, 'Shipped', (today - timedelta(days=3)).strftime('%Y-%m-%d')),
        (1010, 3, (today - timedelta(days=12)).strftime('%Y-%m-%d'), 15000.0, 'Shipped', (today - timedelta(days=10)).strftime('%Y-%m-%d')),
        (1011, 5, (today - timedelta(days=45)).strftime('%Y-%m-%d'), 7500.0, 'Shipped', (today - timedelta(days=40)).strftime('%Y-%m-%d')),
        (1012, 7, (today - timedelta(days=75)).strftime('%Y-%m-%d'), 900.0, 'Shipped', (today - timedelta(days=74)).strftime('%Y-%m-%d')),
        (1013, 9, (today - timedelta(days=120)).strftime('%Y-%m-%d'), 4000.0, 'Shipped', (today - timedelta(days=118)).strftime('%Y-%m-%d'))
    ]
    cursor.executemany("INSERT OR REPLACE INTO orders VALUES (?, ?, ?, ?, ?, ?)", ords)

    # Seed products
    prods = [
        (101, 'Python Course Book', 1500.0, 150, 5, 800.0),
        (102, 'Data Science Bundle', 4500.0, 80, 5, 2500.0),
        (103, 'Mechanical Keyboard', 6000.0, 40, 3, 3500.0),
        (104, 'Noise Cancelling Headphones', 12000.0, 30, 3, 8000.0),
        (105, 'Ergonomic Desk Chair', 15000.0, 15, 6, 10000.0),
        (106, 'LED Monitor 24"', 11000.0, 25, 2, 7000.0),
        (107, 'Coffee Mug', 500.0, 200, 6, 200.0),
        (108, 'Notebook Pack of 3', 300.0, 300, 5, 120.0),
        (109, 'Wireless Mouse', 1800.0, 100, 3, 1000.0),
        (110, 'Standing Desk Converter', 18000.0, 10, 6, 12000.0),
        (201, 'MacBook Pro', 120000.0, 10, 2, 90000.0),
        (202, 'iPad Air', 50000.0, 15, 2, 38000.0),
        (203, 'Wireless Mouse Extra', 2000.0, 50, 3, 1200.0),
        (204, 'USB-C Cable', 1000.0, 100, 3, 400.0),
        (205, 'SQL Queries in 10 Minutes', 800.0, 80, 5, 400.0),
        (206, 'Python Data Science Handbook', 2500.0, 40, 5, 1200.0),
        (207, 'Ergonomic Chair Office', 15000.0, 12, 6, 10000.0)
    ]
    cursor.executemany("INSERT OR REPLACE INTO products VALUES (?, ?, ?, ?, ?, ?)", prods)

    # Seed order_items
    ord_items = [
        (1, 1001, 202, 1, 50000.0),
        (2, 1001, 203, 1, 2000.0),
        (3, 1002, 205, 2, 800.0),
        (4, 1003, 201, 1, 120000.0),
        (5, 1004, 206, 1, 2500.0),
        (6, 1004, 204, 2, 1000.0),
        (7, 1005, 207, 1, 15000.0),
        (8, 1006, 201, 1, 120000.0),
        (9, 1006, 204, 1, 1000.0),
        (10, 1007, 203, 2, 2000.0),
        (11, 1008, 206, 1, 2500.0)
    ]
    cursor.executemany("INSERT OR REPLACE INTO order_items VALUES (?, ?, ?, ?, ?)", ord_items)

    # Seed categories
    cats = [
        (1, 'Electronics', None),
        (2, 'Computers', 1),
        (3, 'Accessories', 1),
        (4, 'Books', None),
        (5, 'Tech Books', 4),
        (6, 'Home & Living', None)
    ]
    cursor.executemany("INSERT OR REPLACE INTO categories VALUES (?, ?, ?)", cats)

    # Seed sales reps
    reps = [
        (1, 'Rohan Mehta', 1),
        (2, 'Aditi Rao', 2),
        (3, 'Siddharth Sen', 3),
        (4, 'Neha Sharma', 4)
    ]
    cursor.executemany("INSERT OR REPLACE INTO sales_reps VALUES (?, ?, ?)", reps)

    # Seed regions
    regions_data = [
        (1, 'North', 'Zone-A', 'Rajesh Sharma'),
        (2, 'South', 'Zone-B', 'Priya Nair'),
        (3, 'East', 'Zone-C', 'Amit Das'),
        (4, 'West', 'Zone-D', 'Sneha Patel')
    ]
    cursor.executemany("INSERT OR REPLACE INTO regions VALUES (?, ?, ?, ?)", regions_data)

    # Seed active_employees and archived_employees
    active_emps = [
        (1, 'Rajesh', 'Active'),
        (2, 'Amit', 'Active'),
        (3, 'Priya', 'Active'),
        (4, 'Sneha', 'Active'),
        (5, 'Rahul', 'Active'),
        (6, 'Vikram', 'Active'),
        (7, 'Ananya', 'Active'),
        (8, 'Karan', 'Active'),
        (10, 'Riya', 'Active'),
        (11, 'Devendra', 'Active'),
        (12, 'Neha', 'Active'),
        (13, 'Aditi', 'Active'),
        (14, 'Rohit', 'Active'),
        (15, 'Pooja', 'Active')
    ]
    cursor.executemany("INSERT OR REPLACE INTO active_employees VALUES (?, ?, ?)", active_emps)

    archived_emps = [
        (9, 'Siddharth', 'Archived'),
        (99, 'Kunal', 'Archived')
    ]
    cursor.executemany("INSERT OR REPLACE INTO archived_employees VALUES (?, ?, ?)", archived_emps)

    # Seed source_employees and target_employees
    src_emps = [
        (1, 'Rajesh'), (2, 'Amit'), (3, 'Priya'), (4, 'Sneha'), (5, 'Rahul'), (9, 'Siddharth')
    ]
    cursor.executemany("INSERT OR REPLACE INTO source_employees VALUES (?, ?)", src_emps)

    tgt_emps = [
        (1, 'Rajesh'), (2, 'Amit'), (3, 'Priya'), (4, 'Sneha'), (5, 'Rahul'), (10, 'Riya')
    ]
    cursor.executemany("INSERT OR REPLACE INTO target_employees VALUES (?, ?)", tgt_emps)

    # Seed orders_2023 and orders_2024
    ords_2023 = [
        (101, 1, 15000.0),
        (102, 2, 25000.0),
        (103, 3, 30000.0),
        (104, 4, 12000.0)
    ]
    cursor.executemany("INSERT OR REPLACE INTO orders_2023 VALUES (?, ?, ?)", ords_2023)

    ords_2024 = [
        (201, 1, 18000.0),
        (202, 3, 35000.0),
        (203, 5, 22000.0),
        (204, 7, 14000.0)
    ]
    cursor.executemany("INSERT OR REPLACE INTO orders_2024 VALUES (?, ?, ?)", ords_2024)

    # Seed signups_2023 and signups_2024
    su_2023 = [(2023, 150)]
    cursor.executemany("INSERT OR REPLACE INTO signups_2023 VALUES (?, ?)", su_2023)
    su_2024 = [(2024, 220)]
    cursor.executemany("INSERT OR REPLACE INTO signups_2024 VALUES (?, ?)", su_2024)

    # Seed north_region_sales and south_region_sales
    north_sales = [
        ('North', 101, 45000.0),
        ('North', 102, 90000.0)
    ]
    cursor.executemany("INSERT OR REPLACE INTO north_region_sales VALUES (?, ?, ?)", north_sales)

    south_sales = [
        ('South', 101, 30000.0),
        ('South', 103, 60000.0)
    ]
    cursor.executemany("INSERT OR REPLACE INTO south_region_sales VALUES (?, ?, ?)", south_sales)

    # Seed contractors
    conts = [(50000.0,), (65000.0,), (None,)]
    cursor.executemany("INSERT INTO contractors (salary) VALUES (?)", conts)

    # Seed raw_customers
    raw_custs = [
        (1, '  amit SHARMA ', 'amit@gmail.com', ' 9876543210  ', '2022-01-15'),
        (2, 'priya Nair  ', 'priya@yahoo.com', '9876543211', '2022-03-22'),
        (3, '  Karthik Raja', 'karthik@outlook.com', '  9876543212 ', '2022-06-18')
    ]
    cursor.executemany("INSERT OR REPLACE INTO raw_customers VALUES (?, ?, ?, ?, ?)", raw_custs)

    # Seed returns
    rets = [
        (1001, '2024-05-22', 'Defective'),
        (1005, '2024-11-25', 'Changed Mind')
    ]
    cursor.executemany("INSERT OR REPLACE INTO returns VALUES (?, ?, ?)", rets)

    # Seed salaries
    salaries_data = [
        (1, 150000.0, '2019-01-15'),
        (1, 160000.0, '2021-01-15'),
        (2, 90000.0, '2020-03-10'),
        (2, 95000.0, '2022-03-10'),
        (3, 110000.0, '2020-06-01'),
        (3, 120000.0, '2022-06-01')
    ]
    cursor.executemany("INSERT OR REPLACE INTO salaries VALUES (?, ?, ?)", salaries_data)

    # Seed projects
    projects_data = [
        (101, 'Alpha Analytics', 'In Progress', '2025-12-31'),
        (102, 'Beta Cloud migration', 'Completed', '2024-06-30'),
        (103, 'Gamma Brand Refresh', 'In Progress', '2026-03-15')
    ]
    cursor.executemany("INSERT OR REPLACE INTO projects VALUES (?, ?, ?, ?)", projects_data)

    # Seed emp_projects
    emp_projects_data = [
        (2, 101, 'Lead Developer'),
        (3, 101, 'Data Architect'),
        (4, 101, 'Data Analyst'),
        (2, 102, 'Cloud Specialist'),
        (6, 103, 'Marketing Lead')
    ]
    cursor.executemany("INSERT OR REPLACE INTO emp_projects VALUES (?, ?, ?)", emp_projects_data)

    # Seed sales (for Capstone etc.)
    sales_recs = [
        (1, 101, 15000.0, 10, 15000.0, '2024-05-15', 1, '2022-01', 1001),
        (2, 102, 45000.0, 10, 45000.0, '2024-08-04', 2, '2022-03', 1002),
        (3, 103, 60000.0, 10, 60000.0, '2024-10-05', 3, '2022-06', 1003),
        (4, 104, 120000.0, 10, 120000.0, '2024-10-06', 4, '2022-08', 1004)
    ]
    cursor.executemany("INSERT OR REPLACE INTO sales VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", sales_recs)

def create_dbs():
    os.makedirs('public/sql-data', exist_ok=True)
    
    db_names = ['retail.db', 'company.db', 'ecommerce.db', 'capstone_retail.db']
    
    for db_name in db_names:
        db_path = f'public/sql-data/{db_name}'
        if os.path.exists(db_path):
            try:
                os.remove(db_path)
            except Exception as e:
                print(f"Warning: could not remove {db_path}: {e}")
        print(f"Creating and seeding {db_name}...")
        conn = sqlite3.connect(db_path)
        populate_all_tables(conn)
        conn.commit()
        conn.close()
        
    print("All databases created and seeded successfully!")

if __name__ == '__main__':
    create_dbs()
