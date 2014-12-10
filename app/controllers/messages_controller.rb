class MessagesController < ApplicationController
  
  before_filter :authenticate_user!, except: [:index, :show]
  before_filter :set_message, only: [:show, :edit, :update, :destroy]
  respond_to :html, :json, :js
  
  def index
    # if params[:class] == nil
    # a = Messages.where(sender_id: current_user)
    # b = Message.where(receiver_id: current_user)
    # @messages = a.push b 
    # respond_with(@message)
    # else 
    @messages = User.user_messages(current_user)
    render json: @messages and return if request.xhr?
    
  end

  def sent
    @sent = User.sent_messages(current_user)
    render json: @sent and return if request.xhr?
  end

  def received
    @received = User.received_messages(current_user)
    render json: @received and return if request.xhr?
  end

  def show
    @receiver_details = Message.receiver_object(@message)
    @sender_details = Message.sender_object(@message)
    respond_with(@message)
  end

  def new
    @receiver_details = User.find(params[:receiver])
    @sender_details = current_user
    @message = Message.new
    respond_with(@message)
  end

  def edit
    @receiver_details = Message.receiver_object(@message)
    @sender_details = Message.sender_object(@message)
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
