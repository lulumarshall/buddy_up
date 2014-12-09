class StravaRoutesController < ApplicationController
  
  def search
    
  end

  def routes

    if session['strava_token'].nil?
      flash[:notice] = "You have not authenticated with strava"
      redirect_to rides_path
    else
      if params[:address] == ""
        @location_info= {latitude: params[:currentLocation][:latitude], longitude: params[:currentLocation][:longitude], ride_distance: params[:distance]}
        bounds = StravaRoute.calculate_bounds(@location_info)
        access_token = session['strava_token'] unless session['strava_token'].nil?
        @client = Strava::Api::V3::Client.new(:access_token => access_token)
        @response = @client.segment_explorer bounds: bounds

      else
        # given address so need to get the log and lat from geocoder 
      end 
    end
    render json: @response and return if request.xhr?
  end
end