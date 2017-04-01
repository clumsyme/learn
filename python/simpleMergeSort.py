def simpleMergeSort(lista, listb):
  """ The simple mergeSort
  
  :param lista: first list to merge
  :param listb: second list to merge
  
  @return: merged sorted list
  """
  result = []
  while lista and listb:
    if lista[0] < listb[0]:
      result.append(lista.pop(0))
    else:
      result.append(listb.pop(0))
  return result + a + b

from functools import reduce

def mergeManyLists(*lists):
  """ Merge many lists
  
  :param *lists: pass as many list as you want
  
  @return final merged list
  """
  return reduce(simpleMergeSort, lists)
