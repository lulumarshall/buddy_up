class Location < ActiveRecord::Base
  attr_accessible :address, :latitude, :longitude, :title, :user_id
  belongs_to :user

  geocoded_by :address
  after_validation :geocode
end
