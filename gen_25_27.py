"""Generate Days 25 to 27."""
from nb_helpers import *
import os

def build_day25():
    S = []
    
    S.append((
        SH(1,"Handling Missing Data","The Reality of Data") + '\n\n' +
        WH("Real-world data is messy. <b>Missing values</b> are represented as <code>NaN</code> (Not a Number) or <code>None</code>. Pandas provides methods to detect (<code>isna()</code>), remove (<code>dropna()</code>), or replace (<code>fillna()</code>) these missing values.") + '\n\n' +
        "| Method | Action | Common Use |\n"
        "| :--- | :--- | :--- |\n"
        "| `df.isna()` | Returns Boolean DF | Identifying where data is missing |\n"
        "| `df.dropna()` | Drops rows/cols | Removing rows where critical data is null |\n"
        "| `df.fillna(val)` | Replaces NaNs | Replacing missing ages with the median age |\n\n" +
        WC([("Data Quality","Machine Learning models will crash if you feed them `NaN` values. You must handle them first!"),
            ("Imputation","Filling missing salaries with the average salary of the employee's department")]) + '\n\n' +
        PF("Blindly Dropping","Never run <code>df.dropna()</code> without thinking. If 30% of your data has a missing 'Phone Number', dropping those rows destroys 30% of your valid 'Email' and 'Name' data. Drop the column, or fill it with 'Unknown'."),
        "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Age': [25, np.nan, 35, 40],\n    'Salary': [50000, 60000, np.nan, 80000]\n})\n\nprint(\"Original:\\n\", df)\n\n# 1. Count missing values per column\nprint(\"\\nMissing Counts:\\n\", df.isna().sum())\n\n# 2. Drop rows with ANY missing data\nprint(\"\\nDropped Rows:\\n\", df.dropna())\n\n# 3. Fill missing Age with Mean, Salary with 0\nclean_df = df.fillna({'Age': df['Age'].mean(), 'Salary': 0})\nprint(\"\\nFilled NaNs:\\n\", clean_df)\n",
        "Missing Data",
        [
            '### **Q1.** Run `df.isna().sum()` on your DataFrame to see which columns have missing values.\n',
            '### **Q2.** Use `df.dropna(subset=["Age"])` to drop ONLY rows where `"Age"` is missing. Print it.\n',
            '### **Q3.** Fill all `NaN` values in the entire DataFrame with `"Unknown"` using `df.fillna("Unknown")`.\n',
            '### **Q4.** Fill the `"Salary"` column with the median salary of that column using `df["Salary"].fillna(...)`.\n',
            '### **Q5.** Use `df.ffill()` (forward fill) on a Series with a missing value. What does it do?\n',
        ]
    ))
    
    S.append((
        SH(2,"Handling Duplicates","Deduplication") + '\n\n' +
        WH("Duplicate rows can skew aggregations and ruin analysis. <code>df.duplicated()</code> returns a boolean mask of duplicate rows, and <code>df.drop_duplicates()</code> removes them. You can specify whether to keep the 'first' occurrence, the 'last', or False (drop all duplicates completely).") + '\n\n' +
        "```python\n# Keep only the first occurrence of a User_ID\ndf.drop_duplicates(subset=['User_ID'], keep='first')\n```\n\n" +
        WC([("ETL Pipelines","When pulling data daily, you might accidentally pull the same transactions twice. Deduplication fixes this"),
            ("Latest Records","Sorting by 'Update_Date' and keeping the 'last' duplicate ensures you only have the most recent data for each user")]) + '\n\n' +
        PT("Always sort your DataFrame BEFORE dropping duplicates if you want to keep the highest/lowest/newest value. E.g., Sort by `Date` ascending, then `drop_duplicates(keep='last')`."),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'ID': [1, 2, 2, 3, 1],\n    'Name': ['Alice', 'Bob', 'Bob', 'Charlie', 'Alice'],\n    'Update_Day': [1, 1, 2, 1, 3]\n})\n\nprint(\"Original with duplicates:\\n\", df)\n\n# Drop exact identical rows (None match exactly here because Update_Day differs)\nprint(\"\\nExact Duplicates:\\n\", df.drop_duplicates())\n\n# Drop based on ID, keeping the latest Update_Day\n# 1. Sort by Day\ndf_sorted = df.sort_values(by='Update_Day')\n# 2. Drop duplicates based on ID, keeping the LAST one\nlatest_df = df_sorted.drop_duplicates(subset=['ID'], keep='last')\nprint(\"\\nLatest Unique Users:\\n\", latest_df.sort_index())\n",
        "Duplicates",
        [
            '### **Q1.** Create a DataFrame with 3 identical rows. Run `df.duplicated()` to see the boolean mask.\n',
            '### **Q2.** Run `df.drop_duplicates()` on the DataFrame from Q1 to clean it.\n',
            '### **Q3.** Given a DF with `ID` and `Score`, sort by `Score` descending, then drop duplicates on `ID` keeping the first.\n',
            '### **Q4.** What happens if you use `keep=False` in `drop_duplicates()`? Try it.\n',
            '### **Q5.** Count the number of duplicate `ID`s by chaining `df.duplicated(subset=["ID"]).sum()`.\n',
        ]
    ))
    
    S.append((
        SH(3,"Data Type Conversion","Fixing Bad Formatting") + '\n\n' +
        WH("When reading from CSVs, numbers might be loaded as strings (e.g., `'1,000'`). You cannot perform math on strings! The <code>.astype()</code> method converts columns to proper types. For strings requiring cleaning, the <code>.str</code> accessor is your best friend.") + '\n\n' +
        "| Method | Action | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `astype(type)` | Cast to type | `df['Age'].astype(int)` |\n"
        "| `pd.to_numeric()` | Safe casting | `pd.to_numeric(df['Price'], errors='coerce')` |\n"
        "| `.str.replace()`| String cleanup| `df['Price'].str.replace('$', '')` |\n\n" +
        WC([("Currency Parsing","Converting `'$1,200.50'` into the float `1200.50` so you can sum it"),
            ("Memory Optimization","Downcasting an `int64` column to `int8` to save 8x the RAM on a billion rows")]) + '\n\n' +
        PT("If <code>.astype(float)</code> fails because of a weird string like 'N/A', use <code>pd.to_numeric(col, errors='coerce')</code>. It will force the bad strings into <code>NaN</code> so you can proceed!"),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Item': ['A', 'B', 'C'],\n    'Price': ['$10', '$20', 'Error']\n})\nprint(\"Original types:\\n\", df.dtypes)\n\n# 1. Clean the string (Remove $)\ndf['Clean_Price'] = df['Price'].str.replace('$', '', regex=False)\n\n# 2. Convert to numeric safely (Forces 'Error' to NaN)\ndf['Float_Price'] = pd.to_numeric(df['Clean_Price'], errors='coerce')\n\nprint(\"\\nCleaned DataFrame:\\n\", df)\nprint(\"\\nNew types:\\n\", df.dtypes)\n",
        "Data Types",
        [
            '### **Q1.** Given `df["Age"] = ["25", "30"]` (strings), cast it to integer using `.astype(int)`.\n',
            '### **Q2.** Given `df["Cost"] = ["1,000", "2,500"]`, remove the comma using `.str.replace(",", "")`.\n',
            '### **Q3.** Cast the cleaned `Cost` column to float.\n',
            '### **Q4.** Use `pd.to_numeric(..., errors="coerce")` on `["10", "bad", "20"]`. Print the result.\n',
            '### **Q5.** Check the memory usage of a column using `df["Col"].memory_usage()`. Cast it to `float32` and check again.\n',
        ]
    ))

    TASKS = [
        ("The Complete Pipeline", "Create a dirty DataFrame: `{'ID': [1,2,2,3], 'Price': ['$10', '$20', '$20', 'NaN'], 'Qty': [1,2,np.nan,3]}`. Write a 4-step pipeline: 1) Drop exact duplicates. 2) Clean Price '$' and cast to float. 3) Fill missing Qty with 1. 4) Calculate Total = Price * Qty."),
        ("Threshold Dropping", "Create a DF with 5 rows and 3 columns of NaNs/data. Use `df.dropna(thresh=2)` to drop rows that do not have AT LEAST 2 valid non-NaN values. Print it."),
        ("Categorical Conversion", "Given a column `df['Size'] = ['S', 'M', 'L', 'S', 'M']` with 100,000 rows. Convert its type to 'category' using `.astype('category')`. Check `df.info()` to see memory savings."),
        ("String Extraction", "Given `df['Code'] = ['Item-123', 'Item-456']`. Use `.str.split('-').str[1]` to extract just the numbers. Cast them to integers."),
        ("Interpolation", "Given a Time Series `df['Temp'] = [20, np.nan, np.nan, 26]`. Use `df['Temp'].interpolate()` to fill the missing values with a linear progression. Print it."),
    ]
    
    INTERVIEWS = [
        "Explain the difference between `NaN`, `None`, and `NaT` in Pandas.",
        "What does the `errors='coerce'` argument do in `pd.to_numeric()`?",
        "How do you drop columns that contain MORE than 50% missing values?",
        "Explain the `thresh` parameter in `df.dropna()`.",
        "Why might filling missing values with the Mean be a bad idea for highly skewed data?",
        "Write code to fill missing values in column 'A' with the median of column 'A'.",
        "How do you perform a Forward Fill (`ffill`)? In what scenario (e.g., time series) is it useful?",
        "What is the difference between `df.drop_duplicates()` and `df.duplicated()`?",
        "Write code to find the number of exact duplicate rows in a DataFrame.",
        "How do you keep the LAST occurrence of a duplicate based on a specific subset of columns?",
        "Explain how converting a string column with low cardinality to `category` saves memory.",
        "Write code to remove all whitespace from the beginning and end of a string column using `.str.strip()`.",
        "How do you extract a substring from a column using a regular expression in Pandas? (`.str.extract()`).",
        "What happens if you use `.astype(int)` on a column that contains `NaN` values? (Hint: It fails).",
        "Explain the `Int64` (capital I) nullable integer data type introduced in newer Pandas versions.",
        "Write code to replace all negative values in a DataFrame with `NaN` using `df.where()` or `np.where()`.",
        "How do you rename the index of a DataFrame?",
        "What is Data Imputation? Name two advanced methods beyond simple mean/median filling (e.g., KNN, Regression).",
        "Write code to convert a column containing 'Yes'/'No' strings into boolean `True`/`False`.",
        "How do you parse a column of dates in the format 'YYYY/MM/DD' into Pandas datetime objects?",
        "Explain the `inplace=True` argument. Why is it generally avoided by Pandas core devs?",
        "Write code to calculate the percentage of missing values in every column of a DataFrame.",
        "How do you apply a custom data-cleaning function to every element in a single column?",
        "Explain the difference between `.map()`, `.apply()`, and `.applymap()` in Pandas.",
        "What is the performance implication of using `.str` accessors on a column of 10 million rows?",
    ]

    nb = build(
        day=25, title="Data Cleaning",
        obj_text="Data Analysts spend 80% of their time cleaning data. Missing values crash algorithms. Duplicates ruin financial aggregations. Strings masquerading as numbers prevent math. Today we master the unglamorous but critical art of Data Cleaning.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Missing Data | `isna()`, `fillna()` |\n| 2 | Duplicates | `drop_duplicates()` |\n| 3 | Types | `astype()`, `.str` accessor |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | NaNs | Never drop NaNs blindly. Think about why they are missing. |\n| 2 | Dedupe | Sort by date first to ensure you keep the latest record. |\n| 3 | Casting | Use `pd.to_numeric(..., errors='coerce')` for messy strings. |\n",
        checklist="- [ ] I can find and fill missing values.\n- [ ] I can drop duplicates while keeping the latest record.\n- [ ] I can clean strings and cast them to floats.",
        next_up="Day 26 - Pandas GroupBy & Aggregations"
    )
    save(nb, os.path.join('notebooks', 'Day25_Pandas_Cleaning_Blank.ipynb'))

def build_day26():
    S = []
    
    S.append((
        SH(1,"The GroupBy Mechanics","Split-Apply-Combine") + '\n\n' +
        WH("The <code>.groupby()</code> method is identical to the SQL <code>GROUP BY</code> statement. It follows the <b>Split-Apply-Combine</b> pattern: it <i>splits</i> the data into groups based on a key, <i>applies</i> an aggregation function (like sum or mean), and <i>combines</i> the results into a new DataFrame.") + '\n\n' +
        "```python\n# Calculate the average salary per department\n# 1. Split by Dept | 2. Select Salary | 3. Apply mean()\navg_salary = df.groupby('Dept')['Salary'].mean()\n```\n\n" +
        WC([("Financial Reporting","Calculating total monthly revenue: `df.groupby('Month')['Revenue'].sum()`"),
            ("User Behavior","Finding the maximum session length per user: `df.groupby('UserID')['Duration'].max()`")]) + '\n\n' +
        PF("Unaggregated GroupBys","If you just print <code>df.groupby('Dept')</code>, you will get a `<DataFrameGroupBy object>` memory address. You MUST apply an aggregation function (like `.sum()`) to actually see data!"),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Dept': ['IT', 'HR', 'IT', 'Sales', 'HR'],\n    'Employee': ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],\n    'Salary': [70000, 50000, 80000, 90000, 60000],\n    'Experience': [3, 2, 5, 10, 4]\n})\n\n# Group by Department and calculate Mean for all numeric columns\nprint(\"Mean per Dept:\\n\", df.groupby('Dept').mean(numeric_only=True))\n\n# Group by Department, select ONLY Salary, and calculate Sum\nprint(\"\\nTotal Salary per Dept:\\n\", df.groupby('Dept')['Salary'].sum())\n",
        "GroupBy",
        [
            '### **Q1.** Create a `df` with `City` and `Sales`. Group by `City` and calculate `.sum()`. Print it.\n',
            '### **Q2.** Group by `City` and calculate `.mean()`. Print it.\n',
            '### **Q3.** Group by `City` and calculate `.count()` to see how many transactions happened in each city.\n',
            '### **Q4.** Print a raw `df.groupby("City")` object. Observe the memory address output.\n',
            '### **Q5.** Group by `City`, select the `Sales` column, and find the `.max()` value per city.\n',
        ]
    ))
    
    S.append((
        SH(2,"Multiple Aggregations (.agg)","Advanced Summaries") + '\n\n' +
        WH("Sometimes you want multiple statistics at once (e.g., the Mean AND the Max). You can pass a list of functions to the <b><code>.agg()</code></b> method. You can also pass a dictionary to apply different functions to different columns!") + '\n\n' +
        "```python\n# Min and Max for Salary\ndf.groupby('Dept')['Salary'].agg(['min', 'max'])\n\n# Different math for different columns\ndf.groupby('Dept').agg({'Salary': 'mean', 'Experience': 'max'})\n```\n\n" +
        WC([("Executive Dashboards","Showing the Total Sales, Average Order Value, and Count of Orders per region in one table")]) + '\n\n' +
        PT("GroupBy outputs have the group keys (e.g., 'Dept') as the <b>Index</b>. If you want a flat standard DataFrame, append <code>.reset_index()</code> to the end of your groupby chain!"),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Dept': ['IT', 'HR', 'IT', 'Sales', 'HR'],\n    'Salary': [70000, 50000, 80000, 90000, 60000],\n    'Experience': [3, 2, 5, 10, 4]\n})\n\n# Multiple aggregations on a single column\nstats = df.groupby('Dept')['Salary'].agg(['mean', 'sum', 'count'])\nprint(\"Salary Stats:\\n\", stats)\n\n# Dictionary aggregation (Different rules per column)\ncomplex_agg = df.groupby('Dept').agg({\n    'Salary': 'sum',       # Total budget\n    'Experience': 'max'    # Most senior person\n}).reset_index()           # Flattens the index!\n\nprint(\"\\nComplex Aggregation:\\n\", complex_agg)\n",
        "Aggregations",
        [
            '### **Q1.** Group `df` by `Dept`. Use `.agg()` to find the `min` and `max` of `Salary`.\n',
            '### **Q2.** Use `.agg()` with a dictionary to find the `sum` of `Salary` and the `mean` of `Experience`.\n',
            '### **Q3.** Add `.reset_index()` to your answer in Q2 and observe how `Dept` becomes a normal column.\n',
            '### **Q4.** Create a custom aggregation: `df.groupby("Dept")["Salary"].agg(lambda x: x.max() - x.min())` to find the salary range.\n',
            '### **Q5.** Group by TWO columns at once: `df.groupby(["Dept", "JobTitle"]).sum()`. (Assume a JobTitle column exists).\n',
        ]
    ))
    
    S.append((
        SH(3,"Transform & Apply","Row-Level Group Math") + '\n\n' +
        WH("While `.agg()` collapses data into a summary table, <b><code>.transform()</code></b> returns data the exact same shape as the original. This is used for calculating group-level metrics and broadcasting them back to the original rows (like SQL Window Functions).") + '\n\n' +
        "```python\n# Calculate the Dept Mean, and broadcast it to every employee's row\ndf['Dept_Avg'] = df.groupby('Dept')['Salary'].transform('mean')\n\n# Now you can calculate how much above/below average they are!\ndf['Above_Avg'] = df['Salary'] - df['Dept_Avg']\n```\n\n" +
        WC([("Standardization","Z-Score normalization per category: `(x - group_mean) / group_std`"),
            ("Percent to Total","Calculating what percentage an employee's salary contributes to their department's total budget")]) + '\n\n' +
        PT("Use <code>.agg()</code> when you want to reduce dimensions (create a summary report). Use <code>.transform()</code> when you want to add new calculated columns to your existing DataFrame."),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Dept': ['IT', 'IT', 'HR', 'HR'],\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Salary': [80000, 60000, 50000, 70000]\n})\n\n# Calculate the mean per department and append it as a new column\ndf['Dept_Mean'] = df.groupby('Dept')['Salary'].transform('mean')\n\n# Calculate the difference\ndf['Diff_From_Mean'] = df['Salary'] - df['Dept_Mean']\n\nprint(\"Transformed DataFrame:\\n\", df)\n",
        "Transform",
        [
            '### **Q1.** Create `df` with `Team` and `Score`. Use `.transform("max")` to add a column `Team_Max_Score`.\n',
            '### **Q2.** Create a column `Is_Top_Scorer` which is `True` if `Score == Team_Max_Score`.\n',
            '### **Q3.** Use `.transform("sum")` to calculate `Team_Total`. Then create `%_of_Total = Score / Team_Total`.\n',
            '### **Q4.** What happens if you try to assign `.agg("sum")` to a new column? Catch the ValueError (shapes don\'t match).\n',
            '### **Q5.** Explain the SQL equivalent of `.transform()` (Hint: `OVER (PARTITION BY ...)` Window Functions).\n',
        ]
    ))

    TASKS = [
        ("Sales Report", "Given a DF with `Date`, `Region`, `Rep`, and `Sales`. Group by `Region` and calculate the Total Sales and Average Sales. Reset the index."),
        ("Multi-Level Grouping", "Group the Sales DF by BOTH `Region` and `Rep`. Calculate the sum of Sales. Notice the MultiIndex created. Use `.reset_index()` to flatten it."),
        ("Custom Aggregation", "Write a custom function `spread(series)` that returns `series.max() - series.min()`. Pass this function into `.agg()` when grouping by Region."),
        ("Percent to Total", "Given a DF of `Category` and `Revenue`. Use `.transform('sum')` to find the total revenue per category. Create a new column `Pct_Rev` representing that row's percentage contribution to its category."),
        ("Filtering Groups", "Group by `Region`. Use `.filter(lambda g: g['Sales'].sum() > 10000)` to drop all rows belonging to regions that didn't meet a 10k quota. (Note: `.filter` is a powerful GroupBy method!)."),
    ]
    
    INTERVIEWS = [
        "Explain the 'Split-Apply-Combine' paradigm in the context of Pandas GroupBy.",
        "What is the difference between `df.groupby('A').sum()` and `df.groupby('A')['B'].sum()`?",
        "Why does `.groupby()` return a `DataFrameGroupBy` object instead of a DataFrame?",
        "What does `.reset_index()` do after a groupby operation?",
        "How do you group by multiple columns? (e.g., Year and Month).",
        "Explain the difference between `.agg()` and `.transform()`.",
        "How do you apply different aggregation functions to different columns in a single `.agg()` call?",
        "Write code to group by Column A, and get the size (count of rows) of each group using `.size()`.",
        "What is the difference between `.count()` and `.size()` on a GroupBy object?",
        "How do you use `.filter()` on a GroupBy object to drop entire groups based on a condition?",
        "What is a `MultiIndex`? How is it created during a `.groupby()`?",
        "Write code to find the first occurrence (row) of each group. (`.first()`).",
        "How do you calculate a rolling average within groups? (e.g., `df.groupby('User')['Login'].rolling(3).mean()`).",
        "Explain how to use the `as_index=False` parameter in `.groupby()`. What does it replace?",
        "Write a custom lambda function inside `.agg()` to calculate the 90th percentile of a group.",
        "How do you iterate over groups in a GroupBy object? (`for name, group in grouped:`).",
        "What happens if you group by a column that contains `NaN` values? (Hint: `dropna=True` is the default).",
        "Explain how `.transform()` is equivalent to SQL Window Functions (`OVER PARTITION BY`).",
        "Write code to fill `NaN` values in 'Salary' with the mean 'Salary' of that specific 'Department' using `.transform()`.",
        "How do you get the N-th row of each group? (`.nth(n)`).",
        "What is `pd.Grouper` and how is it used for grouping Time Series data by frequency (e.g., Monthly)?",
        "Explain the `nunique()` aggregation function. When is it useful?",
        "How do you pivot a grouped DataFrame from long format to wide format? (`.unstack()`).",
        "Write code to calculate the Cumulative Sum within each group. (`.cumsum()`).",
        "How do you sort the output of a GroupBy aggregation by the aggregated values?",
    ]

    nb = build(
        day=26, title="Pandas GroupBy",
        obj_text="Aggregating data is the core of analytics. You must be able to summarize millions of rows into executive dashboards. Today we master the `groupby` mechanics to slice data by categories, calculate advanced `.agg()` summaries, and perform SQL-style Window Functions using `.transform()`.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | GroupBy | Split-Apply-Combine |\n| 2 | Aggregation | `.agg({'A':'sum'})` |\n| 3 | Transform | Window Functions |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | GroupBy | `df.groupby('Key')['Value'].sum()` is the most common analytics code |\n| 2 | Agg | Pass lists `['min', 'max']` or dicts to perform complex math |\n| 3 | Transform | Returns data in the original shape. Perfect for calculating `% of Total` |\n",
        checklist="- [ ] I can group by a column and calculate the mean.\n- [ ] I can use `.agg()` for multiple statistics.\n- [ ] I understand the difference between `.agg()` and `.transform()`.",
        next_up="Day 27 - Pandas Merging & Joining"
    )
    save(nb, os.path.join('notebooks', 'Day26_Pandas_GroupBy_Blank.ipynb'))

def build_day27():
    S = []
    
    S.append((
        SH(1,"Merging (Joins)","Connecting Datasets") + '\n\n' +
        WH("In the real world, data is stored in multiple tables. <b><code>pd.merge()</code></b> is the exact equivalent of a SQL JOIN. It connects two DataFrames side-by-side based on a common column (the 'key').") + '\n\n' +
        "| Merge Type (how=) | SQL Equivalent | Result |\n"
        "| :--- | :--- | :--- |\n"
        "| `inner` (Default) | INNER JOIN | Keep only rows with matching keys in BOTH tables |\n"
        "| `left` | LEFT JOIN | Keep all rows from Left table, fill missing right data with NaN |\n"
        "| `right` | RIGHT JOIN | Keep all rows from Right table |\n"
        "| `outer` | FULL OUTER JOIN| Keep all rows from both tables, filling NaNs wherever needed |\n\n" +
        WC([("Enrichment","You have a table of `User_IDs`. You merge it with a `Users` table to get their `Email` and `Name`.")]) + '\n\n' +
        PF("Exploding Joins","If you merge on a column that has duplicates in BOTH tables (a Many-to-Many join), Pandas will create a Cartesian product, multiplying your row count exponentially and crashing your RAM. Ensure your keys are unique in at least one table!"),
        "import pandas as pd\n\n# Left Table (Transactions)\ntxns = pd.DataFrame({\n    'User_ID': [1, 2, 3],\n    'Amount': [100, 200, 300]\n})\n\n# Right Table (Users)\nusers = pd.DataFrame({\n    'User_ID': [1, 2, 4],\n    'Name': ['Alice', 'Bob', 'David']\n})\n\n# Inner Merge (Only IDs 1 and 2 exist in both)\ninner = pd.merge(txns, users, on='User_ID', how='inner')\nprint(\"Inner Merge:\\n\", inner)\n\n# Left Merge (Keeps ID 3, missing Name becomes NaN)\nleft = pd.merge(txns, users, on='User_ID', how='left')\nprint(\"\\nLeft Merge:\\n\", left)\n",
        "Merging",
        [
            '### **Q1.** Create two DataFrames with a common column `"ID"`. Merge them using `how="inner"`.\n',
            '### **Q2.** Change the merge to `how="left"`. Observe the `NaN` values for the unmatched row.\n',
            '### **Q3.** Change the merge to `how="outer"`. Observe that all IDs from both tables are present.\n',
            '### **Q4.** What happens if the columns have different names? Use `left_on="Txn_ID"` and `right_on="User_ID"` to merge them.\n',
            '### **Q5.** Explain the risk of Many-to-Many joins. What happens to row counts?\n',
        ]
    ))
    
    S.append((
        SH(2,"Concatenation","Stacking Datasets") + '\n\n' +
        WH("While `merge` connects tables side-by-side, <b><code>pd.concat()</code></b> stacks tables on top of each other (or side-by-side if you change the axis). It is the equivalent of a SQL `UNION`. You use it when you have identical schema files (e.g., Jan Sales, Feb Sales) and want one master table.") + '\n\n' +
        "```python\n# Stack dataframes vertically (Rows increase)\nmaster_df = pd.concat([jan_df, feb_df, mar_df], axis=0, ignore_index=True)\n```\n\n" +
        WC([("Batch Loading","Using a `for` loop to read 50 CSV files into a list, then running `pd.concat(list)` to create one massive DataFrame.")]) + '\n\n' +
        PT("Always use <code>ignore_index=True</code> when concatenating vertically. Otherwise, the new DataFrame will have duplicate index values (e.g., 0,1,2... 0,1,2...), which will cause nightmares when you try to use `.loc` later."),
        "import pandas as pd\n\njan = pd.DataFrame({'Month': ['Jan', 'Jan'], 'Sales': [100, 200]})\nfeb = pd.DataFrame({'Month': ['Feb', 'Feb'], 'Sales': [150, 250]})\n\n# Concatenate vertically (Stacking rows)\ncombined = pd.concat([jan, feb], axis=0)\nprint(\"Concat (Duplicate Index!):\\n\", combined)\n\n# Proper concatenation (Resets index)\nclean_concat = pd.concat([jan, feb], axis=0, ignore_index=True)\nprint(\"\\nConcat (Clean Index):\\n\", clean_concat)\n",
        "Concat",
        [
            '### **Q1.** Create two DataFrames with identical columns. Use `pd.concat([df1, df2])` to stack them.\n',
            '### **Q2.** Notice the index duplicates. Add `ignore_index=True` to fix it. Print the result.\n',
            '### **Q3.** Change to `axis=1` to concatenate side-by-side. Print the result.\n',
            '### **Q4.** What happens if `df1` has a column `"A"` and `df2` has a column `"B"` and you concat vertically? (Hint: `NaN`s are generated).\n',
            '### **Q5.** Append a single row (as a DataFrame) to `df1` using `pd.concat`.\n',
        ]
    ))
    
    S.append((
        SH(3,"Joining on Index","Index Alignment") + '\n\n' +
        WH("While `merge` looks at columns, the <b><code>.join()</code></b> method specifically aligns DataFrames based on their <b>Index</b>. It is a shortcut for `pd.merge(left_index=True, right_index=True)`.") + '\n\n' +
        "```python\n# df1 and df2 must share the same index labels\ncombined = df1.join(df2, how='left')\n```\n\n" +
        WC([("Time Series","Joining multiple stock price DataFrames where the Date is the index for all of them.")]) + '\n\n' +
        PT("If both DataFrames have a column with the exact same name, <code>.join()</code> will crash. You must provide <code>lsuffix='_left'</code> and <code>rsuffix='_right'</code> to differentiate them."),
        "import pandas as pd\n\n# DataFrames with specific Index labels\ndf1 = pd.DataFrame({'A': [10, 20]}, index=['X', 'Y'])\ndf2 = pd.DataFrame({'B': [100, 200]}, index=['X', 'Z'])\n\n# Default join is a LEFT JOIN on the index\njoined = df1.join(df2)\nprint(\"Left Join on Index:\\n\", joined)\n\n# Inner Join on Index\ninner_joined = df1.join(df2, how='inner')\nprint(\"\\nInner Join on Index:\\n\", inner_joined)\n",
        "Index Join",
        [
            '### **Q1.** Create two DataFrames with matching indexes `["a", "b"]`. Use `df1.join(df2)`. Print it.\n',
            '### **Q2.** Create a column collision: both DFs have a column `"Val"`. Try to join. Catch the ValueError.\n',
            '### **Q3.** Fix Q2 by adding `lsuffix="_left", rsuffix="_right"`. Print the result.\n',
            '### **Q4.** What is the `pd.merge()` equivalent of an index join? (Hint: `left_index=True, right_index=True`).\n',
            '### **Q5.** Explain why Time Series analysis heavily relies on index joining.\n',
        ]
    ))

    TASKS = [
        ("Employee Database", "Create `employees` DF (`EmpID`, `Name`, `DeptID`) and `departments` DF (`DeptID`, `DeptName`). Use `pd.merge()` to create a complete table showing Employee Names and their Department Names."),
        ("Missing Matches", "Create a Left Merge from the task above, but ensure one `EmpID` has a `DeptID` that doesn't exist in the departments table. Use `isna()` on the merged DF to find the employee with no matching department."),
        ("File Aggregator", "Write a simulated loop: Create 3 identical DataFrames representing Jan, Feb, Mar sales. Append them to a python list. Use `pd.concat(list, ignore_index=True)` to create the master DataFrame."),
        ("Mismatch Concat", "Create `df1` with columns `['A', 'B']` and `df2` with columns `['B', 'C']`. Concat them vertically. Notice how Pandas fills missing columns with `NaN`. Use `join='inner'` inside `concat` to keep ONLY shared columns."),
        ("Cross Join", "Create a DataFrame of `Colors` and `Sizes`. Use `pd.merge(how='cross')` to generate every possible combination of Color and Size (Cartesian product)."),
    ]
    
    INTERVIEWS = [
        "Explain the difference between `pd.merge()`, `pd.concat()`, and `df.join()`.",
        "What is the difference between an INNER JOIN and a LEFT JOIN?",
        "When merging, how do you handle columns that have different names in the left and right tables? (Hint: `left_on`, `right_on`).",
        "What happens in a Pandas merge if both tables have a column named 'Status' that is NOT the join key? (Hint: suffixes).",
        "Explain what a Many-to-Many merge is and why it can cause MemoryErrors.",
        "How do you merge a DataFrame on its Index with another DataFrame on a specific Column? (`left_index=True, right_on='Col'`).",
        "What does `pd.concat(axis=1)` do? When would you use it?",
        "Why is `ignore_index=True` critical when using `pd.concat(axis=0)`?",
        "Explain the `join='inner'` vs `join='outer'` parameter inside `pd.concat()`.",
        "Write code to concatenate a list of 100 CSV files into a single DataFrame efficiently.",
        "What is a CROSS JOIN? How do you perform it in Pandas?",
        "How do you find rows that exist in the Left table but NOT in the Right table? (Anti-Join using `indicator=True`).",
        "Explain what the `indicator=True` argument does in `pd.merge()`.",
        "How do you merge on multiple columns simultaneously? (`on=['Key1', 'Key2']`).",
        "What is `pd.merge_asof()`? Why is it crucial for financial tick data or time-series?",
        "Explain the performance differences between `.merge()` and `.join()`.",
        "Write code to append a single dictionary as a new row to a DataFrame. Why is `df.loc[len(df)]` or `concat` better than `.append()` (which is deprecated)?",
        "How do you merge DataFrames with overlapping columns but selectively choose which columns to keep from the right table?",
        "What happens to the data types of integer columns if a merge introduces `NaN` values? (Hint: upcasts to float).",
        "Explain how the new nullable integer type `Int64` solves the NaN float upcasting issue in merges.",
        "Write code to validate a merge (e.g., ensuring it's strictly One-to-Many) using the `validate='1:m'` argument.",
        "How does Pandas handle matching keys that have different data types (e.g., `1` as int vs `'1'` as string)?",
        "What is the difference between `df.update()` and `pd.merge()`?",
        "Explain `df.combine_first()`. When would you use it instead of a merge?",
        "Design a pipeline that merges 3 different relational tables (Users, Orders, Products) into one flat denormalized DataFrame.",
    ]

    nb = build(
        day=27, title="Pandas Merging",
        obj_text="Data rarely lives in a single CSV file. To answer complex business questions, you must connect relational datasets. Today we master SQL-style Joins via `pd.merge()`, row stacking via `pd.concat()`, and index alignment via `df.join()`.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Merging | `INNER`, `LEFT`, `OUTER` Joins |\n| 2 | Concat | Stacking rows vertically |\n| 3 | Joining | Aligning by Index |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Merge | Exact equivalent to SQL joins. Maps columns to columns. |\n| 2 | Concat | Equivalent to SQL UNION. Stacks tables. Always use `ignore_index=True`. |\n| 3 | Indicator | Use `indicator=True` in merges to debug where data came from. |\n",
        checklist="- [ ] I can perform a LEFT JOIN using `pd.merge()`.\n- [ ] I can stack DataFrames vertically using `pd.concat()`.\n- [ ] I understand the difference between Merge and Concat.",
        next_up="Day 28 - Pandas Series & Time Series Analysis"
    )
    save(nb, os.path.join('notebooks', 'Day27_Pandas_Merging_Blank.ipynb'))

if __name__ == '__main__':
    build_day25()
    build_day26()
    build_day27()
    print("Days 25, 26, 27 generated successfully!")
