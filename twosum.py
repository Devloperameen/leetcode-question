class Solution:
    def twoSum(self, nums, target):
        hashmap = {}  # value: index
        for i, num in enumerate(nums):
            diff = target - num
            if diff in hashmap:
                return [hashmap[diff], i]
            hashmap[num] = i

# Create object
newobject = Solution()

# Define input
nums = [2, 7, 11, 15]
target = 9

# Call the method and print result
print(newobject.twoSum(nums, target))
