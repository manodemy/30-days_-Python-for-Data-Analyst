SQL_CURRICULUM = [
    {
        "day": 1,
        "title": "Database Fundamentals & SQL Environment",
        "db": "retail.db",
        "emoji": "🗄️",
        "objective": "Understand relational database management system (RDBMS) concepts, schemas, primary/foreign keys, and explore database structures.",
        "sections": [{
            "num": 1,
            "title": "What is a Database?",
            "subtitle": "Understanding RDBMS and Schemas",
            "theory": "A relational database organizes data into tables consisting of rows (records) and columns (attributes). Relational Database Management Systems (RDBMS) manage these databases and enforce structural constraints (like primary keys for unique identifiers and foreign keys for relationships). Common dialects include SQLite, PostgreSQL, MySQL, and BigQuery.",
            "demo": "SELECT * FROM sales LIMIT 5;",
            "cc": "RDBMS Basics",
            "questions": [
                "Write a query to retrieve all columns from the <code>products</code> table.",
                "Retrieve only the <code>name</code> and <code>unit_price</code> columns from the <code>products</code> table.",
                "Retrieve the <code>product</code> and <code>amount</code> columns from the <code>sales</code> table, aliasing them as <code>product_name</code> and <code>sale_value</code>.",
                "List all unique (distinct) product categories from the <code>products</code> table.",
                "List the distinct regions from the <code>sales</code> table."
            ]
        }],
        "tasks": [
            {"name": "Schema Explorer", "desc": "Write a query to fetch the first 10 rows from the regions table to explore its fields."}
        ],
        "interviews": [
            "What is the role of a Primary Key (PK) and a Foreign Key (FK) in a relational database schema? Explain using the products and sales relationship.",
            "Write a query to retrieve all columns from the products table, but rename unit_price to item_cost."
        ],
        "summary": "Today you learned database basics: how tables represent entities, the distinction between databases and spreadsheets, and basic SELECT statements with column aliasing and DISTINCT. This is your gateway into structured data analysis."
    },
    {
        "day": 2,
        "title": "SELECT & Filtering — Retrieving Rows",
        "db": "retail.db",
        "emoji": "🔍",
        "objective": "Filter query results using conditional clauses, logical operators, and value constraints.",
        "sections": [{
            "num": 1,
            "title": "The WHERE Clause",
            "subtitle": "Filtering Rows with Constraints",
            "theory": "The WHERE clause filters rows based on logical conditions. Standard comparison operators (=, !=, <, >, <=, >=) can be combined using logical operators (AND, OR, NOT). Operator precedence can be adjusted using parentheses. BETWEEN filters within a range (inclusive), and IN filters against a list of specific values.",
            "demo": "SELECT * FROM sales WHERE region = 'North' AND amount > 5000;",
            "cc": "WHERE Filters",
            "questions": [
                "Find all sales transactions where the <code>category</code> is 'Electronics'.",
                "Find all sales where the <code>amount</code> is between 3000 and 7000 (inclusive) using <code>BETWEEN</code>.",
                "Find all products in the <code>products</code> table where <code>unit_price</code> is less than 1500.",
                "Retrieve all sales transactions in either the 'South' or 'West' regions using <code>IN</code>.",
                "Retrieve all sales transactions that are NOT in the 'North' region."
            ]
        }],
        "tasks": [
            {"name": "High Value Transactions", "desc": "Retrieve all sales transactions over ₹8,000 in the 'East' region."}
        ],
        "interviews": [
            "Write a query to select all products from the products table where the unit price is greater than 5000 and the stock quantity is less than 30.",
            "Explain SQL execution order: why does the WHERE clause execute before the SELECT clause?"
        ],
        "summary": "Filtering is the core of database analysis. Using WHERE with comparisons, lists (IN), ranges (BETWEEN), and logical operators lets you isolate exact cohorts of records."
    },
    {
        "day": 3,
        "title": "Sorting, Pattern Matching & CASE",
        "db": "retail.db",
        "emoji": "📝",
        "objective": "Sort query outputs, execute fuzzy text matching, and build conditional column logic.",
        "sections": [{
            "num": 1,
            "title": "ORDER BY & LIKE",
            "subtitle": "Sorting, Wildcards, and CASE",
            "theory": "ORDER BY sorts output in ascending (ASC) or descending (DESC) order, with support for multi-column sorting and NULLS FIRST/LAST. The LIKE operator executes pattern matching using '%' (matches zero or more characters) and '_' (matches exactly one character). CASE WHEN provides conditional if-then-else logic directly in queries. COALESCE returns the first non-NULL value.",
            "demo": "SELECT product, amount, CASE WHEN amount > 10000 THEN 'Enterprise' ELSE 'Standard' END as deal_size FROM sales ORDER BY amount DESC;",
            "cc": "Sorting & Case Logic",
            "questions": [
                "Sort all records in the <code>sales</code> table by <code>amount</code> in descending order.",
                "Find all sales where <code>customer_name</code> starts with 'A' using <code>LIKE</code>.",
                "Find all sales where the customer email contains 'gmail'.",
                "Classify products: if unit_price > 5000 then 'Premium', if between 2000 and 5000 then 'Mid-range', else 'Budget'.",
                "Write a query using <code>COALESCE</code> to display customer_email, falling back to 'No Email Provided' if it is NULL."
            ]
        }],
        "tasks": [
            {"name": "Sorted Customer Searches", "desc": "Find all customers whose names contain 'Kumar', sorted by sales amount descending."}
        ],
        "interviews": [
            "How does SQL handle NULL values? Explain the difference between comparing with '= NULL' vs 'IS NULL'.",
            "Write a query that retrieves all products, sorting them by category ascending, and then by unit_price descending."
        ],
        "summary": "Sorting organizes your data, LIKE wildcards enable text searches, and CASE expressions allow you to map data dynamically. COALESCE ensures clean datasets free of empty cells."
    },
    {
        "day": 4,
        "title": "Aggregate Functions & GROUP BY",
        "db": "retail.db",
        "emoji": "📊",
        "objective": "Summarize metrics using aggregate functions and partition query results into reporting buckets.",
        "sections": [{
            "num": 1,
            "title": "Aggregation & Grouping",
            "subtitle": "Aggregates, GROUP BY and HAVING",
            "theory": "Aggregate functions (COUNT, SUM, AVG, MIN, MAX) perform calculations on columns, ignoring NULL values (except COUNT(*)). GROUP BY partitions rows into summary buckets. The HAVING clause filters these grouped summaries based on aggregate conditions. WHERE filters rows before aggregation occurs.",
            "demo": "SELECT category, COUNT(*) as orders, AVG(amount) as avg_sale FROM sales GROUP BY category HAVING avg_sale > 3000;",
            "cc": "Grouping Metrics",
            "questions": [
                "Count the total number of orders in the <code>sales</code> table.",
                "Find the total stock quantity of all products combined in the <code>products</code> table.",
                "Calculate the average unit price for products in each category.",
                "Retrieve regions with total sales revenue greater than 50,000.",
                "Find the highest and lowest sale amounts recorded in the <code>sales</code> table."
            ]
        }],
        "tasks": [
            {"name": "Category Volume", "desc": "Group sales by category and display the total transactions, showing only categories with more than 10 orders."}
        ],
        "interviews": [
            "Explain the difference between WHERE and HAVING. Can you use aggregate functions in the WHERE clause? Why or why not?",
            "Write a query to find customer_ids who have spent more than ₹15,000 in total across all transactions."
        ],
        "summary": "Grouping aggregates individual rows into high-level business metrics. Master HAVING to filter these aggregates, and understand that WHERE applies to raw rows before grouping."
    },
    {
        "day": 5,
        "title": "Joins — Combining Multiple Tables",
        "db": "company.db",
        "emoji": "🔗",
        "objective": "Combine columns from multiple tables using relationship keys and resolve unmatched rows.",
        "sections": [{
            "num": 1,
            "title": "Relational Joins",
            "subtitle": "INNER, OUTER, and SELF Joins",
            "theory": "Joins link tables using matching keys. INNER JOIN returns rows with matches in both tables. LEFT JOIN returns all rows from the left table and matches from the right. SELF JOIN joins a table with itself to map hierarchical data. SQLite does not natively support RIGHT or FULL OUTER JOIN, which must be simulated by swapping tables or using UNION.",
            "demo": "SELECT e.name as employee, d.name as department FROM employees e INNER JOIN departments d ON e.dept_id = d.id;",
            "cc": "Joins and Aliases",
            "questions": [
                "Join <code>employees</code> and <code>departments</code> to list employee names, department names, and department budgets.",
                "Write a query to list all departments and any assigned employee names using <code>LEFT JOIN</code>.",
                "Find all employees who are not assigned to any project by LEFT joining <code>employees</code> to <code>emp_projects</code>.",
                "Write a query to find all employees and their managers using a self join on the <code>employees</code> table.",
                "List all projects and the count of employees assigned to each project."
            ]
        }],
        "tasks": [
            {"name": "Department Heads", "desc": "Join employees and departments to list every department name alongside the name of its manager."}
        ],
        "interviews": [
            "Write a query to find the names of employees in the 'Engineering' department whose current salary is greater than 80,000.",
            "What is a CROSS JOIN? When would you use one, and what is its performance cost?"
        ],
        "summary": "Joins unlock the power of relational databases. By combining tables via PK-FK keys, you can query across complex schemas. Use LEFT JOINs to handle optional relations and identify missing records."
    },
    {
        "day": 6,
        "title": "Subqueries",
        "db": "ecommerce.db",
        "emoji": "🧠",
        "objective": "Embed queries inside SELECT, WHERE, or FROM statements to execute multi-stage lookups.",
        "sections": [{
            "num": 1,
            "title": "Subqueries",
            "subtitle": "Nested Queries and Correlated Logic",
            "theory": "A subquery is a nested query. Scalar subqueries return a single value. Multi-row subqueries return a list of values (used with IN, NOT IN, EXISTS). Correlated subqueries reference columns in the outer query and execute once per candidate row. SQLite supports subqueries across all clauses.",
            "demo": "SELECT name, cost_price FROM products WHERE cost_price > (SELECT AVG(cost_price) FROM products);",
            "cc": "Subquery Types",
            "questions": [
                "Find all products that have never been ordered using a subquery with <code>NOT IN</code>.",
                "Find customers who registered after the customer named 'Sneha Patel' registered.",
                "Retrieve customer names who have placed orders with a total amount greater than 10,000.",
                "Write a query displaying product name and a subquery counting how many times it has been ordered.",
                "Find order records that contain the product 'MacBook Pro' using an EXISTS subquery."
            ]
        }],
        "tasks": [
            {"name": "Spender Cohort", "desc": "Find customer records where the customer has spent more than the average order total in the orders table."}
        ],
        "interviews": [
            "What is a correlated subquery? How does it differ from a non-correlated subquery in terms of execution and performance?",
            "Write a query to find all customers who have never placed an order on the system using NOT EXISTS."
        ],
        "summary": "Subqueries let you perform nested lookups. While powerful, correlated subqueries can be slow. Learn to structure them efficiently and recognize when to convert them into standard JOINs."
    },
    {
        "day": 7,
        "title": "Common Table Expressions (CTEs)",
        "db": "ecommerce.db",
        "emoji": "🏗️",
        "objective": "Define temporary, named result sets to write cleaner, modular, and readable queries.",
        "sections": [{
            "num": 1,
            "title": "Common Table Expressions",
            "subtitle": "WITH Clause and CTEs",
            "theory": "CTEs define temporary, named result sets that exist only during query execution. Chaining multiple CTEs allows building modular logic. Recursive CTEs consist of an anchor member unioned with a recursive member, which is useful for hierarchical traversals (like organizational charts).",
            "demo": "WITH SalesByCustomer AS (\n    SELECT customer_id, SUM(total_amount) as total_spent\n    FROM orders GROUP BY customer_id\n)\nSELECT c.name, s.total_spent FROM SalesByCustomer s JOIN customers c ON s.customer_id = c.id WHERE s.total_spent > 15000;",
            "cc": "CTE Fundamentals",
            "questions": [
                "Write a CTE named <code>CustomerCount</code> that counts orders per customer, and select all columns from it.",
                "Use a CTE to calculate the average cost price of products in each category, then select categories with averages above 5000.",
                "Write a query utilizing two chained CTEs: the first getting product details, the second calculating category totals.",
                "Use a CTE to find customers who signed up in 2022 and have placed more than 2 orders.",
                "Rewrite a subquery filtering products above average cost price into a query using a CTE."
            ]
        }],
        "tasks": [
            {"name": "Spender Revenue", "desc": "Write a CTE to get total revenue per product category, then join with categories to show names."}
        ],
        "interviews": [
            "What is a recursive CTE? Write a conceptual recursive CTE to generate numbers from 1 to 10.",
            "Compare CTEs vs Subqueries vs Temporary Tables. When should you use each in a production environment?"
        ],
        "summary": "CTEs transform complex, nested SQL scripts into readable, step-by-step logic. Chaining CTEs with WITH modularizes your queries, improving maintenance and debugging."
    },
    {
        "day": 8,
        "title": "Window Functions I — Ranking & Numbering",
        "db": "ecommerce.db",
        "emoji": "🔢",
        "objective": "Perform calculations across partitions of rows without collapsing columns, and calculate rank assignments.",
        "sections": [{
            "num": 1,
            "title": "Ranking Window Functions",
            "subtitle": "ROW_NUMBER, RANK, DENSE_RANK, NTILE",
            "theory": "Window functions perform calculations across a set of rows related to the current row, without collapsing them. The OVER clause configures this partition window. ROW_NUMBER assigns sequential numbers. RANK skips numbers on duplicate ties, whereas DENSE_RANK assigns consecutive numbers.",
            "demo": "SELECT name, category_id, cost_price, DENSE_RANK() OVER(PARTITION BY category_id ORDER BY cost_price DESC) as price_rank FROM products;",
            "cc": "Ranking Mechanics",
            "questions": [
                "Assign a sequential row number to all customers ordered by their <code>signup_date</code>.",
                "Rank products globally by <code>cost_price</code> descending using <code>RANK()</code>.",
                "Partition products by category and assign row numbers ordered by product name.",
                "Use <code>NTILE(4)</code> to divide products into four price quartiles.",
                "Write a query using a window function to find the earliest customer who signed up in each region."
            ]
        }],
        "tasks": [
            {"name": "Customer Rankings", "desc": "Rank customers within each region by their order counts using DENSE_RANK."}
        ],
        "interviews": [
            "Explain the difference between ROW_NUMBER(), RANK(), and DENSE_RANK() with respect to duplicate values.",
            "Write a query to find the second most expensive product in each category using a CTE and a window function."
        ],
        "summary": "Window ranking functions are crucial for analytical reports. Unlike GROUP BY, they keep the identity of individual rows while allowing partition-based calculations."
    },
    {
        "day": 9,
        "title": "Window Functions II — Analytics & Frames",
        "db": "ecommerce.db",
        "emoji": "📈",
        "objective": "Calculate running aggregates, moving averages, and offset values (LAG/LEAD) for trend analysis.",
        "sections": [{
            "num": 1,
            "title": "Analytic Window Functions",
            "subtitle": "LAG, LEAD, Running Totals",
            "theory": "Analytic window functions analyze data flows. LAG and LEAD look back or forward by an offset. Adding an ORDER BY clause inside OVER() calculates running totals. Frame specifications (like ROWS BETWEEN) allow calculating moving averages over rolling windows.",
            "demo": "SELECT id, order_id, qty, SUM(qty) OVER (ORDER BY id) as running_qty FROM order_items;",
            "cc": "Offsets & Frames",
            "questions": [
                "Use <code>LAG()</code> to display the signup date of the previous customer registered on the system.",
                "Use <code>LEAD()</code> to display the signup date of the next customer registered on the system.",
                "Calculate the running sum of orders total_amount ordered by order_date.",
                "Use <code>FIRST_VALUE()</code> to display the first product ordered by each customer.",
                "Calculate a 3-order moving average of product costs using <code>ROWS BETWEEN 2 PRECEDING AND CURRENT ROW</code>."
            ]
        }],
        "tasks": [
            {"name": "Cumulative Spend", "desc": "Calculate a running total of order amounts grouped by customer, ordered by order date."}
        ],
        "interviews": [
            "Write a query to calculate month-over-month growth of order totals. Use the LAG window function to compare current month with previous.",
            "How do you specify a frame window in SQL? Explain the difference between 'ROWS' and 'RANGE'."
        ],
        "summary": "Offset functions (LAG/LEAD) make comparative timeline reports simple. Running aggregates and frame parameters give you control over cumulative statistics."
    },
    {
        "day": 10,
        "title": "Date & Time Functions",
        "db": "ecommerce.db",
        "emoji": "📅",
        "objective": "Perform temporal arithmetic, extract year/month components, and filter records by dates.",
        "sections": [{
            "num": 1,
            "title": "Date Manipulation",
            "subtitle": "Formatting and Intervals",
            "theory": "SQLite stores dates as text (ISO 8601 strings), reals, or integers. STRFTIME formats and extracts date parts: %Y (year), %m (month), %d (day), %w (day of week: 0=Sunday). Julian date difference is calculated using JULIANDAY(). Other dialects support DATEADD, DATEDIFF, or DATE_TRUNC.",
            "demo": "SELECT id, order_date, STRFTIME('%Y', order_date) as year, STRFTIME('%m', order_date) as month FROM orders WHERE order_date >= '2022-01-01';",
            "cc": "Date Formatting",
            "questions": [
                "Find all orders placed in the year 2022.",
                "Find all orders placed in the month of October.",
                "Find orders placed on weekends (where STRFTIME '%w' is '0' or '6').",
                "Calculate the number of days between customer signup date and their first order date using <code>JULIANDAY</code>.",
                "List all customers who signed up in the final quarter (Q4) of 2022."
            ]
        }],
        "tasks": [
            {"name": "Signup Intervals", "desc": "Calculate the average time in days between signup date and order date for all orders."}
        ],
        "interviews": [
            "Write a query to calculate the number of orders placed in each month of 2022.",
            "How would you handle timezone offsets in standard SQL? Explain the role of AT TIME ZONE."
        ],
        "summary": "Date calculations are crucial for cohort analyses and dashboards. Master formatting functions (STRFTIME in SQLite) and date differences to parse temporal records."
    },
    {
        "day": 11,
        "title": "String & Type Functions",
        "db": "ecommerce.db",
        "emoji": "🧹",
        "objective": "Clean text strings and explicitly convert column data types.",
        "sections": [{
            "num": 1,
            "title": "Text Manipulation & Casts",
            "subtitle": "String operations and Explicit Casting",
            "theory": "Text functions modify strings: UPPER, LOWER, TRIM (removes whitespace), REPLACE, and SUBSTR. Explicit conversions are handled via CAST(expression AS type). COALESCE handles fallback values for missing records, and NULLIF returns NULL if parameters are equal.",
            "demo": "SELECT TRIM(name) as clean_name, LOWER(email) as clean_email, CAST(cost_price AS INTEGER) as price_int FROM products JOIN categories ON products.category_id = categories.id LIMIT 5;",
            "cc": "String Cleanup",
            "questions": [
                "Convert all customer names to uppercase and emails to lowercase.",
                "Trim extra spaces from customer names and replace the domain '@gmail.com' with '@googlemail.com'.",
                "Extract the first 3 characters of each customer's region using <code>SUBSTR</code>.",
                "Find the character position of '@' in each customer's email using <code>INSTR</code>.",
                "Convert product cost prices to integers using <code>CAST</code>."
            ]
        }],
        "tasks": [
            {"name": "Domain Extraction", "desc": "Write a query to extract the domain extension (everything after the '@' symbol) from customer emails."}
        ],
        "interviews": [
            "Write a query to extract the username part of an email address (everything before the '@' symbol).",
            "Explain implicit vs explicit type coercion and the risks of dividing integers without casting to floats."
        ],
        "summary": "Data cleaning is 80% of an analyst's work. Master string functions to clean text cells, and use CAST to convert types for safe mathematical checks."
    },
    {
        "day": 12,
        "title": "Data Cleaning & Wrangling in SQL",
        "db": "ecommerce.db",
        "emoji": "🛠️",
        "objective": "Execute database deduplication, profiles, conditional aggregations, and pivot structures.",
        "sections": [{
            "num": 1,
            "title": "Data Wrangling",
            "subtitle": "Deduplication and Pivoting",
            "theory": "Data wrangling standardizes messy tables. Deduplication is executed using ROW_NUMBER() in a CTE to isolate duplicates (keeping the first entry). Pivoting transforms rows into columns using CASE statement conditional aggregations. Outlier detection uses statistics (like Z-score or IQR) conceptually.",
            "demo": "WITH RankedOrders AS (\n    SELECT order_id, product_id, qty, ROW_NUMBER() OVER(PARTITION BY order_id, product_id ORDER BY id) as rn FROM order_items\n)\nSELECT * FROM RankedOrders WHERE rn = 1;",
            "cc": "Deduplication",
            "questions": [
                "Profile categories: count products and find the min/max cost price.",
                "Find duplicate records in the customers table where name and email are identical.",
                "Display product name and categorize stock count: 'High' (>50), 'Medium' (20-50), 'Low' (<20).",
                "Calculate total order quantities for categories using conditional aggregates.",
                "Write a query to pivot order status: display counts of 'Completed' vs 'Pending' in separate columns."
            ]
        }],
        "tasks": [
            {"name": "Pivoting Status", "desc": "Write a query to display the total orders placed in each region, pivoted by order status."}
        ],
        "interviews": [
            "Write a query to delete duplicate customer records (duplicate names and emails), keeping only the record with the lowest primary key ID.",
            "How do you calculate a Z-score to detect outliers in SQL? Outline the required query structure."
        ],
        "summary": "Pivoting, profiling, and deduplicating are high-level wrangling skills. Grouping by CASE allows you to reshape tables for dashboards directly in queries."
    },
    {
        "day": 13,
        "title": "Set Operations & Advanced Joins",
        "db": "ecommerce.db",
        "emoji": "🥞",
        "objective": "Combine, intersect, or subtract query result sets and structure complex joins.",
        "sections": [{
            "num": 1,
            "title": "Sets and Advanced Joins",
            "subtitle": "Set Operations and Advanced Joins",
            "theory": "Set operators combine result sets from different queries. UNION removes duplicate rows, UNION ALL retains duplicates, INTERSECT returns matching rows, and EXCEPT returns rows in the first query not in the second. Column counts and schemas must align. Advanced join patterns include anti-joins and semi-joins (EXISTS).",
            "demo": "SELECT name FROM customers WHERE region = 'North'\nUNION\nSELECT name FROM customers WHERE region = 'East';",
            "cc": "Sets & Joins",
            "questions": [
                "Find customer IDs who signed up in 2022 and ordered in 2022 using <code>INTERSECT</code>.",
                "List all customers who signed up but have placed no orders using <code>EXCEPT</code>.",
                "Combine customer names and email addresses with category names using <code>UNION ALL</code>.",
                "List customer IDs who ordered in 2022 but did not order in 2023.",
                "Write an anti-join query to select products that have never been sold."
            ]
        }],
        "tasks": [
            {"name": "Active Spenders", "desc": "Find customer IDs who registered in 2022 and ordered in both Q3 and Q4."}
        ],
        "interviews": [
            "Explain the difference between UNION and UNION ALL. Which is more performant and why?",
            "What is a lateral join (CROSS APPLY in SQL Server)? When would you use one?"
        ],
        "summary": "Set operations manipulate query results as logical sets. UNION ALL is faster than UNION as it bypasses deduplication checks. Anti-joins quickly isolate orphaned keys."
    },
    {
        "day": 14,
        "title": "Query Optimisation & Execution Plans",
        "db": "ecommerce.db",
        "emoji": "⚡",
        "objective": "Inspect query execution plans, configure indexes, and optimize query structure.",
        "sections": [{
            "num": 1,
            "title": "Query Optimization",
            "subtitle": "Explain Query Plan & Indexes",
            "theory": "Optimization speeds up database operations. EXPLAIN QUERY PLAN shows how the database engine runs a query, identifying full table scans (SCAN TABLE) and index lookups (SEARCH TABLE). Optimization involves index management, avoiding functions on index columns in WHERE, and filtering early.",
            "demo": "EXPLAIN QUERY PLAN SELECT * FROM customers WHERE id = 5;",
            "cc": "Explain Plans",
            "questions": [
                "Run an <code>EXPLAIN QUERY PLAN</code> on a query that joins orders and customers.",
                "Run <code>EXPLAIN QUERY PLAN</code> on a query searching customer names by a LIKE pattern (<code>%name%</code>).",
                "Explain why standard indexes are bypassed when searching using a function (e.g. <code>WHERE UPPER(name) = 'AMIT'</code>).",
                "Explain what a covering index is and why it avoids table lookups.",
                "Explain the difference between a clustered and a non-clustered index."
            ]
        }],
        "tasks": [
            {"name": "Index Analysis", "desc": "Run EXPLAIN QUERY PLAN on a query joining orders and order_items on order_id to verify if it uses indexes."}
        ],
        "interviews": [
            "What is a database index? Under what conditions can an index slow down database operations?",
            "What is a full table scan? How do you avoid it in a production database?"
        ],
        "summary": "Optimization is key to production database administration. Master explain plans to identify bottleneck table scans, and use indexes to speed up lookups."
    },
    {
        "day": 15,
        "title": "Views, Stored Procedures & Functions",
        "db": "company.db",
        "emoji": "💾",
        "objective": "Build reusable views, stored procedures, and triggers to modularize database operations.",
        "sections": [{
            "num": 1,
            "title": "Reusable SQL Objects",
            "subtitle": "Views, Procedures, and Triggers",
            "theory": "Views are saved query blocks served as virtual tables. Stored procedures accept inputs and wrap transaction logic (SQLite does not support stored procedures; standard databases do). Triggers execute automatic logic in response to INSERT, UPDATE, or DELETE statements.",
            "demo": "CREATE VIEW IF NOT EXISTS v_dept_summary AS SELECT d.name, COUNT(e.id) as staff_count FROM departments d LEFT JOIN employees e ON d.id = e.dept_id GROUP BY d.id;",
            "cc": "Views & Procs",
            "questions": [
                "Write a query to retrieve all data from the view <code>v_dept_summary</code>.",
                "Explain the benefits of views for data security and access control.",
                "Describe what a User Defined Function (UDF) is and how it differs from a stored procedure.",
                "Explain the difference between a standard View and a Materialized View.",
                "Describe what a database Trigger does and give a real-world example."
            ]
        }],
        "tasks": [
            {"name": "Verify View", "desc": "Create a view listing all employees with their manager's name and department budget, then select from it."}
        ],
        "interviews": [
            "Write a query to create a view showing employee name, department name, manager name, and salary from company database tables.",
            "When would you use a View instead of a Stored Procedure? Explain the trade-offs."
        ],
        "summary": "Views and procedures modularize database logic. Triggers automate constraints and audit logging. Understanding these objects is key to enterprise data engineering."
    },
    {
        "day": 16,
        "title": "Advanced Analytics Patterns",
        "db": "ecommerce.db",
        "emoji": "🔮",
        "objective": "Build analytical reporting pipelines: cohorts, funnels, retention, and customer scoring (RFM).",
        "sections": [{
            "num": 1,
            "title": "Cohort & Funnel Analysis",
            "subtitle": "Advanced Analytic SQL Patterns",
            "theory": "Analytical patterns trace client lifecycles. Cohort analysis groups users by sign-up month and measures activity over time. Funnel analysis tracks drop-offs across sequence stages. RFM scoring (Recency, Frequency, Monetary) groups customers into segments using window functions like NTILE.",
            "demo": "SELECT customer_id, COUNT(*) as frequency, SUM(total_amount) as monetary FROM orders GROUP BY customer_id;",
            "cc": "Analytics Patterns",
            "questions": [
                "Group customers by signup month to count cohorts.",
                "Count orders per customer and classify them using NTILE into 5 spend brackets.",
                "Write a query calculating the time-to-convert between signup date and first order date.",
                "Calculate customer retention: count customers who ordered in 2022 and ordered in 2023.",
                "Write a query to find the customer churn: active in 2022 but inactive in 2023."
            ]
        }],
        "tasks": [
            {"name": "RFM Brackets", "desc": "Write a query to bucket customers into 3 tiers based on their monetary value using NTILE."}
        ],
        "interviews": [
            "Write a query to calculate customer cohort retention: find the percentage of customers signing up in a month who purchase again in the following month.",
            "Describe how you would model customer lifecycle funnel stages in SQL. What joins or aggregation are required?"
        ],
        "summary": "Cohorts, funnels, and RFM metrics are vital business logic. Master conditional counts and window groupings to build dashboard reporting pipelines."
    },
    {
        "day": 17,
        "title": "Data Modelling & Analytics Engineering",
        "db": "ecommerce.db",
        "emoji": "🧱",
        "objective": "Design dimensional schemas, build analytical models, and maintain version control.",
        "sections": [{
            "num": 1,
            "title": "Dimensional Modeling",
            "subtitle": "Star Schema, dbt, and SCDs",
            "theory": "Data modeling structures databases for reporting. Star schemas consist of central fact tables (transactions) joined to dimension tables (context). Slowly Changing Dimensions (SCD Type 1 overwrites, SCD Type 2 adds history rows) track attributes. Analytics engineering tools (like dbt) organize query pipelines.",
            "demo": "SELECT o.id, c.name, o.order_date, o.total_amount FROM orders o JOIN customers c ON o.customer_id = c.id;",
            "cc": "Modelling",
            "questions": [
                "Identify the fact tables and dimension tables in the ecommerce database.",
                "Explain grain definition: what does a single row in order_items represent?",
                "Explain the difference between a surrogate key and a natural key.",
                "Explain what a Slowly Changing Dimension (SCD) Type 2 is and how it tracks history.",
                "Explain the staging, intermediate, and mart layers in dbt projects."
            ]
        }],
        "tasks": [
            {"name": "Schema Design", "desc": "List the foreign key relationships linking products, orders, and order_items."}
        ],
        "interviews": [
            "Explain the difference between a Star Schema and a Snowflake Schema. Which is better for query performance and why?",
            "How does dbt model references work? Explain the difference between ref() and source() functions."
        ],
        "summary": "Data modeling maps real-world processes. Star schemas optimize query performance, while analytics engineering structures SQL scripts for clean data pipelines."
    },
    {
        "day": 18,
        "title": "SQL Interview Prep & Real-World Patterns",
        "db": "capstone_retail.db",
        "emoji": "🏆",
        "objective": "Build Business Intelligence reports from an extended relational schema, answering core coding questions.",
        "sections": [{
            "num": 1,
            "title": "SQL Capstone & Interview Patterns",
            "subtitle": "Retail Business Intelligence",
            "theory": "In this final capstone, you will compile multi-table joins, CTEs, date operations, and window functions on capstone_retail.db. This mimics senior analyst interview challenges: top-N, MoM trends, cohort value, and returns analysis.",
            "demo": "SELECT s.id, p.name, s.qty, s.amount, s.sale_date FROM sales s JOIN products p ON s.product_id = p.id LIMIT 5;",
            "cc": "Capstone Queries",
            "questions": [
                "Monthly revenue trend: calculate total revenue and order count by month using sale_date.",
                "Top products: find the top 5 products by revenue, displaying product name and category.",
                "Regional sales: list total revenue and orders for each region.",
                "Weekend sales: calculate total sales generated on weekends.",
                "Returned orders: calculate the percentage of total sales transactions that were returned using returns table."
            ]
        }],
        "tasks": [
            {"name": "Final Query", "desc": "Write a query to retrieve the overall return percentage of the retail business."}
        ],
        "interviews": [
            "Write a query to find the sales representative who generated the second highest revenue in each region using window functions.",
            "Write a query to find customer_ids who spent more than the average spend of repeat buyers (buyers with 2+ orders).",
            "Write a query to calculate the month-over-month growth rate of product sales revenue, handling division by zero using NULLIF."
        ],
        "summary": "Congratulations! You have completed the 18-Day SQL course. You have mastered aggregation, joins, subqueries, CTEs, dates, strings, window functions, query planning, cohort metrics, and analytics engineering."
    }
]
