import aiml
import sys

kernel = aiml.Kernel()
if len(sys.argv) == 1 or sys.argv[1]=='a':
    kernel.bootstrap(brainFile='authorbrain.brn')
elif sys.argv[1]=='s':
    kernel.bootstrap(brainFile='sentencebrain.brn')
elif sys.argv[1]=='relearna':
    kernel.learn('author.aiml')
    kernel.saveBrain('authorbrain.brn')
elif sys.argv[1]=='relearns':
    kernel.learn('sentence.aiml')
    kernel.saveBrain('sentencebrain.brn')
else:
    kernel.learn('author.aiml')
    kernel.learn('sentence.aiml')
    kernel.learn('basic.aiml')
    kernel.saveBrain('mainbrain.brn')
while True:
    asking = raw_input('asking:')
    response = kernel.respond(asking.decode('gb2312')).decode('utf8')
    # response = response.split(' ')
    response = response.replace(' ', '\n')
    print(response)
    print('-'*50)