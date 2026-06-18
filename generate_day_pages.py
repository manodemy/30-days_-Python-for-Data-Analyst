"""
generate_day_pages.py
Generates fully-populated HTML day pages for the SQL (20 days) and Excel (12 days) courses.
Output: sql/dayNN.html, excel/dayNN.html, public/sql/dayNN.html, public/excel/dayNN.html
"""

import os
import html as html_lib

# ─────────────────────────────────────────────────────────────────────────────
# SQL CURRICULUM (20 days)
# ─────────────────────────────────────────────────────────────────────────────
from sql_curriculum import SQL_CURRICULUM

# ─────────────────────────────────────────────────────────────────────────────
# EXCEL CURRICULUM (12 days)
# ─────────────────────────────────────────────────────────────────────────────
EXCEL_CURRICULUM = [
    {
        "day": 1, "title": "Excel Orientation & Essential Formulas", "emoji": "📊",
        "objective": "Learn spreadsheet coordinate navigation, cell references, basic arithmetic operators, and essential function syntax.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Quantity)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Price)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">C (Tax)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="10" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">10</td>
        <td id="cell-B1" data-val="150" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">150</td>
        <td id="cell-C1" data-val="15" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">15</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="5" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">5</td>
        <td id="cell-B2" data-val="300" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">300</td>
        <td id="cell-C2" data-val="30" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">30</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">3</td>
        <td id="cell-A3" data-val="2" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">2</td>
        <td id="cell-B3" data-val="1200" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">1200</td>
        <td id="cell-C3" data-val="120" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">120</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Spreadsheet Coordinates", "subtitle": "Columns, Rows and Operators",
            "theory": "Excel stores data in columns (A, B, C...) and rows (1, 2, 3...). Every formula starts with an equals sign (=). You can perform standard arithmetic (+, -, *, /) and use ranges (A1:B3) inside functions. Cell references update automatically when you copy formulas — this is called relative referencing.",
            "demo": "=A1*B1+C1",
            "cc": "Basic Formulas",
            "questions": [
                "Calculate the product of A2 and B2.",
                "Sum the quantities in cells A1, A2, and A3 using basic addition (+).",
                "Subtract tax C1 from price B1.",
                "Divide price B2 by quantity A2.",
                "Calculate total price including tax for item 3 (A3 * B3 + C3)."
            ]
        }],
        "tasks": [{"name": "Aggregate Quantity", "desc": "Calculate the sum of all quantities from A1 to A3 using the SUM function."}],
        "interviews": ["Write the formula to calculate the average price of items 1, 2, and 3 using the AVERAGE function."],
        "summary": "Every Excel formula starts with <code>=</code>. Cell references like <code>A1</code> are the building blocks of all spreadsheet logic. Basic operators (+, -, *, /) combined with functions like <code>SUM()</code> and <code>AVERAGE()</code> allow you to build powerful calculations across ranges of data."
    },
    {
        "day": 2, "title": "Formatting, Sorting & Filtering", "emoji": "🎨",
        "objective": "Understand how formatting styles cells, and sort or filter a data grid by specific column constraints.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Product)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Rating)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">C (Price)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="Phone" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Phone</td>
        <td id="cell-B1" data-val="4.5" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">4.5</td>
        <td id="cell-C1" data-val="50000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">50000</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="Book" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Book</td>
        <td id="cell-B2" data-val="4.8" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">4.8</td>
        <td id="cell-C2" data-val="500" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">500</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">3</td>
        <td id="cell-A3" data-val="Laptop" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Laptop</td>
        <td id="cell-B3" data-val="4.2" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">4.2</td>
        <td id="cell-C3" data-val="80000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">80000</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Grid Sorting and Filtering", "subtitle": "Formatting and Data Ordering",
            "theory": "Excel lets you sort data A–Z, Z–A, or by custom rules on any column. AutoFilter adds dropdown arrows that let you filter rows by value, color, or formula criteria. Number formatting (currency, percentage, decimal places) does not change the underlying value — it only affects display. Conditional Formatting applies color rules based on cell values.",
            "demo": "=SUM(C1:C3)",
            "cc": "Basic Formulas",
            "questions": [
                "Find the total price of all items in column C using <code>SUM(C1:C3)</code>.",
                "Find the average rating of items in column B using the <code>AVERAGE</code> function.",
                "Count the number of items listed by counting ratings in column B using <code>COUNT</code>.",
                "Find the maximum price in column C using <code>MAX</code>.",
                "Find the minimum rating in column B using <code>MIN</code>."
            ]
        }],
        "tasks": [{"name": "Total Rating", "desc": "Calculate the sum of all ratings from B1 to B3."}],
        "interviews": ["Write a formula to calculate the average of the ratings in B1, B2, and B3."],
        "summary": "Sorting (Data → Sort) and filtering (Data → AutoFilter) are Excel's primary data exploration tools. <code>MAX()</code> and <code>MIN()</code> help you quickly find extremes. Conditional Formatting visually highlights outliers — making it easy to spot trends without formulas."
    },
    {
        "day": 3, "title": "Data Cleaning Essentials", "emoji": "🧹",
        "objective": "Remove unwanted whitespace, normalize text casing, and handle blanks and duplicates to create clean, usable datasets.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Dirty Text)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Number)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="  Delhi" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">  Delhi</td>
        <td id="cell-B1" data-val="100" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">100</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="Mumbai " style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Mumbai </td>
        <td id="cell-B2" data-val="250" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">250</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Text Trimming & Casing", "subtitle": "Formatting Cases and Cleaning Spacing",
            "theory": "Raw data is rarely clean. <code>TRIM(cell)</code> removes all leading and trailing spaces. <code>UPPER(cell)</code> converts to uppercase, <code>LOWER(cell)</code> to lowercase, and <code>PROPER(cell)</code> capitalizes each word. <code>COUNTA(range)</code> counts non-empty cells. <code>IFERROR(formula, fallback)</code> replaces formula errors with a default value.",
            "demo": "=UPPER(A1)",
            "cc": "Basic Cleaning",
            "questions": [
                "Convert text in A2 to lowercase using <code>LOWER</code>.",
                "Convert text in A1 to uppercase using <code>UPPER</code>.",
                "Find the total values in B1 and B2.",
                "Use <code>TRIM</code> to clean the spaces from A1.",
                "Use <code>PROPER</code> to title-case the text in A2."
            ]
        }],
        "tasks": [{"name": "Total Values", "desc": "Calculate the sum of all numerical cell values from B1 to B2."}],
        "interviews": ["Write a formula that trims whitespace AND converts cell A1 to proper case in a single formula."],
        "summary": "<code>TRIM()</code> is the single most-used data cleaning function — trailing spaces cause lookup failures and sort errors. Chain cleaning functions: <code>=TRIM(PROPER(A1))</code>. <code>COUNTA()</code> counts non-blanks to quickly audit how many records have data in a given column."
    },
    {
        "day": 4, "title": "Excel Tables", "emoji": "📋",
        "objective": "Convert data ranges into structured Excel Tables to unlock auto-expansion, structured references, and quick aggregation.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Base Salary)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Bonus)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="5000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">5000</td>
        <td id="cell-B1" data-val="500" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">500</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="6000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">6000</td>
        <td id="cell-B2" data-val="800" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">800</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Structured Tables", "subtitle": "Aggregations Over Ranges",
            "theory": "Excel Tables (Insert → Table or Ctrl+T) transform a plain data range into a powerful structured object. Tables auto-expand when new rows are added, support structured references like <code>TableName[ColumnName]</code>, and have built-in filter dropdowns. The Total Row can instantly compute SUM, AVERAGE, COUNT, and more for each column.",
            "demo": "=SUM(A1:B2)",
            "cc": "Table Formulas",
            "questions": [
                "Calculate sum of A1 and B1 (total compensation for row 1).",
                "Calculate sum of A2 and B2 (total compensation for row 2).",
                "Calculate total base salary in range A1:A2.",
                "Calculate total bonus in range B1:B2.",
                "Calculate average base salary across A1:A2."
            ]
        }],
        "tasks": [{"name": "Total Earnings", "desc": "Calculate total compensation (base + bonus) across both rows using SUM(A1:B2)."}],
        "interviews": ["Calculate total bonus in range B1:B2 and explain why Excel Tables are better than plain ranges for growing datasets."],
        "summary": "Excel Tables are the professional way to manage data. They auto-expand, support structured references, and make formulas self-documenting. Always convert raw data to a Table before building PivotTables or VLOOKUP references — it prevents broken references when data grows."
    },
    {
        "day": 5, "title": "Lookup & Reference Functions", "emoji": "🔍",
        "objective": "Perform vertical and horizontal index searching across tables to retrieve related data from lookup tables.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Item ID)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Item Name)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">C (Price)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="101" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">101</td>
        <td id="cell-B1" data-val="Tablet" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Tablet</td>
        <td id="cell-C1" data-val="25000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">25000</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="102" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">102</td>
        <td id="cell-B2" data-val="Phone" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Phone</td>
        <td id="cell-C2" data-val="50000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">50000</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "VLOOKUP & INDEX/MATCH", "subtitle": "Lookup and Matching Functions",
            "theory": "<code>VLOOKUP(lookup_value, table_array, col_index, FALSE)</code> searches the first column of a table for a value and returns a value from another column. Always use FALSE for exact match. <code>INDEX(array, MATCH(value, column, 0))</code> is more flexible — it can look left, handles reordered columns, and is generally faster on large datasets.",
            "demo": "=VLOOKUP(101, A1:C2, 2, FALSE)",
            "cc": "Lookup Functions",
            "questions": [
                "Use VLOOKUP to find the name of item with ID 101.",
                "Use VLOOKUP to find the price of item with ID 102.",
                "Calculate the sum of prices in C1:C2.",
                "Find the maximum price in C1:C2.",
                "Convert the item name in B1 to uppercase."
            ]
        }],
        "tasks": [{"name": "Price Lookup", "desc": "Use VLOOKUP to find the price of item ID 102 from the lookup table A1:C2."}],
        "interviews": ["Explain why INDEX+MATCH is often preferred over VLOOKUP. When would you choose VLOOKUP?"],
        "summary": "<code>VLOOKUP</code> is the most recognized Excel function in job interviews. Always use <code>FALSE</code> for exact match. Its weakness: it only looks right from the lookup column. <code>INDEX(MATCH())</code> solves this — it can look left/right/up/down, making it the professional's choice."
    },
    {
        "day": 6, "title": "Logic Functions", "emoji": "🔀",
        "objective": "Apply logical flow control statements such as IF, AND, and OR to spreadsheet computations.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Grade)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Attendance %)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="85" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">85</td>
        <td id="cell-B1" data-val="90" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">90</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="45" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">45</td>
        <td id="cell-B2" data-val="70" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">70</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Logical Formulas", "subtitle": "IF, AND, OR Conditionals",
            "theory": "The <code>IF(condition, value_if_true, value_if_false)</code> function is the foundation of conditional logic in Excel. <code>AND(cond1, cond2)</code> requires all conditions to be TRUE. <code>OR(cond1, cond2)</code> requires any one condition to be TRUE. <code>IFS(cond1, val1, cond2, val2, ...)</code> handles multiple conditions without nesting.",
            "demo": "=IF(A1>=50, \"Pass\", \"Fail\")",
            "cc": "Logic Functions",
            "questions": [
                "Check if student 1 grade A1 is >= 50. Return 'Pass' if true, else 'Fail'.",
                "Check if student 2 grade A2 is >= 50. Return 'Pass' if true, else 'Fail'.",
                "Check if student 1 attendance B1 is >= 75. Return 'Good' if true, else 'Poor'.",
                "Use AND to check if student 1 both passed (A1>=50) AND has good attendance (B1>=75).",
                "Use OR to check if student 2 either passed (A2>=50) OR has good attendance (B2>=75)."
            ]
        }],
        "tasks": [{"name": "Pass Check", "desc": "Check if student 2 grade in A2 is >= 50, returning 'Pass' if true and 'Fail' if false."}],
        "interviews": ["Write a nested IF formula that returns 'Distinction' if A1>=75, 'Pass' if A1>=50, and 'Fail' otherwise."],
        "summary": "<code>IF()</code> is Excel's most powerful single function. Avoid deep nesting (>3 levels) — use <code>IFS()</code> instead. <code>AND()</code>/<code>OR()</code> enable multi-condition logic. A common pattern: <code>=IF(AND(A1>=50, B1>=75), \"Eligible\", \"Not Eligible\")</code> for eligibility checks."
    },
    {
        "day": 7, "title": "Text Functions", "emoji": "📝",
        "objective": "Join strings, extract substrings, and modify character cases dynamically using Excel text operations.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (First Name)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Last Name)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="Rahul" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Rahul</td>
        <td id="cell-B1" data-val="Sharma" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Sharma</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="Amit" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Amit</td>
        <td id="cell-B2" data-val="Verma" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Verma</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Text Manipulation", "subtitle": "Concatenation, Extraction and Casing",
            "theory": "<code>CONCAT(A1, \" \", B1)</code> or <code>A1&\" \"&B1</code> joins text values. <code>LEFT(text, n)</code> extracts the first n characters. <code>RIGHT(text, n)</code> extracts the last n. <code>MID(text, start, length)</code> extracts from a middle position. <code>LEN(text)</code> returns the total character count. <code>FIND(substring, text)</code> returns the position of a character.",
            "demo": "=CONCAT(A1, \" \", B1)",
            "cc": "Text Functions",
            "questions": [
                "Join first and last name in row 2 with a space between using CONCAT.",
                "Convert first name in A1 to uppercase.",
                "Convert last name in B2 to lowercase.",
                "Extract the first 3 characters of A1 using LEFT.",
                "Find the length (number of characters) of the full name A1 & B1."
            ]
        }],
        "tasks": [{"name": "Full Name", "desc": "Join Rahul (A1) and Sharma (B1) with a space between using CONCAT."}],
        "interviews": ["Write a formula to extract only the first name from a cell containing a full name 'Rahul Sharma' (assume single space separation)."],
        "summary": "Text functions are key for data transformation. The ampersand <code>&</code> operator and <code>CONCAT()</code> join strings. <code>LEFT()</code>/<code>RIGHT()</code>/<code>MID()</code> extract parts. A powerful combo: <code>=LEFT(A1, FIND(\" \", A1)-1)</code> extracts the first name from any full name."
    },
    {
        "day": 8, "title": "Date & Time Functions", "emoji": "📅",
        "objective": "Understand date serial numbers, extract date parts, and calculate time differences between dates.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Start Date as Days)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (End Date as Days)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="10" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">10</td>
        <td id="cell-B1" data-val="35" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">35</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="20" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">20</td>
        <td id="cell-B2" data-val="60" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">60</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Date & Time Calculations", "subtitle": "Date Arithmetic and Extraction",
            "theory": "Excel stores dates as serial numbers (January 1, 1900 = 1). This means you can add/subtract days from dates directly. <code>TODAY()</code> returns today's date. <code>YEAR(date)</code>, <code>MONTH(date)</code>, <code>DAY(date)</code> extract parts. <code>DATEDIF(start, end, unit)</code> calculates the difference in days ('D'), months ('M'), or years ('Y').",
            "demo": "=B1-A1",
            "cc": "Date Calculations",
            "questions": [
                "Calculate the difference (in days) between B1 and A1.",
                "Calculate the difference (in days) between B2 and A2.",
                "Find the sum of start days A1 and A2.",
                "Find the average of end days B1 and B2.",
                "Find the maximum end day value in B1:B2."
            ]
        }],
        "tasks": [{"name": "Date Difference", "desc": "Calculate B2 minus A2 to find the number of days in period 2."}],
        "interviews": ["Explain how Excel stores dates internally and how this makes date arithmetic straightforward."],
        "summary": "Excel's date serial number system makes date math simple: just subtract dates to get days. Key functions: <code>TODAY()</code> for today's date, <code>YEAR()</code>/<code>MONTH()</code>/<code>DAY()</code> for extraction, and <code>DATEDIF()</code> for differences in months or years. Always check cell formatting when working with dates."
    },
    {
        "day": 9, "title": "Conditional Aggregation", "emoji": "🧮",
        "objective": "Perform logical count, sum, and average aggregations depending on single or multiple cell criteria.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Amount)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Status)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="1000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">1000</td>
        <td id="cell-B1" data-val="Paid" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Paid</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="2500" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">2500</td>
        <td id="cell-B2" data-val="Pending" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Pending</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">3</td>
        <td id="cell-A3" data-val="3000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">3000</td>
        <td id="cell-B3" data-val="Paid" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Paid</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Conditional Aggregation", "subtitle": "COUNTIF, SUMIF, AVERAGEIF",
            "theory": "<code>COUNTIF(range, criteria)</code> counts cells meeting a condition. <code>SUMIF(range, criteria, sum_range)</code> sums cells in a sum_range where the criteria range matches. <code>AVERAGEIF(range, criteria, avg_range)</code> averages matching values. The multi-condition versions <code>COUNTIFS</code>, <code>SUMIFS</code>, and <code>AVERAGEIFS</code> accept multiple range/criteria pairs.",
            "demo": "=SUMIF(B1:B3, \"Paid\", A1:A3)",
            "cc": "Conditional Math",
            "questions": [
                "Use SUMIF to calculate the total amount of 'Paid' transactions.",
                "Use COUNTIF to count how many transactions have status 'Paid'.",
                "Find the sum of all amounts in range A1:A3.",
                "Use AVERAGEIF to find the average amount of 'Paid' transactions.",
                "Use IF to check if status B3 is 'Paid', returning A3 if true and 0 if false."
            ]
        }],
        "tasks": [{"name": "Paid Amount", "desc": "Use SUMIF to calculate the total amount of all 'Paid' transactions from A1:A3 where B1:B3 = 'Paid'."}],
        "interviews": ["Explain the difference between SUMIF and SUMIFS. Give an example where SUMIFS is necessary."],
        "summary": "<code>SUMIF</code>/<code>COUNTIF</code>/<code>AVERAGEIF</code> are the conditional aggregation trinity in Excel. For multiple conditions, use the IFS variants: <code>SUMIFS(sum_range, range1, crit1, range2, crit2)</code>. These functions power virtually all business reporting in Excel — revenue by region, count by status, average by category."
    },
    {
        "day": 10, "title": "PivotTables Core Mechanics", "emoji": "⚙️",
        "objective": "Build PivotTables to cross-tabulate categories and create aggregate summaries without writing formulas.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Category)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Revenue)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="Hardware" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Hardware</td>
        <td id="cell-B1" data-val="15000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">15000</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="Software" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Software</td>
        <td id="cell-B2" data-val="25000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">25000</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "PivotTable Basics", "subtitle": "Cross Tabulations and Summarization",
            "theory": "A PivotTable (Insert → PivotTable) dynamically summarizes data by dragging fields into Rows, Columns, Values, and Filters areas. It can group, count, sum, average, and rank data without any formulas. Refreshing a PivotTable (right-click → Refresh) updates it when source data changes. Row fields define the grouping dimension; Value fields define what is calculated.",
            "demo": "=SUM(B1:B2)",
            "cc": "PivotTable Formulas",
            "questions": [
                "Calculate the total revenue across B1 and B2.",
                "Find the average revenue of values in range B1:B2.",
                "Find the maximum revenue value in B1:B2.",
                "Convert category in A1 to uppercase.",
                "Calculate 10% of the total revenue (SUM(B1:B2) * 0.10)."
            ]
        }],
        "tasks": [{"name": "Total Revenue", "desc": "Calculate total revenue across both categories using SUM(B1:B2)."}],
        "interviews": ["Explain what a PivotTable Rows field, Values field, and Filters field do. Give a real-world example of each."],
        "summary": "PivotTables are the most powerful feature in Excel for data analysis — no formulas needed. Drag a category field to Rows, a numeric field to Values (set to SUM or COUNT), and instantly get a summary report. Always ensure your source data has headers and no blank rows before inserting a PivotTable."
    },
    {
        "day": 11, "title": "PivotTables Advanced & Charts", "emoji": "📈",
        "objective": "Build calculated fields, use slicers to interactively filter PivotTables, and visualize data with PivotCharts.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Project)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Hours)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="Alpha" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Alpha</td>
        <td id="cell-B1" data-val="120" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">120</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="Beta" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">Beta</td>
        <td id="cell-B2" data-val="80" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">80</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Advanced PivotTable Features", "subtitle": "Calculated Fields, Slicers and Charts",
            "theory": "Calculated Fields (PivotTable Analyze → Fields, Items & Sets → Calculated Field) let you create new measures using existing field formulas — e.g., Profit = Revenue - Cost. Slicers are visual filter buttons that let users click to filter PivotTables interactively. PivotCharts link directly to a PivotTable and automatically update when filters change.",
            "demo": "=SUM(B1:B2)",
            "cc": "Advanced Aggregations",
            "questions": [
                "Calculate total hours worked across B1:B2.",
                "Find the average hours worked across B1:B2.",
                "Use IF to check if project in A1 is 'Alpha', returning B1 if true and 0 if false.",
                "Find the maximum hours in B1:B2.",
                "Join project names A1 and A2 using CONCAT with a comma separator."
            ]
        }],
        "tasks": [{"name": "Total Hours", "desc": "Calculate the total hours across both projects using SUM(B1:B2)."}],
        "interviews": ["What is a Calculated Field in a PivotTable? Give an example of when you would use one."],
        "summary": "Calculated Fields transform a PivotTable into a mini reporting engine — computing profit margins, growth percentages, or conversion rates dynamically. Slicers make dashboards interactive without VBA. PivotCharts update in real-time when slicer filters change, enabling one-click executive dashboards."
    },
    {
        "day": 12, "title": "Data Validation, What-If & Capstone", "emoji": "🏆",
        "objective": "Build validation rules for data entry, use What-If scenarios for business modelling, and complete the Excel Capstone challenge.",
        "grid_html": """<div class="excel-grid-container" style="margin: 20px 0; overflow-x: auto;">
  <table class="excel-grid" style="border-collapse: collapse; width: 100%; max-width: 500px; background-color: #0b0f19; border: 1px solid #1f293d; font-family: sans-serif; font-size: 14px; text-align: center;">
    <thead><tr style="background-color: #161f30; color: #9ab4e9;">
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold; width: 40px;"></th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">A (Cost)</th>
      <th style="border: 1px solid #1f293d; padding: 8px; font-weight: bold;">B (Revenue)</th>
    </tr></thead>
    <tbody>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">1</td>
        <td id="cell-A1" data-val="10000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">10000</td>
        <td id="cell-B1" data-val="15000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">15000</td></tr>
      <tr><td style="border: 1px solid #1f293d; padding: 8px; background-color: #161f30; color: #9ab4e9; font-weight: bold;">2</td>
        <td id="cell-A2" data-val="20000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">20000</td>
        <td id="cell-B2" data-val="32000" style="border: 1px solid #1f293d; padding: 8px; color: #e2e8f0;">32000</td></tr>
    </tbody>
  </table>
</div>""",
        "sections": [{
            "num": 1, "title": "Capstone: Validation & What-If", "subtitle": "Data Integrity and Business Modelling",
            "theory": "Data Validation (Data → Data Validation) restricts cell input — e.g., allowing only numbers between 1 and 100, or a dropdown list of approved values. Goal Seek (What-If Analysis → Goal Seek) finds the input value needed to achieve a target formula result. Scenario Manager stores multiple what-if scenarios (e.g., Best Case / Worst Case) for side-by-side comparison.",
            "demo": "=B1-A1",
            "cc": "Capstone Formulas",
            "questions": [
                "Calculate profit for project 1 (B1 - A1).",
                "Calculate profit for project 2 (B2 - A2).",
                "Calculate total cost across A1:A2.",
                "Calculate total revenue across B1:B2.",
                "Calculate the profit margin percentage for project 1: ((B1-A1)/B1)*100."
            ]
        }],
        "tasks": [{"name": "Total Profit", "desc": "Calculate total profit across both projects: (B1 - A1) + (B2 - A2)."}],
        "interviews": ["What is Goal Seek in Excel? Describe a real-world scenario where you would use it."],
        "summary": "🎉 Congratulations on completing the 12-Day Excel for Data Analyst course! You have mastered formulas, lookups, logic, text/date functions, SUMIF, PivotTables, and business modelling tools. These skills — especially VLOOKUP, SUMIFS, and PivotTables — are the backbone of data work in finance, marketing, operations, and virtually every industry."
    },
]


# ─────────────────────────────────────────────────────────────────────────────
# HTML GENERATOR
# ─────────────────────────────────────────────────────────────────────────────

def build_dropdown(curriculum, current_day, course_type):
    lines = []
    for item in curriculum:
        d = item['day']
        active = 'active' if d == current_day else ''
        title = item['title']
        emoji = item['emoji']
        num = f"{d:02d}"
        lines.append(f'<a href="day{num}.html" class="dropdown-item {active}"><span class="day-num">Day {num}</span> <span class="day-em">{emoji}</span> {title}</a>')
    return '\n'.join(lines)


def build_toc(sections, checks_ids, has_summary=True):
    lines = []
    lines.append('<li><a href="#sec-0" class="toc-link">🎯 Enterprise Objective</a></li>')
    for sec in sections:
        lines.append(f'<li><a href="#sec-{sec["num"]}" class="toc-link">{sec["num"]}. {sec["title"]}</a></li>')
        lines.append(f'<li><a href="#{checks_ids[sec["num"]]}" class="toc-link">🧪 Checks: {sec["cc"]}</a></li>')
    lines.append('<li><a href="#practice" class="toc-link">🛠️ Practice Tasks</a></li>')
    lines.append('<li><a href="#interview" class="toc-link">💻 Interview Questions</a></li>')
    if has_summary:
        lines.append('<li><a href="#summary" class="toc-link">📊 Executive Summary</a></li>')
    return '\n'.join(lines)


def generate_page(item, curriculum, course_type):
    """Generate a single fully-populated HTML day page."""
    day = item['day']
    total_days = len(curriculum)
    num = f"{day:02d}"
    title = item['title']
    emoji = item['emoji']
    objective = item['objective']

    if course_type == 'sql':
        course_name = "SQL for Data Analyst"
        kernel = "sql"
        status_bar = "🔌 Connected to SQL Server Database"
        placeholder = "-- Write your SQL query here"
        course_id = "sql-20day"
        extra_scripts = ""
        protected_regex = r"/day(0[3-9]|1[0-8])\.html/"
        home_link = "../home.html"
    else:
        course_name = "Excel for Data Analyst"
        kernel = "excel"
        status_bar = "📊 Loading Excel Formula Engine..."
        placeholder = "=Write your Excel formula here"
        course_id = "excel-12day"
        extra_scripts = '<script defer src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>'
        protected_regex = r"/day(0[3-9]|1[0-2])\.html/"
        home_link = "../home.html"

    # Prev/Next navigation
    if day == 1:
        prev_btn = '<a href="#" class="nav-icon-btn prev-btn disabled" aria-label="Previous Day" title="Previous Day"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></a>'
    else:
        prev_num = f"{day-1:02d}"
        prev_btn = f'<a href="day{prev_num}.html" class="nav-icon-btn prev-btn" aria-label="Previous Day" title="Previous Day"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></a>'

    if day == total_days:
        next_btn = '<a href="../index.html" class="nav-icon-btn next-btn finish-btn" aria-label="Finish Course" title="Finish Course"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></a>'
    else:
        next_num = f"{day+1:02d}"
        next_btn = f'<a href="day{next_num}.html" class="nav-icon-btn next-btn" aria-label="Next Day" title="Next Day"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></a>'

    # Protected day noindex meta
    is_protected = day >= 3
    noindex_meta = '<meta name="robots" content="noindex, nofollow">\n' if is_protected else ''

    # Build notebook sections
    notebook_sections = []
    checks_ids = {}

    # sec-0: objective / grid
    if course_type == 'excel':
        grid = item.get('grid_html', '')
        sec0_content = f'''<div class="nb-section" id="sec-0">
<div class="nb-rich">{grid}</div>
</div>'''
    else:
        sec0_content = '<div class="nb-section" id="sec-0">\n</div>'
    notebook_sections.append(sec0_content)

    cell_counter = [0]

    def next_cell():
        cell_counter[0] += 1
        return f"cell-{cell_counter[0]}"

    for sec in item['sections']:
        sec_num = sec['num']
        sec_theory = sec['theory']
        sec_demo = sec['demo']
        cc_name = sec['cc']
        checks_id = f"checks-{cc_name}-{sec_num + 2}"
        checks_ids[sec_num] = checks_id

        # Theory section
        theory_html = f'''<div class="nb-section" id="sec-{sec_num}">
<div class="nb-rich"><h2 style="color: #000000ff; background-color: #02fff2ff; border-left: 6px solid #0c0c0cff; padding: 12px 15px; margin-top: 40px; border-radius: 4px;">
    <b>{sec_num}. {sec["title"]} : <span style="color: #070707ff; font-size: 0.85em; font-weight: normal;">{sec["subtitle"]}</span></b>
</h2>
<div style="border-left: 4px solid #4DB6AC; padding-left: 15px; margin: 15px 0; color: #CCCCCC;">
    <b>🔍 Concept</b><br>
    {sec_theory}
</div></div>'''

        demo_cell_id = next_cell()
        demo_run_btn = f"runCell('{demo_cell_id}')"
        demo_clear_btn = f"clearOutput('{demo_cell_id}')"
        theory_html += f'''
<div class="code-cell" id="{demo_cell_id}">
<div class="cell-bar"><span class="cell-label">In [ ]:</span><div class="cell-actions"><button class="run-btn" onclick="{demo_run_btn}">▶ Run</button><button class="clear-btn" onclick="{demo_clear_btn}">✕ Clear</button></div></div>
<textarea class="cm-source" id="src-{demo_cell_id.split('-')[1]}">{sec_demo}</textarea>
<div class="cell-output hidden"></div></div>
</div>'''
        notebook_sections.append(theory_html)

        # Concept checks section
        checks_html = f'''<div class="nb-section" id="{checks_id}">
<div class="nb-rich"><h3 style="color: #C7D2FE; background-color: #0e0e0fff; border-left: 6px solid #6366F1; padding: 12px 15px; margin-top: 50px; margin-bottom: 20px; border-radius: 4px; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
    <b>🧪 Concept Checks: <code>{cc_name}</code></b>
</h3></div>'''
        for i, q in enumerate(sec['questions'], 1):
            qcell_id = next_cell()
            qcell_num = qcell_id.split('-')[1]
            checks_html += f'''
<div class="question"><p><strong>Q{i}.</strong> {q}</p></div>
<div class="code-cell" id="{qcell_id}">
<div class="cell-bar"><span class="cell-label">In [ ]:</span><div class="cell-actions"><button class="run-btn" onclick="runCell('{qcell_id}')">▶ Run</button><button class="clear-btn" onclick="clearOutput('{qcell_id}')">✕ Clear</button></div></div>
<textarea class="cm-source" id="src-{qcell_num}">{placeholder}</textarea>
<div class="cell-output hidden"></div></div>'''
        checks_html += '\n</div>'
        notebook_sections.append(checks_html)

    # Practice tasks
    practice_html = '<div class="nb-section" id="practice">\n<div class="section-header gold"><h2>🛠️ Professional Practice Tasks</h2></div>'
    for i, task in enumerate(item['tasks'], 1):
        tcell_id = next_cell()
        tcell_num = tcell_id.split('-')[1]
        practice_html += f'''
<div class="question task"><p><strong>Task {i} ({task["name"]}):</strong> {task["desc"]}</p></div>
<div class="code-cell" id="{tcell_id}">
<div class="cell-bar"><span class="cell-label">In [ ]:</span><div class="cell-actions"><button class="run-btn" onclick="runCell('{tcell_id}')">▶ Run</button><button class="clear-btn" onclick="clearOutput('{tcell_id}')">✕ Clear</button></div></div>
<textarea class="cm-source" id="src-{tcell_num}">{placeholder}</textarea>
<div class="cell-output hidden"></div></div>'''
    practice_html += '\n</div>'
    notebook_sections.append(practice_html)

    # Interview section
    interview_html = '<div class="nb-section" id="interview">\n<div class="section-header purple"><h2>💻 Pure Coding Interview Questions</h2></div>'
    for i, q in enumerate(item['interviews'], 1):
        icell_id = next_cell()
        icell_num = icell_id.split('-')[1]
        interview_html += f'''
<div class="question interview"><p><strong>Q{i}.</strong> {q}</p></div>
<div class="code-cell" id="{icell_id}">
<div class="cell-bar"><span class="cell-label">In [ ]:</span><div class="cell-actions"><button class="run-btn" onclick="runCell('{icell_id}')">▶ Run</button><button class="clear-btn" onclick="clearOutput('{icell_id}')">✕ Clear</button></div></div>
<textarea class="cm-source" id="src-{icell_num}">{placeholder}</textarea>
<div class="cell-output hidden"></div></div>'''
    interview_html += '\n</div>'
    notebook_sections.append(interview_html)

    # Executive summary
    summary = item.get('summary', '')
    summary_html = f'''<div class="nb-section" id="summary">
<div class="section-header cyan"><h2>📊 Day {num} Executive Summary</h2></div>
<div class="nb-rich"><div style="border-left: 4px solid #22d3ee; padding-left: 16px; margin: 20px 0; color: #CBD5E1; font-size: 0.97em; line-height: 1.75;">{summary}</div></div>
</div>'''
    notebook_sections.append(summary_html)

    # TOC
    toc_items = build_toc(item['sections'], checks_ids)
    dropdown_items = build_dropdown(curriculum, day, course_type)

    html = f'''<!DOCTYPE html>
<html lang="en" data-course="{course_type}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Day {num}: {title} — {course_name} — Manodemy</title>
<meta name="description" content="Day {num}: {title} — Interactive workbook with hands-on challenges. Part of Manodemy\'s {course_name} course.">
{noindex_meta}
<!-- Performance: Preconnect to critical origins -->
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="dns-prefetch" href="https://erqoyvbuhmkyvcqgwcbz.supabase.co">
<!-- Supabase SDK (deferred) -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" defer></script>
<!-- Authentication + Enrollment Route Guard -->
<script>
  document.addEventListener('DOMContentLoaded', async function PaywallGuard() {{
    const currentPath = window.location.pathname;
    const isProtectedDay = currentPath.match({protected_regex});
    const removePreload = () => {{
      const p = document.getElementById('paywall-preload-screen');
      if (p) p.remove();
    }};
    if (!isProtectedDay) {{ removePreload(); return; }}
    try {{
      if (typeof window.supabase === 'undefined') {{
        window.location.href = '../index.html?reason=sdk_blocked'; return;
      }}
      const SUPA_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
      const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';
      const sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);
      const {{ data: {{ session }}, error }} = await sb.auth.getSession();
      if (error || !session) {{
        window.location.href = `../index.html?redirect=${{encodeURIComponent(currentPath)}}`; return;
      }}
      const plan = session.user.user_metadata?.plan;
      const isEnrolledLocal = localStorage.getItem('manodemy_enrolled') === 'true';
      if (plan === 'pro' || isEnrolledLocal) {{ removePreload(); return; }}
      try {{
        const {{ data: enrolled }} = await sb.rpc('check_enrollment', {{ p_course_id: '{course_id}' }});
        if (enrolled) {{
          localStorage.setItem('manodemy_enrolled', 'true');
          removePreload(); return;
        }}
      }} catch (rpcErr) {{ /* RPC failed */ }}
      window.location.href = `../index.html#pricing?locked=true`;
    }} catch (err) {{ window.location.href = `../index.html`; }}
  }});
</script>
<!-- Non-render-blocking fonts -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css">
<link rel="stylesheet" href="../notebook.css">
<!-- PWA -->
<link rel="manifest" href="/manifest.json">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="theme-color" content="#060913">
</head>
<body data-kernel="{kernel}">
<!-- Paywall Preload Screen -->
<div id="paywall-preload-screen" class="paywall-preload" aria-hidden="true">
  <div class="paywall-preload__spinner"></div>
</div>

<nav class="top-bar nav-container" id="topBar">
  <div class="nav-zone--left">
    <div class="avatar-wrapper" id="profileAvatar" role="button" tabindex="0" aria-label="Open profile card" aria-expanded="false" aria-haspopup="true">
      <div class="avatar-circle" id="avatarCircle"></div>
      <div class="avatar-status-dot" aria-hidden="true"></div>
    </div>
    <div class="nav-score-card">
      <div class="score-info">
        <span class="score-label">Solved</span>
        <span class="score-values"><span id="scoreSolved" class="score-highlight">0</span> / <span id="scoreTotal">0</span></span>
      </div>
      <div class="score-track"><div class="score-fill" id="scoreProgress" style="width:0%"></div></div>
    </div>
  </div>

  <div class="nav-center has-dropdown">
    <div class="nav-center-flex">
      {prev_btn}
      <button class="nav-dropdown-btn" id="dayDropdownBtn">
        <span class="day-badge">Day {num}</span>
        <span class="day-title">{title}</span>
        <svg class="dropdown-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </button>
      {next_btn}
    </div>
    <div class="nav-dropdown-menu" id="dayDropdownMenu">
      <div class="dropdown-header">Jump to another day</div>
      <div class="dropdown-scroll">
        {dropdown_items}
      </div>
    </div>
  </div>

  <div class="nav-zone--right">
    <div class="nav-controls">
      <a href="{home_link}" class="nav-icon-btn scorecard-btn" title="Back to Dashboard" aria-label="Score Card">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
        Score Card
      </a>
    </div>
  </div>
</nav>

<div class="profile-card" id="profileCard" role="dialog" aria-label="User profile summary" aria-modal="false">
  <div class="profile-card__header">
    <div class="profile-card__info">
      <h2 class="profile-card__name" id="profileName">Loading...</h2>
      <p class="profile-card__email" id="profileEmail">loading@... </p>
    </div>
    <span class="profile-card__badge" id="profileBadge">Free</span>
  </div>
  <div class="profile-card__progress-section">
    <div class="profile-card__progress-labels">
      <span class="profile-card__progress-text">Overall Progress</span>
      <span class="profile-card__progress-pct" id="profileProgressPct">0%</span>
    </div>
  </div>
  <button class="profile-card__signout" id="signOutBtn">Sign Out</button>
</div>

<div class="pyodide-status" id="pyStatus">{status_bar}</div>
<div class="layout">
  <main class="notebook" id="notebook">
    <div class="nb-title"><h1>{emoji} Day {num} : {title}</h1></div>
{chr(10).join(notebook_sections)}
  </main>
  <nav class="sidebar" id="sidebar">
    <div class="sidebar-top"><div class="sidebar-header"><span class="icon">📄</span> CONTENTS</div></div>
    <ul class="toc-list">{toc_items}</ul>
    <div class="sidebar-resize" id="sidebarResize"></div>
  </nav>
</div>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/python/python.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/closebrackets.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/edit/matchbrackets.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/comment/comment.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/selection/active-line.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldcode.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/foldgutter.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/fold/indent-fold.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/show-hint.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/addon/hint/anyword-hint.min.js"></script>
{extra_scripts}
<script defer src="../notebook.js?v=2.1"></script>
<script src="../voice.js" defer></script>
<script src="../hints.js" defer></script>
<!-- PWA Service Worker Registration -->
<script>
  if ('serviceWorker' in navigator) {{
    window.addEventListener('load', () => {{
      navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('[Service Worker] Registered scope:', reg.scope))
        .catch(err => console.error('[Service Worker] Registration failed:', err));
    }});
  }}
</script>
</body>
</html>'''
    return html


def write_pages(curriculum, course_type):
    folder = course_type  # 'sql' or 'excel'
    public_folder = os.path.join('public', course_type)
    os.makedirs(folder, exist_ok=True)
    os.makedirs(public_folder, exist_ok=True)

    for item in curriculum:
        day = item['day']
        num = f"{day:02d}"
        html_content = generate_page(item, curriculum, course_type)
        filename = f"day{num}.html"

        # Write to source folder
        path1 = os.path.join(folder, filename)
        with open(path1, 'w', encoding='utf-8') as f:
            f.write(html_content)

        # Write to public folder (for Vercel static serving)
        path2 = os.path.join(public_folder, filename)
        with open(path2, 'w', encoding='utf-8') as f:
            f.write(html_content)

        print(f"  ✅ {course_type.upper()} Day {num}: {item['title']}")

    print(f"\n✅ Generated {len(curriculum)} {course_type.upper()} day pages → {folder}/ and {public_folder}/\n")


if __name__ == '__main__':
    print("\n🚀 Generating SQL Day Pages (18 days)...")
    write_pages(SQL_CURRICULUM, 'sql')

    print("🚀 Generating Excel Day Pages (12 days)...")
    write_pages(EXCEL_CURRICULUM, 'excel')

    print("✅ All day pages generated successfully!")
