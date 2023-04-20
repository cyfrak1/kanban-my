import java.util.Scanner;
public class Main {
    static Scanner input = new Scanner(System.in);
    public static void main(String[] args) {
        name();
        loop();
        check();
    }
    public static void name(){
        System.out.println("Enter first number");
        int a = input.nextInt();
        System.out.println("Enter second number");
        int b = input.nextInt();
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a / b);
        System.out.println(a % b);
    }
    public static void loop(){
        for(int a = 0; a <= 100; a++){
            System.out.println("Current number " + a);
        }
    }
    public static void check(){
        System.out.println("Enter first number");
        int a = input.nextInt();
        System.out.println("Enter second number");
        int b = input.nextInt();
        if(a > b) {
            System.out.println(a + " is greater than " + b);
        }else {
            System.out.println(b + " is greater than " + a);
        }
    }

}