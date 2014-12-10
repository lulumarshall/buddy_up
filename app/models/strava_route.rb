class StravaRoute
  

  # def self.calculate_bounds(coords)
  #   distance = coords[:ride_distance].to_f
  #   bound_width = distance/2
  #   bound_width_degrees = bound_width/69
  #   lat = coords[:latitude].to_f
  #   lng = coords[:longitude].to_f
  #   sw_lat = lat - bound_width_degrees
  #   sw_lng = lng - bound_width_degrees
  #   ne_lat = lat + bound_width_degrees
  #   ne_lng = lng + bound_width_degrees

  #   bounds = []
  #   bounds.push sw_lat, sw_lng, ne_lat, ne_lng
  #   bounds.to_s 

  # end


  def self.calculate_bounds(coords)
    Geokit::Bounds.from_point_and_radius [coords[:latitude].to_f, coords[:longitude].to_f], coords[:ride_distance].to_i
  end
end