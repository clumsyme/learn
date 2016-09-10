public class Dog{
    String name;
    public Dog(String _name){
        name = _name;
    }
    void bark(){
        System.out.println("Wang~~, I'm " + name);
    }
    public static void main(String[] args){
        Dog tom= new Dog(args[0]);
        tom.bark();
    }
}