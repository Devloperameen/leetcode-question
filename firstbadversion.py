# The isBadVersion API is already defined for you.
# def isBadVersion(version: int) -> bool:

class Solution:
    def firstBadVersion(self, n: int) -> int:
        left, right = 1, n
        
        while left < right:
            mid = (left + right) // 2
            if isBadVersion(mid): # type: ignore
                right = mid  # The first bad version is at mid or before
            else:
                left = mid + 1  # The first bad version is after mid
                
        return left
