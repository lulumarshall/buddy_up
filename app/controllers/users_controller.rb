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
end