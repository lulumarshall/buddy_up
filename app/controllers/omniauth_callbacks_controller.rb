class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def strava
    handle_callback "Strava"
  end

  def handle_callback(kind)
    auth = User.map_authentication_to_user_properties(request.env["omniauth.auth"])

    @user = Provider.authenticate(auth, current_user, kind)

    if @user.persisted? #(already a user corresponding to this users credentials )
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => kind.titleize
      sign_in_and_redirect @user, event: :authentication  
      session["strava_token"] = @user.get_access_token params[:code]
      @user.get_info session["strava_token"]
    else
      session["devise.authentication"] = auth
      flash[:notice] = session["devise.authentication"]
      redirect_to new_user_registration_url
    end
  end

end
