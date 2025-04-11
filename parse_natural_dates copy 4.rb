require "date"
require "pry-byebug"

def parse_natural_dates(expression)
  today = Date.today
  days_of_week = %w[ Sunday Monday Tuesday Wednesday Thursday Friday Saturday ]
  times = %w[ morning noon afternoon evening ]
  times_values = [ "09:00", "12:00", "14:00", "18:00" ]
  target_date = nil

  # target_date
  # target_time
  case expression
  when /(next) (sunday|monday|tuesday|wednesday|thursday|friday|saturday)/
    next_match = $1
    day_of_the_week = $2
    day_index = days_of_week.find_index { |day| day_of_the_week.downcase == day.downcase }
  when /(morning|noon|afternoon|evening)/
    time_of_the_day = $1
    time_index = times.find_index { |time| time_of_the_day.downcase == time }
    binding.pry
  end

  if day_index
    days_until = (day_index - today.wday) % 7
    days_until += 7 if next_match || days_until == 0
    target_date = today + days_until
  end

  time_string = time_index ? times_values[time_index] : "12:00"

end

puts parse_natural_dates("Leadership lunch next friday at noon")
