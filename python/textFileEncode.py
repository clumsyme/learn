# In reading and writing text files, python uses the hardware's default encoding if no encoding is appointed.
# i.e
open('a.txt', 'w', encoding='utf8').write('café')
open('a.txt').read()
# >>>caf茅
# That's because it use gbk encoding at the read stage.
open('a.txt', encoding='utf8').read()
# >>>café
# will fix it.
