/********************************
Developer: Waleed Ahmed
University ID: 240048820
Function: Power – returns base raised to exponent (both ints)
********************************/
public int Power(int base, int exponent) {
    if (exponent < 0) {
        return 0; // simple handling for negative exponents
    }
    int result = 1;
    for (int i = 0; i < exponent; i++) {
        result *= base;
    }
    return result;
}

/********************************
Developer: Jessica McEnery
University ID: 240177700
Function: Divide - takes two integers as input, divides the first number by the second, returns result as a double. Throws exception to avoid infinity.
********************************/
public static double Divide(int a, int b) {
    if (b == 0) {
        throw new IllegalArgumentException("Cannot divide by zero");
    }
    return (double) a / b;
}
