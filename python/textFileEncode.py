# In reading and writing text files, python uses the hardware's default encoding if no encoding is appointed.
# i.e
open('a.txt', 'w', encoding='utf8').write('café')
# >>>4
open('a.txt').read()
# >>>caf茅
# That's because it use cp936 encoding at the read stage.
open('a.txt', encoding='utf8').read()
# >>>café
# will fix it.

# Of course we can ignore the encoding argument both when opening or writing the file, but this will make it use the 
# local default encoding that may cause problem on other platforms.

import os
os.stat('a.txt').st_size
# >>>5

# As we see 4 characters are written, but this show that a.txt holds 5 bytes.
# That's because café has 4 Unicode characters, but after it's encoded into utf8, 
# é is encoded as 2 bytes.The folloeing binary mode shows the 5 bytes.
open('a.txt', 'rb').read()
# >>>b'caf\xc3\xa9'
# *As a advice, only open binary files with binary mode.

# locale.getpreferredencoding() -> 'cp936'   #The most importent setting. my_file use it.
#                  type(my_file) -> <class '_io.TextIOWrapper'>
#               my_file.encoding -> 'cp936'
#            sys.stdout.isatty() -> True
#            sys.stdout.encoding -> 'cp936'
#             sys.stdin.isatty() -> True
#             sys.stdin.encoding -> 'cp936'
#            sys.stderr.isatty() -> True
#            sys.stderr.encoding -> 'cp936'
#       sys.getdefaultencoding() -> 'utf-8'
#    sys.getfilesystemencoding() -> 'mbcs'    #encode/decode file names.
# Get the default encoding of my windows10 by code in fluent python page 114.
# sys.getdefaultencoding() is used internally by Python to convert binary data to/
# from str; this happens less often in Python 3, but still happens10. Changing this
# setting is not supported11
