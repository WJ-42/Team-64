/********************************
Developer: Waleed Ahmed
University ID: 240048282
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

    /********************************
    Developer: Faalila Katharsa Shaik Mohamed
    University ID: 240157540
    Function: Subtract - This function takes two integers as input,
              subtracts the second from the first, and returns the result.
    ********************************/
    public int Sub(int x, int y) {
        return x - y;
    }
}


/********************************
Developer: Jabari Thompson
University ID: 240125608
Function: Max - This function takes two integers as input and returns the maximum one.
********************************/
public int Max(int a, int b) {
    if (a > b) {
        return a;
    } else {
        return b;
    }
}


