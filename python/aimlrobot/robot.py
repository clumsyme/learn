import aiml

kernel = aiml.Kernel()
kernel.learn('std-startup.xml')
kernel.respond('load aiml b')

while True:
    print(kernel.respond(raw_input('Enter:')))