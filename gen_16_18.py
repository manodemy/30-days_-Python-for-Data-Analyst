"""Generate Days 16 to 18."""
from nb_helpers import *
import os

def build_day16():
    S = []
    
    S.append((
        SH(1,"Classes & Objects","Modeling the World") + '\n\n' +
        WH("Object-Oriented Programming (OOP) groups data (<b>attributes</b>) and behavior (<b>methods</b>) into a single template called a <b>Class</b>. When you create a specific instance of that class, it is called an <b>Object</b>.") + '\n\n' +
        "```python\nclass User:\n    pass\n\nalice = User() # Create an object (instance)\n```\n\n" +
        WC([("Code Organization","Bundling messy API connection variables and functions into a clean `APIClient` class"),
            ("Data Modeling","Creating a `DataRow` class that knows how to clean its own data")]) + '\n\n' +
        PF("Over-engineering","Don't use OOP if a simple dictionary and a function will do the job. Python supports both functional and OOP paradigms. Use OOP when you need to manage complex <b>state</b>."),
        "class Customer:\n    # A basic class\n    pass\n\n# Create two distinct objects\nc1 = Customer()\nc2 = Customer()\n\n# Add attributes dynamically (not recommended, but possible)\nc1.name = \"Alice\"\nc2.name = \"Bob\"\n\nprint(f\"C1: {c1.name}\")\nprint(f\"C2: {c2.name}\")\nprint(c1 == c2) # False, they are distinct objects in memory\n",
        "Classes",
        [
            '### **Q1.** Define a class `Car`. Create two instances, `car1` and `car2`.\n',
            '### **Q2.** Assign a `color` attribute to `car1` (e.g., `"Red"`). Print it.\n',
            '### **Q3.** Try to access the `color` attribute on `car2`. Catch the `AttributeError`.\n',
            '### **Q4.** Print the `type()` of `car1`. What does it say?\n',
            '### **Q5.** Explain the difference between a Class and an Object using a real-world analogy.\n',
        ]
    ))
    
    S.append((
        SH(2,"__init__ and self","The Constructor") + '\n\n' +
        WH("To set up an object properly when it is created, we use the <b>constructor method</b>: <code>__init__</code>. The first parameter of EVERY method must be <code>self</code>, which refers to the specific object being manipulated.") + '\n\n' +
        "```python\nclass User:\n    def __init__(self, name, age):\n        self.name = name  # Attribute assignment\n        self.age = age\n\nalice = User('Alice', 25) # __init__ is called automatically\n```\n\n" +
        WC([("Initialization","Ensuring a database connection object immediately connects when instantiated"),
            ("State Management","Tracking variables like `self.is_logged_in` across different method calls")]) + '\n\n' +
        PT("Dunder methods (like <code>__init__</code>, with double underscores) are 'magic methods' that Python calls automatically behind the scenes. You rarely call them directly."),
        "class Product:\n    # The constructor\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n        self.in_stock = True  # Default state\n        \n    # An instance method\n    def apply_discount(self, percent):\n        self.price = self.price * (1 - percent)\n        print(f\"{self.name} discounted to {self.price}\")\n\n# Instantiate and use\nlaptop = Product(\"MacBook\", 1000)\nlaptop.apply_discount(0.20)\nprint(f\"In stock? {laptop.in_stock}\")\n",
        "Init & Self",
        [
            '### **Q1.** Create a `Book` class with an `__init__` that takes `title` and `author`.\n',
            '### **Q2.** Create an instance of `Book` and print its `title`.\n',
            '### **Q3.** Add a method `summary(self)` to `Book` that prints `"[title] by [author]"`. Call it.\n',
            '### **Q4.** Add a default argument `is_read=False` to the `__init__`. Prove it works by creating a book and checking the attribute.\n',
            '### **Q5.** Why is `self` required as the first argument in instance methods? What happens if you forget it?\n',
        ]
    ))
    
    S.append((
        SH(3,"Inheritance","Reusing Class Logic") + '\n\n' +
        WH("<b>Inheritance</b> allows a new Class (Child) to adopt the attributes and methods of an existing Class (Parent). This promotes code reuse. You use <code>super()</code> to call methods from the Parent class.") + '\n\n' +
        "```python\nclass Employee:\n    def work(self): print('Working')\n\nclass Manager(Employee): # Inherits from Employee\n    def meeting(self): print('In a meeting')\n```\n\n" +
        WC([("Code Reuse","Creating `CSVReader` and `JSONReader` that both inherit from a base `DataReader` class"),
            ("Specialization","Creating specific exception types that inherit from `Exception`")]) + '\n\n' +
        PF("Deep Hierarchies","Avoid creating deeply nested inheritance chains (A inherits B inherits C inherits D). It makes code impossible to debug. Prefer 'Composition' over deep Inheritance."),
        "class Animal:\n    def __init__(self, name):\n        self.name = name\n    def speak(self):\n        return \"...\"\n\n# Dog inherits from Animal\nclass Dog(Animal):\n    def speak(self):\n        return \"Woof!\"\n\n# Cat inherits from Animal, and adds a new attribute\nclass Cat(Animal):\n    def __init__(self, name, color):\n        super().__init__(name)  # Call parent constructor\n        self.color = color\n        \n    def speak(self):\n        return \"Meow!\"\n\nd = Dog(\"Rex\")\nc = Cat(\"Luna\", \"Black\")\nprint(f\"{d.name}: {d.speak()}\")\nprint(f\"{c.color} cat {c.name}: {c.speak()}\")\n",
        "Inheritance",
        [
            '### **Q1.** Create a parent class `Vehicle` with `__init__(self, speed)`. Add a `move` method.\n',
            '### **Q2.** Create a child class `Bicycle(Vehicle)`. Call its `move` method to prove it inherited it.\n',
            '### **Q3.** Override the `move` method in `Bicycle` to print `"Pedaling at [speed]"`. Call it.\n',
            '### **Q4.** Create a child class `Car(Vehicle)`. Use `super().__init__(speed)` to add a new `brand` attribute.\n',
            '### **Q5.** Check if `Car` is a subclass of `Vehicle` using `issubclass(Car, Vehicle)`. Print the result.\n',
        ]
    ))

    TASKS = [
        ("Bank Account", "Create a `BankAccount` class with `balance` (default 0). Add `deposit(amt)` and `withdraw(amt)` methods. Prevent overdrafts (withdrawals > balance). Test it."),
        ("Data Analyzer", "Create a `Dataset` class initialized with a list of numbers. Add methods `mean()`, `max()`, and `min()`. Instantiate and test."),
        ("Shape Inheritance", "Create `Shape` class with `area() -> 0`. Create `Rectangle(Shape)` and `Circle(Shape)` that override `area()` with actual math. Create one of each and print areas."),
        ("Employee Roster", "Create an `Employee` class (`name`, `salary`). Create `Manager(Employee)` that adds an `add_report()` method to track a list of employees. Add 2 employees to a manager."),
        ("API Client Mock", "Create an `APIClient` class with `base_url`. Add a method `get(endpoint)` that prints `Fetching [base_url]/[endpoint]`. Test it."),
    ]
    
    INTERVIEWS = [
        "Write a `Dog` class. Create 3 instances with different names. Print `type()` and `id()` for each to prove they are separate objects of the same class.",
        "Write a `Counter` class where `__init__` sets `self.count = 0`. Add an `increment` method. Show that two instances have independent counters.",
        "Write a class method that deliberately omits `self`. Call it on an instance, catch the `TypeError`, and print the error message to show why `self` is required.",
        "Write a `Shape` base class with `area()` returning `0`. Write `Circle(Shape)` overriding `area()` with `pi * r**2`. Create both and print `.area()`.",
        "Write a `Vehicle` class. Create `Car(Vehicle)` adding a `brand` attribute using `super().__init__()`. Print the car's speed and brand.",
        "Write a class with a class attribute `count = 0` and increment it inside `__init__`. Create 3 objects. Print `MyClass.count` showing it tracks instances.",
        "Write a class with a class attribute `count` that tracks instances. Add an `__init__` that increments it. Create 5 objects, delete 2, show `count` remains 5.",
        "Write a parent `Animal` class with `speak()` returning `'...'`. Write `Dog(Animal)` and `Cat(Animal)` overriding `speak()`. Call `.speak()` on each.",
        "Write a `Dog`, `Cat`, and `Bird` class each with a `speak()` method. Write a function `animal_sounds(animals)` that calls `.speak()` on any animal passed in.",
        "Write code using `ClassName.mro()` to print the Method Resolution Order of a class with diamond inheritance (A->B, A->C, B,C->D).",
        "Write three unrelated classes (`Dog`, `Cat`, `Robot`) each with a `.greet()` method. Write a function that calls `.greet()` on any object — demonstrating polymorphism.",
        "Write a `JSONMixin` class with `to_json(self)` using `json.dumps(self.__dict__)`. Write `User(JSONMixin)` and call `user.to_json()`.",
        "Write a class with `_salary` (private by convention). Add a `@property` that returns it as `$XX,XXX`. Demonstrate accessing it both ways.",
        "Write a class using `__name` (name mangling). Show that `obj.__name` raises `AttributeError` but `obj._ClassName__name` works.",
        "Write a `Rectangle` class with `width` and `height`. Add `@property area` that returns `width * height`. Access it without parentheses.",
        "Write a `Date` class with `@classmethod from_string(cls, s)` that parses `'25-12-2023'`. Create `d = Date.from_string('25-12-2023')` and print `d.year`.",
        "Write a `MathUtils` class with `@staticmethod is_prime(n)` that checks primality. Call it without creating an instance.",
        "Write a custom `ValidationError(Exception)` class with a `field` attribute. Raise it and catch it, printing the field name.",
        "Write a `ShoppingCart` class that holds a list of `Item(name, price)` objects (composition). Add `total()` method. Test with 3 items.",
        "Write a `ShoppingCart` class using composition: it contains a list of `Item` objects. Add `add_item()` and `total()` methods.",
        "Write a class implementing `__str__`, `__repr__`, and `__len__`. Demonstrate that `print()`, `repr()`, and `len()` call each respectively.",
        "Write a `User(name, email)` class with `__str__` returning `'name <email>'` and `__repr__` returning `'User(name, email)'`.",
        "Write a class `Bag` that implements `__len__` returning the count of items stored internally. Test with `len(bag)`.",
        "Write a class `Row` that stores a dict and implements `__getitem__(key)` so you can access fields like `row['name']`.",
        "Write two unrelated classes (`Duck`, `Person`) both with `.quack()`. Write a function that calls `.quack()` on whatever is passed — demonstrating duck typing.",
    ]

    nb = build(
        day=16, title="OOP Basics",
        obj_text="As programs grow, functional code can become messy spaghetti. Object-Oriented Programming (OOP) allows us to encapsulate state and behavior into clean, reusable models. Today we master the syntax of Classes, the `__init__` constructor, and the DRY (Don't Repeat Yourself) principle of Inheritance.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Classes | Blueprints for objects |\n| 2 | Constructor | `__init__` and `self` |\n| 3 | Inheritance | Reusing logic with `super()` |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Class | Bundles data and functions together |\n| 2 | Self | Refers to the specific instance being operated on |\n| 3 | Inherit | `class Child(Parent):` shares methods instantly |\n",
        checklist="- [ ] I can define a Class and instantiate an Object.\n- [ ] I understand `self` and `__init__`.\n- [ ] I can inherit from a parent class.",
        next_up="Day 17 - OOP Advanced: Dunder Methods & Properties"
    )
    save(nb, os.path.join('notebooks', 'Day16_OOP_Basics_Blank.ipynb'))

def build_day17():
    S = []
    
    S.append((
        SH(1,"Dunder Methods","Magic Integration") + '\n\n' +
        WH("Dunder (Double Under) methods are special methods like <code>__str__</code> or <code>__len__</code> that allow your objects to integrate seamlessly with Python's built-in functions. They define how an object should behave when printed, added, or measured.") + '\n\n' +
        "| Method | Triggered By | Purpose |\n"
        "| :--- | :--- | :--- |\n"
        "| `__str__` | `print(obj)` | User-friendly string representation |\n"
        "| `__repr__`| `repr(obj)` | Developer-friendly representation (for debugging) |\n"
        "| `__len__` | `len(obj)` | Return length or size of object |\n"
        "| `__eq__` | `obj == other`| Custom equality checking |\n\n" +
        WC([("Beautiful Logging","Implementing `__str__` so `print(user)` shows 'Alice' instead of `<__main__.User object at 0x...>`"),
            ("Custom Collections","Implementing `__len__` on a custom `Dataset` class so `len(df)` works naturally")]) + '\n\n' +
        PF("Missing __repr__","Always implement at least <code>__repr__</code>. If <code>__str__</code> is missing, Python falls back to <code>__repr__</code>. If both are missing, you get the ugly memory address string."),
        "class Team:\n    def __init__(self, name, members):\n        self.name = name\n        self.members = members\n        \n    # Beautiful printing\n    def __str__(self):\n        return f\"Team {self.name} ({len(self.members)} members)\"\n        \n    # Native length checking\n    def __len__(self):\n        return len(self.members)\n        \n    # Native equality checking\n    def __eq__(self, other):\n        return self.name == other.name\n\nt = Team(\"Alpha\", [\"Alice\", \"Bob\"])\nprint(t)         # Calls __str__\nprint(len(t))    # Calls __len__\nprint(t == Team(\"Alpha\", [])) # Calls __eq__ (True)\n",
        "Dunder Methods",
        [
            '### **Q1.** Create a `Point(x,y)` class. Try to `print()` an instance and note the ugly output.\n',
            '### **Q2.** Add a `__str__` method to `Point` that returns `"(x, y)"`. Print the instance again.\n',
            '### **Q3.** Add an `__eq__` method that returns True if both x and y are the same. Test `Point(1,1) == Point(1,1)`.\n',
            '### **Q4.** Add a `__add__` method that allows you to add two points together: `Point(x1+x2, y1+y2)`. Test `p1 + p2`.\n',
            '### **Q5.** Why is `__repr__` meant for developers and `__str__` meant for users?\n',
        ]
    ))
    
    S.append((
        SH(2,"Properties & Encapsulation","Safe Data Access") + '\n\n' +
        WH("Encapsulation is the practice of hiding internal state. In Python, we prefix private variables with an underscore <code>_</code>. To provide controlled access to these variables, we use the <b><code>@property</code></b> decorator, which allows methods to be accessed like attributes.") + '\n\n' +
        "```python\nclass User:\n    def __init__(self):\n        self._score = 0  # Private variable\n        \n    @property\n    def score(self):\n        return self._score # Accessed without ()\n```\n\n" +
        WC([("Data Validation","Preventing a user's age from being set to a negative number via a property setter"),
            ("Computed Properties","Calculating `fullname` dynamically from `first_name` and `last_name` without storing it")]) + '\n\n' +
        PT("Python doesn't have strict 'private' variables like Java. The underscore is a 'gentleman's agreement' among developers: 'This is internal, do not touch it directly.'"),
        "class Thermostat:\n    def __init__(self):\n        self._celsius = 20  # internal private state\n        \n    @property\n    def celsius(self):\n        return self._celsius\n        \n    @celsius.setter\n    def celsius(self, value):\n        if value < -273.15:\n            raise ValueError(\"Temperature below absolute zero!\")\n        self._celsius = value\n        \n    @property\n    def fahrenheit(self):\n        # Computed dynamically! Not stored.\n        return (self._celsius * 9/5) + 32\n\nt = Thermostat()\nprint(t.celsius)\nprint(t.fahrenheit)\n\n# Safely triggers validation\n# t.celsius = -300  # Would raise ValueError\n",
        "Properties",
        [
            '### **Q1.** Create a `Person` class with an `__init__` that sets `self.first` and `self.last`.\n',
            '### **Q2.** Add a `@property` method called `fullname` that returns `first + \" \" + last`.\n',
            '### **Q3.** Create an instance, change `first`, and then print `fullname` without parentheses. See how it updates.\n',
            '### **Q4.** Add a setter `@fullname.setter` that takes a full name string, splits it, and updates `first` and `last`.\n',
            '### **Q5.** Why are properties better than Java-style `get_name()` and `set_name()` methods?\n',
        ]
    ))
    
    S.append((
        SH(3,"Class & Static Methods","Alternative Constructors") + '\n\n' +
        WH("<b><code>@classmethod</code></b> takes <code>cls</code> instead of <code>self</code> and modifies class-level state. It's heavily used for alternative constructors. <b><code>@staticmethod</code></b> takes neither and is just a regular function that is logically bundled inside the class.") + '\n\n' +
        "| Decorator | First Arg | Purpose |\n"
        "| :--- | :--- | :--- |\n"
        "| (None) | `self` | Manipulate instance state |\n"
        "| `@classmethod` | `cls` | Manipulate class state / Alternative constructors |\n"
        "| `@staticmethod`| (None) | Utility functions that don't need class/instance state |\n\n" +
        WC([("API Parsers","`User.from_json(json_string)` is a classic use of `@classmethod` to instantiate objects from APIs"),
            ("Utilities","`MathUtils.is_prime(n)` is a classic `@staticmethod`")]) + '\n\n' +
        PT("If your method doesn't use <code>self</code> anywhere inside it, your IDE will usually suggest converting it to a <code>@staticmethod</code>."),
        "import json\n\nclass Config:\n    # Class attribute\n    version = \"1.0\"\n    \n    def __init__(self, data):\n        self.data = data\n        \n    @classmethod\n    def from_json_string(cls, json_str):\n        # Alternative constructor\n        data_dict = json.loads(json_str)\n        return cls(data_dict) # Returns a new Config instance\n        \n    @staticmethod\n    def validate_key(key):\n        # Utility function (needs no state)\n        return isinstance(key, str) and len(key) > 0\n\n# Use alternative constructor directly on the Class\nconf = Config.from_json_string('{\"port\": 8080}')\nprint(conf.data)\nprint(Config.validate_key(\"port\"))\n",
        "Class Methods",
        [
            '### **Q1.** Create a `Date` class with `day, month, year`. Add a `@classmethod` `from_string(cls, date_str)` that parses `"DD-MM-YYYY"`.\n',
            '### **Q2.** Test the class method: `d = Date.from_string("25-12-2023")`. Print its year.\n',
            '### **Q3.** Add a `@staticmethod` `is_valid_month(m)` that checks if `1 <= m <= 12`. Test it.\n',
            '### **Q4.** Explain the difference between `cls` in a class method and `self` in an instance method.\n',
            '### **Q5.** Add a class attribute `count = 0`. Increment it inside `__init__`. Create 3 objects and print `Date.count`.\n',
        ]
    ))

    TASKS = [
        ("Vector Math", "Create a `Vector(x, y)` class. Implement `__add__` (add two vectors), `__sub__` (subtract), and `__str__` (print like `<x, y>`). Test them."),
        ("Safe Wallet", "Create a `Wallet` class. Add a private `_balance` starting at 0. Add a `@property` for balance. Add a `@balance.setter` that prevents setting the balance to a negative number. Raise ValueError if attempted."),
        ("DataFrame Mock", "Create a `MockDF` class initialized with a list of dictionaries. Implement `__len__` to return row count. Implement `__getitem__(key)` to return a list of values for a specific column key."),
        ("User Parser", "Create a `User(username, email)` class. Add a `@classmethod` `from_csv(cls, csv_line)` that takes a string `'bob,bob@gmail.com'`, splits it, and returns a new User instance."),
        ("String Utilities", "Create a `StringUtils` class. Add `@staticmethod`s for `is_palindrome(s)` and `count_vowels(s)`. Call them without instantiating the class."),
    ]
    
    INTERVIEWS = [
        "Write a `Point(x, y)` class. Implement `__str__` to return `'(x, y)'` and `__repr__` to return `'Point(x, y)'`. Print both.",
        "Write a `Vector(x, y)` class that implements `__add__` to add two vectors. Test with `Vector(1,2) + Vector(3,4)` and print.",
        "Write a class `Config` that implements `__getitem__` and `__setitem__` using an internal dict. Test with `cfg['key'] = 'value'`.",
        "Write a `Temperature` class with a `@property celsius` and a computed `@property fahrenheit`. Demonstrate updating celsius and reading fahrenheit.",
        "Write a `Date` class with `@classmethod from_string(cls, s)` and `@staticmethod is_valid_year(y)`. Demonstrate both.",
        "Write a `User` class with `@classmethod from_json(cls, json_str)` that parses a JSON string into a User object. Test it.",
        "Write a class with `__name` (double underscore). Print `dir(obj)` to find the mangled name `_ClassName__name`. Access it.",
        "Write a `Timer` context manager class implementing `__enter__` and `__exit__`. Use it with `with Timer(): time.sleep(0.5)`.",
        "Write a simple descriptor class `PositiveNumber` with `__get__` and `__set__` that rejects negative values. Use it in a `Product` class for `price`.",
        "Write a class implementing `__iter__` and `__next__` to iterate over a range of even numbers. Test with `for n in EvenRange(10):`.",
        "Write a `Greeter` class with `__call__(self, name)` so instances can be called like functions: `g = Greeter(); g('Alice')`.",
        "Write a Singleton class using `__new__`: override it to return the same instance every time. Create two objects and verify `a is b`.",
        "Write a Singleton class overriding `__new__` to always return the same instance. Create `a = S(); b = S()` and print `a is b`.",
        "Write a class using `__slots__ = ['x', 'y']`. Try to add a dynamic attribute `obj.z = 1` and catch the `AttributeError`.",
        "Write code comparing memory usage of a class with `__slots__` vs without using `sys.getsizeof()`. Print both sizes.",
        "Write a class with `__getattr__` that returns `'not found'` for any missing attribute. Test with `obj.nonexistent`.",
        "Write a class with `__getattr__` (missing attrs only) vs `__getattribute__` (all attr access). Show how the latter intercepts everything.",
        "Write a class with `__del__` that prints `'Deleted'`. Create an instance, delete it with `del obj`, and observe the output.",
        "Write a `Person` class with `_age`. Add a `@age.setter` that raises `TypeError` if the value is not an `int`. Test it.",
        "Write two unrelated classes with `__len__` and `__getitem__`. Pass both to a function that calls `len()` and `[0]` on them — demonstrating duck typing.",
        "Write a class `HexInt(int)` that overrides `__str__` to return the hex representation. Test with `print(HexInt(255))`.",
        "Import `abc`. Write an `ABC Shape` with `@abstractmethod area()`. Create `Circle(Shape)` implementing `area()`. Show what happens if you don't implement it.",
        "Write an ABC `DataReader` with `@abstractmethod read()`. Write `CSVReader(DataReader)` and `JSONReader(DataReader)` implementing it.",
        "Write a class with diamond inheritance (`A -> B, A -> C, B,C -> D`). Call `D.mro()` and print the resolution order.",
        "Write a class using `@functools.cached_property` for an expensive computation. Show it only computes once by adding a print statement inside.",
    ]

    nb = build(
        day=17, title="OOP Advanced",
        obj_text="To write truly Pythonic code, your custom classes should behave like built-in types. Today we unlock 'Dunder' magic methods to make our objects printable, measurable, and iterable. We also explore the elegant `@property` decorator for bulletproof data validation.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Dunders | `__str__`, `__len__`, `__eq__` |\n| 2 | Properties | Encapsulation, `@property` |\n| 3 | Class Methods | `@classmethod`, `@staticmethod` |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Dunder | Makes objects act like native Python types |\n| 2 | Property | Protects private data while keeping syntax clean |\n| 3 | Classmethod | Perfect for alternative constructors (`from_json`) |\n",
        checklist="- [ ] I can implement `__str__` and `__repr__`.\n- [ ] I can use `@property` for getter/setter validation.\n- [ ] I understand when to use `@classmethod`.",
        next_up="Day 18 - Regular Expressions (Regex)"
    )
    save(nb, os.path.join('notebooks', 'Day17_OOP_Advanced_Blank.ipynb'))

def build_day18():
    S = []
    
    S.append((
        SH(1,"Regex Basics","Pattern Matching") + '\n\n' +
        WH("Regular Expressions (Regex) are a mini-language for matching text patterns. The <code>re</code> module allows you to find, extract, and replace complex strings that standard methods like <code>.replace()</code> cannot handle.") + '\n\n' +
        "| Character | Matches | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `\\d` | Any digit (0-9) | `\\d\\d\\d` (matches 123) |\n"
        "| `\\w` | Word character (a-z, 0-9, _) | `\\w+` (matches 'hello_1') |\n"
        "| `\\s` | Whitespace | `\\s+` (matches multiple spaces) |\n"
        "| `.` | Any character | `...` (matches any 3 chars) |\n\n" +
        WC([("Data Cleaning","Extracting phone numbers or zip codes from messy text fields"),
            ("Validation","Ensuring a user's input strictly matches an email format")]) + '\n\n' +
        PF("Raw Strings","Always prefix regex patterns with an <code>r</code> (e.g., <code>r'\\d+'</code>). This tells Python it's a 'raw string', preventing it from confusing regex backslashes with Python escape characters (like `\\n`)."),
        "import re\n\ntext = \"Call me at 555-1234 or 555-9876 today.\"\n\n# Find all sequences of digits\n# r\"\\d+\" means: 1 or more digits\nnumbers = re.findall(r\"\\d+\", text)\nprint(f\"All digits: {numbers}\")\n\n# Find exactly the phone number pattern\n# 3 digits, dash, 4 digits\nphones = re.findall(r\"\\d\\d\\d-\\d\\d\\d\\d\", text)\nprint(f\"Phones: {phones}\")\n",
        "Regex Basics",
        [
            '### **Q1.** Import `re`. Use `re.findall()` with `r"\\d+"` to extract all numbers from `"I have 2 apples and 10 bananas"`.\n',
            '### **Q2.** Use `re.sub()` to replace all numbers in the string above with `"X"`. Print the result.\n',
            '### **Q3.** Find all words in `"The quick brown fox"` using `re.findall()` and `r"\\w+"`.\n',
            '### **Q4.** Try matching the literal period in `"www.google.com"`. Why does `r"."` match everything? How do you escape it `r"\\."`?\n',
            '### **Q5.** Why is the `r` prefix important in regex strings? What happens to `print("\\n")` vs `print(r"\\n")`?\n',
        ]
    ))
    
    S.append((
        SH(2,"Quantifiers & Anchors","Advanced Patterns") + '\n\n' +
        WH("<b>Quantifiers</b> dictate how many times a character should occur. <b>Anchors</b> lock the match to the start or end of the string.") + '\n\n' +
        "| Symbol | Meaning | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `*` | 0 or more | `a*` (matches '', 'a', 'aa') |\n"
        "| `+` | 1 or more | `a+` (matches 'a', 'aa') |\n"
        "| `?` | 0 or 1 (optional) | `colou?r` (matches 'color', 'colour') |\n"
        "| `{x,y}` | Between x and y times | `\\d{3,4}` (matches 123, 1234) |\n"
        "| `^` / `$`| Start / End of string | `^Hello` / `world$` |\n\n" +
        WC([("Log Parsing","`^ERROR` ensures we only match lines that *start* with ERROR, not lines that just contain the word"),
            ("Flexible Parsing","`https?://` matches both http and https URLs")]) + '\n\n' +
        PT("By default, <code>*</code> and <code>+</code> are <b>greedy</b> (they match as much as possible). Append a <code>?</code> to make them lazy: <code>.*?</code> matches as little as possible."),
        "import re\n\nurls = [\"http://google.com\", \"https://amazon.com\", \"ftp://server.com\"]\n\n# Match http or https\nfor url in urls:\n    if re.match(r\"https?://\", url):  # 's' is optional\n        print(f\"Valid Web URL: {url}\")\n\ntext = \"The order number is #123456 and it shipped.\"\n# Match exactly a # followed by 4 to 6 digits\norder = re.findall(r\"#\\d{4,6}\", text)\nprint(f\"Order: {order}\")\n",
        "Quantifiers",
        [
            '### **Q1.** Match strings that start with "ID-". Test on `["ID-123", "User ID-456"]` using `^ID-` with `re.search()`.\n',
            '### **Q2.** Match words that end in "ing". Test on `"running and jumping"` using `\\w+ing`.\n',
            '### **Q3.** Use the optional `?` to match both `"file.txt"` and `"files.txt"`.\n',
            '### **Q4.** Use the `{n}` quantifier to match exactly a 5-digit zip code in `"My zip is 90210 or 1234"`.\n',
            '### **Q5.** Demonstrate greedy vs lazy: run `re.findall(r"<.*>", "<b>text</b>")` and then `r"<.*?>"`.\n',
        ]
    ))
    
    S.append((
        SH(3,"Groups & Sets","Extracting Structure") + '\n\n' +
        WH("<b>Character Sets `[]`</b> allow you to match any ONE of the characters inside. <b>Capture Groups `()`</b> allow you to extract specific parts of a pattern.") + '\n\n' +
        "| Syntax | Meaning | Example |\n"
        "| :--- | :--- | :--- |\n"
        "| `[abc]` | 'a' or 'b' or 'c' | `b[aeiou]t` (bat, bit, but) |\n"
        "| `[A-Z]` | Range (capital letters)| `[A-Za-z0-9]` (Alphanumeric) |\n"
        "| `[^a]` | Negation (NOT 'a') | `[^0-9]` (Non-digits) |\n"
        "| `(abc)` | Capture group | `(\\d{3})-(\\d{4})` (Extracts parts) |\n\n" +
        WC([("ETL Pipelines","Extracting the Year, Month, and Day from a messy date string into separate variables"),
            ("Data Scrubbing","Removing all punctuation using `re.sub(r'[^A-Za-z0-9\\s]', '', text)`")]) + '\n\n' +
        PT("When using <code>re.findall()</code> with capture groups <code>()</code>, it returns a list of <b>tuples</b> instead of strings, containing exactly the captured components!"),
        "import re\n\ndates = \"Born on 1990-05-15, graduated 2012-08-20.\"\n\n# Capture groups (Year, Month, Day)\npattern = r\"(\\d{4})-(\\d{2})-(\\d{2})\"\nmatches = re.findall(pattern, dates)\n\nprint(\"Extracted Date Tuples:\")\nfor year, month, day in matches:\n    print(f\"Year: {year}, Month: {month}\")\n\n# Character sets (Scrubbing punctuation)\nmessy = \"Data! Science, is #awesome.\"\nclean = re.sub(r\"[^A-Za-z\\s]\", \"\", messy)\nprint(f\"Cleaned: {clean}\")\n",
        "Groups",
        [
            '### **Q1.** Match any vowel in `"hello world"` using `re.findall()` and a character set `[aeiou]`.\n',
            '### **Q2.** Match any consonant in `"hello world"` using the negation set `[^aeiou\\s]`.\n',
            '### **Q3.** Extract the domain names from `"user1@gmail.com"` and `"admin@yahoo.com"` using capture groups `r\"@(\\w+\\.\\w+)\"`.\n',
            '### **Q4.** Use `re.findall()` with `r\"(\\d+)\\s(USD|EUR)\"` to extract amount and currency from `"100 USD and 50 EUR"`.\n',
            '### **Q5.** Extract only words starting with a capital letter from `"The Quick brown Fox"` using `[A-Z][a-z]+`.\n',
        ]
    ))

    TASKS = [
        ("Email Extractor", "Given a long messy string, write a regex to extract all valid email addresses. (Hint: `[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+`)."),
        ("Phone Normalizer", "Given `[\"(555) 123-4567\", \"555-123-4567\", \"5551234567\"]`, use `re.sub()` and capture groups to normalize them all to `\"555-123-4567\"` format."),
        ("HTML Tag Stripper", "Write a function `strip_tags(html)` that removes all HTML tags (like `<div>` or `<a href=''>`) using a lazy regex `r\"<.*?>\"` and `re.sub()`. Test it on a sample string."),
        ("Password Validator", "Write a regex that matches a password ONLY if it has: 8+ chars, at least one digit, and at least one uppercase letter. (Use `re.search` and positive lookaheads if you dare, or just multiple standard regex checks)."),
        ("Log Parser", "Given `log = \"[2023-10-15 08:22:11] ERROR: Server crashed\"`, write a regex with 3 capture groups to extract the Date, Time, and Log Level (ERROR)."),
    ]
    
    INTERVIEWS = [
        "What is the difference between `re.match()`, `re.search()`, and `re.findall()`?",
        "Explain the difference between greedy and lazy matching. How do you make a quantifier lazy?",
        "What is a raw string `r\"\"` in Python, and why is it almost mandatory for regex?",
        "Write a regex to validate an IPv4 address (e.g., '192.168.1.1').",
        "Explain what `\\b` (word boundary) does. Give an example where it is necessary.",
        "Write a regex to extract all hashtags from a tweet.",
        "How do you compile a regex pattern using `re.compile()`? Why is this good for performance?",
        "What is the `re.IGNORECASE` flag and how do you use it?",
        "Write a regex to match a valid 24-hour time format (e.g., '23:59', but not '25:99').",
        "Explain capture groups. How do you refer to a capture group in a `re.sub()` replacement string? (Hint: `\\1`).",
        "What is a non-capturing group `(?:...)` and why would you use it?",
        "Explain positive lookahead `(?=...)` and negative lookahead `(?!...)`.",
        "Write a regex using negative lookahead to match 'foo' only if it is NOT followed by 'bar'.",
        "Write a regex to extract the query parameters from a URL.",
        "How do you match a string that contains exactly 5 letters, no more, no less? (Hint: anchors).",
        "Write a regex to parse a CSV line, considering that some fields might be enclosed in quotes.",
        "Explain the `re.MULTILINE` flag. How does it change the behavior of `^` and `$`?",
        "Write a regex to find all duplicate words in a sentence (e.g., 'This is is a test'). (Hint: backreferences).",
        "How do you split a string by multiple different delimiters (e.g., space, comma, semicolon) at once?",
        "Write a regex to match a valid hex color code (e.g., '#FFF' or '#AABBCC').",
        "Explain how `re.finditer()` differs from `re.findall()`. When should you use it?",
        "Write a regex to check if a string contains only alphanumeric characters, without using `str.isalnum()`.",
        "How do you escape special regex characters (like `*`, `?`, `(`) dynamically if they are stored in a variable? (Hint: `re.escape`).",
        "Write a regex to match Python single-line comments.",
        "Why is regex generally a bad idea for parsing complex nested structures like HTML or JSON?",
    ]

    nb = build(
        day=18, title="Regular Expressions",
        obj_text="Regular Expressions (Regex) are the ultimate tool for text manipulation. While notoriously cryptic, mastering regex allows you to perform data cleaning tasks in 1 line of code that would otherwise take 50 lines of complex string manipulation.",
        obj_table="| # | Topic | Concept |\n|---|-------|---------|\n| 1 | Basics | `\\d`, `\\w`, `re.findall` |\n| 2 | Quantifiers | `+`, `*`, `?`, `^`, `$` |\n| 3 | Groups | `[abc]`, `(capture)` |\n",
        sections=S, tasks=TASKS, interviews=INTERVIEWS,
        summary="| # | Topic | Key Takeaway |\n|---|-------|-------------|\n| 1 | Raw Strings | Always use `r\"pattern\"` |\n| 2 | Anchors | `^` start, `$` end |\n| 3 | Extracting | `()` creates tuples of extracted data |\n",
        checklist="- [ ] I understand `\\d`, `\\w`, `\\s`.\n- [ ] I can use `+`, `*`, and `?`.\n- [ ] I can extract data using capture groups `()`.",
        next_up="Day 19 - Advanced Generators & Iterators"
    )
    save(nb, os.path.join('notebooks', 'Day18_Regex_Blank.ipynb'))

if __name__ == '__main__':
    build_day16()
    build_day17()
    build_day18()
    print("Days 16, 17, 18 generated successfully!")
