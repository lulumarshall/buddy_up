class CreateCycles < ActiveRecord::Migration
  def change
    create_table :cycles do |t|
      t.string :user_id
      t.string :ride_id
      t.string :status

      t.timestamps
    end
  end
end
