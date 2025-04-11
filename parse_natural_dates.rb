require "date"
require "pry-byebug"

def parse_natural_dates(expression)
  today = Date.today
  days_of_week = %w[ Sunday Monday Tuesday Wednesday Thursday Friday Saturday ]
  times = %w[ morning noon afternoon evening ]
  times_values = [ "09:00", "12:00", "14:00", "18:00" ]
  target_date = nil
  time_string = "12:00"

  # Match "next <day of the week>"
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

  # Match the time of day
  if expression.match(/(morning|noon|afternoon|evening)/)
    time_of_the_day = $1
    time_index = times.find_index { |time| time_of_the_day.downcase == time }
    time_string = times_values[time_index] if time_index
  end

  # Match "today" or "tomorrow"
  if expression.match?(/\b(today|this day)\b/)
    target_date = today
  elsif expression.match?(/\b(tomorrow|next day)\b/)
    target_date = today + 1
  end

  # Match "am/pm"
  if expression.match(/(\d{1,2})(?::(\d{2}))?(am|pm)?/)
    hour = $1.to_i
    minutes = $2 ? $2.to_i : 0
    period = $3

    if period
      if period == "pm" && hour << 12
        hour += 12
      elsif period == "am" && hour == 12
        hour = 0
      end
      time_string = "%02d:%02d" % [hour, minutes]
    end
  end

  # Match "22nd of June" or "January 5"
  if expression.match(/\b(\d{1,2})(st|nd|rd|th)? of (\w+)\b/)
    day = $1.to_i
    month = Date::MONTHNAMES.find_index($3.downcase.capitalize)
    target_date = Date.new(today.year, month, day) if month
  elsif expression.match(/\b(\w+) (\d{1,2})(st|nd|rd|th)?\b/)
    month = Date::MONTHNAMES.find_index($1.downcase.capitalize)
    day = $2.to_i
    target_date = Date.new(today.year, month, day) if month
  end

  # Match "DD/MM/YYYY" or "DD/MM/YY"
  if expression.match(/\b(\d{2})\/(\d{2})\/(\d{2}|\d{4})\b/)
    day = $1.to_i
    month = $2.to_i
    year = $3.to_i
    year += 2000 if year < 100
    target_date = Date.new(year, month, day)
  end


  # if expression.match(/\b(\w+)\s(\d{1,2})(st|nd|rd|th)?\b/)
  #   day_of_week = $1.to_i
  #   day_of_month = $2.to_i
  # elsif expression.match(/\b(\d{2})\/(\d{2})\/(\d{2}|\d{4})\b/)
  #   exp = expression.match(/\b(\d{2})\/(\d{2})\/(\d{2}|\d{4})\b/)
  #   binding.pry
  #   day = $1.to_i
  #   month = $2.to_i
  #   year = $3.to_i
  # end

  # binding.pry

  if target_date.nil?
    raise ArgumentError, "Invalid date in expression: #{expression}"
  end

  datetime_string = "#{target_date} #{time_string}"
  DateTime.parse(datetime_string)
end

# puts parse_natural_dates("Leadership lunch next friday at noon")
# puts parse_natural_dates("Leadership lunch today at noon")
# puts parse_natural_dates("Leadership lunch tomorrow")
# puts parse_natural_dates("Leadership lunch this day")
# puts parse_natural_dates("Leadership lunch next day")
# puts parse_natural_dates("Meetup tomorrow at 5pm")
# puts parse_natural_dates("Meetup tomorrow at 5:00")
# puts parse_natural_dates("03/01/2012 07:25:09.234567")
# puts parse_natural_dates("22nd of june at 8am")
# puts parse_natural_dates("January 5 at 7pm")
puts parse_natural_dates("25/04/25")
puts parse_natural_dates("25/04/2025")
# puts parse_natural_dates("24h")
# puts parse_natural_dates("Meetup todayhour at 8am")
