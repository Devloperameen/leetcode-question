# The guess API is already defined for you.
# def guess(num: int) -> int:

class Solution:
    def guessNumber(self, n: int) -> int:
        left, right = 1, n
        
        while left <= right:
            mid = (left + right) // 2
            res = guess(mid) # type: ignore
            
            if res == 0:
                return mid
            elif res == -1:
                right = mid - 1
            else:
                left = mid + 1
        
        return -1  # just in case, but problem guarantees there is always an answer
