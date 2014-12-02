# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create!(username:  "Example User",
             email: "example@cheerup.org",
             password:              "password",
             password_confirmation: "password")

20.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@cheerup.org"
  password = "password"
  User.create!(username:             name,
              email:                 email,
              password:              password,
              password_confirmation: password)
end


# Following relationships
users = User.all
user  = users.first
following = users[2..10]
followers = users[3..19]
following.each { |followed| user.follow(followed) }
followers.each { |follower| follower.follow(user) }

