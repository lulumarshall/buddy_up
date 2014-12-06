class Message < ActiveRecord::Base
  attr_accessible :content, :receiver_id, :sender_id, :subject
  belongs_to :sender, class_name: "User"
  belongs_to :reciever, class_name: "User"

  scope :sent_messages, lambda{|name| where(sender_id: 'name')}
  scope :received_messages, lambda{|name| where(receiver_id: 'name')}
  
  def self.receiver_object(message) 
    User.find(Message.find(message.id).receiver_id.to_s)
  end

  def self.sender_object(message)
    User.find(Message.find(message.id).sender_id.to_s) 
  end
end
