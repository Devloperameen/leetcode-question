from typing import List
from collections import Counter

class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Count elements in both arrays
        count1 = Counter(nums1)
        count2 = Counter(nums2)
        
        # Find intersection: Take minimum count for each element in both arrays
        result = []
        for num in count1:
            if num in count2:
                result.extend([num] * min(count1[num], count2[num]))
        
        return result
