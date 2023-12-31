from rest_framework import serializers
from account.models import User
from rest_framework.serializers import ValidationError





class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'},write_only=True)
    image = serializers.ImageField(max_length= None, use_url=True)
    class Meta:
        model = User
        fields = ['email','first_name','last_name','gender','phone','address','image','password','password2']
        extra_kwargs = {
            'password': {'write_only':True}
        }

    def validate(self,attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError('Password and confirm Password does not match')
        return attrs
    
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields =['email','password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','first_name','last_name']
