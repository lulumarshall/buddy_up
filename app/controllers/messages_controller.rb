class MessagesController < ApplicationController
  
  before_filter :authenticate_user!, except: [:index, :show]
  before_filter :set_message, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json, :js
  
  def index
    @messages = Message.all
    respond_with(@messages)
  end

  def show
    @receiver_details = Message.receiver_object(@message)
    @sender_details = Message.sender_object(@message)
    respond_with(@message)
  end

  def new

    @receiver_object = User.find(params[:receiver])
    @sender_object = current_user
    @message = Message.new
    respond_with(@message)
  end

  def edit
  end

  def create
    @message = Message.new(params[:message])
    @message.save
    respond_with(@message)
  end


  def update
    @message.update_attributes(params[:message])
    respond_with(@message)
  end

  def destroy
    @message.destroy
    respond_with(@message)
  end

  private
    def set_message
      @message = Message.find(params[:id])
    end
end
