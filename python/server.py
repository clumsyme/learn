import socket

s = socket.socket()
host = socket.gethostname()
port = 8888
s.bind((host, port))

s.listen(5)
while True:
    c, add = s.accept()
    while True:
        print('--->Recive:'+c.recv(1024).decode('utf8'))
        print()
        c.send(input("<---Send:").encode('utf8'))
c.close()