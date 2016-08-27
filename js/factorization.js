function factorization(num) {
    var s = num + " = "
    while (num != 1){
        for (var j = 2;j<=num;j++){
            if (num%j==0){
                if (num != j){
                    s = s + j + "*"
                    num = num/j
                    break
                }else{
                    s = s + j
                    num = num/j
                    break
                }
            }
        }
    }
    alert(s)
}
factorization(72)// 72 = 2*2*2*3*3
