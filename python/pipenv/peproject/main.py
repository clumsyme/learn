import requests
import maya

response = requests.get('https://httpbin.org/ip')

print(f"Your IP is {response.json()['origin']}")

now = maya.now()

print(maya)
