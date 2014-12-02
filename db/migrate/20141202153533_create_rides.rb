class CreateRides < ActiveRecord::Migration
  def change
    create_table :rides do |t|
      t.string :title
      t.float :distance
      t.float :start_lat
      t.float :start_lng
      t.string :skill
      t.string :status

      t.timestamps
    end
  end
end
