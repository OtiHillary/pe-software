from string import Template

height = input("Enter your height in cm:")
height_to_int = int(height)
template = Template("Your height is $value !")
result = template.safe_substitute( value = height_to_int )

print(result)


# height = input("Enter your height in cm:")
# result = "Your height is " + height
# print(result)