require "date"
require "pry-byebug"

def parse_natural_dates(expression)
  today = Date.today
  days_of_week = %w[ Sunday Monday Tuesday Wednesday Thursday Friday Saturday ]
  times = %w[ morning noon afternoon evening ]
  times_values = [ "09:00", "12:00", "14:00", "18:00" ]
  target_date = nil
  time_string = "12:00"

  if expression.match(/(next) (sunday|monday|tuesday|wednesday|thursday|friday|saturday)/)
    next_match = $1
    day_of_the_week = $2
    day_index = days_of_week.find_index { |day| day_of_the_week.downcase == day.downcase }

    if day_index
      days_until = (day_index - today.wday) % 7
      days_until += 7 if next_match || days_until == 0
      target_date = today + days_until
    end
  end

  if expression.match(/(morning|noon|afternoon|evening)/)
    time_of_the_day = $1
    time_index = times.find_index { |time| time_of_the_day.downcase == time }
    time_string = times_values[time_index] if time_index
  end

  if expression.match?(/\btoday\b/)
    target_date = today
  elsif expression.match?(/\btomorrow\b/)
    target_date = today + 1
  end

  # binding.pry

  datetime_string = "#{target_date} #{time_string}"
  DateTime.parse(datetime_string)
end

puts parse_natural_dates("Leadership lunch next friday at noon")
puts parse_natural_dates("Leadership lunch today at noon")
puts parse_natural_dates("Leadership lunch tomorrow")
