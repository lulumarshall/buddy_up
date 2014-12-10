# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

u1 = User.create!(name:  "Lulu Marshall",
             email: "lulumarshall@gmail.com",
             password:              "password",
             password_confirmation: "password")
u2 = User.create!(name:  "Beth Houlgrave",
             email: "bhoulgrave@buddyupcycle.org",
             password:              "password",
             password_confirmation: "password")
u3 = User.create!(name:  "Gerry M",
             email: "gmathe@buddyupcycle.org",
             password:              "password",
             password_confirmation: "password")
u4 = User.create!(name:  "Mathilda Thompson",
             email: "mthompson@buddyupcycle.org",
             password:              "password",
             password_confirmation: "password")
u5 = User.create!(name:  "Ian Denty",
             email: "identy@buddyupcycle.org",
             password:              "password",
             password_confirmation: "password")


20.times do |n|
  name  = Faker::Name.name
  email = "example-#{n+1}@buddyupcycle.org"
  password = "password"
  User.create!(name:             name,
              email:                 email,
              password:              password,
              password_confirmation: password)
end

r1 = Ride.create!(title: "Lulu's ride 1", ride_distance: 60, latitude: 51.657466, longitude: -0.514731, skill: "easy", address: '2 Darvells Yard, Chorleywood')
r2 = Ride.create!(title: "Bad ass!", ride_distance: 100, latitude: 52.395536, longitude: 0.262193, skill: "hard", address: '9 Back Hill, London')
r3 = Ride.create!(title: "Easy Breezy Ride", ride_distance: 90, latitude: 51.657805, longitude: -0.526114, skill: "medium", address: '117 Whitelands Avenue, Chorleywood')
r4 = Ride.create!(title: "Hipster Paradise", ride_distance: 30, latitude: 51.524334, longitude: -0.075955, skill: "easy", address: "2 Ebor Street, Shoreditch, London")
r5 = Ride.create!(title: "Cycle hills", ride_distance: 50, latitude: 51.651959, longitude: -0.521472, skill: "medium", address: "11 Berks Hill, Chorleywood")
r6 = Ride.create!(title: "You'll be cursing at the end of this", ride_distance: 80, latitude: 51.255000, longitude: -0.308611, skill: "hard", address: "Box Hill, Surrey")
r7 = Ride.create!(title: "Chill man...", ride_distance: 20, latitude: 51.519256, longitude: -0.168534, skill: "easy", address: 'Paddington Arm Canal, London')



c1 = Cycle.create!(user_id: u1.id,ride_id: r1.id, status: 'open')
c2 = Cycle.create!(user_id: u2.id,ride_id: r2.id, status: 'open')
c3 = Cycle.create!(user_id: u3.id,ride_id: r3.id, status: 'open')
c4 = Cycle.create!(user_id: u4.id,ride_id: r4.id, status: 'open')
c5 = Cycle.create!(user_id: u5.id,ride_id: r5.id, status: 'open')
c6 = Cycle.create!(user_id: u1.id,ride_id: r6.id, status: 'open')
c7 = Cycle.create!(user_id: u2.id,ride_id: r7.id, status: 'open')

m1 = Message.create!(sender_id: u1.id, receiver_id: u2.id, subject: "Chill man...", content: "Hi I am interested in this ride.  Let's go in an hour")
m2 = Message.create!(sender_id: u1.id, receiver_id: u3.id, subject: 'Cycle 1 hour?', content: "Let's meet up and go for a cycle in 1 hour meet by your point")
m3 = Message.create!(sender_id: u1.id, receiver_id: u4.id, subject: 'Cycle this afternoon?', content: "Am keen to go this afternoon let me know if you're still free?")
m4 = Message.create!(sender_id: u1.id, receiver_id: u5.id, subject: 'Cycle now', content: "Let's go now if you're free?")
m5 = Message.create!(sender_id: u2.id, receiver_id: u1.id, subject: 'Fancy Ride?', content: "If you're still keen to go let's meet at 3?")
m6 = Message.create!(sender_id: u3.id, receiver_id: u1.id, subject: 'Free at 3 are you?', content: "Hi, I'm keen to go cycling today if you still want to go this afternoon that would be great")
m7 = Message.create!(sender_id: u4.id, receiver_id: u1.id, subject: 'My friend and I keen to go cycling', content: "Your route sounds perfect let's go ")
m8 = Message.create!(sender_id: u5.id, receiver_id: u1.id, subject: 'Chilled cycle', content: "Would be keen for a relaxed potter around if you were still availible this morning?")
m9 = Message.create!(sender_id: u1.id, receiver_id: u2.id, subject: 'Hill training?', content: "Interested in some hill routes so would be good to head out with you this avo?")
m10 = Message.create!(sender_id: u1.id, receiver_id: u3.id, subject: 'Cycling tomorrow morning?', content: "Cycling tomorrow morning would be great are you still keen to go ")


