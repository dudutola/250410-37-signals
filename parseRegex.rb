require 'date'
require 'pry-byebug'
def parse(expression)
  today = Date.today
  case expression
  when "today"
    today
  when /(\d+)/
    # first value $1
    # second value $2

  when /(next) (sunday|monday|tuesday|wednesday|thursday|friday|saturday)/
    binding.pry
  when "tomorrow"
    today + 1
  end
end


# test
# puts parse("in 2 days")
puts parse("Leadership lunch next friday at noon")
