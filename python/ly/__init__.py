"""
This is a simple module for me to simplify some common operations in python using.
"""

from contextlib import contextmanager

@contextmanager
def goto(where):
    """A context manager for operating something casually in another directory and return to the working directory after operation.

    with goto(where):
        dosth...
    
    Add frequently-used directories to goto.directories with a key, just type the key to get to the directory.
    Or just type the directory directly, if the directory does not exist the function will create it.
    
    """
    import os
    cwd = os.getcwd()
    directories = {
        "desktop":"C:/users/liyan/desktop"
    }
    try:
        os.chdir(directories[where])
    except (KeyError, FileNotFoundError):
        try:
            os.chdir(where)
        except FileNotFoundError:
            os.makedirs(where)
            os.chdir(where)
    yield None
    os.chdir(cwd)