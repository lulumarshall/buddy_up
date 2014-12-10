class StravaRoute

  def self.calculate_bounds(coords)
    Geokit::Bounds.from_point_and_radius [coords[:latitude].to_f, coords[:longitude].to_f], coords[:ride_distance].to_i
  end
end