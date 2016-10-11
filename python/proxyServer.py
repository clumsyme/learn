import socket
import re
pattern = re.compile(r'GET /\?(.*?) HTTP')

asServerSocket = socket.socket()

asServerSocket.bind(('localhost', 8888))

header = '''GET http://replacehost HTTP/1.1
Host: replacehost
Connection:close
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.50 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4

'''

asServerSocket.listen(5)
while True:
    clientSocket, addr = asServerSocket.accept()
    print('connected from ', addr)
    request = clientSocket.recv(1024)
    url = re.findall(pattern, request.decode())[0]
    getHeader = header.replace('replacehost', url)
    print(url)
    asClientSocket = socket.socket()
    asClientSocket.connect((url, 80))
    asClientSocket.send(getHeader.encode())
    response = asClientSocket.recv(1024)
    
    while True:
        nextResponse = asClientSocket.recv(1024)
        if len(nextResponse) == 0:
            break
        else:
            response += nextResponse
    print('sending', len(response))
    clientSocket.send(response)
    asClientSocket.close()
