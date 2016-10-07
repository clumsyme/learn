class Parser:
    def __init__(self, expr):
        self.iterExpr = iter(expr)
        self.current = next(self.iterExpr)
    
    def match(self, value):
        if self.current == value:
            try:
                self.current = next(self.iterExpr)
            except StopIteration:
                pass

    def term(self):
        if ord(self.current) in range(48, 58):
            print(self.current, end = '')
            self.match(self.current)
        else:
            raise SyntaxError('syntax error')

    def expr(self):
        self.term()
        while True:
            if self.current == '+':
                self.match('+')
                self.term()
                print('+', end = '')
            elif self.current == '-':
                self.match('-')
                self.term()
                print('-', end = '')
            else:
                return

parse = Parser('5+6-2+1-7')
parse.expr()    # 56+2-1+7-