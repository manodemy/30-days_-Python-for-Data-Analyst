// Python Course Content — Day 28 (Scikit-Learn Introduction: Preprocessing & Regression)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay28'] = {
  "day": 28,
  "title": "Scikit-Learn Preprocessing",
  "topics": [
    "Machine Learning vs Traditional Analytics",
    "Dataset Splitting (train_test_split)",
    "Feature Scaling (Standard vs MinMax)",
    "Categorical Feature Encoding",
    "Scikit-Learn Pipelines & ColumnTransformers",
    "Linear Regression Mathematics & Implementation",
    "Regularized Regression: Ridge (L2) & Lasso (L1)",
    "Regression Evaluation Metrics (MAE, MSE, RMSE, R²)",
    "Common Anti-Patterns in Applied ML",
    "FAANG Applied Machine Learning Interview Questions"
  ],
  "slides": [
    {
      "title": "Scikit-Learn Introduction: Preprocessing & Regression",
      "html": "\n        <!-- Section 01: ML vs Analytics -->\n        <div class=\"slide-section\" id=\"day28Section01\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">01</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🤖</span> 01. Machine Learning vs Traditional Analytics (The Paradigm Shift)</span>\n            </div>\n          </div>\n          <p>Traditional software engineering and data analytics take <strong>Rules</strong> (business logic, SQL queries) and <strong>Data</strong> as inputs to calculate <strong>Answers</strong>. Machine Learning inverts this relationship: the algorithm takes <strong>Data</strong> and historical <strong>Answers</strong> to automatically discover the underlying mathematical <strong>Rules</strong> (model parameters $W$ and $b$).</p>\n\n          <div class=\"db-mock-table-wrap\">\n            <div class=\"table-search-box\">\n              <input type=\"text\" class=\"table-search-input\" placeholder=\"Search paradigm comparison...\" onkeyup=\"filterTable(this)\">\n            </div>\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Paradigm</th>\n                  <th>Inputs Provided</th>\n                  <th>System Engine</th>\n                  <th>Outputs Generated</th>\n                  <th>Enterprise Scenario</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><code>Traditional SQL / BI</code></td>\n                  <td>Data + Explicit SQL Rules</td>\n                  <td>Relational Database Engine</td>\n                  <td>Aggregated Reports</td>\n                  <td>\"How much total revenue did South Region generate last quarter?\"</td>\n                </tr>\n                <tr>\n                  <td><code>Supervised ML (Regression)</code></td>\n                  <td>Features ($X$) + Target ($y$)</td>\n                  <td>Optimization / Gradient Descent</td>\n                  <td>Predictive Weights ($W$)</td>\n                  <td>\"Predict the expected lifetime spend of customer #1042 over the next 12 months.\"</td>\n                </tr>\n                <tr>\n                  <td><code>Supervised ML (Classification)</code></td>\n                  <td>Features ($X$) + Class Labels ($y$)</td>\n                  <td>Decision Boundary Solver</td>\n                  <td>Class Probabilities ($P(y|X)$)</td>\n                  <td>\"Classify whether a transaction is Fraudulent (1) or Legitimate (0).\"</td>\n                </tr>\n                <tr>\n                  <td><code>Unsupervised Learning</code></td>\n                  <td>Feature Matrix ($X$) only</td>\n                  <td>Distance / Density Clustering</td>\n                  <td>Cluster Segments</td>\n                  <td>\"Group 500,000 retail buyers into 5 natural persona clusters without human labels.\"</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 02: Dataset Splitting -->\n        <div class=\"slide-section\" id=\"day28Section02\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">02</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">✂️</span> 02. Dataset Splitting &amp; Preventing Test Snooping (train_test_split)</span>\n            </div>\n          </div>\n          <p>An algorithm evaluated on the exact data it learned from will report deceptively high performance (overfitting). To establish true generalization capability, we partition datasets into training ($70\\% - 80\\%$) and unseen test evaluation splits ($20\\% - 30\\%$).</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">split_workflow.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">from</span> sklearn.model_selection <span class=\"py-kw\">import</span> train_test_split\n<span class=\"py-kw\">import</span> numpy <span class=\"py-kw\">as</span> np\n\nX = np.array([[25, 50000], [35, 75000], [45, 120000], [20, 30000], [50, 140000], [28, 62000]])\ny = np.array([1800, 3200, 5100, 1100, 6200, 2400])\n\n<span class=\"py-comment\"># Enforce deterministic splitting with random_state=42</span>\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.33, random_state=42\n)\nprint(f\"X_train shape: {X_train.shape}, X_test shape: {X_test.shape}\")</code></pre>\n            </div>\n          </div>\n\n          <div class=\"py-keynotes-card\">\n            <h4>💡 Senior Architect Rule: The Golden Law of Data Splitting</h4>\n            <ul class=\"py-keynotes-list\">\n              <li><strong>Split BEFORE any transformations:</strong> Never compute mean, median, scaling factors, or encodings before calling <code>train_test_split</code>. Doing so leaks information from the test set into the model.</li>\n              <li><strong>Always set <code>random_state</code>:</strong> In production ML pipelines and reproducible research, always pin the pseudorandom seed.</li>\n            </ul>\n          </div>\n        </div>\n\n        <!-- Section 03: Feature Scaling -->\n        <div class=\"slide-section\" id=\"day28Section03\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">03</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">⚖️</span> 03. Feature Scaling &amp; Normalization (StandardScaler vs MinMaxScaler)</span>\n            </div>\n          </div>\n          <p>Distance-based algorithms and gradient-descent optimizers are vulnerable to feature magnitude discrepancies. If <code>Age</code> ranges from 20 to 65 while <code>Annual Income</code> ranges from 20,000 to 2,000,000, the model's loss landscape will stretch, prioritizing income while completely ignoring age.</p>\n\n          <div class=\"db-mock-table-wrap\">\n            <div class=\"table-search-box\">\n              <input type=\"text\" class=\"table-search-input\" placeholder=\"Search scaling methods...\" onkeyup=\"filterTable(this)\">\n            </div>\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Scaler</th>\n                  <th>Mathematical Formula</th>\n                  <th>Resulting Range</th>\n                  <th>Outlier Sensitivity</th>\n                  <th>Recommended Use Case</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><code>StandardScaler</code> (Z-Score)</td>\n                  <td><code>z = (x - μ) / σ</code></td>\n                  <td>$mu = 0, sigma = 1$</td>\n                  <td>Moderate</td>\n                  <td>Linear Regression, Logistic Regression, PCA, Neural Networks</td>\n                </tr>\n                <tr>\n                  <td><code>MinMaxScaler</code></td>\n                  <td><code>x_norm = (x - min) / (max - min)</code></td>\n                  <td>Strictly $[0, 1]$</td>\n                  <td>High (extreme outliers compress in-range values)</td>\n                  <td>Image pixel normalization, algorithms bounded to non-negative ranges</td>\n                </tr>\n                <tr>\n                  <td><code>RobustScaler</code></td>\n                  <td><code>x_rob = (x - Q2) / (Q3 - Q1)</code></td>\n                  <td>IQR Centered</td>\n                  <td>Zero (resilient to heavy outliers)</td>\n                  <td>Datasets with extreme anomalous fraud or market flash spikes</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 04: Categorical Feature Encoding -->\n        <div class=\"slide-section\" id=\"day28Section04\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">04</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🔤</span> 04. Categorical Feature Encoding (OneHotEncoder vs OrdinalEncoder)</span>\n            </div>\n          </div>\n          <p>Scikit-Learn estimators require purely numerical matrix inputs. Categorical text features must be converted into numerical representations without introducing artificial ordinal relationships.</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">encoding_guide.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">from</span> sklearn.preprocessing <span class=\"py-kw\">import</span> OneHotEncoder\n<span class=\"py-kw\">import</span> numpy <span class=\"py-kw\">as</span> np\n\ncities = np.array([['Mumbai'], ['Bengaluru'], ['Delhi'], ['Mumbai']])\nencoder = OneHotEncoder(sparse_output=False, drop='first')\nencoded_cities = encoder.fit_transform(cities)\nprint(f\"Features: {encoder.get_feature_names_out()}\")\nprint(encoded_cities)</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- Section 05: Pipelines & ColumnTransformers -->\n        <div class=\"slide-section\" id=\"day28Section05\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">05</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🏗️</span> 05. Scikit-Learn Pipelines &amp; ColumnTransformers</span>\n            </div>\n          </div>\n          <p>In production, real tabular data contains a mixture of numerical and categorical columns. A <code>ColumnTransformer</code> applies targeted preprocessing per column type, and a <code>Pipeline</code> chains transformations directly to an estimator.</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">production_pipeline.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">from</span> sklearn.compose <span class=\"py-kw\">import</span> ColumnTransformer\n<span class=\"py-kw\">from</span> sklearn.pipeline <span class=\"py-kw\">import</span> Pipeline\n<span class=\"py-kw\">from</span> sklearn.preprocessing <span class=\"py-kw\">import</span> StandardScaler, OneHotEncoder\n<span class=\"py-kw\">from</span> sklearn.linear_model <span class=\"py-kw\">import</span> LinearRegression\n\npreprocessor = ColumnTransformer(\n    transformers=[\n        ('num', StandardScaler(), ['age', 'tenure_months']),\n        ('cat', OneHotEncoder(handle_unknown='ignore'), ['contract_type', 'payment_method'])\n    ]\n)\n\npipeline = Pipeline(steps=[\n    ('preprocessor', preprocessor),\n    ('regressor', LinearRegression())\n])</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- Section 06: Linear Regression -->\n        <div class=\"slide-section\" id=\"day28Section06\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">06</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">📈</span> 06. Linear Regression Mathematics &amp; Implementation</span>\n            </div>\n          </div>\n          <p>Linear Regression models the expected value of target $y$ as a linear combination of input features $X$ plus an intercept bias $w_0$:</p>\n          <div class=\"py-code-box\">\n            y_hat = w_0 + w_1 * x_1 + w_2 * x_2 + ... + w_p * x_p\n          </div>\n          <p>The Ordinary Least Squares (OLS) objective minimizes the Residual Sum of Squares (RSS): $\\min_w \\sum (y_i - \\hat{y}_i)^2$.</p>\n        </div>\n\n        <!-- Section 07: Regularized Regression -->\n        <div class=\"slide-section\" id=\"day28Section07\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">07</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🛡️</span> 07. Regularized Regression: Ridge (L2) &amp; Lasso (L1)</span>\n            </div>\n          </div>\n          <p>When features are correlated (multicollinearity) or numerous, standard OLS estimates exhibit massive variance and overfit. Regularization penalizes large weight coefficients.</p>\n\n          <div class=\"db-mock-table-wrap\">\n            <div class=\"table-search-box\">\n              <input type=\"text\" class=\"table-search-input\" placeholder=\"Search regularization...\" onkeyup=\"filterTable(this)\">\n            </div>\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Method</th>\n                  <th>Penalty Formula</th>\n                  <th>Weight Behavior</th>\n                  <th>Feature Selection?</th>\n                  <th>Ideal Scenario</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><code>OLS (LinearRegression)</code></td>\n                  <td>None</td>\n                  <td>Unbounded</td>\n                  <td>❌ No</td>\n                  <td>Few features, no multicollinearity</td>\n                </tr>\n                <tr>\n                  <td><code>Ridge (L2)</code></td>\n                  <td><code>α * Σ(w_j²)</code></td>\n                  <td>Shrinks weights toward zero smoothly</td>\n                  <td>❌ No (keeps all features)</td>\n                  <td>Many collinear predictors</td>\n                </tr>\n                <tr>\n                  <td><code>Lasso (L1)</code></td>\n                  <td><code>α * Σ|w_j|</code></td>\n                  <td>Drives irrelevant weights to exactly zero</td>\n                  <td>✅ Yes (sparse coefficients)</td>\n                  <td>Sparse models, automatic feature selection</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 08: Evaluation Metrics -->\n        <div class=\"slide-section\" id=\"day28Section08\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">08</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🎯</span> 08. Regression Evaluation Metrics (MAE, MSE, RMSE, R²)</span>\n            </div>\n          </div>\n          <p>Choosing the correct metric depends on whether your business domain penalizes extreme error outliers heavily or uniformly.</p>\n\n          <div class=\"db-mock-table-wrap\">\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Metric</th>\n                  <th>Mathematical Definition</th>\n                  <th>Units</th>\n                  <th>Outlier Sensitivity</th>\n                  <th>Interpretation</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><strong>MAE</strong> (Mean Absolute Error)</td>\n                  <td><code>mean(|y - y_hat|)</code></td>\n                  <td>Same as target $y$</td>\n                  <td>Linear (uniform penalty)</td>\n                  <td>Average magnitude of prediction error</td>\n                </tr>\n                <tr>\n                  <td><strong>MSE</strong> (Mean Squared Error)</td>\n                  <td><code>mean((y - y_hat)²)</code></td>\n                  <td>Squared units ($y^2$)</td>\n                  <td>Quadratic (heavily punishes large errors)</td>\n                  <td>Standard loss function optimized by OLS</td>\n                </tr>\n                <tr>\n                  <td><strong>RMSE</strong> (Root Mean Squared Error)</td>\n                  <td><code>sqrt(MSE)</code></td>\n                  <td>Same as target $y$</td>\n                  <td>High</td>\n                  <td>Standard deviation of prediction residuals</td>\n                </tr>\n                <tr>\n                  <td><strong>R² Score</strong> (Coefficient of Determination)</td>\n                  <td><code>1 - (SS_res / SS_tot)</code></td>\n                  <td>Dimensionless ($le 1.0$)</td>\n                  <td>High</td>\n                  <td>Percentage of target variance explained by features</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 09: Anti-Patterns -->\n        <div class=\"slide-section\" id=\"day28Section09\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">09</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">⚠️</span> 09. Master Machine Learning Preprocessing Anti-Patterns</span>\n            </div>\n          </div>\n\n          <div class=\"db-mock-table-wrap\">\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Anti-Pattern</th>\n                  <th>Flawed Implementation</th>\n                  <th>Real-World Failure Mode</th>\n                  <th>Production Auto-Fix</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td>Data Leakage via Scaler</td>\n                  <td><code>scaler.fit(X)</code> on entire dataset before split</td>\n                  <td>Artificially inflated test scores that crash in production</td>\n                  <td>Call <code>fit(X_train)</code> and then <code>transform(X_test)</code></td>\n                </tr>\n                <tr>\n                  <td>Evaluating on Train Split</td>\n                  <td><code>r2_score(y_train, y_train_pred)</code> as final KPI</td>\n                  <td>Disguises severe overfitting; model memorized training set</td>\n                  <td>Always report evaluation metrics on held-out <code>y_test</code></td>\n                </tr>\n                <tr>\n                  <td>Dummy Variable Trap</td>\n                  <td><code>pd.get_dummies(df)</code> without <code>drop_first=True</code></td>\n                  <td>Perfect collinearity creates singular matrix in OLS</td>\n                  <td>Drop reference category or use regularized regression</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 10: FAANG Interview Questions -->\n        <div class=\"slide-section\" id=\"day28Section10\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">10</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">💼</span> 10. 25 FAANG Applied Machine Learning Interview Questions</span>\n            </div>\n          </div>\n          <div class=\"py-keynotes-card\">\n            <h4>💡 High-Stakes ML Interview Prep:</h4>\n            <ul class=\"py-keynotes-list\">\n              <li><strong>What is the Bias-Variance tradeoff?</strong> High bias = underfitting (oversimplified model). High variance = overfitting (captures noise). Ridge and Lasso balance this by increasing slight bias to drastically reduce variance.</li>\n              <li><strong>Why do we standardize features before Ridge or Lasso?</strong> Regularization penalties treat all coefficients with equal weight. If one feature is on a larger scale, its coefficient will naturally be tiny and escape penalization!</li>\n              <li><strong>What does a negative R² score mean?</strong> A negative $R^2$ indicates the model performs worse than simply predicting the mean of the target $\\bar{y}$ for all observations.</li>\n            </ul>\n          </div>\n        </div>\n      "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "splitting",
      "title": "Dataset Splitting with train_test_split",
      "desc": "Split input features X and target y into training (75%) and testing (25%) sets with random_state=42.",
      "prompt": "<strong>[Easy] Dataset Splitting with train_test_split</strong><p>Given feature matrix <code>X</code> and target <code>y</code>, split them using <code>train_test_split</code> with <code>test_size=0.25</code> and <code>random_state=42</code>. Store the results in <code>X_train</code>, <code>X_test</code>, <code>y_train</code>, and <code>y_test</code>.</p>",
      "starterCode": "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.array([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16]])\ny = np.array([10, 20, 30, 40, 50, 60, 70, 80])\n\n# Split into X_train, X_test, y_train, y_test\nX_train, X_test, y_train, y_test = None, None, None, None\n",
      "ref": "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.array([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16]])\ny = np.array([10, 20, 30, 40, 50, 60, 70, 80])\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)\nprint(f'{X_train.shape=}, {X_test.shape=}')\n",
      "solution": "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.array([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12], [13, 14], [15, 16]])\ny = np.array([10, 20, 30, 40, 50, 60, 70, 80])\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)\nprint(f'{X_train.shape=}, {X_test.shape=}')\n",
      "target": "X_train.shape=(6, 2), X_test.shape=(2, 2)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "X_train",
            "type": "array"
          },
          {
            "name": "X_test",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "scaling",
      "title": "StandardScaler Feature Standardization",
      "desc": "Fit a StandardScaler on X_train and transform both X_train and X_test.",
      "prompt": "<strong>[Easy] StandardScaler Feature Standardization</strong><p>Instantiate a <code>StandardScaler</code>, fit it strictly on <code>X_train</code>, and transform both <code>X_train</code> and <code>X_test</code>. Store the scaled matrices in <code>X_train_scaled</code> and <code>X_test_scaled</code>.</p>",
      "starterCode": "from sklearn.preprocessing import StandardScaler\nimport numpy as np\n\nX_train = np.array([[10.0, 100.0], [20.0, 200.0], [30.0, 300.0]])\nX_test = np.array([[15.0, 150.0]])\n\n# Standardize without data leakage\nX_train_scaled = None\nX_test_scaled = None\n",
      "ref": "from sklearn.preprocessing import StandardScaler\nimport numpy as np\n\nX_train = np.array([[10.0, 100.0], [20.0, 200.0], [30.0, 300.0]])\nX_test = np.array([[15.0, 150.0]])\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\nprint(f'{X_train_scaled=}')\n",
      "solution": "from sklearn.preprocessing import StandardScaler\nimport numpy as np\n\nX_train = np.array([[10.0, 100.0], [20.0, 200.0], [30.0, 300.0]])\nX_test = np.array([[15.0, 150.0]])\nscaler = StandardScaler()\nX_train_scaled = scaler.fit_transform(X_train)\nX_test_scaled = scaler.transform(X_test)\nprint(f'{X_train_scaled=}')\n",
      "target": "X_train_scaled=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "X_train_scaled",
            "type": "array"
          },
          {
            "name": "X_test_scaled",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "scaling",
      "title": "MinMaxScaler Normalization to [0, 1]",
      "desc": "Normalize feature vectors to range [0, 1] using MinMaxScaler.",
      "prompt": "<strong>[Easy] MinMaxScaler Normalization to [0, 1]</strong><p>Instantiate a <code>MinMaxScaler</code>, fit and transform <code>raw_data</code>, and store the normalized array in <code>norm_data</code>.</p>",
      "starterCode": "from sklearn.preprocessing import MinMaxScaler\nimport numpy as np\n\nraw_data = np.array([[100], [200], [300], [400], [500]])\nnorm_data = None\n",
      "ref": "from sklearn.preprocessing import MinMaxScaler\nimport numpy as np\n\nraw_data = np.array([[100], [200], [300], [400], [500]])\nscaler = MinMaxScaler()\nnorm_data = scaler.fit_transform(raw_data)\nprint(f'{norm_data=}')\n",
      "solution": "from sklearn.preprocessing import MinMaxScaler\nimport numpy as np\n\nraw_data = np.array([[100], [200], [300], [400], [500]])\nscaler = MinMaxScaler()\nnorm_data = scaler.fit_transform(raw_data)\nprint(f'{norm_data=}')\n",
      "target": "norm_data=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "norm_data",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "regression",
      "title": "Fitting a LinearRegression Estimator",
      "desc": "Train an Ordinary Least Squares LinearRegression model on training data and extract slope and intercept.",
      "prompt": "<strong>[Easy] Fitting a LinearRegression Estimator</strong><p>Instantiate <code>LinearRegression()</code>, fit it on <code>X</code> and <code>y</code>, then store the slope coefficient in <code>slope</code> (as float) and intercept in <code>intercept</code> (as float).</p>",
      "starterCode": "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([3, 5, 7, 9, 11])  # y = 2x + 1\n\nslope = None\nintercept = None\n",
      "ref": "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([3, 5, 7, 9, 11])\nmodel = LinearRegression()\nmodel.fit(X, y)\nslope = float(model.coef_[0])\nintercept = float(model.intercept_)\nprint(f'{slope=}, {intercept=}')\n",
      "solution": "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([3, 5, 7, 9, 11])\nmodel = LinearRegression()\nmodel.fit(X, y)\nslope = float(model.coef_[0])\nintercept = float(model.intercept_)\nprint(f'{slope=}, {intercept=}')\n",
      "target": "slope=2.0, intercept=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "slope",
            "type": "float",
            "tolerance": 0.01
          },
          {
            "name": "intercept",
            "type": "float",
            "tolerance": 0.01
          }
        ]
      }
    },
    {
      "id": 5,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Computing MAE and RMSE Metrics",
      "desc": "Calculate Mean Absolute Error and Root Mean Squared Error between true and predicted targets.",
      "prompt": "<strong>[Medium] Computing MAE and RMSE Metrics</strong><p>Compute the Mean Absolute Error in <code>mae</code> and Root Mean Squared Error in <code>rmse</code> between <code>y_true</code> and <code>y_pred</code> using <code>mean_absolute_error</code> and <code>mean_squared_error</code>.</p>",
      "starterCode": "from sklearn.metrics import mean_absolute_error, mean_squared_error\nimport numpy as np\n\ny_true = np.array([10.0, 20.0, 30.0, 40.0])\ny_pred = np.array([12.0, 18.0, 33.0, 37.0])\n\nmae = None\nrmse = None\n",
      "ref": "from sklearn.metrics import mean_absolute_error, mean_squared_error\nimport numpy as np\n\ny_true = np.array([10.0, 20.0, 30.0, 40.0])\ny_pred = np.array([12.0, 18.0, 33.0, 37.0])\nmae = float(mean_absolute_error(y_true, y_pred))\nrmse = float(np.sqrt(mean_squared_error(y_true, y_pred)))\nprint(f'{mae=}, {rmse=}')\n",
      "solution": "from sklearn.metrics import mean_absolute_error, mean_squared_error\nimport numpy as np\n\ny_true = np.array([10.0, 20.0, 30.0, 40.0])\ny_pred = np.array([12.0, 18.0, 33.0, 37.0])\nmae = float(mean_absolute_error(y_true, y_pred))\nrmse = float(np.sqrt(mean_squared_error(y_true, y_pred)))\nprint(f'{mae=}, {rmse=}')\n",
      "target": "mae=2.5, rmse=2.598\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "mae",
            "type": "float",
            "tolerance": 0.05
          },
          {
            "name": "rmse",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 6,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "R² Coefficient of Determination",
      "desc": "Calculate the R² score of regression predictions against true targets.",
      "prompt": "<strong>[Medium] R² Coefficient of Determination</strong><p>Calculate the $R^2$ score using <code>r2_score(y_true, y_pred)</code> and store it as a float in <code>r2</code>.</p>",
      "starterCode": "from sklearn.metrics import r2_score\nimport numpy as np\n\ny_true = np.array([100.0, 200.0, 300.0, 400.0, 500.0])\ny_pred = np.array([110.0, 195.0, 305.0, 390.0, 510.0])\n\nr2 = None\n",
      "ref": "from sklearn.metrics import r2_score\nimport numpy as np\n\ny_true = np.array([100.0, 200.0, 300.0, 400.0, 500.0])\ny_pred = np.array([110.0, 195.0, 305.0, 390.0, 510.0])\nr2 = float(r2_score(y_true, y_pred))\nprint(f'{r2=}')\n",
      "solution": "from sklearn.metrics import r2_score\nimport numpy as np\n\ny_true = np.array([100.0, 200.0, 300.0, 400.0, 500.0])\ny_pred = np.array([110.0, 195.0, 305.0, 390.0, 510.0])\nr2 = float(r2_score(y_true, y_pred))\nprint(f'{r2=}')\n",
      "target": "r2=0.995\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "r2",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 7,
      "difficulty": "Medium",
      "category": "encoding",
      "title": "One-Hot Encoding with handle_unknown='ignore'",
      "desc": "Encode categorical columns into one-hot binary arrays handling unobserved test categories.",
      "prompt": "<strong>[Medium] One-Hot Encoding with handle_unknown='ignore'</strong><p>Instantiate <code>OneHotEncoder(sparse_output=False, handle_unknown='ignore')</code>, fit on <code>train_cats</code>, and transform <code>test_cats</code>. Store the encoded array in <code>encoded_test</code>.</p>",
      "starterCode": "from sklearn.preprocessing import OneHotEncoder\nimport numpy as np\n\ntrain_cats = np.array([['Electronics'], ['Apparel'], ['Grocery']])\ntest_cats = np.array([['Electronics'], ['Books']])  # 'Books' is unobserved in training\n\nencoded_test = None\n",
      "ref": "from sklearn.preprocessing import OneHotEncoder\nimport numpy as np\n\ntrain_cats = np.array([['Electronics'], ['Apparel'], ['Grocery']])\ntest_cats = np.array([['Electronics'], ['Books']])\nenc = OneHotEncoder(sparse_output=False, handle_unknown='ignore')\nenc.fit(train_cats)\nencoded_test = enc.transform(test_cats)\nprint(f'{encoded_test=}')\n",
      "solution": "from sklearn.preprocessing import OneHotEncoder\nimport numpy as np\n\ntrain_cats = np.array([['Electronics'], ['Apparel'], ['Grocery']])\ntest_cats = np.array([['Electronics'], ['Books']])\nenc = OneHotEncoder(sparse_output=False, handle_unknown='ignore')\nenc.fit(train_cats)\nencoded_test = enc.transform(test_cats)\nprint(f'{encoded_test=}')\n",
      "target": "encoded_test=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "encoded_test",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 8,
      "difficulty": "Medium",
      "category": "regularization",
      "title": "Ridge Regression with L2 Regularization",
      "desc": "Train a Ridge regressor with alpha=10.0 to shrink coefficients under multicollinearity.",
      "prompt": "<strong>[Medium] Ridge Regression with L2 Regularization</strong><p>Train a <code>Ridge(alpha=10.0)</code> model on <code>X</code> and <code>y</code>. Store the fitted coefficients in <code>ridge_coefs</code> (as numpy array).</p>",
      "starterCode": "from sklearn.linear_model import Ridge\nimport numpy as np\n\nX = np.array([[1, 2], [2, 4], [3, 6], [4, 8]])  # Perfectly collinear features\ny = np.array([5, 10, 15, 20])\n\nridge_coefs = None\n",
      "ref": "from sklearn.linear_model import Ridge\nimport numpy as np\n\nX = np.array([[1, 2], [2, 4], [3, 6], [4, 8]])\ny = np.array([5, 10, 15, 20])\nmodel = Ridge(alpha=10.0)\nmodel.fit(X, y)\nridge_coefs = model.coef_\nprint(f'{ridge_coefs=}')\n",
      "solution": "from sklearn.linear_model import Ridge\nimport numpy as np\n\nX = np.array([[1, 2], [2, 4], [3, 6], [4, 8]])\ny = np.array([5, 10, 15, 20])\nmodel = Ridge(alpha=10.0)\nmodel.fit(X, y)\nridge_coefs = model.coef_\nprint(f'{ridge_coefs=}')\n",
      "target": "ridge_coefs=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "ridge_coefs",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "regularization",
      "title": "Lasso Regression Feature Shrinkage to Zero",
      "desc": "Apply Lasso (L1) regularization to drive uninformative feature coefficients to exactly zero.",
      "prompt": "<strong>[Medium] Lasso Regression Feature Shrinkage to Zero</strong><p>Train a <code>Lasso(alpha=1.0)</code> on <code>X</code> and <code>y</code>. Count how many coefficients are non-zero and store the integer count in <code>non_zero_count</code>.</p>",
      "starterCode": "from sklearn.linear_model import Lasso\nimport numpy as np\n\n# Feature 1 is informative, Feature 2 is random noise\nnp.random.seed(42)\nX = np.column_stack([np.arange(10), np.random.randn(10)])\ny = 5 * X[:, 0] + 2\n\nnon_zero_count = None\n",
      "ref": "from sklearn.linear_model import Lasso\nimport numpy as np\n\nnp.random.seed(42)\nX = np.column_stack([np.arange(10), np.random.randn(10)])\ny = 5 * X[:, 0] + 2\nmodel = Lasso(alpha=1.0)\nmodel.fit(X, y)\nnon_zero_count = int(np.sum(model.coef_ != 0))\nprint(f'{non_zero_count=}')\n",
      "solution": "from sklearn.linear_model import Lasso\nimport numpy as np\n\nnp.random.seed(42)\nX = np.column_stack([np.arange(10), np.random.randn(10)])\ny = 5 * X[:, 0] + 2\nmodel = Lasso(alpha=1.0)\nmodel.fit(X, y)\nnon_zero_count = int(np.sum(model.coef_ != 0))\nprint(f'{non_zero_count=}')\n",
      "target": "non_zero_count=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "non_zero_count",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 10,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Assembling an End-to-End Scikit-Learn Pipeline",
      "desc": "Build a 2-step Pipeline containing StandardScaler and LinearRegression.",
      "prompt": "<strong>[Hard] Assembling an End-to-End Scikit-Learn Pipeline</strong><p>Construct a <code>Pipeline</code> named <code>pipe</code> with steps <code>('scaler', StandardScaler())</code> and <code>('reg', LinearRegression())</code>. Fit on <code>X</code> and <code>y</code>, and generate predictions in <code>preds</code>.</p>",
      "starterCode": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[10.0], [20.0], [30.0], [40.0], [50.0]])\ny = np.array([25.0, 45.0, 65.0, 85.0, 105.0])\n\npipe = None\npreds = None\n",
      "ref": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[10.0], [20.0], [30.0], [40.0], [50.0]])\ny = np.array([25.0, 45.0, 65.0, 85.0, 105.0])\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('reg', LinearRegression())\n])\npipe.fit(X, y)\npreds = pipe.predict(X)\nprint(f'{preds=}')\n",
      "solution": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[10.0], [20.0], [30.0], [40.0], [50.0]])\ny = np.array([25.0, 45.0, 65.0, 85.0, 105.0])\npipe = Pipeline([\n    ('scaler', StandardScaler()),\n    ('reg', LinearRegression())\n])\npipe.fit(X, y)\npreds = pipe.predict(X)\nprint(f'{preds=}')\n",
      "target": "preds=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "preds",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 11,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "ColumnTransformer with Mixed Numerical and Categorical Columns",
      "desc": "Build a ColumnTransformer that scales numerical indices and one-hot encodes categorical indices.",
      "prompt": "<strong>[Hard] ColumnTransformer with Mixed Feature Columns</strong><p>Build a <code>ColumnTransformer</code> named <code>ct</code> that applies <code>StandardScaler()</code> to column 0 and <code>OneHotEncoder()</code> to column 1. Fit and transform <code>raw_X</code>, storing the result in <code>transformed_X</code>.</p>",
      "starterCode": "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nimport numpy as np\n\nraw_X = np.array([[25, 'Single'], [45, 'Married'], [35, 'Single']], dtype=object)\n\nct = None\ntransformed_X = None\n",
      "ref": "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nimport numpy as np\n\nraw_X = np.array([[25, 'Single'], [45, 'Married'], [35, 'Single']], dtype=object)\nct = ColumnTransformer([\n    ('num', StandardScaler(), [0]),\n    ('cat', OneHotEncoder(), [1])\n])\ntransformed_X = ct.fit_transform(raw_X)\nprint(f'{transformed_X=}')\n",
      "solution": "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\nimport numpy as np\n\nraw_X = np.array([[25, 'Single'], [45, 'Married'], [35, 'Single']], dtype=object)\nct = ColumnTransformer([\n    ('num', StandardScaler(), [0]),\n    ('cat', OneHotEncoder(), [1])\n])\ntransformed_X = ct.fit_transform(raw_X)\nprint(f'{transformed_X=}')\n",
      "target": "transformed_X=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "transformed_X",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "diagnostics",
      "title": "Residual Error Vector Analysis",
      "desc": "Calculate prediction residuals (y_true - y_pred) and compute their sample standard deviation.",
      "prompt": "<strong>[Medium] Residual Error Vector Analysis</strong><p>Given <code>y_true</code> and <code>y_pred</code>, calculate residual errors <code>residuals = y_true - y_pred</code> and their standard deviation <code>res_std = float(np.std(residuals))</code>.</p>",
      "starterCode": "import numpy as np\n\ny_true = np.array([50.0, 75.0, 100.0, 125.0])\ny_pred = np.array([48.0, 78.0, 99.0, 122.0])\n\nresiduals = None\nres_std = None\n",
      "ref": "import numpy as np\n\ny_true = np.array([50.0, 75.0, 100.0, 125.0])\ny_pred = np.array([48.0, 78.0, 99.0, 122.0])\nresiduals = y_true - y_pred\nres_std = float(np.std(residuals))\nprint(f'{residuals=}, {res_std=}')\n",
      "solution": "import numpy as np\n\ny_true = np.array([50.0, 75.0, 100.0, 125.0])\ny_pred = np.array([48.0, 78.0, 99.0, 122.0])\nresiduals = y_true - y_pred\nres_std = float(np.std(residuals))\nprint(f'{residuals=}, {res_std=}')\n",
      "target": "res_std=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "residuals",
            "type": "array"
          },
          {
            "name": "res_std",
            "type": "float",
            "tolerance": 0.1
          }
        ]
      }
    },
    {
      "id": 13,
      "difficulty": "Easy",
      "category": "splitting",
      "title": "Stratified Splitting on Imbalanced Classes",
      "desc": "Split imbalanced class labels using stratify parameter to preserve class distribution.",
      "prompt": "<strong>[Easy] Stratified Splitting on Imbalanced Classes</strong><p>Split <code>X</code> and binary labels <code>y</code> using <code>train_test_split</code> with <code>stratify=y</code> and <code>test_size=0.25</code>, <code>random_state=42</code>. Verify identical class ratio in <code>y_train</code> and <code>y_test</code>.</p>",
      "starterCode": "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.arange(16).reshape(8, 2)\ny = np.array([0, 0, 0, 0, 0, 0, 1, 1])\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.25, stratify=y, random_state=42\n)\n",
      "ref": "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.arange(16).reshape(8, 2)\ny = np.array([0, 0, 0, 0, 0, 0, 1, 1])\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)\nprint(f'{np.mean(y_train)==np.mean(y_test)=}')\n",
      "solution": "from sklearn.model_selection import train_test_split\nimport numpy as np\n\nX = np.arange(16).reshape(8, 2)\ny = np.array([0, 0, 0, 0, 0, 0, 1, 1])\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, stratify=y, random_state=42)\nprint(f'{np.mean(y_train)==np.mean(y_test)=}')\n",
      "target": "True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "y_train",
            "type": "array"
          },
          {
            "name": "y_test",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "scaling",
      "title": "RobustScaler on Outlier-Heavy Features",
      "desc": "Use RobustScaler to scale features without skew from extreme outlier values.",
      "prompt": "<strong>[Medium] RobustScaler on Outlier-Heavy Features</strong><p>Instantiate <code>RobustScaler()</code>, fit and transform <code>salaries</code> containing a huge outlier, and store the scaled output in <code>scaled_salaries</code>.</p>",
      "starterCode": "from sklearn.preprocessing import RobustScaler\nimport numpy as np\n\nsalaries = np.array([[30000], [45000], [50000], [60000], [10000000]])  # 10M outlier\nscaled_salaries = None\n",
      "ref": "from sklearn.preprocessing import RobustScaler\nimport numpy as np\n\nsalaries = np.array([[30000], [45000], [50000], [60000], [10000000]])\nscaler = RobustScaler()\nscaled_salaries = scaler.fit_transform(salaries)\nprint(f'{scaled_salaries=}')\n",
      "solution": "from sklearn.preprocessing import RobustScaler\nimport numpy as np\n\nsalaries = np.array([[30000], [45000], [50000], [60000], [10000000]])\nscaler = RobustScaler()\nscaled_salaries = scaler.fit_transform(salaries)\nprint(f'{scaled_salaries=}')\n",
      "target": "scaled_salaries=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "scaled_salaries",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 15,
      "difficulty": "Hard",
      "category": "regression",
      "title": "Multiple Linear Regression Model Diagnostics",
      "desc": "Train multiple regression model on 3 features, extract coefficients and compute predictions.",
      "prompt": "<strong>[Hard] Multiple Linear Regression Model Diagnostics</strong><p>Train <code>LinearRegression()</code> on 3-feature matrix <code>X</code> and target <code>y</code>. Store the predicted values in <code>y_hat</code> and the number of coefficients in <code>num_features</code> (3).</p>",
      "starterCode": "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(20, 3)\ny = 2 * X[:, 0] - 3 * X[:, 1] + 1.5 * X[:, 2] + 4\n\ny_hat = None\nnum_features = None\n",
      "ref": "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(20, 3)\ny = 2 * X[:, 0] - 3 * X[:, 1] + 1.5 * X[:, 2] + 4\nmodel = LinearRegression()\nmodel.fit(X, y)\ny_hat = model.predict(X)\nnum_features = int(len(model.coef_))\nprint(f'{num_features=}')\n",
      "solution": "from sklearn.linear_model import LinearRegression\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(20, 3)\ny = 2 * X[:, 0] - 3 * X[:, 1] + 1.5 * X[:, 2] + 4\nmodel = LinearRegression()\nmodel.fit(X, y)\ny_hat = model.predict(X)\nnum_features = int(len(model.coef_))\nprint(f'{num_features=}')\n",
      "target": "num_features=3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "y_hat",
            "type": "array"
          },
          {
            "name": "num_features",
            "type": "int",
            "value": 3
          }
        ]
      }
    },
    {
      "id": 16,
      "difficulty": "Medium",
      "category": "encoding",
      "title": "OrdinalEncoder for Natural Ordered Tiers",
      "desc": "Encode ordered categories (Low < Medium < High) using OrdinalEncoder.",
      "prompt": "<strong>[Medium] OrdinalEncoder for Natural Ordered Tiers</strong><p>Encode ordered tiers <code>['Low', 'Medium', 'High']</code> using <code>OrdinalEncoder(categories=[['Low', 'Medium', 'High']])</code>. Store encoded array in <code>tier_encoded</code>.</p>",
      "starterCode": "from sklearn.preprocessing import OrdinalEncoder\nimport numpy as np\n\ntiers = np.array([['Medium'], ['Low'], ['High'], ['Low']])\ntier_encoded = None\n",
      "ref": "from sklearn.preprocessing import OrdinalEncoder\nimport numpy as np\n\ntiers = np.array([['Medium'], ['Low'], ['High'], ['Low']])\nenc = OrdinalEncoder(categories=[['Low', 'Medium', 'High']])\ntier_encoded = enc.fit_transform(tiers)\nprint(f'{tier_encoded=}')\n",
      "solution": "from sklearn.preprocessing import OrdinalEncoder\nimport numpy as np\n\ntiers = np.array([['Medium'], ['Low'], ['High'], ['Low']])\nenc = OrdinalEncoder(categories=[['Low', 'Medium', 'High']])\ntier_encoded = enc.fit_transform(tiers)\nprint(f'{tier_encoded=}')\n",
      "target": "tier_encoded=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "tier_encoded",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 17,
      "difficulty": "Easy",
      "category": "metrics",
      "title": "Mean Squared Error Loss Computation",
      "desc": "Calculate MSE between predictions and true labels.",
      "prompt": "<strong>[Easy] Mean Squared Error Loss Computation</strong><p>Compute <code>mse = float(mean_squared_error(y_true, y_pred))</code>.</p>",
      "starterCode": "from sklearn.metrics import mean_squared_error\nimport numpy as np\n\ny_true = np.array([2.0, 4.0, 6.0])\ny_pred = np.array([3.0, 3.0, 8.0])\nmse = None\n",
      "ref": "from sklearn.metrics import mean_squared_error\nimport numpy as np\n\ny_true = np.array([2.0, 4.0, 6.0])\ny_pred = np.array([3.0, 3.0, 8.0])\nmse = float(mean_squared_error(y_true, y_pred))\nprint(f'{mse=}')\n",
      "solution": "from sklearn.metrics import mean_squared_error\nimport numpy as np\n\ny_true = np.array([2.0, 4.0, 6.0])\ny_pred = np.array([3.0, 3.0, 8.0])\nmse = float(mean_squared_error(y_true, y_pred))\nprint(f'{mse=}')\n",
      "target": "mse=2.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "mse",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 18,
      "difficulty": "Hard",
      "category": "regularization",
      "title": "ElasticNet Hybrid Regularization",
      "desc": "Train an ElasticNet model combining L1 (Lasso) and L2 (Ridge) penalties.",
      "prompt": "<strong>[Hard] ElasticNet Hybrid Regularization</strong><p>Train an <code>ElasticNet(alpha=0.1, l1_ratio=0.5)</code> model on <code>X</code> and <code>y</code>. Store the coefficients in <code>elastic_coefs</code>.</p>",
      "starterCode": "from sklearn.linear_model import ElasticNet\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(15, 4)\ny = 3 * X[:, 0] - 2 * X[:, 1] + np.random.randn(15) * 0.1\n\nelastic_coefs = None\n",
      "ref": "from sklearn.linear_model import ElasticNet\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(15, 4)\ny = 3 * X[:, 0] - 2 * X[:, 1] + np.random.randn(15) * 0.1\nmodel = ElasticNet(alpha=0.1, l1_ratio=0.5)\nmodel.fit(X, y)\nelastic_coefs = model.coef_\nprint(f'{elastic_coefs=}')\n",
      "solution": "from sklearn.linear_model import ElasticNet\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(15, 4)\ny = 3 * X[:, 0] - 2 * X[:, 1] + np.random.randn(15) * 0.1\nmodel = ElasticNet(alpha=0.1, l1_ratio=0.5)\nmodel.fit(X, y)\nelastic_coefs = model.coef_\nprint(f'{elastic_coefs=}')\n",
      "target": "elastic_coefs=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "elastic_coefs",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 19,
      "difficulty": "Medium",
      "category": "pipeline",
      "title": "Extracting Model Parameters from Pipeline Step",
      "desc": "Access the fitted regression estimator inside a named pipeline step.",
      "prompt": "<strong>[Medium] Extracting Model Parameters from Pipeline Step</strong><p>Given fitted pipeline <code>pipe</code>, extract the regression coefficients from <code>pipe.named_steps['reg'].coef_</code> and store them in <code>extracted_coef</code>.</p>",
      "starterCode": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1.0], [2.0], [3.0], [4.0]])\ny = np.array([2.0, 4.0, 6.0, 8.0])\npipe = Pipeline([('scaler', StandardScaler()), ('reg', LinearRegression())])\npipe.fit(X, y)\n\nextracted_coef = None\n",
      "ref": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1.0], [2.0], [3.0], [4.0]])\ny = np.array([2.0, 4.0, 6.0, 8.0])\npipe = Pipeline([('scaler', StandardScaler()), ('reg', LinearRegression())])\npipe.fit(X, y)\nextracted_coef = pipe.named_steps['reg'].coef_\nprint(f'{extracted_coef=}')\n",
      "solution": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nimport numpy as np\n\nX = np.array([[1.0], [2.0], [3.0], [4.0]])\ny = np.array([2.0, 4.0, 6.0, 8.0])\npipe = Pipeline([('scaler', StandardScaler()), ('reg', LinearRegression())])\npipe.fit(X, y)\nextracted_coef = pipe.named_steps['reg'].coef_\nprint(f'{extracted_coef=}')\n",
      "target": "extracted_coef=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "extracted_coef",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Complete End-to-End Regression Benchmark Capstone",
      "desc": "Split data, assemble preprocessing pipeline, fit regression model, and calculate test set R² score.",
      "prompt": "<strong>[Hard] Complete End-to-End Regression Benchmark Capstone</strong><p>Perform complete workflow: (1) Split <code>X</code>, <code>y</code> with <code>test_size=0.3</code>, <code>random_state=42</code>. (2) Build pipeline with <code>StandardScaler</code> and <code>LinearRegression</code>. (3) Fit on train data. (4) Compute test $R^2$ score in <code>final_test_r2</code>.</p>",
      "starterCode": "from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(50, 3)\ny = 5 * X[:, 0] - 2 * X[:, 1] + 3 * X[:, 2] + 10 + np.random.randn(50) * 0.2\n\nfinal_test_r2 = None\n",
      "ref": "from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(50, 3)\ny = 5 * X[:, 0] - 2 * X[:, 1] + 3 * X[:, 2] + 10 + np.random.randn(50) * 0.2\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\npipe = Pipeline([('scaler', StandardScaler()), ('reg', LinearRegression())])\npipe.fit(X_train, y_train)\ny_pred = pipe.predict(X_test)\nfinal_test_r2 = float(r2_score(y_test, y_pred))\nprint(f'{final_test_r2=}')\n",
      "solution": "from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import r2_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(50, 3)\ny = 5 * X[:, 0] - 2 * X[:, 1] + 3 * X[:, 2] + 10 + np.random.randn(50) * 0.2\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)\npipe = Pipeline([('scaler', StandardScaler()), ('reg', LinearRegression())])\npipe.fit(X_train, y_train)\ny_pred = pipe.predict(X_test)\nfinal_test_r2 = float(r2_score(y_test, y_pred))\nprint(f'{final_test_r2=}')\n",
      "target": "final_test_r2=0.99\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "final_test_r2",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "splitting",
      "title": "Test Size Fraction",
      "desc": "Fraction of data allocated to test split.",
      "prompt": "Store default recommended test size fraction (0.25) in <code>t1_test_size = 0.25</code>.",
      "starterCode": "",
      "ref": "t1_test_size = 0.25\n",
      "solution": "t1_test_size = 0.25\n",
      "target": "t1_test_size=0.25\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t1_test_size",
            "type": "float",
            "value": 0.25
          }
        ]
      }
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "scaling",
      "title": "StandardScaler Mean Target",
      "desc": "Mean value of features scaled by StandardScaler.",
      "prompt": "Store target mean of standardized features in <code>t2_standard_mean = 0.0</code>.",
      "starterCode": "",
      "ref": "t2_standard_mean = 0.0\n",
      "solution": "t2_standard_mean = 0.0\n",
      "target": "t2_standard_mean=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t2_standard_mean",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "scaling",
      "title": "StandardScaler Std Target",
      "desc": "Standard deviation of features scaled by StandardScaler.",
      "prompt": "Store target standard deviation in <code>t3_standard_std = 1.0</code>.",
      "starterCode": "",
      "ref": "t3_standard_std = 1.0\n",
      "solution": "t3_standard_std = 1.0\n",
      "target": "t3_standard_std=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t3_standard_std",
            "type": "float",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "regularization",
      "title": "Ridge Penalty Norm",
      "desc": "Norm used by Ridge regression penalty.",
      "prompt": "Store the norm type used by Ridge penalty ('L2') in <code>t4_ridge_norm = 'L2'</code>.",
      "starterCode": "",
      "ref": "t4_ridge_norm = 'L2'\n",
      "solution": "t4_ridge_norm = 'L2'\n",
      "target": "t4_ridge_norm='L2'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t4_ridge_norm",
            "type": "string",
            "value": "L2"
          }
        ]
      }
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "regularization",
      "title": "Lasso Penalty Norm",
      "desc": "Norm used by Lasso regression penalty.",
      "prompt": "Store the norm type used by Lasso penalty ('L1') in <code>t5_lasso_norm = 'L1'</code>.",
      "starterCode": "",
      "ref": "t5_lasso_norm = 'L1'\n",
      "solution": "t5_lasso_norm = 'L1'\n",
      "target": "t5_lasso_norm='L1'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t5_lasso_norm",
            "type": "string",
            "value": "L1"
          }
        ]
      }
    },
    {
      "id": 6,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "R2 Perfect Score",
      "desc": "Theoretical maximum score for R² metric.",
      "prompt": "Store theoretical perfect R² score in <code>t6_perfect_r2 = 1.0</code>.",
      "starterCode": "",
      "ref": "t6_perfect_r2 = 1.0\n",
      "solution": "t6_perfect_r2 = 1.0\n",
      "target": "t6_perfect_r2=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t6_perfect_r2",
            "type": "float",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 7,
      "difficulty": "Medium",
      "category": "pipeline",
      "title": "Pipeline Final Step Type",
      "desc": "Identify final step type in a scikit-learn pipeline.",
      "prompt": "Store final step role name ('estimator') in <code>t7_final_step = 'estimator'</code>.",
      "starterCode": "",
      "ref": "t7_final_step = 'estimator'\n",
      "solution": "t7_final_step = 'estimator'\n",
      "target": "t7_final_step='estimator'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t7_final_step",
            "type": "string",
            "value": "estimator"
          }
        ]
      }
    },
    {
      "id": 8,
      "difficulty": "Medium",
      "category": "encoding",
      "title": "Dummy Variable Avoidance",
      "desc": "Parameter to avoid dummy variable trap in OneHotEncoder.",
      "prompt": "Store the parameter value ('first') for drop in <code>t8_drop_param = 'first'</code>.",
      "starterCode": "",
      "ref": "t8_drop_param = 'first'\n",
      "solution": "t8_drop_param = 'first'\n",
      "target": "t8_drop_param='first'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t8_drop_param",
            "type": "string",
            "value": "first"
          }
        ]
      }
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "regression",
      "title": "OLS Loss Function",
      "desc": "Name of the loss function minimized by OLS.",
      "prompt": "Store abbreviation ('RSS') for residual sum of squares in <code>t9_loss_name = 'RSS'</code>.",
      "starterCode": "",
      "ref": "t9_loss_name = 'RSS'\n",
      "solution": "t9_loss_name = 'RSS'\n",
      "target": "t9_loss_name='RSS'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t9_loss_name",
            "type": "string",
            "value": "RSS"
          }
        ]
      }
    },
    {
      "id": 10,
      "difficulty": "Medium",
      "category": "diagnostics",
      "title": "Data Leakage Cause",
      "desc": "Identify cause of data leakage in scaling.",
      "prompt": "Store boolean flag indicating scaling full dataset before splitting causes leakage: <code>t10_causes_leakage = True</code>.",
      "starterCode": "",
      "ref": "t10_causes_leakage = True\n",
      "solution": "t10_causes_leakage = True\n",
      "target": "t10_causes_leakage=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t10_causes_leakage",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 11,
      "difficulty": "Easy",
      "category": "metrics",
      "title": "MAE Minimum Value",
      "desc": "Minimum theoretical value for MAE.",
      "prompt": "Store minimum theoretical MAE in <code>t11_min_mae = 0.0</code>.",
      "starterCode": "",
      "ref": "t11_min_mae = 0.0\n",
      "solution": "t11_min_mae = 0.0\n",
      "target": "t11_min_mae=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t11_min_mae",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 12,
      "difficulty": "Easy",
      "category": "scaling",
      "title": "MinMaxScaler Lower Bound",
      "desc": "Lower bound of default MinMaxScaler range.",
      "prompt": "Store default minimum value (0.0) in <code>t12_min_val = 0.0</code>.",
      "starterCode": "",
      "ref": "t12_min_val = 0.0\n",
      "solution": "t12_min_val = 0.0\n",
      "target": "t12_min_val=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t12_min_val",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 13,
      "difficulty": "Easy",
      "category": "scaling",
      "title": "MinMaxScaler Upper Bound",
      "desc": "Upper bound of default MinMaxScaler range.",
      "prompt": "Store default maximum value (1.0) in <code>t13_max_val = 1.0</code>.",
      "starterCode": "",
      "ref": "t13_max_val = 1.0\n",
      "solution": "t13_max_val = 1.0\n",
      "target": "t13_max_val=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t13_max_val",
            "type": "float",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "regularization",
      "title": "Alpha Hyperparameter Purpose",
      "desc": "Role of alpha hyperparameter in Ridge and Lasso.",
      "prompt": "Store role description ('regularization strength') in <code>t14_alpha_role = 'regularization strength'</code>.",
      "starterCode": "",
      "ref": "t14_alpha_role = 'regularization strength'\n",
      "solution": "t14_alpha_role = 'regularization strength'\n",
      "target": "t14_alpha_role='regularization strength'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t14_alpha_role",
            "type": "string",
            "value": "regularization strength"
          }
        ]
      }
    },
    {
      "id": 15,
      "difficulty": "Hard",
      "category": "metrics",
      "title": "RMSE Unit Alignment",
      "desc": "Check if RMSE shares units with target variable.",
      "prompt": "Store boolean flag verifying RMSE shares units with target: <code>t15_same_units = True</code>.",
      "starterCode": "",
      "ref": "t15_same_units = True\n",
      "solution": "t15_same_units = True\n",
      "target": "t15_same_units=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t15_same_units",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 16,
      "difficulty": "Medium",
      "category": "splitting",
      "title": "Stratify Applicability",
      "desc": "Identify when stratify parameter is applicable.",
      "prompt": "Store problem type ('classification') in <code>t16_stratify_task = 'classification'</code>.",
      "starterCode": "",
      "ref": "t16_stratify_task = 'classification'\n",
      "solution": "t16_stratify_task = 'classification'\n",
      "target": "t16_stratify_task='classification'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t16_stratify_task",
            "type": "string",
            "value": "classification"
          }
        ]
      }
    },
    {
      "id": 17,
      "difficulty": "Hard",
      "category": "regression",
      "title": "Multicollinearity Detection",
      "desc": "Metric used to identify multicollinearity between features.",
      "prompt": "Store abbreviation ('VIF') for variance inflation factor in <code>t17_collinearity_metric = 'VIF'</code>.",
      "starterCode": "",
      "ref": "t17_collinearity_metric = 'VIF'\n",
      "solution": "t17_collinearity_metric = 'VIF'\n",
      "target": "t17_collinearity_metric='VIF'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t17_collinearity_metric",
            "type": "string",
            "value": "VIF"
          }
        ]
      }
    },
    {
      "id": 18,
      "difficulty": "Medium",
      "category": "pipeline",
      "title": "Transformer Method Pairing",
      "desc": "Identify dual method called on training data by transformers.",
      "prompt": "Store method name ('fit_transform') in <code>t18_train_method = 'fit_transform'</code>.",
      "starterCode": "",
      "ref": "t18_train_method = 'fit_transform'\n",
      "solution": "t18_train_method = 'fit_transform'\n",
      "target": "t18_train_method='fit_transform'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t18_train_method",
            "type": "string",
            "value": "fit_transform"
          }
        ]
      }
    },
    {
      "id": 19,
      "difficulty": "Medium",
      "category": "pipeline",
      "title": "Test Transformation Method",
      "desc": "Method called strictly on test data by transformers.",
      "prompt": "Store method name ('transform') in <code>t19_test_method = 'transform'</code>.",
      "starterCode": "",
      "ref": "t19_test_method = 'transform'\n",
      "solution": "t19_test_method = 'transform'\n",
      "target": "t19_test_method='transform'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t19_test_method",
            "type": "string",
            "value": "transform"
          }
        ]
      }
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "regularization",
      "title": "ElasticNet L1 Ratio Pure Lasso",
      "desc": "L1 ratio value making ElasticNet behave as pure Lasso.",
      "prompt": "Store L1 ratio for pure Lasso (1.0) in <code>t20_l1_lasso = 1.0</code>.",
      "starterCode": "",
      "ref": "t20_l1_lasso = 1.0\n",
      "solution": "t20_l1_lasso = 1.0\n",
      "target": "t20_l1_lasso=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t20_l1_lasso",
            "type": "float",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 21,
      "difficulty": "Hard",
      "category": "regularization",
      "title": "ElasticNet L1 Ratio Pure Ridge",
      "desc": "L1 ratio value making ElasticNet behave as pure Ridge.",
      "prompt": "Store L1 ratio for pure Ridge (0.0) in <code>t21_l1_ridge = 0.0</code>.",
      "starterCode": "",
      "ref": "t21_l1_ridge = 0.0\n",
      "solution": "t21_l1_ridge = 0.0\n",
      "target": "t21_l1_ridge=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t21_l1_ridge",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 22,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Mean Baseline R2",
      "desc": "R² score achieved by a model predicting constant mean target.",
      "prompt": "Store R² score of constant mean baseline (0.0) in <code>t22_baseline_r2 = 0.0</code>.",
      "starterCode": "",
      "ref": "t22_baseline_r2 = 0.0\n",
      "solution": "t22_baseline_r2 = 0.0\n",
      "target": "t22_baseline_r2=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t22_baseline_r2",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 23,
      "difficulty": "Hard",
      "category": "diagnostics",
      "title": "Residual Independence Test",
      "desc": "Statistical test for autocorrelation in residuals.",
      "prompt": "Store test name ('Durbin-Watson') in <code>t23_residual_test = 'Durbin-Watson'</code>.",
      "starterCode": "",
      "ref": "t23_residual_test = 'Durbin-Watson'\n",
      "solution": "t23_residual_test = 'Durbin-Watson'\n",
      "target": "t23_residual_test='Durbin-Watson'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t23_residual_test",
            "type": "string",
            "value": "Durbin-Watson"
          }
        ]
      }
    },
    {
      "id": 24,
      "difficulty": "Medium",
      "category": "diagnostics",
      "title": "Homoscedasticity Definition",
      "desc": "Property where residual variance is constant across feature range.",
      "prompt": "Store property name ('Homoscedasticity') in <code>t24_constant_variance = 'Homoscedasticity'</code>.",
      "starterCode": "",
      "ref": "t24_constant_variance = 'Homoscedasticity'\n",
      "solution": "t24_constant_variance = 'Homoscedasticity'\n",
      "target": "t24_constant_variance='Homoscedasticity'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t24_constant_variance",
            "type": "string",
            "value": "Homoscedasticity"
          }
        ]
      }
    },
    {
      "id": 25,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Target Transformation Leakage",
      "desc": "Proper approach for transforming target variable y.",
      "prompt": "Store recommended class name ('TransformedTargetRegressor') in <code>t25_target_wrapper = 'TransformedTargetRegressor'</code>.",
      "starterCode": "",
      "ref": "t25_target_wrapper = 'TransformedTargetRegressor'\n",
      "solution": "t25_target_wrapper = 'TransformedTargetRegressor'\n",
      "target": "t25_target_wrapper='TransformedTargetRegressor'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t25_target_wrapper",
            "type": "string",
            "value": "TransformedTargetRegressor"
          }
        ]
      }
    }
  ]
};
