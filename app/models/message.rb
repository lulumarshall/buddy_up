class Message < ActiveRecord::Base
  attr_accessible :content, :receiver_id, :sender_id, :subject
  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"
  
  def self.receiver_object(message) 
    User.find(Message.find(message.id).receiver_id.to_s)
  end

  def self.sender_object(message)
    User.find(Message.find(message.id).sender_id.to_s) 
  end
end
