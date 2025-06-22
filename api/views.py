from rest_framework import viewsets, permissions, status, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from django.shortcuts import get_object_or_404

from .models import Blog, Review, Comment, Profile
from .serializers import (
    UserSerializer,
    BlogSerializer, BlogCreateSerializer, BlogListSerializer, BlogUpdateSerializer,
    ReviewSerializer, ReviewCreateSerializer, ReviewListSerializer,
    CommentSerializer, CommentCreateSerializer, CommentListSerializer,
    CustomTokenObtainPairSerializer,
)
from django.contrib.auth.models import User

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

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

from rest_framework import generics
from .serializers import ProfileSerializer

class ProfileDetail(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Devuelve el perfil del usuario autenticado
        return get_object_or_404(Profile, user=self.request.user)
