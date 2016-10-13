import socket
import re
import os
pattern = re.compile(r'GET /(.*?) HTTP')

serverSocket = socket.socket()

serverSocket.bind(('localhost', 8888))

serverSocket.listen(5)
while True:
    clientSocket, addr = serverSocket.accept()
    print('connected from ', addr)
    request = clientSocket.recv(1024)
    src = re.findall(pattern, request.decode())
    if src:
        src = src[0]
    print('request', src)
    if not os.path.isfile(src):
        with open('404.html', 'rb') as fzf:
            response = fzf.read()
    else:
        with open(src, 'rb') as file:
            response = file.read()
    clientSocket.send(response)
    clientSocket.close()
