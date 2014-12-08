class Ride < ActiveRecord::Base
  attr_accessible :distance, :skill, :start_lat, :start_lng, :status, :title, :address, :latitude, :longitude
  has_many :cycles 
  has_many :users, through: :cycles

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode
end
