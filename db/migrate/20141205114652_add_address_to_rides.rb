class AddAddressToRides < ActiveRecord::Migration
  def change
    add_column :rides, :address, :string
  end
end
