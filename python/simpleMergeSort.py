def simpleMergeSort(lista, listb):
  result = []
  while lista and listb:
    if lista[0] < listb[0]:
      result.append(lista.pop(0))
    else:
      result.append(listb.pop(0))
  return result + a + b
