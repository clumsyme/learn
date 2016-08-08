import copy
Bai = "o"
Hei = "*"
kaiju = [[' ',1,2,3,4,5,6,7,8],
         [1,"-","-","-","-","-","-","-","-"],
         [2,"-","-","-","-","-","-","-","-"],
         [3,"-","-",Bai,"-","-",Hei,"-","-"],
         [4,"-","-","-","-","-","-","-","-"],
         [5,"-","-","-","-","-","-","-","-"],
         [6,"-","-",Hei,"-","-",Bai,"-","-"],
         [7,"-","-","-","-","-","-","-","-"],
         [8,"-","-","-","-","-","-","-","-"],]
QiPan = copy.deepcopy(kaiju)

def printQiPan():
    for line in QiPan:
        for Zi in line:
            print(Zi, end = "   ")
        print("\n")

def reverse(qp,i,j):
    if qp[i][j] == Bai:
        qp[i][j] = Hei
    elif qp[i][j] == Hei:
        qp[i][j] = Bai
    else:
        pass

def XiaZi(line,row,Zi):
    if QiPan[line][row] != "-":
        print("Not Empty")
        raise IOError
    QiPan[line][row] = Zi
    for i in range(-1,2):
        for j in range(-1,2):
            if i == 0 and j == 0:
                continue
            try:
                reverse(QiPan, line+i,row+j)
            except IndexError:
                continue
            
def full():
    for i in QiPan:
        for j in i:
            if j == "-":
                return False
    return True

def game():
    turn = True
    while not full():
        print("#" * 50)
        if turn:
            print("Black Turn")
            Zi = Hei
        else:
            print("White Turn")
            Zi = Bai
        printQiPan()    
        try:
            line = int(input("Line:"))
            row = int(input("row:"))
        except ValueError:
            print("Wrong Value!")
            continue
        try:
            XiaZi(line,row,Zi)
        except IOError:
            print("Not valid position!")
            continue
        except IndexError:
            print("Not in QiPan!")
            continue
        turn = not turn
    printQiPan()

if __name__ == "__main__":
    while True:
        game()
        i = input("Next Game?")
        if i in ("n", "no", "N", "No"):
            break
        else:
            QiPan = kaiju[:]
            
    


