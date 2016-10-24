import aiml
import os
import sys

kernel = aiml.Kernel()
if len(sys.argv) == 1:
    kernel.bootstrap(brainFile='brain.brn')
else:
    kernel.bootstrap(learnFiles='std-startup.xml', commands='load aiml basic')
    kernel.saveBrain('brain.brn')

while True:
    print(kernel.respond(raw_input('Enter:')))