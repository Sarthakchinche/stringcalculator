// stringCalculator.test.js

const { Add } = require("./stringCalculator");

describe("String Calculator Tests", () => {
  test("Empty string should return 0", () => {
    expect(Add("")).toBe(0);
  });

  test("Single number should return the number itself", () => {
    expect(Add("1")).toBe(1);
  });

  test("Two numbers separated by a comma should return their sum", () => {
    expect(Add("1,2")).toBe(3);
  });

  test("Numbers separated by newlines should return their sum", () => {
    expect(Add("1\n2")).toBe(3);
  });

  test("Empty string with newlines should return 0", () => {
    expect(Add("\n")).toBe(0);
  });

  test("Custom delimiter should return correct sum", () => {
    expect(Add("//;\n1;2")).toBe(3);
  });

  test("Multiple custom delimiters should return correct sum", () => {
    expect(Add("//[*][%]\n1*2%3")).toBe(6);
  });

  test("Numbers greater than 1000 should be ignored", () => {
    expect(Add("1000,2")).toBe(1002);
    expect(Add("1001,2")).toBe(2);
  });

  test("Negative numbers should throw an exception", () => {
    expect(() => Add("1,-2")).toThrow("negatives not allowed: -2");
    expect(() => Add("1,-2,-3")).toThrow("negatives not allowed: -2, -3");
  });

  test("Ignore numbers greater than 1000", () => {
    expect(Add("2,1001")).toBe(2);
  });

  test("Multi-character delimiters should be supported", () => {
    expect(Add("//[***]\n1***2***3")).toBe(6);
  });
});
