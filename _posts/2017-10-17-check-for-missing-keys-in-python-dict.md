---
title: Check for Missing Keys in Python Dict  
published: true
tags: idiomatic python dictionary
---

<p align="center">
  <img src="/assets/images/python_dict_keys.jpeg">
</p>

Dictionaries are one the most useful and widely used data structures of all time. And sooner or later we face the problem of accessing missing keys in the dictionary. Lets have a look at the problem first:

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium',
                    }
# Lets blow up some code
periodic_elements['Apple']

# output
# >> KeyError "Apple"
```

This is a very common exception raised indicating that you are trying to access a key in the dictionary which doesn’t exist yet. There are a few ways I have seen people handle this error. Lets discuss them one at a time:

### 1. Key in Dict

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium'
                    }
if "Apple" in periodic_elements:
    print(periodic_elements["Apple"])
```

I really like this method because it is simple and has no ambiguities. But the downside being that we’ll have to modify the original piece of code which may not be permissible or we might not have direct access to the dictionary. We might be importing some library function which doesn’t do this check.

### 2. Try/ Except

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium'
                    }
try:
    print(periodic_elements["Apple"])
except:
    print("Key Apple not in dictionary periodic_elements")
```

This is good because it works all the time. It solves our previous problem where we might not have direct access to the dictionary. But the downside being that it doesn’t look good.

### 3. Dict.get()

If you have access to the dictionary then this is yet another way to achieve your goal. I really like this because it looks clean and sounds idiomatic. But there is a catch to using it the right way. But first lets look at a simple example of how to use it:

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium'
                    }
# key is present
periodic_elements.get('He')
# output
# >> Helium

# key is not present and default value not supplied to .get function
periodic_elements.get('Apple')
# output
# >> None

# key is not present and default value is supplied to .get function
periodic_elements.get('Apple', 'Not Found')
# output
# >> Not Found
```

A lot of developers rely on the fact that default return value of the get function is `None`.

Common Practice:

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium'
                    }
element = periodic_elements.get('Ca')
if element is None:
    print('"Ca" is missing from periodic_elements dict')
# Output
# >> "Ca" is missing from periodic_elements dict
```

Is it a good practice? Let's find out:

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium',
                     'Ca': None
                    }
element = periodic_elements.get('Ca')
if element is None:
    print('"Ca" is missing from periodic_elements dict')
# Output
# >> "Ca" is missing from periodic_elements dict
```

In the above case we saw that ‘Ca’ is present in the dictionary but its value is None. According to our code, this key is not present in the dictionary which is incorrect. **The above mentioned is a safe practice only if we are sure that keys in my dictionary will never have None values.**

_Another idiom we see a lot of developers use is the fact that None evaluates to Boolean False._

Common Practice:

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium'
                    }
element = periodic_elements.get('Ca')
if not element:
    print('"Ca" is missing from periodic_elements dict')
# Output
# >> "Ca" is missing from periodic_elements dict
```

Is it safe? Let’s find out:

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium',
                     'Ca': {},
                     'Mg': [],
                     'Al': '',
                     'Be': None
                    }
element = periodic_elements.get('Ca')
if not element:
    print('"Ca" is missing from periodic_elements dict')
# Output
# >> "Ca" is missing from periodic_elements dict
```

**Empty dictionary, list, string also evaluate to Boolean False, so one must be careful when using this idiom in practice.** Ca, Mg, Al, Be all will evaluate to False, so if we are sure that we won’t have such cases then it is safe to use.

We looked at 2 approaches of using [dot] get method of dictionaries but both posed a similar problem. Lets see how idiomatically we can solve it:

```python
periodic_elements = {
                     'H': 'Hydrogen', 
                     'He': 'Helium', 
                     'Li': 'Lithium',
                     'Ca': [],
                     'Mg': {},
                     'Al': '',
                     'Be': None
                    }
missing = object()
element = periodic_elements.get('Ca', missing)
if element is missing:
    print('"Ca" is missing from periodic_elements dict')
else:
    print('The value of "Ca" is {}'.format(element))
# Output
# >> The value of "Ca" is []
```

Idea is to set the default return value of [dot] get method to something that is not expected to ever come up as value in dictionary so that later we can compare and tell if the key is missing or not. Just look at how beautiful it sounds “if element is missing”.

## Verdict

So we looked at 3 broad approaches to handle missing keys in a dictionary, namely:
* key in dict
* try/ except [KeyError]
* dict.get()

### Which one to use?

I would say, all.  
One must be skilled and familiar with all these methodologies. Each of these 3 broad approaches have there own advantages. Developers should understand the difference between each and should able to apply what fits best in the problem they are trying to solve.
