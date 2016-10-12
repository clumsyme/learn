import socket

host = socket.gethostname()
port = 8088
clientSocket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

while True:
    message = input("Wha are you?: ")
    if message == 'q':
        break
    clientSocket.sendto(message.encode(), (host, port))
    received, addr = clientSocket.recvfrom(1024)
    print(received.decode())
clientSocket.close()
