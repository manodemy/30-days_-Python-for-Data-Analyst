-- ═══════════════════════════════════════════════════════════════
-- Migration: 045_seed_rubrics.sql
-- Description: Seed grading rubrics for SQL and Excel courses.
-- ═══════════════════════════════════════════════════════════════

INSERT INTO public.grading_rubrics (day_id, cell_id, question_text, kernel, marks, ignore_tokens)
VALUES
('sql-day01', 'cell-2', 'Write a query to retrieve only the <code>employee_id</code>, <code>first_name</code>, and <code>email</code> from the employees table.', 'sql', 10, '{}'),
('sql-day01', 'cell-3', 'Write a query that displays each employee''s full name as a single column called <code>full_name</code> (combine <code>first_name</code> and <code>last_name</code> with a space in between), and their salary with a 10% raise displayed as <code>projected_salary</code>.', 'sql', 10, '{}'),
('sql-day01', 'cell-4', 'Write a query to retrieve all columns from the employees table but only show employees in <code>department_id</code> 3. (Use a WHERE clause — you''ll explore this more deeply in Day 2.)', 'sql', 10, '{}'),
('sql-day01', 'cell-5', 'Write a query that computes a column <code>annual_bonus</code> which is 5% of the <code>salary</code>, and show it alongside <code>first_name</code> and <code>salary</code>.', 'sql', 10, '{}'),
('sql-day01', 'cell-6', 'Explain in a SQL comment (<code>--</code>) inside your query why the following query fails, and then fix it:
``<code>sql
SELECT salary * 1.15 AS new_salary
FROM employees
WHERE new_salary > 80000;
</code>``

---', 'sql', 10, '{}'),
('sql-day01', 'cell-7', '---
Q1.
What is SQL and how is it different from other programming languages?', 'sql', 10, '{}'),
('sql-day01', 'cell-8', '---
Q2.
What are the five sub-languages of SQL? Give one command example for each.', 'sql', 10, '{}'),
('sql-day01', 'cell-9', '---
Q3.
What is the difference between <code>VARCHAR</code> and <code>CHAR</code> data types?', 'sql', 10, '{}'),
('sql-day01', 'cell-10', '---
Q4.
What is a Primary Key? Can a table have multiple Primary Keys?', 'sql', 10, '{}'),
('sql-day01', 'cell-11', '---
Q5.
What is the difference between a Primary Key and a Unique Key?', 'sql', 10, '{}'),
('sql-day01', 'cell-12', '---
Q6.
What is a Foreign Key and what is its purpose in a relational database?', 'sql', 10, '{}'),
('sql-day01', 'cell-13', '---
Q7.
Explain the SQL Order of Execution in detail.', 'sql', 10, '{}'),
('sql-day01', 'cell-14', '---
Q8.
Why can''t you use a column alias defined in SELECT inside the WHERE clause?', 'sql', 10, '{}'),
('sql-day01', 'cell-15', '---
Q9.
What does <code>SELECT *</code> do, and when is it considered bad practice?', 'sql', 10, '{}'),
('sql-day01', 'cell-16', '---
Q10.
What is the difference between <code>DECIMAL(10,2)</code> and <code>FLOAT</code>? When would you use each?', 'sql', 10, '{}'),
('sql-day01', 'cell-17', '---
Q11.
What is a schema in the context of a database?', 'sql', 10, '{}'),
('sql-day01', 'cell-18', '---
Q12.
What is the difference between a row and a column in a relational database?', 'sql', 10, '{}'),
('sql-day01', 'cell-19', '---
Q13.
What is <code>DDL</code> vs <code>DML</code>? Give examples of each.', 'sql', 10, '{}'),
('sql-day01', 'cell-20', '---
Q14.
What is a <code>NULL</code> value? How is <code>NULL</code> different from <code>0</code> or an empty string?', 'sql', 10, '{}'),
('sql-day01', 'cell-21', '---
Q15.
Can a Primary Key column contain NULL values? Why or why not?', 'sql', 10, '{}'),
('sql-day01', 'cell-22', '---
Q16.
What is the difference between <code>TRUNCATE</code> and <code>DELETE</code>? Which is DDL and which is DML?', 'sql', 10, '{}'),
('sql-day01', 'cell-23', '---
Q17.
What is referential integrity? How does a Foreign Key enforce it?', 'sql', 10, '{}'),
('sql-day01', 'cell-24', '---
Q18.
In SQL, what does the <code>AS</code> keyword do?', 'sql', 10, '{}'),
('sql-day01', 'cell-25', '---
Q19.
What is the output of <code>SELECT 10 / 3</code> in SQL? How do you get a decimal result?', 'sql', 10, '{}'),
('sql-day01', 'cell-26', '---
Q20.
What is the difference between <code>INT</code> and <code>BIGINT</code>?', 'sql', 10, '{}'),
('sql-day01', 'cell-27', '---
Q21.
Can a table exist without a Primary Key? Is it a good practice?', 'sql', 10, '{}'),
('sql-day01', 'cell-28', '---
Q22.
What is a composite key? Give a business example where you would use one.', 'sql', 10, '{}'),
('sql-day01', 'cell-29', '---
Q23.
Explain what a relational database is. How is it different from a flat file (like a CSV)?', 'sql', 10, '{}'),
('sql-day01', 'cell-30', '---
Q24.
What is <code>NOT NULL</code> constraint and when would you use it?', 'sql', 10, '{}'),
('sql-day01', 'cell-31', '---
Q25.
You receive a table with 5 million rows. A colleague writes <code>SELECT *</code> in a production environment. What problem could this cause, and how would you advise them to write the query instead?

---', 'sql', 10, '{}'),
('sql-day02', 'cell-2', 'Retrieve all employees who earn more than ₹60,000 per month and work in <code>department_id</code> 4.', 'sql', 10, '{}'),
('sql-day02', 'cell-3', 'Write a query to find all employees whose <code>job_title</code> is either ''Data Analyst'', ''Business Analyst'', or ''Data Scientist''.', 'sql', 10, '{}'),
('sql-day02', 'cell-4', 'Find all employees hired between January 1, 2020 and December 31, 2022 whose salary is between ₹40,000 and ₹80,000. Use <code>BETWEEN</code> for both conditions.', 'sql', 10, '{}'),
('sql-day02', 'cell-5', 'Find all employees who are NOT in <code>department_id</code> 1, 2, or 3, and whose salary is greater than ₹50,000. Use <code>NOT IN</code> and <code>AND</code>.', 'sql', 10, '{}'),
('sql-day02', 'cell-6', 'A colleague wrote this query and it''s returning wrong results. Identify the bug, explain why it''s wrong using your knowledge of operator precedence, and fix it:
``<code>sql
SELECT * FROM employees
WHERE department_id = 2 AND salary > 70000 OR is_active = TRUE;
</code>``

---', 'sql', 10, '{}'),
('sql-day02', 'cell-7', '---
Q1.
What is the purpose of the <code>WHERE</code> clause and at which step does it execute in the SQL Order of Execution?', 'sql', 10, '{}'),
('sql-day02', 'cell-8', '---
Q2.
What is the difference between <code>=</code> and <code>IN</code> operators? When would you prefer <code>IN</code>?', 'sql', 10, '{}'),
('sql-day02', 'cell-9', '---
Q3.
Is <code>BETWEEN</code> inclusive or exclusive of its boundary values? Write an example.', 'sql', 10, '{}'),
('sql-day02', 'cell-10', '---
Q4.
What happens when you use <code>NOT IN</code> with a list that contains a <code>NULL</code> value?', 'sql', 10, '{}'),
('sql-day02', 'cell-11', '---
Q5.
Explain SQL''s three-valued logic (TRUE, FALSE, UNKNOWN).', 'sql', 10, '{}'),
('sql-day02', 'cell-12', '---
Q6.
What is operator precedence in SQL? Which has higher precedence: <code>AND</code> or <code>OR</code>?', 'sql', 10, '{}'),
('sql-day02', 'cell-13', '---
Q7.
Write a query to find all employees who earn between ₹50,000 and ₹1,00,000.', 'sql', 10, '{}'),
('sql-day02', 'cell-14', '---
Q8.
How would you write a case-insensitive text filter in PostgreSQL?', 'sql', 10, '{}'),
('sql-day02', 'cell-15', '---
Q9.
What is the difference between <code><></code> and <code>!=</code> in SQL?', 'sql', 10, '{}'),
('sql-day02', 'cell-16', '---
Q10.
Can you use aggregate functions (like SUM or COUNT) in a WHERE clause? Why or why not?', 'sql', 10, '{}'),
('sql-day02', 'cell-17', '---
Q11.
Write a query that returns employees NOT in departments 4, 5, or 6.', 'sql', 10, '{}'),
('sql-day02', 'cell-18', '---
Q12.
Why should you always use parentheses when combining AND and OR conditions?', 'sql', 10, '{}'),
('sql-day02', 'cell-19', '---
Q13.
What is wrong with this query: <code>WHERE salary = NULL</code>? How do you correctly filter for NULLs?', 'sql', 10, '{}'),
('sql-day02', 'cell-20', '---
Q14.
Write a query to find all employees hired in the year 2023.', 'sql', 10, '{}'),
('sql-day02', 'cell-21', '---
Q15.
What does <code>WHERE salary > 50000 AND salary < 80000</code> mean? Can you rewrite it using BETWEEN?', 'sql', 10, '{}'),
('sql-day02', 'cell-22', '---
Q16.
What is a Cartesian product? How does WHERE help avoid one?', 'sql', 10, '{}'),
('sql-day02', 'cell-23', '---
Q17.
A query returns 0 rows but you expect results. What are 3 possible reasons related to the WHERE clause?', 'sql', 10, '{}'),
('sql-day02', 'cell-24', '---
Q18.
How would you find all employees whose <code>email</code> column is NOT empty (but might be NULL or empty string)?', 'sql', 10, '{}'),
('sql-day02', 'cell-25', '---
Q19.
What is the difference between filtering before a JOIN vs. filtering after a JOIN?', 'sql', 10, '{}'),
('sql-day02', 'cell-26', '---
Q20.
Write a query to return employees who were hired after 2021 and earn more than the average salary. (Hint: use a subquery in WHERE — preview of Day 12.)', 'sql', 10, '{}'),
('sql-day02', 'cell-27', '---
Q21.
What does <code>WHERE 1=1</code> do and where is it commonly used in applications?', 'sql', 10, '{}'),
('sql-day02', 'cell-28', '---
Q22.
If a column has a <code>VARCHAR</code> data type, can you filter it with a numeric comparison like <code>WHERE employee_id > 1000</code>? What could go wrong?', 'sql', 10, '{}'),
('sql-day02', 'cell-29', '---
Q23.
How do you filter a BOOLEAN column in SQL? Is <code>WHERE is_active = TRUE</code> the same as <code>WHERE is_active</code>?', 'sql', 10, '{}'),
('sql-day02', 'cell-30', '---
Q24.
Explain why <code>WHERE salary NOT IN (SELECT salary FROM contractors WHERE salary IS NULL)</code> would return zero rows even if valid matches exist.', 'sql', 10, '{}'),
('sql-day02', 'cell-31', '---
Q25.
A business analyst asks you to pull all employees who joined in Q1 2024. Write the query using two different approaches.

---', 'sql', 10, '{}'),
('sql-day03', 'cell-2', 'Find all employees whose <code>email</code> ends with <code>@manodemy.com</code>. Use the <code>LIKE</code> operator.', 'sql', 10, '{}'),
('sql-day03', 'cell-3', 'Find all employees whose <code>job_title</code> contains the word ''analyst'' (case-insensitive) but does NOT start with ''Senior''. Use <code>ILIKE</code> (or <code>LOWER</code> + <code>LIKE</code>) and <code>NOT LIKE</code>.', 'sql', 10, '{}'),
('sql-day03', 'cell-4', 'Find all employees who have no manager assigned (<code>manager_id</code> is NULL). These are the top-level employees. Display their <code>first_name</code>, <code>last_name</code>, and <code>job_title</code>.', 'sql', 10, '{}'),
('sql-day03', 'cell-5', 'Write a query that displays each employee''s <code>first_name</code>, <code>salary</code>, and <code>total_compensation</code>. <code>total_compensation</code> = salary + commission. Employees with a NULL commission should have it treated as 0. Use <code>COALESCE</code>.', 'sql', 10, '{}'),
('sql-day03', 'cell-6', 'Write a query that calculates <code>revenue_per_unit</code> for products in a <code>sales</code> table (columns: <code>product_id</code>, <code>revenue</code>, <code>units_sold</code>). Ensure the query does not crash when <code>units_sold</code> is 0. Use <code>NULLIF</code>. Display <code>product_id</code>, <code>revenue</code>, <code>units_sold</code>, and <code>revenue_per_unit</code>.

---', 'sql', 10, '{}'),
('sql-day03', 'cell-7', '---
Q1.
What is NULL in SQL? Is it the same as 0 or an empty string?', 'sql', 10, '{}'),
('sql-day03', 'cell-8', '---
Q2.
Why does <code>WHERE column = NULL</code> return 0 rows? What is the correct syntax?', 'sql', 10, '{}'),
('sql-day03', 'cell-9', '---
Q3.
What is the correct operator to check if a value is NULL? Give an example.', 'sql', 10, '{}'),
('sql-day03', 'cell-10', '---
Q4.
What does <code>COALESCE</code> do? Write an example where it is used in a salary calculation.', 'sql', 10, '{}'),
('sql-day03', 'cell-11', '---
Q5.
What is <code>NULLIF</code>? Explain its most common real-world use case.', 'sql', 10, '{}'),
('sql-day03', 'cell-12', '---
Q6.
How do <code>NULL</code> values interact with aggregate functions like <code>SUM</code> and <code>AVG</code>?', 'sql', 10, '{}'),
('sql-day03', 'cell-13', '---
Q7.
What is the difference between <code>COUNT(*)</code> and <code>COUNT(column_name)</code>?', 'sql', 10, '{}'),
('sql-day03', 'cell-14', '---
Q8.
How do <code>NULL</code> values sort in ascending vs. descending <code>ORDER BY</code>?', 'sql', 10, '{}'),
('sql-day03', 'cell-15', '---
Q9.
Explain the <code>LIKE</code> operator. What is the difference between <code>%</code> and <code>_</code> wildcards?', 'sql', 10, '{}'),
('sql-day03', 'cell-16', '---
Q10.
What is a leading wildcard (<code>LIKE ''%text''</code>) and why should it be avoided on large tables?', 'sql', 10, '{}'),
('sql-day03', 'cell-17', '---
Q11.
What is <code>ILIKE</code> and which database supports it natively?', 'sql', 10, '{}'),
('sql-day03', 'cell-18', '---
Q12.
If you need a case-insensitive LIKE search in a database that doesn''t support ILIKE, how do you achieve it?', 'sql', 10, '{}'),
('sql-day03', 'cell-19', '---
Q13.
What does <code>NULL AND TRUE</code> evaluate to in SQL? What about <code>NULL OR TRUE</code>? Explain three-valued logic.', 'sql', 10, '{}'),
('sql-day03', 'cell-20', '---
Q14.
A developer wrote <code>WHERE commission != 0</code> to find employees without commission. What is wrong with this? How do you fix it?', 'sql', 10, '{}'),
('sql-day03', 'cell-21', '---
Q15.
How does NULL propagate in arithmetic? What is <code>5 + NULL</code>?', 'sql', 10, '{}'),
('sql-day03', 'cell-22', '---
Q16.
What is the result of <code>COALESCE(NULL, NULL, NULL)</code>?', 'sql', 10, '{}'),
('sql-day03', 'cell-23', '---
Q17.
What is <code>NULLIF(10, 10)</code>? What is <code>NULLIF(10, 5)</code>?', 'sql', 10, '{}'),
('sql-day03', 'cell-24', '---
Q18.
Write a query that finds all employees whose <code>first_name</code> starts with ''J'' and has exactly 5 characters.', 'sql', 10, '{}'),
('sql-day03', 'cell-25', '---
Q19.
Why might a <code>NOT IN</code> query return 0 rows when the list contains a NULL? Explain the mechanism.', 'sql', 10, '{}'),
('sql-day03', 'cell-26', '---
Q20.
How would you replace NULL values in a column with a specific string for reporting purposes?', 'sql', 10, '{}'),
('sql-day03', 'cell-27', '---
Q21.
You have a <code>revenue</code> and <code>cost</code> column. Some cost values are NULL. Write a query that safely computes profit as <code>revenue - cost</code>, treating NULL cost as 0.', 'sql', 10, '{}'),
('sql-day03', 'cell-28', '---
Q22.
What is the difference between <code>IS NOT NULL</code> and <code><> NULL</code>?', 'sql', 10, '{}'),
('sql-day03', 'cell-29', '---
Q23.
In what real business scenarios would a column legitimately contain NULL values?', 'sql', 10, '{}'),
('sql-day03', 'cell-30', '---
Q24.
Write a query to identify columns that might have data quality issues (e.g., NULL values) in a table.', 'sql', 10, '{}'),
('sql-day03', 'cell-31', '---
Q25.
A report is showing incorrect averages. You suspect NULL values are skewing the result. How do you investigate and fix it?

---', 'sql', 10, '{}'),
('sql-day04', 'cell-2', 'Write a query to find the 10 most recently hired employees. Display their <code>first_name</code>, <code>last_name</code>, and <code>hire_date</code> in order of most recent first.', 'sql', 10, '{}'),
('sql-day04', 'cell-3', 'Write a pagination query to display employees sorted by <code>last_name</code> alphabetically. Return rows 21 through 30 (page 3 with a page size of 10). Use <code>LIMIT</code> and <code>OFFSET</code>.', 'sql', 10, '{}'),
('sql-day04', 'cell-4', 'Write a query to find all unique <code>job_title</code> values in the company, sorted alphabetically. How many unique job titles are there? (Write two queries — one for the list, one for the count.)', 'sql', 10, '{}'),
('sql-day04', 'cell-5', 'Find the 3rd highest salary in the company without using any window functions. Use <code>LIMIT</code> and <code>OFFSET</code>. Think carefully about how to handle ties.', 'sql', 10, '{}'),
('sql-day04', 'cell-6', 'A report needs the bottom 5 earners in <code>department_id</code> 2, sorted by salary ascending then by <code>hire_date</code> ascending (longest-serving first among equal salaries). Write the query.

---', 'sql', 10, '{}'),
('sql-day04', 'cell-7', '---
Q1.
At which step does <code>ORDER BY</code> execute in the SQL Order of Execution?', 'sql', 10, '{}'),
('sql-day04', 'cell-8', '---
Q2.
Why can you reference a column alias from <code>SELECT</code> in <code>ORDER BY</code> but not in <code>WHERE</code>?', 'sql', 10, '{}'),
('sql-day04', 'cell-9', '---
Q3.
What is the default sort order of <code>ORDER BY</code>?', 'sql', 10, '{}'),
('sql-day04', 'cell-10', '---
Q4.
What does <code>ORDER BY department_id ASC, salary DESC</code> do?', 'sql', 10, '{}'),
('sql-day04', 'cell-11', '---
Q5.
Write a query to get the top 3 earners in the company.', 'sql', 10, '{}'),
('sql-day04', 'cell-12', '---
Q6.
What is <code>OFFSET</code> and how does it enable pagination?', 'sql', 10, '{}'),
('sql-day04', 'cell-13', '---
Q7.
What happens if you write <code>LIMIT 10</code> without <code>ORDER BY</code>?', 'sql', 10, '{}'),
('sql-day04', 'cell-14', '---
Q8.
What is the difference between <code>LIMIT</code> (MySQL/PostgreSQL) and <code>FETCH FIRST n ROWS ONLY</code> (SQL Standard)?', 'sql', 10, '{}'),
('sql-day04', 'cell-15', '---
Q9.
What does <code>DISTINCT</code> do? At which step in execution order does it run?', 'sql', 10, '{}'),
('sql-day04', 'cell-16', '---
Q10.
Why is using <code>DISTINCT</code> to fix duplicate results from a JOIN considered bad practice?', 'sql', 10, '{}'),
('sql-day04', 'cell-17', '---
Q11.
Write a query to count the number of unique departments in the employees table.', 'sql', 10, '{}'),
('sql-day04', 'cell-18', '---
Q12.
How would you find the 2nd highest salary in a table? Show using LIMIT/OFFSET.', 'sql', 10, '{}'),
('sql-day04', 'cell-19', '---
Q13.
What is <code>ORDER BY RANDOM()</code> and what is it used for?', 'sql', 10, '{}'),
('sql-day04', 'cell-20', '---
Q14.
If a table has 1000 rows and you write <code>LIMIT 10 OFFSET 990</code>, how many rows are returned?', 'sql', 10, '{}'),
('sql-day04', 'cell-21', '---
Q15.
Can you use <code>ORDER BY</code> without a <code>SELECT</code> clause? Explain.', 'sql', 10, '{}'),
('sql-day04', 'cell-22', '---
Q16.
What is the difference between <code>DISTINCT</code> and <code>GROUP BY</code> for deduplication?', 'sql', 10, '{}'),
('sql-day04', 'cell-23', '---
Q17.
How does <code>ORDER BY</code> handle NULL values by default?', 'sql', 10, '{}'),
('sql-day04', 'cell-24', '---
Q18.
Write a query to get rows 51-60 from a products table ordered by price.', 'sql', 10, '{}'),
('sql-day04', 'cell-25', '---
Q19.
What is the problem with offset-based pagination on large tables? (Performance consideration.)', 'sql', 10, '{}'),
('sql-day04', 'cell-26', '---
Q20.
Can you sort by a column that is not in the SELECT list?', 'sql', 10, '{}'),
('sql-day04', 'cell-27', '---
Q21.
How would you find the most recent hire date in each department? (Preview of GROUP BY.)', 'sql', 10, '{}'),
('sql-day04', 'cell-28', '---
Q22.
What does <code>SELECT DISTINCT department_id, job_title</code> return compared to <code>SELECT DISTINCT department_id</code>?', 'sql', 10, '{}'),
('sql-day04', 'cell-29', '---
Q23.
A business user asks for "the top 10 products" — what clarifying questions should you ask before writing the query?', 'sql', 10, '{}'),
('sql-day04', 'cell-30', '---
Q24.
How would you return the first row of each department sorted by salary? (Preview of Window Functions.)', 'sql', 10, '{}'),
('sql-day04', 'cell-31', '---
Q25.
Write a query that finds employees hired in 2023, sorted from lowest to highest salary, showing only the 5th and 6th employees.

---', 'sql', 10, '{}'),
('sql-day05', 'cell-2', 'Write a single query that returns the total number of employees, total payroll (SUM of salary), average salary, highest salary, and lowest salary.', 'sql', 10, '{}'),
('sql-day05', 'cell-3', 'Find the number of employees who have a commission (commission IS NOT NULL) vs. those who don''t. Use two separate <code>COUNT</code> expressions in a single query.', 'sql', 10, '{}'),
('sql-day05', 'cell-4', 'Write a query to find the average salary of only **active** employees (<code>is_active = TRUE</code>). Round the result to 2 decimal places.', 'sql', 10, '{}'),
('sql-day05', 'cell-5', 'Write a query to find the number of employees hired each year. (Hint: use <code>EXTRACT</code> or <code>DATE_PART</code> to extract the year from <code>hire_date</code> — preview of Day 17, but try it.)', 'sql', 10, '{}'),
('sql-day05', 'cell-6', 'The HR team reports that the average commission is ₹3,500. You notice that 40% of employees have NULL commission. Write two queries: one that shows the biased average (ignoring NULLs) and one that shows the true average (treating NULL as 0). Explain the difference in a SQL comment.

---', 'sql', 10, '{}'),
('sql-day05', 'cell-7', '---
Q1.
What is an aggregate function? Name the five core aggregate functions in SQL.', 'sql', 10, '{}'),
('sql-day05', 'cell-8', '---
Q2.
What is the difference between <code>COUNT(*)</code> and <code>COUNT(column_name)</code>?', 'sql', 10, '{}'),
('sql-day05', 'cell-9', '---
Q3.
How does <code>AVG</code> handle NULL values? Give an example where this could cause a misleading result.', 'sql', 10, '{}'),
('sql-day05', 'cell-10', '---
Q4.
Can you use aggregate functions in a <code>WHERE</code> clause? Why not?', 'sql', 10, '{}'),
('sql-day05', 'cell-11', '---
Q5.
What is <code>COUNT(DISTINCT column)</code>? Write an example.', 'sql', 10, '{}'),
('sql-day05', 'cell-12', '---
Q6.
What does <code>MIN</code> and <code>MAX</code> return for a text/VARCHAR column?', 'sql', 10, '{}'),
('sql-day05', 'cell-13', '---
Q7.
Write a query to find the total payroll cost for department_id = 5.', 'sql', 10, '{}'),
('sql-day05', 'cell-14', '---
Q8.
What is the difference between <code>SUM(salary)</code> and <code>COUNT(*) * AVG(salary)</code>? Will they always be equal?', 'sql', 10, '{}'),
('sql-day05', 'cell-15', '---
Q9.
How would you compute the standard deviation of salaries in SQL?', 'sql', 10, '{}'),
('sql-day05', 'cell-16', '---
Q10.
What is <code>STRING_AGG</code>? Give a practical business example.', 'sql', 10, '{}'),
('sql-day05', 'cell-17', '---
Q11.
If you run an aggregate function with no <code>GROUP BY</code>, what does it return?', 'sql', 10, '{}'),
('sql-day05', 'cell-18', '---
Q12.
How do you round an aggregate result to 2 decimal places?', 'sql', 10, '{}'),
('sql-day05', 'cell-19', '---
Q13.
Write a query to find the salary range (difference between highest and lowest salary) in the company.', 'sql', 10, '{}'),
('sql-day05', 'cell-20', '---
Q14.
What is the difference between <code>SUM</code> and <code>COUNT</code>?', 'sql', 10, '{}'),
('sql-day05', 'cell-21', '---
Q15.
Can <code>MIN</code> and <code>MAX</code> work on date columns? What do they return?', 'sql', 10, '{}'),
('sql-day05', 'cell-22', '---
Q16.
Write a query to find the average salary but only for employees hired after 2020.', 'sql', 10, '{}'),
('sql-day05', 'cell-23', '---
Q17.
What happens when you mix aggregate and non-aggregate columns in SELECT without GROUP BY?', 'sql', 10, '{}'),
('sql-day05', 'cell-24', '---
Q18.
What does <code>COUNT(*) FILTER (WHERE is_active = TRUE)</code> do? (PostgreSQL)', 'sql', 10, '{}'),
('sql-day05', 'cell-25', '---
Q19.
How would you find the number of distinct job titles in the company?', 'sql', 10, '{}'),
('sql-day05', 'cell-26', '---
Q20.
What is the difference between <code>AVG(COALESCE(commission, 0))</code> and <code>COALESCE(AVG(commission), 0)</code>?', 'sql', 10, '{}'),
('sql-day05', 'cell-27', '---
Q21.
A business question: "What percentage of our employees earn above ₹70,000?" Write the SQL query.', 'sql', 10, '{}'),
('sql-day05', 'cell-28', '---
Q22.
How would you calculate the median salary in SQL? (SQL doesn''t have a built-in MEDIAN in all databases.)', 'sql', 10, '{}'),
('sql-day05', 'cell-29', '---
Q23.
What does <code>MAX(hire_date)</code> return — the first hire or the last hire?', 'sql', 10, '{}'),
('sql-day05', 'cell-30', '---
Q24.
Write a query to find departments with more than 10 employees. (Preview of HAVING.)', 'sql', 10, '{}'),
('sql-day05', 'cell-31', '---
Q25.
You''re auditing data quality. Write a query that shows, for each column in the employees table, the count of NULL values.

---', 'sql', 10, '{}'),
('sql-day06', 'cell-2', 'Write a query that shows the number of employees and average salary for each <code>department_id</code>. Order results by average salary descending.', 'sql', 10, '{}'),
('sql-day06', 'cell-3', 'Find all departments where the average salary exceeds ₹65,000 AND the headcount is at least 5. Use <code>GROUP BY</code> with <code>HAVING</code>.', 'sql', 10, '{}'),
('sql-day06', 'cell-4', 'Write a query that shows, for each <code>job_title</code>, the number of employees with that title, the minimum salary, and the maximum salary. Only include job titles that appear more than 3 times.', 'sql', 10, '{}'),
('sql-day06', 'cell-5', 'Find the year with the most employee hires. Show the <code>hire_year</code> and the count of hires for that year only. (You need to GROUP BY the extracted year from <code>hire_date</code>.)', 'sql', 10, '{}'),
('sql-day06', 'cell-6', 'A manager asks: "Show me departments where more than 20% of employees are inactive." Write the query using <code>GROUP BY</code> and <code>HAVING</code> with aggregate expressions.

---', 'sql', 10, '{}'),
('sql-day06', 'cell-7', '---
Q1.
What does <code>GROUP BY</code> do in SQL? At which execution step does it run?', 'sql', 10, '{}'),
('sql-day06', 'cell-8', '---
Q2.
Explain the Golden Rule of <code>GROUP BY</code> — which columns must be in GROUP BY?', 'sql', 10, '{}'),
('sql-day06', 'cell-9', '---
Q3.
What is <code>HAVING</code> and how is it different from <code>WHERE</code>?', 'sql', 10, '{}'),
('sql-day06', 'cell-10', '---
Q4.
Can you use <code>WHERE</code> to filter based on the result of an aggregate function? Why not?', 'sql', 10, '{}'),
('sql-day06', 'cell-11', '---
Q5.
Can you use <code>HAVING</code> without <code>GROUP BY</code>?', 'sql', 10, '{}'),
('sql-day06', 'cell-12', '---
Q6.
What is the execution order of WHERE, GROUP BY, and HAVING?', 'sql', 10, '{}'),
('sql-day06', 'cell-13', '---
Q7.
Write a query to find the department with the highest average salary.', 'sql', 10, '{}'),
('sql-day06', 'cell-14', '---
Q8.
What is the difference between grouping by one column vs. two columns?', 'sql', 10, '{}'),
('sql-day06', 'cell-15', '---
Q9.
Can you use a column alias from SELECT in a HAVING clause?', 'sql', 10, '{}'),
('sql-day06', 'cell-16', '---
Q10.
Write a query to find all job titles that appear more than 5 times.', 'sql', 10, '{}'),
('sql-day06', 'cell-17', '---
Q11.
What does <code>GROUP BY ROLLUP</code> do?', 'sql', 10, '{}'),
('sql-day06', 'cell-18', '---
Q12.
If a GROUP BY query returns 0 rows, what are the likely causes?', 'sql', 10, '{}'),
('sql-day06', 'cell-19', '---
Q13.
Write a query to find the total payroll per department.', 'sql', 10, '{}'),
('sql-day06', 'cell-20', '---
Q14.
How do NULLs behave in GROUP BY? Are all NULLs grouped together?', 'sql', 10, '{}'),
('sql-day06', 'cell-21', '---
Q15.
What is the difference between <code>HAVING COUNT(*) > 5</code> and <code>WHERE count > 5</code>?', 'sql', 10, '{}'),
('sql-day06', 'cell-22', '---
Q16.
How would you find departments with the highest and lowest headcount in one query?', 'sql', 10, '{}'),
('sql-day06', 'cell-23', '---
Q17.
Write a query to show the number of employees hired per month of 2023.', 'sql', 10, '{}'),
('sql-day06', 'cell-24', '---
Q18.
Can you GROUP BY a column that is not in the SELECT list?', 'sql', 10, '{}'),
('sql-day06', 'cell-25', '---
Q19.
Write a query that finds, per department, the difference between the max and min salary.', 'sql', 10, '{}'),
('sql-day06', 'cell-26', '---
Q20.
Explain this query: <code>SELECT department_id, AVG(salary) FROM employees GROUP BY 1</code> — what does GROUP BY 1 mean?', 'sql', 10, '{}'),
('sql-day06', 'cell-27', '---
Q21.
A query uses <code>GROUP BY</code> on 3 columns. How many groups are possible at maximum?', 'sql', 10, '{}'),
('sql-day06', 'cell-28', '---
Q22.
What is <code>GROUP BY CUBE</code>?', 'sql', 10, '{}'),
('sql-day06', 'cell-29', '---
Q23.
You have a query that counts orders per customer. How do you find customers with exactly 0 orders? (Preview of JOINs.)', 'sql', 10, '{}'),
('sql-day06', 'cell-30', '---
Q24.
Write a query to find the most common job title in the company.', 'sql', 10, '{}'),
('sql-day06', 'cell-31', '---
Q25.
Business question: "Which departments have a salary spread (max - min) greater than ₹40,000?" Write the SQL.

---', 'sql', 10, '{}'),
('sql-day07', 'cell-2', 'Write a query that casts <code>text_salary</code> to <code>DECIMAL(10,2)</code> and <code>text_hire_date</code> to <code>DATE</code>. Display both alongside the original text columns.', 'sql', 10, '{}'),
('sql-day07', 'cell-3', 'Demonstrate the integer division problem: write a query that incorrectly computes <code>salary / workdays</code> (both integers), then fix it using explicit casting.', 'sql', 10, '{}'),
('sql-day07', 'cell-4', 'Create a query that concatenates <code>first_name</code> and <code>last_name</code> from the employees table as <code>full_name</code>, converts it to uppercase, and shows the length of the resulting full name as <code>name_length</code>.', 'sql', 10, '{}'),
('sql-day07', 'cell-5', 'You have a <code>financial_data</code> table with <code>amount FLOAT</code>. Show why using <code>FLOAT</code> for currency comparison is problematic by writing a query that compares a computed float sum to an expected value. Then redesign the column type in a CREATE TABLE statement using <code>DECIMAL</code>.', 'sql', 10, '{}'),
('sql-day07', 'cell-6', 'Write a query that safely converts text values in a <code>category_id</code> column to integers using <code>CASE WHEN</code> and a regular expression check (to avoid cast errors). Return NULL for non-numeric values.

---', 'sql', 10, '{}'),
('sql-day07', 'cell-7', '---
Q1.
What is the difference between <code>CAST</code> and <code>::</code> in PostgreSQL?', 'sql', 10, '{}'),
('sql-day07', 'cell-8', '---
Q2.
What is the difference between <code>DECIMAL</code> and <code>FLOAT</code>? Why should you never use <code>FLOAT</code> for financial data?', 'sql', 10, '{}'),
('sql-day07', 'cell-9', '---
Q3.
What is integer division? How do you force decimal division in SQL?', 'sql', 10, '{}'),
('sql-day07', 'cell-10', '---
Q4.
What is the difference between <code>CHAR(n)</code>, <code>VARCHAR(n)</code>, and <code>TEXT</code>?', 'sql', 10, '{}'),
('sql-day07', 'cell-11', '---
Q5.
What is <code>TIMESTAMP</code> vs. <code>TIMESTAMPTZ</code>? When would you use each?', 'sql', 10, '{}'),
('sql-day07', 'cell-12', '---
Q6.
What is implicit casting? Give an example where it might cause unexpected behavior.', 'sql', 10, '{}'),
('sql-day07', 'cell-13', '---
Q7.
What is <code>TRY_CAST</code> in SQL Server and what problem does it solve?', 'sql', 10, '{}'),
('sql-day07', 'cell-14', '---
Q8.
What is <code>DECIMAL(10, 2)</code>? What is the maximum value it can store?', 'sql', 10, '{}'),
('sql-day07', 'cell-15', '---
Q9.
Why does <code>SELECT 0.1 + 0.2 = 0.3</code> return FALSE in SQL?', 'sql', 10, '{}'),
('sql-day07', 'cell-16', '---
Q10.
What is an <code>INTERVAL</code> data type used for?', 'sql', 10, '{}'),
('sql-day07', 'cell-17', '---
Q11.
How do you convert a boolean to an integer in SQL?', 'sql', 10, '{}'),
('sql-day07', 'cell-18', '---
Q12.
What is the difference between <code>UPPER()</code> and <code>LOWER()</code>? Give a real use case.', 'sql', 10, '{}'),
('sql-day07', 'cell-19', '---
Q13.
Write a query that displays the annual salary for each employee from a monthly salary column.', 'sql', 10, '{}'),
('sql-day07', 'cell-20', '---
Q14.
What does <code>TRIM()</code> do? What are <code>LTRIM()</code> and <code>RTRIM()</code>?', 'sql', 10, '{}'),
('sql-day07', 'cell-21', '---
Q15.
How do you concatenate two string columns in SQL? Does the syntax differ across databases?', 'sql', 10, '{}'),
('sql-day07', 'cell-22', '---
Q16.
What is <code>LENGTH()</code> vs. <code>CHAR_LENGTH()</code>?', 'sql', 10, '{}'),
('sql-day07', 'cell-23', '---
Q17.
A column was imported as VARCHAR but needs to be used in arithmetic. How do you handle this?', 'sql', 10, '{}'),
('sql-day07', 'cell-24', '---
Q18.
Explain data type precedence in SQL expressions (e.g., INT + DECIMAL = ?).', 'sql', 10, '{}'),
('sql-day07', 'cell-25', '---
Q19.
What is the <code>COERCE</code> concept in database systems?', 'sql', 10, '{}'),
('sql-day07', 'cell-26', '---
Q20.
You receive a text column with values like ''₹75,000.00''. Write a query to convert it to a usable numeric value.', 'sql', 10, '{}'),
('sql-day07', 'cell-27', '---
Q21.
What is the BOOLEAN data type and which values does it accept?', 'sql', 10, '{}'),
('sql-day07', 'cell-28', '---
Q22.
What is the maximum number of characters a <code>VARCHAR(255)</code> column can store?', 'sql', 10, '{}'),
('sql-day07', 'cell-29', '---
Q23.
In SQL, what is the difference between the string ''5'' and the number 5?', 'sql', 10, '{}'),
('sql-day07', 'cell-30', '---
Q24.
Why would a JOIN fail silently (return fewer rows than expected) when joining an INT column to a VARCHAR column?', 'sql', 10, '{}'),
('sql-day07', 'cell-31', '---
Q25.
A data pipeline imports all columns as TEXT. List 5 data types you would cast each column to and explain why.

---', 'sql', 10, '{}'),
('sql-day08', 'cell-2', 'Write a query that classifies each employee into a salary band: ''Top Earner'' (>₹90,000), ''Senior'' (₹60,001–₹90,000), ''Mid'' (₹35,001–₹60,000), ''Junior'' (≤₹35,000). Display <code>first_name</code>, <code>salary</code>, and <code>salary_band</code>.', 'sql', 10, '{}'),
('sql-day08', 'cell-3', 'Write a query using **conditional aggregation** that shows, in a SINGLE row: total employees, count of Engineering employees (dept 1), count of Sales employees (dept 2), count of HR employees (dept 3), and total payroll.', 'sql', 10, '{}'),
('sql-day08', 'cell-4', 'The company wants to give raises: Engineering gets 15%, Sales gets 10%, all others get 5%. Write a query that shows <code>first_name</code>, <code>current_salary</code>, and <code>new_salary</code> (using CASE WHEN on department_id).', 'sql', 10, '{}'),
('sql-day08', 'cell-5', 'Write a query that sorts employees by a custom priority order: CEOs first, then Directors, then Managers, then all other job titles alphabetically.', 'sql', 10, '{}'),
('sql-day08', 'cell-6', 'Using CASE WHEN without GROUP BY, write a query that shows for each employee a column <code>tenure_category</code>: ''Veteran'' (hired before 2018), ''Experienced'' (2018-2021), ''New Hire'' (after 2021). Then, write a second query using GROUP BY on this CASE WHEN expression to count employees in each category.

---', 'sql', 10, '{}'),
('sql-day08', 'cell-7', '---
Q1.
What is <code>CASE WHEN</code> in SQL and what is its purpose?', 'sql', 10, '{}'),
('sql-day08', 'cell-8', '---
Q2.
What is the difference between Simple CASE and Searched CASE?', 'sql', 10, '{}'),
('sql-day08', 'cell-9', '---
Q3.
In what order does CASE WHEN evaluate its conditions? Why does this matter?', 'sql', 10, '{}'),
('sql-day08', 'cell-10', '---
Q4.
What happens if no condition matches and there is no ELSE clause?', 'sql', 10, '{}'),
('sql-day08', 'cell-11', '---
Q5.
Can CASE WHEN return different data types in different WHEN branches?', 'sql', 10, '{}'),
('sql-day08', 'cell-12', '---
Q6.
Write a query that uses CASE WHEN to create a ''Pay Grade'' column (A, B, C, D) based on salary ranges.', 'sql', 10, '{}'),
('sql-day08', 'cell-13', '---
Q7.
What is conditional aggregation? Write an example.', 'sql', 10, '{}'),
('sql-day08', 'cell-14', '---
Q8.
How do you use CASE WHEN inside an aggregate function?', 'sql', 10, '{}'),
('sql-day08', 'cell-15', '---
Q9.
Can CASE WHEN be used in the WHERE clause? Give an example.', 'sql', 10, '{}'),
('sql-day08', 'cell-16', '---
Q10.
Can CASE WHEN be nested? Show an example.', 'sql', 10, '{}'),
('sql-day08', 'cell-17', '---
Q11.
What is <code>IIF</code> and in which database is it supported?', 'sql', 10, '{}'),
('sql-day08', 'cell-18', '---
Q12.
How would you use CASE WHEN to implement a custom sort order?', 'sql', 10, '{}'),
('sql-day08', 'cell-19', '---
Q13.
How is CASE WHEN used to "pivot" data (transform rows into columns)?', 'sql', 10, '{}'),
('sql-day08', 'cell-20', '---
Q14.
Write a query that counts male and female employees in separate columns using conditional aggregation.', 'sql', 10, '{}'),
('sql-day08', 'cell-21', '---
Q15.
What is the output data type of a CASE WHEN expression with mixed THEN data types?', 'sql', 10, '{}'),
('sql-day08', 'cell-22', '---
Q16.
Can CASE WHEN handle NULL values? Write an example.', 'sql', 10, '{}'),
('sql-day08', 'cell-23', '---
Q17.
How do you use CASE WHEN to classify dates (e.g., Q1, Q2, Q3, Q4)?', 'sql', 10, '{}'),
('sql-day08', 'cell-24', '---
Q18.
What is the performance difference between multiple WHERE conditions vs. CASE WHEN?', 'sql', 10, '{}'),
('sql-day08', 'cell-25', '---
Q19.
Write a query that gives a 20% discount to category ''Electronics'', 10% to ''Clothing'', and 0% to others in an orders table.', 'sql', 10, '{}'),
('sql-day08', 'cell-26', '---
Q20.
Explain why <code>COUNT(CASE WHEN condition THEN 1 END)</code> works as a conditional count.', 'sql', 10, '{}'),
('sql-day08', 'cell-27', '---
Q21.
What is the difference between <code>COUNT(CASE WHEN ... THEN 1 END)</code> and <code>SUM(CASE WHEN ... THEN 1 ELSE 0 END)</code>?', 'sql', 10, '{}'),
('sql-day08', 'cell-28', '---
Q22.
A business wants a report showing the salary-to-bonus ratio categorized as ''Generous'' (>20%), ''Standard'' (10-20%), and ''Low'' (<10%). Write the query.', 'sql', 10, '{}'),
('sql-day08', 'cell-29', '---
Q23.
How do you use CASE WHEN to replace IIF across all databases?', 'sql', 10, '{}'),
('sql-day08', 'cell-30', '---
Q24.
Write a query to flag orders as ''Late'' if shipped more than 7 days after order date, ''On Time'' otherwise.', 'sql', 10, '{}'),
('sql-day08', 'cell-31', '---
Q25.
You have a column <code>status_code</code> with values 1, 2, 3. Map them to ''Pending'', ''Active'', ''Closed'' using CASE WHEN. Which type of CASE is most appropriate?

---', 'sql', 10, '{}'),
('sql-day09', 'cell-2', 'Write a query that shows each employee''s <code>first_name</code>, <code>last_name</code>, <code>salary</code>, and their <code>department_name</code>. Use INNER JOIN to link employees to departments.', 'sql', 10, '{}'),
('sql-day09', 'cell-3', 'Extend Challenge 1 to include a third table: <code>job_titles</code>. Join the employees table to <code>job_titles</code> on <code>job_title_id</code>. Display <code>first_name</code>, <code>department_name</code>, and <code>title_name</code>.', 'sql', 10, '{}'),
('sql-day09', 'cell-4', 'Write a query to find all employees in the ''Sales'' department with a salary above ₹60,000. Use INNER JOIN and filter with WHERE.', 'sql', 10, '{}'),
('sql-day09', 'cell-5', 'Using a non-equi JOIN, write a query that maps each employee''s salary to a salary grade from the <code>salary_grades</code> table (columns: grade, min_salary, max_salary). Display <code>first_name</code>, <code>salary</code>, and <code>grade</code>.', 'sql', 10, '{}'),
('sql-day09', 'cell-6', 'Count how many employees are in each department. Display <code>department_name</code> and <code>employee_count</code>. Sort by <code>employee_count</code> descending. (Use INNER JOIN + GROUP BY.)

---', 'sql', 10, '{}'),
('sql-day09', 'cell-7', '---
Q1.
What is a JOIN in SQL and why is it necessary?', 'sql', 10, '{}'),
('sql-day09', 'cell-8', '---
Q2.
What is an INNER JOIN? What rows does it exclude?', 'sql', 10, '{}'),
('sql-day09', 'cell-9', '---
Q3.
At which step of SQL Order of Execution does JOIN run?', 'sql', 10, '{}'),
('sql-day09', 'cell-10', '---
Q4.
What is a table alias and why is it recommended?', 'sql', 10, '{}'),
('sql-day09', 'cell-11', '---
Q5.
What is the difference between <code>JOIN</code> and <code>INNER JOIN</code>? Are they the same?', 'sql', 10, '{}'),
('sql-day09', 'cell-12', '---
Q6.
What happens when you join on a column that has NULL values?', 'sql', 10, '{}'),
('sql-day09', 'cell-13', '---
Q7.
Write a query that joins employees to departments and shows only the department name and headcount.', 'sql', 10, '{}'),
('sql-day09', 'cell-14', '---
Q8.
What is a composite join? Give a real-world example.', 'sql', 10, '{}'),
('sql-day09', 'cell-15', '---
Q9.
What is a non-equi join? Give a business example.', 'sql', 10, '{}'),
('sql-day09', 'cell-16', '---
Q10.
How many rows can an INNER JOIN produce between two tables with 100 and 10 rows?', 'sql', 10, '{}'),
('sql-day09', 'cell-17', '---
Q11.
What is a foreign key and how does it relate to JOIN operations?', 'sql', 10, '{}'),
('sql-day09', 'cell-18', '---
Q12.
Write a query to join 3 tables: employees, departments, and office_locations.', 'sql', 10, '{}'),
('sql-day09', 'cell-19', '---
Q13.
What is the difference between filtering with WHERE and filtering with ON in a JOIN?', 'sql', 10, '{}'),
('sql-day09', 'cell-20', '---
Q14.
Can you JOIN a table to itself? Is that an INNER JOIN?', 'sql', 10, '{}'),
('sql-day09', 'cell-21', '---
Q15.
What is referential integrity and what happens to JOINs when it is violated?', 'sql', 10, '{}'),
('sql-day09', 'cell-22', '---
Q16.
What is a Cartesian product and how does it happen accidentally in JOINs?', 'sql', 10, '{}'),
('sql-day09', 'cell-23', '---
Q17.
Write a query to find all employees whose department is located in ''Mumbai''.', 'sql', 10, '{}'),
('sql-day09', 'cell-24', '---
Q18.
Can you JOIN on a non-key column? What are the risks?', 'sql', 10, '{}'),
('sql-day09', 'cell-25', '---
Q19.
What is the visual representation (Venn diagram) of INNER JOIN?', 'sql', 10, '{}'),
('sql-day09', 'cell-26', '---
Q20.
What is the difference between a fact table and a dimension table in data warehouse context?', 'sql', 10, '{}'),
('sql-day09', 'cell-27', '---
Q21.
Write a query to find managers (employees whose employee_id appears as manager_id for someone else). (Preview of self join.)', 'sql', 10, '{}'),
('sql-day09', 'cell-28', '---
Q22.
What are the performance implications of JOIN on large tables?', 'sql', 10, '{}'),
('sql-day09', 'cell-29', '---
Q23.
When is it appropriate to use a JOIN vs. a subquery?', 'sql', 10, '{}'),
('sql-day09', 'cell-30', '---
Q24.
What index would you create to optimize an INNER JOIN query?', 'sql', 10, '{}'),
('sql-day09', 'cell-31', '---
Q25.
A business asks: "List all employees with their team lead names." Given one employees table that stores manager relationships, how would you approach this?

---', 'sql', 10, '{}'),
('sql-day10', 'cell-2', 'Write a query to list ALL employees, including those without a department. Show <code>first_name</code>, <code>last_name</code>, and <code>department_name</code> (show NULL for employees with no department).', 'sql', 10, '{}'),
('sql-day10', 'cell-3', 'Write a query to find all employees who are NOT assigned to any project. Use LEFT JOIN on <code>employee_projects</code> and filter for NULLs.', 'sql', 10, '{}'),
('sql-day10', 'cell-4', 'Write a query to find all departments that have NO employees. Use the appropriate JOIN type and anti-join pattern.', 'sql', 10, '{}'),
('sql-day10', 'cell-5', 'Write a query using FULL OUTER JOIN between <code>employees</code> and <code>departments</code> to show all unmatched records from both sides. Show <code>first_name</code> and <code>department_name</code>, filtering to only show rows where either side is NULL.', 'sql', 10, '{}'),
('sql-day10', 'cell-6', 'A manager wants to see all employees and, if they have a manager, show the manager''s name. If they have no manager (top-level employees), show ''No Manager'' instead of NULL. Use LEFT JOIN (self-join preview) and COALESCE.

---', 'sql', 10, '{}'),
('sql-day10', 'cell-7', '---
Q1.
What is the difference between INNER JOIN and LEFT JOIN?', 'sql', 10, '{}'),
('sql-day10', 'cell-8', '---
Q2.
What is a LEFT JOIN? What happens to unmatched rows from the left table?', 'sql', 10, '{}'),
('sql-day10', 'cell-9', '---
Q3.
What is a RIGHT JOIN? Can it always be rewritten as a LEFT JOIN?', 'sql', 10, '{}'),
('sql-day10', 'cell-10', '---
Q4.
What is FULL OUTER JOIN? Give a real-world use case.', 'sql', 10, '{}'),
('sql-day10', 'cell-11', '---
Q5.
Does MySQL support FULL OUTER JOIN? How do you simulate it?', 'sql', 10, '{}'),
('sql-day10', 'cell-12', '---
Q6.
Write a query to find all employees without a department.', 'sql', 10, '{}'),
('sql-day10', 'cell-13', '---
Q7.
What is the Anti-Join pattern? Write an example.', 'sql', 10, '{}'),
('sql-day10', 'cell-14', '---
Q8.
What is the difference between <code>WHERE d.department_id IS NULL</code> (after LEFT JOIN) and <code>WHERE d.department_id IS NOT NULL</code>?', 'sql', 10, '{}'),
('sql-day10', 'cell-15', '---
Q9.
Can you use a WHERE clause on a LEFT JOIN without converting it to an INNER JOIN?', 'sql', 10, '{}'),
('sql-day10', 'cell-16', '---
Q10.
What does filtering the RIGHT table in the ON clause vs. the WHERE clause do in a LEFT JOIN?', 'sql', 10, '{}'),
('sql-day10', 'cell-17', '---
Q11.
Write a query to show all departments with their employee count, including departments with 0 employees.', 'sql', 10, '{}'),
('sql-day10', 'cell-18', '---
Q12.
What is a NULL row in the context of an OUTER JOIN?', 'sql', 10, '{}'),
('sql-day10', 'cell-19', '---
Q13.
What is the visual Venn diagram representation of LEFT JOIN with the IS NULL filter?', 'sql', 10, '{}'),
('sql-day10', 'cell-20', '---
Q14.
How do multiple LEFT JOINs work when one of the intermediate joins produces a NULL?', 'sql', 10, '{}'),
('sql-day10', 'cell-21', '---
Q15.
Write a query to compare data between two tables (find rows in table A not in table B).', 'sql', 10, '{}'),
('sql-day10', 'cell-22', '---
Q16.
What is the difference between NOT IN, NOT EXISTS, and LEFT JOIN anti-join?', 'sql', 10, '{}'),
('sql-day10', 'cell-23', '---
Q17.
When would you use FULL OUTER JOIN in a real data engineering project?', 'sql', 10, '{}'),
('sql-day10', 'cell-24', '---
Q18.
What is the order of multiple JOINs in SQL? Is it left-to-right?', 'sql', 10, '{}'),
('sql-day10', 'cell-25', '---
Q19.
Can you OUTER JOIN on a non-key column?', 'sql', 10, '{}'),
('sql-day10', 'cell-26', '---
Q20.
Write a query to find all products that have never been ordered.', 'sql', 10, '{}'),
('sql-day10', 'cell-27', '---
Q21.
Explain why this query is wrong for finding employees without a department: <code>SELECT * FROM employees WHERE department_id IS NULL</code>.', 'sql', 10, '{}'),
('sql-day10', 'cell-28', '---
Q22.
What happens to aggregate functions when LEFT JOIN produces NULL rows?', 'sql', 10, '{}'),
('sql-day10', 'cell-29', '---
Q23.
How do you count employees per department including departments with 0 employees?', 'sql', 10, '{}'),
('sql-day10', 'cell-30', '---
Q24.
What is the difference between <code>JOIN ... ON condition AND other_condition</code> vs. <code>JOIN ... ON condition WHERE other_condition</code>?', 'sql', 10, '{}'),
('sql-day10', 'cell-31', '---
Q25.
A data quality report needs to identify orphaned records (rows in a child table with no matching parent). Write the query pattern.

---', 'sql', 10, '{}'),
('sql-day11', 'cell-2', 'Write a SELF JOIN query to display each employee''s name and their direct manager''s name. Employees with no manager should show ''No Manager'' (use COALESCE).', 'sql', 10, '{}'),
('sql-day11', 'cell-3', 'Find all employees who earn MORE than their direct manager. Show the employee''s name, their salary, the manager''s name, and the manager''s salary.', 'sql', 10, '{}'),
('sql-day11', 'cell-4', 'Using SELF JOIN, find all pairs of employees who work in the same department but are different people. Ensure each pair appears only once (A,B not B,A).', 'sql', 10, '{}'),
('sql-day11', 'cell-5', 'Write a multi-table query joining <code>orders</code>, <code>customers</code>, <code>order_items</code>, and <code>products</code> to show the top 5 most valuable orders (total revenue = sum of quantity × unit_price per order).', 'sql', 10, '{}'),
('sql-day11', 'cell-6', 'Write a CROSS JOIN query to generate all possible product-store combinations from a <code>products</code> table and a <code>stores</code> table. This would be used to populate a full sales matrix (even showing 0-sale combinations).

---', 'sql', 10, '{}'),
('sql-day11', 'cell-7', '---
Q1.
What is a SELF JOIN? Give a real-world use case.', 'sql', 10, '{}'),
('sql-day11', 'cell-8', '---
Q2.
Why do you need to alias the same table twice in a SELF JOIN?', 'sql', 10, '{}'),
('sql-day11', 'cell-9', '---
Q3.
Write a query to find all employees and their manager''s name from a single employees table.', 'sql', 10, '{}'),
('sql-day11', 'cell-10', '---
Q4.
Why would you use LEFT JOIN instead of INNER JOIN in a self-referencing query?', 'sql', 10, '{}'),
('sql-day11', 'cell-11', '---
Q5.
Write a query to find employees who earn more than their manager.', 'sql', 10, '{}'),
('sql-day11', 'cell-12', '---
Q6.
How do you prevent duplicate pairs in a peer-finding SELF JOIN query?', 'sql', 10, '{}'),
('sql-day11', 'cell-13', '---
Q7.
What is a CROSS JOIN? When is it actually useful?', 'sql', 10, '{}'),
('sql-day11', 'cell-14', '---
Q8.
What is the result size of a CROSS JOIN between a 100-row and 50-row table?', 'sql', 10, '{}'),
('sql-day11', 'cell-15', '---
Q9.
What is a LATERAL JOIN in PostgreSQL?', 'sql', 10, '{}'),
('sql-day11', 'cell-16', '---
Q10.
How do you join 4 tables efficiently? What is the recommended approach?', 'sql', 10, '{}'),
('sql-day11', 'cell-17', '---
Q11.
What is the risk of having too many JOINs in a single query?', 'sql', 10, '{}'),
('sql-day11', 'cell-18', '---
Q12.
What is a hierarchical relationship? Give 3 business examples.', 'sql', 10, '{}'),
('sql-day11', 'cell-19', '---
Q13.
How would you find the second-level managers (managers of managers) using SELF JOIN?', 'sql', 10, '{}'),
('sql-day11', 'cell-20', '---
Q14.
What is the difference between a CROSS JOIN and a full Cartesian product from an accidental missing ON clause?', 'sql', 10, '{}'),
('sql-day11', 'cell-21', '---
Q15.
Write a query to find all departments that have employees who earn more than the department average.', 'sql', 10, '{}'),
('sql-day11', 'cell-22', '---
Q16.
What is a "fan-out" problem in multi-table JOIN queries and how does it affect aggregates?', 'sql', 10, '{}'),
('sql-day11', 'cell-23', '---
Q17.
How do you debug a query that returns more rows than expected from a multi-table JOIN?', 'sql', 10, '{}'),
('sql-day11', 'cell-24', '---
Q18.
What is the difference between a SELF JOIN and a recursive CTE (preview of Day 13)?', 'sql', 10, '{}'),
('sql-day11', 'cell-25', '---
Q19.
Explain how CROSS JOIN could be used to generate a report grid.', 'sql', 10, '{}'),
('sql-day11', 'cell-26', '---
Q20.
In a star schema, how do fact tables and dimension tables typically join?', 'sql', 10, '{}'),
('sql-day11', 'cell-27', '---
Q21.
Write a query to find all top-level managers (employees who manage at least one person but have no manager themselves).', 'sql', 10, '{}'),
('sql-day11', 'cell-28', '---
Q22.
Why does a CROSS JOIN not require an ON clause?', 'sql', 10, '{}'),
('sql-day11', 'cell-29', '---
Q23.
What is the performance implication of a CROSS JOIN on large tables?', 'sql', 10, '{}'),
('sql-day11', 'cell-30', '---
Q24.
Write a query to count how many direct reports each manager has.', 'sql', 10, '{}'),
('sql-day11', 'cell-31', '---
Q25.
If the employees table has 10,000 rows and you accidentally forget the ON clause in a SELF JOIN, how many rows would the result have?

---', 'sql', 10, '{}'),
('sql-day12', 'cell-2', 'Write a query using a subquery in WHERE to find all employees who earn more than the company''s average salary. Show their <code>first_name</code>, <code>salary</code>, and the company average for comparison.', 'sql', 10, '{}'),
('sql-day12', 'cell-3', 'Write a correlated subquery to find employees who earn more than the average salary of their own department.', 'sql', 10, '{}'),
('sql-day12', 'cell-4', 'Using a subquery in FROM (derived table), compute the average salary per department, then filter to show only departments with an average salary above ₹65,000.', 'sql', 10, '{}'),
('sql-day12', 'cell-5', 'Write a query using <code>EXISTS</code> to find all departments that have at least one employee earning above ₹90,000. Then write the equivalent query using <code>IN</code>. Compare the two approaches in a comment.', 'sql', 10, '{}'),
('sql-day12', 'cell-6', 'Write a query using <code>NOT EXISTS</code> to find all departments that have NO employees. Compare this approach to the LEFT JOIN + IS NULL anti-join approach from Day 10.

---', 'sql', 10, '{}'),
('sql-day12', 'cell-7', '---
Q1.
What is a subquery? In what four locations can it appear?', 'sql', 10, '{}'),
('sql-day12', 'cell-8', '---
Q2.
What is the difference between a correlated and a non-correlated subquery?', 'sql', 10, '{}'),
('sql-day12', 'cell-9', '---
Q3.
Which runs first: the inner query or the outer query?', 'sql', 10, '{}'),
('sql-day12', 'cell-10', '---
Q4.
What is a derived table (inline view)?', 'sql', 10, '{}'),
('sql-day12', 'cell-11', '---
Q5.
What is a scalar subquery? What happens if it returns more than one row?', 'sql', 10, '{}'),
('sql-day12', 'cell-12', '---
Q6.
What is the difference between <code>IN</code> and <code>EXISTS</code>?', 'sql', 10, '{}'),
('sql-day12', 'cell-13', '---
Q7.
When is <code>EXISTS</code> preferred over <code>IN</code> for performance?', 'sql', 10, '{}'),
('sql-day12', 'cell-14', '---
Q8.
Write a query to find employees who earn above the company average.', 'sql', 10, '{}'),
('sql-day12', 'cell-15', '---
Q9.
What is the risk of using <code>NOT IN</code> when the subquery can return NULL values?', 'sql', 10, '{}'),
('sql-day12', 'cell-16', '---
Q10.
Write a query using <code>NOT EXISTS</code> to find customers with no orders.', 'sql', 10, '{}'),
('sql-day12', 'cell-17', '---
Q11.
What is a correlated subquery? Write an example.', 'sql', 10, '{}'),
('sql-day12', 'cell-18', '---
Q12.
Can a subquery reference columns from the outer query?', 'sql', 10, '{}'),
('sql-day12', 'cell-19', '---
Q13.
What is the difference between a subquery and a JOIN?', 'sql', 10, '{}'),
('sql-day12', 'cell-20', '---
Q14.
When should you use a subquery vs. a JOIN?', 'sql', 10, '{}'),
('sql-day12', 'cell-21', '---
Q15.
What is the performance impact of a correlated subquery on 1 million rows?', 'sql', 10, '{}'),
('sql-day12', 'cell-22', '---
Q16.
Write a query to find the 2nd highest salary using a subquery (without LIMIT/OFFSET or window functions).', 'sql', 10, '{}'),
('sql-day12', 'cell-23', '---
Q17.
What is the difference between a scalar subquery and a table-returning subquery?', 'sql', 10, '{}'),
('sql-day12', 'cell-24', '---
Q18.
Can a subquery appear in the GROUP BY clause?', 'sql', 10, '{}'),
('sql-day12', 'cell-25', '---
Q19.
Write a query to find all departments where the top earner is above ₹1,00,000.', 'sql', 10, '{}'),
('sql-day12', 'cell-26', '---
Q20.
What is a subquery factoring (WITH clause)? (Preview of CTEs.)', 'sql', 10, '{}'),
('sql-day12', 'cell-27', '---
Q21.
What does <code>SELECT 1</code> inside an EXISTS clause mean?', 'sql', 10, '{}'),
('sql-day12', 'cell-28', '---
Q22.
Can you use ORDER BY inside a subquery? Does it have any effect?', 'sql', 10, '{}'),
('sql-day12', 'cell-29', '---
Q23.
Write a query using a subquery to find the department with the most employees.', 'sql', 10, '{}'),
('sql-day12', 'cell-30', '---
Q24.
Explain the concept of "query within a query" to a non-technical person.', 'sql', 10, '{}'),
('sql-day12', 'cell-31', '---
Q25.
What is the difference between a view and a derived table (inline subquery)?

---', 'sql', 10, '{}'),
('sql-day13', 'cell-2', 'Rewrite this subquery using a CTE to improve readability:
``<code>sql
SELECT e.first_name, e.salary
FROM employees e
WHERE e.salary > (SELECT AVG(salary) FROM employees);
</code>``', 'sql', 10, '{}'),
('sql-day13', 'cell-3', 'Write a multi-CTE query that first computes the department-wise average salary, then identifies "premium departments" (avg > ₹75,000), then shows all employees from those premium departments along with their department''s average.', 'sql', 10, '{}'),
('sql-day13', 'cell-4', 'Write a recursive CTE to traverse the employee hierarchy starting from the CEO (the employee with <code>manager_id IS NULL</code>). Display each employee''s name and their level in the org chart (CEO = Level 1, direct reports = Level 2, etc.).', 'sql', 10, '{}'),
('sql-day13', 'cell-5', 'Using a CTE, compute the monthly revenue for 2024. Then, in the outer query, show each month, its revenue, and whether it is ''Above Average'', ''Below Average'', or ''Average'' compared to the annual monthly average.', 'sql', 10, '{}'),
('sql-day13', 'cell-6', 'Use two chained CTEs to: (1) find the top 5 sales reps by total order value, (2) then look up their employee details (name, department) from the employees table. Display the final ranked result.

---', 'sql', 10, '{}'),
('sql-day13', 'cell-7', '---
Q1.
What is a CTE and what keyword defines it?', 'sql', 10, '{}'),
('sql-day13', 'cell-8', '---
Q2.
What is the difference between a CTE and a derived table (subquery in FROM)?', 'sql', 10, '{}'),
('sql-day13', 'cell-9', '---
Q3.
Can a CTE be referenced multiple times in the same query?', 'sql', 10, '{}'),
('sql-day13', 'cell-10', '---
Q4.
What is a recursive CTE? What are the two parts of a recursive CTE?', 'sql', 10, '{}'),
('sql-day13', 'cell-11', '---
Q5.
What is the "anchor member" in a recursive CTE?', 'sql', 10, '{}'),
('sql-day13', 'cell-12', '---
Q6.
What happens if a recursive CTE has no termination condition?', 'sql', 10, '{}'),
('sql-day13', 'cell-13', '---
Q7.
Write a CTE query to find employees earning above the company average.', 'sql', 10, '{}'),
('sql-day13', 'cell-14', '---
Q8.
What is the difference between <code>WITH RECURSIVE</code> in PostgreSQL and recursive CTEs in SQL Server?', 'sql', 10, '{}'),
('sql-day13', 'cell-15', '---
Q9.
Can a CTE reference another CTE defined before it in the same WITH clause?', 'sql', 10, '{}'),
('sql-day13', 'cell-16', '---
Q10.
What is an "optimization fence" in the context of CTEs in PostgreSQL?', 'sql', 10, '{}'),
('sql-day13', 'cell-17', '---
Q11.
Write a CTE to traverse an organizational hierarchy 3 levels deep.', 'sql', 10, '{}'),
('sql-day13', 'cell-18', '---
Q12.
When should you use a CTE vs. a VIEW?', 'sql', 10, '{}'),
('sql-day13', 'cell-19', '---
Q13.
Can CTEs be used with INSERT, UPDATE, or DELETE statements?', 'sql', 10, '{}'),
('sql-day13', 'cell-20', '---
Q14.
What is the lifecycle of a CTE — when does it get materialized?', 'sql', 10, '{}'),
('sql-day13', 'cell-21', '---
Q15.
Write a multi-CTE query that computes running totals.', 'sql', 10, '{}'),
('sql-day13', 'cell-22', '---
Q16.
What is <code>MATERIALIZED</code> vs. <code>NOT MATERIALIZED</code> in a CTE?', 'sql', 10, '{}'),
('sql-day13', 'cell-23', '---
Q17.
What is the maximum depth of recursion in a recursive CTE (in PostgreSQL)?', 'sql', 10, '{}'),
('sql-day13', 'cell-24', '---
Q18.
Can you put an ORDER BY inside a CTE? What is the effect?', 'sql', 10, '{}'),
('sql-day13', 'cell-25', '---
Q19.
What are the advantages of CTEs over subqueries from a code maintenance perspective?', 'sql', 10, '{}'),
('sql-day13', 'cell-26', '---
Q20.
Write a CTE that finds the top 3 departments by headcount.', 'sql', 10, '{}'),
('sql-day13', 'cell-27', '---
Q21.
What is a "bill of materials" query and how does a recursive CTE solve it?', 'sql', 10, '{}'),
('sql-day13', 'cell-28', '---
Q22.
How do you debug a multi-CTE query?', 'sql', 10, '{}'),
('sql-day13', 'cell-29', '---
Q23.
What is the difference between <code>UNION</code> and <code>UNION ALL</code> inside a recursive CTE?', 'sql', 10, '{}'),
('sql-day13', 'cell-30', '---
Q24.
Write a CTE that computes a 3-month rolling average of sales.', 'sql', 10, '{}'),
('sql-day13', 'cell-31', '---
Q25.
When should you NOT use a CTE for performance reasons?

---', 'sql', 10, '{}'),
('sql-day14', 'cell-2', 'Use <code>ROW_NUMBER()</code> to assign a unique rank to each employee within their department based on salary (highest = 1). Show <code>first_name</code>, <code>department_id</code>, <code>salary</code>, and <code>row_num</code>.', 'sql', 10, '{}'),
('sql-day14', 'cell-3', 'Use both <code>RANK()</code> and <code>DENSE_RANK()</code> on the entire employees table, ordered by salary descending. Show a case where they produce different results (ties). Display <code>first_name</code>, <code>salary</code>, <code>rank</code>, and <code>dense_rank</code> side by side.', 'sql', 10, '{}'),
('sql-day14', 'cell-4', 'Using a CTE with <code>RANK()</code>, write a query to find the **top 2 highest-paid employees in each department**. (Remember: you cannot filter on window functions directly in WHERE — use a CTE.)', 'sql', 10, '{}'),
('sql-day14', 'cell-5', 'Use <code>NTILE(5)</code> to divide all employees into 5 salary quintiles. Show <code>first_name</code>, <code>salary</code>, and <code>quintile</code>. Then count how many employees fall in each quintile.', 'sql', 10, '{}'),
('sql-day14', 'cell-6', 'Using <code>ROW_NUMBER()</code> with <code>PARTITION BY</code> and <code>ORDER BY hire_date ASC</code>, find the **first employee hired in each department** (the most senior employee per dept). Display their name, department, and hire date.

---', 'sql', 10, '{}'),
('sql-day14', 'cell-7', '---
Q1.
What is a window function? How is it different from an aggregate function?', 'sql', 10, '{}'),
('sql-day14', 'cell-8', '---
Q2.
What does the <code>OVER()</code> clause do?', 'sql', 10, '{}'),
('sql-day14', 'cell-9', '---
Q3.
What is <code>PARTITION BY</code> in a window function?', 'sql', 10, '{}'),
('sql-day14', 'cell-10', '---
Q4.
What is the difference between <code>ROW_NUMBER()</code>, <code>RANK()</code>, and <code>DENSE_RANK()</code>?', 'sql', 10, '{}'),
('sql-day14', 'cell-11', '---
Q5.
When would you use <code>DENSE_RANK()</code> instead of <code>RANK()</code>?', 'sql', 10, '{}'),
('sql-day14', 'cell-12', '---
Q6.
Write a query to rank employees by salary across the entire company.', 'sql', 10, '{}'),
('sql-day14', 'cell-13', '---
Q7.
Write a query to rank employees by salary within their department.', 'sql', 10, '{}'),
('sql-day14', 'cell-14', '---
Q8.
What is <code>NTILE(4)</code> and what does it produce?', 'sql', 10, '{}'),
('sql-day14', 'cell-15', '---
Q9.
Why can''t you filter on window function results directly in a WHERE clause?', 'sql', 10, '{}'),
('sql-day14', 'cell-16', '---
Q10.
How do you get the top N per group using window functions?', 'sql', 10, '{}'),
('sql-day14', 'cell-17', '---
Q11.
Write a query to find the 2nd highest salary per department.', 'sql', 10, '{}'),
('sql-day14', 'cell-18', '---
Q12.
What happens with ties in <code>ROW_NUMBER()</code>?', 'sql', 10, '{}'),
('sql-day14', 'cell-19', '---
Q13.
What is a window function "partition"?', 'sql', 10, '{}'),
('sql-day14', 'cell-20', '---
Q14.
Can you use multiple window functions with different OVER() clauses in the same SELECT?', 'sql', 10, '{}'),
('sql-day14', 'cell-21', '---
Q15.
What is the execution order of window functions in the SQL Order of Execution?', 'sql', 10, '{}'),
('sql-day14', 'cell-22', '---
Q16.
Write a query to find employees in the top 25% of earners company-wide.', 'sql', 10, '{}'),
('sql-day14', 'cell-23', '---
Q17.
Can you use <code>PARTITION BY</code> without <code>ORDER BY</code>?', 'sql', 10, '{}'),
('sql-day14', 'cell-24', '---
Q18.
What is the difference between <code>RANK()</code> and PERCENT_RANK()`?', 'sql', 10, '{}'),
('sql-day14', 'cell-25', '---
Q19.
Write a query to find the most recent order per customer.', 'sql', 10, '{}'),
('sql-day14', 'cell-26', '---
Q20.
How does <code>ROW_NUMBER()</code> handle ties?', 'sql', 10, '{}'),
('sql-day14', 'cell-27', '---
Q21.
What is the difference between <code>NTILE(4)</code> applied to 10 rows vs. 100 rows?', 'sql', 10, '{}'),
('sql-day14', 'cell-28', '---
Q22.
Write a query to assign a "salary tier" (1=highest to 5=lowest) to employees using NTILE.', 'sql', 10, '{}'),
('sql-day14', 'cell-29', '---
Q23.
Can you use aggregate functions inside a window function''s OVER() clause?', 'sql', 10, '{}'),
('sql-day14', 'cell-30', '---
Q24.
What is the performance cost of window functions on large tables?', 'sql', 10, '{}'),
('sql-day14', 'cell-31', '---
Q25.
A business report needs the top 3 products by revenue per category. Write the SQL.

---', 'sql', 10, '{}'),
('sql-day15', 'cell-2', 'Using <code>LAG()</code>, compute the month-over-month sales change for each month in 2024. Show: <code>month</code>, <code>total_sales</code>, <code>prev_month_sales</code>, <code>sales_change</code>, and <code>pct_change</code> (as a percentage).', 'sql', 10, '{}'),
('sql-day15', 'cell-3', 'Using <code>SUM() OVER()</code> with the <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> frame clause, compute the running cumulative total of order amounts ordered by <code>order_date</code>. Show <code>order_date</code>, <code>amount</code>, and <code>running_total</code>.', 'sql', 10, '{}'),
('sql-day15', 'cell-4', 'Compute a 3-month rolling average of sales. Show months where the rolling average is higher than the actual sales for that month (hint: use a CTE).', 'sql', 10, '{}'),
('sql-day15', 'cell-5', 'Using <code>FIRST_VALUE()</code> and <code>LAST_VALUE()</code>, find for each employee their department''s highest and lowest salary. Make sure to use the correct window frame for <code>LAST_VALUE</code>.', 'sql', 10, '{}'),
('sql-day15', 'cell-6', 'Write a query to show each customer''s orders, and for each order, flag it as ''Increasing'', ''Decreasing'', or ''Same'' based on whether the order amount is greater than, less than, or equal to the previous order by that same customer (use <code>LAG()</code> partitioned by <code>customer_id</code>).

---', 'sql', 10, '{}'),
('sql-day15', 'cell-7', '---
Q1.
What is <code>LAG()</code> and what is <code>LEAD()</code>? Give a practical business use case for each.', 'sql', 10, '{}'),
('sql-day15', 'cell-8', '---
Q2.
What is the third parameter in <code>LAG(column, offset, default)</code> and when is it useful?', 'sql', 10, '{}'),
('sql-day15', 'cell-9', '---
Q3.
What is a running total and how do you compute it in SQL?', 'sql', 10, '{}'),
('sql-day15', 'cell-10', '---
Q4.
What is the window frame clause? What does <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> mean?', 'sql', 10, '{}'),
('sql-day15', 'cell-11', '---
Q5.
What is the difference between <code>ROWS</code> and <code>RANGE</code> in a window frame?', 'sql', 10, '{}'),
('sql-day15', 'cell-12', '---
Q6.
How do you compute a 7-day rolling average in SQL?', 'sql', 10, '{}'),
('sql-day15', 'cell-13', '---
Q7.
What does <code>FIRST_VALUE()</code> return? What common mistake do people make with <code>LAST_VALUE()</code>?', 'sql', 10, '{}'),
('sql-day15', 'cell-14', '---
Q8.
Why do you need <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> for <code>LAST_VALUE()</code>?', 'sql', 10, '{}'),
('sql-day15', 'cell-15', '---
Q9.
What is <code>PERCENT_RANK()</code>? What is its range?', 'sql', 10, '{}'),
('sql-day15', 'cell-16', '---
Q10.
What is <code>CUME_DIST()</code> and how is it different from <code>PERCENT_RANK()</code>?', 'sql', 10, '{}'),
('sql-day15', 'cell-17', '---
Q11.
Write a query to compute month-over-month revenue growth.', 'sql', 10, '{}'),
('sql-day15', 'cell-18', '---
Q12.
Write a query to compute year-to-date cumulative sales.', 'sql', 10, '{}'),
('sql-day15', 'cell-19', '---
Q13.
What is the difference between a moving average and a cumulative sum?', 'sql', 10, '{}'),
('sql-day15', 'cell-20', '---
Q14.
Can <code>LAG()</code> look more than 1 row back? Show the syntax.', 'sql', 10, '{}'),
('sql-day15', 'cell-21', '---
Q15.
Write a query to find the difference between an employee''s salary and the previous employee''s salary when sorted by hire date.', 'sql', 10, '{}'),
('sql-day15', 'cell-22', '---
Q16.
What happens to <code>LAG()</code> at the first row (no previous row)?', 'sql', 10, '{}'),
('sql-day15', 'cell-23', '---
Q17.
Can you use <code>LAG()</code> with <code>PARTITION BY</code> to look at previous rows within a group?', 'sql', 10, '{}'),
('sql-day15', 'cell-24', '---
Q18.
Write a SQL query to compute a running count of orders per customer.', 'sql', 10, '{}'),
('sql-day15', 'cell-25', '---
Q19.
What is the purpose of <code>ROWS BETWEEN 6 PRECEDING AND CURRENT ROW</code>?', 'sql', 10, '{}'),
('sql-day15', 'cell-26', '---
Q20.
How does window frame choice affect the result of <code>AVG()</code> in a window function?', 'sql', 10, '{}'),
('sql-day15', 'cell-27', '---
Q21.
Write a query to flag rows where sales declined compared to the previous period.', 'sql', 10, '{}'),
('sql-day15', 'cell-28', '---
Q22.
What is a "gap and islands" problem? (Advanced — how might LAG/LEAD help solve it?)', 'sql', 10, '{}'),
('sql-day15', 'cell-29', '---
Q23.
How do window functions interact with CTEs for complex analytical queries?', 'sql', 10, '{}'),
('sql-day15', 'cell-30', '---
Q24.
What is the difference between <code>SUM() OVER()</code> and <code>SUM() OVER(ORDER BY date)</code>?', 'sql', 10, '{}'),
('sql-day15', 'cell-31', '---
Q25.
A dashboard needs: current month sales, previous month sales, and 3-month average in one row per month. Write the SQL.

---', 'sql', 10, '{}'),
('sql-day16', 'cell-2', 'The <code>full_name</code> column has inconsistent casing and extra spaces (e.g., ''  jOHN dOE  ''). Write a query to clean it to proper title case with no extra spaces using <code>TRIM</code>, <code>LOWER</code>, and <code>INITCAP</code>.', 'sql', 10, '{}'),
('sql-day16', 'cell-3', 'Extract the <code>username</code> (text before @) and <code>domain</code> (text after @) from the <code>email</code> column as separate columns. Use <code>SPLIT_PART</code> or <code>POSITION</code> + <code>SUBSTRING</code>.', 'sql', 10, '{}'),
('sql-day16', 'cell-4', 'The <code>phone_number</code> column contains numbers in formats like ''(91) 98765-43210'', ''91-98765-43210'', ''+91 98765 43210''. Write a query that standardizes all phone numbers to digits only (remove all non-numeric characters) using <code>REGEXP_REPLACE</code>.', 'sql', 10, '{}'),
('sql-day16', 'cell-5', 'Write a query that finds all customers whose email domain is NOT ''gmail.com'' or ''yahoo.com''. Use string functions to extract the domain and then filter.', 'sql', 10, '{}'),
('sql-day16', 'cell-6', 'The <code>address</code> column stores city, state, and pincode separated by ''|''. Write a query to extract each component into its own column: <code>city</code>, <code>state</code>, <code>pincode</code>. Then filter to show only customers in the state ''Maharashtra''.

---', 'sql', 10, '{}'),
('sql-day16', 'cell-7', '---
Q1.
What is the difference between <code>LENGTH()</code> and <code>CHAR_LENGTH()</code>?', 'sql', 10, '{}'),
('sql-day16', 'cell-8', '---
Q2.
What does <code>TRIM()</code> do? How is it different from <code>LTRIM()</code> and <code>RTRIM()</code>?', 'sql', 10, '{}'),
('sql-day16', 'cell-9', '---
Q3.
Write a query to convert all email addresses to lowercase.', 'sql', 10, '{}'),
('sql-day16', 'cell-10', '---
Q4.
What does <code>CONCAT_WS()</code> do? How is it different from <code>||</code>?', 'sql', 10, '{}'),
('sql-day16', 'cell-11', '---
Q5.
Write a query to extract the first 3 characters of a product code column.', 'sql', 10, '{}'),
('sql-day16', 'cell-12', '---
Q6.
What is <code>LPAD()</code> and when would you use it in data analytics?', 'sql', 10, '{}'),
('sql-day16', 'cell-13', '---
Q7.
How do you find the position of a substring within a string in SQL?', 'sql', 10, '{}'),
('sql-day16', 'cell-14', '---
Q8.
Write a query to replace all spaces in a product name with underscores.', 'sql', 10, '{}'),
('sql-day16', 'cell-15', '---
Q9.
What is <code>SPLIT_PART()</code>? Give an example of parsing a delimited column.', 'sql', 10, '{}'),
('sql-day16', 'cell-16', '---
Q10.
How would you extract the year from a date stored as a VARCHAR column?', 'sql', 10, '{}'),
('sql-day16', 'cell-17', '---
Q11.
Write a query to find all emails that are NOT in valid format (using LIKE or REGEXP).', 'sql', 10, '{}'),
('sql-day16', 'cell-18', '---
Q12.
What is <code>INITCAP()</code>? Is it available in all databases?', 'sql', 10, '{}'),
('sql-day16', 'cell-19', '---
Q13.
How do you remove all non-numeric characters from a phone number column?', 'sql', 10, '{}'),
('sql-day16', 'cell-20', '---
Q14.
What is <code>REGEXP_REPLACE()</code>? Write an example.', 'sql', 10, '{}'),
('sql-day16', 'cell-21', '---
Q15.
How would you check if a string contains a specific word?', 'sql', 10, '{}'),
('sql-day16', 'cell-22', '---
Q16.
Write a query to count the number of words in a text column (hint: count spaces).', 'sql', 10, '{}'),
('sql-day16', 'cell-23', '---
Q17.
What is the difference between <code>POSITION()</code> and <code>STRPOS()</code> in PostgreSQL?', 'sql', 10, '{}'),
('sql-day16', 'cell-24', '---
Q18.
Write a query to generate an employee code as ''EMP'' + a zero-padded employee_id (e.g., ''EMP00042'').', 'sql', 10, '{}'),
('sql-day16', 'cell-25', '---
Q19.
How do you reverse a string in SQL?', 'sql', 10, '{}'),
('sql-day16', 'cell-26', '---
Q20.
What does <code>LEFT(email, POSITION(''@'' IN email) - 1)</code> compute?', 'sql', 10, '{}'),
('sql-day16', 'cell-27', '---
Q21.
Write a query to find all customers whose name starts and ends with the same letter.', 'sql', 10, '{}'),
('sql-day16', 'cell-28', '---
Q22.
What is string concatenation and what operator or function do you use for it?', 'sql', 10, '{}'),
('sql-day16', 'cell-29', '---
Q23.
How would you parse a JSON-like string stored in a VARCHAR column?', 'sql', 10, '{}'),
('sql-day16', 'cell-30', '---
Q24.
Write a query to identify email addresses with more than one ''@'' character.', 'sql', 10, '{}'),
('sql-day16', 'cell-31', '---
Q25.
A data pipeline receives first_name and last_name in a single column as ''Last, First''. Write a query to split it into two separate columns.

---', 'sql', 10, '{}'),
('sql-day17', 'cell-2', 'Write a query to show each employee''s <code>first_name</code>, <code>hire_date</code>, and <code>years_of_service</code> (number of complete years from hire_date to today). Sort by longest-serving first.', 'sql', 10, '{}'),
('sql-day17', 'cell-3', 'Write a monthly revenue report for 2024: group <code>orders</code> by month using <code>DATE_TRUNC</code>, and show total <code>order_count</code> and <code>monthly_revenue</code> for each month. Sort chronologically.', 'sql', 10, '{}'),
('sql-day17', 'cell-4', 'Write a query to find all orders where the shipping took more than 7 days (difference between <code>shipped_date</code> and <code>order_date</code>). Show <code>order_id</code>, <code>order_date</code>, <code>shipped_date</code>, and <code>days_to_ship</code>.', 'sql', 10, '{}'),
('sql-day17', 'cell-5', 'Write a quarterly revenue report that groups revenue by quarter (Q1, Q2, Q3, Q4) for all years in the orders table. Use <code>EXTRACT(QUARTER ...)</code> and <code>EXTRACT(YEAR ...)</code>. Display <code>year</code>, <code>quarter</code>, and <code>quarterly_revenue</code>.', 'sql', 10, '{}'),
('sql-day17', 'cell-6', 'Write a query to display orders from the last 90 days (dynamically calculated — not hardcoded). Format the <code>order_date</code> for display as ''DD Mon YYYY'' (e.g., ''15 Jun 2024'') using <code>TO_CHAR</code>.

---', 'sql', 10, '{}'),
('sql-day17', 'cell-7', '---
Q1.
What is the difference between <code>DATE</code>, <code>TIMESTAMP</code>, and <code>TIMESTAMPTZ</code>?', 'sql', 10, '{}'),
('sql-day17', 'cell-8', '---
Q2.
How do you get the current date in SQL? Does the syntax vary by database?', 'sql', 10, '{}'),
('sql-day17', 'cell-9', '---
Q3.
What does <code>EXTRACT(MONTH FROM hire_date)</code> return?', 'sql', 10, '{}'),
('sql-day17', 'cell-10', '---
Q4.
What does <code>DATE_TRUNC(''month'', order_date)</code> return?', 'sql', 10, '{}'),
('sql-day17', 'cell-11', '---
Q5.
Write a query to calculate the number of days between two dates.', 'sql', 10, '{}'),
('sql-day17', 'cell-12', '---
Q6.
What is the difference between <code>DATEDIFF</code> and date subtraction?', 'sql', 10, '{}'),
('sql-day17', 'cell-13', '---
Q7.
Write a query to find all employees hired in Q3 2023.', 'sql', 10, '{}'),
('sql-day17', 'cell-14', '---
Q8.
How do you add 30 days to a date in PostgreSQL? In MySQL?', 'sql', 10, '{}'),
('sql-day17', 'cell-15', '---
Q9.
What does <code>AGE(date1, date2)</code> return in PostgreSQL?', 'sql', 10, '{}'),
('sql-day17', 'cell-16', '---
Q10.
Write a query to group orders by week number.', 'sql', 10, '{}'),
('sql-day17', 'cell-17', '---
Q11.
What is <code>EPOCH</code> in the context of <code>EXTRACT</code>?', 'sql', 10, '{}'),
('sql-day17', 'cell-18', '---
Q12.
How do you format a date as ''Month YYYY'' for reporting?', 'sql', 10, '{}'),
('sql-day17', 'cell-19', '---
Q13.
Write a query to find all employees with more than 5 years of service.', 'sql', 10, '{}'),
('sql-day17', 'cell-20', '---
Q14.
What is the difference between <code>NOW()</code> and <code>CURRENT_DATE</code>?', 'sql', 10, '{}'),
('sql-day17', 'cell-21', '---
Q15.
How would you find the last day of the current month in SQL?', 'sql', 10, '{}'),
('sql-day17', 'cell-22', '---
Q16.
Write a query to find orders placed on a Sunday.', 'sql', 10, '{}'),
('sql-day17', 'cell-23', '---
Q17.
What is <code>DATE_FORMAT</code> and in which database is it used?', 'sql', 10, '{}'),
('sql-day17', 'cell-24', '---
Q18.
How do you filter records for "last 30 days" dynamically (without hardcoding a date)?', 'sql', 10, '{}'),
('sql-day17', 'cell-25', '---
Q19.
Write a query to find the busiest day of the week for orders.', 'sql', 10, '{}'),
('sql-day17', 'cell-26', '---
Q20.
What is the ISO week number and how is it different from a calendar week?', 'sql', 10, '{}'),
('sql-day17', 'cell-27', '---
Q21.
How do time zones affect TIMESTAMP queries? How do you handle them?', 'sql', 10, '{}'),
('sql-day17', 'cell-28', '---
Q22.
Write a query to find all customers who haven''t placed an order in the last 6 months.', 'sql', 10, '{}'),
('sql-day17', 'cell-29', '---
Q23.
How would you compute a fiscal year quarter (if fiscal year starts in April)?', 'sql', 10, '{}'),
('sql-day17', 'cell-30', '---
Q24.
What is the difference between <code>DATE_TRUNC(''week'', date)</code> and <code>DATE_TRUNC(''isoweek'', date)</code>?', 'sql', 10, '{}'),
('sql-day17', 'cell-31', '---
Q25.
A business needs a report of "last 12 months of revenue, grouped by month". Write the complete SQL query.

---', 'sql', 10, '{}'),
('sql-day18', 'cell-2', 'Combine all orders from <code>orders_2023</code> and <code>orders_2024</code> into a single result set. Add a column <code>year</code> (2023 or 2024) to identify the source. Use <code>UNION ALL</code>. Then count total orders and revenue per year in the outer query using a CTE.', 'sql', 10, '{}'),
('sql-day18', 'cell-3', 'Using <code>INTERSECT</code>, find all customers who placed orders in **both** 2023 and 2024. Display their <code>customer_id</code> and fetch their <code>name</code> from the customers table (use a CTE or subquery).', 'sql', 10, '{}'),
('sql-day18', 'cell-4', 'Using <code>EXCEPT</code>, find all customers who placed orders in 2023 but NOT in 2024 (i.e., they churned). Display their <code>customer_id</code> and <code>name</code>.', 'sql', 10, '{}'),
('sql-day18', 'cell-5', 'You are validating a data migration. The <code>source_employees</code> table should match <code>target_employees</code>. Write two queries: (1) records in source missing from target, (2) records in target not in source (using EXCEPT). Combine both results using UNION ALL and add a <code>direction</code> column (''Source Only'', ''Target Only'').', 'sql', 10, '{}'),
('sql-day18', 'cell-6', 'Build a comprehensive report using <code>UNION ALL</code> that shows:
- Row 1: Total employees from <code>active_employees</code>
- Row 2: Total employees from <code>archived_employees</code>
- Row 3: Grand total across both

Label each with a <code>category</code> column (''Active'', ''Archived'', ''Total''). Use ROLLUP or UNION ALL with a summary row.

---', 'sql', 10, '{}'),
('sql-day18', 'cell-7', '---
Q1.
What is a set operation in SQL? Name the three main set operations.', 'sql', 10, '{}'),
('sql-day18', 'cell-8', '---
Q2.
What is the difference between <code>UNION</code> and <code>UNION ALL</code>?', 'sql', 10, '{}'),
('sql-day18', 'cell-9', '---
Q3.
When should you use <code>UNION ALL</code> instead of <code>UNION</code> for performance?', 'sql', 10, '{}'),
('sql-day18', 'cell-10', '---
Q4.
What are the three rules that all set operations must follow?', 'sql', 10, '{}'),
('sql-day18', 'cell-11', '---
Q5.
What is <code>INTERSECT</code> and what does it return?', 'sql', 10, '{}'),
('sql-day18', 'cell-12', '---
Q6.
What is <code>EXCEPT</code> and what is its Oracle equivalent?', 'sql', 10, '{}'),
('sql-day18', 'cell-13', '---
Q7.
Write a query to find customers who ordered in 2023 but NOT in 2024 using EXCEPT.', 'sql', 10, '{}'),
('sql-day18', 'cell-14', '---
Q8.
Write a query to find customers who ordered in BOTH 2023 AND 2024 using INTERSECT.', 'sql', 10, '{}'),
('sql-day18', 'cell-15', '---
Q9.
What is the difference between UNION (vertical combine) and JOIN (horizontal combine)?', 'sql', 10, '{}'),
('sql-day18', 'cell-16', '---
Q10.
Where does <code>ORDER BY</code> appear when using set operations?', 'sql', 10, '{}'),
('sql-day18', 'cell-17', '---
Q11.
Can you use <code>ORDER BY</code> inside each individual SELECT of a UNION? Why not?', 'sql', 10, '{}'),
('sql-day18', 'cell-18', '---
Q12.
Does <code>UNION</code> guarantee the order of results? Explain.', 'sql', 10, '{}'),
('sql-day18', 'cell-19', '---
Q13.
What happens if the number of columns doesn''t match in a UNION query?', 'sql', 10, '{}'),
('sql-day18', 'cell-20', '---
Q14.
Can column data types differ in a UNION query? What does the database do?', 'sql', 10, '{}'),
('sql-day18', 'cell-21', '---
Q15.
Write a query to consolidate sales from three regional tables into one summary report.', 'sql', 10, '{}'),
('sql-day18', 'cell-22', '---
Q16.
How would you simulate <code>INTERSECT</code> in a database that doesn''t support it (e.g., MySQL doesn''t support INTERSECT directly)?', 'sql', 10, '{}'),
('sql-day18', 'cell-23', '---
Q17.
How would you simulate <code>EXCEPT</code> using a JOIN?', 'sql', 10, '{}'),
('sql-day18', 'cell-24', '---
Q18.
What is the difference between <code>EXCEPT</code> and <code>NOT EXISTS</code>/<code>NOT IN</code>?', 'sql', 10, '{}'),
('sql-day18', 'cell-25', '---
Q19.
Can you UNION more than two queries?', 'sql', 10, '{}'),
('sql-day18', 'cell-26', '---
Q20.
Write a query that uses UNION ALL to create a year-over-year comparison with a ''Year'' label column.', 'sql', 10, '{}'),
('sql-day18', 'cell-27', '---
Q21.
When would you use <code>EXCEPT</code> over LEFT JOIN anti-join pattern?', 'sql', 10, '{}'),
('sql-day18', 'cell-28', '---
Q22.
What is the performance impact of <code>UNION</code> vs. <code>UNION ALL</code> on large result sets?', 'sql', 10, '{}'),
('sql-day18', 'cell-29', '---
Q23.
Write a query to identify data quality issues: rows that exist in a source table but are missing from a target table after a data migration.', 'sql', 10, '{}'),
('sql-day18', 'cell-30', '---
Q24.
Can set operations be combined with GROUP BY, HAVING, or window functions?', 'sql', 10, '{}'),
('sql-day18', 'cell-31', '---
Q25.
A report requires combining employee data from 5 different subsidiary companies, all with the same schema. Which set operation would you use and why? Write the query structure.

---', 'sql', 10, '{}'),
('excel-day01', 'cell-2', '**Q1.** Calculate the product of A2 and B2.', 'excel', 10, '{}'),
('excel-day01', 'cell-3', '**Q2.** Sum the quantities in cells A1, A2, and A3 using basic addition (+).', 'excel', 10, '{}'),
('excel-day01', 'cell-4', '**Q3.** Subtract tax C1 from price B1.', 'excel', 10, '{}'),
('excel-day01', 'cell-5', '**Q4.** Divide price B2 by quantity A2.', 'excel', 10, '{}'),
('excel-day01', 'cell-6', '**Q5.** Calculate total price including tax for item 3 (A3 * B3 + C3).', 'excel', 10, '{}'),
('excel-day01', 'cell-7', '**Task 1 (Aggregate Quantity):** Calculate the sum of all quantities from A1 to A3 using the SUM function.', 'excel', 10, '{}'),
('excel-day01', 'cell-8', '---
Q1.
Write the formula to calculate the average price of items 1, 2, and 3 using the AVERAGE function.', 'excel', 10, '{}'),
('excel-day02', 'cell-2', '**Q1.** Find the total price of all items in column C.', 'excel', 10, '{}'),
('excel-day02', 'cell-3', '**Q2.** Find the average rating of items in column B.', 'excel', 10, '{}'),
('excel-day02', 'cell-4', '**Q3.** Count the number of items listed in column A using the COUNT function on ratings in column B.', 'excel', 10, '{}'),
('excel-day02', 'cell-5', '**Task 1 (Total Rating):** Calculate the sum of all ratings from B1 to B3.', 'excel', 10, '{}'),
('excel-day02', 'cell-6', '---
Q1.
Write a formula to calculate the average of the ratings in B1, B2, and B3.', 'excel', 10, '{}'),
('excel-day03', 'cell-2', '**Q1.** Convert text in A2 to lowercase.', 'excel', 10, '{}'),
('excel-day03', 'cell-3', '**Q2.** Convert text in A1 to uppercase.', 'excel', 10, '{}'),
('excel-day03', 'cell-4', '**Q3.** Find the total values in B1 and B2.', 'excel', 10, '{}'),
('excel-day03', 'cell-5', '**Task 1 (Total Values):** Calculate the sum of all numerical cell values from B1 to B2.', 'excel', 10, '{}'),
('excel-day03', 'cell-6', '---
Q1.
Convert the text in A1 to lowercase.', 'excel', 10, '{}'),
('excel-day04', 'cell-2', '**Q1.** Calculate sum of A1 and B1.', 'excel', 10, '{}'),
('excel-day04', 'cell-3', '**Q2.** Calculate sum of A2 and B2.', 'excel', 10, '{}'),
('excel-day04', 'cell-4', '**Q3.** Calculate total base in range A1:A2.', 'excel', 10, '{}'),
('excel-day04', 'cell-5', '**Task 1 (Total Earnings):** Calculate total base plus bonus in range A1:B2.', 'excel', 10, '{}'),
('excel-day04', 'cell-6', '---
Q1.
Calculate total bonus in range B1:B2.', 'excel', 10, '{}'),
('excel-day05', 'cell-2', '**Q1.** Convert B2 item name to uppercase.', 'excel', 10, '{}'),
('excel-day05', 'cell-3', '**Q2.** Convert B1 item name to lowercase.', 'excel', 10, '{}'),
('excel-day05', 'cell-4', '**Q3.** Find sum of A1 and A2.', 'excel', 10, '{}'),
('excel-day05', 'cell-5', '**Task 1 (ID Casing):** Convert item name Tablet in B1 to uppercase.', 'excel', 10, '{}'),
('excel-day05', 'cell-6', '---
Q1.
Convert item name Phone in B2 to uppercase.', 'excel', 10, '{}'),
('excel-day06', 'cell-2', '**Q1.** Check if student 1 grade A1 is >= 50. Return 1 if true, else 0.', 'excel', 10, '{}'),
('excel-day06', 'cell-3', '**Q2.** Check if student 2 grade A2 is >= 50. Return 1 if true, else 0.', 'excel', 10, '{}'),
('excel-day06', 'cell-4', '**Q3.** Check if student 1 attendance B1 is >= 75. Return 1 if true, else 0.', 'excel', 10, '{}'),
('excel-day06', 'cell-5', '**Task 1 (Pass Check):** Check if student 2 grade in A2 is >= 50, returning 1 if true and 0 if false.', 'excel', 10, '{}'),
('excel-day06', 'cell-6', '---
Q1.
Write an IF statement that checks if A1 is greater than or equal to 75, returning 1 if true and 0 if false.', 'excel', 10, '{}'),
('excel-day07', 'cell-2', '**Q1.** Join first and last name in row 2 using CONCAT.', 'excel', 10, '{}'),
('excel-day07', 'cell-3', '**Q2.** Convert first name in A1 to uppercase.', 'excel', 10, '{}'),
('excel-day07', 'cell-4', '**Q3.** Convert last name in B2 to lowercase.', 'excel', 10, '{}'),
('excel-day07', 'cell-5', '**Task 1 (Full Name):** Join Rahul and Sharma in row 1 using CONCAT.', 'excel', 10, '{}'),
('excel-day07', 'cell-6', '---
Q1.
Convert the text in A2 to uppercase.', 'excel', 10, '{}'),
('excel-day08', 'cell-2', '**Q1.** Calculate difference between B2 and A2.', 'excel', 10, '{}'),
('excel-day08', 'cell-3', '**Q2.** Find sum of start days A1 and A2.', 'excel', 10, '{}'),
('excel-day08', 'cell-4', '**Q3.** Find average of end days B1 and B2.', 'excel', 10, '{}'),
('excel-day08', 'cell-5', '**Task 1 (Date Difference):** Calculate B2 minus A2.', 'excel', 10, '{}'),
('excel-day08', 'cell-6', '---
Q1.
Calculate B1 minus A1.', 'excel', 10, '{}'),
('excel-day09', 'cell-2', '**Q1.** Find the sum of all amounts in range A1:A3.', 'excel', 10, '{}'),
('excel-day09', 'cell-3', '**Q2.** Check if row 2 status B2 is Pending, returning A2 if true and 0 if false.', 'excel', 10, '{}'),
('excel-day09', 'cell-4', '**Q3.** Convert status B1 to uppercase.', 'excel', 10, '{}'),
('excel-day09', 'cell-5', '**Task 1 (Paid Amount Check):** Check if status B3 is Paid, returning amount A3 if true and 0 if false.', 'excel', 10, '{}'),
('excel-day09', 'cell-6', '---
Q1.
Calculate total amount in range A1:A3.', 'excel', 10, '{}'),
('excel-day10', 'cell-2', '**Q1.** Sum values in B1 and B2.', 'excel', 10, '{}'),
('excel-day10', 'cell-3', '**Q2.** Find the average of values in range B1:B2.', 'excel', 10, '{}'),
('excel-day10', 'cell-4', '**Q3.** Convert category in A1 to lowercase.', 'excel', 10, '{}'),
('excel-day10', 'cell-5', '**Task 1 (Total revenue):** Calculate sum of all revenues from B1 to B2.', 'excel', 10, '{}'),
('excel-day10', 'cell-6', '---
Q1.
Calculate average revenue of values B1:B2.', 'excel', 10, '{}'),
('excel-day11', 'cell-2', '**Q1.** Calculate average hours worked across B1:B2.', 'excel', 10, '{}'),
('excel-day11', 'cell-3', '**Q2.** Check if project in A1 is Alpha, returning B1 if true and 0 if false.', 'excel', 10, '{}'),
('excel-day11', 'cell-4', '**Q3.** Join A1 and A2 using CONCAT.', 'excel', 10, '{}'),
('excel-day11', 'cell-5', '**Task 1 (Total Hours):** Calculate the sum of all hours from B1 to B2.', 'excel', 10, '{}'),
('excel-day11', 'cell-6', '---
Q1.
Calculate average hours from B1 to B2.', 'excel', 10, '{}'),
('excel-day12', 'cell-2', '**Q1.** Calculate profit for project 2 (B2 - A2).', 'excel', 10, '{}'),
('excel-day12', 'cell-3', '**Q2.** Calculate total cost across A1:A2.', 'excel', 10, '{}'),
('excel-day12', 'cell-4', '**Q3.** Calculate total revenue across B1:B2.', 'excel', 10, '{}'),
('excel-day12', 'cell-5', '**Task 1 (Total Profit):** Calculate total profit across both projects (B1 - A1 + B2 - A2).', 'excel', 10, '{}'),
('excel-day12', 'cell-6', '---
Q1.
Calculate total cost in range A1:A2.', 'excel', 10, '{}')
ON CONFLICT (day_id, cell_id) DO UPDATE SET question_text = EXCLUDED.question_text, kernel = EXCLUDED.kernel;
