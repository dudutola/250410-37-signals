require "date"
require "pry-byebug"
# require "time"

def parse_natural_dates(expression)
  # todays date
  today = Date.today
  # create list with days of week
  days_of_week = %w[ Sunday Monday Tuesday Wednesday Thursday Friday Saturday ]
  # create list with noon morning evening afternoon + values
  times = %w[ morning noon afternoon evening ]
  times_values = [ "09:00", "12:00", "14:00", "18:00" ]

  # take only important words
  # compare if expression includes day time or next
  day_index = days_of_week.find_index { |day| expression.downcase.include?(day.downcase) }
  time_index = times.find_index { |time| expression.downcase.include?(time) }
  next_match = expression.downcase.include?("next")
  puts day_index
  puts time_index
  puts next_match

  # case expression
  # when "today"
  #   today
  # when "tomorrow"
  #   today + 1
  # end

  if day_index
    days_until = (day_index - today.wday) % 7
    # date += 1 + ((3-date.wday) % 7)
    puts days_until
    days_until += 7 if next_match || days_until == 0
    puts days_until
    # binding.pry
    target_date = today + days_until
  else
    if expression.include?("tomorrow")
      target_date = today + 1
    else
      target_date = today
    end
  end

  time_string = time_index ? times_values[time_index] : "12:00"
  puts time_string

  # next add logic to 5pm...

  datetime_string = "#{target_date} #{time_string}"
  puts datetime_string
  # then parse the date
  DateTime.parse(datetime_string)
end

puts parse_natural_dates("Leadership lunch next friday at noon")
puts parse_natural_dates("Leadership lunch today at noon")
# puts parse_natural_dates("Leadership lunch tomorrow friday at noon")
# puts parse_natural_dates("Meetup at 5pm tomorrow!")
# puts parse_natural_dates("Meetup tomorrow at 5pm")
# puts parse_natural_dates("5pm tomorrow!")
# puts parse_natural_dates("tomorrow")

# "Leadership lunch next friday at noon"
# X"next, friday, noon"
# O"Leadership, lunch"

# 1. step one - get relevant words
# 2. "next, friday, noon" -> convert to some datetime
# find todays date
# then make a list of days of week
# do a comparison for noon, evening, morning, afternoon and associate them a time
# try to find the next day, using todays date
# convert to a normal date
