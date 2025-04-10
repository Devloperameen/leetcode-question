class Solution:
    def reverse(self, x: int) -> int:
        sign = -1 if x < 0 else 1
        reversed_str = str(abs(x))[::-1]
        reversed_num = sign * int(reversed_str)
        return reversed_num if -2**31 <= reversed_num <= 2**31 - 1 else 0
    

newo = Solution()

print(newo.reverse(-125))