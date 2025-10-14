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
