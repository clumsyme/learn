"""
Hearthstone is a popular game in worldwide, and today(2016/10/18) Blizzard announced the
Heroic Tavern Brawl. If you get 12 wins the award is amazing. I'm wondering the probability
of getting 12 wins.
We can use the decimal module to get a more precise result
    from decimal import Decimal, getcontext
    getcontext().prec = 50
But for now the float number seems work well enough.
"""

def probn(wins, winrate):
    """The probability of finish game with just wins of wins."""
    if wins in range(12):
        return (winrate**wins) * ((1-winrate)**3) * (wins+1) * (wins+2) /2
    else:
        prob1 = winrate**12
        prob2 = winrate**12 * (1-winrate) * 12
        prob3 = winrate**12 * (1-winrate) * (1-winrate) * 12 * 13 / 2
        return prob1+prob2+prob3

def morethann(wins, winrate):
    """The probability of finish game with no less than wins of wins."""
    probs = [probn(win, winrate) for win in range(13)]
    return sum(probs[wins:])

def expectation(winrate):
    """The expectation of finish game with wins of wins at winrate of winrate."""
    probs = [probn(win, winrate) for win in range(13)]
    expec = 0
    for i in range(13):
        expec += i*probs[i]
    return expec

"""
--------------------expectation wins with winrate--------------
for i in range(0, 101, 10):
	print('{:<3} {:<5}'.format(i, round(expectation(i/100),3)))
	
0   0.0  
5   0.158
10  0.333
15  0.529
20  0.75 
25  1.0  
30  1.286
35  1.615
40  1.999
45  2.452
50  2.992
55  3.639
60  4.418
65  5.35 
70  6.444
75  7.681
80  8.998
85  10.266
90  11.291
95  11.877
100 12.0 

--------------no less than 7 wins with winrate------------------
for i in range(0, 101, 5):
	print('{:<3} {:<5}'.format(i, round(morethann(7, i/100),3)))
	
0   0.0  
5   0.0  
10  0.0  
15  0.005
20  0.031
25  0.134
30  0.429
35  1.118
40  2.503
45  4.977
50  8.984
55  14.95
60  23.179
65  33.727
70  46.283
75  60.068
80  73.82
85  85.915
90  94.703
95  99.164
100 100.0

----------------------get 12 wins with winrate----------------------
for i in range(0, 101, 5):
	print('{:<3} {:<5}'.format(i, round(100*lessthann(4, i/100),3)))

	
0   100.0
5   99.991
10  99.873
15  99.411
20  98.304
25  96.24
30  92.953
35  88.258
40  82.08
45  74.474
50  65.625
55  55.848
60  45.568
65  35.291
70  25.569
75  16.943
80  9.888
85  4.734
90  1.585
95  0.223
100 0.0 

--------------no more than 3 wins with winrate------------------
for i in range(0, 101, 5):
	print('{:<3} {:<5}'.format(12, 100*round(probn(12, i/100),3)))

	
0   0.0  
5   0.0  
10  0.0  
15  0.0  
20  0.0  
25  0.0  
30  0.003
35  0.014
40  0.061
45  0.215
50  0.647
55  1.701
60  3.979
65  8.393
70  16.084
75  28.113
80  44.805
85  64.791
90  84.164
95  96.995
100 100.0

##########################################
# result: key is winrate, value[i] is the probability of get just i wins.
result = {winrate:[] for winrate in range(0,101,5)}
for winrate in range(0, 101, 5):
	for wins in range(13):
		result[winrate].append(probn(wins, winrate/100))

# prize[i] is the prize with i wins.
prize = [100, 200, 300, 640, 880, 1040, 1200, 1360, 1520, 2400, 4000, 5760, 12000]

# prizeresult[i] is the prize expectation with winrate i*5
prizeresult = []
for winrate in range(0,101,5):
	prizeresult.append(sum(a*b for a,b in zip(result[winrate], prize)))
for i in range(21):
	print('{:<3} {:<5}'.format(i*5, round(presult[i], 3)))
0   100.0
5   116.08
10  135.578
15  160.245
20  191.678
25  231.432
30  281.369
35  344.53
40  426.983
45  541.172
50  711.035
55  978.369
60  1408.251
65  2088.936
70  3118.923
75  4572.568
80  6438.85
85  8541.6
90  10482.898
95  11718.92
100 12000.0

"""
