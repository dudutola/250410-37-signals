require "chronic"

def parse(expression)
  # create new date
  # convert expression to a date
  # tomorrow day after today +1
  cleaned_expression = expression.gsub(/[^a-zA-Z0-9\s:]/, "")
  Chronic.parse(cleaned_expression)
  # Chronic.parse(expression)
end

puts parse("Meetup at 5pm tomorrow!")
puts parse("Meetup tomorrow at 5pm")
puts parse("5pm tomorrow!")
puts parse("tomorrow")
