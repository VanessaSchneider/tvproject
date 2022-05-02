class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email, :photo, :age, :bio
  has_many :posts
  has_many :comments
end