/********************************
Developer: Jessica McEnery
University ID: 240177700
Function: Divide - takes two integers as input, divides the first number by the second, returns result as a double. Throws exception to avoid infinity.
********************************/ double
public static double Divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("Cannot divide by zero");
    }
    return (double) a / b;
}
