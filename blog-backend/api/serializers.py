from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Blog, Review, Comment, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

# 🧑‍🤝‍🧑 Perfil de Usuario
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id', 'username'] 

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Las contraseñas no coinciden."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    

#Profile Serializer
    
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 

    class Meta:
        model = Profile
        fields = ['user', 'profile_image']



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Datos básicos del usuario
        data['id'] = self.user.id
        data['username'] = self.user.username
        data['email'] = self.user.email
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name

        # Imagen de perfil (desde tu modelo Profile)
        profile = getattr(self.user, 'profile', None)
        if profile and profile.profile_image:
            data['profile_image'] = profile.profile_image.url
        else:
            data['profile_image'] = None

        return data



# 💬 Comentario sobre una Review
class CommentSerializer(serializers.ModelSerializer):
    commenter = UserSerializer(read_only=True)
    total_likes = serializers.IntegerField(source='total_likes', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'review', 'commenter', 'content', 'created_at', 'total_likes']

class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['review', 'content']
        extra_kwargs = {
            'review': {'read_only': True},
            'content': {'required': True}
        }

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['commenter'] = request.user
        return super().create(validated_data)

class CommentListSerializer(serializers.ModelSerializer):
    commenter = UserSerializer(read_only=True)
    total_likes = serializers.IntegerField(source='total_likes', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'review', 'commenter', 'content', 'created_at', 'total_likes']
        read_only_fields = ['review', 'created_at']  # solo lectura para review y created_at

# ⭐ Review sobre un Blog
class ReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'blog', 'reviewer', 'comment',
            'created_at', 'total_likes', 'likes', 'comments'
        ]
        extra_kwargs = {
            'likes': {'read_only': True},
        }
        
class ReviewCreateSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Review
        fields = ['blog', 'comment']
        extra_kwargs = {
            'blog': {'read_only': True},
            'rating': {'required': True},
            'comment': {'required': True}
        }

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['reviewer'] = request.user
        return super().create(validated_data)

class ReviewListSerializer(serializers.ModelSerializer):
    reviewer = UserSerializer(read_only=True)
    total_likes = serializers.IntegerField(source='total_likes', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Review
        fields = [
            'id', 'blog', 'reviewer', 'comment',
            'created_at', 'total_likes', 'likes', 'comments'
        ]
        read_only_fields = ['blog', 'reviewer', 'created_at']  # solo lectura para blog, reviewer y created_at

class BlogSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()
    author = serializers.StringRelatedField()
    tags = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = [
            'id', 'title', 'content', 'author', 'created_at',
            'updated_at', 'tags', 'image', 'reviews', 'rating'
        ]

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None




class BlogCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'content', 'author', 'tags', 'image']
        extra_kwargs = {
            'author': {'read_only': True},
            'image': {'required': False}
        }

    def create(self, validated_data):
        request = self.context.get('request')
        validated_data['author'] = request.user.username
        return super().create(validated_data)
    
class BlogListSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    image = serializers.SerializerMethodField()
    author = serializers.StringRelatedField()  
    tags = serializers.StringRelatedField(many=True, read_only=True)  

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'author', 'created_at', 'updated_at', 'tags', 'image', 'reviews']
        read_only_fields = ['author', 'created_at', 'updated_at']

    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None

        
class BlogUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'content', 'tags', 'image']
        extra_kwargs = {
            'image': {'required': False}
        }

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.tags = validated_data.get('tags', instance.tags)
        if 'image' in validated_data:
            instance.image = validated_data['image']
        instance.save()
        return instance
    
