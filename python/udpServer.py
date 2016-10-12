import socket

host = socket.gethostname()
port = 8088
serverSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
serverSocket.bind(('', port))
while True:
    received, addr = serverSocket.recvfrom(1024)
    print('received:', received, 'from:', addr, '', sep='\n')
    if received.decode() == 'yan':
        message = 'Hello there, Welcome~~~~~~\n'
    else:
        message = 'I do not know you.\n'
    serverSocket.sendto(message.encode(), addr)

