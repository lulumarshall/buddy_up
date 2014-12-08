class RenameDistanceColumnToRideDistance < ActiveRecord::Migration
  def change 
    rename_column :rides, :distance, :ride_distance
    
  end
end
