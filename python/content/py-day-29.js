// Python Course Content — Day 29 (Classification Trees & Clustering Fundamentals)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay29'] = {
  "day": 29,
  "title": "Classification & Clustering",
  "topics": [
    "Classification Problem Formulation",
    "Logistic Regression Mechanics & Odds",
    "Decision Trees (Gini Impurity vs Entropy)",
    "Controlling Tree Overfitting (max_depth)",
    "Confusion Matrix & Performance Metrics",
    "Precision, Recall & F1-Score Trade-offs",
    "ROC Curves & AUC Evaluation",
    "Unsupervised K-Means Clustering",
    "Cluster Evaluation (Inertia & Silhouette)",
    "FAANG Classification & Clustering Interview Questions"
  ],
  "slides": [
    {
      "title": "Classification Trees & Clustering Fundamentals",
      "html": "\n        <!-- Section 01: Classification Formulation -->\n        <div class=\"slide-section\" id=\"day29Section01\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">01</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🎯</span> 01. Classification Problem Formulation (Discrete Decision Boundaries)</span>\n            </div>\n          </div>\n          <p>Unlike regression where the target $y$ is continuous (e.g. price, revenue), <strong>Classification</strong> maps feature inputs $X$ to discrete class labels $y \\in \\{0, 1\\}$ (binary) or $y \\in \\{0, 1, 2, \\dots, K-1\\}$ (multi-class). The model learns an optimal mathematical <strong>decision boundary</strong> separating classes in high-dimensional feature space.</p>\n\n          <div class=\"db-mock-table-wrap\">\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Task Type</th>\n                  <th>Target Space</th>\n                  <th>Output Type</th>\n                  <th>Standard Estimator</th>\n                  <th>Enterprise Scenario</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><code>Binary Classification</code></td>\n                  <td>${0, 1}$ (Two classes)</td>\n                  <td>Probability $P(y=1|X)$</td>\n                  <td><code>LogisticRegression</code></td>\n                  <td>Customer Churn (Will leave / Will stay)</td>\n                </tr>\n                <tr>\n                  <td><code>Multi-Class Classification</code></td>\n                  <td>${0, 1, 2, dots, K-1}$</td>\n                  <td>Probability Vector $sum P_k = 1$</td>\n                  <td><code>DecisionTreeClassifier</code></td>\n                  <td>Support Ticket Routing (Billing, Technical, Account)</td>\n                </tr>\n                <tr>\n                  <td><code>Unsupervised Clustering</code></td>\n                  <td>No ground-truth labels</td>\n                  <td>Cluster Cluster ID ($0 dots K-1$)</td>\n                  <td><code>KMeans</code></td>\n                  <td>RFM Customer Persona Discovery</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 02: Logistic Regression -->\n        <div class=\"slide-section\" id=\"day29Section02\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">02</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">📈</span> 02. Logistic Regression: Sigmoid Function &amp; Log-Odds</span>\n            </div>\n          </div>\n          <p>Logistic Regression applies the <strong>Standard Logistic (Sigmoid) Function</strong> $sigma(z) = \\frac{1}{1 + e^{-z}}$ to linear combinations of features, compressing output predictions strictly into the valid probabilistic interval $(0, 1)$.</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">logistic_workflow.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">from</span> sklearn.linear_model <span class=\"py-kw\">import</span> LogisticRegression\n<span class=\"py-kw\">import</span> numpy <span class=\"py-kw\">as</span> np\n\nX = np.array([[12], [18], [25], [32], [45], [52]])\ny = np.array([0, 0, 0, 1, 1, 1])\n\nclf = LogisticRegression()\nclf.fit(X, y)\n\n<span class=\"py-comment\"># predict() returns binary class label (threshold=0.5)</span>\nprint(f\"Predicted class: {clf.predict([[30]])}\")\n<span class=\"py-comment\"># predict_proba() returns [P(y=0), P(y=1)]</span>\nprint(f\"Probabilities: {clf.predict_proba([[30]])}\")</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- Section 03: Decision Trees -->\n        <div class=\"slide-section\" id=\"day29Section03\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">03</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🌲</span> 03. Decision Trees for Classification (Gini Impurity vs Entropy)</span>\n            </div>\n          </div>\n          <p>A Decision Tree recursively partitions feature space into orthogonal rectangular hyperplanes using a greedy top-down search. At every node, it chooses the feature and split threshold that maximizes <strong>Information Gain</strong> (reduces impurity).</p>\n\n          <div class=\"db-mock-table-wrap\">\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Impurity Criterion</th>\n                  <th>Mathematical Definition</th>\n                  <th>Computational Speed</th>\n                  <th>Behavior</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><code>Gini Impurity</code> (Default)</td>\n                  <td><code>G = 1 - Σ(p_i²)</code></td>\n                  <td>⚡ Fast (no log computation)</td>\n                  <td>Favors isolating the largest class into pure nodes quickly</td>\n                </tr>\n                <tr>\n                  <td><code>Entropy / Log Loss</code></td>\n                  <td><code>H = -Σ(p_i * log2(p_i))</code></td>\n                  <td>Moderate (computes logarithms)</td>\n                  <td>Tends to construct slightly more balanced tree structures</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 04: Controlling Overfitting -->\n        <div class=\"slide-section\" id=\"day29Section04\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">04</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🛡️</span> 04. Controlling Tree Overfitting (Pre-Pruning Hyperparameters)</span>\n            </div>\n          </div>\n          <p>Unconstrained decision trees will continue splitting until every leaf node contains a single sample ($100\\%$ training accuracy). This is catastrophic memorization of noise. We regularize trees via <strong>pre-pruning constraints</strong>.</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">pruned_tree.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">from</span> sklearn.tree <span class=\"py-kw\">import</span> DecisionTreeClassifier\n\n<span class=\"py-comment\"># Constrain tree depth and minimum sample thresholds</span>\ntree_clf = DecisionTreeClassifier(\n    max_depth=4,              <span class=\"py-comment\"># Limits tree depth to 4 levels</span>\n    min_samples_split=10,     <span class=\"py-comment\"># Requires at least 10 samples to consider a split</span>\n    min_samples_leaf=5,       <span class=\"py-comment\"># Every leaf must contain >= 5 samples</span>\n    random_state=42\n)</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- Section 05: Performance Metrics -->\n        <div class=\"slide-section\" id=\"day29Section05\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">05</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">📊</span> 05. The Confusion Matrix &amp; Classification Metrics</span>\n            </div>\n          </div>\n          <p>When evaluated on imbalanced data (e.g., $99\\%$ non-fraud vs $1\\%$ fraud), an algorithm predicting always $0$ achieves $99\\%$ accuracy while failing completely. We evaluate performance through the <strong>Confusion Matrix</strong>:</p>\n\n          <div class=\"db-mock-table-wrap\">\n            <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n              <thead>\n                <tr>\n                  <th>Actual \\ Predicted</th>\n                  <th>Predicted Positive (1)</th>\n                  <th>Predicted Negative (0)</th>\n                  <th>Metric Alignment</th>\n                </tr>\n              </thead>\n              <tbody>\n                <tr>\n                  <td><strong>Actual Positive (1)</strong></td>\n                  <td><code>True Positive (TP)</code></td>\n                  <td><code>False Negative (FN)</code> (Type II Error)</td>\n                  <td>Recall = TP / (TP + FN)</td>\n                </tr>\n                <tr>\n                  <td><strong>Actual Negative (0)</strong></td>\n                  <td><code>False Positive (FP)</code> (Type I Error)</td>\n                  <td><code>True Negative (TN)</code></td>\n                  <td>Specificity = TN / (TN + FP)</td>\n                </tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- Section 06: Precision vs Recall Trade-off -->\n        <div class=\"slide-section\" id=\"day29Section06\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">06</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">⚖️</span> 06. Precision, Recall &amp; F1-Score Trade-offs</span>\n            </div>\n          </div>\n          <p>No model can maximize both precision and recall simultaneously. Lowering decision thresholds captures more positives (higher recall) at the cost of more false alarms (lower precision).</p>\n          <ul>\n            <li><strong>Precision (Quality):</strong> Out of all predicted positives, how many were truly positive? <code>TP / (TP + FP)</code>. Crucial for Spam detection.</li>\n            <li><strong>Recall (Quantity):</strong> Out of all real positive cases, how many did we catch? <code>TP / (TP + FN)</code>. Crucial for Disease &amp; Fraud detection.</li>\n            <li><strong>F1-Score:</strong> Harmonic mean balancing precision and recall: <code>2 * (P * R) / (P + R)</code>.</li>\n          </ul>\n        </div>\n\n        <!-- Section 07: ROC Curves & AUC -->\n        <div class=\"slide-section\" id=\"day29Section07\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">07</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">📉</span> 07. ROC Curves &amp; AUC Evaluation</span>\n            </div>\n          </div>\n          <p>The <strong>Receiver Operating Characteristic (ROC)</strong> curve plots True Positive Rate (Recall) against False Positive Rate ($1 - \\text{Specificity}$) across all decision thresholds. The Area Under the Curve (<strong>AUC</strong>) summarizes classifier discrimination power:</p>\n          <ul>\n            <li><code>AUC = 1.0</code>: Perfect classification discrimination.</li>\n            <li><code>AUC = 0.5</code>: Worthless coin-flip random guessing.</li>\n            <li><code>AUC &lt; 0.5</code>: Inverted predictions.</li>\n          </ul>\n        </div>\n\n        <!-- Section 08: K-Means Clustering -->\n        <div class=\"slide-section\" id=\"day29Section08\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">08</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">👥</span> 08. Unsupervised K-Means Clustering Algorithm</span>\n            </div>\n          </div>\n          <p>K-Means partitions $N$ observations into $K$ mutually exclusive spherical clusters. Each cluster is parameterized by its arithmetic centroid $\\mu_k$.</p>\n\n          <div class=\"code-block-container\">\n            <div class=\"mac-titlebar\">\n              <div class=\"traffic-lights\">\n                <span class=\"traffic-dot dot-red\"></span>\n                <span class=\"traffic-dot dot-yellow\"></span>\n                <span class=\"traffic-dot dot-green\"></span>\n              </div>\n              <span class=\"mac-title\">kmeans_clustering.py</span>\n            </div>\n            <div class=\"code-subblock\">\n              <pre><code><span class=\"py-kw\">from</span> sklearn.cluster <span class=\"py-kw\">import</span> KMeans\n<span class=\"py-kw\">import</span> numpy <span class=\"py-kw\">as</span> np\n\nX = np.array([[1, 2], [1, 4], [1, 0], [10, 2], [10, 4], [10, 0]])\nkmeans = KMeans(n_clusters=2, random_state=42, n_init='auto')\ncluster_labels = kmeans.fit_predict(X)\nprint(f\"Cluster centroids:\\n{kmeans.cluster_centers_}\")\nprint(f\"Assigned labels: {cluster_labels}\")</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- Section 09: Cluster Evaluation -->\n        <div class=\"slide-section\" id=\"day29Section09\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">09</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">🔍</span> 09. Cluster Evaluation: Inertia, Elbow Method &amp; Silhouette Score</span>\n            </div>\n          </div>\n          <p>Because clustering is unsupervised, we evaluate partition compactness and separation without ground-truth labels:</p>\n          <ul>\n            <li><strong>Inertia (Within-Cluster Sum-of-Squares):</strong> Measures compactness. Decreases monotonically as $K$ increases. The <em>Elbow Method</em> looks for the bend point where diminishing returns set in.</li>\n            <li><strong>Silhouette Score:</strong> Measures how similar an object is to its own cluster compared to other clusters. Ranges from $-1.0$ (bad misassignment) to $+1.0$ (dense, distinct clusters).</li>\n          </ul>\n        </div>\n\n        <!-- Section 10: FAANG Interview Questions -->\n        <div class=\"slide-section\" id=\"day29Section10\">\n          <div class=\"heading-box-wrap\">\n            <span class=\"heading-num-box\">10</span>\n            <div class=\"heading-title-box\">\n              <span class=\"heading-title-text\"><span class=\"heading-icon\">💼</span> 10. 25 FAANG Classification &amp; Clustering Interview Questions</span>\n            </div>\n          </div>\n          <div class=\"py-keynotes-card\">\n            <h4>💡 High-Stakes ML Interview Prep:</h4>\n            <ul class=\"py-keynotes-list\">\n              <li><strong>Why do we standardize features before K-Means?</strong> K-Means computes Euclidean distances. If a feature has a wide numerical range, it dominates the distance metric, making other features completely irrelevant!</li>\n              <li><strong>What is the difference between Gini Impurity and Entropy?</strong> Both measure node impurity. Gini relies on squared probabilities and is faster to compute. Entropy uses logarithms and slightly penalizes impure nodes more heavily.</li>\n              <li><strong>How does class_weight='balanced' work in Logistic Regression?</strong> It automatically adjusts loss weights inversely proportional to class frequencies, preventing the majority class from overwhelming gradient updates.</li>\n            </ul>\n          </div>\n        </div>\n      "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "classification",
      "title": "Fitting a Logistic Regression Classifier",
      "desc": "Train a LogisticRegression model and predict binary class labels.",
      "prompt": "<strong>[Easy] Fitting a Logistic Regression Classifier</strong><p>Fit <code>LogisticRegression()</code> on <code>X</code> and <code>y</code>. Generate predictions on <code>X_test</code> and store them in <code>preds</code>.</p>",
      "starterCode": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[10], [20], [30], [80], [90], [100]])\ny = np.array([0, 0, 0, 1, 1, 1])\nX_test = np.array([[25], [85]])\n\npreds = None\n",
      "ref": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[10], [20], [30], [80], [90], [100]])\ny = np.array([0, 0, 0, 1, 1, 1])\nX_test = np.array([[25], [85]])\nclf = LogisticRegression()\nclf.fit(X, y)\npreds = clf.predict(X_test)\nprint(f'{preds=}')\n",
      "solution": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[10], [20], [30], [80], [90], [100]])\ny = np.array([0, 0, 0, 1, 1, 1])\nX_test = np.array([[25], [85]])\nclf = LogisticRegression()\nclf.fit(X, y)\npreds = clf.predict(X_test)\nprint(f'{preds=}')\n",
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
      "id": 2,
      "difficulty": "Easy",
      "category": "classification",
      "title": "Extracting Class Probabilities with predict_proba",
      "desc": "Extract predicted probabilities for the positive class (class 1).",
      "prompt": "<strong>[Easy] Extracting Class Probabilities with predict_proba</strong><p>Given trained <code>clf</code>, extract positive class probabilities for <code>X_test</code>: <code>pos_probs = clf.predict_proba(X_test)[:, 1]</code>.</p>",
      "starterCode": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [8], [9]])\ny = np.array([0, 0, 1, 1])\nclf = LogisticRegression().fit(X, y)\nX_test = np.array([[5]])\n\npos_probs = None\n",
      "ref": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [8], [9]])\ny = np.array([0, 0, 1, 1])\nclf = LogisticRegression().fit(X, y)\nX_test = np.array([[5]])\npos_probs = clf.predict_proba(X_test)[:, 1]\nprint(f'{pos_probs=}')\n",
      "solution": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [8], [9]])\ny = np.array([0, 0, 1, 1])\nclf = LogisticRegression().fit(X, y)\nX_test = np.array([[5]])\npos_probs = clf.predict_proba(X_test)[:, 1]\nprint(f'{pos_probs=}')\n",
      "target": "pos_probs=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "pos_probs",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "trees",
      "title": "DecisionTreeClassifier with max_depth Constraint",
      "desc": "Train a DecisionTreeClassifier with max_depth=3 to prevent overfitting.",
      "prompt": "<strong>[Easy] DecisionTreeClassifier with max_depth Constraint</strong><p>Train a <code>DecisionTreeClassifier(max_depth=3, random_state=42)</code> on <code>X</code> and <code>y</code>. Store the model in <code>tree_model</code>.</p>",
      "starterCode": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(20, 2)\ny = (X[:, 0] + X[:, 1] > 0).astype(int)\n\ntree_model = None\n",
      "ref": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(20, 2)\ny = (X[:, 0] + X[:, 1] > 0).astype(int)\ntree_model = DecisionTreeClassifier(max_depth=3, random_state=42)\ntree_model.fit(X, y)\nprint(f'{tree_model=}')\n",
      "solution": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(20, 2)\ny = (X[:, 0] + X[:, 1] > 0).astype(int)\ntree_model = DecisionTreeClassifier(max_depth=3, random_state=42)\ntree_model.fit(X, y)\nprint(f'{tree_model=}')\n",
      "target": "tree_model=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "tree_model"
          }
        ]
      }
    },
    {
      "id": 4,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Confusion Matrix Extraction",
      "desc": "Generate the 2x2 confusion matrix comparing ground truth to predictions.",
      "prompt": "<strong>[Medium] Confusion Matrix Extraction</strong><p>Compute <code>cm = confusion_matrix(y_true, y_pred)</code> and extract true negatives <code>tn = int(cm[0, 0])</code> and true positives <code>tp = int(cm[1, 1])</code>.</p>",
      "starterCode": "from sklearn.metrics import confusion_matrix\nimport numpy as np\n\ny_true = np.array([0, 1, 0, 1, 1, 0, 0, 1])\ny_pred = np.array([0, 1, 0, 0, 1, 0, 1, 1])\n\ncm = None\ntn = None\ntp = None\n",
      "ref": "from sklearn.metrics import confusion_matrix\nimport numpy as np\n\ny_true = np.array([0, 1, 0, 1, 1, 0, 0, 1])\ny_pred = np.array([0, 1, 0, 0, 1, 0, 1, 1])\ncm = confusion_matrix(y_true, y_pred)\ntn = int(cm[0, 0])\ntp = int(cm[1, 1])\nprint(f'{tn=}, {tp=}')\n",
      "solution": "from sklearn.metrics import confusion_matrix\nimport numpy as np\n\ny_true = np.array([0, 1, 0, 1, 1, 0, 0, 1])\ny_pred = np.array([0, 1, 0, 0, 1, 0, 1, 1])\ncm = confusion_matrix(y_true, y_pred)\ntn = int(cm[0, 0])\ntp = int(cm[1, 1])\nprint(f'{tn=}, {tp=}')\n",
      "target": "tn=3, tp=3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "tn",
            "type": "int",
            "value": 3
          },
          {
            "name": "tp",
            "type": "int",
            "value": 3
          }
        ]
      }
    },
    {
      "id": 5,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Precision, Recall and F1-Score Computation",
      "desc": "Calculate precision, recall, and harmonic F1-score on prediction outputs.",
      "prompt": "<strong>[Medium] Precision, Recall and F1-Score Computation</strong><p>Compute <code>precision</code>, <code>recall</code>, and <code>f1</code> between <code>y_true</code> and <code>y_pred</code> as floats.</p>",
      "starterCode": "from sklearn.metrics import precision_score, recall_score, f1_score\nimport numpy as np\n\ny_true = np.array([1, 1, 1, 1, 0, 0, 0, 0])\ny_pred = np.array([1, 1, 1, 0, 0, 0, 1, 0])\n\nprecision = None\nrecall = None\nf1 = None\n",
      "ref": "from sklearn.metrics import precision_score, recall_score, f1_score\nimport numpy as np\n\ny_true = np.array([1, 1, 1, 1, 0, 0, 0, 0])\ny_pred = np.array([1, 1, 1, 0, 0, 0, 1, 0])\nprecision = float(precision_score(y_true, y_pred))\nrecall = float(recall_score(y_true, y_pred))\nf1 = float(f1_score(y_true, y_pred))\nprint(f'{precision=}, {recall=}, {f1=}')\n",
      "solution": "from sklearn.metrics import precision_score, recall_score, f1_score\nimport numpy as np\n\ny_true = np.array([1, 1, 1, 1, 0, 0, 0, 0])\ny_pred = np.array([1, 1, 1, 0, 0, 0, 1, 0])\nprecision = float(precision_score(y_true, y_pred))\nrecall = float(recall_score(y_true, y_pred))\nf1 = float(f1_score(y_true, y_pred))\nprint(f'{precision=}, {recall=}, {f1=}')\n",
      "target": "precision=0.75, recall=0.75, f1=0.75\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "precision",
            "type": "float",
            "tolerance": 0.05
          },
          {
            "name": "recall",
            "type": "float",
            "tolerance": 0.05
          },
          {
            "name": "f1",
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
      "title": "ROC-AUC Score Discrimination Metric",
      "desc": "Calculate Area Under the ROC Curve for predicted probabilities.",
      "prompt": "<strong>[Medium] ROC-AUC Score Discrimination Metric</strong><p>Compute <code>roc_auc = float(roc_auc_score(y_true, y_scores))</code>.</p>",
      "starterCode": "from sklearn.metrics import roc_auc_score\nimport numpy as np\n\ny_true = np.array([0, 0, 1, 1])\ny_scores = np.array([0.1, 0.4, 0.65, 0.9])\n\nroc_auc = None\n",
      "ref": "from sklearn.metrics import roc_auc_score\nimport numpy as np\n\ny_true = np.array([0, 0, 1, 1])\ny_scores = np.array([0.1, 0.4, 0.65, 0.9])\nroc_auc = float(roc_auc_score(y_true, y_scores))\nprint(f'{roc_auc=}')\n",
      "solution": "from sklearn.metrics import roc_auc_score\nimport numpy as np\n\ny_true = np.array([0, 0, 1, 1])\ny_scores = np.array([0.1, 0.4, 0.65, 0.9])\nroc_auc = float(roc_auc_score(y_true, y_scores))\nprint(f'{roc_auc=}')\n",
      "target": "roc_auc=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "roc_auc",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 7,
      "difficulty": "Medium",
      "category": "clustering",
      "title": "Unsupervised K-Means Partitioning",
      "desc": "Fit KMeans with 3 clusters on 2D coordinates and extract cluster assignments.",
      "prompt": "<strong>[Medium] Unsupervised K-Means Partitioning</strong><p>Instantiate <code>KMeans(n_clusters=3, random_state=42, n_init='auto')</code>, fit on <code>coords</code>, and store cluster assignments in <code>cluster_labels</code>.</p>",
      "starterCode": "from sklearn.cluster import KMeans\nimport numpy as np\n\ncoords = np.array([\n    [1, 1], [1, 2], [2, 1],\n    [10, 10], [10, 11], [11, 10],\n    [20, 20], [20, 21], [21, 20]\n])\n\ncluster_labels = None\n",
      "ref": "from sklearn.cluster import KMeans\nimport numpy as np\n\ncoords = np.array([\n    [1, 1], [1, 2], [2, 1],\n    [10, 10], [10, 11], [11, 10],\n    [20, 20], [20, 21], [21, 20]\n])\nkmeans = KMeans(n_clusters=3, random_state=42, n_init='auto')\ncluster_labels = kmeans.fit_predict(coords)\nprint(f'{cluster_labels=}')\n",
      "solution": "from sklearn.cluster import KMeans\nimport numpy as np\n\ncoords = np.array([\n    [1, 1], [1, 2], [2, 1],\n    [10, 10], [10, 11], [11, 10],\n    [20, 20], [20, 21], [21, 20]\n])\nkmeans = KMeans(n_clusters=3, random_state=42, n_init='auto')\ncluster_labels = kmeans.fit_predict(coords)\nprint(f'{cluster_labels=}')\n",
      "target": "cluster_labels=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "cluster_labels",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 8,
      "difficulty": "Medium",
      "category": "clustering",
      "title": "K-Means Centroid Coordinates & Inertia",
      "desc": "Extract cluster centroids and within-cluster sum of squares inertia from fitted KMeans.",
      "prompt": "<strong>[Medium] K-Means Centroid Coordinates & Inertia</strong><p>Fit <code>KMeans(n_clusters=2, random_state=42, n_init='auto')</code> on <code>data</code>. Store centroids in <code>centers</code> and inertia in <code>inertia_val</code> (as float).</p>",
      "starterCode": "from sklearn.cluster import KMeans\nimport numpy as np\n\ndata = np.array([[2, 3], [3, 4], [8, 9], [9, 10]])\n\ncenters = None\ninertia_val = None\n",
      "ref": "from sklearn.cluster import KMeans\nimport numpy as np\n\ndata = np.array([[2, 3], [3, 4], [8, 9], [9, 10]])\nkm = KMeans(n_clusters=2, random_state=42, n_init='auto').fit(data)\ncenters = km.cluster_centers_\ninertia_val = float(km.inertia_)\nprint(f'{centers=}, {inertia_val=}')\n",
      "solution": "from sklearn.cluster import KMeans\nimport numpy as np\n\ndata = np.array([[2, 3], [3, 4], [8, 9], [9, 10]])\nkm = KMeans(n_clusters=2, random_state=42, n_init='auto').fit(data)\ncenters = km.cluster_centers_\ninertia_val = float(km.inertia_)\nprint(f'{centers=}, {inertia_val=}')\n",
      "target": "inertia_val=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "centers",
            "type": "array"
          },
          {
            "name": "inertia_val",
            "type": "float",
            "tolerance": 0.1
          }
        ]
      }
    },
    {
      "id": 9,
      "difficulty": "Hard",
      "category": "clustering",
      "title": "Evaluating Clusters with Silhouette Score",
      "desc": "Compute the silhouette coefficient score to quantify cluster separation.",
      "prompt": "<strong>[Hard] Evaluating Clusters with Silhouette Score</strong><p>Calculate <code>sil_score = float(silhouette_score(X, labels))</code>.</p>",
      "starterCode": "from sklearn.metrics import silhouette_score\nimport numpy as np\n\nX = np.array([[1, 2], [2, 2], [10, 10], [10, 11]])\nlabels = np.array([0, 0, 1, 1])\n\nsil_score = None\n",
      "ref": "from sklearn.metrics import silhouette_score\nimport numpy as np\n\nX = np.array([[1, 2], [2, 2], [10, 10], [10, 11]])\nlabels = np.array([0, 0, 1, 1])\nsil_score = float(silhouette_score(X, labels))\nprint(f'{sil_score=}')\n",
      "solution": "from sklearn.metrics import silhouette_score\nimport numpy as np\n\nX = np.array([[1, 2], [2, 2], [10, 10], [10, 11]])\nlabels = np.array([0, 0, 1, 1])\nsil_score = float(silhouette_score(X, labels))\nprint(f'{sil_score=}')\n",
      "target": "sil_score=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "sil_score",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 10,
      "difficulty": "Hard",
      "category": "trees",
      "title": "Feature Importance Extraction from DecisionTree",
      "desc": "Extract normalized feature importances from a trained DecisionTreeClassifier.",
      "prompt": "<strong>[Hard] Feature Importance Extraction from DecisionTree</strong><p>Train <code>DecisionTreeClassifier(random_state=42)</code> on <code>X</code> and <code>y</code>. Store feature importances in <code>importances</code> and identify index of top feature in <code>top_feature_idx</code> (integer).</p>",
      "starterCode": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.column_stack([np.random.randn(50), np.arange(50) * 2])  # Col 1 is highly predictive\ny = (X[:, 1] > 50).astype(int)\n\nimportances = None\ntop_feature_idx = None\n",
      "ref": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.column_stack([np.random.randn(50), np.arange(50) * 2])\ny = (X[:, 1] > 50).astype(int)\nclf = DecisionTreeClassifier(random_state=42).fit(X, y)\nimportances = clf.feature_importances_\ntop_feature_idx = int(np.argmax(importances))\nprint(f'{top_feature_idx=}')\n",
      "solution": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.column_stack([np.random.randn(50), np.arange(50) * 2])\ny = (X[:, 1] > 50).astype(int)\nclf = DecisionTreeClassifier(random_state=42).fit(X, y)\nimportances = clf.feature_importances_\ntop_feature_idx = int(np.argmax(importances))\nprint(f'{top_feature_idx=}')\n",
      "target": "top_feature_idx=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "importances",
            "type": "array"
          },
          {
            "name": "top_feature_idx",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "classification",
      "title": "Handling Imbalanced Data with class_weight='balanced'",
      "desc": "Fit LogisticRegression with balanced class weights on heavily imbalanced labels.",
      "prompt": "<strong>[Medium] Handling Imbalanced Data with class_weight='balanced'</strong><p>Train <code>LogisticRegression(class_weight='balanced')</code> on <code>X</code> and imbalanced <code>y</code>. Store model in <code>balanced_clf</code>.</p>",
      "starterCode": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6], [7], [8]])\ny = np.array([0, 0, 0, 0, 0, 0, 0, 1])  # 7:1 imbalance\n\nbalanced_clf = None\n",
      "ref": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6], [7], [8]])\ny = np.array([0, 0, 0, 0, 0, 0, 0, 1])\nbalanced_clf = LogisticRegression(class_weight='balanced').fit(X, y)\nprint(f'{balanced_clf=}')\n",
      "solution": "from sklearn.linear_model import LogisticRegression\nimport numpy as np\n\nX = np.array([[1], [2], [3], [4], [5], [6], [7], [8]])\ny = np.array([0, 0, 0, 0, 0, 0, 0, 1])\nbalanced_clf = LogisticRegression(class_weight='balanced').fit(X, y)\nprint(f'{balanced_clf=}')\n",
      "target": "balanced_clf=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "balanced_clf"
          }
        ]
      }
    },
    {
      "id": 12,
      "difficulty": "Hard",
      "category": "classification",
      "title": "Custom Probability Threshold Tuning",
      "desc": "Apply a custom decision threshold (e.g. 0.3) to predicted probabilities.",
      "prompt": "<strong>[Hard] Custom Probability Threshold Tuning</strong><p>Given positive probabilities <code>probs</code>, convert them into binary predictions using a conservative threshold of <code>0.30</code>: <code>custom_preds = (probs >= 0.30).astype(int)</code>.</p>",
      "starterCode": "import numpy as np\n\nprobs = np.array([0.15, 0.28, 0.32, 0.45, 0.88])\ncustom_preds = None\n",
      "ref": "import numpy as np\n\nprobs = np.array([0.15, 0.28, 0.32, 0.45, 0.88])\ncustom_preds = (probs >= 0.30).astype(int)\nprint(f'{custom_preds=}')\n",
      "solution": "import numpy as np\n\nprobs = np.array([0.15, 0.28, 0.32, 0.45, 0.88])\ncustom_preds = (probs >= 0.30).astype(int)\nprint(f'{custom_preds=}')\n",
      "target": "custom_preds=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "custom_preds",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 13,
      "difficulty": "Easy",
      "category": "metrics",
      "title": "Accuracy Score Computation",
      "desc": "Calculate classification accuracy between true labels and predictions.",
      "prompt": "<strong>[Easy] Accuracy Score Computation</strong><p>Compute <code>acc = float(accuracy_score(y_true, y_pred))</code>.</p>",
      "starterCode": "from sklearn.metrics import accuracy_score\nimport numpy as np\n\ny_true = np.array([0, 1, 1, 0, 1])\ny_pred = np.array([0, 1, 0, 0, 1])\nacc = None\n",
      "ref": "from sklearn.metrics import accuracy_score\nimport numpy as np\n\ny_true = np.array([0, 1, 1, 0, 1])\ny_pred = np.array([0, 1, 0, 0, 1])\nacc = float(accuracy_score(y_true, y_pred))\nprint(f'{acc=}')\n",
      "solution": "from sklearn.metrics import accuracy_score\nimport numpy as np\n\ny_true = np.array([0, 1, 1, 0, 1])\ny_pred = np.array([0, 1, 0, 0, 1])\nacc = float(accuracy_score(y_true, y_pred))\nprint(f'{acc=}')\n",
      "target": "acc=0.8\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "acc",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "clustering",
      "title": "Feature Standardization Before K-Means",
      "desc": "Apply StandardScaler prior to K-Means clustering to prevent feature magnitude dominance.",
      "prompt": "<strong>[Medium] Feature Standardization Before K-Means</strong><p>Standardize <code>raw_features</code> with <code>StandardScaler()</code>, then cluster into 2 groups with <code>KMeans(n_clusters=2, random_state=42, n_init='auto')</code>. Store labels in <code>std_labels</code>.</p>",
      "starterCode": "from sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nimport numpy as np\n\nraw_features = np.array([[20, 200000], [22, 210000], [50, 40000], [52, 42000]])\nstd_labels = None\n",
      "ref": "from sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nimport numpy as np\n\nraw_features = np.array([[20, 200000], [22, 210000], [50, 40000], [52, 42000]])\nscaled = StandardScaler().fit_transform(raw_features)\nstd_labels = KMeans(n_clusters=2, random_state=42, n_init='auto').fit_predict(scaled)\nprint(f'{std_labels=}')\n",
      "solution": "from sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\nimport numpy as np\n\nraw_features = np.array([[20, 200000], [22, 210000], [50, 40000], [52, 42000]])\nscaled = StandardScaler().fit_transform(raw_features)\nstd_labels = KMeans(n_clusters=2, random_state=42, n_init='auto').fit_predict(scaled)\nprint(f'{std_labels=}')\n",
      "target": "std_labels=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "std_labels",
            "type": "array"
          }
        ]
      }
    },
    {
      "id": 15,
      "difficulty": "Medium",
      "category": "trees",
      "title": "Entropy vs Gini Criterion Selection",
      "desc": "Instantiate DecisionTreeClassifier using the 'entropy' criterion.",
      "prompt": "<strong>[Medium] Entropy vs Gini Criterion Selection</strong><p>Train a <code>DecisionTreeClassifier(criterion='entropy', random_state=42)</code> on <code>X</code> and <code>y</code>. Store in <code>entropy_tree</code>.</p>",
      "starterCode": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nX = np.array([[1, 2], [2, 3], [3, 4], [4, 5]])\ny = np.array([0, 0, 1, 1])\nentropy_tree = None\n",
      "ref": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nX = np.array([[1, 2], [2, 3], [3, 4], [4, 5]])\ny = np.array([0, 0, 1, 1])\nentropy_tree = DecisionTreeClassifier(criterion='entropy', random_state=42).fit(X, y)\nprint(f'{entropy_tree=}')\n",
      "solution": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nX = np.array([[1, 2], [2, 3], [3, 4], [4, 5]])\ny = np.array([0, 0, 1, 1])\nentropy_tree = DecisionTreeClassifier(criterion='entropy', random_state=42).fit(X, y)\nprint(f'{entropy_tree=}')\n",
      "target": "entropy_tree=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "entropy_tree"
          }
        ]
      }
    },
    {
      "id": 16,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Pipeline Combining StandardScaler & LogisticRegression",
      "desc": "Assemble a pipeline with scaling and classification, evaluating test accuracy.",
      "prompt": "<strong>[Hard] Pipeline Combining StandardScaler & LogisticRegression</strong><p>Assemble <code>Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])</code>. Fit on <code>X_train</code>, <code>y_train</code> and evaluate test accuracy in <code>pipe_acc</code>.</p>",
      "starterCode": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\nimport numpy as np\n\nX_train = np.array([[10], [20], [80], [90]])\ny_train = np.array([0, 0, 1, 1])\nX_test = np.array([[15], [85]])\ny_test = np.array([0, 1])\n\npipe_acc = None\n",
      "ref": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\nimport numpy as np\n\nX_train = np.array([[10], [20], [80], [90]])\ny_train = np.array([0, 0, 1, 1])\nX_test = np.array([[15], [85]])\ny_test = np.array([0, 1])\npipe = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])\npipe.fit(X_train, y_train)\npipe_acc = float(accuracy_score(y_test, pipe.predict(X_test)))\nprint(f'{pipe_acc=}')\n",
      "solution": "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\nimport numpy as np\n\nX_train = np.array([[10], [20], [80], [90]])\ny_train = np.array([0, 0, 1, 1])\nX_test = np.array([[15], [85]])\ny_test = np.array([0, 1])\npipe = Pipeline([('scaler', StandardScaler()), ('clf', LogisticRegression())])\npipe.fit(X_train, y_train)\npipe_acc = float(accuracy_score(y_test, pipe.predict(X_test)))\nprint(f'{pipe_acc=}')\n",
      "target": "pipe_acc=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "pipe_acc",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 17,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Classification Report Dictionary Parsing",
      "desc": "Generate classification report dictionary and extract macro average F1-score.",
      "prompt": "<strong>[Medium] Classification Report Dictionary Parsing</strong><p>Compute <code>report = classification_report(y_true, y_pred, output_dict=True)</code> and extract <code>macro_f1 = float(report['macro avg']['f1-score'])</code>.</p>",
      "starterCode": "from sklearn.metrics import classification_report\nimport numpy as np\n\ny_true = np.array([0, 1, 0, 1])\ny_pred = np.array([0, 1, 1, 1])\n\nmacro_f1 = None\n",
      "ref": "from sklearn.metrics import classification_report\nimport numpy as np\n\ny_true = np.array([0, 1, 0, 1])\ny_pred = np.array([0, 1, 1, 1])\nreport = classification_report(y_true, y_pred, output_dict=True)\nmacro_f1 = float(report['macro avg']['f1-score'])\nprint(f'{macro_f1=}')\n",
      "solution": "from sklearn.metrics import classification_report\nimport numpy as np\n\ny_true = np.array([0, 1, 0, 1])\ny_pred = np.array([0, 1, 1, 1])\nreport = classification_report(y_true, y_pred, output_dict=True)\nmacro_f1 = float(report['macro avg']['f1-score'])\nprint(f'{macro_f1=}')\n",
      "target": "macro_f1=0.733\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "macro_f1",
            "type": "float",
            "tolerance": 0.05
          }
        ]
      }
    },
    {
      "id": 18,
      "difficulty": "Hard",
      "category": "trees",
      "title": "DecisionTree min_samples_split Regularization",
      "desc": "Constrain split generation by requiring at least 15 samples per split.",
      "prompt": "<strong>[Hard] DecisionTree min_samples_split Regularization</strong><p>Train <code>DecisionTreeClassifier(min_samples_split=15, random_state=42)</code> on <code>X</code> and <code>y</code>. Store model in <code>min_split_tree</code>.</p>",
      "starterCode": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(30, 2)\ny = (X[:, 0] > 0).astype(int)\n\nmin_split_tree = None\n",
      "ref": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(30, 2)\ny = (X[:, 0] > 0).astype(int)\nmin_split_tree = DecisionTreeClassifier(min_samples_split=15, random_state=42).fit(X, y)\nprint(f'{min_split_tree=}')\n",
      "solution": "from sklearn.tree import DecisionTreeClassifier\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(30, 2)\ny = (X[:, 0] > 0).astype(int)\nmin_split_tree = DecisionTreeClassifier(min_samples_split=15, random_state=42).fit(X, y)\nprint(f'{min_split_tree=}')\n",
      "target": "min_split_tree=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "min_split_tree"
          }
        ]
      }
    },
    {
      "id": 19,
      "difficulty": "Medium",
      "category": "clustering",
      "title": "Predicting Cluster for Novel Unseen Sample",
      "desc": "Assign a new observation to its nearest pre-trained K-Means centroid.",
      "prompt": "<strong>[Medium] Predicting Cluster for Novel Unseen Sample</strong><p>Given trained <code>kmeans</code>, predict cluster ID for novel sample <code>new_point = np.array([[12, 12]])</code> and store integer cluster ID in <code>assigned_cluster</code>.</p>",
      "starterCode": "from sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.array([[1, 1], [2, 2], [10, 10], [11, 11]])\nkmeans = KMeans(n_clusters=2, random_state=42, n_init='auto').fit(X)\n\nnew_point = np.array([[12, 12]])\nassigned_cluster = None\n",
      "ref": "from sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.array([[1, 1], [2, 2], [10, 10], [11, 11]])\nkmeans = KMeans(n_clusters=2, random_state=42, n_init='auto').fit(X)\nnew_point = np.array([[12, 12]])\nassigned_cluster = int(kmeans.predict(new_point)[0])\nprint(f'{assigned_cluster=}')\n",
      "solution": "from sklearn.cluster import KMeans\nimport numpy as np\n\nX = np.array([[1, 1], [2, 2], [10, 10], [11, 11]])\nkmeans = KMeans(n_clusters=2, random_state=42, n_init='auto').fit(X)\nnew_point = np.array([[12, 12]])\nassigned_cluster = int(kmeans.predict(new_point)[0])\nprint(f'{assigned_cluster=}')\n",
      "target": "assigned_cluster=\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "assigned_cluster",
            "type": "int"
          }
        ]
      }
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "capstone",
      "title": "End-to-End Customer Churn Classification Benchmark",
      "desc": "Complete classification capstone: Stratified split, DecisionTree training, and test F1-score evaluation.",
      "prompt": "<strong>[Hard] End-to-End Customer Churn Classification Benchmark</strong><p>Perform complete workflow: (1) Split <code>X</code>, <code>y</code> with <code>test_size=0.3</code>, <code>stratify=y</code>, <code>random_state=42</code>. (2) Train <code>DecisionTreeClassifier(max_depth=4, random_state=42)</code>. (3) Evaluate test set F1-score in <code>final_f1</code>.</p>",
      "starterCode": "from sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import f1_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(100, 4)\ny = (X[:, 0] * 2 - X[:, 1] + X[:, 2] > 0.5).astype(int)\n\nfinal_f1 = None\n",
      "ref": "from sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import f1_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(100, 4)\ny = (X[:, 0] * 2 - X[:, 1] + X[:, 2] > 0.5).astype(int)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y, random_state=42)\nclf = DecisionTreeClassifier(max_depth=4, random_state=42).fit(X_train, y_train)\nfinal_f1 = float(f1_score(y_test, clf.predict(X_test)))\nprint(f'{final_f1=}')\n",
      "solution": "from sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import f1_score\nimport numpy as np\n\nnp.random.seed(42)\nX = np.random.randn(100, 4)\ny = (X[:, 0] * 2 - X[:, 1] + X[:, 2] > 0.5).astype(int)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, stratify=y, random_state=42)\nclf = DecisionTreeClassifier(max_depth=4, random_state=42).fit(X_train, y_train)\nfinal_f1 = float(f1_score(y_test, clf.predict(X_test)))\nprint(f'{final_f1=}')\n",
      "target": "final_f1=0.75\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "final_f1",
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
      "category": "classification",
      "title": "Sigmoid Range Lower Bound",
      "desc": "Lower bound of standard logistic sigmoid function.",
      "prompt": "Store theoretical lower limit of sigmoid function (0.0) in <code>t1_sigmoid_min = 0.0</code>.",
      "starterCode": "",
      "ref": "t1_sigmoid_min = 0.0\n",
      "solution": "t1_sigmoid_min = 0.0\n",
      "target": "t1_sigmoid_min=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t1_sigmoid_min",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "classification",
      "title": "Sigmoid Range Upper Bound",
      "desc": "Upper bound of standard logistic sigmoid function.",
      "prompt": "Store theoretical upper limit of sigmoid function (1.0) in <code>t2_sigmoid_max = 1.0</code>.",
      "starterCode": "",
      "ref": "t2_sigmoid_max = 1.0\n",
      "solution": "t2_sigmoid_max = 1.0\n",
      "target": "t2_sigmoid_max=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t2_sigmoid_max",
            "type": "float",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "trees",
      "title": "Default Tree Criterion",
      "desc": "Default split criterion used by DecisionTreeClassifier in scikit-learn.",
      "prompt": "Store default criterion name ('gini') in <code>t3_tree_criterion = 'gini'</code>.",
      "starterCode": "",
      "ref": "t3_tree_criterion = 'gini'\n",
      "solution": "t3_tree_criterion = 'gini'\n",
      "target": "t3_tree_criterion='gini'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t3_tree_criterion",
            "type": "string",
            "value": "gini"
          }
        ]
      }
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "clustering",
      "title": "K-Means Learning Paradigm",
      "desc": "Identify whether K-Means is supervised or unsupervised.",
      "prompt": "Store learning type ('unsupervised') in <code>t4_kmeans_paradigm = 'unsupervised'</code>.",
      "starterCode": "",
      "ref": "t4_kmeans_paradigm = 'unsupervised'\n",
      "solution": "t4_kmeans_paradigm = 'unsupervised'\n",
      "target": "t4_kmeans_paradigm='unsupervised'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t4_kmeans_paradigm",
            "type": "string",
            "value": "unsupervised"
          }
        ]
      }
    },
    {
      "id": 5,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Precision Denominator Components",
      "desc": "Identify false alert term in precision denominator (TP + FP).",
      "prompt": "Store false positive abbreviation ('FP') in <code>t5_precision_denom = 'FP'</code>.",
      "starterCode": "",
      "ref": "t5_precision_denom = 'FP'\n",
      "solution": "t5_precision_denom = 'FP'\n",
      "target": "t5_precision_denom='FP'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t5_precision_denom",
            "type": "string",
            "value": "FP"
          }
        ]
      }
    },
    {
      "id": 6,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Recall Denominator Components",
      "desc": "Identify missed detection term in recall denominator (TP + FN).",
      "prompt": "Store false negative abbreviation ('FN') in <code>t6_recall_denom = 'FN'</code>.",
      "starterCode": "",
      "ref": "t6_recall_denom = 'FN'\n",
      "solution": "t6_recall_denom = 'FN'\n",
      "target": "t6_recall_denom='FN'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t6_recall_denom",
            "type": "string",
            "value": "FN"
          }
        ]
      }
    },
    {
      "id": 7,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "F1 Mean Type",
      "desc": "Type of mean used to compute F1-score.",
      "prompt": "Store mean type ('harmonic') in <code>t7_f1_mean_type = 'harmonic'</code>.",
      "starterCode": "",
      "ref": "t7_f1_mean_type = 'harmonic'\n",
      "solution": "t7_f1_mean_type = 'harmonic'\n",
      "target": "t7_f1_mean_type='harmonic'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t7_f1_mean_type",
            "type": "string",
            "value": "harmonic"
          }
        ]
      }
    },
    {
      "id": 8,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Random Guessing ROC-AUC",
      "desc": "Expected ROC-AUC score of random coin flip guessing.",
      "prompt": "Store random guessing AUC score (0.5) in <code>t8_random_auc = 0.5</code>.",
      "starterCode": "",
      "ref": "t8_random_auc = 0.5\n",
      "solution": "t8_random_auc = 0.5\n",
      "target": "t8_random_auc=0.5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t8_random_auc",
            "type": "float",
            "value": 0.5
          }
        ]
      }
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Perfect Classifier ROC-AUC",
      "desc": "Maximum theoretical ROC-AUC score.",
      "prompt": "Store maximum theoretical AUC score (1.0) in <code>t9_max_auc = 1.0</code>.",
      "starterCode": "",
      "ref": "t9_max_auc = 1.0\n",
      "solution": "t9_max_auc = 1.0\n",
      "target": "t9_max_auc=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t9_max_auc",
            "type": "float",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 10,
      "difficulty": "Hard",
      "category": "clustering",
      "title": "Silhouette Score Upper Bound",
      "desc": "Maximum theoretical value for Silhouette Coefficient.",
      "prompt": "Store maximum silhouette score (1.0) in <code>t10_max_silhouette = 1.0</code>.",
      "starterCode": "",
      "ref": "t10_max_silhouette = 1.0\n",
      "solution": "t10_max_silhouette = 1.0\n",
      "target": "t10_max_silhouette=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t10_max_silhouette",
            "type": "float",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 11,
      "difficulty": "Hard",
      "category": "clustering",
      "title": "Silhouette Score Lower Bound",
      "desc": "Minimum theoretical value for Silhouette Coefficient.",
      "prompt": "Store minimum silhouette score (-1.0) in <code>t11_min_silhouette = -1.0</code>.",
      "starterCode": "",
      "ref": "t11_min_silhouette = -1.0\n",
      "solution": "t11_min_silhouette = -1.0\n",
      "target": "t11_min_silhouette=-1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t11_min_silhouette",
            "type": "float",
            "value": -1
          }
        ]
      }
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "trees",
      "title": "Pruning Hyperparameter",
      "desc": "Core hyperparameter limiting tree depth.",
      "prompt": "Store hyperparameter name ('max_depth') in <code>t12_depth_param = 'max_depth'</code>.",
      "starterCode": "",
      "ref": "t12_depth_param = 'max_depth'\n",
      "solution": "t12_depth_param = 'max_depth'\n",
      "target": "t12_depth_param='max_depth'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t12_depth_param",
            "type": "string",
            "value": "max_depth"
          }
        ]
      }
    },
    {
      "id": 13,
      "difficulty": "Easy",
      "category": "classification",
      "title": "Default Decision Threshold",
      "desc": "Standard binary classification probability threshold.",
      "prompt": "Store default probability threshold (0.5) in <code>t13_default_thresh = 0.5</code>.",
      "starterCode": "",
      "ref": "t13_default_thresh = 0.5\n",
      "solution": "t13_default_thresh = 0.5\n",
      "target": "t13_default_thresh=0.5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t13_default_thresh",
            "type": "float",
            "value": 0.5
          }
        ]
      }
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "clustering",
      "title": "K-Means Centroid Count",
      "desc": "Parameter specifying number of clusters in KMeans.",
      "prompt": "Store parameter name ('n_clusters') in <code>t14_cluster_param = 'n_clusters'</code>.",
      "starterCode": "",
      "ref": "t14_cluster_param = 'n_clusters'\n",
      "solution": "t14_cluster_param = 'n_clusters'\n",
      "target": "t14_cluster_param='n_clusters'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t14_cluster_param",
            "type": "string",
            "value": "n_clusters"
          }
        ]
      }
    },
    {
      "id": 15,
      "difficulty": "Hard",
      "category": "metrics",
      "title": "Type I Error Definition",
      "desc": "Statistical name for False Positive error.",
      "prompt": "Store Type I error term ('False Positive') in <code>t15_type1_error = 'False Positive'</code>.",
      "starterCode": "",
      "ref": "t15_type1_error = 'False Positive'\n",
      "solution": "t15_type1_error = 'False Positive'\n",
      "target": "t15_type1_error='False Positive'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t15_type1_error",
            "type": "string",
            "value": "False Positive"
          }
        ]
      }
    },
    {
      "id": 16,
      "difficulty": "Hard",
      "category": "metrics",
      "title": "Type II Error Definition",
      "desc": "Statistical name for False Negative error.",
      "prompt": "Store Type II error term ('False Negative') in <code>t16_type2_error = 'False Negative'</code>.",
      "starterCode": "",
      "ref": "t16_type2_error = 'False Negative'\n",
      "solution": "t16_type2_error = 'False Negative'\n",
      "target": "t16_type2_error='False Negative'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t16_type2_error",
            "type": "string",
            "value": "False Negative"
          }
        ]
      }
    },
    {
      "id": 17,
      "difficulty": "Medium",
      "category": "clustering",
      "title": "Inertia Monotonicity with K",
      "desc": "Check if within-cluster sum of squares decreases as K increases.",
      "prompt": "Store boolean flag verifying inertia decreases with K: <code>t17_inertia_decreases = True</code>.",
      "starterCode": "",
      "ref": "t17_inertia_decreases = True\n",
      "solution": "t17_inertia_decreases = True\n",
      "target": "t17_inertia_decreases=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t17_inertia_decreases",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 18,
      "difficulty": "Hard",
      "category": "trees",
      "title": "Leaf Purity Gini",
      "desc": "Gini impurity of a perfectly pure node containing only one class.",
      "prompt": "Store Gini impurity of pure node (0.0) in <code>t18_pure_gini = 0.0</code>.",
      "starterCode": "",
      "ref": "t18_pure_gini = 0.0\n",
      "solution": "t18_pure_gini = 0.0\n",
      "target": "t18_pure_gini=0.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t18_pure_gini",
            "type": "float",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "trees",
      "title": "Max Impurity Binary Gini",
      "desc": "Maximum Gini impurity of a 50/50 binary split.",
      "prompt": "Store maximum binary Gini impurity (0.5) in <code>t19_max_binary_gini = 0.5</code>.",
      "starterCode": "",
      "ref": "t19_max_binary_gini = 0.5\n",
      "solution": "t19_max_binary_gini = 0.5\n",
      "target": "t19_max_binary_gini=0.5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t19_max_binary_gini",
            "type": "float",
            "value": 0.5
          }
        ]
      }
    },
    {
      "id": 20,
      "difficulty": "Medium",
      "category": "classification",
      "title": "Multi-Class Strategy",
      "desc": "Default multi-class strategy for LogisticRegression in scikit-learn.",
      "prompt": "Store multi-class parameter default ('auto') in <code>t20_multiclass_mode = 'auto'</code>.",
      "starterCode": "",
      "ref": "t20_multiclass_mode = 'auto'\n",
      "solution": "t20_multiclass_mode = 'auto'\n",
      "target": "t20_multiclass_mode='auto'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t20_multiclass_mode",
            "type": "string",
            "value": "auto"
          }
        ]
      }
    },
    {
      "id": 21,
      "difficulty": "Hard",
      "category": "clustering",
      "title": "Elbow Method Graphic Type",
      "desc": "Metric plotted on Y-axis of Elbow Method curve.",
      "prompt": "Store metric name ('Inertia') in <code>t21_elbow_metric = 'Inertia'</code>.",
      "starterCode": "",
      "ref": "t21_elbow_metric = 'Inertia'\n",
      "solution": "t21_elbow_metric = 'Inertia'\n",
      "target": "t21_elbow_metric='Inertia'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t21_elbow_metric",
            "type": "string",
            "value": "Inertia"
          }
        ]
      }
    },
    {
      "id": 22,
      "difficulty": "Medium",
      "category": "metrics",
      "title": "Specificity Formula Alignment",
      "desc": "Name for True Negative Rate.",
      "prompt": "Store metric name ('Specificity') in <code>t22_tnr_name = 'Specificity'</code>.",
      "starterCode": "",
      "ref": "t22_tnr_name = 'Specificity'\n",
      "solution": "t22_tnr_name = 'Specificity'\n",
      "target": "t22_tnr_name='Specificity'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t22_tnr_name",
            "type": "string",
            "value": "Specificity"
          }
        ]
      }
    },
    {
      "id": 23,
      "difficulty": "Hard",
      "category": "clustering",
      "title": "KMeans Initialization Strategy",
      "desc": "Default smart centroid initialization algorithm in scikit-learn.",
      "prompt": "Store initialization method name ('k-means++') in <code>t23_init_method = 'k-means++'</code>.",
      "starterCode": "",
      "ref": "t23_init_method = 'k-means++'\n",
      "solution": "t23_init_method = 'k-means++'\n",
      "target": "t23_init_method='k-means++'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t23_init_method",
            "type": "string",
            "value": "k-means++"
          }
        ]
      }
    },
    {
      "id": 24,
      "difficulty": "Medium",
      "category": "trees",
      "title": "Feature Importance Sum",
      "desc": "Sum of feature importances in a decision tree.",
      "prompt": "Store total sum of feature importances (1.0) in <code>t24_sum_importances = 1.0</code>.",
      "starterCode": "",
      "ref": "t24_sum_importances = 1.0\n",
      "solution": "t24_sum_importances = 1.0\n",
      "target": "t24_sum_importances=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t24_sum_importances",
            "type": "float",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 25,
      "difficulty": "Hard",
      "category": "classification",
      "title": "Cost-Sensitive Loss Parameter",
      "desc": "Parameter handling class imbalance in DecisionTreeClassifier.",
      "prompt": "Store parameter name ('class_weight') in <code>t25_imbalance_param = 'class_weight'</code>.",
      "starterCode": "",
      "ref": "t25_imbalance_param = 'class_weight'\n",
      "solution": "t25_imbalance_param = 'class_weight'\n",
      "target": "t25_imbalance_param='class_weight'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t25_imbalance_param",
            "type": "string",
            "value": "class_weight"
          }
        ]
      }
    }
  ]
};
