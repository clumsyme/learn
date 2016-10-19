from itertools import permutations, product

def tf(*nums):
    if not len(nums)==4:
        raise ValueError
    bracketCases = [('(', '', ')', '' ,'' ,''), 
             ('', '', '', '(', '', ')'), 
             ('', '(', '', '', ')', ''),
             ('(', '', '', '', ')', ''), 
             ('', '(', '', '', '', ')'), 
             ('(', '', ')','(', '', ')'),
             ('', '', '', '', '', '')
            ]
    numCases = permutations(nums)
    ops = ['+', '-', '*', '/']
    opCases = product(ops, repeat=3)
    expr = '{0}{n1}{p1}{1}{n2}{2}{p2}{3}{n3}{4}{p3}{n4}{5}'
    results = []
    for numCase in numCases:
        for opCase in opCases:
            for bracketCase in bracketCases:
                #print(numCase, opCase, bracketCase, sep='\n')
                fexpr = expr.format(*bracketCase, 
                                    n1 = numCase[0], n2 = numCase[1], n3 = numCase[2], n4 = numCase[3], 
                                    p1 = opCase[0], p2 = opCase[1], p3 = opCase[2]
                                    )
                try:
                    value = eval(fexpr)
                except ZeroDivisionError:
                    continue
                else:
                    if value == 24:
                        results.append(fexpr)
                if opCase == ('+', '+', '+') or opCase == ('*', '*', '*'):
                    break
    for result in results:
        print(result)

tf(2,4,6,8)