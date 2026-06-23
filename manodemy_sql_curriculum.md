# Manodemy — SQL for Data Analyst: 18-Day Complete Curriculum
## Written by: Expert SQL Trainer | 15+ Years Experience
### Version 1.0 — Job-Oriented, Interview-Ready

---

> **How to read this curriculum:**
> - **Concepts** — Deep explanations of each topic with real business context.
> - **SQL Order of Execution** — Included in Day 1 and referenced throughout. This is the single most important concept for SQL debugging and optimisation.
> - **5 Hands-On Challenges** — Practical, coding exercises matching the Python curriculum format.
> - **25 Interview Questions** — Current, industry-relevant questions scoped **strictly** to current day + all previous days.

---

# DAY 01 — Introduction to SQL & Databases

## 📚 Concept Deep-Dive

### What is SQL?
SQL (Structured Query Language) is the standard language used to communicate with relational databases. Unlike programming languages that tell the computer *how* to do something (imperative), SQL is **declarative** — you tell the database *what* you want, and the database engine figures out *how* to fetch it.

SQL is divided into five sub-languages:
| Sub-language | Purpose | Common Commands |
|---|---|---|
| **DDL** (Data Definition Language) | Define structure | CREATE, ALTER, DROP, TRUNCATE |
| **DML** (Data Manipulation Language) | Modify data | INSERT, UPDATE, DELETE |
| **DQL** (Data Query Language) | Query/retrieve data | SELECT |
| **DCL** (Data Control Language) | Access control | GRANT, REVOKE |
| **TCL** (Transaction Control Language) | Transaction management | COMMIT, ROLLBACK, SAVEPOINT |

> **For Data Analysts**, you will spend 90% of your time writing **DQL** (SELECT statements).

---

### What is a Relational Database?
A relational database stores data in **tables** (also called relations). Each table has:
- **Rows** (Records / Tuples) — a single data entry
- **Columns** (Fields / Attributes) — a single property of the data
- **Primary Key** — a column or set of columns that uniquely identifies each row
- **Foreign Key** — a column that references the Primary Key of another table

**Why Relational?** Because tables can be *related* to each other through shared key columns — this avoids data redundancy and keeps data consistent.

---

### The Five Most Important Concepts of Day 1

#### 1. Schemas
A **schema** is a logical container for database objects (tables, views, functions). Think of it as a folder that organises your tables. Example: `sales.orders`, `hr.employees`.

#### 2. Tables, Rows, and Columns
```sql
-- A simple table structure
CREATE TABLE employees (
    employee_id   INT          PRIMARY KEY,  -- Unique identifier
    first_name    VARCHAR(50)  NOT NULL,     -- Text, cannot be empty
    last_name     VARCHAR(50)  NOT NULL,
    salary        DECIMAL(10,2),             -- Numeric, 10 digits, 2 decimal places
    hire_date     DATE,
    department_id INT                        -- Foreign key reference
);
```

#### 3. Data Types (Core)
| Category | Data Type | Example |
|---|---|---|
| Integer | INT, BIGINT, SMALLINT | employee_id: 1001 |
| Decimal | DECIMAL(p,s), NUMERIC | salary: 75000.50 |
| Text | VARCHAR(n), CHAR(n), TEXT | name: 'Alice' |
| Date/Time | DATE, TIME, TIMESTAMP | hire_date: '2022-01-15' |
| Boolean | BOOLEAN | is_active: TRUE |

#### 4. Your First SELECT Query
```sql
-- Basic SELECT — retrieve all rows and all columns
SELECT *
FROM employees;

-- Selective columns — better practice in production
SELECT employee_id, first_name, last_name, salary
FROM employees;

-- Add a column alias using AS
SELECT
    employee_id         AS emp_id,
    first_name || ' ' || last_name AS full_name,  -- String concatenation
    salary * 1.10       AS salary_with_raise       -- Arithmetic expression
FROM employees;
```

#### 5. ⭐ SQL ORDER OF EXECUTION (The Most Critical Concept)
This is how the SQL engine *actually* processes a query — NOT the order you write it.

```
Written Order:          Execution Order:
1. SELECT          →    1. FROM          (identify the data source)
2. FROM            →    2. JOIN          (combine tables if applicable)
3. WHERE           →    3. WHERE         (filter rows)
4. GROUP BY        →    4. GROUP BY      (group remaining rows)
5. HAVING          →    5. HAVING        (filter groups)
6. ORDER BY        →    6. SELECT        (compute and select output columns)
7. LIMIT           →    7. DISTINCT      (remove duplicates if specified)
                        8. ORDER BY      (sort results)
                        9. LIMIT/OFFSET  (restrict number of output rows)
```

> **Why this matters:** Column aliases defined in `SELECT` **cannot** be used in `WHERE` because `WHERE` runs *before* `SELECT`. This is one of the most common interview trick questions.

```sql
-- This FAILS because 'net_salary' is not yet computed when WHERE runs:
SELECT salary - 5000 AS net_salary
FROM employees
WHERE net_salary > 50000;  -- ❌ Error: column "net_salary" does not exist

-- This WORKS:
SELECT salary - 5000 AS net_salary
FROM employees
WHERE salary - 5000 > 50000;  -- ✅ Repeat the expression
```

---

## 🛠️ Day 01 Hands-On Challenges

**Dataset:** Use the `employees` table with columns: `employee_id`, `first_name`, `last_name`, `salary`, `hire_date`, `department_id`, `job_title`, `email`.

**Challenge 1:** Write a query to retrieve only the `employee_id`, `first_name`, and `email` from the employees table.

**Challenge 2:** Write a query that displays each employee's full name as a single column called `full_name` (combine `first_name` and `last_name` with a space in between), and their salary with a 10% raise displayed as `projected_salary`.

**Challenge 3:** Write a query to retrieve all columns from the employees table but only show employees in `department_id` 3. (Use a WHERE clause — you'll explore this more deeply in Day 2.)

**Challenge 4:** Write a query that computes a column `annual_bonus` which is 5% of the `salary`, and show it alongside `first_name` and `salary`.

**Challenge 5:** Explain in a SQL comment (`--`) inside your query why the following query fails, and then fix it:
```sql
SELECT salary * 1.15 AS new_salary
FROM employees
WHERE new_salary > 80000;
```

---

## 💼 25 Interview Questions — Day 01

1. What is SQL and how is it different from other programming languages?
2. What are the five sub-languages of SQL? Give one command example for each.
3. What is the difference between `VARCHAR` and `CHAR` data types?
4. What is a Primary Key? Can a table have multiple Primary Keys?
5. What is the difference between a Primary Key and a Unique Key?
6. What is a Foreign Key and what is its purpose in a relational database?
7. Explain the SQL Order of Execution in detail.
8. Why can't you use a column alias defined in SELECT inside the WHERE clause?
9. What does `SELECT *` do, and when is it considered bad practice?
10. What is the difference between `DECIMAL(10,2)` and `FLOAT`? When would you use each?
11. What is a schema in the context of a database?
12. What is the difference between a row and a column in a relational database?
13. What is `DDL` vs `DML`? Give examples of each.
14. What is a `NULL` value? How is `NULL` different from `0` or an empty string?
15. Can a Primary Key column contain NULL values? Why or why not?
16. What is the difference between `TRUNCATE` and `DELETE`? Which is DDL and which is DML?
17. What is referential integrity? How does a Foreign Key enforce it?
18. In SQL, what does the `AS` keyword do?
19. What is the output of `SELECT 10 / 3` in SQL? How do you get a decimal result?
20. What is the difference between `INT` and `BIGINT`?
21. Can a table exist without a Primary Key? Is it a good practice?
22. What is a composite key? Give a business example where you would use one.
23. Explain what a relational database is. How is it different from a flat file (like a CSV)?
24. What is `NOT NULL` constraint and when would you use it?
25. You receive a table with 5 million rows. A colleague writes `SELECT *` in a production environment. What problem could this cause, and how would you advise them to write the query instead?

---

# DAY 02 — Filtering Data with WHERE

## 📚 Concept Deep-Dive

### The Role of WHERE
`WHERE` is the **row-level filter** in SQL. It runs at **Step 3** of the SQL Order of Execution (after `FROM`/`JOIN`, before `GROUP BY`). It evaluates each row individually and keeps only rows where the condition evaluates to `TRUE`.

> **Key insight:** A row is excluded if a condition evaluates to `FALSE` **or to `NULL`** (three-valued logic: TRUE, FALSE, UNKNOWN). This is why filtering on NULL requires special handling (covered in Day 3).

### Comparison Operators
```sql
=        Equal to
<>  !=   Not equal to  (both work in most databases)
>        Greater than
<        Less than
>=       Greater than or equal to
<=       Less than or equal to
```

### Logical Operators: AND, OR, NOT
```sql
-- AND: both conditions must be TRUE
SELECT * FROM employees
WHERE salary > 50000 AND department_id = 3;

-- OR: at least one condition must be TRUE
SELECT * FROM employees
WHERE department_id = 3 OR department_id = 5;

-- NOT: reverses the condition
SELECT * FROM employees
WHERE NOT department_id = 3;  -- same as department_id <> 3
```

### Operator Precedence — Critical for Complex Filters
SQL evaluates `NOT` first, then `AND`, then `OR`. This catches many beginners off guard.

```sql
-- WRONG INTENT — This is read as: department=3 AND (salary>70000 OR department=5)
SELECT * FROM employees
WHERE department_id = 3 AND salary > 70000 OR department_id = 5;

-- CORRECT — Use parentheses to enforce your intended logic:
SELECT * FROM employees
WHERE (department_id = 3 OR department_id = 5) AND salary > 70000;
```
> **Rule:** Always use parentheses when combining `AND` and `OR`. Never rely on implicit precedence in complex conditions.

### BETWEEN ... AND
Inclusive range filter — both endpoints are included.
```sql
-- salary >= 40000 AND salary <= 80000
SELECT * FROM employees
WHERE salary BETWEEN 40000 AND 80000;

-- Works on dates too
SELECT * FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';
```

### IN Operator — Clean alternative to multiple OR conditions
```sql
-- Instead of this (verbose and error-prone):
WHERE department_id = 1 OR department_id = 3 OR department_id = 7

-- Use this (clean and readable):
WHERE department_id IN (1, 3, 7)

-- NOT IN — exclude values
WHERE job_title NOT IN ('Manager', 'Director', 'VP')
```
> **Caution:** `NOT IN` behaves unexpectedly if the list contains a `NULL` value. The result can be an empty set. (Covered more in Day 3.)

### Filtering Text — Case Sensitivity
```sql
-- Exact match (case-sensitive in PostgreSQL, case-insensitive in MySQL by default)
SELECT * FROM employees WHERE first_name = 'Alice';

-- Case-insensitive search (PostgreSQL)
SELECT * FROM employees WHERE LOWER(first_name) = 'alice';
```

### Arithmetic in WHERE
```sql
-- You can use arithmetic expressions in WHERE
SELECT * FROM employees
WHERE salary * 1.10 > 90000;  -- employees who'd earn >90k after a 10% raise
```

---

## 🛠️ Day 02 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, last_name, salary, hire_date, department_id, job_title, email, is_active)

**Challenge 1:** Retrieve all employees who earn more than ₹60,000 per month and work in `department_id` 4.

**Challenge 2:** Write a query to find all employees whose `job_title` is either 'Data Analyst', 'Business Analyst', or 'Data Scientist'.

**Challenge 3:** Find all employees hired between January 1, 2020 and December 31, 2022 whose salary is between ₹40,000 and ₹80,000. Use `BETWEEN` for both conditions.

**Challenge 4:** Find all employees who are NOT in `department_id` 1, 2, or 3, and whose salary is greater than ₹50,000. Use `NOT IN` and `AND`.

**Challenge 5:** A colleague wrote this query and it's returning wrong results. Identify the bug, explain why it's wrong using your knowledge of operator precedence, and fix it:
```sql
SELECT * FROM employees
WHERE department_id = 2 AND salary > 70000 OR is_active = TRUE;
```

---

## 💼 25 Interview Questions — Day 02

1. What is the purpose of the `WHERE` clause and at which step does it execute in the SQL Order of Execution?
2. What is the difference between `=` and `IN` operators? When would you prefer `IN`?
3. Is `BETWEEN` inclusive or exclusive of its boundary values? Write an example.
4. What happens when you use `NOT IN` with a list that contains a `NULL` value?
5. Explain SQL's three-valued logic (TRUE, FALSE, UNKNOWN).
6. What is operator precedence in SQL? Which has higher precedence: `AND` or `OR`?
7. Write a query to find all employees who earn between ₹50,000 and ₹1,00,000.
8. How would you write a case-insensitive text filter in PostgreSQL?
9. What is the difference between `<>` and `!=` in SQL?
10. Can you use aggregate functions (like SUM or COUNT) in a WHERE clause? Why or why not?
11. Write a query that returns employees NOT in departments 4, 5, or 6.
12. Why should you always use parentheses when combining AND and OR conditions?
13. What is wrong with this query: `WHERE salary = NULL`? How do you correctly filter for NULLs?
14. Write a query to find all employees hired in the year 2023.
15. What does `WHERE salary > 50000 AND salary < 80000` mean? Can you rewrite it using BETWEEN?
16. What is a Cartesian product? How does WHERE help avoid one?
17. A query returns 0 rows but you expect results. What are 3 possible reasons related to the WHERE clause?
18. How would you find all employees whose `email` column is NOT empty (but might be NULL or empty string)?
19. What is the difference between filtering before a JOIN vs. filtering after a JOIN?
20. Write a query to return employees who were hired after 2021 and earn more than the average salary. (Hint: use a subquery in WHERE — preview of Day 12.)
21. What does `WHERE 1=1` do and where is it commonly used in applications?
22. If a column has a `VARCHAR` data type, can you filter it with a numeric comparison like `WHERE employee_id > 1000`? What could go wrong?
23. How do you filter a BOOLEAN column in SQL? Is `WHERE is_active = TRUE` the same as `WHERE is_active`?
24. Explain why `WHERE salary NOT IN (SELECT salary FROM contractors WHERE salary IS NULL)` would return zero rows even if valid matches exist.
25. A business analyst asks you to pull all employees who joined in Q1 2024. Write the query using two different approaches.

---

# DAY 03 — Pattern Matching & NULL Handling

## 📚 Concept Deep-Dive

### LIKE Operator — Pattern Matching
`LIKE` performs **partial text matching** using two wildcard characters:

| Wildcard | Meaning | Example |
|---|---|---|
| `%` | Zero or more characters | `'%analyst'` matches "data analyst", "business analyst", "analyst" |
| `_` | Exactly one character | `'An_a'` matches "Anna", "Anya" |

```sql
-- Starts with 'Sales'
SELECT * FROM employees WHERE job_title LIKE 'Sales%';

-- Ends with 'Manager'
SELECT * FROM employees WHERE job_title LIKE '%Manager';

-- Contains 'data' anywhere (case-insensitive with ILIKE in PostgreSQL)
SELECT * FROM employees WHERE job_title ILIKE '%data%';

-- Exactly 5 characters starting with 'A'
SELECT * FROM employees WHERE first_name LIKE 'A____';

-- Escape a literal % or _ character using ESCAPE
SELECT * FROM products WHERE discount_code LIKE '20\%' ESCAPE '\';
```

### ILIKE (PostgreSQL) vs LOWER() + LIKE
```sql
-- PostgreSQL-specific case-insensitive LIKE
WHERE email ILIKE '%@gmail.com'

-- Standard SQL approach (works in all databases)
WHERE LOWER(email) LIKE '%@gmail.com'
```

> **Performance Warning:** `LIKE '%text%'` (leading wildcard) cannot use indexes and will trigger a full table scan. Avoid leading wildcards on large tables.

---

### NULL Handling — The Most Misunderstood Topic in SQL

#### What is NULL?
`NULL` represents the **absence of a value** — it is not zero, not empty string, not false. It is *unknown*.

#### NULL in Comparisons
```sql
-- These ALWAYS return NULL (neither TRUE nor FALSE):
SELECT NULL = NULL;     -- NULL
SELECT NULL = 5;        -- NULL
SELECT NULL <> 5;       -- NULL
SELECT NULL > 5;        -- NULL

-- This is why NULL rows are excluded from WHERE conditions:
-- WHERE salary = NULL  → evaluates to NULL → row is excluded
```

#### IS NULL and IS NOT NULL
```sql
-- Correct way to filter NULL values:
SELECT * FROM employees WHERE manager_id IS NULL;      -- Find top-level employees
SELECT * FROM employees WHERE phone_number IS NOT NULL; -- Find employees with phone

-- WRONG (always returns 0 rows):
SELECT * FROM employees WHERE manager_id = NULL;  -- ❌
```

#### COALESCE — Replace NULL with a default value
`COALESCE(value1, value2, ..., valueN)` — returns the first non-NULL value in the list.
```sql
-- Replace NULL commission with 0 for calculations
SELECT
    employee_id,
    salary,
    COALESCE(commission, 0) AS commission,
    salary + COALESCE(commission, 0) AS total_compensation
FROM employees;

-- Multiple fallbacks
SELECT COALESCE(preferred_name, first_name, 'Unknown') AS display_name
FROM employees;
```

#### NULLIF — Returns NULL if two values are equal
`NULLIF(value1, value2)` — returns NULL if value1 = value2, otherwise returns value1.
```sql
-- Common use: prevent division by zero
SELECT revenue / NULLIF(units_sold, 0) AS revenue_per_unit
FROM sales;
-- When units_sold = 0, NULLIF returns NULL, making the division NULL (not an error)
```

#### NULL in Aggregate Functions
Aggregate functions like `SUM`, `AVG`, `COUNT` **ignore NULL values** by default.
```sql
-- If 3 out of 10 employees have NULL commission, AVG ignores the 3 NULLs
SELECT AVG(commission) FROM employees;  -- averages only 7 non-NULL values

-- COUNT(*) counts all rows; COUNT(column) ignores NULLs
SELECT
    COUNT(*)           AS total_rows,
    COUNT(commission)  AS rows_with_commission
FROM employees;
```

#### NULL in ORDER BY
```sql
-- NULL sorts LAST by default in ascending order (PostgreSQL/MySQL)
SELECT * FROM employees ORDER BY commission ASC;

-- Control NULL sort position:
SELECT * FROM employees ORDER BY commission ASC NULLS FIRST;
SELECT * FROM employees ORDER BY commission ASC NULLS LAST;
```

---

## 🛠️ Day 03 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, last_name, email, job_title, salary, commission, manager_id, department_id)

**Challenge 1:** Find all employees whose `email` ends with `@manodemy.com`. Use the `LIKE` operator.

**Challenge 2:** Find all employees whose `job_title` contains the word 'analyst' (case-insensitive) but does NOT start with 'Senior'. Use `ILIKE` (or `LOWER` + `LIKE`) and `NOT LIKE`.

**Challenge 3:** Find all employees who have no manager assigned (`manager_id` is NULL). These are the top-level employees. Display their `first_name`, `last_name`, and `job_title`.

**Challenge 4:** Write a query that displays each employee's `first_name`, `salary`, and `total_compensation`. `total_compensation` = salary + commission. Employees with a NULL commission should have it treated as 0. Use `COALESCE`.

**Challenge 5:** Write a query that calculates `revenue_per_unit` for products in a `sales` table (columns: `product_id`, `revenue`, `units_sold`). Ensure the query does not crash when `units_sold` is 0. Use `NULLIF`. Display `product_id`, `revenue`, `units_sold`, and `revenue_per_unit`.

---

## 💼 25 Interview Questions — Day 03

1. What is NULL in SQL? Is it the same as 0 or an empty string?
2. Why does `WHERE column = NULL` return 0 rows? What is the correct syntax?
3. What is the correct operator to check if a value is NULL? Give an example.
4. What does `COALESCE` do? Write an example where it is used in a salary calculation.
5. What is `NULLIF`? Explain its most common real-world use case.
6. How do `NULL` values interact with aggregate functions like `SUM` and `AVG`?
7. What is the difference between `COUNT(*)` and `COUNT(column_name)`?
8. How do `NULL` values sort in ascending vs. descending `ORDER BY`?
9. Explain the `LIKE` operator. What is the difference between `%` and `_` wildcards?
10. What is a leading wildcard (`LIKE '%text'`) and why should it be avoided on large tables?
11. What is `ILIKE` and which database supports it natively?
12. If you need a case-insensitive LIKE search in a database that doesn't support ILIKE, how do you achieve it?
13. What does `NULL AND TRUE` evaluate to in SQL? What about `NULL OR TRUE`? Explain three-valued logic.
14. A developer wrote `WHERE commission != 0` to find employees without commission. What is wrong with this? How do you fix it?
15. How does NULL propagate in arithmetic? What is `5 + NULL`?
16. What is the result of `COALESCE(NULL, NULL, NULL)`?
17. What is `NULLIF(10, 10)`? What is `NULLIF(10, 5)`?
18. Write a query that finds all employees whose `first_name` starts with 'J' and has exactly 5 characters.
19. Why might a `NOT IN` query return 0 rows when the list contains a NULL? Explain the mechanism.
20. How would you replace NULL values in a column with a specific string for reporting purposes?
21. You have a `revenue` and `cost` column. Some cost values are NULL. Write a query that safely computes profit as `revenue - cost`, treating NULL cost as 0.
22. What is the difference between `IS NOT NULL` and `<> NULL`?
23. In what real business scenarios would a column legitimately contain NULL values?
24. Write a query to identify columns that might have data quality issues (e.g., NULL values) in a table.
25. A report is showing incorrect averages. You suspect NULL values are skewing the result. How do you investigate and fix it?

---

# DAY 04 — Sorting & Limiting Results

## 📚 Concept Deep-Dive

### ORDER BY — Sorting Query Results
`ORDER BY` executes at **Step 8** of the SQL Order of Execution — after `SELECT`. This means you CAN reference column aliases defined in `SELECT`.

```sql
-- Basic ascending sort (default)
SELECT first_name, salary FROM employees ORDER BY salary;           -- ASC is default
SELECT first_name, salary FROM employees ORDER BY salary ASC;
SELECT first_name, salary FROM employees ORDER BY salary DESC;

-- Sort by multiple columns (primary sort, then secondary)
SELECT first_name, last_name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;
-- Within each department, employees are sorted highest salary first

-- Sort by column alias (works because ORDER BY runs after SELECT)
SELECT first_name, salary * 1.10 AS new_salary
FROM employees
ORDER BY new_salary DESC;  -- ✅ This works

-- Sort by column position (1-indexed) — avoid in production code, fragile
SELECT first_name, last_name, salary
FROM employees
ORDER BY 3 DESC;  -- sorts by the 3rd column (salary)
```

### LIMIT and OFFSET — Pagination
`LIMIT` restricts the number of rows returned. `OFFSET` skips a specified number of rows.

```sql
-- Get the top 5 highest-paid employees
SELECT first_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;

-- Pagination: get page 2 (rows 11–20) assuming page size of 10
SELECT first_name, salary
FROM employees
ORDER BY employee_id
LIMIT 10 OFFSET 10;  -- Skip first 10 rows, take next 10

-- Page 3 (rows 21-30)
LIMIT 10 OFFSET 20;
```

> **Always pair LIMIT with ORDER BY.** Without ORDER BY, the database can return rows in *any* order — your "top 5" is meaningless without specifying top 5 of *what*.

### FETCH FIRST (SQL Standard)
```sql
-- SQL Standard syntax (works in PostgreSQL, Oracle, SQL Server 2012+)
SELECT first_name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 5 ROWS ONLY;

-- With offset
OFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY;
```

### DISTINCT — Remove Duplicate Rows
`DISTINCT` executes at **Step 7** of the SQL Order of Execution — after `SELECT` but before `ORDER BY`.
```sql
-- Return unique department IDs
SELECT DISTINCT department_id FROM employees;

-- Distinct combination of two columns
SELECT DISTINCT department_id, job_title FROM employees;

-- DISTINCT with COUNT — count unique values
SELECT COUNT(DISTINCT department_id) AS num_departments FROM employees;
```

> **Performance:** `DISTINCT` is expensive — it sorts the result set to remove duplicates. Don't use it as a band-aid for duplicates from incorrect JOINs. Fix the JOIN instead.

### RANDOM Sampling
```sql
-- Get 5 random employees (PostgreSQL)
SELECT * FROM employees ORDER BY RANDOM() LIMIT 5;

-- MySQL equivalent
SELECT * FROM employees ORDER BY RAND() LIMIT 5;
```

---

## 🛠️ Day 04 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, last_name, salary, department_id, hire_date, job_title)

**Challenge 1:** Write a query to find the 10 most recently hired employees. Display their `first_name`, `last_name`, and `hire_date` in order of most recent first.

**Challenge 2:** Write a pagination query to display employees sorted by `last_name` alphabetically. Return rows 21 through 30 (page 3 with a page size of 10). Use `LIMIT` and `OFFSET`.

**Challenge 3:** Write a query to find all unique `job_title` values in the company, sorted alphabetically. How many unique job titles are there? (Write two queries — one for the list, one for the count.)

**Challenge 4:** Find the 3rd highest salary in the company without using any window functions. Use `LIMIT` and `OFFSET`. Think carefully about how to handle ties.

**Challenge 5:** A report needs the bottom 5 earners in `department_id` 2, sorted by salary ascending then by `hire_date` ascending (longest-serving first among equal salaries). Write the query.

---

## 💼 25 Interview Questions — Day 04

1. At which step does `ORDER BY` execute in the SQL Order of Execution?
2. Why can you reference a column alias from `SELECT` in `ORDER BY` but not in `WHERE`?
3. What is the default sort order of `ORDER BY`?
4. What does `ORDER BY department_id ASC, salary DESC` do?
5. Write a query to get the top 3 earners in the company.
6. What is `OFFSET` and how does it enable pagination?
7. What happens if you write `LIMIT 10` without `ORDER BY`?
8. What is the difference between `LIMIT` (MySQL/PostgreSQL) and `FETCH FIRST n ROWS ONLY` (SQL Standard)?
9. What does `DISTINCT` do? At which step in execution order does it run?
10. Why is using `DISTINCT` to fix duplicate results from a JOIN considered bad practice?
11. Write a query to count the number of unique departments in the employees table.
12. How would you find the 2nd highest salary in a table? Show using LIMIT/OFFSET.
13. What is `ORDER BY RANDOM()` and what is it used for?
14. If a table has 1000 rows and you write `LIMIT 10 OFFSET 990`, how many rows are returned?
15. Can you use `ORDER BY` without a `SELECT` clause? Explain.
16. What is the difference between `DISTINCT` and `GROUP BY` for deduplication?
17. How does `ORDER BY` handle NULL values by default?
18. Write a query to get rows 51-60 from a products table ordered by price.
19. What is the problem with offset-based pagination on large tables? (Performance consideration.)
20. Can you sort by a column that is not in the SELECT list?
21. How would you find the most recent hire date in each department? (Preview of GROUP BY.)
22. What does `SELECT DISTINCT department_id, job_title` return compared to `SELECT DISTINCT department_id`?
23. A business user asks for "the top 10 products" — what clarifying questions should you ask before writing the query?
24. How would you return the first row of each department sorted by salary? (Preview of Window Functions.)
25. Write a query that finds employees hired in 2023, sorted from lowest to highest salary, showing only the 5th and 6th employees.

---

# DAY 05 — Aggregate Functions

## 📚 Concept Deep-Dive

### What are Aggregate Functions?
Aggregate functions collapse **multiple rows** into a **single result value**. They perform calculations across a set of rows.

> **Execution context:** Aggregate functions run during the `SELECT` phase — but they operate on the row groups produced after `WHERE` and `GROUP BY` have been processed.

### Core Aggregate Functions
```sql
COUNT(*)          -- Count all rows (including NULLs)
COUNT(column)     -- Count non-NULL values in column
SUM(column)       -- Sum of all non-NULL values
AVG(column)       -- Average of all non-NULL values
MIN(column)       -- Minimum value (works on numbers, dates, text)
MAX(column)       -- Maximum value (works on numbers, dates, text)
```

### Practical Examples
```sql
-- Global aggregations (across the entire table)
SELECT
    COUNT(*)                    AS total_employees,
    COUNT(commission)           AS employees_with_commission,
    SUM(salary)                 AS total_payroll,
    AVG(salary)                 AS average_salary,
    MIN(salary)                 AS lowest_salary,
    MAX(salary)                 AS highest_salary,
    MAX(hire_date)              AS most_recent_hire,
    MIN(hire_date)              AS earliest_hire
FROM employees;
```

### COUNT Nuances
```sql
-- COUNT(*): counts all rows regardless of NULLs
SELECT COUNT(*) FROM employees;  -- Returns: 500

-- COUNT(column): counts only non-NULL values
SELECT COUNT(manager_id) FROM employees;  -- Returns: 490 (if 10 have NULL)

-- COUNT(DISTINCT column): counts unique non-NULL values
SELECT COUNT(DISTINCT department_id) FROM employees;  -- Returns: 8 (if 8 departments)
```

### AVG and NULL
```sql
-- AVG ignores NULLs — this can be misleading
SELECT AVG(commission) FROM employees;
-- If 100 employees have commission, only those 100 are averaged
-- If you want average across ALL employees (treating NULL as 0):
SELECT AVG(COALESCE(commission, 0)) FROM employees;
```

### Combining Aggregates with WHERE
```sql
-- Aggregates after filtering
SELECT
    COUNT(*)    AS dept3_headcount,
    AVG(salary) AS dept3_avg_salary,
    MAX(salary) AS dept3_top_salary
FROM employees
WHERE department_id = 3;
-- WHERE runs first (filters to dept 3 rows), then aggregates apply
```

### ROUND — Formatting Aggregate Results
```sql
SELECT ROUND(AVG(salary), 2) AS avg_salary  -- Round to 2 decimal places
FROM employees;
```

### STRING_AGG / GROUP_CONCAT — Aggregating Text
```sql
-- PostgreSQL: concatenate names into a comma-separated list
SELECT STRING_AGG(first_name, ', ' ORDER BY first_name) AS all_names
FROM employees
WHERE department_id = 3;

-- MySQL equivalent
SELECT GROUP_CONCAT(first_name ORDER BY first_name SEPARATOR ', ') AS all_names
FROM employees
WHERE department_id = 3;
```

---

## 🛠️ Day 05 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, salary, commission, hire_date, department_id, is_active)

**Challenge 1:** Write a single query that returns the total number of employees, total payroll (SUM of salary), average salary, highest salary, and lowest salary.

**Challenge 2:** Find the number of employees who have a commission (commission IS NOT NULL) vs. those who don't. Use two separate `COUNT` expressions in a single query.

**Challenge 3:** Write a query to find the average salary of only **active** employees (`is_active = TRUE`). Round the result to 2 decimal places.

**Challenge 4:** Write a query to find the number of employees hired each year. (Hint: use `EXTRACT` or `DATE_PART` to extract the year from `hire_date` — preview of Day 17, but try it.)

**Challenge 5:** The HR team reports that the average commission is ₹3,500. You notice that 40% of employees have NULL commission. Write two queries: one that shows the biased average (ignoring NULLs) and one that shows the true average (treating NULL as 0). Explain the difference in a SQL comment.

---

## 💼 25 Interview Questions — Day 05

1. What is an aggregate function? Name the five core aggregate functions in SQL.
2. What is the difference between `COUNT(*)` and `COUNT(column_name)`?
3. How does `AVG` handle NULL values? Give an example where this could cause a misleading result.
4. Can you use aggregate functions in a `WHERE` clause? Why not?
5. What is `COUNT(DISTINCT column)`? Write an example.
6. What does `MIN` and `MAX` return for a text/VARCHAR column?
7. Write a query to find the total payroll cost for department_id = 5.
8. What is the difference between `SUM(salary)` and `COUNT(*) * AVG(salary)`? Will they always be equal?
9. How would you compute the standard deviation of salaries in SQL?
10. What is `STRING_AGG`? Give a practical business example.
11. If you run an aggregate function with no `GROUP BY`, what does it return?
12. How do you round an aggregate result to 2 decimal places?
13. Write a query to find the salary range (difference between highest and lowest salary) in the company.
14. What is the difference between `SUM` and `COUNT`?
15. Can `MIN` and `MAX` work on date columns? What do they return?
16. Write a query to find the average salary but only for employees hired after 2020.
17. What happens when you mix aggregate and non-aggregate columns in SELECT without GROUP BY?
18. What does `COUNT(*) FILTER (WHERE is_active = TRUE)` do? (PostgreSQL)
19. How would you find the number of distinct job titles in the company?
20. What is the difference between `AVG(COALESCE(commission, 0))` and `COALESCE(AVG(commission), 0)`?
21. A business question: "What percentage of our employees earn above ₹70,000?" Write the SQL query.
22. How would you calculate the median salary in SQL? (SQL doesn't have a built-in MEDIAN in all databases.)
23. What does `MAX(hire_date)` return — the first hire or the last hire?
24. Write a query to find departments with more than 10 employees. (Preview of HAVING.)
25. You're auditing data quality. Write a query that shows, for each column in the employees table, the count of NULL values.

---

# DAY 06 — GROUP BY & HAVING

## 📚 Concept Deep-Dive

### GROUP BY — Aggregating by Category
`GROUP BY` collapses rows with the same value in specified columns into single summary rows. It runs at **Step 4** of the SQL Order of Execution — after `WHERE`, before `SELECT`.

```sql
-- Without GROUP BY: one row with global aggregate
SELECT AVG(salary) FROM employees;  -- Returns: 65000

-- With GROUP BY: one row per department
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id;
-- Returns 8 rows (one per unique department_id)
```

### The Golden Rule of GROUP BY
> **Every column in `SELECT` must either be in `GROUP BY` or inside an aggregate function.**

```sql
-- ❌ WRONG: first_name is neither grouped nor aggregated
SELECT department_id, first_name, AVG(salary)
FROM employees
GROUP BY department_id;

-- ✅ CORRECT: all non-aggregate SELECT columns are in GROUP BY
SELECT department_id, job_title, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id, job_title;
```

### GROUP BY with Multiple Columns
```sql
-- Breakdown: average salary per department AND per job title
SELECT
    department_id,
    job_title,
    COUNT(*)    AS headcount,
    AVG(salary) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary
FROM employees
GROUP BY department_id, job_title
ORDER BY department_id, avg_salary DESC;
```

### HAVING — Filter on Groups
`HAVING` is the group-level equivalent of `WHERE`. It runs at **Step 5** — after `GROUP BY`, before `SELECT`.

| | WHERE | HAVING |
|---|---|---|
| **Filters** | Individual rows | Groups |
| **Execution Step** | Step 3 (before GROUP BY) | Step 5 (after GROUP BY) |
| **Can use aggregates?** | ❌ No | ✅ Yes |
| **Can use aliases?** | ❌ No | ❌ No (in standard SQL) |

```sql
-- Find departments with more than 10 employees AND average salary > 60000
SELECT
    department_id,
    COUNT(*)    AS headcount,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING COUNT(*) > 10
   AND AVG(salary) > 60000
ORDER BY avg_salary DESC;
```

### WHERE vs HAVING Together — Performance Matters
```sql
-- Filter BEFORE grouping (preferred for performance):
SELECT department_id, AVG(salary)
FROM employees
WHERE is_active = TRUE         -- Pre-filter: reduces rows before grouping
GROUP BY department_id
HAVING COUNT(*) >= 5;          -- Post-filter: applied on groups

-- Why: WHERE reduces the row set before GROUP BY processes it.
-- Filtering inactive employees with HAVING would group them first (wasteful).
```

### GROUP BY Expressions
```sql
-- Group by derived expressions
SELECT
    EXTRACT(YEAR FROM hire_date) AS hire_year,
    COUNT(*) AS hires_per_year
FROM employees
GROUP BY EXTRACT(YEAR FROM hire_date)  -- must repeat the expression
ORDER BY hire_year;
```

### ROLLUP — Subtotals and Grand Totals
```sql
-- ROLLUP adds subtotal and grand total rows
SELECT department_id, job_title, COUNT(*) AS headcount
FROM employees
GROUP BY ROLLUP(department_id, job_title);
-- Produces: detail rows + department subtotals + grand total
```

---

## 🛠️ Day 06 Hands-On Challenges

**Dataset:** `employees` (employee_id, department_id, job_title, salary, hire_date, is_active)

**Challenge 1:** Write a query that shows the number of employees and average salary for each `department_id`. Order results by average salary descending.

**Challenge 2:** Find all departments where the average salary exceeds ₹65,000 AND the headcount is at least 5. Use `GROUP BY` with `HAVING`.

**Challenge 3:** Write a query that shows, for each `job_title`, the number of employees with that title, the minimum salary, and the maximum salary. Only include job titles that appear more than 3 times.

**Challenge 4:** Find the year with the most employee hires. Show the `hire_year` and the count of hires for that year only. (You need to GROUP BY the extracted year from `hire_date`.)

**Challenge 5:** A manager asks: "Show me departments where more than 20% of employees are inactive." Write the query using `GROUP BY` and `HAVING` with aggregate expressions.

---

## 💼 25 Interview Questions — Day 06

1. What does `GROUP BY` do in SQL? At which execution step does it run?
2. Explain the Golden Rule of `GROUP BY` — which columns must be in GROUP BY?
3. What is `HAVING` and how is it different from `WHERE`?
4. Can you use `WHERE` to filter based on the result of an aggregate function? Why not?
5. Can you use `HAVING` without `GROUP BY`?
6. What is the execution order of WHERE, GROUP BY, and HAVING?
7. Write a query to find the department with the highest average salary.
8. What is the difference between grouping by one column vs. two columns?
9. Can you use a column alias from SELECT in a HAVING clause?
10. Write a query to find all job titles that appear more than 5 times.
11. What does `GROUP BY ROLLUP` do?
12. If a GROUP BY query returns 0 rows, what are the likely causes?
13. Write a query to find the total payroll per department.
14. How do NULLs behave in GROUP BY? Are all NULLs grouped together?
15. What is the difference between `HAVING COUNT(*) > 5` and `WHERE count > 5`?
16. How would you find departments with the highest and lowest headcount in one query?
17. Write a query to show the number of employees hired per month of 2023.
18. Can you GROUP BY a column that is not in the SELECT list?
19. Write a query that finds, per department, the difference between the max and min salary.
20. Explain this query: `SELECT department_id, AVG(salary) FROM employees GROUP BY 1` — what does GROUP BY 1 mean?
21. A query uses `GROUP BY` on 3 columns. How many groups are possible at maximum?
22. What is `GROUP BY CUBE`?
23. You have a query that counts orders per customer. How do you find customers with exactly 0 orders? (Preview of JOINs.)
24. Write a query to find the most common job title in the company.
25. Business question: "Which departments have a salary spread (max - min) greater than ₹40,000?" Write the SQL.

---

# DAY 07 — Data Types, Casting & Expressions

## 📚 Concept Deep-Dive

### Why Data Types Matter for Analysts
Data analysts frequently encounter data type mismatches when joining tables, performing arithmetic, or building reports. Understanding casting prevents silent data corruption and query errors.

### Type Casting: CAST and ::
```sql
-- Standard SQL CAST syntax
SELECT CAST('2024-01-15' AS DATE);
SELECT CAST(salary AS VARCHAR);
SELECT CAST('125.50' AS DECIMAL(10,2));
SELECT CAST(is_active AS INTEGER);  -- TRUE → 1, FALSE → 0

-- PostgreSQL shorthand (:: operator)
SELECT '2024-01-15'::DATE;
SELECT salary::VARCHAR;
SELECT '125.50'::DECIMAL(10,2);
```

### Implicit vs. Explicit Casting
```sql
-- Implicit casting (database does it automatically)
SELECT 5 + 2.0;  -- Result: 7.0 (integer is implicitly cast to decimal)

-- Explicit casting is always safer and more readable
SELECT CAST(5 AS DECIMAL) / 2;  -- Result: 2.5 (not 2!)

-- Integer division trap
SELECT 5 / 2;    -- Result: 2 (integer division in most databases!)
SELECT 5.0 / 2;  -- Result: 2.5 (one operand is decimal)
```

### Numeric Data Types Deep Dive
| Type | Storage | Precision | Use Case |
|---|---|---|---|
| SMALLINT | 2 bytes | -32,768 to 32,767 | Age, rating |
| INT / INTEGER | 4 bytes | ~±2.1 billion | IDs, counts |
| BIGINT | 8 bytes | ~±9.2 quintillion | Large IDs, timestamps |
| DECIMAL(p,s) / NUMERIC(p,s) | Variable | Exact | Currency, financial |
| FLOAT / DOUBLE | 4-8 bytes | Approximate | Scientific data |

> **Critical:** Never use `FLOAT` for money. Floating-point arithmetic is approximate.
> ```sql
> SELECT 0.1 + 0.2 = 0.3;  -- Result: FALSE (floating point imprecision!)
> SELECT CAST(0.1 AS DECIMAL(10,1)) + CAST(0.2 AS DECIMAL(10,1)) = 0.3;  -- TRUE
> ```

### Text / String Data Types
| Type | Behavior | Use Case |
|---|---|---|
| CHAR(n) | Fixed-length, right-padded with spaces | Country code 'IN', state code |
| VARCHAR(n) | Variable-length, max n characters | Names, emails |
| TEXT | Unlimited length | Descriptions, comments |

### Date/Time Data Types
```sql
DATE        -- '2024-01-15'               (date only)
TIME        -- '14:30:00'                 (time only)
TIMESTAMP   -- '2024-01-15 14:30:00'      (date and time, no timezone)
TIMESTAMPTZ -- '2024-01-15 14:30:00+05:30' (with timezone — preferred)
INTERVAL    -- '3 months', '7 days'       (a duration)
```

### Expressions and Computed Columns
```sql
-- Arithmetic
SELECT
    salary,
    salary * 12                    AS annual_salary,
    salary * 0.20                  AS tax_deduction,
    salary - (salary * 0.20)       AS net_monthly_salary,
    ROUND((salary / 100000.0) * 100, 2) AS salary_pct_of_100k
FROM employees;

-- String expressions
SELECT
    UPPER(first_name)                              AS upper_name,
    LOWER(email)                                   AS lower_email,
    LENGTH(job_title)                              AS title_length,
    first_name || ' ' || last_name                AS full_name,
    TRIM('   hello   ')                            AS trimmed  -- 'hello'
FROM employees;
```

### TRY_CAST / Safe Casting
```sql
-- SQL Server: TRY_CAST returns NULL instead of error on invalid cast
SELECT TRY_CAST('not_a_number' AS INT);  -- Returns: NULL (not an error)

-- PostgreSQL equivalent using REGEXP
SELECT CASE
    WHEN value ~ '^[0-9]+$' THEN CAST(value AS INT)
    ELSE NULL
END FROM my_table;
```

---

## 🛠️ Day 07 Hands-On Challenges

**Dataset:** A `raw_data` table with columns stored as text (text_salary, text_hire_date, text_is_active, text_department_id)

**Challenge 1:** Write a query that casts `text_salary` to `DECIMAL(10,2)` and `text_hire_date` to `DATE`. Display both alongside the original text columns.

**Challenge 2:** Demonstrate the integer division problem: write a query that incorrectly computes `salary / workdays` (both integers), then fix it using explicit casting.

**Challenge 3:** Create a query that concatenates `first_name` and `last_name` from the employees table as `full_name`, converts it to uppercase, and shows the length of the resulting full name as `name_length`.

**Challenge 4:** You have a `financial_data` table with `amount FLOAT`. Show why using `FLOAT` for currency comparison is problematic by writing a query that compares a computed float sum to an expected value. Then redesign the column type in a CREATE TABLE statement using `DECIMAL`.

**Challenge 5:** Write a query that safely converts text values in a `category_id` column to integers using `CASE WHEN` and a regular expression check (to avoid cast errors). Return NULL for non-numeric values.

---

## 💼 25 Interview Questions — Day 07

1. What is the difference between `CAST` and `::` in PostgreSQL?
2. What is the difference between `DECIMAL` and `FLOAT`? Why should you never use `FLOAT` for financial data?
3. What is integer division? How do you force decimal division in SQL?
4. What is the difference between `CHAR(n)`, `VARCHAR(n)`, and `TEXT`?
5. What is `TIMESTAMP` vs. `TIMESTAMPTZ`? When would you use each?
6. What is implicit casting? Give an example where it might cause unexpected behavior.
7. What is `TRY_CAST` in SQL Server and what problem does it solve?
8. What is `DECIMAL(10, 2)`? What is the maximum value it can store?
9. Why does `SELECT 0.1 + 0.2 = 0.3` return FALSE in SQL?
10. What is an `INTERVAL` data type used for?
11. How do you convert a boolean to an integer in SQL?
12. What is the difference between `UPPER()` and `LOWER()`? Give a real use case.
13. Write a query that displays the annual salary for each employee from a monthly salary column.
14. What does `TRIM()` do? What are `LTRIM()` and `RTRIM()`?
15. How do you concatenate two string columns in SQL? Does the syntax differ across databases?
16. What is `LENGTH()` vs. `CHAR_LENGTH()`?
17. A column was imported as VARCHAR but needs to be used in arithmetic. How do you handle this?
18. Explain data type precedence in SQL expressions (e.g., INT + DECIMAL = ?).
19. What is the `COERCE` concept in database systems?
20. You receive a text column with values like '₹75,000.00'. Write a query to convert it to a usable numeric value.
21. What is the BOOLEAN data type and which values does it accept?
22. What is the maximum number of characters a `VARCHAR(255)` column can store?
23. In SQL, what is the difference between the string '5' and the number 5?
24. Why would a JOIN fail silently (return fewer rows than expected) when joining an INT column to a VARCHAR column?
25. A data pipeline imports all columns as TEXT. List 5 data types you would cast each column to and explain why.

---

# DAY 08 — CASE WHEN (Conditional Logic)

## 📚 Concept Deep-Dive

### What is CASE WHEN?
`CASE WHEN` is SQL's conditional expression — it's the equivalent of `IF/ELSE` from programming. It evaluates conditions row-by-row and returns a value based on the first matching condition.

### Syntax: Simple CASE vs. Searched CASE

#### Simple CASE (equality checks only)
```sql
SELECT
    employee_id,
    department_id,
    CASE department_id
        WHEN 1 THEN 'Engineering'
        WHEN 2 THEN 'Sales'
        WHEN 3 THEN 'HR'
        WHEN 4 THEN 'Finance'
        ELSE 'Other'
    END AS department_name
FROM employees;
```

#### Searched CASE (any condition, most flexible)
```sql
SELECT
    employee_id,
    salary,
    CASE
        WHEN salary >= 100000 THEN 'Senior Level'
        WHEN salary >= 70000  THEN 'Mid Level'
        WHEN salary >= 40000  THEN 'Junior Level'
        ELSE 'Entry Level'
    END AS salary_band
FROM employees;
```

> **Execution:** `CASE WHEN` evaluates conditions **top to bottom** and returns the value of the **first match**. Once matched, it stops checking remaining conditions — order matters!

### CASE WHEN in SELECT, WHERE, ORDER BY, GROUP BY
```sql
-- In SELECT (most common use)
SELECT first_name,
       CASE WHEN is_active THEN 'Active' ELSE 'Inactive' END AS status
FROM employees;

-- In ORDER BY (custom sort order)
SELECT first_name, job_title
FROM employees
ORDER BY
    CASE job_title
        WHEN 'CEO' THEN 1
        WHEN 'VP' THEN 2
        WHEN 'Director' THEN 3
        ELSE 4
    END;

-- In GROUP BY (create dynamic categories)
SELECT
    CASE
        WHEN salary >= 100000 THEN 'High'
        WHEN salary >= 60000  THEN 'Medium'
        ELSE 'Low'
    END AS salary_bracket,
    COUNT(*) AS headcount
FROM employees
GROUP BY
    CASE
        WHEN salary >= 100000 THEN 'High'
        WHEN salary >= 60000  THEN 'Medium'
        ELSE 'Low'
    END;

-- In WHERE (conditional filtering)
SELECT *
FROM orders
WHERE
    CASE
        WHEN status = 'priority' THEN amount
        ELSE 0
    END > 1000;
```

### CASE WHEN for Conditional Aggregation
This is the **most powerful** and interview-frequent use of CASE WHEN.
```sql
-- Count by category in a SINGLE query (pivot-style)
SELECT
    COUNT(*)                                      AS total_employees,
    COUNT(CASE WHEN department_id = 1 THEN 1 END) AS engineering_count,
    COUNT(CASE WHEN department_id = 2 THEN 1 END) AS sales_count,
    SUM(CASE WHEN is_active THEN salary ELSE 0 END) AS active_payroll,
    AVG(CASE WHEN gender = 'F' THEN salary END)   AS avg_female_salary
FROM employees;
```

### IIF — Shorthand (SQL Server / Access)
```sql
-- SQL Server shorthand for simple CASE:
SELECT IIF(salary > 70000, 'High', 'Low') AS pay_tier
FROM employees;
```

---

## 🛠️ Day 08 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, salary, department_id, is_active, hire_date, gender)

**Challenge 1:** Write a query that classifies each employee into a salary band: 'Top Earner' (>₹90,000), 'Senior' (₹60,001–₹90,000), 'Mid' (₹35,001–₹60,000), 'Junior' (≤₹35,000). Display `first_name`, `salary`, and `salary_band`.

**Challenge 2:** Write a query using **conditional aggregation** that shows, in a SINGLE row: total employees, count of Engineering employees (dept 1), count of Sales employees (dept 2), count of HR employees (dept 3), and total payroll.

**Challenge 3:** The company wants to give raises: Engineering gets 15%, Sales gets 10%, all others get 5%. Write a query that shows `first_name`, `current_salary`, and `new_salary` (using CASE WHEN on department_id).

**Challenge 4:** Write a query that sorts employees by a custom priority order: CEOs first, then Directors, then Managers, then all other job titles alphabetically.

**Challenge 5:** Using CASE WHEN without GROUP BY, write a query that shows for each employee a column `tenure_category`: 'Veteran' (hired before 2018), 'Experienced' (2018-2021), 'New Hire' (after 2021). Then, write a second query using GROUP BY on this CASE WHEN expression to count employees in each category.

---

## 💼 25 Interview Questions — Day 08

1. What is `CASE WHEN` in SQL and what is its purpose?
2. What is the difference between Simple CASE and Searched CASE?
3. In what order does CASE WHEN evaluate its conditions? Why does this matter?
4. What happens if no condition matches and there is no ELSE clause?
5. Can CASE WHEN return different data types in different WHEN branches?
6. Write a query that uses CASE WHEN to create a 'Pay Grade' column (A, B, C, D) based on salary ranges.
7. What is conditional aggregation? Write an example.
8. How do you use CASE WHEN inside an aggregate function?
9. Can CASE WHEN be used in the WHERE clause? Give an example.
10. Can CASE WHEN be nested? Show an example.
11. What is `IIF` and in which database is it supported?
12. How would you use CASE WHEN to implement a custom sort order?
13. How is CASE WHEN used to "pivot" data (transform rows into columns)?
14. Write a query that counts male and female employees in separate columns using conditional aggregation.
15. What is the output data type of a CASE WHEN expression with mixed THEN data types?
16. Can CASE WHEN handle NULL values? Write an example.
17. How do you use CASE WHEN to classify dates (e.g., Q1, Q2, Q3, Q4)?
18. What is the performance difference between multiple WHERE conditions vs. CASE WHEN?
19. Write a query that gives a 20% discount to category 'Electronics', 10% to 'Clothing', and 0% to others in an orders table.
20. Explain why `COUNT(CASE WHEN condition THEN 1 END)` works as a conditional count.
21. What is the difference between `COUNT(CASE WHEN ... THEN 1 END)` and `SUM(CASE WHEN ... THEN 1 ELSE 0 END)`?
22. A business wants a report showing the salary-to-bonus ratio categorized as 'Generous' (>20%), 'Standard' (10-20%), and 'Low' (<10%). Write the query.
23. How do you use CASE WHEN to replace IIF across all databases?
24. Write a query to flag orders as 'Late' if shipped more than 7 days after order date, 'On Time' otherwise.
25. You have a column `status_code` with values 1, 2, 3. Map them to 'Pending', 'Active', 'Closed' using CASE WHEN. Which type of CASE is most appropriate?

---

# DAY 09 — Understanding Relationships & INNER JOIN

## 📚 Concept Deep-Dive

### Why JOINs Exist
In a normalized relational database, data is split across multiple tables to avoid redundancy. JOINs **reassemble** this data when needed for querying. The cost of JOIN operations is why query optimization matters — JOIN runs at **Step 2** of the SQL Order of Execution.

### Types of JOINs (Overview)
```
INNER JOIN      — Only matching rows from BOTH tables
LEFT JOIN       — All rows from left + matching rows from right
RIGHT JOIN      — All rows from right + matching rows from left
FULL OUTER JOIN — All rows from both tables
CROSS JOIN      — Every row from left combined with every row from right (Cartesian product)
SELF JOIN       — A table joined to itself
```

### INNER JOIN — The Most Common JOIN
Returns only rows where the join condition is **TRUE in both tables**.

```sql
-- Basic INNER JOIN syntax
SELECT
    e.employee_id,
    e.first_name,
    e.last_name,
    d.department_name,
    e.salary
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.department_id;
-- Only employees WITH a matching department appear in results
-- Employees with NULL department_id are EXCLUDED
```

### Table Aliases — Best Practice
```sql
-- Always use short aliases for readability
FROM employees e
FROM departments d
FROM orders o
FROM customers c
FROM products p

-- Multi-table join with aliases
SELECT
    e.first_name,
    e.last_name,
    d.department_name,
    j.job_title_description
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
INNER JOIN job_levels j ON e.job_level_id = j.job_level_id;
```

### JOIN on Multiple Conditions (Composite Join)
```sql
-- Join on more than one column
SELECT *
FROM orders o
INNER JOIN order_items oi
    ON o.order_id = oi.order_id
   AND o.tenant_id = oi.tenant_id;  -- Multi-tenant safety check
```

### JOIN with WHERE (Filtering After JOIN)
```sql
-- Filter after joining
SELECT e.first_name, d.department_name, e.salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.department_id
WHERE e.salary > 60000
  AND d.department_name = 'Engineering';
```

### Equi-Join vs. Non-Equi Join
```sql
-- Equi-Join (equality condition — most common)
ON e.department_id = d.department_id

-- Non-Equi Join (range or inequality condition)
SELECT e.first_name, e.salary, sg.grade
FROM employees e
INNER JOIN salary_grades sg
    ON e.salary BETWEEN sg.min_salary AND sg.max_salary;
```

### Understanding the Result Set
```sql
-- employees: 100 rows
-- departments: 10 rows
-- After INNER JOIN: could be 0 to many rows
-- If every employee has a valid department_id → 100 rows
-- If 5 employees have NULL department_id → 95 rows
-- If all department_ids are invalid → 0 rows
```

---

## 🛠️ Day 09 Hands-On Challenges

**Datasets:** `employees` (employee_id, first_name, last_name, salary, department_id), `departments` (department_id, department_name, location), `job_titles` (job_title_id, title_name, min_salary, max_salary)

**Challenge 1:** Write a query that shows each employee's `first_name`, `last_name`, `salary`, and their `department_name`. Use INNER JOIN to link employees to departments.

**Challenge 2:** Extend Challenge 1 to include a third table: `job_titles`. Join the employees table to `job_titles` on `job_title_id`. Display `first_name`, `department_name`, and `title_name`.

**Challenge 3:** Write a query to find all employees in the 'Sales' department with a salary above ₹60,000. Use INNER JOIN and filter with WHERE.

**Challenge 4:** Using a non-equi JOIN, write a query that maps each employee's salary to a salary grade from the `salary_grades` table (columns: grade, min_salary, max_salary). Display `first_name`, `salary`, and `grade`.

**Challenge 5:** Count how many employees are in each department. Display `department_name` and `employee_count`. Sort by `employee_count` descending. (Use INNER JOIN + GROUP BY.)

---

## 💼 25 Interview Questions — Day 09

1. What is a JOIN in SQL and why is it necessary?
2. What is an INNER JOIN? What rows does it exclude?
3. At which step of SQL Order of Execution does JOIN run?
4. What is a table alias and why is it recommended?
5. What is the difference between `JOIN` and `INNER JOIN`? Are they the same?
6. What happens when you join on a column that has NULL values?
7. Write a query that joins employees to departments and shows only the department name and headcount.
8. What is a composite join? Give a real-world example.
9. What is a non-equi join? Give a business example.
10. How many rows can an INNER JOIN produce between two tables with 100 and 10 rows?
11. What is a foreign key and how does it relate to JOIN operations?
12. Write a query to join 3 tables: employees, departments, and office_locations.
13. What is the difference between filtering with WHERE and filtering with ON in a JOIN?
14. Can you JOIN a table to itself? Is that an INNER JOIN?
15. What is referential integrity and what happens to JOINs when it is violated?
16. What is a Cartesian product and how does it happen accidentally in JOINs?
17. Write a query to find all employees whose department is located in 'Mumbai'.
18. Can you JOIN on a non-key column? What are the risks?
19. What is the visual representation (Venn diagram) of INNER JOIN?
20. What is the difference between a fact table and a dimension table in data warehouse context?
21. Write a query to find managers (employees whose employee_id appears as manager_id for someone else). (Preview of self join.)
22. What are the performance implications of JOIN on large tables?
23. When is it appropriate to use a JOIN vs. a subquery?
24. What index would you create to optimize an INNER JOIN query?
25. A business asks: "List all employees with their team lead names." Given one employees table that stores manager relationships, how would you approach this?

---

# DAY 10 — LEFT, RIGHT & FULL OUTER JOIN

## 📚 Concept Deep-Dive

### LEFT JOIN (LEFT OUTER JOIN)
Returns **all rows from the LEFT table** + matching rows from the right table. If no match exists in the right table, the right-side columns are filled with `NULL`.

```sql
-- ALL employees, even those with no department
SELECT
    e.first_name,
    e.last_name,
    d.department_name  -- NULL for unmatched employees
FROM employees e
LEFT JOIN departments d
    ON e.department_id = d.department_id;
-- Every employee row appears; unmatched employees show NULL for department columns
```

### RIGHT JOIN (RIGHT OUTER JOIN)
Returns **all rows from the RIGHT table** + matching rows from the left table. Right JOINs can always be rewritten as LEFT JOINs (just swap table order) — most developers prefer LEFT JOIN for consistency.

```sql
-- ALL departments, even those with no employees
SELECT
    e.first_name,       -- NULL if no employees in this department
    d.department_name
FROM employees e
RIGHT JOIN departments d
    ON e.department_id = d.department_id;

-- Equivalent LEFT JOIN (preferred style):
SELECT
    e.first_name,
    d.department_name
FROM departments d
LEFT JOIN employees e
    ON e.department_id = d.department_id;
```

### FULL OUTER JOIN
Returns **all rows from BOTH tables**. NULLs fill in for unmatched sides.

```sql
SELECT
    e.first_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d
    ON e.department_id = d.department_id;
-- Rows: employees without dept (NULL dept name) + depts without employees (NULL names)
```

> **MySQL does not support FULL OUTER JOIN natively.** Simulate it with UNION:
> ```sql
> SELECT e.first_name, d.department_name
> FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id
> UNION
> SELECT e.first_name, d.department_name
> FROM employees e RIGHT JOIN departments d ON e.department_id = d.department_id;
> ```

### Finding Unmatched Rows (Anti-Join Pattern)
```sql
-- Find employees who have NO department (dangling employees)
SELECT e.first_name, e.employee_id
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
WHERE d.department_id IS NULL;  -- The IS NULL check on the right table = "no match"

-- Find departments with NO employees
SELECT d.department_name
FROM departments d
LEFT JOIN employees e ON e.department_id = d.department_id
WHERE e.employee_id IS NULL;
```

> **Anti-Join is one of the most important data quality patterns in analytics.**

### LEFT JOIN vs. INNER JOIN: Choosing the Right One
| Question | Use |
|---|---|
| "Show me all X even if there's no matching Y" | LEFT JOIN |
| "Show me only X that have a matching Y" | INNER JOIN |
| "Find X that do NOT have a matching Y" | LEFT JOIN + WHERE right_key IS NULL |

### Multiple LEFT JOINs
```sql
SELECT
    e.first_name,
    d.department_name,
    m.first_name AS manager_name  -- NULL if no manager
FROM employees e
LEFT JOIN departments d ON e.department_id = d.department_id
LEFT JOIN employees m ON e.manager_id = m.employee_id;
-- Even employees with no manager are included
```

---

## 🛠️ Day 10 Hands-On Challenges

**Datasets:** `employees`, `departments`, `projects` (project_id, project_name, lead_employee_id), `employee_projects` (employee_id, project_id)

**Challenge 1:** Write a query to list ALL employees, including those without a department. Show `first_name`, `last_name`, and `department_name` (show NULL for employees with no department).

**Challenge 2:** Write a query to find all employees who are NOT assigned to any project. Use LEFT JOIN on `employee_projects` and filter for NULLs.

**Challenge 3:** Write a query to find all departments that have NO employees. Use the appropriate JOIN type and anti-join pattern.

**Challenge 4:** Write a query using FULL OUTER JOIN between `employees` and `departments` to show all unmatched records from both sides. Show `first_name` and `department_name`, filtering to only show rows where either side is NULL.

**Challenge 5:** A manager wants to see all employees and, if they have a manager, show the manager's name. If they have no manager (top-level employees), show 'No Manager' instead of NULL. Use LEFT JOIN (self-join preview) and COALESCE.

---

## 💼 25 Interview Questions — Day 10

1. What is the difference between INNER JOIN and LEFT JOIN?
2. What is a LEFT JOIN? What happens to unmatched rows from the left table?
3. What is a RIGHT JOIN? Can it always be rewritten as a LEFT JOIN?
4. What is FULL OUTER JOIN? Give a real-world use case.
5. Does MySQL support FULL OUTER JOIN? How do you simulate it?
6. Write a query to find all employees without a department.
7. What is the Anti-Join pattern? Write an example.
8. What is the difference between `WHERE d.department_id IS NULL` (after LEFT JOIN) and `WHERE d.department_id IS NOT NULL`?
9. Can you use a WHERE clause on a LEFT JOIN without converting it to an INNER JOIN?
10. What does filtering the RIGHT table in the ON clause vs. the WHERE clause do in a LEFT JOIN?
11. Write a query to show all departments with their employee count, including departments with 0 employees.
12. What is a NULL row in the context of an OUTER JOIN?
13. What is the visual Venn diagram representation of LEFT JOIN with the IS NULL filter?
14. How do multiple LEFT JOINs work when one of the intermediate joins produces a NULL?
15. Write a query to compare data between two tables (find rows in table A not in table B).
16. What is the difference between NOT IN, NOT EXISTS, and LEFT JOIN anti-join?
17. When would you use FULL OUTER JOIN in a real data engineering project?
18. What is the order of multiple JOINs in SQL? Is it left-to-right?
19. Can you OUTER JOIN on a non-key column?
20. Write a query to find all products that have never been ordered.
21. Explain why this query is wrong for finding employees without a department: `SELECT * FROM employees WHERE department_id IS NULL`.
22. What happens to aggregate functions when LEFT JOIN produces NULL rows?
23. How do you count employees per department including departments with 0 employees?
24. What is the difference between `JOIN ... ON condition AND other_condition` vs. `JOIN ... ON condition WHERE other_condition`?
25. A data quality report needs to identify orphaned records (rows in a child table with no matching parent). Write the query pattern.

---

# DAY 11 — SELF JOIN & Multi-Table Queries

## 📚 Concept Deep-Dive

### What is a SELF JOIN?
A SELF JOIN is when a table is joined to **itself**. This is necessary when a table has a **hierarchical or recursive relationship** — the most common being an employees table where each employee has a `manager_id` that references another `employee_id` in the same table.

```sql
-- Employee table has: employee_id, first_name, manager_id
-- manager_id references employee_id of the manager (who is also an employee)

-- Self JOIN to show employee + their manager's name
SELECT
    e.employee_id,
    e.first_name    AS employee_name,
    e.salary        AS employee_salary,
    m.first_name    AS manager_name
FROM employees e            -- e = the employee
INNER JOIN employees m      -- m = the same table, representing the manager
    ON e.manager_id = m.employee_id;

-- Use LEFT JOIN to include top-level employees (who have no manager):
SELECT
    e.first_name   AS employee_name,
    COALESCE(m.first_name, 'Top-Level') AS manager_name
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.employee_id;
```

### Finding Peers (employees in the same department)
```sql
-- Find all pairs of employees in the same department
SELECT
    a.first_name AS employee1,
    b.first_name AS employee2,
    a.department_id
FROM employees a
INNER JOIN employees b
    ON a.department_id = b.department_id
   AND a.employee_id < b.employee_id;  -- Prevent duplicates and self-pairing
-- a.employee_id < b.employee_id ensures (Alice, Bob) appears but not (Bob, Alice) or (Alice, Alice)
```

### Multi-Table Queries — Best Practices
```sql
-- Joining 4+ tables: define relationships clearly
SELECT
    o.order_id,
    c.customer_name,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    oi.quantity * oi.unit_price AS line_total,
    e.first_name AS sales_rep
FROM orders o
INNER JOIN customers c     ON o.customer_id = c.customer_id
INNER JOIN order_items oi  ON o.order_id = oi.order_id
INNER JOIN products p      ON oi.product_id = p.product_id
LEFT JOIN employees e      ON o.sales_rep_id = e.employee_id;  -- LEFT: some orders may have no rep
```

### CROSS JOIN — All Combinations
```sql
-- Generates every combination of rows from two tables
SELECT a.size, b.color
FROM sizes a
CROSS JOIN colors b;
-- 5 sizes × 4 colors = 20 combination rows

-- Real use case: generate a date range or all possible category combinations
SELECT d.date, p.product_id
FROM date_dimension d
CROSS JOIN products p
WHERE d.date BETWEEN '2024-01-01' AND '2024-12-31';
```

### LATERAL JOIN (PostgreSQL) / APPLY (SQL Server)
```sql
-- LATERAL allows the right side to reference columns from the left table
SELECT e.first_name, e.salary, latest_order.order_date
FROM employees e
CROSS JOIN LATERAL (
    SELECT order_date
    FROM orders o
    WHERE o.sales_rep_id = e.employee_id
    ORDER BY order_date DESC
    LIMIT 1
) latest_order;
```

---

## 🛠️ Day 11 Hands-On Challenges

**Datasets:** `employees` (employee_id, first_name, salary, department_id, manager_id), `departments`, `orders` (order_id, customer_id, sales_rep_id, order_date)

**Challenge 1:** Write a SELF JOIN query to display each employee's name and their direct manager's name. Employees with no manager should show 'No Manager' (use COALESCE).

**Challenge 2:** Find all employees who earn MORE than their direct manager. Show the employee's name, their salary, the manager's name, and the manager's salary.

**Challenge 3:** Using SELF JOIN, find all pairs of employees who work in the same department but are different people. Ensure each pair appears only once (A,B not B,A).

**Challenge 4:** Write a multi-table query joining `orders`, `customers`, `order_items`, and `products` to show the top 5 most valuable orders (total revenue = sum of quantity × unit_price per order).

**Challenge 5:** Write a CROSS JOIN query to generate all possible product-store combinations from a `products` table and a `stores` table. This would be used to populate a full sales matrix (even showing 0-sale combinations).

---

## 💼 25 Interview Questions — Day 11

1. What is a SELF JOIN? Give a real-world use case.
2. Why do you need to alias the same table twice in a SELF JOIN?
3. Write a query to find all employees and their manager's name from a single employees table.
4. Why would you use LEFT JOIN instead of INNER JOIN in a self-referencing query?
5. Write a query to find employees who earn more than their manager.
6. How do you prevent duplicate pairs in a peer-finding SELF JOIN query?
7. What is a CROSS JOIN? When is it actually useful?
8. What is the result size of a CROSS JOIN between a 100-row and 50-row table?
9. What is a LATERAL JOIN in PostgreSQL?
10. How do you join 4 tables efficiently? What is the recommended approach?
11. What is the risk of having too many JOINs in a single query?
12. What is a hierarchical relationship? Give 3 business examples.
13. How would you find the second-level managers (managers of managers) using SELF JOIN?
14. What is the difference between a CROSS JOIN and a full Cartesian product from an accidental missing ON clause?
15. Write a query to find all departments that have employees who earn more than the department average.
16. What is a "fan-out" problem in multi-table JOIN queries and how does it affect aggregates?
17. How do you debug a query that returns more rows than expected from a multi-table JOIN?
18. What is the difference between a SELF JOIN and a recursive CTE (preview of Day 13)?
19. Explain how CROSS JOIN could be used to generate a report grid.
20. In a star schema, how do fact tables and dimension tables typically join?
21. Write a query to find all top-level managers (employees who manage at least one person but have no manager themselves).
22. Why does a CROSS JOIN not require an ON clause?
23. What is the performance implication of a CROSS JOIN on large tables?
24. Write a query to count how many direct reports each manager has.
25. If the employees table has 10,000 rows and you accidentally forget the ON clause in a SELF JOIN, how many rows would the result have?

---

# DAY 12 — Subqueries

## 📚 Concept Deep-Dive

### What is a Subquery?
A subquery (also called an inner query or nested query) is a SQL query nested inside another query. The inner query runs first and passes its result to the outer query.

### Types of Subqueries by Location
```sql
-- 1. Subquery in WHERE
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- 2. Subquery in FROM (Derived Table / Inline View)
SELECT dept_avg.department_id, dept_avg.avg_sal
FROM (
    SELECT department_id, AVG(salary) AS avg_sal
    FROM employees
    GROUP BY department_id
) AS dept_avg
WHERE dept_avg.avg_sal > 60000;

-- 3. Subquery in SELECT (Scalar Subquery)
SELECT
    employee_id,
    first_name,
    salary,
    (SELECT AVG(salary) FROM employees) AS company_avg,  -- same value for all rows
    salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM employees;

-- 4. Subquery in HAVING
SELECT department_id, AVG(salary) AS dept_avg
FROM employees
GROUP BY department_id
HAVING AVG(salary) > (SELECT AVG(salary) FROM employees);
```

### Correlated vs. Non-Correlated Subqueries
```sql
-- NON-CORRELATED: inner query runs ONCE, independently of outer query
SELECT * FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
-- AVG(salary) is computed once and reused for all rows

-- CORRELATED: inner query runs ONCE PER ROW of the outer query
SELECT e.first_name, e.salary, e.department_id
FROM employees e
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE department_id = e.department_id  -- References outer query's e.department_id
);
-- For each employee row, the subquery computes average for THAT employee's department
-- This is expensive on large tables but very powerful
```

### IN and EXISTS with Subqueries
```sql
-- IN with subquery (returns list of values)
SELECT first_name FROM employees
WHERE department_id IN (
    SELECT department_id FROM departments
    WHERE location = 'Mumbai'
);

-- EXISTS with subquery (returns TRUE/FALSE per row — often faster)
SELECT d.department_name
FROM departments d
WHERE EXISTS (
    SELECT 1 FROM employees e
    WHERE e.department_id = d.department_id
    AND e.salary > 100000
);

-- NOT EXISTS (find departments with NO high earners)
SELECT d.department_name
FROM departments d
WHERE NOT EXISTS (
    SELECT 1 FROM employees e
    WHERE e.department_id = d.department_id
    AND e.salary > 100000
);
```

### EXISTS vs. IN Performance
```sql
-- EXISTS is generally faster when:
-- - The outer result set is large
-- - The inner result may have duplicates (EXISTS short-circuits at first match)

-- IN is simpler and fine for small subquery result sets
-- IN with NULL in the list behaves unpredictably (avoid NOT IN with nullable columns)
```

### Derived Tables (Subquery in FROM)
```sql
-- Calculate per-department stats, then filter and rank
SELECT *
FROM (
    SELECT
        department_id,
        COUNT(*) AS headcount,
        AVG(salary) AS avg_salary,
        RANK() OVER (ORDER BY AVG(salary) DESC) AS salary_rank  -- preview window functions
    FROM employees
    GROUP BY department_id
) AS dept_stats
WHERE headcount >= 5
ORDER BY salary_rank;
```

---

## 🛠️ Day 12 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, salary, department_id), `departments` (department_id, department_name, location)

**Challenge 1:** Write a query using a subquery in WHERE to find all employees who earn more than the company's average salary. Show their `first_name`, `salary`, and the company average for comparison.

**Challenge 2:** Write a correlated subquery to find employees who earn more than the average salary of their own department.

**Challenge 3:** Using a subquery in FROM (derived table), compute the average salary per department, then filter to show only departments with an average salary above ₹65,000.

**Challenge 4:** Write a query using `EXISTS` to find all departments that have at least one employee earning above ₹90,000. Then write the equivalent query using `IN`. Compare the two approaches in a comment.

**Challenge 5:** Write a query using `NOT EXISTS` to find all departments that have NO employees. Compare this approach to the LEFT JOIN + IS NULL anti-join approach from Day 10.

---

## 💼 25 Interview Questions — Day 12

1. What is a subquery? In what four locations can it appear?
2. What is the difference between a correlated and a non-correlated subquery?
3. Which runs first: the inner query or the outer query?
4. What is a derived table (inline view)?
5. What is a scalar subquery? What happens if it returns more than one row?
6. What is the difference between `IN` and `EXISTS`?
7. When is `EXISTS` preferred over `IN` for performance?
8. Write a query to find employees who earn above the company average.
9. What is the risk of using `NOT IN` when the subquery can return NULL values?
10. Write a query using `NOT EXISTS` to find customers with no orders.
11. What is a correlated subquery? Write an example.
12. Can a subquery reference columns from the outer query?
13. What is the difference between a subquery and a JOIN?
14. When should you use a subquery vs. a JOIN?
15. What is the performance impact of a correlated subquery on 1 million rows?
16. Write a query to find the 2nd highest salary using a subquery (without LIMIT/OFFSET or window functions).
17. What is the difference between a scalar subquery and a table-returning subquery?
18. Can a subquery appear in the GROUP BY clause?
19. Write a query to find all departments where the top earner is above ₹1,00,000.
20. What is a subquery factoring (WITH clause)? (Preview of CTEs.)
21. What does `SELECT 1` inside an EXISTS clause mean?
22. Can you use ORDER BY inside a subquery? Does it have any effect?
23. Write a query using a subquery to find the department with the most employees.
24. Explain the concept of "query within a query" to a non-technical person.
25. What is the difference between a view and a derived table (inline subquery)?

---

# DAY 13 — CTEs (Common Table Expressions)

## 📚 Concept Deep-Dive

### What is a CTE?
A Common Table Expression (CTE) is a **named, temporary result set** defined with the `WITH` keyword at the start of a query. It exists only for the duration of the query execution.

### Basic CTE Syntax
```sql
WITH cte_name AS (
    -- Your subquery here
    SELECT ...
    FROM ...
    WHERE ...
)
SELECT *
FROM cte_name;
```

### CTE vs. Derived Table vs. Subquery
| Feature | Subquery | Derived Table | CTE |
|---|---|---|---|
| **Reusability** | Once | Once | Multiple times in same query |
| **Readability** | Low | Medium | High |
| **Recursion** | No | No | Yes (recursive CTE) |
| **Debug-friendliness** | Hard | Medium | Easy (run inner part alone) |

### Multiple CTEs in One Query
```sql
WITH
dept_averages AS (
    SELECT department_id, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department_id
),
top_departments AS (
    SELECT department_id
    FROM dept_averages
    WHERE avg_salary > 70000
)
SELECT e.first_name, e.salary, e.department_id
FROM employees e
INNER JOIN top_departments td ON e.department_id = td.department_id;
```

### Recursive CTE — Organizational Hierarchy
Recursive CTEs allow querying hierarchical data (like org charts, bill of materials, category trees).
```sql
WITH RECURSIVE org_chart AS (
    -- Anchor member: top-level employees (no manager)
    SELECT employee_id, first_name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive member: find employees managed by previous level
    SELECT e.employee_id, e.first_name, e.manager_id, oc.level + 1
    FROM employees e
    INNER JOIN org_chart oc ON e.manager_id = oc.employee_id
)
SELECT employee_id, first_name, level
FROM org_chart
ORDER BY level, employee_id;
```

### CTE Best Practices
```sql
-- CTEs improve readability of complex analytics
WITH
monthly_sales AS (
    SELECT
        EXTRACT(MONTH FROM order_date) AS month,
        SUM(amount) AS total_sales
    FROM orders
    WHERE EXTRACT(YEAR FROM order_date) = 2024
    GROUP BY EXTRACT(MONTH FROM order_date)
),
monthly_avg AS (
    SELECT AVG(total_sales) AS avg_monthly_sales
    FROM monthly_sales
)
SELECT
    ms.month,
    ms.total_sales,
    ma.avg_monthly_sales,
    ms.total_sales - ma.avg_monthly_sales AS diff_from_avg
FROM monthly_sales ms, monthly_avg ma
ORDER BY ms.month;
```

> **Performance Note:** In PostgreSQL, CTEs are **optimization fences** by default (pre-v12). The planner cannot optimize the CTE and outer query together. Use `WITH ... AS MATERIALIZED` or `AS NOT MATERIALIZED` to control this. In newer versions, the optimizer is smarter.

---

## 🛠️ Day 13 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, salary, department_id, manager_id), `orders` (order_id, customer_id, amount, order_date, sales_rep_id)

**Challenge 1:** Rewrite this subquery using a CTE to improve readability:
```sql
SELECT e.first_name, e.salary
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees);
```

**Challenge 2:** Write a multi-CTE query that first computes the department-wise average salary, then identifies "premium departments" (avg > ₹75,000), then shows all employees from those premium departments along with their department's average.

**Challenge 3:** Write a recursive CTE to traverse the employee hierarchy starting from the CEO (the employee with `manager_id IS NULL`). Display each employee's name and their level in the org chart (CEO = Level 1, direct reports = Level 2, etc.).

**Challenge 4:** Using a CTE, compute the monthly revenue for 2024. Then, in the outer query, show each month, its revenue, and whether it is 'Above Average', 'Below Average', or 'Average' compared to the annual monthly average.

**Challenge 5:** Use two chained CTEs to: (1) find the top 5 sales reps by total order value, (2) then look up their employee details (name, department) from the employees table. Display the final ranked result.

---

## 💼 25 Interview Questions — Day 13

1. What is a CTE and what keyword defines it?
2. What is the difference between a CTE and a derived table (subquery in FROM)?
3. Can a CTE be referenced multiple times in the same query?
4. What is a recursive CTE? What are the two parts of a recursive CTE?
5. What is the "anchor member" in a recursive CTE?
6. What happens if a recursive CTE has no termination condition?
7. Write a CTE query to find employees earning above the company average.
8. What is the difference between `WITH RECURSIVE` in PostgreSQL and recursive CTEs in SQL Server?
9. Can a CTE reference another CTE defined before it in the same WITH clause?
10. What is an "optimization fence" in the context of CTEs in PostgreSQL?
11. Write a CTE to traverse an organizational hierarchy 3 levels deep.
12. When should you use a CTE vs. a VIEW?
13. Can CTEs be used with INSERT, UPDATE, or DELETE statements?
14. What is the lifecycle of a CTE — when does it get materialized?
15. Write a multi-CTE query that computes running totals.
16. What is `MATERIALIZED` vs. `NOT MATERIALIZED` in a CTE?
17. What is the maximum depth of recursion in a recursive CTE (in PostgreSQL)?
18. Can you put an ORDER BY inside a CTE? What is the effect?
19. What are the advantages of CTEs over subqueries from a code maintenance perspective?
20. Write a CTE that finds the top 3 departments by headcount.
21. What is a "bill of materials" query and how does a recursive CTE solve it?
22. How do you debug a multi-CTE query?
23. What is the difference between `UNION` and `UNION ALL` inside a recursive CTE?
24. Write a CTE that computes a 3-month rolling average of sales.
25. When should you NOT use a CTE for performance reasons?

---

# DAY 14 — Window Functions Part 1 (Ranking)

## 📚 Concept Deep-Dive

### What are Window Functions?
Window functions perform calculations **across a set of rows related to the current row** — without collapsing those rows the way `GROUP BY` does. They are called "window" functions because each row looks out a "window" of related rows.

### Key Difference: Aggregate vs. Window
```sql
-- Aggregate (GROUP BY): collapses rows
SELECT department_id, AVG(salary)  -- 8 rows returned (one per dept)
FROM employees
GROUP BY department_id;

-- Window function: preserves all rows
SELECT department_id, salary,
       AVG(salary) OVER (PARTITION BY department_id)  -- 100 rows, each with dept avg
FROM employees;
```

### Syntax of OVER()
```sql
function_name() OVER (
    [PARTITION BY column1, column2]  -- define groups (like GROUP BY)
    [ORDER BY column ASC/DESC]       -- define order within window
    [frame_clause]                   -- define window frame (Day 15)
)
```

### Ranking Functions

#### ROW_NUMBER() — Unique sequential number
```sql
SELECT
    first_name,
    salary,
    department_id,
    ROW_NUMBER() OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS row_num
FROM employees;
-- Within each department, assigns 1, 2, 3... regardless of ties
-- Tied salaries get different row numbers (non-deterministic which gets which)
```

#### RANK() — Rank with gaps for ties
```sql
SELECT
    first_name,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank
FROM employees;
-- If two employees have salary 90000:
-- Position 1: 90000
-- Position 1: 90000 (tie)
-- Position 3: 85000 (gap — no position 2)
```

#### DENSE_RANK() — Rank without gaps
```sql
SELECT
    first_name,
    salary,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
-- If two employees tie at position 1:
-- Position 1: 90000
-- Position 1: 90000 (tie)
-- Position 2: 85000 (NO gap — continues from 2)
```

#### NTILE(n) — Divide rows into n equal buckets
```sql
SELECT
    first_name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM employees;
-- Divides all employees into 4 equal salary quartiles (Q1=highest, Q4=lowest)
```

### Practical Patterns

#### Top N per Group (classic interview problem)
```sql
-- Get top 3 earners per department
WITH ranked_employees AS (
    SELECT
        first_name,
        salary,
        department_id,
        RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS salary_rank
    FROM employees
)
SELECT *
FROM ranked_employees
WHERE salary_rank <= 3;
-- Cannot use window function directly in WHERE — must use CTE or subquery!
```

#### Percentile with NTILE
```sql
-- Mark employees in the top 10% salary bracket
WITH salary_percentiles AS (
    SELECT
        first_name,
        salary,
        NTILE(10) OVER (ORDER BY salary DESC) AS decile
    FROM employees
)
SELECT *
FROM salary_percentiles
WHERE decile = 1;  -- Top 10%
```

---

## 🛠️ Day 14 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, salary, department_id, hire_date), `orders` (order_id, customer_id, amount, sales_rep_id, order_date)

**Challenge 1:** Use `ROW_NUMBER()` to assign a unique rank to each employee within their department based on salary (highest = 1). Show `first_name`, `department_id`, `salary`, and `row_num`.

**Challenge 2:** Use both `RANK()` and `DENSE_RANK()` on the entire employees table, ordered by salary descending. Show a case where they produce different results (ties). Display `first_name`, `salary`, `rank`, and `dense_rank` side by side.

**Challenge 3:** Using a CTE with `RANK()`, write a query to find the **top 2 highest-paid employees in each department**. (Remember: you cannot filter on window functions directly in WHERE — use a CTE.)

**Challenge 4:** Use `NTILE(5)` to divide all employees into 5 salary quintiles. Show `first_name`, `salary`, and `quintile`. Then count how many employees fall in each quintile.

**Challenge 5:** Using `ROW_NUMBER()` with `PARTITION BY` and `ORDER BY hire_date ASC`, find the **first employee hired in each department** (the most senior employee per dept). Display their name, department, and hire date.

---

## 💼 25 Interview Questions — Day 14

1. What is a window function? How is it different from an aggregate function?
2. What does the `OVER()` clause do?
3. What is `PARTITION BY` in a window function?
4. What is the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`?
5. When would you use `DENSE_RANK()` instead of `RANK()`?
6. Write a query to rank employees by salary across the entire company.
7. Write a query to rank employees by salary within their department.
8. What is `NTILE(4)` and what does it produce?
9. Why can't you filter on window function results directly in a WHERE clause?
10. How do you get the top N per group using window functions?
11. Write a query to find the 2nd highest salary per department.
12. What happens with ties in `ROW_NUMBER()`?
13. What is a window function "partition"?
14. Can you use multiple window functions with different OVER() clauses in the same SELECT?
15. What is the execution order of window functions in the SQL Order of Execution?
16. Write a query to find employees in the top 25% of earners company-wide.
17. Can you use `PARTITION BY` without `ORDER BY`?
18. What is the difference between `RANK()` and PERCENT_RANK()`?
19. Write a query to find the most recent order per customer.
20. How does `ROW_NUMBER()` handle ties?
21. What is the difference between `NTILE(4)` applied to 10 rows vs. 100 rows?
22. Write a query to assign a "salary tier" (1=highest to 5=lowest) to employees using NTILE.
23. Can you use aggregate functions inside a window function's OVER() clause?
24. What is the performance cost of window functions on large tables?
25. A business report needs the top 3 products by revenue per category. Write the SQL.

---

# DAY 15 — Window Functions Part 2 (Analytic)

## 📚 Concept Deep-Dive

### Analytic Window Functions
These functions look at rows before and after the current row to compute running totals, moving averages, lead/lag comparisons, and cumulative sums.

### LAG and LEAD — Accessing Adjacent Rows
```sql
-- LAG: access the previous row's value
-- LEAD: access the next row's value
LAG(column, offset, default)  OVER (PARTITION BY ... ORDER BY ...)
LEAD(column, offset, default) OVER (PARTITION BY ... ORDER BY ...)

-- Month-over-month sales comparison
SELECT
    month,
    total_sales,
    LAG(total_sales, 1, 0) OVER (ORDER BY month) AS prev_month_sales,
    total_sales - LAG(total_sales, 1, 0) OVER (ORDER BY month) AS mom_change
FROM monthly_sales;

-- Predict next month (or peek at next row)
SELECT
    order_date,
    amount,
    LEAD(amount) OVER (ORDER BY order_date) AS next_order_amount
FROM orders;
```

### SUM OVER — Running Total (Cumulative Sum)
```sql
SELECT
    order_date,
    amount,
    SUM(amount) OVER (
        ORDER BY order_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_total
FROM orders;
```

### Window Frame Clause — Controlling the Window
```sql
-- ROWS vs. RANGE:
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW  -- cumulative from start to current row
ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING          -- 3-row moving window (prev, current, next)
RANGE BETWEEN INTERVAL '7' DAY PRECEDING AND CURRENT ROW  -- 7-day rolling window (by date value)
```

### Moving/Rolling Average
```sql
-- 3-month rolling average of sales
SELECT
    month,
    total_sales,
    AVG(total_sales) OVER (
        ORDER BY month
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW  -- current + 2 prior months
    ) AS rolling_3m_avg
FROM monthly_sales;
```

### FIRST_VALUE and LAST_VALUE
```sql
SELECT
    employee_id,
    salary,
    department_id,
    FIRST_VALUE(salary) OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
    ) AS dept_max_salary,   -- Highest salary in department (same for all rows in dept)
    LAST_VALUE(salary) OVER (
        PARTITION BY department_id
        ORDER BY salary DESC
        ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
    ) AS dept_min_salary    -- IMPORTANT: must extend frame to include all rows
FROM employees;
```

### PERCENT_RANK and CUME_DIST
```sql
SELECT
    salary,
    PERCENT_RANK() OVER (ORDER BY salary) AS pct_rank,  -- 0 to 1
    CUME_DIST() OVER (ORDER BY salary) AS cume_dist      -- 0 to 1
FROM employees;

-- Practical: what percentile is an employee in?
SELECT first_name, salary,
       ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 2) AS salary_percentile
FROM employees;
```

### Combining Window Functions for Complex Analysis
```sql
-- Year-over-year growth analysis
WITH yearly_revenue AS (
    SELECT
        EXTRACT(YEAR FROM order_date) AS year,
        SUM(amount) AS revenue
    FROM orders
    GROUP BY EXTRACT(YEAR FROM order_date)
)
SELECT
    year,
    revenue,
    LAG(revenue) OVER (ORDER BY year)                           AS prev_year_revenue,
    ROUND((revenue - LAG(revenue) OVER (ORDER BY year))
          / LAG(revenue) OVER (ORDER BY year) * 100, 2)         AS yoy_growth_pct,
    SUM(revenue) OVER (ORDER BY year)                           AS cumulative_revenue
FROM yearly_revenue;
```

---

## 🛠️ Day 15 Hands-On Challenges

**Dataset:** `monthly_sales` (month, year, total_sales, region), `orders` (order_id, customer_id, amount, order_date)

**Challenge 1:** Using `LAG()`, compute the month-over-month sales change for each month in 2024. Show: `month`, `total_sales`, `prev_month_sales`, `sales_change`, and `pct_change` (as a percentage).

**Challenge 2:** Using `SUM() OVER()` with the `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` frame clause, compute the running cumulative total of order amounts ordered by `order_date`. Show `order_date`, `amount`, and `running_total`.

**Challenge 3:** Compute a 3-month rolling average of sales. Show months where the rolling average is higher than the actual sales for that month (hint: use a CTE).

**Challenge 4:** Using `FIRST_VALUE()` and `LAST_VALUE()`, find for each employee their department's highest and lowest salary. Make sure to use the correct window frame for `LAST_VALUE`.

**Challenge 5:** Write a query to show each customer's orders, and for each order, flag it as 'Increasing', 'Decreasing', or 'Same' based on whether the order amount is greater than, less than, or equal to the previous order by that same customer (use `LAG()` partitioned by `customer_id`).

---

## 💼 25 Interview Questions — Day 15

1. What is `LAG()` and what is `LEAD()`? Give a practical business use case for each.
2. What is the third parameter in `LAG(column, offset, default)` and when is it useful?
3. What is a running total and how do you compute it in SQL?
4. What is the window frame clause? What does `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` mean?
5. What is the difference between `ROWS` and `RANGE` in a window frame?
6. How do you compute a 7-day rolling average in SQL?
7. What does `FIRST_VALUE()` return? What common mistake do people make with `LAST_VALUE()`?
8. Why do you need `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING` for `LAST_VALUE()`?
9. What is `PERCENT_RANK()`? What is its range?
10. What is `CUME_DIST()` and how is it different from `PERCENT_RANK()`?
11. Write a query to compute month-over-month revenue growth.
12. Write a query to compute year-to-date cumulative sales.
13. What is the difference between a moving average and a cumulative sum?
14. Can `LAG()` look more than 1 row back? Show the syntax.
15. Write a query to find the difference between an employee's salary and the previous employee's salary when sorted by hire date.
16. What happens to `LAG()` at the first row (no previous row)?
17. Can you use `LAG()` with `PARTITION BY` to look at previous rows within a group?
18. Write a SQL query to compute a running count of orders per customer.
19. What is the purpose of `ROWS BETWEEN 6 PRECEDING AND CURRENT ROW`?
20. How does window frame choice affect the result of `AVG()` in a window function?
21. Write a query to flag rows where sales declined compared to the previous period.
22. What is a "gap and islands" problem? (Advanced — how might LAG/LEAD help solve it?)
23. How do window functions interact with CTEs for complex analytical queries?
24. What is the difference between `SUM() OVER()` and `SUM() OVER(ORDER BY date)`?
25. A dashboard needs: current month sales, previous month sales, and 3-month average in one row per month. Write the SQL.

---

# DAY 16 — String Functions

## 📚 Concept Deep-Dive

### Why String Functions Matter for Analysts
Real-world data is messy. Product names have extra spaces, emails are in inconsistent case, phone numbers have dashes and parentheses, and names are split or combined differently across systems. String functions are the data analyst's cleansing toolkit.

### Core String Functions
```sql
-- Case functions
UPPER('hello world')          → 'HELLO WORLD'
LOWER('HELLO WORLD')          → 'hello world'
INITCAP('hello world')        → 'Hello World'  -- PostgreSQL

-- Length
LENGTH('hello')               → 5
CHAR_LENGTH('hello')          → 5  (counts characters, not bytes)

-- Trimming whitespace
TRIM('  hello  ')             → 'hello'
LTRIM('  hello  ')            → 'hello  '
RTRIM('  hello  ')            → '  hello'
TRIM(BOTH '-' FROM '--hello--') → 'hello'  -- trim specific characters

-- Padding
LPAD('42', 5, '0')            → '00042'  -- pad left to width 5 with '0'
RPAD('hello', 10, '.')        → 'hello.....'

-- Concatenation
'hello' || ' ' || 'world'     → 'hello world'  -- PostgreSQL
CONCAT('hello', ' ', 'world') → 'hello world'   -- Standard SQL
CONCAT_WS(', ', 'Alice', 'Bob', 'Charlie')       → 'Alice, Bob, Charlie'
```

### Substring Extraction
```sql
-- SUBSTRING(string, start, length)
SUBSTRING('Hello World', 1, 5)          → 'Hello'  -- 1-indexed
SUBSTRING('Hello World', 7)             → 'World'  -- from position 7 to end

-- LEFT and RIGHT
LEFT('Hello World', 5)                  → 'Hello'
RIGHT('Hello World', 5)                 → 'World'

-- Extract email domain
SELECT RIGHT(email, LENGTH(email) - POSITION('@' IN email)) AS domain
FROM employees;
-- 'alice@manodemy.com' → 'manodemy.com'
```

### Pattern Search
```sql
-- POSITION / STRPOS: find character position
POSITION('@' IN 'alice@manodemy.com')   → 6
STRPOS('alice@manodemy.com', '@')       → 6  -- PostgreSQL

-- LIKE (already covered Day 3)
-- REGEXP_MATCH / ~ (regex)
SELECT * FROM employees WHERE email ~ '^[a-z]+\.[a-z]+@manodemy\.com$';
```

### String Replacement
```sql
-- REPLACE: replaces all occurrences
REPLACE('hello world', 'world', 'SQL')  → 'hello SQL'
REPLACE(phone, '-', '')                 → removes all dashes from phone number

-- REGEXP_REPLACE: replace using regex
REGEXP_REPLACE('Hello  World', '\s+', ' ', 'g')  → 'Hello World'  -- normalize spaces
REGEXP_REPLACE(phone, '[^0-9]', '', 'g')          → keeps only digits
```

### SPLIT_PART — Splitting Strings by Delimiter
```sql
-- SPLIT_PART(string, delimiter, field_number)
SPLIT_PART('John|Doe|35', '|', 1)       → 'John'
SPLIT_PART('John|Doe|35', '|', 2)       → 'Doe'
SPLIT_PART('John|Doe|35', '|', 3)       → '35'

-- Extract username from email
SELECT SPLIT_PART(email, '@', 1) AS username FROM employees;
```

### Practical Data Cleaning Example
```sql
-- Clean a messy name column in one query
SELECT
    TRIM(                            -- remove leading/trailing spaces
        REGEXP_REPLACE(              -- normalize multiple spaces
            INITCAP(                 -- proper case
                LOWER(name)          -- normalize case first
            ),
        '\s+', ' ', 'g')
    ) AS clean_name
FROM raw_customers;
```

---

## 🛠️ Day 16 Hands-On Challenges

**Dataset:** `raw_customers` (customer_id, full_name, email, phone_number, address)

**Challenge 1:** The `full_name` column has inconsistent casing and extra spaces (e.g., '  jOHN dOE  '). Write a query to clean it to proper title case with no extra spaces using `TRIM`, `LOWER`, and `INITCAP`.

**Challenge 2:** Extract the `username` (text before @) and `domain` (text after @) from the `email` column as separate columns. Use `SPLIT_PART` or `POSITION` + `SUBSTRING`.

**Challenge 3:** The `phone_number` column contains numbers in formats like '(91) 98765-43210', '91-98765-43210', '+91 98765 43210'. Write a query that standardizes all phone numbers to digits only (remove all non-numeric characters) using `REGEXP_REPLACE`.

**Challenge 4:** Write a query that finds all customers whose email domain is NOT 'gmail.com' or 'yahoo.com'. Use string functions to extract the domain and then filter.

**Challenge 5:** The `address` column stores city, state, and pincode separated by '|'. Write a query to extract each component into its own column: `city`, `state`, `pincode`. Then filter to show only customers in the state 'Maharashtra'.

---

## 💼 25 Interview Questions — Day 16

1. What is the difference between `LENGTH()` and `CHAR_LENGTH()`?
2. What does `TRIM()` do? How is it different from `LTRIM()` and `RTRIM()`?
3. Write a query to convert all email addresses to lowercase.
4. What does `CONCAT_WS()` do? How is it different from `||`?
5. Write a query to extract the first 3 characters of a product code column.
6. What is `LPAD()` and when would you use it in data analytics?
7. How do you find the position of a substring within a string in SQL?
8. Write a query to replace all spaces in a product name with underscores.
9. What is `SPLIT_PART()`? Give an example of parsing a delimited column.
10. How would you extract the year from a date stored as a VARCHAR column?
11. Write a query to find all emails that are NOT in valid format (using LIKE or REGEXP).
12. What is `INITCAP()`? Is it available in all databases?
13. How do you remove all non-numeric characters from a phone number column?
14. What is `REGEXP_REPLACE()`? Write an example.
15. How would you check if a string contains a specific word?
16. Write a query to count the number of words in a text column (hint: count spaces).
17. What is the difference between `POSITION()` and `STRPOS()` in PostgreSQL?
18. Write a query to generate an employee code as 'EMP' + a zero-padded employee_id (e.g., 'EMP00042').
19. How do you reverse a string in SQL?
20. What does `LEFT(email, POSITION('@' IN email) - 1)` compute?
21. Write a query to find all customers whose name starts and ends with the same letter.
22. What is string concatenation and what operator or function do you use for it?
23. How would you parse a JSON-like string stored in a VARCHAR column?
24. Write a query to identify email addresses with more than one '@' character.
25. A data pipeline receives first_name and last_name in a single column as 'Last, First'. Write a query to split it into two separate columns.

---

# DAY 17 — Date & Time Functions

## 📚 Concept Deep-Dive

### Why Date Functions are Critical for Analysts
90% of analytical SQL queries involve date filters, date arithmetic, or date-based grouping (daily/weekly/monthly reporting). Mastering date functions is non-negotiable.

### Getting the Current Date and Time
```sql
CURRENT_DATE         -- Current date: '2024-06-15'
CURRENT_TIME         -- Current time: '14:30:00'
CURRENT_TIMESTAMP    -- Current datetime: '2024-06-15 14:30:00'
NOW()                -- Same as CURRENT_TIMESTAMP (PostgreSQL/MySQL)
GETDATE()            -- SQL Server equivalent
SYSDATE              -- Oracle equivalent
```

### Extracting Parts of a Date
```sql
-- EXTRACT function (SQL Standard)
EXTRACT(YEAR FROM hire_date)       → 2022
EXTRACT(MONTH FROM hire_date)      → 6
EXTRACT(DAY FROM hire_date)        → 15
EXTRACT(QUARTER FROM order_date)   → 2  (Q2 = April-June)
EXTRACT(DOW FROM hire_date)        → 0-6 (0=Sunday in PostgreSQL)
EXTRACT(WEEK FROM hire_date)       → 24  (ISO week number)
EXTRACT(EPOCH FROM timestamp)      → Unix timestamp (seconds since 1970-01-01)

-- DATE_PART (PostgreSQL) — equivalent to EXTRACT
DATE_PART('year', hire_date)       → 2022

-- DATE_TRUNC — truncate to a time unit
DATE_TRUNC('month', '2024-06-15'::DATE)   → '2024-06-01'  -- start of month
DATE_TRUNC('year', '2024-06-15'::DATE)    → '2024-01-01'  -- start of year
DATE_TRUNC('week', '2024-06-15'::DATE)    → '2024-06-10'  -- start of week (Monday)
DATE_TRUNC('quarter', '2024-06-15'::DATE) → '2024-04-01'  -- start of quarter
```

### Date Arithmetic
```sql
-- Adding and subtracting days (PostgreSQL)
CURRENT_DATE + INTERVAL '7 days'       -- one week from today
CURRENT_DATE - INTERVAL '1 month'      -- one month ago
hire_date + INTERVAL '90 days'         -- 90 days after hire

-- DATE_ADD / DATE_SUB (MySQL)
DATE_ADD(hire_date, INTERVAL 30 DAY)
DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH)

-- Difference between dates
age(CURRENT_DATE, hire_date)                    -- PostgreSQL: returns interval '5 years 3 months...'
CURRENT_DATE - hire_date                        -- Returns number of days
DATEDIFF(CURRENT_DATE, hire_date)               -- MySQL: number of days

-- Years of service
EXTRACT(YEAR FROM AGE(CURRENT_DATE, hire_date)) AS years_of_service
```

### Formatting Dates for Output
```sql
-- TO_CHAR (PostgreSQL/Oracle): format a date as a string
TO_CHAR(hire_date, 'DD/MM/YYYY')    → '15/06/2024'
TO_CHAR(hire_date, 'Month DD, YYYY') → 'June 15, 2024'
TO_CHAR(hire_date, 'YYYY-"Q"Q')    → '2024-Q2'
TO_CHAR(hire_date, 'Day, DD Mon')   → 'Saturday, 15 Jun'

-- DATE_FORMAT (MySQL)
DATE_FORMAT(hire_date, '%d/%m/%Y')  → '15/06/2024'
DATE_FORMAT(hire_date, '%M %Y')     → 'June 2024'
```

### Common Analytical Patterns
```sql
-- Filter by date range (last 30 days)
WHERE order_date >= CURRENT_DATE - INTERVAL '30 days';

-- Filter by current month
WHERE DATE_TRUNC('month', order_date) = DATE_TRUNC('month', CURRENT_DATE);

-- Filter by year
WHERE EXTRACT(YEAR FROM order_date) = 2024;

-- Monthly aggregation
SELECT
    DATE_TRUNC('month', order_date) AS month,
    COUNT(*) AS order_count,
    SUM(amount) AS monthly_revenue
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;
```

---

## 🛠️ Day 17 Hands-On Challenges

**Dataset:** `employees` (employee_id, first_name, hire_date), `orders` (order_id, customer_id, amount, order_date, shipped_date)

**Challenge 1:** Write a query to show each employee's `first_name`, `hire_date`, and `years_of_service` (number of complete years from hire_date to today). Sort by longest-serving first.

**Challenge 2:** Write a monthly revenue report for 2024: group `orders` by month using `DATE_TRUNC`, and show total `order_count` and `monthly_revenue` for each month. Sort chronologically.

**Challenge 3:** Write a query to find all orders where the shipping took more than 7 days (difference between `shipped_date` and `order_date`). Show `order_id`, `order_date`, `shipped_date`, and `days_to_ship`.

**Challenge 4:** Write a quarterly revenue report that groups revenue by quarter (Q1, Q2, Q3, Q4) for all years in the orders table. Use `EXTRACT(QUARTER ...)` and `EXTRACT(YEAR ...)`. Display `year`, `quarter`, and `quarterly_revenue`.

**Challenge 5:** Write a query to display orders from the last 90 days (dynamically calculated — not hardcoded). Format the `order_date` for display as 'DD Mon YYYY' (e.g., '15 Jun 2024') using `TO_CHAR`.

---

## 💼 25 Interview Questions — Day 17

1. What is the difference between `DATE`, `TIMESTAMP`, and `TIMESTAMPTZ`?
2. How do you get the current date in SQL? Does the syntax vary by database?
3. What does `EXTRACT(MONTH FROM hire_date)` return?
4. What does `DATE_TRUNC('month', order_date)` return?
5. Write a query to calculate the number of days between two dates.
6. What is the difference between `DATEDIFF` and date subtraction?
7. Write a query to find all employees hired in Q3 2023.
8. How do you add 30 days to a date in PostgreSQL? In MySQL?
9. What does `AGE(date1, date2)` return in PostgreSQL?
10. Write a query to group orders by week number.
11. What is `EPOCH` in the context of `EXTRACT`?
12. How do you format a date as 'Month YYYY' for reporting?
13. Write a query to find all employees with more than 5 years of service.
14. What is the difference between `NOW()` and `CURRENT_DATE`?
15. How would you find the last day of the current month in SQL?
16. Write a query to find orders placed on a Sunday.
17. What is `DATE_FORMAT` and in which database is it used?
18. How do you filter records for "last 30 days" dynamically (without hardcoding a date)?
19. Write a query to find the busiest day of the week for orders.
20. What is the ISO week number and how is it different from a calendar week?
21. How do time zones affect TIMESTAMP queries? How do you handle them?
22. Write a query to find all customers who haven't placed an order in the last 6 months.
23. How would you compute a fiscal year quarter (if fiscal year starts in April)?
24. What is the difference between `DATE_TRUNC('week', date)` and `DATE_TRUNC('isoweek', date)`?
25. A business needs a report of "last 12 months of revenue, grouped by month". Write the complete SQL query.

---

# DAY 18 — UNION, INTERSECT & EXCEPT (SET Operations)

## 📚 Concept Deep-Dive

### What are Set Operations?
Set operations combine the result sets of two or more SELECT queries into a single result. They operate on the **entire result sets** (unlike JOINs which operate row-by-row).

### Rules for All Set Operations
1. **Same number of columns** in all SELECT statements
2. **Compatible data types** in corresponding columns
3. **Column names** are taken from the first SELECT statement
4. `ORDER BY` can only appear **once, at the very end** of the final combined query

### UNION — Combine and Remove Duplicates
```sql
-- Returns all distinct rows from either query
SELECT employee_id, first_name, 'Active' AS source
FROM active_employees
UNION
SELECT employee_id, first_name, 'Archived' AS source
FROM archived_employees;
-- Duplicates are REMOVED (expensive — sorts the result)
```

### UNION ALL — Combine Without Removing Duplicates
```sql
-- Returns ALL rows including duplicates (much faster than UNION)
SELECT customer_id FROM orders_2023
UNION ALL
SELECT customer_id FROM orders_2024;
-- Use UNION ALL when you know there are no duplicates (or when duplicates are desired)
-- ALWAYS prefer UNION ALL for performance unless deduplication is required
```

### INTERSECT — Common Rows in Both Queries
```sql
-- Returns only rows that appear in BOTH result sets
SELECT customer_id FROM orders_2023
INTERSECT
SELECT customer_id FROM orders_2024;
-- Customers who ordered in BOTH 2023 AND 2024 (returning customers)
```

### EXCEPT (MINUS in Oracle) — Rows in First but Not Second
```sql
-- Returns rows from the first query that do NOT appear in the second
SELECT customer_id FROM customers
EXCEPT
SELECT customer_id FROM orders;
-- Customers who have NEVER placed an order
-- Equivalent to LEFT JOIN anti-join pattern
```

### Real-World Use Cases

#### UNION for Report Consolidation
```sql
-- Combine sales data from multiple regions into one report
SELECT region, product_id, SUM(sales) AS total_sales
FROM north_region_sales
GROUP BY region, product_id
UNION ALL
SELECT region, product_id, SUM(sales) AS total_sales
FROM south_region_sales
GROUP BY region, product_id
ORDER BY region, total_sales DESC;
```

#### UNION ALL for Time-Based Comparisons
```sql
-- Year-over-year comparison in one result set
SELECT 2023 AS year, COUNT(*) AS signups FROM signups_2023
UNION ALL
SELECT 2024 AS year, COUNT(*) AS signups FROM signups_2024;
```

#### EXCEPT for Data Quality / Delta Detection
```sql
-- Find records in source that are missing from target (data migration validation)
SELECT employee_id FROM source_database.employees
EXCEPT
SELECT employee_id FROM target_database.employees;
```

### UNION vs. JOIN — Critical Difference
| | UNION | JOIN |
|---|---|---|
| **Direction** | Vertical (stacks rows) | Horizontal (adds columns) |
| **Requirement** | Same column count/types | Related key columns |
| **Use case** | Combine same-structured data | Enrich data from related tables |

### ORDER BY with Set Operations
```sql
-- ORDER BY goes LAST, after all UNIONs, and references column names from first SELECT
SELECT employee_id, first_name FROM active_employees
UNION ALL
SELECT employee_id, first_name FROM archived_employees
ORDER BY first_name ASC;  -- ✅ Valid — references column from first SELECT

-- OR use positional reference
ORDER BY 2 ASC;  -- Sort by 2nd column (first_name)
```

---

## 🛠️ Day 18 Hands-On Challenges

**Datasets:** `customers` (customer_id, name), `orders_2023` (order_id, customer_id, amount), `orders_2024` (order_id, customer_id, amount), `active_employees`, `archived_employees`, `source_employees`, `target_employees`

**Challenge 1:** Combine all orders from `orders_2023` and `orders_2024` into a single result set. Add a column `year` (2023 or 2024) to identify the source. Use `UNION ALL`. Then count total orders and revenue per year in the outer query using a CTE.

**Challenge 2:** Using `INTERSECT`, find all customers who placed orders in **both** 2023 and 2024. Display their `customer_id` and fetch their `name` from the customers table (use a CTE or subquery).

**Challenge 3:** Using `EXCEPT`, find all customers who placed orders in 2023 but NOT in 2024 (i.e., they churned). Display their `customer_id` and `name`.

**Challenge 4:** You are validating a data migration. The `source_employees` table should match `target_employees`. Write two queries: (1) records in source missing from target, (2) records in target not in source (using EXCEPT). Combine both results using UNION ALL and add a `direction` column ('Source Only', 'Target Only').

**Challenge 5:** Build a comprehensive report using `UNION ALL` that shows:
- Row 1: Total employees from `active_employees`
- Row 2: Total employees from `archived_employees`
- Row 3: Grand total across both

Label each with a `category` column ('Active', 'Archived', 'Total'). Use ROLLUP or UNION ALL with a summary row.

---

## 💼 25 Interview Questions — Day 18

1. What is a set operation in SQL? Name the three main set operations.
2. What is the difference between `UNION` and `UNION ALL`?
3. When should you use `UNION ALL` instead of `UNION` for performance?
4. What are the three rules that all set operations must follow?
5. What is `INTERSECT` and what does it return?
6. What is `EXCEPT` and what is its Oracle equivalent?
7. Write a query to find customers who ordered in 2023 but NOT in 2024 using EXCEPT.
8. Write a query to find customers who ordered in BOTH 2023 AND 2024 using INTERSECT.
9. What is the difference between UNION (vertical combine) and JOIN (horizontal combine)?
10. Where does `ORDER BY` appear when using set operations?
11. Can you use `ORDER BY` inside each individual SELECT of a UNION? Why not?
12. Does `UNION` guarantee the order of results? Explain.
13. What happens if the number of columns doesn't match in a UNION query?
14. Can column data types differ in a UNION query? What does the database do?
15. Write a query to consolidate sales from three regional tables into one summary report.
16. How would you simulate `INTERSECT` in a database that doesn't support it (e.g., MySQL doesn't support INTERSECT directly)?
17. How would you simulate `EXCEPT` using a JOIN?
18. What is the difference between `EXCEPT` and `NOT EXISTS`/`NOT IN`?
19. Can you UNION more than two queries?
20. Write a query that uses UNION ALL to create a year-over-year comparison with a 'Year' label column.
21. When would you use `EXCEPT` over LEFT JOIN anti-join pattern?
22. What is the performance impact of `UNION` vs. `UNION ALL` on large result sets?
23. Write a query to identify data quality issues: rows that exist in a source table but are missing from a target table after a data migration.
24. Can set operations be combined with GROUP BY, HAVING, or window functions?
25. A report requires combining employee data from 5 different subsidiary companies, all with the same schema. Which set operation would you use and why? Write the query structure.

---

## APPENDIX — Summary of SQL Order of Execution

```
Step 1: FROM           → Load the base table(s) into memory
Step 2: JOIN           → Apply all JOIN conditions to combine tables
Step 3: WHERE          → Filter rows (no aggregates, no column aliases)
Step 4: GROUP BY       → Group remaining rows into buckets
Step 5: HAVING         → Filter groups (can use aggregates)
Step 6: SELECT         → Compute output columns (aggregates, expressions, aliases)
Step 7: DISTINCT       → Remove duplicate rows if specified
Step 8: ORDER BY       → Sort results (can use aliases from SELECT)
Step 9: LIMIT / OFFSET → Restrict number of output rows
```

**Practical Consequences:**
- Use `WHERE` to filter rows, `HAVING` to filter groups
- Column aliases created in `SELECT` cannot be used in `WHERE` (but CAN in `ORDER BY`)
- Window functions run in the `SELECT` phase, but cannot be filtered in `WHERE` — use a CTE
- `ORDER BY` is always the second-to-last step (before LIMIT)

---

*Manodemy SQL Curriculum v1.0 — Expert-Level, Job-Oriented Content*
*18 Days | 25 Interview Questions + 5 Hands-On Challenges Per Day*
*Review cycle: Annually or when major SQL standard updates are released*
