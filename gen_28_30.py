"""Generate Days 28 to 30."""
from nb_helpers import *
import os

def build_day28():
    S = []
    
    S.append((
        SH(1,"String and Datetime Accessors",".str and .dt") + '\n\n' +
        WH("Pandas provides specialized methods for specific data types using <b>Accessors</b>. If a column contains strings, use the <code>.str</code> accessor to apply string methods (like `.upper()`). If it contains dates, use <code>.dt</code> to extract the year or month.") + '\n\n' +
        "```python\n# String Accessor\ndf['Name'] = df['Name'].str.upper().str.strip()\n\n# Datetime Accessor\ndf['Year'] = df['Date'].dt.year\n```\n\n" +
        WC([("Text Cleaning","Removing leading/trailing spaces from a column of messy user inputs"),
            ("Seasonality","Extracting the `DayOfWeek` from a Timestamp to see if weekend sales are higher")]) + '\n\n' +
        PF("Type Errors","You cannot use <code>.dt</code> on a string column! You must first convert it: <code>df['Date'] = pd.to_datetime(df['DateString'])</code> before using the accessor."),
        "import pandas as pd\n\ndf = pd.DataFrame({\n    'Product': [' Apple ', 'BANANA', 'cherry_pie'],\n    'Bought': ['2023-12-25', '2024-01-01', '2024-02-14']\n})\n\n# String Accessors\ndf['Clean_Product'] = df['Product'].str.strip().str.title()\nprint(\"Clean Strings:\\n\", df[['Product', 'Clean_Product']])\n\n# Convert to Datetime FIRST\ndf['Date'] = pd.to_datetime(df['Bought'])\n\n# Datetime Accessors\ndf['Year'] = df['Date'].dt.year\ndf['Month'] = df['Date'].dt.month_name()\nprint(\"\\nDates Extracted:\\n\", df[['Bought', 'Year', 'Month']])\n",
        "Accessors",
        [
            '### **Q1.** Given `df["Text"] = ["  hello  ", " WORLD "]`. Use `.str.lower().str.strip()` to clean it.\n',
            '### **Q2.** Create a string column `"100 USD"`. Use `.str.replace(" USD", "")` to remove the currency.\n',
            '### **Q3.** Convert `df["Date"] = ["2020-01-01"]` to datetime using `pd.to_datetime()`. Print the `dtypes`.\n',
            '### **Q4.** Use the `.dt` accessor to extract the `.day` from your converted datetime column.\n',
            '### **Q5.** Use `df["Text"].str.contains("hel")` to create a boolean mask. Print it.\n',
        ]
    ))
    
    S.append((
        SH(2,"Time Series Resampling","Rolling up Dates") + '\n\n' +
        WH("When working with Time Series data (where the <b>Index</b> is a Datetime), you can use <b><code>.resample()</code></b>. It is exactly like <code>.groupby()</code>, but specifically for time frequencies (e.g., grouping daily data into monthly averages).") + '\n\n' +
        "| Frequency | String | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| Daily | `'D'` | `df.resample('D').sum()` |\n"
        "| Weekly | `'W'` | `df.resample('W').mean()` |\n"
        "| Monthly | `'M'` | `df.resample('M').max()` |\n"
        "| Quarterly| `'Q'` | `df.resample('Q').count()` |\n\n" +
        WC([("Financial Aggregations","Converting minute-by-tick stock data into Daily OHLC (Open, High, Low, Close) bars"),
            ("Smoothing","Aggregating noisy daily web traffic into smooth Weekly averages")]) + '\n\n' +
        PT("<code>.resample()</code> ONLY works if your DataFrame's index is a <code>DatetimeIndex</code>! Use <code>df.set_index('DateColumn', inplace=True)</code> before attempting to resample."),
        "import pandas as pd\nimport numpy as np\n\n# Create 10 days of data\ndates = pd.date_range(start='2024-01-01', periods=10, freq='D')\ndf = pd.DataFrame({\n    'Sales': np.random.randint(100, 500, 10)\n}, index=dates)\n\nprint(\"Daily Data (First 5):\\n\", df.head())\n\n# Resample to Weekly ('W') and Sum\nweekly = df.resample('W').sum()\nprint(\"\\nWeekly Total Sales:\\n\", weekly)\n\n# Resample to 3-Day periods and Mean\nthreeday = df.resample('3D').mean()\nprint(\"\\n3-Day Average Sales:\\n\", threeday)\n",
        "Resampling",
        [
            '### **Q1.** Create `dates = pd.date_range("2020-01-01", periods=30, freq="D")` and a DF with it as the index.\n',
            '### **Q2.** Fill the DF with a `Sales` column of random integers. Print `df.head()`.\n',
            '### **Q3.** Resample the daily data to Weekly (`"W"`) and calculate the `.sum()`. Print it.\n',
            '### **Q4.** Resample the data to Monthly (`"M"`) and calculate the `.mean()`. Print it.\n',
            '### **Q5.** What happens if you try to resample a DataFrame whose index is just integers (0,1,2...)? Catch the TypeError.\n',
        ]
    ))
    
    S.append((
        SH(3,"Rolling Windows","Moving Averages") + '\n\n' +
        WH("A <b>Rolling Window</b> calculates statistics over a sliding window of time. The most common use case is the <b>Moving Average</b>, which smooths out short-term fluctuations in data to highlight longer-term trends.") + '\n\n' +
        "```python\n# Calculate a 7-day moving average\ndf['7D_MA'] = df['Sales'].rolling(window=7).mean()\n```\n\n" +
        WC([("Stock Analysis","Calculating the 50-day and 200-day moving averages to find 'Golden Cross' buy signals"),
            ("Trend Detection","Smoothing out weekday vs weekend sales spikes to see the true month-over-month growth")]) + '\n\n' +
        PT("The first <code>N-1</code> rows of a rolling window of size <code>N</code> will result in <code>NaN</code>, because there isn't enough historical data to calculate the full window yet. You can use <code>min_periods=1</code> to calculate partial windows."),
        "import pandas as pd\n\n# 10 days of volatile sales data\ndf = pd.DataFrame({\n    'Sales': [10, 100, 20, 90, 15, 110, 25, 95, 30, 105]\n})\n\n# Calculate a 3-day Rolling Mean\ndf['3D_Avg'] = df['Sales'].rolling(window=3).mean()\n\n# Calculate a 3-day Rolling Sum\ndf['3D_Sum'] = df['Sales'].rolling(window=3).sum()\n\nprint(\"Notice the NaNs in the first 2 rows!\")\nprint(df)\n",
        "Rolling",
        [
            '### **Q1.** Given `df["Prices"] = [10, 20, 30, 40, 50]`. Calculate a rolling mean with `window=2`.\n',
            '### **Q2.** Observe the `NaN` in the first row. Add `min_periods=1` to the `.rolling()` call and print again.\n',
            '### **Q3.** Calculate a rolling `.max()` with `window=3`. Print it.\n',
            '### **Q4.** Calculate an expanding sum (cumulative sum) using `df["Prices"].expanding().sum()`. Print it.\n',
            '### **Q5.** Explain why moving averages are essential for visualizing highly volatile daily data.\n',
        ]
    ))

    TASKS = [
        ("String Pipeline", "Create `df = pd.DataFrame({'Code': [' id-01 ', 'id-02', ' ID-03 ']})`. Write a chained pipeline using `.str` to: strip whitespace, convert to uppercase, and replace '-' with '_'. Result should be 'ID_01'."),
        ("Datetime Features", "Create a single Datetime column for '2023-12-25'. Use the `.dt` accessor to extract the Year, Month, Day, and `day_name()` into 4 separate new columns."),
        ("Monthly Aggregation", "Generate 365 days of random sales data for the year 2023. Set the date as the index. Resample to Monthly ('M') and find the Total Sales and Max Daily Sale per month using `.agg(['sum', 'max'])`."),
        ("Golden Cross", "Generate 100 days of stock prices. Calculate the 10-day moving average and the 30-day moving average. Add both as columns to the DataFrame."),
        ("Shift and Differences", "Use the `.shift(1)` method on a `Sales` column to create a `Previous_Day_Sales` column. Then calculate the `Daily_Growth` by subtracting them. This is how Day-over-Day metrics are made!"),
    ]
    
    INTERVIEWS = [
        "Explain the difference between the `.str` accessor and the `.dt` accessor.",
        "How do you convert a string column 'Jan 15, 2023' into a Pandas datetime object?",
        "What happens if you use `pd.to_datetime()` on a column that has mixed or European date formats? (Hint: `dayfirst=True` or `format=...`).",
        "Write code to extract the day of the week (e.g., 'Monday') from a datetime column.",
        "Explain what a DatetimeIndex is. Why is it required for `.resample()`?",
        "What is the difference between `.resample('M').mean()` and `.groupby(df.index.month).mean()`?",
        "How do you handle the `NaN` values generated by a `.rolling(window=30)` calculation?",
        "Explain the difference between a Rolling window and an Expanding window.",
        "Write code to calculate the Exponential Moving Average (EMA) using `.ewm()`.",
        "How do you calculate the day-over-day percentage change in Pandas? (Hint: `.pct_change()`).",
        "Write code using `.str.contains()` with a regex to filter rows that contain an email address.",
        "How do you split a string column 'First Last' into two separate columns 'First' and 'Last'? (`.str.split(expand=True)`).",
        "Explain `.shift()`. How is it used to calculate differences between consecutive rows?",
        "What does `.diff()` do? How does it relate to `.shift()`?",
        "How do you handle Time Zones in Pandas datetime objects? (`.dt.tz_localize()` and `.tz_convert()`).",
        "Write a `.resample()` operation that aggregates trade data into OHLC (Open, High, Low, Close) bars.",
        "Explain the `pd.DateOffset` object and how it's used to add exactly one month to a datetime column.",
        "How do you fill missing dates in a Time Series so that every single day has a row? (Hint: `.asfreq('D')`).",
        "Write code to interpolate missing values in a time series quadratically.",
        "What is a `Timedelta`? How do you calculate the number of days between two datetime columns?",
        "Explain how to use `.str.get_dummies()` for One-Hot Encoding a categorical string column.",
        "Write code to filter a Time Series DataFrame to only include business days (Monday-Friday).",
        "How do you slice a Time Series DataFrame using partial string indexing? (e.g., `df.loc['2023-01']`).",
        "What is 'Look-ahead bias' in Time Series analysis, and how do rolling windows help prevent it?",
        "Write code to calculate the rolling standard deviation (volatility) of a stock price over a 20-day window.",
    ]

    nb = build(
        day=28, title="Time Series & Accessors",
        obj_text="Data is rarely clean, and it usually involves Time. Today we master Pandas Accessors (`.str` and `.dt`) to clean text and extract date features. We then dive into Time Series analysis, learning how to resample frequencies and calculate Rolling Moving Averages.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Accessors | `.str.upper()`, `.dt.year` |\n| 2 | Resample | Grouping by Time (`'M'`, `'W'`) |\n| 3 | Rolling | Moving Averages (MA) |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | .str / .dt | Unlock hundreds of type-specific methods on entire columns |\n| 2 | Resample | It's just `groupby` but for dates. Requires a DatetimeIndex. |\n| 3 | Rolling | Calculates stats over a sliding window. First `N` rows will be NaN. |\n",
        checklist="- [ ] I can use `.str` to clean text columns.\n- [ ] I can `.resample()` daily data into monthly data.\n- [ ] I can calculate a 7-day rolling moving average.",
        next_up="Day 29 - Data Visualization with Seaborn"
    )
    save(nb, os.path.join('notebooks', 'Day28_Pandas_Series_Blank.ipynb'))

def build_day29():
    S = []
    
    S.append((
        SH(1,"Seaborn Basics","Statistical Visualization") + '\n\n' +
        WH("<b>Seaborn</b> is a data visualization library built on top of Matplotlib. It integrates deeply with Pandas DataFrames and provides beautiful default themes. While Pandas is for crunching numbers, Seaborn is for <i>communicating</i> those numbers to stakeholders.") + '\n\n' +
        "```python\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\n# Create a basic scatter plot\nsns.scatterplot(data=df, x='Age', y='Salary')\nplt.show() # Always call this to render the plot!\n```\n\n" +
        WC([("Storytelling","Transforming a boring table of 10,000 rows into a clear trend line showing revenue growth"),
            ("Outlier Detection","Using Box plots to instantly spot anomalous transactions visually")]) + '\n\n' +
        PF("Forgetting plt.show()","Seaborn draws the plot, but <code>matplotlib.pyplot.show()</code> is required to display it in many environments. Always import both libraries!"),
        "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\n# Create sample data\ndf = pd.DataFrame({\n    'Experience': [1, 2, 3, 4, 5, 6],\n    'Salary': [40, 45, 60, 65, 80, 85]\n})\n\n# 1. Set a beautiful theme\nsns.set_theme(style=\"darkgrid\")\n\n# 2. Create the plot (pass the DataFrame and column names!)\nsns.scatterplot(data=df, x='Experience', y='Salary', color='blue', s=100)\n\n# 3. Add titles using matplotlib\nplt.title(\"Salary vs Experience\")\nplt.xlabel(\"Years of Experience\")\nplt.ylabel(\"Salary ($k)\")\n\n# 4. Show the plot\nprint(\"Plot successfully generated! (Imagine a beautiful scatterplot here)\")\n# plt.show() # Commented out for text-only execution\n",
        "Seaborn Intro",
        [
            '### **Q1.** Import `seaborn as sns` and `matplotlib.pyplot as plt`.\n',
            '### **Q2.** Load Seaborn\'s built in dataset: `tips = sns.load_dataset("tips")`. Print `tips.head()`.\n',
            '### **Q3.** Create a scatterplot mapping `x="total_bill"` and `y="tip"`. Use `data=tips`.\n',
            '### **Q4.** Add a title using `plt.title("Bill vs Tip")`.\n',
            '### **Q5.** Call `plt.show()` to render the plot.\n',
        ]
    ))
    
    S.append((
        SH(2,"Distributions & Categoricals","Understanding the Shape") + '\n\n' +
        WH("Before modeling, you must understand the shape of your data. <b>Histograms</b> (`histplot`) show the distribution of a single continuous variable. <b>Bar plots</b> (`barplot`) and <b>Box plots</b> (`boxplot`) show the relationship between a categorical variable and a continuous variable.") + '\n\n' +
        "| Plot Type | Purpose | Seaborn Function |\n"
        "| :--- | :--- | :--- |\n"
        "| Histogram | Distribution of 1 numeric col | `sns.histplot(x='Age')` |\n"
        "| Bar Plot | Aggregation (Mean) per category | `sns.barplot(x='Dept', y='Salary')` |\n"
        "| Box Plot | Spread and Outliers per category| `sns.boxplot(x='Dept', y='Salary')` |\n\n" +
        WC([("Audience Demographics","Plotting a histogram of user ages to see if your app is popular with Gen Z or Boomers"),
            ("A/B Testing","Using a boxplot to compare the spread of checkout times between Group A and Group B")]) + '\n\n' +
        PT("By default, <code>sns.barplot</code> calculates the <b>Mean</b> of the y-variable for each category and adds error bars! If you just want to count occurrences, use <code>sns.countplot(x='Category')</code> instead."),
        "import seaborn as sns\nimport matplotlib.pyplot as plt\n\nprint(\"Common Plots for EDA (Exploratory Data Analysis):\\n\")\n\nprint(\"1. HISTOGRAM (Spread of a single variable)\")\nprint(\"sns.histplot(data=df, x='Age', bins=20, kde=True)\")\n\nprint(\"\\n2. BAR PLOT (Average continuous per category)\")\nprint(\"sns.barplot(data=df, x='Department', y='Salary')\")\n\nprint(\"\\n3. COUNT PLOT (Number of rows per category)\")\nprint(\"sns.countplot(data=df, x='Department')\")\n\nprint(\"\\n4. BOX PLOT (Outliers and Quartiles)\")\nprint(\"sns.boxplot(data=df, x='Department', y='Salary')\")\n",
        "Plot Types",
        [
            '### **Q1.** Using the `tips` dataset, create a histogram of `"total_bill"` using `sns.histplot()`.\n',
            '### **Q2.** Add the argument `kde=True` to the histogram to overlay a smooth density curve.\n',
            '### **Q3.** Create a Bar plot showing the average tip per day: `x="day"`, `y="tip"`. Use `sns.barplot()`.\n',
            '### **Q4.** Create a Count plot to see how many transactions happened on each day: `x="day"`. Use `sns.countplot()`.\n',
            '### **Q5.** Create a Box plot of `total_bill` per `day` to spot outliers. `sns.boxplot()`.\n',
        ]
    ))
    
    S.append((
        SH(3,"The Hue Parameter","Adding Dimensions") + '\n\n' +
        WH("The most powerful feature in Seaborn is the <b><code>hue</code></b> parameter. It automatically groups your data by a categorical column and colors the plot elements accordingly. It turns a simple 2D plot into a 3D or 4D visualization with zero extra code.") + '\n\n' +
        "```python\n# Instantly color-code the scatterplot by Gender\nsns.scatterplot(data=df, x='Age', y='Salary', hue='Gender')\n```\n\n" +
        WC([("Deep Insights","A scatterplot might show a positive correlation. Adding `hue='Region'` might reveal that the correlation only exists in Europe!"),
            ("Segmentation","Overlaying two histograms (e.g., Male vs Female heights) using `hue` to see where the distributions overlap")]) + '\n\n' +
        PT("Combine <code>hue</code> with <code>col</code> in <code>sns.relplot()</code> or <code>sns.catplot()</code> to automatically generate a grid of multiple subplots based on categorical variables (Facet Grids)!"),
        "import seaborn as sns\nimport matplotlib.pyplot as plt\n\nprint(\"The Power of HUE:\\n\")\n\nprint(\"Without Hue: All dots are blue.\")\nprint(\"sns.scatterplot(data=tips, x='total_bill', y='tip')\\n\")\n\nprint(\"With Hue: Dots are colored by Time (Lunch/Dinner), legend added automatically!\")\nprint(\"sns.scatterplot(data=tips, x='total_bill', y='tip', hue='time')\\n\")\n\nprint(\"Hue works on almost all Seaborn plots!\")\nprint(\"sns.histplot(data=tips, x='total_bill', hue='sex', multiple='stack')\")\nprint(\"sns.barplot(data=tips, x='day', y='tip', hue='smoker')\")\n",
        "Hue & Colors",
        [
            '### **Q1.** Create a scatterplot of `total_bill` vs `tip`. Add `hue="smoker"` to color the dots.\n',
            '### **Q2.** Create a Box plot of `total_bill` grouped by `day`. Add `hue="sex"` to split each box into two.\n',
            '### **Q3.** Create a Histogram of `total_bill`. Add `hue="time"` and `multiple="stack"` to create a stacked histogram.\n',
            '### **Q4.** Try adding `style="time"` along with `hue="smoker"` in a scatterplot. Observe how the dot shapes change.\n',
            '### **Q5.** Change the color palette by passing `palette="husl"` to any of the plots above.\n',
        ]
    ))

    TASKS = [
        ("The Matrix", "Load `tips`. Use `tips.corr(numeric_only=True)` to generate a correlation matrix. Pass this matrix into `sns.heatmap(matrix, annot=True, cmap='coolwarm')`. This is the most important plot in Machine Learning!"),
        ("Pairplot", "Run `sns.pairplot(tips, hue='sex')`. Warning: this takes a few seconds. It generates a scatterplot for EVERY combination of numeric variables automatically!"),
        ("Time Series Plot", "Create a fake Time Series DF with a `Date` column and `Sales`. Use `sns.lineplot(data=df, x='Date', y='Sales')`. Lineplots are best for chronological data."),
        ("Customizing Axes", "Create a barplot. Before `plt.show()`, use `plt.xticks(rotation=45)` to rotate the X-axis labels so they don't overlap. Use `plt.ylim(0, 100)` to set the Y-axis limits."),
        ("Facet Grids", "Use `sns.catplot(data=tips, x='time', y='total_bill', col='day', kind='box')`. Observe how it creates 4 separate plots (one for each day) side-by-side automatically."),
    ]
    
    INTERVIEWS = [
        "What is the relationship between Seaborn and Matplotlib?",
        "Explain the difference between a Bar Plot and a Histogram.",
        "What do the 'whiskers' and 'dots' represent in a Box Plot? (Hint: IQR and outliers).",
        "Why is `sns.countplot()` often preferred over `.groupby().size().plot.bar()`?",
        "Explain the `hue` parameter in Seaborn. Why is it so powerful for EDA?",
        "What is a KDE (Kernel Density Estimate) curve?",
        "How do you resize a Seaborn plot? (Hint: `plt.figure(figsize=(10, 6))`).",
        "Write code to generate a Correlation Heatmap using Pandas and Seaborn.",
        "What is the difference between `sns.scatterplot()` and `sns.relplot()`?",
        "Explain what `sns.pairplot()` does. Why should you be careful using it on datasets with 100+ columns?",
        "How do you save a Seaborn plot to a `.png` file instead of displaying it? (`plt.savefig()`).",
        "What does the `ci=None` or `errorbar=None` parameter do in a Seaborn bar plot?",
        "How do you overlay two different plots (e.g., a lineplot on top of a barplot) in the same figure?",
        "Explain how to use `plt.subplots()` to create a 2x2 grid of distinct charts.",
        "What is a Violin plot (`sns.violinplot`)? How does it differ from a Box plot?",
        "How do you change the default color palette globally in Seaborn? (`sns.set_palette()`).",
        "Write code to plot a regression line through a scatterplot automatically. (`sns.regplot()` or `lmplot`).",
        "Why is it dangerous to rely solely on aggregate plots (like bar charts) without looking at distributions (like swarm plots)? (Hint: Anscombe's quartet).",
        "How do you rotate X-axis labels in Matplotlib if they are overlapping?",
        "Explain how to annotate a specific point on a plot with text. (`plt.annotate()`).",
        "What is a Swarm plot (`sns.swarmplot`)? When does it fail? (Hint: huge datasets).",
        "How do you set a logarithmic scale for the Y-axis? (`plt.yscale('log')`).",
        "What is the purpose of `sns.set_theme()`? What styles does it offer?",
        "Write code to create a dual-axis chart (two different Y-axes) using Matplotlib `twinx()`.",
        "Explain the tradeoff between beautiful visualizations and data processing speed in a production pipeline.",
    ]

    nb = build(
        day=29, title="Data Vis: Seaborn",
        obj_text="Data is useless if stakeholders can't understand it. Seaborn translates complex Pandas aggregations into stunning, publication-ready visualizations. Today we master Histograms, Box plots, and the magical `hue` parameter to uncover hidden dimensions in our data.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Basic | Scatter & Line plots |\n| 2 | Dist | Histograms & Boxplots |\n| 3 | Hue | Multi-dimensional color |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | EDA | Always visualize distributions before building ML models. |\n| 2 | Boxplot | Instantly identifies outliers outside the Interquartile Range (IQR). |\n| 3 | Hue | Groups and colors data by a category automatically. |\n",
        checklist="- [ ] I can create a scatterplot and lineplot.\n- [ ] I can view data distributions using a histogram.\n- [ ] I can use the `hue` parameter to split data.",
        next_up="Day 30 - Phase 2 Capstone: The EDA Project"
    )
    save(nb, os.path.join('notebooks', 'Day29_Data_Seaborn_Blank.ipynb'))

def build_day30():
    S = []
    
    S.append((
        SH(1,"Phase 2 Capstone","Exploratory Data Analysis") + '\n\n' +
        WH("You have mastered Pandas and Seaborn. You can clean missing data, merge tables, group statistics, and visualize trends. <b>Today is the Phase 2 Capstone.</b> You will perform a complete Exploratory Data Analysis (EDA) pipeline on a raw, messy dataset.") + '\n\n' +
        "### 🎯 The Mission: Customer Churn Analysis\n\n" +
        "You will simulate loading a messy Customer CSV and a Transaction CSV. You will merge them, clean the data, calculate Customer Lifetime Value (CLV), and visualize which demographics are churning." + '\n\n' +
        WC([("Portfolio Piece","A complete end-to-end Jupyter Notebook analyzing data is the standard requirement for Data Analyst job interviews"),
            ("Real-world simulation","Data is never in one table, and it is never clean")]) + '\n\n' +
        PF("Jumping to Code","Don't start writing `pd.read_csv()` blindly. Write a markdown cell outlining your 5-step plan: 1. Load, 2. Clean, 3. Merge, 4. Feature Engineering, 5. Visualization."),
        "# Outline of the EDA Pipeline:\n\n# 1. Ingestion\n# customers = pd.read_csv('...')\n# txns = pd.read_csv('...')\n\n# 2. Cleaning\n# customers.dropna(subset=['ID'], inplace=True)\n# txns['Amount'] = pd.to_numeric(txns['Amount'], errors='coerce')\n\n# 3. Merging\n# df = pd.merge(customers, txns, on='ID', how='left')\n\n# 4. Aggregation\n# summary = df.groupby('Region')['Amount'].sum()\n\n# 5. Visualization\n# sns.barplot(data=summary.reset_index(), x='Region', y='Amount')\n# plt.show()\n\nprint(\"Ready for the final challenge?\")\n",
        "Capstone",
        [
            '### **Q1.** Plan the Cleaning Phase. What 3 Pandas methods will you use to handle missing data and wrong types?\n',
            '### **Q2.** Plan the Merge Phase. Why would you use a `LEFT JOIN` (Customers -> Txns) instead of an `INNER JOIN`?\n',
            '### **Q3.** Plan the Feature Engineering Phase. How will you calculate `Total_Spent` per user? (Hint: `groupby().transform("sum")`).\n',
            '### **Q4.** Plan the Vis Phase. What Seaborn plot is best to show the distribution of `Age`? What about `Total_Spent` by `Gender`?\n',
            '### **Q5.** Set up your notebook: Import `pandas as pd`, `numpy as np`, `seaborn as sns`, and `matplotlib.pyplot as plt`.\n',
        ]
    ))
    
    S.append((
        SH(2,"Data Generation","Creating the Simulation") + '\n\n' +
        WH("Since we don't have external CSV files, we will generate synthetic data using NumPy and Pandas. Generating fake data is an excellent skill for testing pipelines.") + '\n\n' +
        "We need two tables:\n1. **`customers`**: `ID`, `Age` (with some NaNs), `Region`, `Churned` (Boolean).\n2. **`transactions`**: `Txn_ID`, `Cust_ID`, `Amount` (with some '$' strings), `Date`.\n\n" +
        WC([("Testing Logic","If your code works on this synthetic data, it will work on the real data database extract.")]),
        "import pandas as pd\nimport numpy as np\n\n# Generate 100 Customers\ncust_df = pd.DataFrame({\n    'ID': range(1, 101),\n    'Age': np.random.randint(18, 70, 100).astype(float),\n    'Region': np.random.choice(['North', 'South', 'East', 'West'], 100),\n    'Churned': np.random.choice([0, 1], 100, p=[0.8, 0.2])\n})\n# Inject missing ages\ncust_df.loc[np.random.choice(100, 10), 'Age'] = np.nan\n\nprint(\"Customers:\\n\", cust_df.head(3))\n",
        "Simulation",
        [
            '### **Q1.** Execute the customer generation code above. Run `cust_df.info()` to see the missing values.\n',
            '### **Q2.** Generate a `txn_df` with 500 rows. `Txn_ID` (1 to 500), `Cust_ID` (random 1 to 100).\n',
            '### **Q3.** Add an `Amount` column to `txn_df`. Make 90% of them floats, and 10% of them messy strings like `\"$50\"`.\n',
            '### **Q4.** Add a `Date` column using `pd.date_range()` and `np.random.choice()`.\n',
            '### **Q5.** Verify both DataFrames exist and inspect their heads.\n',
        ]
    ))
    
    S.append((
        SH(3,"Execution & Reporting","The Final Deliverable") + '\n\n' +
        WH("Execute the pipeline. Clean the tables, merge them, and answer the core business question: <b>What factors drive Customer Churn?</b>") + '\n\n' +
        "You must produce at least 3 visualizations:\n1. A Correlation Heatmap of numeric features.\n2. A Barplot comparing Total Revenue by Region.\n3. A Boxplot comparing Age distribution between Churned and Retained users.\n",
        "# Example Heatmap code\n# corr = final_df.corr(numeric_only=True)\n# sns.heatmap(corr, annot=True, cmap='RdBu', vmin=-1, vmax=1)\n# plt.title('Correlation Matrix')\n# plt.show()\n\nprint(\"The stage is yours. Build the pipeline.\")\n",
        "Execution",
        [
            '### **Q1.** Clean `Amount` in `txn_df` (remove `$` and cast to float). Clean `Age` in `cust_df` (fill NaN with median).\n',
            '### **Q2.** Merge `cust_df` and `txn_df` on ID using a LEFT JOIN.\n',
            '### **Q3.** Create the Correlation Heatmap. Is `Age` correlated with `Amount`?\n',
            '### **Q4.** Create the Barplot: `x="Region"`, `y="Amount"`, `estimator=sum`. Which region brings the most revenue?\n',
            '### **Q5.** Create the Boxplot: `x="Churned"`, `y="Age"`. Do older users churn more?\n',
        ]
    ))

    TASKS = [
        ("Feature Engineering", "Create a new column `Transaction_Count` for each user. (Hint: group `txn_df` by `Cust_ID`, calculate `.size()`, then merge this metric into `cust_df`)."),
        ("Time Series Vis", "Convert `Date` to a datetime object. Extract the `Month`. Group by Month and sum the `Amount`. Plot a Seaborn Lineplot of Revenue over Time."),
        ("Cohort Analysis", "Use `pd.cut()` to bin `Age` into 3 groups: 'Youth', 'Adult', 'Senior'. Create a Countplot (`sns.countplot`) with `x='Age_Group'` and `hue='Churned'` to see which demographic churns most."),
        ("Outlier Removal", "Before plotting revenue, find the 99th percentile of `Amount` using `.quantile(0.99)`. Filter out any rows where Amount is strictly greater than this value to remove massive outliers."),
        ("Executive Summary", "Create a markdown cell at the very bottom of your notebook. Write 3 bullet points summarizing your findings (e.g., 'Seniors in the South region have the highest churn rate'). This is what executives actually read."),
    ]
    
    INTERVIEWS = [
        "Walk me through your EDA process when you receive a brand new, undocumented dataset.",
        "How do you decide whether to drop a column with 20% missing data, vs imputing the values?",
        "Explain the difference between a Left Join and an Inner Join, and why you used one over the other in this project.",
        "What does a Correlation coefficient of -0.85 tell you? How did you visualize this?",
        "When grouping by Customer, what is the difference between summing their transactions vs counting their transactions?",
        "Why is it important to check for duplicates before aggregating revenue?",
        "What plot would you use to show the distribution of a single continuous variable (like Salary)?",
        "What plot is best to compare the median and outliers of Salary across 5 different departments?",
        "Explain what 'Data Leakage' is in the context of predictive modeling.",
        "How do you handle a highly imbalanced dataset? (e.g., 99% retained, 1% churned).",
        "What does `pd.to_datetime(errors='coerce')` do, and why is it safer than default parsing?",
        "Write code to find the top 5 most valuable customers based on Total Spend.",
        "How would you optimize this pipeline if the Transactions file was 50GB and couldn't fit in RAM? (Hint: chunking or Dask/PySpark).",
        "Explain the 'Split-Apply-Combine' strategy you used to calculate Regional revenue.",
        "What is the difference between `.agg(['mean', 'sum'])` and `.transform('mean')`?",
        "How do you rename columns dynamically after a GroupBy operation flattens the index?",
        "Why is Seaborn built on top of Matplotlib rather than replacing it?",
        "Explain the `hue` parameter in Seaborn. How did it help your Churn analysis?",
        "If you noticed a massive spike in revenue on one specific day in your Lineplot, how would you investigate it using Pandas?",
        "What are some common pitfalls when using Pie Charts, and why do Data Scientists prefer Bar charts?",
        "How would you save your final cleaned DataFrame to a CSV file without the index?",
        "Explain how you would connect this Pandas script directly to a SQL database instead of reading CSVs.",
        "What is feature engineering? Give an example of a feature you engineered in this project.",
        "How do you present technical findings to a non-technical stakeholder?",
        "Congratulations on completing the 30 Days of Python and Data Analytics. What was the hardest concept for you to grasp, and how did you overcome it?",
    ]

    nb = build(
        day=30, title="Phase Analysis",
        obj_text="Congratulations. You have reached Day 30. Today is the ultimate test of your Data Analytics skills. You will ingest messy data, clean it, merge it, aggregate it, and visualize the story it tells. This is exactly what professional Data Analysts do every day.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Ingestion | Loading & Merging |\n| 2 | Cleaning | NaNs, Types, & Outliers |\n| 3 | Insight | Aggregation & Vis |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Process | EDA is iterative. Clean, plot, discover an error, clean again. |\n| 2 | Code | Chain operations logically. Don't mutate state wildly. |\n| 3 | Value | The code doesn't matter. The business insight you derive is what matters. |\n",
        checklist="- [ ] I can clean and merge raw datasets.\n- [ ] I can perform Exploratory Data Analysis.\n- [ ] I can visualize and communicate business insights.",
        next_up="Graduation! 🎉 You are now a competent Python Data Analyst."
    )
    save(nb, os.path.join('notebooks', 'Day30_Phase_Analysis_Blank.ipynb'))

if __name__ == '__main__':
    build_day28()
    build_day29()
    build_day30()
    print("Days 28, 29, 30 generated successfully!")
