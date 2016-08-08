import turtle

def koch(t, order, size):
    if order == 0:        
        t.forward(size)    
    else:       
        for angle in [60, -120, 60, 0]: 
            koch(t, order-1, size/3) 
            t.left(angle)

def snow(t, order, size):
    koch(t, order, size)
    t.right(120)
    koch(t, order, size)
    t.right(120)
    koch(t, order, size)

if __name__ == "__main__":
    tom = turtle.Turtle()
    snow(tom, 3, 300)