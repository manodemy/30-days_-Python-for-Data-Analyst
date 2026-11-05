// Python Course Content — Day 30 (Production Analytics Capstone & End-to-End Portfolio)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay30'] = {
  "day": 30,
  "title": "End-to-End Analytics Capstone",
  "topics": [
    "Production Analytics & ML Lifecycle",
    "Business Problem Framing & Dataset Schema",
    "Exploratory Data Analysis at Scale",
    "Advanced Feature Engineering & Transformations",
    "Automated Pipeline Assembly",
    "Model Benchmarking & GridSearchCV Tuning",
    "Model Explainability & Feature Importance",
    "Model Serialization & Production Serving (joblib)",
    "Production Monitoring & Data Drift",
    "Staff Data Scientist Technical Architecture Interview Questions"
  ],
  "slides": [
    {
      "title": "Production Analytics Capstone & End-to-End Portfolio",
      "html": "\n        <!-- Section 01: Production Lifecycle -->\n        <div class=\"slide-section\" id=\"day30Section01\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">01</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🚀</span> 01. The Modern Production Analytics &amp; Machine Learning Lifecycle</span>\n            </div>\n          </div>\n          <p>Moving a machine learning model from an exploratory Jupyter Notebook to a mission-critical enterprise production pipeline requires rigorous architectural maturity. Industry pipelines are defined by <strong>reproducibility</strong>, <strong>automated validation</strong>, and <strong>zero data leakage</strong>.</p>\n\n          <div class=\"db-mock-table-wrap\">\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Phase</th>\n                  <th>Core Engineering Objective</th>\n                  <th>Primary Python Stack</th>\n                  <th>Critical Failure Risk</th>\n                  <th>Production Gate</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><strong>1. Problem Formulation</strong></td>\n                  <td>Define measurable business KPIs (e.g. churn rate, CLV)</td>\n                  <td>Product Requirements / SQL</td>\n                  <td>Optimizing metric disconnected from business ROI</td>\n                  <td>Executive KPI Sign-off</td>\n                </tr>\n                <tr>\n                  <td><strong>2. Ingestion &amp; Sanitization</strong></td>\n                  <td>Clean missing values, cast data types, handle outliers</td>\n                  <td>Pandas, NumPy, Polars</td>\n                  <td>Silent type casting errors, corrupted records</td>\n                  <td>Data Schema Contract Check</td>\n                </tr>\n                <tr>\n                  <td><strong>3. Feature Engineering</strong></td>\n                  <td>Create domain ratios, rolling aggregations, encodings</td>\n                  <td>ColumnTransformer, Scikit-Learn</td>\n                  <td>Data Leakage across train/test splits</td>\n                  <td>Isolated Preprocessing Fit</td>\n                </tr>\n                <tr>\n                  <td><strong>4. Model Benchmarking</strong></td>\n                  <td>Compare baseline estimators, tune hyperparameters</td>\n                  <td>GridSearchCV, Cross-Validation</td>\n                  <td>Overfitting to single validation slice</td>\n                  <td>K-Fold Stratified Holdout</td>\n                </tr>\n                <tr>\n                  <td><strong>5. Serialization &amp; Serving</strong></td>\n                  <td>Persist pipeline artifact, serve low-latency inference</td>\n                  <td>joblib, FastAPI, ONNX</td>\n                  <td>Environment version mismatch, cold start lag</td>\n                  <td>Inference Latency &lt; 25ms SLA</td>\n                </tr>\n                <tr>\n                  <td><strong>6. Monitoring &amp; Drift</strong></td>\n                  <td>Detect distribution shift in incoming inference payloads</td>\n                  <td>Evidently, Prometheus, SciPy</td>\n                  <td>Silent model degradation as customer behavior drifts</td>\n                  <td>Automated Retraining Alert</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 02: Business Problem Framing -->\n        <div class=\"slide-section\" id=\"day30Section02\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">02</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🏢</span> 02. Business Problem Framing: Customer Retention &amp; Churn Risk</span>\n            </div>\n          </div>\n          <p>Acquiring a new customer costs $5\\times$ to $7\\times$ more than retaining an existing subscriber. In this capstone, you will construct an end-to-end production pipeline predicting whether an e-commerce subscriber will churn ($y=1$) within 30 days based on behavioral usage telemetry.</p>\n        </div>\n\n        <!-- Section 03: EDA at Scale -->\n        <div class=\"slide-section\" id=\"day30Section03\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">03</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🔍</span> 03. Exploratory Data Analysis at Scale with Pandas</span>\n            </div>\n          </div>\n          <p>Automated summary profiling uncovers class imbalances, missingness patterns, and anomalous distribution skews before fitting estimators.</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">eda_profiling.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">import</span> pandas <span class=\"py-kw\">as</span> pd\n<span class=\"py-kw\">import</span> numpy <span class=\"py-kw\">as</span> np\n\n<span class=\"py-comment\"># Check missing value percentage per column</span>\nmissing_pct = df.isnull().mean() * 100\nprint(f\"Missing Values (%):\\n{missing_pct[missing_pct > 0]}\")\n\n<span class=\"py-comment\"># Profile target class distribution</span>\nchurn_ratio = df['churn'].value_counts(normalize=True)\nprint(f\"Churn Balance:\\n{churn_ratio}\")</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- Section 04: Advanced Feature Engineering -->\n        <div class=\"slide-section\" id=\"day30Section04\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">04</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">⚙️</span> 04. Advanced Feature Engineering: Domain Ratios &amp; Scaling</span>\n            </div>\n          </div>\n          <p>Raw fields like <code>total_spend</code> and <code>tenure_months</code> contain far more predictive signal when combined into interaction ratios like <code>spend_per_tenure_month</code> or log-transformed to compress long-tailed distributions.</p>\n        </div>\n\n        <!-- Section 05: Automated Pipeline Assembly -->\n        <div class=\"slide-section\" id=\"day30Section05\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">05</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🏗️</span> 05. Automated Pipeline Assembly (ColumnTransformer + Classifier)</span>\n            </div>\n          </div>\n          <p>By bundling data transformations and the learning algorithm into a single atomic <code>Pipeline</code>, the deployed model behaves as a self-contained black box accepting raw unformatted customer dictionaries.</p>\n        </div>\n\n        <!-- Section 06: GridSearchCV Tuning -->\n        <div class=\"slide-section\" id=\"day30Section06\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">06</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🎛️</span> 06. Model Benchmarking &amp; GridSearchCV Hyperparameter Tuning</span>\n            </div>\n          </div>\n          <p>Rather than guessing hyperparameters like <code>C</code>, <code>max_depth</code>, or <code>n_estimators</code>, <code>GridSearchCV</code> systematically evaluates all parameter combinations using $K$-Fold Cross-Validation.</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">grid_search_tuning.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">from</span> sklearn.model_selection <span class=\"py-kw\">import</span> GridSearchCV\n<span class=\"py-kw\">from</span> sklearn.linear_model <span class=\"py-kw\">import</span> LogisticRegression\n\nparam_grid = {\n    'C': [0.01, 0.1, 1.0, 10.0],\n    'penalty': ['l2'],\n    'solver': ['lbfgs']\n}\n\ngrid = GridSearchCV(LogisticRegression(max_iter=1000), param_grid, cv=5, scoring='f1')\ngrid.fit(X_train, y_train)\nprint(f\"Optimal Parameters: {grid.best_params_}\")\nprint(f\"Best Cross-Validation F1: {grid.best_score_:.4f}\")</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- Section 07: Model Explainability -->\n        <div class=\"slide-section\" id=\"day30Section07\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">07</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">💡</span> 07. Model Explainability: Feature &amp; Permutation Importance</span>\n            </div>\n          </div>\n          <p>Black-box predictions are unacceptable in regulated industries (finance, healthcare, insurance). We establish transparency through <strong>Permutation Importance</strong>, measuring score drop when each feature's values are randomly shuffled.</p>\n        </div>\n\n        <!-- Section 08: Model Serialization -->\n        <div class=\"slide-section\" id=\"day30Section08\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">08</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">📦</span> 08. Model Serialization &amp; Production Serving (joblib)</span>\n            </div>\n          </div>\n          <p>Once trained and validated, the complete pipeline is serialized to disk using <code>joblib.dump()</code>. Production API services load this artifact into memory to score live user traffic in milliseconds.</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">model_persistence.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">import</span> joblib\n\n<span class=\"py-comment\"># 1. Serialize model to disk</span>\njoblib.dump(pipeline, 'churn_model_v1.joblib')\n\n<span class=\"py-comment\"># 2. Deserialize in production microservice</span>\nloaded_pipeline = joblib.load('churn_model_v1.joblib')\nsample_prediction = loaded_pipeline.predict(new_customer_features)</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- Section 09: Production Monitoring & Data Drift -->\n        <div class=\"slide-section\" id=\"day30Section09\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">09</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">📡</span> 09. Production Monitoring &amp; Data Drift</span>\n            </div>\n          </div>\n          <p>A deployed model begins decaying the moment it goes live due to changing macroeconomic factors, competitor promotions, and seasonality:</p>\n          <ul>\n            <li><strong>Covariate Shift (Data Drift):</strong> The input feature distribution $P(X)$ changes (e.g. inflation shifts customer spend).</li>\n            <li><strong>Concept Drift:</strong> The relationship between features and target $P(y|X)$ shifts (e.g. churn drivers change).</li>\n            <li><strong>Automated Retraining Triggers:</strong> Setting statistical alerts when drift metrics exceed Kolmogorov-Smirnov thresholds.</li>\n          </ul>\n        </div>\n\n        <!-- Section 10: Staff Data Scientist Interview Checklist -->\n        <div class=\"slide-section\" id=\"day30Section10\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">10</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🏆</span> 10. 25 Staff Data Scientist Technical Architecture Interview Questions</span>\n            </div>\n          </div>\n          <div class=\"py-keynotes-card\">\n            <h4>💡 Executive Systems Design Checklist:</h4>\n            <ul class=\"py-keynotes-list\">\n              <li><strong>How do you handle real-time inference vs. batch scoring?</strong> Batch scoring processes millions of records overnight via Spark or SQL. Real-time inference deploys pre-fitted pipelines inside sub-50ms REST/gRPC endpoints.</li>\n              <li><strong>What is the difference between pickle and joblib?</strong> <code>joblib</code> is heavily optimized for large NumPy numerical arrays by using memory mapping (mmap), avoiding redundant copies.</li>\n              <li><strong>How do you prevent data leakage in production feature stores?</strong> Point-in-time correct joins (AS OF joins) guarantee features are calculated strictly using data timestamped before the event occurred.</li>\n            </ul>\n          </div>\n        </div>\n      "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "preprocessing",
      "title": "Missing Value Imputation with SimpleImputer",
      "desc": "Impute missing values using SimpleImputer with median strategy.",
      "prompt": "<strong>[Easy] Missing Value Imputation with SimpleImputer</strong><p>Instantiate <code>SimpleImputer(strategy='median')</code>, fit and transform <code>data_with_nans</code>, and store the imputed array in <code>imputed_data</code>.</p>",
      "starterCode": "from sklearn.impute import SimpleImputer\nimport numpy as np\n\ndata_with_nans = np.array([[1.0], [np.nan], [3.0], [5.0], [np.nan]])\nimputed_data = None\n",
      "ref": "from sklearn.impute import SimpleImputer\nimport numpy as np\n\ndata_with_nans = np.array([[1.0], [np.nan], [3.0], [5.0], [np.nan]])\nimp = SimpleImputer(strategy='median')\nimputed_data = imp.fit_transform(data_with_nans)\nprint(f'{imputed_data=}')\n",
      "solution": "from sklearn.impute import SimpleImputer\nimport numpy as np\n\ndata_with_nans = np.array([[1.0], [np.nan], [3.0], [5.0], [np.nan]])\nimp = SimpleImputer(strategy='median')\nimputed_data = imp.fit_transform(data_with_nans)\nprint(f'{imputed_data=}')\n",
      "target": "imputed_data=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "imputed_data",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "features",
      "title": "Logarithmic Feature Transformation",
      "desc": "Apply np.log1p to compress right-skewed revenue distribution.",
      "prompt": "<strong>[Easy] Logarithmic Feature Transformation</strong><p>Apply <code>np.log1p</code> to positive revenue numbers <code>rev_array</code> to handle skewness, storing the result in <code>log_rev</code>.</p>",
      "starterCode": "import numpy as np\n\nrev_array = np.array([10.0, 50.0, 200.0, 1000.0, 50000.0])\nlog_rev = None\n",
      "ref": "import numpy as np\n\nrev_array = np.array([10.0, 50.0, 200.0, 1000.0, 50000.0])\nlog_rev = np.log1p(rev_array)\nprint(f'{log_rev=}')\n",
      "solution": "import numpy as np\n\nrev_array = np.array([10.0, 50.0, 200.0, 1000.0, 50000.0])\nlog_rev = np.log1p(rev_array)\nprint(f'{log_rev=}')\n",
      "target": "log_rev=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "log_rev",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "features",
      "title": "Interaction Ratio Feature Engineering",
      "desc": "Engineer spend-per-tenure-month ratio feature vector.",
      "prompt": "<strong>[Easy] Interaction Ratio Feature Engineering</strong><p>Calculate interaction ratio <code>spend_per_month = total_spend / tenure_months</code>.</p>",
      "starterCode": "import numpy as np\n\ntotal_spend = np.array([1200.0, 3500.0, 600.0, 4800.0])\ntenure_months = np.array([12.0, 24.0, 6.0, 36.0])\n\nspend_per_month = None\n",
      "ref": "import numpy as np\n\ntotal_spend = np.array([1200.0, 3500.0, 600.0, 4800.0])\ntenure_months = np.array([12.0, 24.0, 6.0, 36.0])\nspend_per_month = total_spend / tenure_months\nprint(f'{spend_per_month=}')\n",
      "solution": "import numpy as np\n\ntotal_spend = np.array([1200.0, 3500.0, 600.0, 4800.0])\ntenure_months = np.array([12.0, 24.0, 6.0, 36.0])\nspend_per_month = total_spend / tenure_months\nprint(f'{spend_per_month=}')\n",
      "target": "spend_per_month=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "spend_per_month",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 4,
      "difficulty": "Medium",
      "category": "validation",
      "title": "K-Fold Cross-Validation Scoring",
      "desc": "Evaluate model across 5 cross-validation folds using cross_val_score.",
      "prompt": "<strong>[Medium] K-Fold Cross-Validation Scoring</strong><p>Compute 5-fold cross-validation accuracy scores using <code>scores = cross_val_score(clf, X, y, cv=5)</code> and extract the mean score in <code>mean_cv_acc</code> (as float).</p>",
      "starterCode": "from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(50, 2)\ny = (X[:, 0] > 0).astype(int)\nclf = LogisticRegression()\n\nmean_cv_acc = None\n",
      "ref": "from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(50, 2)\ny = (X[:, 0] > 0).astype(int)\nclf = LogisticRegression()\nscores = cross_val_score(clf, X, y, cv=5)\nmean_cv_acc = float(np.mean(scores))\nprint(f'{mean_cv_acc=}')\n",
      "solution": "from sklearn.model_selection import cross_val_score\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(50, 2)\ny = (X[:, 0] > 0).astype(int)\nclf = LogisticRegression()\nscores = cross_val_score(clf, X, y, cv=5)\nmean_cv_acc = float(np.mean(scores))\nprint(f'{mean_cv_acc=}')\n",
      "target": "mean_cv_acc=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "mean_cv_acc",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 5,
      "difficulty": "Medium",
      "category": "tuning",
      "title": "GridSearchCV Hyperparameter Optimization",
      "desc": "Tune LogisticRegression regularization parameter C using GridSearchCV.",
      "prompt": "<strong>[Medium] GridSearchCV Hyperparameter Optimization</strong><p>Run <code>GridSearchCV(LogisticRegression(), {'C': [0.1, 1.0, 10.0]}, cv=3)</code> on <code>X</code> and <code>y</code>. Extract the optimal C value in <code>best_c</code> (as float).</p>",
      "starterCode": "from sklearn.model_selection import GridSearchCV\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6]])\ny = np.array([0, 0, 0, 1, 1, 1])\n\nbest_c = None\n",
      "ref": "from sklearn.model_selection import GridSearchCV\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6]])\ny = np.array([0, 0, 0, 1, 1, 1])\ngrid = GridSearchCV(LogisticRegression(), {'C': [0.1, 1.0, 10.0]}, cv=3)\ngrid.fit(X, y)\nbest_c = float(grid.best_params_['C'])\nprint(f'{best_c=}')\n",
      "solution": "from sklearn.model_selection import GridSearchCV\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6]])\ny = np.array([0, 0, 0, 1, 1, 1])\ngrid = GridSearchCV(LogisticRegression(), {'C': [0.1, 1.0, 10.0]}, cv=3)\ngrid.fit(X, y)\nbest_c = float(grid.best_params_['C'])\nprint(f'{best_c=}')\n",
      "target": "best_c=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "best_c",
            "type": "float"
          }
        ]
      }
    },
    {
      "id": 6,
      "difficulty": "Medium",
      "category": "persistence",
      "title": "Model Serialization with joblib",
      "desc": "Serialize trained pipeline model to byte buffer or file with joblib.",
      "prompt": "<strong>[Medium] Model Serialization with joblib</strong><p>Train <code>LogisticRegression()</code> on <code>X</code>, <code>y</code>. Use <code>joblib.dump(clf, 'model.joblib')</code> and verify file creation in <code>model_saved = True</code>.</p>",
      "starterCode": "from sklearn.linear_model import LogisticRegression\nimport joblib\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4]])\ny = np.array([0, 0, 1, 1])\n\nmodel_saved = None\n",
      "ref": "from sklearn.linear_model import LogisticRegression\nimport joblib\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4]])\ny = np.array([0, 0, 1, 1])\nclf = LogisticRegression().fit(X, y)\njoblib.dump(clf, 'model.joblib')\nmodel_saved = True\nprint(f'{model_saved=}')\n",
      "solution": "from sklearn.linear_model import LogisticRegression\nimport joblib\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4]])\ny = np.array([0, 0, 1, 1])\nclf = LogisticRegression().fit(X, y)\njoblib.dump(clf, 'model.joblib')\nmodel_saved = True\nprint(f'{model_saved=}')\n",
      "target": "model_saved=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "model_saved",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 7,
      "difficulty": "Medium",
      "category": "persistence",
      "title": "Model Deserialization & Prediction Scoring",
      "desc": "Load a persisted joblib model and generate predictions on new feature vectors.",
      "prompt": "<strong>[Medium] Model Deserialization & Prediction Scoring</strong><p>Load <code>model.joblib</code> with <code>joblib.load('model.joblib')</code>, predict for <code>new_sample = np.array([[3.5]])</code>, and store prediction in <code>loaded_pred</code>.</p>",
      "starterCode": "import joblib\nimport numpy as np\n\nnew_sample = np.array([[3.5]])\nloaded_pred = None\n",
      "ref": "import joblib\nimport numpy as np\n\nnew_sample = np.array([[3.5]])\nloaded_model = joblib.load('model.joblib')\nloaded_pred = loaded_model.predict(new_sample)\nprint(f'{loaded_pred=}')\n",
      "solution": "import joblib\nimport numpy as np\n\nnew_sample = np.array([[3.5]])\nloaded_model = joblib.load('model.joblib')\nloaded_pred = loaded_model.predict(new_sample)\nprint(f'{loaded_pred=}')\n",
      "target": "loaded_pred=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "loaded_pred",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 8,
      "difficulty": "Hard",
      "category": "serving",
      "title": "Writing a Real-Time Scoring Function",
      "desc": "Implement a production prediction function that accepts a customer dictionary.",
      "prompt": "<strong>[Hard] Writing a Real-Time Scoring Function</strong><p>Write function <code>score_customer(customer_dict, model)</code> that extracts <code>['age', 'tenure']</code> as a 2D numpy array and returns binary churn prediction (0 or 1 integer).</p>",
      "starterCode": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\n\n# Pre-trained model on age and tenure\nX = np.array([[20, 2], [25, 4], [55, 30], [60, 36]])\ny = np.array([1, 1, 0, 0])\nmodel = LogisticRegression().fit(X, y)\n\ndef score_customer(customer_dict, model):\n    pass\n\ncust = {'id': 99, 'age': 22, 'tenure': 3}\nprediction = None\n",
      "ref": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\n\nX = np.array([[20, 2], [25, 4], [55, 30], [60, 36]])\ny = np.array([1, 1, 0, 0])\nmodel = LogisticRegression().fit(X, y)\n\ndef score_customer(customer_dict, model):\n    features = np.array([[customer_dict['age'], customer_dict['tenure']]])\n    return int(model.predict(features)[0])\n\ncust = {'id': 99, 'age': 22, 'tenure': 3}\nprediction = score_customer(cust, model)\nprint(f'{prediction=}')\n",
      "solution": "import numpy as np\nfrom sklearn.linear_model import LogisticRegression\n\nX = np.array([[20, 2], [25, 4], [55, 30], [60, 36]])\ny = np.array([1, 1, 0, 0])\nmodel = LogisticRegression().fit(X, y)\n\ndef score_customer(customer_dict, model):\n    features = np.array([[customer_dict['age'], customer_dict['tenure']]])\n    return int(model.predict(features)[0])\n\ncust = {'id': 99, 'age': 22, 'tenure': 3}\nprediction = score_customer(cust, model)\nprint(f'{prediction=}')\n",
      "target": "prediction=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "prediction",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 9,
      "difficulty": "Hard",
      "category": "explainability",
      "title": "Permutation Feature Importance",
      "desc": "Compute permutation feature importance on holdout test set.",
      "prompt": "<strong>[Hard] Permutation Feature Importance</strong><p>Compute permutation importance using <code>perm_importance = permutation_importance(model, X_test, y_test, random_state=42)</code>. Store mean importances in <code>importances_mean</code>.</p>",
      "starterCode": "from sklearn.inspection import permutation_importance\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nnp.random.seed(42)\nX_train = np.random.randn(40, 2)\ny_train = (X_train[:, 0] > 0).astype(int)\nX_test = np.random.randn(20, 2)\ny_test = (X_test[:, 0] > 0).astype(int)\nmodel = LogisticRegression().fit(X_train, y_train)\n\nimportances_mean = None\n",
      "ref": "from sklearn.inspection import permutation_importance\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nnp.random.seed(42)\nX_train = np.random.randn(40, 2)\ny_train = (X_train[:, 0] > 0).astype(int)\nX_test = np.random.randn(20, 2)\ny_test = (X_test[:, 0] > 0).astype(int)\nmodel = LogisticRegression().fit(X_train, y_train)\nperm = permutation_importance(model, X_test, y_test, random_state=42)\nimportances_mean = perm.importances_mean\nprint(f'{importances_mean=}')\n",
      "solution": "from sklearn.inspection import permutation_importance\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nnp.random.seed(42)\nX_train = np.random.randn(40, 2)\ny_train = (X_train[:, 0] > 0).astype(int)\nX_test = np.random.randn(20, 2)\ny_test = (X_test[:, 0] > 0).astype(int)\nmodel = LogisticRegression().fit(X_train, y_train)\nperm = permutation_importance(model, X_test, y_test, random_state=42)\nimportances_mean = perm.importances_mean\nprint(f'{importances_mean=}')\n",
      "target": "importances_mean=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "importances_mean",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 10,
      "difficulty": "Hard",
      "category": "drift",
      "title": "Data Drift Detection using Kolmogorov-Smirnov Test",
      "desc": "Compare feature distributions between baseline and production data using scipy.stats.ks_2samp.",
      "prompt": "<strong>[Hard] Data Drift Detection using Kolmogorov-Smirnov Test</strong><p>Compute 2-sample KS test between <code>train_feature</code> and <code>prod_feature</code> using <code>res = ks_2samp(train_feature, prod_feature)</code>. Store p-value in <code>ks_pvalue</code> (as float).</p>",
      "starterCode": "from scipy.stats import ks_2samp\nimport numpy as np\n\nnp.random.seed(42)\ntrain_feature = np.random.normal(0, 1, 100)\nprod_feature = np.random.normal(0.8, 1, 100)  # Drifted mean\n\nks_pvalue = None\n",
      "ref": "from scipy.stats import ks_2samp\nimport numpy as np\n\nnp.random.seed(42)\ntrain_feature = np.random.normal(0, 1, 100)\nprod_feature = np.random.normal(0.8, 1, 100)\nres = ks_2samp(train_feature, prod_feature)\nks_pvalue = float(res.pvalue)\nprint(f'{ks_pvalue=}')\n",
      "solution": "from scipy.stats import ks_2samp\nimport numpy as np\n\nnp.random.seed(42)\ntrain_feature = np.random.normal(0, 1, 100)\nprod_feature = np.random.normal(0.8, 1, 100)\nres = ks_2samp(train_feature, prod_feature)\nks_pvalue = float(res.pvalue)\nprint(f'{ks_pvalue=}')\n",
      "target": "ks_pvalue=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "ks_pvalue",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "features",
      "title": "Clipping Outlier Extremes with np.clip",
      "desc": "Cap extreme distribution percentiles using np.clip to prevent leverage point domination.",
      "prompt": "<strong>[Medium] Clipping Outlier Extremes with np.clip</strong><p>Clip values in <code>raw_metrics</code> to interval <code>[10.0, 100.0]</code> and store in <code>clipped_metrics</code>.</p>",
      "starterCode": "import numpy as np\n\nraw_metrics = np.array([2.0, 15.0, 85.0, 999.0, -50.0])\nclipped_metrics = None\n",
      "ref": "import numpy as np\n\nraw_metrics = np.array([2.0, 15.0, 85.0, 999.0, -50.0])\nclipped_metrics = np.clip(raw_metrics, 10.0, 100.0)\nprint(f'{clipped_metrics=}')\n",
      "solution": "import numpy as np\n\nraw_metrics = np.array([2.0, 15.0, 85.0, 999.0, -50.0])\nclipped_metrics = np.clip(raw_metrics, 10.0, 100.0)\nprint(f'{clipped_metrics=}')\n",
      "target": "clipped_metrics=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "clipped_metrics",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 12,
      "difficulty": "Hard",
      "category": "tuning",
      "title": "RandomizedSearchCV for Efficient Parameter Space Search",
      "desc": "Perform 5 iterations of RandomizedSearchCV across hyperparameter distributions.",
      "prompt": "<strong>[Hard] RandomizedSearchCV for Efficient Search</strong><p>Instantiate <code>RandomizedSearchCV(estimator=LogisticRegression(), param_distributions={'C': [0.01, 0.1, 1.0, 10.0]}, n_iter=3, cv=3, random_state=42)</code>, fit on <code>X</code> and <code>y</code>, and store best score in <code>best_score</code>.</p>",
      "starterCode": "from sklearn.model_selection import RandomizedSearchCV\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6]])\ny = np.array([0, 0, 0, 1, 1, 1])\n\nbest_score = None\n",
      "ref": "from sklearn.model_selection import RandomizedSearchCV\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6]])\ny = np.array([0, 0, 0, 1, 1, 1])\nrs = RandomizedSearchCV(LogisticRegression(), {'C': [0.01, 0.1, 1.0, 10.0]}, n_iter=3, cv=3, random_state=42)\nrs.fit(X, y)\nbest_score = float(rs.best_score_)\nprint(f'{best_score=}')\n",
      "solution": "from sklearn.model_selection import RandomizedSearchCV\nfrom sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6]])\ny = np.array([0, 0, 0, 1, 1, 1])\nrs = RandomizedSearchCV(LogisticRegression(), {'C': [0.01, 0.1, 1.0, 10.0]}, n_iter=3, cv=3, random_state=42)\nrs.fit(X, y)\nbest_score = float(rs.best_score_)\nprint(f'{best_score=}')\n",
      "target": "best_score=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "best_score",
            "type": "float",
            "tolerance": 0.1
          }
        ]
      }
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Brier Score Probabilistic Calibration Metric",
      "desc": "Calculate Brier Score loss measuring accuracy of probabilistic predictions.",
      "prompt": "<strong>[Medium] Brier Score Probabilistic Calibration Metric</strong><p>Compute <code>brier = float(brier_score_loss(y_true, y_prob))</code>.</p>",
      "starterCode": "from sklearn.metrics import brier_score_loss\nimport numpy as np\n\ny_true = np.array([0, 1, 1, 0])\ny_prob = np.array([0.1, 0.9, 0.8, 0.2])\n\nbrier = None\n",
      "ref": "from sklearn.metrics import brier_score_loss\nimport numpy as np\n\ny_true = np.array([0, 1, 1, 0])\ny_prob = np.array([0.1, 0.9, 0.8, 0.2])\nbrier = float(brier_score_loss(y_true, y_prob))\nprint(f'{brier=}')\n",
      "solution": "from sklearn.metrics import brier_score_loss\nimport numpy as np\n\ny_true = np.array([0, 1, 1, 0])\ny_prob = np.array([0.1, 0.9, 0.8, 0.2])\nbrier = float(brier_score_loss(y_true, y_prob))\nprint(f'{brier=}')\n",
      "target": "brier=0.025\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "brier",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 14,
      "difficulty": "Easy",
      "category": "preprocessing",
      "title": "Count Frequency Encoding",
      "desc": "Replace categorical string values with their sample occurrence frequency counts.",
      "prompt": "<strong>[Easy] Count Frequency Encoding</strong><p>Given category list <code>cats = ['A', 'B', 'A', 'C', 'A', 'B']</code>, map each element to its total frequency count using a dictionary comprehension, storing array in <code>freq_encoded</code>.</p>",
      "starterCode": "cats = ['A', 'B', 'A', 'C', 'A', 'B']\nfreq_encoded = None\n",
      "ref": "from collections import Counter\ncats = ['A', 'B', 'A', 'C', 'A', 'B']\ncounts = Counter(cats)\nfreq_encoded = [counts[c] for c in cats]\nprint(f'{freq_encoded=}')\n",
      "solution": "from collections import Counter\ncats = ['A', 'B', 'A', 'C', 'A', 'B']\ncounts = Counter(cats)\nfreq_encoded = [counts[c] for c in cats]\nprint(f'{freq_encoded=}')\n",
      "target": "freq_encoded=[3, 2, 3, 1, 3, 2]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "freq_encoded",
            "type": "list"
          }
        ]
      }
    },
    {
      "id": 15,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Pipeline Feature Name Propagation",
      "desc": "Extract output transformed feature names from fitted ColumnTransformer.",
      "prompt": "<strong>[Hard] Pipeline Feature Name Propagation</strong><p>Given fitted <code>ColumnTransformer</code> <code>ct</code>, call <code>ct.get_feature_names_out()</code> and store the feature names list in <code>output_names</code>.</p>",
      "starterCode": "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler\nimport numpy as np\n\nX = np.array([[10.0, 20.0], [30.0, 40.0]])\nct = ColumnTransformer([('scale', StandardScaler(), [0, 1])]).fit(X)\n\noutput_names = None\n",
      "ref": "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler\nimport numpy as np\n\nX = np.array([[10.0, 20.0], [30.0, 40.0]])\nct = ColumnTransformer([('scale', StandardScaler(), [0, 1])]).fit(X)\noutput_names = list(ct.get_feature_names_out())\nprint(f'{output_names=}')\n",
      "solution": "from sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler\nimport numpy as np\n\nX = np.array([[10.0, 20.0], [30.0, 40.0]])\nct = ColumnTransformer([('scale', StandardScaler(), [0, 1])]).fit(X)\noutput_names = list(ct.get_feature_names_out())\nprint(f'{output_names=}')\n",
      "target": "output_names=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "output_names",
            "type": "list"
          }
        ]
      }
    },
    {
      "id": 16,
      "difficulty": "Medium",
      "category": "validation",
      "title": "StratifiedKFold Cross-Validation Splitter",
      "desc": "Instantiate StratifiedKFold cross-validator with n_splits=5 and shuffle=True.",
      "prompt": "<strong>[Medium] StratifiedKFold Cross-Validation Splitter</strong><p>Instantiate <code>cv_splitter = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)</code>.</p>",
      "starterCode": "from sklearn.model_selection import StratifiedKFold\n\ncv_splitter = None\n",
      "ref": "from sklearn.model_selection import StratifiedKFold\ncv_splitter = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nprint(f'{cv_splitter=}')\n",
      "solution": "from sklearn.model_selection import StratifiedKFold\ncv_splitter = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\nprint(f'{cv_splitter=}')\n",
      "target": "cv_splitter=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "cv_splitter"
          }
        ]
      }
    },
    {
      "id": 17,
      "difficulty": "Hard",
      "category": "serving",
      "title": "Batch Scoring Performance Benchmarking",
      "desc": "Measure batch inference prediction latency for 1000 simulated customer records.",
      "prompt": "<strong>[Hard] Batch Scoring Performance Benchmarking</strong><p>Predict for 1000 samples <code>batch_X</code> using <code>model</code> and store predictions in <code>batch_preds</code>.</p>",
      "starterCode": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nmodel = LogisticRegression().fit(np.array([[1], [2], [3], [4]]), [0, 0, 1, 1])\nbatch_X = np.ones((1000, 1)) * 2.5\n\nbatch_preds = None\n",
      "ref": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nmodel = LogisticRegression().fit(np.array([[1], [2], [3], [4]]), [0, 0, 1, 1])\nbatch_X = np.ones((1000, 1)) * 2.5\nbatch_preds = model.predict(batch_X)\nprint(f'{len(batch_preds)=}')\n",
      "solution": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nmodel = LogisticRegression().fit(np.array([[1], [2], [3], [4]]), [0, 0, 1, 1])\nbatch_X = np.ones((1000, 1)) * 2.5\nbatch_preds = model.predict(batch_X)\nprint(f'{len(batch_preds)=}')\n",
      "target": "len(batch_preds)=1000\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "batch_preds",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 18,
      "difficulty": "Easy",
      "category": "drift",
      "title": "Tracking Feature Mean Drift Over Time",
      "desc": "Calculate absolute percentage shift in feature mean between baseline and live batches.",
      "prompt": "<strong>[Easy] Tracking Feature Mean Drift Over Time</strong><p>Calculate absolute percentage shift <code>drift_pct = abs(live_mean - base_mean) / base_mean * 100.0</code>.</p>",
      "starterCode": "base_mean = 50.0\nlive_mean = 57.5\n\ndrift_pct = None\n",
      "ref": "base_mean = 50.0\nlive_mean = 57.5\ndrift_pct = abs(live_mean - base_mean) / base_mean * 100.0\nprint(f'{drift_pct=}')\n",
      "solution": "base_mean = 50.0\nlive_mean = 57.5\ndrift_pct = abs(live_mean - base_mean) / base_mean * 100.0\nprint(f'{drift_pct=}')\n",
      "target": "drift_pct=15.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "drift_pct",
            "type": "float",
            "value": 15
          }
        ]
      }
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "explainability",
      "title": "Model Coefficient Odds-Ratio Exponentiation",
      "desc": "Exponentiate logistic regression coefficients to obtain interpretable odds ratios.",
      "prompt": "<strong>[Hard] Model Coefficient Odds-Ratio Exponentiation</strong><p>Given logistic coefficients <code>coefs = np.array([0.5, -0.2, 1.2])</code>, compute odds ratios <code>odds_ratios = np.exp(coefs)</code>.</p>",
      "starterCode": "import numpy as np\n\ncoefs = np.array([0.5, -0.2, 1.2])\nodds_ratios = None\n",
      "ref": "import numpy as np\n\ncoefs = np.array([0.5, -0.2, 1.2])\nodds_ratios = np.exp(coefs)\nprint(f'{odds_ratios=}')\n",
      "solution": "import numpy as np\n\ncoefs = np.array([0.5, -0.2, 1.2])\nodds_ratios = np.exp(coefs)\nprint(f'{odds_ratios=}')\n",
      "target": "odds_ratios=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "odds_ratios",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "capstone",
      "title": "Master Production Capstone End-to-End Execution",
      "desc": "Complete end-to-end production data science pipeline: Split, Pipeline assembly, Cross-Validation, Fit, and Test AUC evaluation.",
      "prompt": "<strong>[Hard] Master Production Capstone End-to-End Execution</strong><p>Perform complete workflow: (1) Split <code>X</code>, <code>y</code> with <code>test_size=0.25</code>, <code>random_state=42</code>. (2) Build pipeline with <code>StandardScaler</code> and <code>LogisticRegression</code>. (3) Fit on train data. (4) Compute test set ROC-AUC in <code>capstone_auc</code>.</p>",
      "starterCode": "from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(80, 4)\ny = (X[:, 0] * 2 - X[:, 1] + X[:, 2] > 0).astype(int)\n\ncapstone_auc = None\n",
      "ref": "from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(80, 4)\ny = (X[:, 0] * 2 - X[:, 1] + X[:, 2] > 0).astype(int)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)\npipe = Pipeline([\n    ('scale', StandardScaler()),\n    ('model', LogisticRegression())\n])\npipe.fit(X_train, y_train)\nprobs = pipe.predict_proba(X_test)[:, 1]\ncapstone_auc = float(roc_auc_score(y_test, probs))\nprint(f'{capstone_auc=}')\n",
      "solution": "from sklearn.model_selection import train_test_split\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import roc_auc_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(80, 4)\ny = (X[:, 0] * 2 - X[:, 1] + X[:, 2] > 0).astype(int)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)\npipe = Pipeline([\n    ('scale', StandardScaler()),\n    ('model', LogisticRegression())\n])\npipe.fit(X_train, y_train)\nprobs = pipe.predict_proba(X_test)[:, 1]\ncapstone_auc = float(roc_auc_score(y_test, probs))\nprint(f'{capstone_auc=}')\n",
      "target": "capstone_auc=0.9\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "capstone_auc",
            "type": "float",
            "tolerance": 0.1
          }
        ]
      }
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "persistence",
      "title": "Joblib Module Function",
      "desc": "Serialization function name in joblib.",
      "prompt": "Store joblib serialization function name ('dump') in <code>t1_dump_fn = 'dump'</code>.",
      "starterCode": "",
      "ref": "t1_dump_fn = 'dump'\n",
      "solution": "t1_dump_fn = 'dump'\n",
      "target": "t1_dump_fn='dump'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t1_dump_fn",
            "type": "string",
            "value": "dump"
          }
        ]
      }
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "persistence",
      "title": "Joblib Deserialization Function",
      "desc": "Loading function name in joblib.",
      "prompt": "Store joblib loading function name ('load') in <code>t2_load_fn = 'load'</code>.",
      "starterCode": "",
      "ref": "t2_load_fn = 'load'\n",
      "solution": "t2_load_fn = 'load'\n",
      "target": "t2_load_fn='load'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t2_load_fn",
            "type": "string",
            "value": "load"
          }
        ]
      }
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "validation",
      "title": "Standard Cross-Validation Folds",
      "desc": "Default number of folds in scikit-learn cross_val_score.",
      "prompt": "Store default cross-validation fold count (5) in <code>t3_default_cv = 5</code>.",
      "starterCode": "",
      "ref": "t3_default_cv = 5\n",
      "solution": "t3_default_cv = 5\n",
      "target": "t3_default_cv=5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t3_default_cv",
            "type": "int",
            "value": 5
          }
        ]
      }
    },
    {
      "id": 4,
      "difficulty": "Medium",
      "category": "drift",
      "title": "Covariate Shift Definition",
      "desc": "Type of drift where input feature distribution shifts.",
      "prompt": "Store shift type ('Covariate Shift') in <code>t4_feature_drift = 'Covariate Shift'</code>.",
      "starterCode": "",
      "ref": "t4_feature_drift = 'Covariate Shift'\n",
      "solution": "t4_feature_drift = 'Covariate Shift'\n",
      "target": "t4_feature_drift='Covariate Shift'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t4_feature_drift",
            "type": "string",
            "value": "Covariate Shift"
          }
        ]
      }
    },
    {
      "id": 5,
      "difficulty": "Medium",
      "category": "drift",
      "title": "Concept Drift Definition",
      "desc": "Type of drift where feature-to-target relationship shifts.",
      "prompt": "Store shift type ('Concept Drift') in <code>t5_target_drift = 'Concept Drift'</code>.",
      "starterCode": "",
      "ref": "t5_target_drift = 'Concept Drift'\n",
      "solution": "t5_target_drift = 'Concept Drift'\n",
      "target": "t5_target_drift='Concept Drift'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t5_target_drift",
            "type": "string",
            "value": "Concept Drift"
          }
        ]
      }
    },
    {
      "id": 6,
      "difficulty": "Medium",
      "category": "explainability",
      "title": "Permutation Importance Method",
      "desc": "Library module providing permutation_importance.",
      "prompt": "Store module path ('sklearn.inspection') in <code>t6_perm_module = 'sklearn.inspection'</code>.",
      "starterCode": "",
      "ref": "t6_perm_module = 'sklearn.inspection'\n",
      "solution": "t6_perm_module = 'sklearn.inspection'\n",
      "target": "t6_perm_module='sklearn.inspection'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t6_perm_module",
            "type": "string",
            "value": "sklearn.inspection"
          }
        ]
      }
    },
    {
      "id": 7,
      "difficulty": "Hard",
      "category": "tuning",
      "title": "GridSearchCV Exhaustiveness",
      "desc": "Verify GridSearchCV tests Cartesian product of all parameters.",
      "prompt": "Store boolean flag confirming GridSearchCV tests all combinations: <code>t7_exhaustive = True</code>.",
      "starterCode": "",
      "ref": "t7_exhaustive = True\n",
      "solution": "t7_exhaustive = True\n",
      "target": "t7_exhaustive=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t7_exhaustive",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 8,
      "difficulty": "Medium",
      "category": "preprocessing",
      "title": "SimpleImputer Median Strategy",
      "desc": "Imputation strategy robust to outliers.",
      "prompt": "Store robust imputation strategy name ('median') in <code>t8_robust_imputer = 'median'</code>.",
      "starterCode": "",
      "ref": "t8_robust_imputer = 'median'\n",
      "solution": "t8_robust_imputer = 'median'\n",
      "target": "t8_robust_imputer='median'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t8_robust_imputer",
            "type": "string",
            "value": "median"
          }
        ]
      }
    },
    {
      "id": 9,
      "difficulty": "Hard",
      "category": "serving",
      "title": "Real-Time Inference Latency SLA",
      "desc": "Target latency ceiling in milliseconds for web inference.",
      "prompt": "Store target latency ceiling in ms (50) in <code>t9_latency_sla_ms = 50</code>.",
      "starterCode": "",
      "ref": "t9_latency_sla_ms = 50\n",
      "solution": "t9_latency_sla_ms = 50\n",
      "target": "t9_latency_sla_ms=50\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t9_latency_sla_ms",
            "type": "int",
            "value": 50
          }
        ]
      }
    },
    {
      "id": 10,
      "difficulty": "Easy",
      "category": "features",
      "title": "Log1p Handling Zero",
      "desc": "Mathematical value of np.log1p(0).",
      "prompt": "Store value of log1p(0) (0.0) in <code>t10_log_zero = 0.0</code>.",
      "starterCode": "",
      "ref": "t10_log_zero = 0.0\n",
      "solution": "t10_log_zero = 0.0\n",
      "target": "t10_log_zero=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t10_log_zero",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "tuning",
      "title": "RandomizedSearchCV Speed Advantage",
      "desc": "Budget control parameter in RandomizedSearchCV.",
      "prompt": "Store parameter name ('n_iter') in <code>t11_budget_param = 'n_iter'</code>.",
      "starterCode": "",
      "ref": "t11_budget_param = 'n_iter'\n",
      "solution": "t11_budget_param = 'n_iter'\n",
      "target": "t11_budget_param='n_iter'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t11_budget_param",
            "type": "string",
            "value": "n_iter"
          }
        ]
      }
    },
    {
      "id": 12,
      "difficulty": "Hard",
      "category": "metrics",
      "title": "Brier Score Perfect Prediction",
      "desc": "Brier score value for perfect probabilistic predictions.",
      "prompt": "Store perfect Brier score (0.0) in <code>t12_perfect_brier = 0.0</code>.",
      "starterCode": "",
      "ref": "t12_perfect_brier = 0.0\n",
      "solution": "t12_perfect_brier = 0.0\n",
      "target": "t12_perfect_brier=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t12_perfect_brier",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "persistence",
      "title": "Joblib vs Pickle Advantage",
      "desc": "Data structure optimized by joblib.",
      "prompt": "Store data structure name ('NumPy arrays') in <code>t13_joblib_target = 'NumPy arrays'</code>.",
      "starterCode": "",
      "ref": "t13_joblib_target = 'NumPy arrays'\n",
      "solution": "t13_joblib_target = 'NumPy arrays'\n",
      "target": "t13_joblib_target='NumPy arrays'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t13_joblib_target",
            "type": "string",
            "value": "NumPy arrays"
          }
        ]
      }
    },
    {
      "id": 14,
      "difficulty": "Hard",
      "category": "drift",
      "title": "Statistical Test for Numerical Drift",
      "desc": "Standard 2-sample distribution comparison test.",
      "prompt": "Store test abbreviation ('KS') in <code>t14_drift_test = 'KS'</code>.",
      "starterCode": "",
      "ref": "t14_drift_test = 'KS'\n",
      "solution": "t14_drift_test = 'KS'\n",
      "target": "t14_drift_test='KS'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t14_drift_test",
            "type": "string",
            "value": "KS"
          }
        ]
      }
    },
    {
      "id": 15,
      "difficulty": "Medium",
      "category": "validation",
      "title": "Shuffle Parameter in KFold",
      "desc": "Parameter ensuring randomized fold partitioning.",
      "prompt": "Store parameter name ('shuffle') in <code>t15_shuffle_param = 'shuffle'</code>.",
      "starterCode": "",
      "ref": "t15_shuffle_param = 'shuffle'\n",
      "solution": "t15_shuffle_param = 'shuffle'\n",
      "target": "t15_shuffle_param='shuffle'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t15_shuffle_param",
            "type": "string",
            "value": "shuffle"
          }
        ]
      }
    },
    {
      "id": 16,
      "difficulty": "Hard",
      "category": "explainability",
      "title": "Permutation Importance Shuffling",
      "desc": "Target being shuffled during permutation importance.",
      "prompt": "Store shuffled component ('feature column') in <code>t16_shuffled_target = 'feature column'</code>.",
      "starterCode": "",
      "ref": "t16_shuffled_target = 'feature column'\n",
      "solution": "t16_shuffled_target = 'feature column'\n",
      "target": "t16_shuffled_target='feature column'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t16_shuffled_target",
            "type": "string",
            "value": "feature column"
          }
        ]
      }
    },
    {
      "id": 17,
      "difficulty": "Easy",
      "category": "serving",
      "title": "Batch vs Real-Time Paradigm",
      "desc": "High-throughput overnight data processing paradigm.",
      "prompt": "Store paradigm name ('Batch') in <code>t17_overnight_mode = 'Batch'</code>.",
      "starterCode": "",
      "ref": "t17_overnight_mode = 'Batch'\n",
      "solution": "t17_overnight_mode = 'Batch'\n",
      "target": "t17_overnight_mode='Batch'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t17_overnight_mode",
            "type": "string",
            "value": "Batch"
          }
        ]
      }
    },
    {
      "id": 18,
      "difficulty": "Medium",
      "category": "features",
      "title": "Interaction Feature Definition",
      "desc": "Mathematical operation combining two independent features.",
      "prompt": "Store interaction operation ('multiplication') in <code>t18_interaction_op = 'multiplication'</code>.",
      "starterCode": "",
      "ref": "t18_interaction_op = 'multiplication'\n",
      "solution": "t18_interaction_op = 'multiplication'\n",
      "target": "t18_interaction_op='multiplication'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t18_interaction_op",
            "type": "string",
            "value": "multiplication"
          }
        ]
      }
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Pipeline Transformer Interface",
      "desc": "Method required for all intermediate pipeline transformers.",
      "prompt": "Store method name ('transform') in <code>t19_transformer_method = 'transform'</code>.",
      "starterCode": "",
      "ref": "t19_transformer_method = 'transform'\n",
      "solution": "t19_transformer_method = 'transform'\n",
      "target": "t19_transformer_method='transform'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t19_transformer_method",
            "type": "string",
            "value": "transform"
          }
        ]
      }
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Pipeline Estimator Interface",
      "desc": "Method required for final pipeline estimator.",
      "prompt": "Store method name ('predict') in <code>t20_estimator_method = 'predict'</code>.",
      "starterCode": "",
      "ref": "t20_estimator_method = 'predict'\n",
      "solution": "t20_estimator_method = 'predict'\n",
      "target": "t20_estimator_method='predict'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t20_estimator_method",
            "type": "string",
            "value": "predict"
          }
        ]
      }
    },
    {
      "id": 21,
      "difficulty": "Medium",
      "category": "drift",
      "title": "Drift Significance Threshold",
      "desc": "Standard p-value threshold rejecting null hypothesis of identical distributions.",
      "prompt": "Store standard alpha threshold (0.05) in <code>t21_alpha_thresh = 0.05</code>.",
      "starterCode": "",
      "ref": "t21_alpha_thresh = 0.05\n",
      "solution": "t21_alpha_thresh = 0.05\n",
      "target": "t21_alpha_thresh=0.05\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t21_alpha_thresh",
            "type": "float",
            "value": 0.05
          }
        ]
      }
    },
    {
      "id": 22,
      "difficulty": "Hard",
      "category": "tuning",
      "title": "Best Estimator Attribute",
      "desc": "Attribute storing optimal fitted model in GridSearchCV.",
      "prompt": "Store attribute name ('best_estimator_') in <code>t22_best_model_attr = 'best_estimator_'</code>.",
      "starterCode": "",
      "ref": "t22_best_model_attr = 'best_estimator_'\n",
      "solution": "t22_best_model_attr = 'best_estimator_'\n",
      "target": "t22_best_model_attr='best_estimator_'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t22_best_model_attr",
            "type": "string",
            "value": "best_estimator_"
          }
        ]
      }
    },
    {
      "id": 23,
      "difficulty": "Medium",
      "category": "features",
      "title": "Percentile Clipping Method",
      "desc": "Alternative name for feature clipping / trimming.",
      "prompt": "Store statistical term ('Winsorization') in <code>t23_clipping_term = 'Winsorization'</code>.",
      "starterCode": "",
      "ref": "t23_clipping_term = 'Winsorization'\n",
      "solution": "t23_clipping_term = 'Winsorization'\n",
      "target": "t23_clipping_term='Winsorization'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t23_clipping_term",
            "type": "string",
            "value": "Winsorization"
          }
        ]
      }
    },
    {
      "id": 24,
      "difficulty": "Hard",
      "category": "explainability",
      "title": "Logistic Odds Ratio Calculation",
      "desc": "Mathematical function applied to coefficients to compute odds ratios.",
      "prompt": "Store function name ('exp') in <code>t24_odds_fn = 'exp'</code>.",
      "starterCode": "",
      "ref": "t24_odds_fn = 'exp'\n",
      "solution": "t24_odds_fn = 'exp'\n",
      "target": "t24_odds_fn='exp'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t24_odds_fn",
            "type": "string",
            "value": "exp"
          }
        ]
      }
    },
    {
      "id": 25,
      "difficulty": "Hard",
      "category": "capstone",
      "title": "End-to-End Capstone Completion Flag",
      "desc": "Master 60-day curriculum completion flag.",
      "prompt": "Store completion confirmation flag: <code>t25_curriculum_complete = True</code>.",
      "starterCode": "",
      "ref": "t25_curriculum_complete = True\n",
      "solution": "t25_curriculum_complete = True\n",
      "target": "t25_curriculum_complete=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t25_curriculum_complete",
            "type": "bool",
            "value": true
          }
        ]
      }
    }
  ]
};
