class RidesController < ApplicationController
  before_filter :set_ride, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json, :js
  
  def index
    if params[:location].present?
      @rides = Ride.near(params[:location], 50, :order => :distance)
    else
      @rides = Ride.all
    end
    render json: @rides and return if request.xhr?
  end

  def filter_rides
    if params[:address] == ""
      @filter_rides = Ride.near([params[:currentLocation][:longitude].to_f, params[:currentLocation][:latitude].to_f], params[:ride_distance].to_i, :order => :distance).first
    else 
      @filter_rides = Ride.near(params[:address], params[:ride_distance].to_i, :order => :distance).first
    end 
    render json: @filter_rides 
  end

  def show
    respond_with(@ride)
  end

  def new
    @ride = Ride.new
    respond_with(@ride)
  end

  def edit
  end

  def create
    @ride = Ride.create(params[:ride])
    if @ride.save
      Cycle.create(user_id: current_user.id, ride_id: @ride.id)
    end
    respond_with(@ride)

  end

  def update
    @ride.update_attributes(params[:ride])
    respond_with(@ride)
  end

  def destroy
    @ride.destroy
    respond_with(@ride)
  end

  private
    def set_ride
      @ride = Ride.find(params[:id])
    end
end
