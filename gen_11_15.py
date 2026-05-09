"""Generate Days 11 to 15."""
from nb_helpers import *
import os

def gen_11():
    S = [
        (SH(1,"Modules & Imports","Reusing Code"), WH("Modules are Python files. Packages are directories of modules."), WC([("Code Organization","Splitting logic into modules.")]), PF("Circular Imports","Avoid A imports B and B imports A."), "import math\nprint(math.pi)", "Modules", ["### **Q1.** Import `math` and print `math.sqrt(16)`.\n"]*5),
        (SH(2,"Standard Library","Built-in Batteries"), WH("Python comes with os, sys, datetime, json, etc."), WC([("File System","os and pathlib for file management.")]), PT("Use datetime for time, not time."), "import os\nprint(os.name)", "Stdlib", ["### **Q1.** Use `os.getcwd()`.\n"]*5),
        (SH(3,"Virtual Environments","Dependency Isolation"), WH("venvs isolate dependencies per project."), WC([("Reproducibility","Requirements.txt ensures code runs everywhere.")]), PF("Global pip install","Never pip install globally."), "# python -m venv venv\n# source venv/bin/activate", "Venvs", ["### **Q1.** Explain what `pip freeze` does.\n"]*5)
    ]
    return build(11, "Modules & Packages", "Master code organization.", "|1|Modules|Imports|", S, [{"name":"T1","desc":"Task"}]*5, ["Q"]*25, "Summary", "Checklist", "Day 12")

def gen_12():
    S = [
        (SH(1,"List Comprehensions","Deep Dive"), WH("Advanced comprehensions with nested loops and conditions."), WC([("Data Cleaning","Fastest way to filter lists.")]), PF("Too Complex","Don't nest more than 2 loops."), "[x for x in range(10) if x%2==0]", "List Comp", ["### **Q1.** Create a list comp.\n"]*5),
        (SH(2,"Dict/Set Comprehensions","Mapping Data"), WH("Create dicts and sets dynamically."), WC([("Lookups","Generate lookup tables instantly.")]), PT("Syntax: {k:v for k,v in data}"), "{x:x**2 for x in range(5)}", "Dict Comp", ["### **Q1.** Create a dict comp.\n"]*5),
    ]
    return build(12, "Advanced Comprehensions", "Master comprehensions.", "|1|Comp|Lists|", S, [{"name":"T1","desc":"Task"}]*5, ["Q"]*25, "Summary", "Checklist", "Day 13")

def gen_13():
    S = [
        (SH(1,"Lambda Functions","Deep Dive"), WH("Anonymous functions for inline use."), WC([("Pandas Apply","Used constantly in DataFrames.")]), PF("Readability","Don't use for complex logic."), "f = lambda x: x*2", "Lambdas", ["### **Q1.** Write a lambda.\n"]*5),
        (SH(2,"Map, Filter, Reduce","Functional Python"), WH("Apply functions to sequences."), WC([("Data pipelines","Functional approach to data.")]), PT("List comprehensions are often better."), "list(map(lambda x: x*2, [1,2]))", "Map Filter", ["### **Q1.** Use map().\n"]*5),
    ]
    return build(13, "Lambdas & Functional", "Functional programming.", "|1|Lambda|Inline|", S, [{"name":"T1","desc":"Task"}]*5, ["Q"]*25, "Summary", "Checklist", "Day 14")

def gen_14():
    S = [
        (SH(1,"Try/Except Blocks","Error Handling"), WH("Catch and handle runtime errors."), WC([("Pipeline Stability","Don't let one bad row crash the job.")]), PF("Bare Except","Never use `except:` without an error type."), "try:\n  1/0\nexcept ZeroDivisionError:\n  pass", "Try Except", ["### **Q1.** Write a try block.\n"]*5),
        (SH(2,"Raise & Custom Exceptions","Signaling Errors"), WH("Throw errors when data is invalid."), WC([("Data Validation","Raise ValueError on bad inputs.")]), PT("Create custom Exception classes."), "raise ValueError('Bad data')", "Raise", ["### **Q1.** Raise an error.\n"]*5),
    ]
    return build(14, "Exceptions", "Robust error handling.", "|1|Exceptions|Try/Except|", S, [{"name":"T1","desc":"Task"}]*5, ["Q"]*25, "Summary", "Checklist", "Day 15")

def gen_15():
    S = [
        (SH(1,"Reading/Writing Text","File I/O"), WH("Open and read files using context managers."), WC([("Log Parsing","Read raw text data.")]), PF("Forgetting to close","Always use `with open()`."), "with open('file.txt','w') as f:\n  f.write('Hi')", "File I/O", ["### **Q1.** Open a file.\n"]*5),
        (SH(2,"CSV & JSON Modules","Structured Data"), WH("Standard library parsers for data formats."), WC([("API Data","JSON is the language of the web.")]), PT("Pandas is better for CSV, but good to know."), "import json\njson.dumps({})", "JSON", ["### **Q1.** Parse JSON.\n"]*5),
    ]
    return build(15, "File Handling", "Read and write data.", "|1|Files|I/O|", S, [{"name":"T1","desc":"Task"}]*5, ["Q"]*25, "Summary", "Checklist", "Day 16")

if __name__ == '__main__':
    save(gen_11(), os.path.join('notebooks', 'Day11_Modules_Blank.ipynb'))
    save(gen_12(), os.path.join('notebooks', 'Day12_Comprehensions_Blank.ipynb'))
    save(gen_13(), os.path.join('notebooks', 'Day13_Lambda_Blank.ipynb'))
    save(gen_14(), os.path.join('notebooks', 'Day14_Exceptions_Blank.ipynb'))
    save(gen_15(), os.path.join('notebooks', 'Day15_FileHandling_Blank.ipynb'))
