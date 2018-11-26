---
layout: default
---

# Begin.

Sometimes you write a code, this code simple actually and not hard to think about it. When you finish the code, you realize something. That code amazing. First of all code is working okay :) and you feel it's like a magic. Maybe it could be better, but for now this is the best.

```python
#!/usr/bin/python3

# Given array has some integers.

# We are trying to find max difference between an integer in array and situated in array more lower index integers.

# If difference under 0 result should be -1.

def maxDifference(a):
  max_difference = -1
  
    for i1 in range(len(a)):

      for i2 in range(i1):
        
        difference = a[i1] - a[i2]
        
        if difference > 0 and difference > max_difference:
          max_difference = difference

  return max_difference

if __name__ == '__main__':

  a = [6, 5, 10, 2, 1, 9, 3]
  print(maxDifference(a)) # => Result 8 because for this example, max difference between 9 - 1 = 8.
```

