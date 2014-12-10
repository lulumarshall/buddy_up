class Ride < ActiveRecord::Base
  attr_accessible :ride_distance, :skill, :start_lat, :start_lng, :status, :title, :address, :latitude, :longitude
  has_many :cycles 
  has_many :users, through: :cycles

  geocoded_by :address
  reverse_geocoded_by :latitude, :longitude
  after_validation :geocode, :reverse_geocode

   def self.location_info(filter) 
    filter.map do |r|
      {name: Cycle.find(r.id).user.name,
        id: Cycle.find(r.id).user.id,
        latitude: r.latitude, 
        longitude: r.longitude,
        title: r.title,
        address: r.address,
        ride_distance: r.ride_distance
      }
      end
 
    end
end
