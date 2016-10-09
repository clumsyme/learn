import socket
s = socket.socket()
host = socket.gethostname()
port = 8888

s.connect((host, port))
while True:
    s.send(input("<---Send:").encode('utf8'))
    print('--->Recive:'+s.recv(1024).decode('utf8'))
    print()
s.close()