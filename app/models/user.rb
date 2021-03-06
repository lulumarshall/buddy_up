class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, omniauth_providers: [:strava]

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :username, :image, :name
  # attr_accessible :title, :body
  has_many :providers, dependent: :destroy 
  has_many :active_relationships, class_name: "Relationship", foreign_key: "follower_id", dependent: :destroy
  has_many :passive_relationships, class_name: "Relationship", foreign_key: "followed_id", dependent: :destroy 
  has_many :following, through: :active_relationships, source: :followed 
  has_many :followers, through: :passive_relationships, source: :follower 

  has_many :sent_messages, class_name: "Message", foreign_key: 'sender_id', dependent: :destroy
  has_many :received_messages, class_name: "Message", foreign_key: 'receiver_id', dependent: :destroy
  has_many :senders, through: :sent_messages, source: :sender
  has_many :receivers, through: :received_messages, source: :receiver

  has_many :cycles 
  has_many :rides, through: :cycles 
  
  has_many :locations
  def self.map_authentication_to_user_properties(authentication)
    authentication.slice(:info, :provider, :uid, :user_id)
  end

  def populate_user_fields(auth, user, kind)
    puts auth
    case kind
    when "Strava"
      user.name = self.class.strava_username(auth) if !auth.info.firstname.nil? && user.name.blank?
      user.image = auth.info.image if !auth.info.image.nil? && user.image.blank?
      user.skip_confirmation! if user.respond_to?(:skip_confirmation!) 
    end
    user
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if auth = session["devise.authentication"]
 
        
        user.name = strava_username(auth) if user.name.blank?
        user.email = auth.info.email if user.email.blank?
        user.image = auth.info.image if user.image.blank?
        user.skip_confirmation! if user.respond_to?(:skip_confirmation!) # don't require email confirmation
 
      end
    end
  end

  def self.user_messages(user) 
 ((user.received_messages).push (user.sent_messages)).map do |m|
      {sender_name: m.sender.name,
        content: m.content,
        receiver_name: m.receiver.name,
        subject: m.subject, 
        receiver_id: m.receiver_id,
        sender_id: m.sender_id, 
        message_id: m.id, 
        created_at: m.created_at,
        sender_email: m.sender.email,
        receiver_email: m.receiver.email
      }
    end
  end
   def self.sent_messages(user) 
      user.sent_messages.map do |m|
       {sender_name: m.sender.name,
         content: m.content,
         receiver_name: m.receiver.name,
         subject: m.subject, 
         receiver_id: m.receiver_id,
         sender_id: m.sender_id, 
         message_id: m.id, 
         created_at: m.created_at,
         sender_email: m.sender.email,
         receiver_email: m.receiver.email
       }
     end
   end
   def self.received_messages(user) 
    user.received_messages.map do |m|
       {sender_name: m.sender.name,
         content: m.content,
         receiver_name: m.receiver.name,
         subject: m.subject, 
         receiver_id: m.receiver_id,
         sender_id: m.sender_id, 
         message_id: m.id, 
         created_at: m.created_at,
         sender_email: m.sender.email,
         receiver_email: m.receiver.email
       }
     end
   end
  def self.strava_username(auth)
    [auth.info.firstname, auth.info.lastname].compact.join(" ")
  end

  def get_access_token(code)
    url  = "https://www.strava.com/oauth/token"
    params = {client_id: ENV["STRAVA_ID"], client_secret: ENV["STRAVA_SECRET"], code: code}
    end_url = [url, "?", params.to_param].join
    request = HTTParty.post end_url
    request["access_token"]
  end

  def get_info(access_token)
   @client = Strava::Api::V3::Client.new(:access_token => access_token)
   response = @client.segment_explorer bounds: "37.821362,-122.505373,37.842038,-122.465977"
  end
end
