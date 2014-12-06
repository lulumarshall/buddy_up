class Cycle < ActiveRecord::Base
  attr_accessible :ride_id, :status, :user_id
  
  belongs_to :user
  belongs_to :ride
end
