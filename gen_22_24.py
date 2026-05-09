"""Generate Days 22 to 24."""
from nb_helpers import *
import os

def build_day22():
    S = []
    
    S.append((
        SH(1,"Slicing & Indexing","Navigating Matrices") + '\n\n' +
        WH("NumPy slicing is similar to Python lists but extended to multiple dimensions. You access elements using <code>arr[row, col]</code>. Slices return <b>Views</b> (not copies!), meaning if you modify a slice, the original array changes.") + '\n\n' +
        "```python\n# [start_row:stop_row, start_col:stop_col]\nsub_matrix = matrix[0:2, 1:3]\n```\n\n" +
        WC([("Image Cropping","An image is just a 3D NumPy array (Height, Width, RGB). Cropping is just slicing: `img[100:200, 100:200]`"),
            ("Data Sampling","Extracting every 10th row using a step slice: `data[::10, :]`")]) + '\n\n' +
        PF("The View Trap","Slicing a NumPy array does not copy data; it creates a 'View'. <code>slice = arr[:2]; slice[0] = 99</code> WILL change the original array. Use <code>arr[:2].copy()</code> if you need an independent copy."),
        "import numpy as np\n\n# Create a 3x3 matrix\nmatrix = np.arange(1, 10).reshape((3, 3))\nprint(f\"Original:\\n{matrix}\")\n\n# Indexing a single element (Row 1, Col 2)\nprint(f\"\\nElement [1,2]: {matrix[1, 2]}\")\n\n# Slicing the first 2 rows, and all columns\nprint(f\"\\nTop 2 rows:\\n{matrix[:2, :]}\")\n\n# Slicing the last column\nprint(f\"\\nLast column:\\n{matrix[:, -1]}\")\n",
        "Slicing",
        [
            '### **Q1.** Create `arr = np.arange(10)`. Slice the first 5 elements.\n',
            '### **Q2.** Create a 4x4 matrix using `np.arange(16).reshape((4,4))`. Print it.\n',
            '### **Q3.** From the 4x4 matrix, extract the 2x2 square in the top-right corner. Print it.\n',
            '### **Q4.** Demonstrate the view trap: extract the first row, change its first element to `999`, and print the original matrix to see it changed.\n',
            '### **Q5.** Extract the second column from the matrix as a 1D array using `matrix[:, 1]`.\n',
        ]
    ))
    
    S.append((
        SH(2,"Boolean Masking","Filtering Data") + '\n\n' +
        WH("<b>Boolean Masking</b> is how we filter arrays. When you apply a condition to an array (e.g., <code>arr > 5</code>), it returns an array of Booleans (True/False). You can use this Boolean array inside the brackets to select only the True elements.") + '\n\n' +
        "```python\nmask = arr > 5       # [False, True, ...]\nfiltered = arr[mask] # Keeps only the True values\n```\n\n" +
        WC([("Outlier Removal","`clean_data = data[(data > -3) & (data < 3)]` to remove extreme z-scores"),
            ("Conditional Assignment","`arr[arr < 0] = 0` to instantly cap all negative numbers to zero")]) + '\n\n' +
        PT("When combining conditions, you MUST use bitwise operators <code>&</code> (and) / <code>|</code> (or) instead of Python's <code>and/or</code>. You MUST also wrap conditions in parentheses: <code>(arr > 2) & (arr < 8)</code>."),
        "import numpy as np\n\narr = np.array([-2, 5, 10, -5, 8])\n\n# 1. Create the boolean mask\nmask = arr > 0\nprint(f\"Boolean Mask: {mask}\")\n\n# 2. Apply the mask to filter\npositives = arr[mask]\nprint(f\"Positives only: {positives}\")\n\n# 3. Combine conditions (Note the parentheses!)\nin_range = arr[(arr > 0) & (arr < 10)]\nprint(f\"Between 0 and 10: {in_range}\")\n\n# 4. Conditional Replacement\narr[arr < 0] = 0\nprint(f\"Negatives zeroed: {arr}\")\n",
        "Boolean Masking",
        [
            '### **Q1.** Create `arr = np.array([10, 50, 30, 80, 20])`. Create a mask for values `> 40` and print the mask.\n',
            '### **Q2.** Use the mask from Q1 to extract and print the values greater than 40.\n',
            '### **Q3.** Use a combined mask `(arr > 20) & (arr < 60)` to filter the array. Print the result.\n',
            '### **Q4.** Try to use the Python `and` keyword instead of `&` for the combined mask. Catch the ValueError.\n',
            '### **Q5.** Replace all values in the array that are `< 30` with `-1` using a mask assignment. Print the updated array.\n',
        ]
    ))
    
    S.append((
        SH(3,"Broadcasting","Shape Alignment") + '\n\n' +
        WH("<b>Broadcasting</b> is NumPy's way of doing math between arrays of different shapes. If the shapes are compatible, NumPy 'stretches' the smaller array to match the larger one without actually making copies in memory.") + '\n\n' +
        "| Array A | Array B | Result | Works? |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| (3, 3) | Scalar `5` | (3, 3) | Yes (Scalar stretches) |\n"
        "| (3, 3) | (3,) | (3, 3) | Yes (Row stretches down) |\n"
        "| (3, 3) | (4,) | Error | No (Dimensions mismatch) |\n\n" +
        WC([("Standardization","Subtracting the mean of each column from a large matrix: `matrix - means_array`"),
            ("Color Adjustments","Multiplying an RGB image matrix (1080, 1920, 3) by a brightness vector (3,)")]) + '\n\n' +
        PT("Broadcasting starts checking dimensions from the <b>trailing (rightmost) edge</b>. They must be equal, or one of them must be 1. If not, you get a <code>ValueError: operands could not be broadcast together</code>."),
        "import numpy as np\n\n# Matrix (3x3)\nmatrix = np.ones((3, 3))\nprint(\"Original Matrix:\\n\", matrix)\n\n# Scalar Broadcasting\nprint(\"\\nAdd Scalar (5):\\n\", matrix + 5)\n\n# Vector Broadcasting (1D array of shape 3, stretches down across rows)\nvector = np.array([10, 20, 30])\nprint(\"\\nAdd Vector [10, 20, 30]:\\n\", matrix + vector)\n\n# Column Broadcasting (Requires reshaping vector to 3x1)\ncol_vector = vector.reshape((3, 1))\nprint(\"\\nAdd Column Vector:\\n\", matrix + col_vector)\n",
        "Broadcasting",
        [
            '### **Q1.** Create a `3x2` matrix of ones. Multiply it by the scalar `10`. Print the result.\n',
            '### **Q2.** Create a `3x3` matrix of zeros. Add a `1D` array `[1, 2, 3]` to it. Observe how it broadcasts across rows.\n',
            '### **Q3.** Reshape `[1, 2, 3]` into a column `(3, 1)`. Add it to the zeros matrix. Observe how it broadcasts across columns.\n',
            '### **Q4.** Try to add a `1D` array of length `4` to a `3x3` matrix. Catch the `ValueError` and print the error message.\n',
            '### **Q5.** Explain why `(4, 3)` broadcasts with `(3,)` but fails with `(4,)`. (Hint: Right-to-left dimension matching).\n',
        ]
    ))

    TASKS = [
        ("Matrix Borders", "Create a 5x5 array of zeros. Use slicing to set the outer border (first row, last row, first col, last col) to 1. Print the result."),
        ("Checkerboard", "Create an 8x8 array of zeros. Use step slicing `[::2]` to create a checkerboard pattern of 1s and 0s (like a chess board)."),
        ("Outlier Capping", "Create an array of 50 random numbers from a standard normal distribution (`np.random.randn`). Use boolean masking to cap any values > 2 to 2, and any values < -2 to -2. Print the min and max to verify."),
        ("Column Standardization", "Create a 10x3 matrix of random integers. Calculate the mean of each column (`.mean(axis=0)`). Subtract this mean array from the matrix using broadcasting. The new matrix columns should have a mean of 0."),
        ("Distance Matrix", "Create a 1D array `x = np.arange(5)`. Use broadcasting to create a 5x5 matrix where each element `M[i,j] = abs(x[i] - x[j])`. (Hint: reshape one `x` to column)."),
    ]
    
    INTERVIEWS = [
        "What is an array View in NumPy? How does it differ from a Copy?",
        "How do you forcefully create a copy of a slice instead of a view?",
        "Explain Boolean Masking. What type of array is generated as the mask?",
        "Why does NumPy require `&` and `|` instead of `and` and `or` for boolean arrays?",
        "Explain the broadcasting rules in NumPy. What does 'trailing dimensions' mean?",
        "Write code to add a 1D array of length 3 to the columns of a 4x3 matrix.",
        "How do you add a 1D array of length 4 to the rows of a 4x3 matrix? (Hint: `np.newaxis` or reshape).",
        "What does `np.where(condition, x, y)` do? Write an example replacing negatives with 0.",
        "How do you select specific arbitrary rows from a matrix using a list of indices? (Fancy Indexing).",
        "Explain the difference between Slicing (`arr[1:3]`) and Fancy Indexing (`arr[[1,2]]`) in terms of Views vs Copies.",
        "Write a one-liner to reverse the rows of a 2D matrix.",
        "How do you find the unique elements and their counts in a NumPy array? (`np.unique`).",
        "Write code to stack two 1D arrays horizontally and vertically (`np.hstack`, `np.vstack`).",
        "Explain the `axis` parameter. What does `.sum(axis=0)` do on a 2D matrix?",
        "Write a boolean mask to filter out all `np.nan` values from an array.",
        "How do you concatenate two 2D matrices along the column axis?",
        "Explain `np.argmax()` and `np.argmin()`. What do they return?",
        "Write code to sort a 2D array by the values in its second column using `np.argsort()`.",
        "What is the difference between `arr.flatten()` and `arr.ravel()`? (View vs Copy).",
        "Write a broadcasting operation that computes the outer product of two vectors `[1,2,3]` and `[4,5,6]`.",
        "How do you use `np.clip()`? Compare it to using boolean mask assignments.",
        "Explain how memory layout (C-order vs Fortran-order) affects NumPy performance.",
        "Write code to extract the diagonal elements of a matrix without using a loop.",
        "What is the `Ellipsis` (`...`) used for in NumPy slicing?",
        "How does NumPy handle operations between arrays of different `dtype`s? (Type Promotion).",
    ]

    nb = build(
        day=22, title="NumPy Advanced",
        obj_text="To manipulate data efficiently, you must master the art of selecting exactly what you need. Today we cover Slicing matrices, filtering data with Boolean Masks, and applying mathematical transformations across different shapes using the magic of Broadcasting.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Slicing | `arr[0:2, :]`, Views |\n| 2 | Masking | `arr[arr > 5]`, Filtering |\n| 3 | Broadcasting | Shape stretching (`+`) |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Slices | Slices are Views! Modifying a slice alters the original data |\n| 2 | Masks | Use `&` and `|` with parentheses `(arr>1) & (arr<5)` |\n| 3 | Broadcast | NumPy automatically stretches dimensions to align math operations |\n",
        checklist="- [ ] I can slice rows and columns from a 2D matrix.\n- [ ] I can filter an array using a boolean condition.\n- [ ] I understand how scalar broadcasting works.",
        next_up="Day 23 - Pandas: DataFrames & Real-World Data"
    )
    save(nb, os.path.join('notebooks', 'Day22_NumPy_Advanced_Blank.ipynb'))

def build_day23():
    S = []
    
    S.append((
        SH(1,"Pandas Series & DataFrames","Data Structures") + '\n\n' +
        WH("<b>Pandas</b> is the ultimate tool for tabular data (like Excel/SQL in Python). It is built on top of NumPy. A <b>Series</b> is a 1D column with row labels (an index). A <b>DataFrame</b> is a 2D table composed of multiple Series that share the same index.") + '\n\n' +
        "```python\nimport pandas as pd\n# Creating a DataFrame from a dictionary\ndf = pd.DataFrame({'Name': ['Alice', 'Bob'], 'Age': [25, 30]})\n```\n\n" +
        WC([("SQL Replacement","Pandas can perform JOINs, GROUP BYs, and aggregations directly in Python memory"),
            ("Data Cleaning","Pandas has hundreds of built-in methods to handle missing data and transform formats")]) + '\n\n' +
        PF("Looping over DataFrames","<b>Never use a <code>for</code> loop to iterate over rows in a DataFrame</b> (e.g., `iterrows()`). It destroys Pandas' vectorized performance. Always use column-level vectorized math or `.apply()`."),
        "import pandas as pd\n\n# Creating a Series (1D)\nages = pd.Series([25, 30, 35], name=\"Age\")\nprint(f\"Series:\\n{ages}\\n\")\n\n# Creating a DataFrame (2D)\ndata = {\n    'Name': ['Alice', 'Bob', 'Charlie'],\n    'Age': [25, 30, 35],\n    'City': ['NY', 'LA', 'CHI']\n}\ndf = pd.DataFrame(data)\nprint(\"DataFrame:\")\nprint(df)\n\n# Selecting a single column returns a Series\nprint(f\"\\nType of df['Name']: {type(df['Name'])}\")\n",
        "DataFrames",
        [
            '### **Q1.** Import `pandas as pd`. Create a Series from `[10, 20, 30]` and print it. Notice the index column.\n',
            '### **Q2.** Create a DataFrame from a dictionary of lists: `{"Product": ["A", "B"], "Price": [10.5, 20.0]}`. Print it.\n',
            '### **Q3.** Create a DataFrame from a list of dictionaries (JSON style): `[{"A": 1, "B": 2}, {"A": 3, "B": 4}]`. Print it.\n',
            '### **Q4.** Extract the `"Price"` column from the Q2 DataFrame and print its `type()`. It should be a Series.\n',
            '### **Q5.** Print the `df.index` and `df.columns` attributes of your DataFrame.\n',
        ]
    ))
    
    S.append((
        SH(2,"Reading & Exploring Data","I/O and EDA") + '\n\n' +
        WH("In the real world, you don't create DataFrames by hand; you read them from CSVs, SQL, or JSON. Once loaded, you use <b>Exploratory Data Analysis (EDA)</b> methods to understand the shape, data types, and missing values in your dataset.") + '\n\n' +
        "| Method | Purpose |\n"
        "| :--- | :--- |\n"
        "| `pd.read_csv()` | Load data from a CSV file |\n"
        "| `df.head(n)` | View the first n rows (default 5) |\n"
        "| `df.info()` | Check column types and missing (Null) values |\n"
        "| `df.describe()`| Summary statistics (mean, min, max) for numeric columns |\n"
        "| `df.shape` | Tuple of (rows, columns) |\n\n" +
        WC([("Initial Audit","`df.info()` is always the first command you run to see if your numeric columns accidentally loaded as strings"),
            ("Data Distribution","`df.describe()` instantly shows if you have massive outliers in your data")]) + '\n\n' +
        PT("If you have a very wide DataFrame, <code>df.head()</code> will truncate columns. You can fix this by running <code>pd.set_option('display.max_columns', None)</code>."),
        "import pandas as pd\nimport numpy as np\n\n# Creating fake data to simulate a file load\ndf = pd.DataFrame({\n    'ID': range(1, 1001),\n    'Revenue': np.random.normal(100, 20, 1000),  # Bell curve around 100\n    'Status': ['Active', 'Churned'] * 500\n})\n\n# 1. Look at the top rows\nprint(\"df.head(3):\\n\", df.head(3))\n\n# 2. Check the dimensions\nprint(\"\\nShape:\", df.shape)\n\n# 3. Check for missing data and types\nprint(\"\\nInfo:\")\ndf.info()\n\n# 4. Get statistical summary\nprint(\"\\nDescribe:\\n\", df.describe())\n",
        "Exploring Data",
        [
            '### **Q1.** Write the theoretical command to read a file named `"sales_data.csv"` into a DataFrame `df`.\n',
            '### **Q2.** Create a random DataFrame with 20 rows. Print `df.head()` and `df.tail(3)`.\n',
            '### **Q3.** Run `df.info()` on your DataFrame. What information does the `Non-Null Count` column provide?\n',
            '### **Q4.** Run `df.describe()`. What is the 50% row representing? (Hint: The Median).\n',
            '### **Q5.** Extract the total number of rows from `df.shape` and print `"Total rows: [N]"`.\n',
        ]
    ))
    
    S.append((
        SH(3,"Basic Column Operations","Vectorized Math") + '\n\n' +
        WH("Because Pandas is built on NumPy, you can perform math on entire columns instantly without looping. You can easily create new columns by calculating combinations of existing columns.") + '\n\n' +
        "```python\n# Creating a new column\ndf['Profit'] = df['Revenue'] - df['Cost']\n```\n\n" +
        WC([("Feature Engineering","Creating a `Price_Per_Unit` column by dividing `Total_Price` by `Quantity`"),
            ("Date Math","Calculating days since a purchase by subtracting `Purchase_Date` from `Today`")]) + '\n\n' +
        PT("To drop a column, use <code>df.drop(columns=['ColName'])</code>. Remember that Pandas methods usually return a NEW DataFrame. To save it, overwrite the variable: <code>df = df.drop(...)</code>."),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Product': ['Apple', 'Banana', 'Cherry'],\n    'Price': [1.20, 0.50, 3.00],\n    'Quantity': [100, 250, 50]\n})\n\n# Create a new column using vectorized math\ndf['Total_Value'] = df['Price'] * df['Quantity']\nprint(\"After math:\\n\", df)\n\n# Drop a column\ndf_dropped = df.drop(columns=['Quantity'])\nprint(\"\\nAfter drop:\\n\", df_dropped)\n\n# Math with scalars\ndf['Discount_Price'] = df['Price'] * 0.90\nprint(\"\\nAfter 10% discount:\\n\", df)\n",
        "Column Math",
        [
            '### **Q1.** Given `df` with `Cost` and `Revenue`, create a new column `Profit = Revenue - Cost`.\n',
            '### **Q2.** Create a column `Margin` which is `Profit / Revenue`. Print the DataFrame.\n',
            '### **Q3.** Drop the `Cost` column. Ensure you save the result back to `df` or a new variable.\n',
            '### **Q4.** Add `100` to every value in the `Revenue` column using `df["Revenue"] = df["Revenue"] + 100`.\n',
            '### **Q5.** Rename the column `"Revenue"` to `"Total_Sales"` using `df.rename(columns={"Old": "New"})`.\n',
        ]
    ))

    TASKS = [
        ("Dictionary to DF", "Create a dictionary containing data for 5 employees (Name, Department, Salary). Convert it to a Pandas DataFrame. Print the DataFrame."),
        ("Summary Stats", "Create a DataFrame with 1000 rows of random numbers (`np.random.rand(1000)`). Use `df.describe()` to find the mean and standard deviation. Print them."),
        ("Currency Conversion", "Given a DataFrame with a `Price_USD` column, create a new column `Price_EUR` assuming an exchange rate of 0.85. Drop the original USD column."),
        ("Boolean Column", "Given a DataFrame with a `Score` column (0-100), create a new boolean column `Passed` which is True if Score >= 60, and False otherwise."),
        ("CSV Simulation", "Use `pathlib` to write a small CSV string to `data.csv`. Then use `pd.read_csv('data.csv')` to load it into a DataFrame and print `df.head()`."),
    ]
    
    INTERVIEWS = [
        "What is the difference between a Pandas Series and a Pandas DataFrame?",
        "Why is Pandas built on top of NumPy? What benefits does it provide?",
        "Explain why iterating over a DataFrame with `iterrows()` is considered an anti-pattern.",
        "What does `df.info()` show that `df.describe()` does not?",
        "How do you read an Excel file in Pandas? What dependency is required? (`openpyxl`).",
        "What is the `inplace=True` argument? Why is the Pandas team discouraging its use in newer versions?",
        "How do you change the data type of a column from string to integer? (`astype`).",
        "Write code to rename multiple columns in a DataFrame using a dictionary.",
        "What happens if you try to add a new column using dot notation `df.NewCol = 10` instead of bracket notation `df['NewCol'] = 10`?",
        "How do you write a DataFrame back to a CSV file without including the index column? (`index=False`).",
        "Explain the difference between `df['A']` and `df[['A']]` in terms of the object type returned.",
        "How do you sample a random 10% of your DataFrame? (`df.sample(frac=0.1)`).",
        "What is the Pandas Index? How is it different from a regular column?",
        "How do you set a specific column to be the index of the DataFrame? (`set_index`).",
        "Write code to drop multiple columns at once.",
        "How do you check memory usage of a DataFrame? (`df.info(memory_usage='deep')`).",
        "Explain how Pandas handles missing data natively. What object represents a missing number?",
        "Write a vectorized operation that squares the values in Column A and adds them to Column B.",
        "How do you read data from a SQL database directly into a Pandas DataFrame? (`read_sql`).",
        "What is a categorical data type in Pandas, and when should you use it to save memory?",
        "How do you apply a custom Python function to an entire column? (`.apply()`).",
        "Explain the difference between `.map()` and `.apply()` on a Series.",
        "How do you read a JSON file into Pandas where the records are nested deeply?",
        "Write code to extract all the column names of a DataFrame into a Python list.",
        "What is `pd.to_datetime()` used for?",
    ]

    nb = build(
        day=23, title="Pandas Intro",
        obj_text="Pandas is the industry standard for tabular data manipulation. It brings SQL-like power to Python in memory. Today we learn how to create DataFrames, load external files, perform Exploratory Data Analysis (EDA), and execute vectorized column math.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | DataFrames | Tables & Series |\n| 2 | EDA | `info()`, `describe()` |\n| 3 | Operations | Column math & renaming |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Structures | DataFrames are collections of Series sharing an index |\n| 2 | I/O | Use `pd.read_csv()` to load data, `df.info()` to check it |\n| 3 | Math | `df['New'] = df['A'] + df['B']` calculates row-by-row instantly |\n",
        checklist="- [ ] I can create a DataFrame from a dictionary.\n- [ ] I can check data types and nulls using `df.info()`.\n- [ ] I can create new calculated columns.",
        next_up="Day 24 - Pandas Selection: Loc, Iloc, and Filtering"
    )
    save(nb, os.path.join('notebooks', 'Day23_Pandas_Intro_Blank.ipynb'))

def build_day24():
    S = []
    
    S.append((
        SH(1,"Loc and Iloc","Row and Column Selection") + '\n\n' +
        WH("Selecting data in Pandas requires precision. <b><code>.iloc[]</code></b> selects by integer position (like standard Python lists). <b><code>.loc[]</code></b> selects by index label and column name. Both follow the format <code>[rows, columns]</code>.") + '\n\n' +
        "| Accessor | Paradigm | Example | Meaning |\n"
        "| :--- | :--- | :--- | :--- |\n"
        "| `.iloc` | Integer Position | `df.iloc[0:5, 0:2]` | First 5 rows, first 2 columns |\n"
        "| `.loc` | Label / Name | `df.loc[:, 'Age':'City']` | All rows, columns from Age to City |\n\n" +
        WC([("Feature Selection","Extracting the target variable `Y = df['Price']` and the features `X = df.iloc[:, :-1]` for Machine Learning")]) + '\n\n' +
        PF("Inclusive Loc","A major 'gotcha': Slicing with <code>.iloc[0:5]</code> is EXCLUSIVE of 5 (returns 0,1,2,3,4). But slicing with <code>.loc['A':'C']</code> is INCLUSIVE of 'C' (returns A,B,C)."),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Age': [25, 30, 35, 40],\n    'Salary': [50000, 60000, 70000, 80000]\n}, index=['ID1', 'ID2', 'ID3', 'ID4'])\n\n# iloc: Integer position (Row 1, all columns)\nprint(\"iloc (Position):\\n\", df.iloc[1, :])\n\n# loc: Label based (Row 'ID2', specific columns)\nprint(\"\\nloc (Label):\\n\", df.loc['ID2', ['Name', 'Salary']])\n\n# Slicing with loc (Inclusive!)\nprint(\"\\nloc Slicing:\\n\", df.loc['ID1':'ID3', 'Age':])\n",
        "Loc / Iloc",
        [
            '### **Q1.** Given `df`, use `.iloc` to select the first 3 rows and the first 2 columns.\n',
            '### **Q2.** Use `.loc` to select all rows (`:`), but only the `"Name"` and `"Salary"` columns.\n',
            '### **Q3.** What happens if you try `df.iloc[0, "Name"]`? Catch the `TypeError` (iloc requires integers).\n',
            '### **Q4.** Use `.loc` to slice rows from `"ID2"` to `"ID4"` inclusive. Print the result.\n',
            '### **Q5.** Extract the single scalar value in row 0, column 1 using `.iloc[0, 1]`. Print it.\n',
        ]
    ))
    
    S.append((
        SH(2,"Boolean Filtering","Querying Data") + '\n\n' +
        WH("You can filter DataFrames exactly like NumPy arrays using Boolean Masks. Create a condition, and pass it into the DataFrame brackets: <code>df[condition]</code>. Pandas also provides the highly readable <code>.query()</code> method for SQL-like string queries.") + '\n\n' +
        "```python\n# Standard Masking\nrich_users = df[df['Salary'] > 75000]\n\n# Multiple conditions (Requires parenthesis and bitwise &)\ntargets = df[(df['Age'] > 30) & (df['City'] == 'NY')]\n\n# The elegant .query() alternative\ntargets = df.query(\"Age > 30 and City == 'NY'\")\n```\n\n" +
        WC([("Cohort Extraction","Filtering a massive dataset down to only active users from a specific country"),
            ("Date Filtering","`df[df['Date'] >= '2024-01-01']` to extract year-to-date performance")]) + '\n\n' +
        PT("When using <code>.query()</code>, you can refer to external Python variables by prefixing them with an <code>@</code> symbol: <code>df.query('Age > @min_age')</code>."),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Age': [25, 30, 35, 40],\n    'Dept': ['HR', 'IT', 'IT', 'Sales']\n})\n\n# Boolean Mask Filtering\nit_staff = df[df['Dept'] == 'IT']\nprint(\"Mask Filtering:\\n\", it_staff)\n\n# .isin() for multiple values\nhr_or_sales = df[df['Dept'].isin(['HR', 'Sales'])]\nprint(\"\\n.isin() Filtering:\\n\", hr_or_sales)\n\n# Query syntax (Very readable)\nsenior_it = df.query(\"Dept == 'IT' and Age >= 35\")\nprint(\"\\n.query() Filtering:\\n\", senior_it)\n",
        "Filtering",
        [
            '### **Q1.** Create a mask for `Age >= 30`. Use it to filter `df` and print the result.\n',
            '### **Q2.** Filter `df` for people who are in `"IT"` OR (`|`) `"Sales"`. (Remember parentheses around conditions).\n',
            '### **Q3.** Use the `.isin()` method to achieve the exact same result as Q2. Print it.\n',
            '### **Q4.** Use the `.query()` method to find rows where `Age < 40` and `Dept == "HR"`. Print the result.\n',
            '### **Q5.** Filter the DataFrame to keep rows where the Name starts with "A" using `df[df["Name"].str.startswith("A")]`.\n',
        ]
    ))
    
    S.append((
        SH(3,"Sorting and Ranking","Ordering Data") + '\n\n' +
        WH("Once data is filtered, we often need to sort it to find the top/bottom performers using <code>.sort_values()</code>. You can sort by multiple columns and specify ascending/descending order.") + '\n\n' +
        "| Method | Purpose | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `sort_values(by=)` | Sort rows | `df.sort_values(by='Age', ascending=False)` |\n"
        "| `nlargest(n, col)` | Top N rows | `df.nlargest(5, 'Salary')` (Faster than sorting!) |\n"
        "| `rank()` | Assign ranks | `df['Salary'].rank(ascending=False)` |\n\n" +
        WC([("Leaderboards","Finding the top 10 highest revenue generating products"),
            ("Time Series","Ensuring financial data is strictly sorted chronologically before calculating moving averages")]) + '\n\n' +
        PT("If you just need the top 5 values, <code>df.nlargest(5, 'Col')</code> is computationally faster than sorting the entire million-row DataFrame and calling <code>.head(5)</code>."),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Charlie', 'David'],\n    'Score': [85, 92, 85, 95],\n    'Time': [120, 110, 105, 130]\n})\n\n# Sort by single column (Descending)\nprint(\"Highest Scores:\\n\", df.sort_values(by='Score', ascending=False))\n\n# Sort by multiple columns (Score desc, then Time asc to break ties)\ntie_breaker = df.sort_values(by=['Score', 'Time'], ascending=[False, True])\nprint(\"\\nMulti-sort (Tiebreaker):\\n\", tie_breaker)\n\n# Find top 2 using nlargest\nprint(\"\\nTop 2 Scores:\\n\", df.nlargest(2, 'Score'))\n",
        "Sorting",
        [
            '### **Q1.** Sort `df` by `"Time"` in ascending order (fastest to slowest). Print the result.\n',
            '### **Q2.** Sort `df` by `"Name"` alphabetically. Print it.\n',
            '### **Q3.** Use `.nsmallest(2, "Time")` to find the two fastest times. Print the result.\n',
            '### **Q4.** Create a new column `"Rank"` using `df["Score"].rank(ascending=False, method="min")`. Print `df`.\n',
            '### **Q5.** Sort the DataFrame by the index (if it was scrambled) using `df.sort_index()`. Print it.\n',
        ]
    ))

    TASKS = [
        ("Matrix Extraction", "Create a 5x5 DataFrame of random numbers. Use `.iloc` to extract a 3x3 subset from the very middle of the DataFrame."),
        ("Cohort Filter", "Create a DataFrame of 10 users with `Age` and `Country`. Filter for users `Age > 18` AND `Country == 'USA'`. Extract only their `Name` column using `.loc[mask, 'Name']`."),
        ("Dynamic Query", "Create a variable `min_salary = 60000`. Use `df.query(\"Salary > @min_salary\")` to filter a DataFrame of employees. Print the result."),
        ("Top Performers", "Create a DataFrame of 100 random student scores. Find the top 5 scores using `.nlargest()`. Then sort the whole DataFrame and use `.head(5)`. Verify they match."),
        ("Text Filtering", "Create a DataFrame of product names. Filter the DataFrame to only keep rows where the product name contains the word 'Pro' using `df['Product'].str.contains('Pro')`."),
    ]
    
    INTERVIEWS = [
        "What is the difference between `.loc` and `.iloc`?",
        "Explain why `.iloc[0:2]` returns 2 rows, but `.loc[0:2]` might return 3 rows (if the index is integers).",
        "How do you filter a DataFrame based on values in a list? (Hint: `.isin()`).",
        "Write a boolean mask to filter out rows where a specific column contains `NaN`. (Hint: `.notna()`).",
        "What is the `.query()` method and why might you choose it over standard boolean masking?",
        "How do you reference external variables inside a `.query()` string?",
        "Explain what `SettingWithCopyWarning` is. How do you prevent it using `.copy()`?",
        "Write code to sort a DataFrame by Column A descending, and then Column B ascending.",
        "What is the difference between `sort_values` and `sort_index`?",
        "Why is `nlargest(5, 'A')` generally preferred over `sort_values('A').head(5)`?",
        "How do you select a single scalar value from a DataFrame extremely fast? (Hint: `.at` and `.iat`).",
        "Write code to filter a DataFrame using a regular expression on a string column. (`.str.contains(regex=True)`).",
        "How do you select columns based on their data type? (`df.select_dtypes(include='number')`).",
        "Explain how the `~` operator is used in Pandas boolean masking.",
        "Write code to invert a boolean mask.",
        "How do you update the values of a column only for specific rows using `.loc`?",
        "What happens if you assign a list of values to a new column, but the list length doesn't match the DataFrame length?",
        "Explain the `rank()` method. How does it handle tied values by default?",
        "How do you filter a DataFrame based on the length of a string in a column? (`df['Col'].str.len() > 5`).",
        "Write code to drop all rows where ANY column has a missing value.",
        "How do you reset the index of a DataFrame after filtering it? Why is `drop=True` important?",
        "Explain how boolean masking leverages NumPy's vectorized operations under the hood.",
        "What is a `MultiIndex` (Hierarchical Index)? How do you select data from it using `.loc`?",
        "Write code to select every alternate row in a DataFrame using `.iloc` and step slicing.",
        "How do you randomly shuffle the rows of a DataFrame using `.sample()`?",
    ]

    nb = build(
        day=24, title="Pandas Selection",
        obj_text="Knowing how to navigate tables is the most heavily tested skill in Data Analyst interviews. Today we master precise row/column extraction using `.loc` and `.iloc`, SQL-style filtering using Boolean Masks and `.query()`, and leaderboard generation via sorting.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Loc/Iloc | Exact Indexing |\n| 2 | Masking/Query | Conditional Filtering |\n| 3 | Sorting | `sort_values`, `nlargest` |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | loc/iloc | `iloc` is integer position (exclusive end). `loc` is label name (inclusive end). |\n| 2 | Masking | `df[df['A'] > 5]` filters rows. Combine with `&` and `|`. |\n| 3 | Query | `df.query(\"A > 5\")` is highly readable for complex logic. |\n",
        checklist="- [ ] I can extract rows and columns using `.loc` and `.iloc`.\n- [ ] I can filter a DataFrame using multiple conditions.\n- [ ] I can sort data and find the top N records.",
        next_up="Day 25 - Pandas Data Cleaning & Missing Values"
    )
    save(nb, os.path.join('notebooks', 'Day24_Pandas_Selection_Blank.ipynb'))

if __name__ == '__main__':
    build_day22()
    build_day23()
    build_day24()
    print("Days 22, 23, 24 generated successfully!")
