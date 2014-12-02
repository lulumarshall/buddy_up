class UsersController < Devise::RegistrationsController
  def index
    @users = User.all
  end
  def show
      @user = User.find(params[:id])
    end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      redirect_to @user
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def following 
    @title = "Following"
    @user = User.find(params[:id])
    @users = @user.following 
    render 'show_follow' 
  end

  def followers
    @title = "Followers"
    @user = User.find(params[:id])
    @users = @user.followers
    render 'show_follow'
    
  end
end