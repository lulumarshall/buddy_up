class LocationsController < ApplicationController
  before_filter :set_location, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json, :js
  def index
  @locations = Location.all
     @hash = Gmaps4rails.build_markers(@locations) do |location, marker|
       marker.lat location.latitude
       marker.lng location.longitude
     end 
   end

  def show
    respond_with(@location)
  end

  def new
    @location = Location.new
    respond_with(@location)
  end

  def edit
  end

  def create
    @location = Location.new(params[:location])
    @location.save
    respond_with(@location)
  end

  def update
    @location.update_attributes(params[:location])
    respond_with(@location)
  end

  def destroy
    @location.destroy
    respond_with(@location)
  end

  private
    def set_location
      @location = Location.find(params[:id])
    end
end
