from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import generics
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import Blog, Review, Comment, Profile
from .serializers import (
    UserSerializer,
    BlogSerializer, BlogCreateSerializer, BlogListSerializer, BlogUpdateSerializer,
    ReviewSerializer, ReviewCreateSerializer, ReviewListSerializer,
    CommentSerializer, CommentCreateSerializer, CommentListSerializer,
    CustomTokenObtainPairSerializer, ProfileSerializer,
)
from django.contrib.auth.models import User

#View de Login y Logout
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"detail": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except KeyError:
            return Response({"detail": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
        except TokenError:
            return Response({"detail": "Invalid or expired token"}, status=status.HTTP_400_BAD_REQUEST)

#View de Usuario 
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_permissions(self):
        # Permitir que cualquiera cree un usuario (registro)
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        return UserSerializer

    def perform_create(self, serializer):
        serializer.save()
    
    # Opcional: endpoint para ver perfil propio
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

#View de Blog
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action == 'create':
            return BlogCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return BlogUpdateSerializer
        elif self.action == 'list':
            return BlogListSerializer
        else:
            return BlogSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.username)


#View de Review
class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action == 'create':
            return ReviewCreateSerializer
        elif self.action == 'list':
            return ReviewListSerializer
        else:
            return ReviewSerializer

    def perform_create(self, serializer):
        serializer.save(reviewer=self.request.user)

#View de Comment
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def get_serializer_class(self):
        if self.action == 'create':
            return CommentCreateSerializer
        elif self.action == 'list':
            return CommentListSerializer
        else:
            return CommentSerializer

    def perform_create(self, serializer):
        serializer.save(commenter=self.request.user)


# View de Profile
class ProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Devuelve el perfil del usuario autenticado
        return get_object_or_404(Profile, user=self.request.user)
