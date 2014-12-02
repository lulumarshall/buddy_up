class Ride < ActiveRecord::Base
  attr_accessible :distance, :skill, :start_lat, :start_lng, :status, :title
end
