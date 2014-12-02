class Message < ActiveRecord::Base
  attr_accessible :content, :receiver_id, :sender_id
  belongs_to :sender, class_name: "User"
  belongs_to :reciever, class_name: "User"
end
