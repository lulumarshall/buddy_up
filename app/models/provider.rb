class Provider < ActiveRecord::Base
  attr_accessible :provider, :uid, :user_id
  belongs_to :user 

  def self.authenticate(auth, user_signed_in=nil, kind)
    if user_signed_in || Provider.find_by_uid(auth.uid)
      user = user_signed_in || Provider.find_by_uid(auth.uid).user #so if you say find_by_image or find_by_description.  if you say .find you can only search for an id 
      unless user.providers.where(provider: auth.provider).first #trying to see if a user has previously logged in before 
        create_provider(auth.provider, auth.uid, user.id)
      end

      user.populate_user_fields(auth, user, kind)
      user.save
      user
    else #there is no user logged in or user registered with those fields, let's create one.
      user = User.new
      user.populate_user_fields(auth, user, kind)
      user.save
      create_provider(auth.provider, auth.uid, user.id) if user.persisted?
      user
    end
  end

  def self.create_provider(provider, uid, user_id)
    self.create!(provider: provider, uid: uid, user_id: user_id)    
  end

  
end