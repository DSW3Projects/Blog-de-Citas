from django.urls import path
from .views import (
    RegisterView, CustomTokenObtainPairView, UserDetailView,
    ProfileDetailView,
    CommentCreateView, CommentListView, CommentDetailView,
    ReviewCreateView, ReviewListView, ReviewDetailView,
    BlogCreateView, BlogListView, BlogDetailView, BlogUpdateView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    # Usuarios y autenticación
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/', UserDetailView.as_view(), name='user-detail'),

    # Perfil
    path('profile/', ProfileDetailView.as_view(), name='profile-detail'),

    # Blogs
    path('blogs/', BlogListView.as_view(), name='blog-list'),
    path('blogs/create/', BlogCreateView.as_view(), name='blog-create'),
    path('blogs/<int:pk>/', BlogDetailView.as_view(), name='blog-detail'),
    path('blogs/<int:pk>/update/', BlogUpdateView.as_view(), name='blog-update'),

    # Reviews (anidados en blogs)
    path('blogs/<int:blog_id>/reviews/', ReviewListView.as_view(), name='review-list'),
    path('blogs/<int:blog_id>/reviews/create/', ReviewCreateView.as_view(), name='review-create'),
    path('reviews/<int:pk>/', ReviewDetailView.as_view(), name='review-detail'),

    # Comentarios (anidados en reviews)
    path('reviews/<int:review_id>/comments/', CommentListView.as_view(), name='comment-list'),
    path('reviews/<int:review_id>/comments/create/', CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:pk>/', CommentDetailView.as_view(), name='comment-detail'),
]
