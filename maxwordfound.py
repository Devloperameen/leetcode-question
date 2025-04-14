from typing import List  # Import List from the typing module

class Solution:
    def mostWordsFound(self, sentences: List[str]) -> int:
        # Initialize the variable to store the maximum number of words in a sentence
        max_words = 0
        
        # Loop through each sentence in the input list
        for sentence in sentences:
            # Split the sentence by spaces and count the number of words
            num_words = len(sentence.split())
            # Update max_words if the current sentence has more words
            max_words = max(max_words, num_words)
        
        return max_words
