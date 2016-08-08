Ozymandias = '''Bmlznaqvnf
OL CREPL OLFFUR FURYYRL

V zrg n geniryyre sebz na nagvdhr ynaq,
Jub fnvq—“Gjb infg naq gehaxyrff yrtf bs fgbar
Fgnaq va gur qrfreg. . . . Arne gurz, ba gur fnaq,
Unys fhax n funggrerq ivfntr yvrf, jubfr sebja,
Naq jevaxyrq yvc, naq farre bs pbyq pbzznaq,
Gryy gung vgf fphycgbe jryy gubfr cnffvbaf ernq
Juvpu lrg fheivir, fgnzcrq ba gurfr yvsryrff guvatf,
Gur unaq gung zbpxrq gurz, naq gur urneg gung srq;
Naq ba gur crqrfgny, gurfr jbeqf nccrne:
Zl anzr vf Bmlznaqvnf, Xvat bs Xvatf;
Ybbx ba zl Jbexf, lr Zvtugl, naq qrfcnve!
Abguvat orfvqr erznvaf. Ebhaq gur qrpnl
Bs gung pbybffny Jerpx, obhaqyrff naq oner
Gur ybar naq yriry fnaqf fgergpu sne njnl.
"'''


dic = {}
for i in (65, 97):
    for j in range(26):
        dic[chr(i + j)] = chr(i + (j + 13) % 26)

#D = {chr(i):chr((i-65+13)%26+65) for i in range(65,91)}
#d = {chr(i):chr((i-97+13)%26+97) for i in range(97,123)}
#dic = dict(D, **d)
#dic = {chr(i+j):chr(i + (j+13)%26) for i in (65, 97) for j in range(26)}

print(''.join(dic.get(c, c) for c in Ozymandias))
