class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n

        first = 1  # Ways to reach step 1
        second = 2  # Ways to reach step 2

        for i in range(3, n + 1):
            third = first + second  # Ways to reach current step
            first = second
            second = third
        
        return second
