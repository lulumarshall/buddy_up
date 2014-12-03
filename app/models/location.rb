class Location < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude, :title
  belongs_to :user

  geocoded_by :address
  after_validation :geocode
end
